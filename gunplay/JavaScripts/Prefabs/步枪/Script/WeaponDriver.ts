import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import Console from '../../../tools/Console';
/* 导入需要使用的包 */
import { PrefabEvent, PrefabReport } from "../../PrefabEvent";
import WeaponUI from "./WeaponUI";

/* 客户端装备发送事件名称 */
const EQUIP_EVENT: string = "HotWeapon-Equiped";

/* 客户端卸载发送事件名称 */
const UNEQUIP_EVENT: string = "HotWeapon-Unequiped";

/* 用于获取发射方向的射程距离 */
const SHOOT_RANGE: number = 100000;

/* 弹壳抛射持续时间 */
const CASING_LIFE: number = 1;

/* 弹壳抛射位置偏移 */
const CASING_OFFSET: mw.Vector = new mw.Vector(8, 5, 10);

/* debug标识 */
const DEBUG_FLAG: boolean = false;

/* 重力 */
const GRAVITAIONAL_ACCELERATION: number = 9.8;

/* 最大子弹速度 */
const MAX_SHOOTSPEED: number = 10001;

/* 对象池接口 */
interface IPool<T> {

	allocate(): T;

	recycle(obj: T): boolean;

	release(): void

}

/* 对象工厂接口 */
interface IObjectFactory<T> {

	create(): T;

	destroy(obj: T): void;

}

/* 对象池抽象模板类 */
abstract class Pool<T> implements IPool<T> {

	protected mCacheStack: Array<T> = new Array<T>();

	public mUsingArray: Array<T> = new Array<T>();

	public get CacheStackCount(): number {
		return this.mCacheStack.length;
	}

	public get UsingCount(): number {
		return this.mUsingArray.length;
	}

	protected mFactory: IObjectFactory<T>;

	public allocate(): T {
		let obj = this.mCacheStack.length > 0 ? this.mCacheStack.pop() : this.mFactory.create();
		this.mUsingArray.push(obj);
		return obj;
	}

	public abstract recycle(obj: T): boolean;

	public release(): void {
		for (let i = 0; i < this.mUsingArray.length; i++) {
			const element = this.mUsingArray[i];
			this.mFactory.destroy(element);
		}
		this.mUsingArray.length = 0;

		for (let i = 0; i < this.mCacheStack.length; i++) {
			const element = this.mCacheStack[i];
			this.mFactory.destroy(element);
		}
		this.mCacheStack.length = 0;
	}

}

/* 自定义工厂模板类 */
class CustomObjectFactory<T> implements IObjectFactory<T> {

	private mFactoryCreateMethod: () => T;

	private mFactoryDestroyMethod: (obj: T) => void;


	constructor(factoryCreateMethod: () => T, factoryDestroyMethod: (obj: T) => void) {
		this.mFactoryCreateMethod = factoryCreateMethod;
		this.mFactoryDestroyMethod = factoryDestroyMethod;
	}

	public create(): T {
		return this.mFactoryCreateMethod();
	}

	public destroy(obj: T): void {
		return this.mFactoryDestroyMethod(obj);
	}

}

/* 对象池模板类 */
class SimpleObjectPool<T> extends Pool<T> {

	mResetMethod: Function;

	constructor(factoryCreateMethod: () => T, factoryDestroyMethod: (obj: T) => void, resetMethod: Function = null) {
		super();
		this.mFactory = new CustomObjectFactory<T>(factoryCreateMethod, factoryDestroyMethod);
		this.mResetMethod = resetMethod;
	}

	public recycle(obj: T): boolean {
		if (this.mCacheStack.indexOf(obj) > -1) {
			return;
		}
		if (this.mResetMethod != null) {
			this.mResetMethod(obj);
		}
		let index = this.mUsingArray.indexOf(obj);
		if (index > -1) {
			this.mUsingArray.splice(index, 1);
		}
		this.mCacheStack.push(obj);
		return true;
	}

	public recycleAll() {
		for (let i = 0; i < this.mUsingArray.length; i++) {
			const element = this.mUsingArray[i];
			this.mResetMethod(element);
			this.mCacheStack.push(element);
		}
		this.mUsingArray.length = 0;
	}

	public printTotalSize(): void {
		Console.error("total size: " + (this.UsingCount + this.CacheStackCount));
	}
}

/* 子弹类 */
class Ammo {

	owner: mw.Character; // 弹药所属角色
	hitResult: mw.GameObject[] | mw.HitResult[]; // 击中结果

	private ammoPool: SimpleObjectPool<mw.GameObject>; // 弹药对象池
	private entity: mw.GameObject; // 弹药实体
	private displacement: mw.Vector; // 每秒位移
	private currentLocation: mw.Vector; // 当前位置
	private gravityScale: number; // 重力系数
	private lifeTime: number; // 生命周期
	private currentTime: number; // 当前运动时间
	private stride: mw.Vector; // 步长
	private detectRadius: number; // 碰撞检测半径	

	constructor(owner: mw.Character, ammoPool: SimpleObjectPool<mw.GameObject>, startLoc: mw.Vector, direction: mw.Vector, shootRange: number, ammoSpeed: number, gravityScale: number, detectRadius: number, hitResult: mw.GameObject[] | mw.HitResult[] = []) {
		this.owner = owner;
		this.ammoPool = ammoPool;
		this.entity = this.ammoPool.allocate();
		this.entity.parent = null;
		this.currentLocation = startLoc.clone();
		this.entity.worldTransform.position = this.currentLocation;
		this.entity.worldTransform.rotation = direction.toRotation();
		this.entity.setVisibility(mw.PropertyStatus.On);
		this.displacement = mw.Vector.multiply(direction, ammoSpeed, this.displacement);
		this.lifeTime = shootRange / ammoSpeed;
		this.currentTime = 0;
		this.gravityScale = gravityScale;
		this.stride = mw.Vector.zero;
		this.detectRadius = detectRadius;
		this.hitResult = hitResult;

	}

	// 更新弹药位置，发射客户端承担检测
	public update(dt: number): boolean {
		// 计算当前帧弹药移动步长
		this.stride = mw.Vector.multiply(this.displacement, dt, this.stride);
		// 如果重力系数不为0则对z轴坐标和旋转进行进一步计算
		if (this.gravityScale) {
			this.stride.z -= (50 * this.gravityScale * GRAVITAIONAL_ACCELERATION * (Math.pow(this.currentTime + dt, 2) - Math.pow(this.currentTime, 2)));
			this.entity.worldTransform.rotation = this.stride.toRotation();
			this.currentTime += dt;
		}
		// 计算出当前更新位置
		this.currentLocation.x += this.stride.x;
		this.currentLocation.y += this.stride.y;
		this.currentLocation.z += this.stride.z;

		// 如果检测范围大于0，每帧检测碰撞（只有武器持有人客户端子弹进行检测，其余客户端只是模拟）
		if (this.detectRadius) {
			// 如果检测范围小于10，射线检测，返回Gameplay.HitResult数组
			if (this.detectRadius < 10) {
				let lineResult = QueryUtil.lineTrace(this.entity.worldTransform.position, this.currentLocation, true, DEBUG_FLAG);
				lineResult = lineResult.filter(e => {
					return !(e.gameObject instanceof mw.Trigger)
				})
				// 射线检测结果不为0，即有碰撞对象
				if (lineResult.length > 0) {
					// 终结弹药生命，获取检测结果
					this.lifeTime = -1;
					let temp = new Array<mw.HitResult>();
					for (let element of lineResult) {
						temp.push(element);
					}
					this.hitResult = temp;
				}
			} else { // 如果检测范围大于等于10，矩形检测，返回Core.GameObject数组
				let boxResult = GeneralManager.modifyboxOverlapInLevel(this.entity.worldTransform.position, this.currentLocation, this.detectRadius, this.detectRadius, DEBUG_FLAG);
				// 射线检测结果不为0，即有碰撞对象
				if (boxResult.length > 0) {
					// 终结弹药生命，获取检测结果
					this.lifeTime = -1;
					this.hitResult = boxResult;
				}

			}
		}
		// 更新弹药实体位置，弹药生命-=当前帧时间，返回弹药生命<0的Boolean值
		this.entity.worldTransform.position = this.currentLocation;
		this.lifeTime -= dt;
		return this.lifeTime <= 0;
	}

	// 销毁弹药方法，对象池回收弹药实体
	public destroy(): void {
		this.ammoPool.recycle(this.entity);
	}

}


