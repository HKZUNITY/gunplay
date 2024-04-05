import Console from "../tools/Console";

@Component
export default class SP_SoundMoveBoard extends mw.Script {

	@mw.Property({ capture: true, displayName: "触发器", group: "对象" })
	public config_triggerGuid: string = "";
	@mw.Property({ capture: true, displayName: "主体", group: "对象" })
	public config_keyBoardGuid: string = "";

	@mw.Property({ displayName: "向下速度", group: "准备" })
	public config_upSpeed: number = 30;
	@mw.Property({ displayName: "回弹速度", group: "准备" })
	public config_downSpeed: number = 50;
	@mw.Property({ displayName: "按压距离", group: "准备" })
	public config_distance: number = 20;

	@mw.Property({ displayName: "进入材质", group: "资源" })
	public config_metarialGuid: string = "196924";
	@mw.Property({ displayName: "播放音效", group: "资源" })
	public config_soundGuid: string = "66244";

	@mw.Property({ displayName: "音效距离", group: "设置" })
	public number_soundDistance: number = 1000;

	//触发器
	private trigger_enter: mw.Trigger = null;
	//主体
	private obj_keyBoard: mw.GameObject = null;
	//材质
	private material_piano: mw.Model = null;
	//声音
	private sound_piano: mw.Sound = null;
	//进入列表
	private list_player: Array<mw.Player> = [];
	//开关
	private _onOff: boolean = false;
	//位置开始
	private vector_begin: number = null;
	//位置结束
	private vector_end: number = null;

	protected async onStart() {
		if (!this.assetIsEmpty()) {
			Console.error(` no asset --------------- `);
			return;
		}
		if (SystemUtil.isServer()) {

		}
		if (SystemUtil.isClient()) {
			await this.init();
			this.trigger_enter.onEnter.add(this.onTriggerIn.bind(this));
			this.trigger_enter.onLeave.add(this.onTriggerOut.bind(this));
			this.useUpdate = true;
			Event.addLocalListener("sound" + this.obj_keyBoard.gameObjectId, () => {
				this.sound_piano.play();
			})
			Event.addLocalListener(`material` + this.obj_keyBoard.gameObjectId, (or: boolean) => {
				switch (or) {
					case true:
						this.material_piano.setMaterial(this.config_metarialGuid);
						break;
					case false:
						this.material_piano.resetMaterial();
						break;
				}
				Console.error(`material`, or);
			})
		}
	}
	protected onUpdate(dt: number): void {
		if (this._onOff) {
			if (this.obj_keyBoard.worldTransform.position.z > this.vector_end) {
				let curL = this.obj_keyBoard.worldTransform.position;
				curL.z -= dt * this.config_downSpeed;
				this.obj_keyBoard.worldTransform.position = curL;
			}
		} else {
			if (this.obj_keyBoard.worldTransform.position.z < this.vector_begin) {
				let curL = this.obj_keyBoard.worldTransform.position;
				curL.z += dt * this.config_upSpeed;
				this.obj_keyBoard.worldTransform.position = curL;
			}
		}
	}
	/** 初始化 */
	private async init() {
		this.obj_keyBoard = await mw.GameObject.asyncFindGameObjectById(this.config_keyBoardGuid) as mw.GameObject;
		this.trigger_enter = await mw.GameObject.asyncFindGameObjectById(this.config_triggerGuid) as mw.Trigger;
		let success: boolean = false;
		if (!AssetUtil.assetLoaded(this.config_soundGuid)) {
			success = await AssetUtil.asyncDownloadAsset(this.config_soundGuid);
		} else {
			success = true;
		}
		this.sound_piano = mw.GameObject.spawn(this.config_soundGuid) as mw.Sound;
		Console.log("success_______________", success, this.sound_piano);
		this.sound_piano.isLoop = false;
		this.sound_piano.isSpatialization = true;
		this.sound_piano.attenuationShapeExtents = new Vector(1, 1, 1).multiply(this.number_soundDistance);
		this.sound_piano.parent = this.obj_keyBoard;
		this.sound_piano.localTransform.position = mw.Vector.zero;
		this.material_piano = (this.obj_keyBoard as mw.Model);
		this.vector_begin = this.obj_keyBoard.worldTransform.position.z;
		this.vector_end = this.obj_keyBoard.worldTransform.position.z - this.config_distance;
	}
	/**
	 * 资源是否为空
	 * @returns 
	 */
	private assetIsEmpty(): boolean {
		if (this.config_metarialGuid == "" || this.config_soundGuid == "") {
			return false;
		} else {
			return true;
		}
	}
	/**
	 * 进入触发器
	 * @param other 玩家 
	 * @returns 
	 */
	private onTriggerIn(other): void {
		if (other instanceof mw.Character) {

			let player = (other as mw.Character).player;
			if (!this.list_player.includes(player)) {
				this.list_player.push(player);
			}
			if (this.list_player.length == 1) {
				Event.dispatchToLocal("sound" + this.obj_keyBoard.gameObjectId);
				Event.dispatchToLocal(`material` + this.obj_keyBoard.gameObjectId, true);
			}
			this._onOff = true;
		}
	}
	/**
	 * 离开触发器
	 * @param other 玩家 
	 * @returns 
	 */
	private onTriggerOut(other): void {
		if (other instanceof mw.Character) {

			let player = (other as mw.Character).player;
			if (this.list_player.includes(player)) {
				let index = this.list_player.indexOf(player);
				this.list_player.splice(index, 1);
			}
			if (this.list_player.length <= 0) {
				this._onOff = false;
				Event.dispatchToLocal(`material` + this.obj_keyBoard.gameObjectId, false);
			}
		}
	}
}