// 弹壳类
class Casing {
	private casingPool: SimpleObjectPool<mw.GameObject>; // 弹壳对象池
	private entity: mw.GameObject; // 弹壳实体
	private displacement: mw.Vector; // 位移
	private loc: mw.Vector; // 当前位置
	private gravity: number; // 重力
	private lifeTime: number; // 生命周期
	private stride: mw.Vector; // 步长

	constructor(casingPool: SimpleObjectPool<mw.GameObject>, casing: mw.GameObject, direction: mw.Vector) {
		this.casingPool = casingPool;
		this.loc = mw.Vector.add(casing.worldTransform.position, casing.worldTransform.rotation.rotateVector(CASING_OFFSET));
		this.entity = this.casingPool.allocate();
		this.entity.worldTransform.position = this.loc;
		this.entity.worldTransform.rotation = new mw.Rotation(mw.MathUtil.randomFloat(0, 180), mw.MathUtil.randomFloat(0, 180), mw.MathUtil.randomFloat(0, 180));
		this.entity.setVisibility(mw.PropertyStatus.On);
		this.displacement = direction.multiply(100);
		this.gravity = mw.MathUtil.randomFloat(1, 3);
		this.lifeTime = CASING_LIFE;
		this.stride = mw.Vector.zero;
	}

	// 更新弹壳位置
	update(dt: number) {
		this.stride = mw.Vector.multiply(this.displacement, dt, this.stride);
		this.loc.x += this.stride.x;
		this.loc.y += this.stride.y;
		this.loc.z += this.stride.z + this.gravity;
		this.gravity -= dt * 20;
		this.entity.worldTransform.position = this.loc;
		this.lifeTime -= dt;
		return this.lifeTime <= 0;
	}

	// 销毁弹壳方法，对象池回收弹壳实体
	destroy() {
		this.casingPool.recycle(this.entity);

	}
}

/* 武器动作类 */
class WeaponAction {
	/* 射击动画 */
	shootAnimation: string = "";
	/* 瞄准射击动画 */
	aimShootAnimation: string = "";
	/* 换弹动画 */
	reloadAnimation: string = "";
	/* 上膛动画 */
	loadAnimation: string = "";
	/* 装备武器动画 */
	equipAnimation: string = "";
	/* 卸载武器动画 */
	unequipAnimation: string = "";
	/* 持有姿态 */
	holdStance: string = "";
	/* 瞄准姿态 */
	aimStance: string = "";
}

@Serializable
class MaleAction extends WeaponAction {
	@mw.Property({ displayName: "射击动画" })
	shootAnimation: string = "80484";
	@mw.Property({ displayName: "瞄准射击动画" })
	aimShootAnimation: string = "80483";
	@mw.Property({ displayName: "换弹动画" })
	reloadAnimation: string = "80479";
	@mw.Property({ displayName: "上膛动画" })
	loadAnimation: string = "80482";
	@mw.Property({ displayName: "装备武器动画" })
	equipAnimation: string = "80585";
	@mw.Property({ displayName: "卸载武器动画" })
	unequipAnimation: string = "80481";
	@mw.Property({ displayName: "持有姿态" })
	holdStance: string = "94258";
	@mw.Property({ displayName: "瞄准姿态" })
	aimStance: string = "94261";
}
@Serializable
class FemaleAction extends WeaponAction {
	@mw.Property({ displayName: "射击动画" })
	shootAnimation: string = "49094";
	@mw.Property({ displayName: "瞄准射击动画" })
	aimShootAnimation: string = "49095";
	@mw.Property({ displayName: "换弹动画" })
	reloadAnimation: string = "80479";
	@mw.Property({ displayName: "上膛动画" })
	loadAnimation: string = "80482";
	@mw.Property({ displayName: "装备武器动画" })
	equipAnimation: string = "80585";
	@mw.Property({ displayName: "卸载武器动画" })
	unequipAnimation: string = "80481";
	@mw.Property({ displayName: "持有姿态" })
	holdStance: string = "49096";
	@mw.Property({ displayName: "瞄准姿态" })
	aimStance: string = "49098";

}


@Component
export default class WeaponDriver extends mw.Script {

	/* 提供属性面板设置参数 */

	/*  */
	@mw.Property({ displayName: "男性动作", group: "动作资源", tooltip: "男性角色操作武器的各种动作资源" })
	public maleAction = new MaleAction();

	@mw.Property({ displayName: "女性动作", group: "动作资源", tooltip: "女性角色操作武器的各种动作资源" })
	public femaleAction = new FemaleAction();

	@mw.Property({ displayName: "武器icon", group: "武器属性", tooltip: "武器图标" })
	public WaponIcon = "101168";

	@mw.Property({ displayName: "武器名称", group: "武器属性", tooltip: "武器命名" })
	public weaponName = "步枪";

	@mw.Property({ displayName: "装备插槽", group: "武器属性", tooltip: "角色装备武器的插槽" })
	public equipmentSlot = mw.HumanoidSlotType.RightHand;

	@mw.Property({ displayName: "装备视角偏移", group: "武器属性", tooltip: "角色装备武器后摄像机视角偏移" })
	public equipmentCameraOffset = mw.Vector.zero;

	@mw.Property({ displayName: "装备FOV", group: "武器属性", tooltip: "角色装备武器后视场", range: { max: 170, min: 5 } })
	public equipmentCameraFov = 90;

	@mw.Property({ displayName: "瞄准视角偏移", group: "武器属性", tooltip: "角色瞄准时摄像机视角偏移" })
	public aimCameraOffset = mw.Vector.zero;

	@mw.Property({ displayName: "瞄准FOV", group: "武器属性", tooltip: "角色装备武器后视场", range: { max: 170, min: 5 } })
	public aimCameraFov = 60;

	@mw.Property({ displayName: "瞄准聚焦速度", group: "武器属性", tooltip: "瞄准时视场移动速度", range: { max: 170, min: 5 } })
	public aimSpeed = 90;

	@mw.Property({ displayName: "武器基础伤害", group: "武器属性", tooltip: "武器基础伤害数值" })
	public damage = 30;

	@mw.Property({ displayName: "最大射程", group: "弹药属性", tooltip: "弹药最大射程，超出自动销毁", range: { max: 100000, min: 1 } })
	public shootRange = 5000;

	@mw.Property({ displayName: "弹药速度", group: "弹药属性", tooltip: "弹药飞行速度，单位距离/秒", range: { max: 100000, min: 1 } })
	public ammoSpeed = 10000;

	@mw.Property({ displayName: "碰撞半径", group: "弹药属性", tooltip: "弹药碰撞检测半径，大于10矩形检测，小于等于10射线检测", range: { max: 500, min: 1 } })
	public detectRadius = 1;

	@mw.Property({ displayName: "重力系数", group: "弹药属性", tooltip: "弹药是否受重力影响，重力系数可正可负", range: { max: -10, min: 10 } })
	public gravityScale = 0;

	@mw.Property({ displayName: "伤害范围", group: "弹药属性", tooltip: "弹药爆炸范围，小于等于10为不爆炸", range: { max: 2000, min: 1 } })
	public hurtRadius = 1;

	@mw.Property({ displayName: "自动换弹", group: "辅助功能", tooltip: "勾选后子弹为0时自动换弹" })
	public isAutoReload: boolean = true;

	@mw.Property({ displayName: "辅助瞄准", group: "辅助功能", tooltip: "勾选后开启自动锁定" })
	public isAutoLock: boolean = false;

	@mw.Property({ displayName: "默认UI", group: "辅助功能", tooltip: "勾选后装备武器显示默认UI" })
	public isDefaultUI: boolean = true;

	@mw.Property({ displayName: "弹壳弹出", group: "辅助功能", tooltip: "勾选提供弹壳弹出效果，适用枪械类武器" })
	public isWeaponHaveCasing = true;

	@mw.Property({ displayName: "开火阻挡距离", group: "辅助功能", tooltip: "距离内如果有障碍物阻挡，弹药是真实弹道" })
	public fireBlockDistance: number = 100;

	@mw.Property({ displayName: "弹药数量(-1为无限)", group: "辅助功能", tooltip: "武器总子弹数", range: { max: 10000, min: -1 } })
	public totalAmmo: number = 180;

	@mw.Property({ displayName: "弹夹为空是否销毁武器", group: "辅助功能", tooltip: "勾选后没有子弹了会自动卸载" })
	public isEmptyToDestroy: boolean = true;

	@mw.Property({ displayName: "支持替换弹夹", group: "辅助功能" })
	public isSupportRepAmmo: boolean = false;

	@mw.Property({ displayName: "模型旋转速度", group: "辅助功能" })
	public rotateSpeed: number = 90;

	@mw.Property({ displayName: "持有时限（s）（-1为永久持有）", group: "辅助功能" })
	public keepTime: number = 10;

	@mw.Property({ hideInEditor: true, replicated: true, onChanged: "onEquipdChanged" })
	public isEquiped: boolean = false;

	@mw.Property({ displayName: "瞄准镜", group: "辅助功能", tooltip: "勾选后瞄准时显示至第一人称瞄准镜" })
	public isWeaponHaveScope: boolean = false;

	@mw.Property({ displayName: "自动销毁", group: "辅助功能", tooltip: "勾选后卸载武器时武器会自动销毁" })
	public isAutoDestroy: boolean = true;

	@mw.Property({ displayName: "优先加载", group: "资源", tooltip: "需要优先加载的资源ID" })
	public assets = this.maleAction.aimShootAnimation + "," + this.maleAction.aimStance + "," + this.maleAction.equipAnimation + "," + this.maleAction.holdStance + "," + this.maleAction.loadAnimation + "," + this.maleAction.reloadAnimation + "," + this.maleAction.shootAnimation + "," + this.maleAction.unequipAnimation + "," + this.femaleAction.aimShootAnimation + "," + this.femaleAction.aimStance + "," + this.femaleAction.equipAnimation + "," + this.femaleAction.holdStance + "," + this.femaleAction.loadAnimation + "," + this.femaleAction.reloadAnimation + "," + this.femaleAction.shootAnimation + "," + this.femaleAction.unequipAnimation;

	/* 热武器逻辑对象 */
	weaponObj: mw.HotWeapon = null;

	/* 动作资源 */
	weaponAction: WeaponAction = null;

	/* 武器UI */
	weaponUI: WeaponUI = null;

	/* 当前客户端玩家 */
	player: mw.Player = null;

	/* 当前客户端角色 */
	chara: mw.Character = null;

	/* 当前客户端角色摄像机 */
	camera: Camera = null;

	/* 拾取触发器 */
	pickUpTrigger: mw.Trigger = null;

	/* 根武器 */
	weaponEntityRoot: mw.GameObject = null;

	/* 根弹药 */
	ammoEntityRoot: mw.GameObject = null;

	/* 弹药池 */
	ammoPool: SimpleObjectPool<mw.GameObject> = null;

	/* 弹药数组 */
	ammoArray: Array<Ammo> = [];

	/* 弹壳 */
	casingEntity: mw.GameObject = null;

	/* 弹壳池 */
	casingPool: SimpleObjectPool<mw.GameObject> = null;

	/* 弹壳数组 */
	casingArray: Array<Casing> = [];

	/* 开火特效 */
	fireEffect: mw.Effect = null;

	/* 击中角色特效 */
	hitCharaEffect: mw.Effect = null;

	/* 击中角色特效池 */
	hitCharaEffectPool: SimpleObjectPool<mw.Effect> = null;

	/* 击中物体特效 */
	hitEffect: mw.Effect = null;

	/* 击中物体特效池 */
	hitEffectPool: SimpleObjectPool<mw.Effect> = null;

	/* 音效音量 */
	static soundVolume: number = 1;

	/* 开火音效 */
	fireSound: mw.Sound = null;

	/* 换弹音效 */
	reloadSound: mw.Sound = null;

	/* 上膛音效 */
	loadSound: mw.Sound = null;

	/* 瞄准音效 */
	aimSound: mw.Sound = null;

	/* 击中角色音效 */
	hitCharaSound: mw.Sound = null;

	/* 击中角色音效池 */
	hitCharaSoundPool: SimpleObjectPool<mw.Sound> = null;

	/* 击中物体音效 */
	hitSound: mw.Sound = null;

	/* 击中物体音效池 */
	hitSoundPool: SimpleObjectPool<mw.Sound> = null;

	/* 开火状态标识， isFiring是武器持有人实际的开火状态*/
	isFiring: boolean = false;

	/* bFiring是武器实际的开火状态 */
	bFiring: boolean = false;

	/* 是否可以开火 */
	isCanFire: number = 0;

	/* 瞄准状态标识 */
	isAimming: boolean = false;

	/* 焦距变化标识 */
	isZooming: boolean = false;

	/* 阻挡状态标识 */
	isBlock: boolean = false;

	/** 剩余持有时间 */
	private _restTime: number;
	// /* 弹药飞行方向 */
	// ammoDirection: mw.Vector = mw.Vector.zero;

	/* 击中回调函数 */
	clientOnHit: (hitResult: mw.GameObject[] | mw.HitResult[], attackPlayer: number, isObj: boolean) => void;

	/* 阻挡标识变化回调函数 */
	clientOnBlockChange: (isBlock: boolean) => void;



	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	@PrefabReport(23)
	protected onStart(): void {
		this.useUpdate = true;
		this.weaponObj = this.gameObject as mw.HotWeapon;
		if (this.weaponObj) {
			if (mw.SystemUtil.isClient()) {
				this.clientInit();
			}
			if (mw.SystemUtil.isServer()) {
				this.serverInit();
			}

			if (mw.SystemUtil.isClient()) {
				this.clientOnHit = (hitResult: mw.GameObject[] | mw.HitResult[], attackPlayer: number, isObj: boolean) => {
					hitResult.forEach(e => {

						if (e instanceof mw.HitResult) {
							if (PlayerManagerExtesion.isCharacter(e.gameObject) ||
								e.gameObject instanceof mw.GameObject) {
								PrefabEvent.PrefabEvtFight.hit(this.chara.gameObjectId, e.gameObject.gameObjectId, this.damage, e.impactPoint.clone());
								return;
							}
						}

						if (PlayerManagerExtesion.isCharacter(e) || e instanceof mw.GameObject) {
							PrefabEvent.PrefabEvtFight.hit(this.chara.gameObjectId, e.gameObjectId, this.damage, e.worldTransform.position.clone());
							return;
						}

					})

				};

				PrefabEvent.PrefabEvtEquip.onEquip(async (targetGuid: string, slot: PrefabEvent.EquipSlot, equipGuid: string) => {
					//let player = await Player.asyncGetLocalPlayer();
					if (this.weaponObj && this.weaponObj.getCurrentOwner() && this.weaponObj.getCurrentOwner().gameObjectId == targetGuid && this.weaponObj.gameObjectId != equipGuid) {
						this.unEquip();
					}
				})

			}

		}
	}
	private _rotateRotation: Rotation = Rotation.zero;
	private onEquipdChanged() {
		if (this.weaponEntityRoot && this.weaponEntityRoot.localTransform) this.weaponEntityRoot.localTransform.rotation = Rotation.zero;
	}


	/**
	 * 周期函数 每帧执行
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 * @param dt 当前帧与上一帧的延迟 / 秒
	 */
	protected onUpdate(dt: number): void {
		if (mw.SystemUtil.isServer()) return;
		if (this.weaponObj == null) {
			this.weaponObj = this.gameObject as mw.HotWeapon;
			if (this.weaponObj == null) return;
			this.clientInit();
		}

		if (!this.isEquiped && this.weaponEntityRoot) {
			this._rotateRotation.z = this.rotateSpeed * dt;
			this.weaponEntityRoot.worldTransform.rotation = this.weaponEntityRoot.worldTransform.rotation.add(this._rotateRotation);
			return;
		}

		for (let i = 0; i < this.ammoArray.length; i++) {
			if (this.ammoArray[i].update(dt)) {
				if (this.ammoArray[i].owner == this.chara) {
					this.serverDestroyAmmo(i);
					this.hit(this.ammoArray[i].hitResult);
					this.ammoArray[i].destroy();
					this.ammoArray.splice(i, 1);
					i--;
				}
			}
		}

		for (let i = 0; i < this.casingArray.length; i++) {
			if (this.casingArray[i].update(dt)) {
				this.casingArray[i].destroy();
				this.casingArray.splice(i, 1);
				i--;
			}
		}

		if (this.weaponObj.getCurrentOwner() !== this.chara) return;

		if (this.isCanFire != 0) {
			this.isCanFire -= dt;
			if (this.isCanFire < 0) {
				this.isCanFire = 0;
			}
		}

		this.cameraUpdate(dt);

		if (!this.updatebFiring()) {
			if (!this.bFiring && this.fireEffect.loop && this.fireSound.isLoop) {
				this.fireEffect.stop();
				this.fireSound.stop();
				if (!this.isAimming) {
					this.weaponObj.aimComponent.enableAiming(false);
				}
			}
		}

		if (!this.updateBlockFire()) {
			if (this.clientOnBlockChange) this.clientOnBlockChange(this.isBlock);
		}

		switch (this.weaponObj.getCurrentState()) {
			case mw.HotWeaponState.Idle:
				if (this.weaponObj.fireComponent.currentBullet < 1) {
					if (this.isAutoReload) {
						this.startReload();
						this.isAutoReload = false;
						setTimeout(() => {
							this.isAutoReload = true;
						}, this.weaponObj.reloadComponent.reloadDuration * 1000);
					}
				} else {
					if (this.isFiring && !this.bFiring && this.weaponObj.fireComponent.fireMode == 2) {
						this.startFire();
					}
				}

				break;

			case mw.HotWeaponState.Reloading:

				break;

			case mw.HotWeaponState.Loading:

				break;

			case mw.HotWeaponState.Firing:
				if (this.isEmptyToDestroy && this.totalAmmo == 0 && this.weaponObj.fireComponent.currentBullet == 0) {
					this.unEquip();
				}
				break;

			default:
				break;
		}

		if (this.weaponUI) {
			this.weaponUI.changeBullet(this.weaponObj.fireComponent.currentBullet, this.totalAmmo);
			if (this.keepTime != -1) {
				this._restTime -= dt;
				this.weaponUI.setTimeText(this._restTime, this.keepTime);
				if (this._restTime <= 0) {
					this.unEquip();
				}
			}
		}
	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {
		// this.clientDestroy();
	}

	/* 击中对象函数 */
	private hit(hitResult: mw.GameObject[] | mw.HitResult[]) {
		if (!(hitResult.length > 0)) return;
		if (this.detectRadius > 10) { // 矩形检测结果
			for (let element of hitResult) {
				let temp = element as mw.GameObject;
				if (temp instanceof mw.Pawn) {
					this.hitCharacterMulticast(temp.worldTransform.position, temp.worldTransform.rotation);
				} else {
					this.hitObjectMulticast(temp.worldTransform.position, temp.worldTransform.rotation);
				}
			}
			if (this.hurtRadius > 10) {
				let sphereResult = QueryUtil.sphereOverlap((hitResult[0] as mw.GameObject).worldTransform.position, this.hurtRadius, DEBUG_FLAG);
				this.clientOnHit(sphereResult, this.player.playerId, true);
			} else {
				this.clientOnHit(hitResult, this.player.playerId, true);
			}
		} else { // 射线检测结果
			for (let element of hitResult) {
				let temp = element as mw.HitResult;
				let rot = temp.impactNormal.toRotation();
				rot.y -= 90;
				if (temp.gameObject instanceof mw.Pawn) {
					this.hitCharacterMulticast(temp.impactPoint, rot);
				} else {
					this.hitObjectMulticast(temp.impactPoint, rot);
				}
			}
			if (this.hurtRadius > 10) {
				let sphereResult = QueryUtil.sphereOverlap((hitResult[0] as mw.HitResult).impactPoint, this.hurtRadius, DEBUG_FLAG);
				this.clientOnHit(sphereResult, this.player.playerId, true);
			} else {
				this.clientOnHit(hitResult, this.player.playerId, false);
			}
		}
	}

	/* 广播击中角色 */
	@RemoteFunction(mw.Server)
	private hitCharacterMulticast(loc: mw.Vector, rot: mw.Rotation) {
		this.hitCharaPerformance(loc, rot);
	}

	/* 广播击中普通对象 */
	@RemoteFunction(mw.Server)
	private hitObjectMulticast(loc: mw.Vector, rot: mw.Rotation) {
		this.hitObjectPerformance(loc, rot);
	}

	@RemoteFunction(mw.Client, mw.Multicast)
	private hitCharaPerformance(loc: mw.Vector, rot: mw.Rotation) {
		// Console.error("hit Chara");
		try {
			if (this.hitCharaEffect) GeneralManager.rpcPlayEffectAtLocation(this.hitCharaEffect.assetId, loc, 1, rot, this.hitCharaEffect.worldTransform.scale);
			if (this.hitCharaSound) SoundService.play3DSound(this.hitCharaSound.assetId, loc, 1, 1, { falloffDistance: 3000 });
		} catch (error) {
			Console.error("hitCharaPerformance:" + error);
		}
	}

	@RemoteFunction(mw.Client, mw.Multicast)
	private hitObjectPerformance(loc: mw.Vector, rot: mw.Rotation) {
		// Console.error("hit hitObject");
		try {
			if (this.hitEffect) GeneralManager.rpcPlayEffectAtLocation(this.hitEffect.assetId, loc, 1, rot, this.hitEffect.worldTransform.scale);
			if (this.hitSound) SoundService.play3DSound(this.hitSound.assetId, loc, 1, 1, { falloffDistance: 3000 });
		} catch (error) {
			Console.error("hitObjectPerformance:" + error);
		}
	}

	// @RemoteFunction(mw.Client, mw.Multicast)
	// private hitCharaPerformance(loc: mw.Vector, rot: mw.Rotation, target: mw.GameObject) {
	// 	Console.error("hit Chara");
	// 	let hitCharaEffect = mwext.SpawnManager.modifyPoolSpawn(this.hitCharaEffect.guid) as mw.Effect;
	// 	hitCharaEffect.parent = null;
	// 	let hitCharaSound = mwext.SpawnManager.modifyPoolSpawn(this.hitCharaSound.guid) as mw.Sound;
	// 	hitCharaSound.parent = null;
	// 	hitCharaSound.onFinish.add(() => {
	// 		mwext.GameObjPool.despawn(hitCharaSound);
	// 	});
	// 	hitCharaEffect.worldTransform.position = loc;
	// 	hitCharaSound.worldTransform.position = loc;
	// 	hitCharaEffect.worldTransform.rotation = rot;
	// 	hitCharaEffect.parent = target;
	// 	hitCharaEffect.play(() => {
	// 		mwext.GameObjPool.despawn(hitCharaEffect);
	// 		hitCharaEffect.parent = null;
	// 	});
	// 	this.playSound(hitCharaSound);
	// }

	// @RemoteFunction(mw.Client, mw.Multicast)
	// private hitObjectPerformance(loc: mw.Vector, rot: mw.Rotation, target: mw.GameObject) {
	// 	Console.error("hit hitObject");
	// 	let hitEffect = mwext.SpawnManager.modifyPoolSpawn(this.hitEffect.guid) as mw.Effect;
	// 	hitEffect.parent = null;
	// 	let hitSound = mwext.SpawnManager.modifyPoolSpawn(this.hitSound.guid) as mw.Sound;
	// 	hitEffect.parent = null;
	// 	hitSound.onFinish.add(() => {
	// 		mwext.GameObjPool.despawn(hitSound);
	// 	});
	// 	hitEffect.worldTransform.position = loc;
	// 	hitSound.worldTransform.position = loc;
	// 	hitEffect.worldTransform.rotation = rot;
	// 	if (target) {
	// 		hitEffect.parent = target;
	// 	}
	// 	hitEffect.play(() => {
	// 		mwext.GameObjPool.despawn(hitEffect);
	// 		hitEffect.parent = null;
	// 	});
	// 	this.playSound(hitSound);
	// }


	/* 播放特效 */
	private playEffect(particle: mw.Effect): void {

	}

	/* 播放音效 */
	private playSound(sound: mw.Sound): void {
		sound.volume = WeaponDriver.soundVolume;
		sound.play();
	}

	@RemoteFunction(mw.Server)
	private serverDestroyAmmo(index: number) {
		this.clientDestroyAmmo(index);
	}

	@RemoteFunction(mw.Client, mw.Multicast)
	private clientDestroyAmmo(index: number) {
		if (!this.weaponObj) {
			return;
		}
		if (this.weaponObj.getCurrentOwner() == this.chara) {
			return;
		} else if (this.ammoArray.length != 0) {
			if (index < this.ammoArray.length) {
				this.ammoArray[index].destroy();
				this.ammoArray.splice(index, 1);
			}
		}
	}

	/**
	 * 客户端调用直接装备
	 */
	public equip() {
		// 如果当前角色为空且在客户端，重新获取一次角色
		if (!this.chara && mw.SystemUtil.isClient()) {
			this.chara = Player.localPlayer.character;
		}
		this.serverEquip(this.chara.player.playerId);
	}

	/**
	 * unEquip
	 */
	public unEquip() {
		try {
			if (!this.weaponObj) return;
			if (this.chara !== this.weaponObj.getCurrentOwner()) return;
			if (this.isAimming) {
				this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax;
				this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault;
				this.isAimming = false;
			}
			this.weaponObj?.stopFire();
			this.weaponObj?.breakLoad();
			this.weaponObj?.breakReload();
			this.weaponObj?.destroy();
			this.weaponObj?.unequip();
			mw.UIService.hide(WeaponUI);
			this.weaponUI = null;
			PlayerManagerExtesion.changeStanceExtesion(this.chara, this.tempanimationStance?.assetId);
			PlayerManagerExtesion.rpcPlayAnimation(this.chara, this.weaponAction.unequipAnimation);
			this.chara.moveFacingDirection = this.tempMoveFacingDirection;
			this.camera.localTransform = new mw.Transform(this.tempcameraOffset, this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
			this.camera.springArm.localTransform = new mw.Transform(this.temptargetArmOffset, this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
			this.camera.fov = this.tempcameraFOV;
			this.camera.springArm.length = this.temptargetArmLength;
			if (this.isAutoDestroy) {
				mw.UIService.destroyUI(WeaponUI);
				this.weaponObj = null;
				let destroyInterval = setInterval(() => {
					if (this.ammoArray.length == 0 && this.casingArray.length == 0) {
						this.serverDestroy();
						clearInterval(destroyInterval);
					}
				}, 100)
			}
		} catch (error) {
			Console.error("unEquip-[error]" + error);
		}
	}

	@RemoteFunction(mw.Server)
	private serverHideWeaponEntity(playerID: number): void {
		// 如果卸载的是当前武器，先隐藏武器，等待子弹销毁完毕后卸载并销毁武器，删除map中对应键值
		this.hideWeaponEntity();
	}

	@RemoteFunction(mw.Client, mw.Multicast)
	private hideWeaponEntity() {
		if (!this.weaponEntityRoot) return;
		this.weaponEntityRoot.setVisibility(mw.PropertyStatus.Off);
	}

	// @RemoteFunction(mw.Client, mw.Multicast)
	// private showWeaponEntity() {
	// 	if (!this.weaponEntityRoot) return;
	// 	this.weaponEntityRoot.setVisibility(mw.PropertyStatus.On);
	// }

	@RemoteFunction(mw.Server)
	private serverDestroy(): void {
		this.destroy();
	}


	/**
	 * startFire
	 */
	public startFire() {
		if (!this.weaponObj || this.isCanFire != 0) return;
		try {
			this.weaponObj.startFire();
			this.isFiring = true;
			if (!this.isAimming) {
				this.weaponObj.aimComponent.enableAiming(true);
			}
		} catch (error) {
			Console.error("startFire-[error]" + error);
		}
	}

	/**
	 * stopFire
	 */
	public stopFire() {
		if (this.weaponObj == null) return;
		try {
			this.weaponObj.stopFire();
			this.isFiring = false;
			if (!this.isAimming) {
				this.weaponObj.aimComponent.enableAiming(false);
			}
		} catch (error) {
			Console.error("stopFire:" + error);
		}
	}

	/**
	 * startReload
	 */
	public startReload() {
		try {
			if (!this.weaponObj || !this.weaponObj.reloadEnabled || this.weaponObj.fireComponent.currentBullet == this.weaponObj.fireComponent.clipSize) return;
			let ammoGap = this.weaponObj.fireComponent.clipSize - this.weaponObj.fireComponent.currentBullet;

			if (this.totalAmmo == -1) {
				this.weaponObj.reload(ammoGap);
			}
			if (this.totalAmmo <= 0) {
				return;
			}
			if (this.totalAmmo < ammoGap) {
				this.weaponObj.reload(this.totalAmmo);
				this.totalAmmo = 0;
			} else {
				this.weaponObj.reload(ammoGap);
				this.totalAmmo -= ammoGap;
			}
		} catch (error) {
			Console.error("startReload:" + error);
		}
	}

	/**
	 * stopReload
	 */
	public stopReload() {
		if (this.weaponObj == null) return;
		this.weaponObj.breakReload();
		this.weaponObj.breakLoad();
	}

	private tempDispersionMax = 0;
	private tempDispersionDefault = 0;



	/**
	 * startAim
	 */
	public startAim() {
		Console.error("startAim")
		try {
			if (this.aimSound) {
				this.aimSound.stop();
				this.aimSound.play();
			}
			PlayerManagerExtesion.changeStanceExtesion(this.chara, this.weaponAction.aimStance);
			this.weaponObj.fireComponent.animationAssetId = this.weaponAction.aimShootAnimation;
			this.tempDispersionDefault = this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle;
			this.tempDispersionMax = this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle;
			this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle;
			this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle;
			this.isZooming = true;
			this.zoomIn();
			if (this.isWeaponHaveScope) {
				this.camera.springArm.length = 0;
			}
		} catch (error) {
			Console.error("startAim:" + error);
		}
	}

	/**
	 * stopAim
	 */
	public stopAim() {
		Console.error("stopAim")
		try {
			this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax;
			this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault;
			PlayerManagerExtesion.changeStanceExtesion(this.chara, this.weaponAction.holdStance);
			this.weaponObj.fireComponent.animationAssetId = this.weaponAction.shootAnimation;
			this.isZooming = true;
			this.zoomOut();
			if (this.isWeaponHaveScope) {
				this.camera.springArm.length = 400;
			}
			this.aimSound.stop();
			this.aimSound.play();
		} catch (error) {
			Console.error("stopAim:" + error);
		}
	}

	/**
	 * startLoad
	 */
	public startLoad() {

	}

	/**
	 * endLoad
	 */
	public endLoad() {

	}

	/* getBulletSize */
	public getBulletSize(): number {
		if (this.weaponObj == null) return;
		return this.weaponObj.fireComponent.currentBullet;
	}

	/* 客户端销毁方法 */
	private clientDestroy() {
		if (this.pickUpTrigger) {
			this.pickUpTrigger.destroy();
		}
		if (this.weaponEntityRoot) {
			this.weaponEntityRoot.destroy();
		}
		if (this.ammoEntityRoot) {
			this.ammoEntityRoot.destroy();
		}
		if (this.casingEntity) {
			this.casingEntity.destroy();
		}
		if (this.fireEffect) {
			this.fireEffect.destroy();
		}
		if (this.fireSound) {
			this.fireSound.destroy();
		}
		if (this.hitCharaEffect) {
			this.hitCharaEffect.destroy();
		}
		if (this.hitCharaSound) {
			this.hitCharaSound.destroy();
		}
		if (this.hitEffect) {
			this.hitEffect.destroy();
		}
		if (this.hitSound) {
			this.hitSound.destroy();
		}
		if (this.reloadSound) {
			this.reloadSound.destroy();
		}
		if (this.aimSound) {
			this.aimSound.destroy();
		}
		if (this.loadSound) {
			this.loadSound.destroy();
		}
	}


	/* 初始化资源 */
	private initAssets(assetIds: string): void {
		let assetIdArray = this.resolveString(assetIds);
		for (let element of assetIdArray) {
			mw.AssetUtil.asyncDownloadAsset(element).then((value: boolean) => {
				if (value) {
					mw.AssetUtil.assetLoaded(element);
				}
			});
		}
	}
	/* 服务端初始化方法 */
	private serverInit() {
		this.serverInitDelegate();

	}

	/* 服务端初始化回调函数 */
	private serverInitDelegate(): void {
		this.weaponObj.onEquip.add(this.onServerEquip.bind(this));
		this.weaponObj.onUnequip.add(this.onServerUnequip.bind(this));

		this.weaponObj.fireComponent.onStartFire.add(this.onServerStartFire.bind(this));
		this.weaponObj.fireComponent.onEndFire.add(this.onServerEndFire.bind(this));
		if (this.weaponObj.reloadComponent) {
			this.weaponObj.reloadComponent.onStartReload.add(this.onServerStartReload.bind(this));
			this.weaponObj.reloadComponent.onEndReload.add(this.onServerEndReload.bind(this));
		}
		if (this.weaponObj.loadComponent) {
			this.weaponObj.loadComponent.onStartLoad.add(this.onServerStartLoad.bind(this));
			this.weaponObj.loadComponent.onEndLoad.add(this.onServerEndLoad.bind(this));
		}
		if (this.weaponObj.aimComponent) {
			this.weaponObj.aimComponent.onStartAim.add(this.onServerStartAim.bind(this));
			this.weaponObj.aimComponent.onEndAim.add(this.onServerEndAim.bind(this));
		}
		if (this.weaponObj.recoilForceComponent) {
			this.weaponObj.recoilForceComponent.onStartRecoil.add(this.onServerStartRecoil.bind(this));
		}
	}

	/* 服务端开始开火回调 */
	private onServerEquip() {
		Console.error("ServerEquip " + this.weaponObj.getCurrentOwner().displayName);
		if (!this.weaponObj.getCurrentOwner()) return;
		let v2 = this.weaponObj.getCurrentOwner()
		if ((v2.description.advance.base.characterSetting.somatotype % 2) == 0) {
			Console.error("female")
			this.changeWeaponAction(0)
			this.clientEquip(this.weaponObj.getCurrentOwner().player, 0);
		} else {
			Console.error("male")
			this.changeWeaponAction(1)
			this.clientEquip(this.weaponObj.getCurrentOwner().player, 1);
		}
	}

	/* 服务端卸载装备完成回调 */
	private onServerUnequip() {
		Console.error("onServerUnequip");

	}

	/* 服务端开始开火回调 */
	private onServerStartFire() {

	}

	/* 服务端结束开火回调 */
	private onServerEndFire() {

	}

	/* 服务端开始换弹回调 */
	private onServerStartReload() {

	}

	/* 服务端结束换弹回调 */
	private onServerEndReload() {

	}

	/* 服务端开始上膛回调 */
	private onServerStartLoad() {

	}

	/* 服务端结束上膛回调 */
	private onServerEndLoad() {

	}

	/* 服务端开始瞄准回调 */
	private onServerStartAim() {

	}

	/* 服务端结束瞄准回调 */
	private onServerEndAim() {

	}

	/* 服务端开始后坐力回调 */
	private onServerStartRecoil() {

	}

	private _isInited: boolean = false;

	/* 客户端初始化方法 */
	private clientInit() {
		if (this._isInited) {
			return;
		}
		this._isInited = true;
		/* 获取玩家相关对象 */
		Player.asyncGetLocalPlayer().then((player: mw.Player) => {
			this.player = player;
			this.chara = this.player.character;
			this.camera = Camera.currentCamera;
			this.clientInitWeaponEntityRoot();
			this.clientInitPickUpTrigger();
			this.clientInitAmmoEntityRoot();
			this.clientInitCasingEntity();
			this.clientInitHitCharaEffect();
			this.clientInitHitEffect();
			this.clientInitFireEffect();
			this.clientInitFireSound();
			this.clientInitReloadSound();
			this.clientInitLoadSound();
			this.clientInitAimSound();
			this.clientInitHitCharaSound();
			this.clientInitHitSound();
			this.clientInitDelegate();
		});
		Event.addLocalListener("IsOpenUI", (isOpenUI: boolean) => {
			if (!this.weaponUI) return;
			try {
				if (!this.weaponUI.rootCanvas) return;
				this.weaponUI.rootCanvas.visibility = isOpenUI ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
			} catch (error) {
				Console.error("addLocalListener-IsOpenUI-[error]" + error);
			}
		});
	}

	/* 客户端初始化根武器实体 */
	private clientInitWeaponEntityRoot(): void {
		try {
			this.weaponEntityRoot = this.weaponObj.getChildByName("weaponEntityRoot") as mw.GameObject;
		} catch (error) {
			Console.error("clientInitWeaponEntityRoot:" + error);
		}
	}

	/* 客户端初始化拾取触发器 */
	private clientInitPickUpTrigger(): void {
		this.pickUpTrigger = this.weaponObj.getChildByName("pickUpTrigger") as mw.Trigger;
		if (this.pickUpTrigger) {
			if (this.pickUpTrigger.checkInArea(this.chara)) {
				this.serverEquip(this.player.playerId);
				Console.error("B");
			}
			this.pickUpTrigger.onEnter.add((char: mw.Character) => {
				if (char.gameObjectId == this.chara.gameObjectId) {
					this.serverEquip(this.player.playerId);
					console.error("A");
				}
			});
		}
	}

	/* 服务端装备 */
	@RemoteFunction(mw.Server)
	private serverEquip(playerID: number): void {
		let player = Player.getPlayer(playerID);
		// 如果装备时玩家为空则返回
		if (player == null || !this.weaponObj) return;
		this.weaponObj.equip(player.character, this.equipmentSlot);
		this.isEquiped = true;
		PrefabEvent.PrefabEvtEquip.equip(player.character.gameObjectId, PrefabEvent.EquipSlot.Weapon, this.weaponObj.gameObjectId);
	}



	/* 修改预制体动作资源 */
	private changeWeaponAction(sex: number) {
		Console.error("changeWeaponAction " + sex)
		sex == 0 ? this.weaponAction = this.femaleAction : this.weaponAction = this.maleAction;
		if (this.weaponObj) {
			this.weaponObj.fireComponent.animationAssetId = this.weaponAction.shootAnimation;
			if (this.weaponObj.reloadEnabled) {
				this.weaponObj.reloadComponent.animationAssetId = this.weaponAction.reloadAnimation;
			}
			if (this.weaponObj.loadEnabled) {
				this.weaponObj.loadComponent.animationAssetId = this.weaponAction.loadAnimation;
			}
		}
	}

	private tempMoveFacingDirection: number;
	private temptargetArmLength: number;
	private tempcameraFOV: number;
	private tempcameraOffset: mw.Vector;
	private temptargetArmOffset: mw.Vector;
	private tempanimationStance: Stance;

	/* 客户端装备 */
	@RemoteFunction(mw.Client)
	private clientEquip(pickPlayer: mw.Player, gender: number): void {
		if (!this.camera) {
			this.camera = Camera.currentCamera;
		}
		if (!this.weaponObj) {
			this.weaponObj = this.gameObject as mw.HotWeapon;
		}
		this.weaponObj.equip(this.chara, this.equipmentSlot);
		//Event.dispatchToLocal(UNEQUIP_EVENT);
		this.changeWeaponAction(gender);
		// setTimeout(() => {
		// 	Event.dispatchToLocal(EQUIP_EVENT, this);
		this.tempMoveFacingDirection = this.chara.moveFacingDirection;
		this.tempanimationStance = this.chara.currentStance;
		this.temptargetArmLength = this.camera.springArm.length;
		this.temptargetArmOffset = this.camera.springArm.localTransform.clone().position;
		this.tempcameraFOV = this.camera.fov;
		this.tempcameraOffset = this.camera.localTransform.clone().position;
		PlayerManagerExtesion.changeStanceExtesion(this.chara, this.weaponAction.holdStance);
		PlayerManagerExtesion.rpcPlayAnimation(this.chara, this.weaponAction.equipAnimation);
		this.chara.moveFacingDirection = mw.MoveFacingDirection.ControllerDirection;
		this.camera.springArm.length = 400;
		this.camera.fov = this.equipmentCameraFov;
		this.camera.localTransform = new mw.Transform(this.equipmentCameraOffset, this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
		this.camera.springArm.localTransform = new mw.Transform(new mw.Vector(0, 0, 60), this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
		this.weaponUI = mw.UIService.show(WeaponUI, this, this.weaponObj.accuracyOfFireEnabled ? this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle : 0, this.WaponIcon, this.weaponName);
		this.weaponUI.setTimeText(this.keepTime, this.keepTime);
		this.weaponUI.setReloadBtn(!this.isSupportRepAmmo);
		if (this.isSupportRepAmmo) {
			this.weaponObj.reloadComponent.animationAssetId = this.weaponAction.aimShootAnimation;
			this.weaponObj.loadComponent.animationAssetId = this.weaponAction.aimShootAnimation;
		}
		this._restTime = this.keepTime;
		// }, 100);
	}
	/* 修改FOV */
	public changeFov(value: number) {
		this.camera.fov = value;
	}


	/* 客户端初始化根弹药实体 */
	private clientInitAmmoEntityRoot(): void {
		this.ammoEntityRoot = this.weaponObj.getChildByName("ammoEntityRoot") as mw.GameObject;
		this.ammoPool = new SimpleObjectPool<mw.GameObject>(this.instanceAmmo.bind(this), (obj: mw.GameObject) => { obj.destroy() }, (obj: mw.GameObject) => { obj.setVisibility(mw.PropertyStatus.Off) });
	}

	/* 客户端初始化弹壳实体 */
	private clientInitCasingEntity(): void {
		this.casingEntity = this.weaponObj.getChildByName("casingEntity") as mw.GameObject;
		this.casingPool = new SimpleObjectPool<mw.GameObject>(this.instanceCasing.bind(this), (obj: mw.GameObject) => { obj.destroy() }, (obj: mw.GameObject) => { obj.setVisibility(mw.PropertyStatus.Off) });
	}

	/* 客户端初始化击中角色特效 */
	private clientInitHitCharaEffect(): void {
		this.hitCharaEffect = this.weaponObj.getChildByName("hitCharaEffect") as mw.Effect;
		this.hitCharaEffectPool = new SimpleObjectPool<mw.Effect>(this.instanceHitCharaEffect.bind(this), (particle: mw.Effect) => { particle.destroy() }, (particle: mw.Effect) => { particle.parent = null; particle.stop() });
	}

	/* 客户端初始化击中物体特效 */
	private clientInitHitEffect(): void {
		this.hitEffect = this.weaponObj.getChildByName("hitEffect") as mw.Effect;
		this.hitEffectPool = new SimpleObjectPool<mw.Effect>(this.instanceHitEffect.bind(this), (particle: mw.Effect) => { particle.destroy() }, (particle: mw.Effect) => { particle.parent = null; particle.stop() });
	}

	/* 客户端初始化开火特效 */
	private clientInitFireEffect(): void {
		this.fireEffect = this.weaponObj.getChildByName("fireEffect") as mw.Effect;
		this.fireEffect.loopCount = 1;
	}

	/* 客户端初始化开火音效 */
	private clientInitFireSound(): void {
		this.fireSound = this.weaponObj.getChildByName("fireSound") as mw.Sound;
	}

	/* 客户端初始化换弹音效 */
	private clientInitReloadSound(): void {
		this.reloadSound = this.weaponObj.getChildByName("reloadSound") as mw.Sound;
	}

	/* 客户端初始化上膛音效 */
	private clientInitLoadSound(): void {
		this.loadSound = this.weaponObj.getChildByName("loadSound") as mw.Sound;
	}

	/* 客户端初始化瞄准音效 */
	private clientInitAimSound(): void {
		this.aimSound = this.weaponObj.getChildByName("aimSound") as mw.Sound;
	}

	/* 客户端初始化根击中角色音效 */
	private clientInitHitCharaSound(): void {
		this.hitCharaSound = this.weaponObj.getChildByName("hitCharaSound") as mw.Sound;
		this.hitCharaSoundPool = new SimpleObjectPool<mw.Sound>(this.instanceHitCharaSound.bind(this), (sound: mw.Sound) => { sound.destroy() }, (sound: mw.Sound) => { sound.stop() });

	}

	/* 客户端初始化根击中物体音效 */
	private clientInitHitSound(): void {
		this.hitSound = this.weaponObj.getChildByName("hitSound") as mw.Sound;
		this.hitSoundPool = new SimpleObjectPool<mw.Sound>(this.instanceHitSound.bind(this), (sound: mw.Sound) => { sound.destroy() }, (sound: mw.Sound) => { sound.stop() });
	}

	/* 返回一个弹药实例 */
	private instanceAmmo() {
		let ammo = this.ammoEntityRoot.clone();
		ammo.parent = null;
		ammo.setVisibility(mw.PropertyStatus.On);
		return ammo;
	}

	/* 返回一个弹壳实例 */
	private instanceCasing() {
		let casing = this.casingEntity.clone();
		casing.parent = null;
		casing.setVisibility(mw.PropertyStatus.On);
		return casing;
	}

	/* 返回一个击中角色特效实例 */
	private instanceHitCharaEffect() {
		let hitChara = this.hitCharaEffect.clone() as mw.Effect;
		hitChara.parent = null;
		return hitChara;
	}

	/* 返回一个击中物体特效实例 */
	private instanceHitEffect() {
		let hit = this.hitEffect.clone() as mw.Effect;
		hit.parent = null;
		return hit;
	}

	/* 返回一个击中角色音效实例 */
	private instanceHitCharaSound() {
		let hitChara = this.hitCharaSound.clone() as mw.Sound;
		hitChara.parent = null;
		return hitChara;
	}

	/* 返回一个击中音效实例 */
	private instanceHitSound() {
		let hit = this.hitSound.clone() as mw.Sound;
		hit.parent = null;
		return hit;
	}



	/* 客户端初始化回调函数 */
	private clientInitDelegate(): void {
		this.weaponObj.onEquip.add(this.onClientEquip.bind(this));
		this.weaponObj.onUnequip.add(this.onClientUnequip.bind(this));

		this.weaponObj.fireComponent.onStartFire.add(this.onClientStartFire.bind(this));
		this.weaponObj.fireComponent.onEndFire.add(this.onClientEndFire.bind(this));
		if (this.weaponObj.reloadEnabled) {
			this.weaponObj.reloadComponent.onStartReload.add(this.onClientStartReload.bind(this));
			this.weaponObj.reloadComponent.onEndReload.add(this.onClientEndReload.bind(this));
		}
		if (this.weaponObj.loadEnabled) {
			this.weaponObj.loadComponent.onStartLoad.add(this.onClientStartLoad.bind(this));
			this.weaponObj.loadComponent.onEndLoad.add(this.onClientEndLoad.bind(this));
		}
		if (this.weaponObj.aimEnabled) {
			this.weaponObj.aimComponent.onStartAim.add(this.onClientStartAim.bind(this));
			this.weaponObj.aimComponent.onEndAim.add(this.onClientEndAim.bind(this));
		}
		if (this.weaponObj.recoilForceEnabled) {
			this.weaponObj.recoilForceComponent.onStartRecoil.add(this.onClientStartRecoil.bind(this));
		}
		if (this.weaponObj.accuracyOfFireEnabled) {
			this.weaponObj.accuracyOfFireComponent.onCurrentDispersionChange.add(this.onClientCurrentDispersionChanged.bind(this));
		}

		// this.clientOnHit = ((hitResult: mw.GameObject[] | mw.HitResult[], attackPlayer: number, isObj: boolean) => {
		// 	if (isObj) {
		// 		for (const element of hitResult) {
		// 			Console.error("hit " + (element as mw.GameObject).guid);
		// 		}
		// 	} else {
		// 		for (const element of hitResult) {
		// 			Console.error("hit " + (element as mw.HitResult).gameObject.guid);
		// 		}
		// 	}
		// });

		this.clientOnBlockChange = ((isBlock: boolean) => {
			Console.error("isBlock " + isBlock);
		});
	}

	/* 客户端开始装备完成回调 */
	private onClientEquip() {
		Console.error("ClientEquip");
		try {
			// 装备的武器如果有拾取触发器
			if (this.pickUpTrigger) {
				this.pickUpTrigger.enabled = false;
			}
		} catch (error) {
			Console.error("onClientEquip:" + error);
		}

		// 装备的武器对象如果有武器实体，则把可见性打开
		if (!this.weaponEntityRoot) {
			this.weaponEntityRoot.setVisibility(mw.PropertyStatus.On);
		}

	}


	/* 客户端卸载装备完成回调 */
	private onClientUnequip() {
		Console.error("onClientUnequip");
		if (!this.weaponObj) return;
		if (this.isAutoDestroy) {
			this.weaponObj.setVisibility(mw.PropertyStatus.Off);
			this.weaponObj = null;
		} else {
			if (this.pickUpTrigger) {
				this.weaponObj.worldTransform.rotation = new mw.Rotation(0, 0, 1);
				this.weaponObj.worldTransform.position = mw.Vector.add(this.weaponObj.worldTransform.getRightVector().multiply(100), this.weaponObj.worldTransform.position, this.weaponObj.worldTransform.position);
				this.pickUpTrigger.enabled = true;
			}
		}

	}

	/* 客户端开始开火回调 */
	private onClientStartFire() {
		try {
			if (!this.weaponObj) {
				return;
			}
			this.isCanFire = this.weaponObj.fireComponent.fireInterval;
			if (this.fireEffect) {
				if (!this.fireEffect.loop) {
					this.fireEffect.stop();
				}
				this.fireEffect.play();
			}
			if (this.fireSound) {
				if (!this.fireSound.isLoop) {
					this.fireSound.stop();
				}
				this.fireSound.play();
			}
			// 武器持有人客户端执行
			if (this.weaponObj.getCurrentOwner() == this.chara) {
				// 如果弹药实体不为空（有弹道表现）
				if (this.ammoEntityRoot.getChildren().length > 0) {
					// 根据多重弹药数对本次发射的所有子弹对象传参
					for (let i = 0; i < this.weaponObj.fireComponent.multipleShot; i++) {

						let cameraShootDir = this.camera.worldTransform.clone().getForwardVector().clone();
						if (this.weaponObj.accuracyOfFireEnabled) {
							cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone();
						}
						let endLoc = cameraShootDir.multiply(SHOOT_RANGE).add(this.camera.worldTransform.clone().position);
						let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldTransform.position);
						let hitRes = QueryUtil.lineTrace(this.camera.worldTransform.clone().position, endLoc, true, DEBUG_FLAG);
						hitRes = hitRes.filter(e => {
							return !(e.gameObject instanceof mw.Trigger)
						})
						if (hitRes && hitRes.length > 0 && mw.Vector.dot(hitRes[0].gameObject.worldTransform.position.clone().subtract(this.ammoEntityRoot.worldTransform.position), shootDir) > 0) {
							shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldTransform.position);
						}
						let ammoDirection = shootDir.normalized;
						if (this.ammoSpeed < MAX_SHOOTSPEED || this.isBlock) { // 如果弹药速度小于最大飞行速度值或者弹道有明显阻挡情况下，弹药走真实弹道
							this.serverFire(this.ammoEntityRoot.worldTransform.position.clone(), ammoDirection);
							if (this.ammoArray.length > this.weaponObj.fireComponent.clipSize) {
								let discardAmmo = this.ammoArray.shift();
								discardAmmo.destroy();
							}
							this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldTransform.position, ammoDirection, this.shootRange, this.ammoSpeed, this.gravityScale, this.detectRadius));
						} else { // 其余情况弹药走虚假弹道（子弹轨迹和检测轨迹不同，只是终点相同）
							this.serverFire(this.ammoEntityRoot.worldTransform.position.clone(), ammoDirection);
							if (this.ammoArray.length > this.weaponObj.fireComponent.clipSize) {
								let discardAmmo = this.ammoArray.shift();
								discardAmmo.destroy();
							}
							if (hitRes.length > 0) { // 屏幕中心射线击中
								this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldTransform.position, ammoDirection, shootDir.length, this.ammoSpeed, this.gravityScale, 0, hitRes));
							} else { // 屏幕中心射线未击中
								this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldTransform.position, ammoDirection, shootDir.length, this.ammoSpeed, this.gravityScale, 0));
							}

						}
					}
					// 如果勾选弹壳表现，则发射客户端提供弹壳弹出表现
					if (this.isWeaponHaveCasing) {
						this.casingArray.push(new Casing(this.casingPool, this.casingEntity, this.weaponEntityRoot.worldTransform.getRightVector().clone()));
					}
				} else { // 如果弹药实体为空（无弹道表现）
					let cameraShootDir = this.camera.worldTransform.clone().getForwardVector().clone();
					if (this.weaponObj.accuracyOfFireEnabled) {
						cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone();
					}
					let endLoc = cameraShootDir.multiply(SHOOT_RANGE).add(this.camera.worldTransform.clone().position);
					let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldTransform.position);
					let hitRes = QueryUtil.lineTrace(this.camera.worldTransform.clone().position, endLoc, true, DEBUG_FLAG);
					hitRes = hitRes.filter(e => {
						return !(e.gameObject instanceof mw.Trigger)
					})
					if (hitRes && hitRes.length > 0 && mw.Vector.dot(hitRes[0].gameObject.worldTransform.position.clone().subtract(this.ammoEntityRoot.worldTransform.position), shootDir) > 0) {
						shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldTransform.position);
					}
					let ammoDirection = shootDir.normalized;
					this.weaponObj.worldTransform.rotation = ammoDirection.toRotation();
					let end = ammoDirection.clone().multiply(this.shootRange).add(this.ammoEntityRoot.worldTransform.position);
					if (this.detectRadius < 10) {
						let lineResult = QueryUtil.lineTrace(this.ammoEntityRoot.worldTransform.position, end, true, DEBUG_FLAG);
						lineResult = lineResult.filter(e => {
							return !(e.gameObject instanceof mw.Trigger)
						})
						this.hit(lineResult);
					} else {
						let boxResult = GeneralManager.modifyboxOverlapInLevel(this.ammoEntityRoot.worldTransform.position, end, this.detectRadius, this.detectRadius, DEBUG_FLAG);
						this.hit(boxResult);
					}
				}
			}
		} catch (error) {
			Console.error("onClientStartFire:" + error);
		}
	}

	private updateBlockFire(): boolean {
		let flag = this.isBlock;
		if (this.ammoEntityRoot == undefined ||
			this.ammoEntityRoot.worldTransform == undefined ||
			this.ammoEntityRoot.worldTransform.position == undefined ||
			this.ammoEntityRoot.worldTransform.getForwardVector() == undefined) return flag;
		let lineResultMuzzle = QueryUtil.lineTrace(this.ammoEntityRoot.worldTransform.position,
			this.ammoEntityRoot.worldTransform.getForwardVector().multiply(this.fireBlockDistance).add(this.ammoEntityRoot.worldTransform.position),
			true, DEBUG_FLAG);
		lineResultMuzzle = lineResultMuzzle.filter(e => {
			return !(e.gameObject instanceof mw.Trigger)
		})
		if (lineResultMuzzle.length > 0) {
			this.isBlock = true;
		} else {
			this.isBlock = false;
		}
		return (this.isBlock == flag);
	}

	private updatebFiring(): boolean {
		let flag = this.bFiring;
		this.bFiring = this.weaponObj.fireComponent.isFiring();
		return (this.bFiring == flag);
	}

	@RemoteFunction(mw.Server)
	private serverFire(startLoc: mw.Vector, direction: mw.Vector): void {
		this.clientMulticastLaunch(startLoc, direction);
	}

	@RemoteFunction(mw.Client, mw.Multicast)
	private clientMulticastLaunch(startLoc: mw.Vector, direction: mw.Vector): void {
		if (!this.weaponObj) return;
		if (this.weaponObj.getCurrentOwner() == this.chara) {
			return;
		} else {
			if (this.ammoArray.length > this.weaponObj.fireComponent.clipSize) {
				try {
					let discardAmmo = this.ammoArray.shift();
					discardAmmo.destroy();
				} catch (error) {
					Console.error("clientMulticastLaunch:" + error);
				}
			}
			this.ammoArray.push(new Ammo(null, this.ammoPool, startLoc, direction, this.shootRange, this.ammoSpeed, this.gravityScale, 0));
		}
	}

	/* 客户端结束开火回调 */
	private onClientEndFire() {

	}

	/* 客户端开始换弹回调 */
	private onClientStartReload() {
		try {
			this.reloadSound?.play();
		} catch (error) {
			Console.error("onClientStartReload:" + error);
		}
	}

	/* 客户端结束换弹回调 */
	private onClientEndReload() {
		try {
			this.reloadSound?.stop();
		} catch (error) {
			Console.error("onClientEndReload:" + error);
		}
	}

	/* 客户端开始上膛回调 */
	private onClientStartLoad() {
		try {
			this.loadSound?.play();
		} catch (error) {
			Console.error("onClientStartLoad:" + error);
		}
	}

	/* 客户端结束上膛回调 */
	private onClientEndLoad() {
		try {
			this.loadSound?.stop();
		} catch (error) {
			Console.error("onClientEndLoad:" + error);
		}
	}

	/* 客户端开始瞄准回调 */
	private onClientStartAim() {
	}

	/* 客户端结束瞄准回调 */
	private onClientEndAim() {
	}

	/* 客户端开始后坐力回调 */
	private onClientStartRecoil() {

	}

	/* 客户端瞄准精度变化回调 */
	private onClientCurrentDispersionChanged() {
		if (this.weaponUI) {
			this.weaponUI.changeCross(this.weaponObj.accuracyOfFireComponent.getCurrentDispersionHalfAngle() * 10);
		}
	}

	// 视角放大
	private zoomIn() {
		if (this.camera == null) return;
		Console.error("zoomin")
		this.isAimming = true;

	}

	// 视角缩小
	private zoomOut() {
		if (this.camera == null) return;
		Console.error("zoomOut")
		this.isAimming = false;
	}

	/* 摄像机update */
	private cameraUpdate(dt: number) {
		if (!this.isZooming) return;
		if (this.isAimming) {
			this.camera.fov -= dt * this.aimSpeed;
			if (this.camera.fov < this.aimCameraFov) {
				this.camera.fov = this.aimCameraFov;
				this.isZooming = false;
			}
		} else {
			this.camera.fov += dt * this.aimSpeed;
			if (this.camera.fov > this.equipmentCameraFov) {
				this.camera.fov = this.equipmentCameraFov;
				this.isZooming = false;
			}
		}
	}

	/* 解析资源ID列表 */
	private resolveString(assetIds: string): string[] {
		let assetIdArray: string[] = new Array<string>();
		let assetId: string = "";
		let s = assetIds.split("");
		for (let a of s) {
			if (a == ",") {
				assetIdArray.push(assetId);
				assetId = "";
			} else {
				assetId += a;
			}
		}
		if (assetId) {
			assetIdArray.push(assetId);
		}
		return assetIdArray;
	}

}