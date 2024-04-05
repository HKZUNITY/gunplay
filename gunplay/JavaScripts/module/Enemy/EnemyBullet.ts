import Helper from "../../const/Helper";
import Console from "../../tools/Console";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";

@Component
export default class EnemyBullet extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        }
        else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        }
        else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }
    /**--------------------------------【客户端】-------------------------------- */

    /**子弹特效 */
    // private mBulletEffect: mw.Effect = null;
    /**爆炸特效 */
    // private mExplosionEffect: mw.Effect = null;
    /**客户端的onStart */
    private onStartC(): void {
        this.useUpdate = false;

        // this.initEffectC();
    }

    private initEffectC(): void {
        // this.mBulletEffect = this.gameObject.getChildByName("mBulletEffect") as mw.Effect;
        // this.mBulletEffect.stop();
        // this.mExplosionEffect = this.gameObject.getChildByName("mExplosionEffect") as mw.Effect;
        // this.mExplosionEffect.loopCount = 1;
        // this.mExplosionEffect.stop();
    }

    /**客户端的onUpdate */
    private onUpdateC(dt: number): void {

    }
    /**--------------------------------【客户端】-------------------------------- */

    /**--------------------------------【服务端】-------------------------------- */
    private playerModuleS: PlayerModuleS = null;
    private get getPlayerModuleS(): PlayerModuleS {
        if (this.playerModuleS == null) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }

    /**服务端的onStart */
    private onStartS(): void {
        this.useUpdate = true;
        this.initTriggerS();
    }

    private trigger: mw.Trigger = null;
    private initTriggerS(): void {
        this.trigger = this.gameObject.getChildByName("mBulletTrigger") as mw.Trigger;
        if (!this.trigger) return;
        this.trigger.onEnter.add(this.onTriggerEnterS.bind(this));
    }
    private hitSound: string = "";
    /**服务端的onTriggerEnter */
    private onTriggerEnterS(other: mw.GameObject): void {
        if (other.tag == "self" || other.tag == "bullet") return;
        this.reclcleS();
        this.hitSound = this.hitOtherSound;
        if ((other instanceof mw.Character)) {
            this.hitSound = this.hitCharacterSound;
            this.getPlayerModuleS.enemyAtkPlayer([other.gameObjectId], this.atk);
        }
        this.play3DSound(this.hitSound);
    }

    /**步长 */
    private stride: mw.Vector = mw.Vector.zero;
    /**服务端的onUpdate */
    private onUpdateS(dt: number): void {
        this.stride = mw.Vector.multiply(this.targetDir, dt, this.stride);
        this.currentLocation.x += this.stride.x;
        this.currentLocation.y += this.stride.y;
        this.currentLocation.z += this.stride.z;
        this.gameObject.worldTransform.position = this.currentLocation;
    }

    /**当前位置 */
    private currentLocation: mw.Vector = mw.Vector.zero;
    /**目标方向 */
    private targetDir: mw.Vector = mw.Vector.zero;
    /**起始子弹位置 */
    private originBulletLoc: mw.Vector = mw.Vector.zero;
    /**enemy位置 */
    private enemyLoc: mw.Vector = mw.Vector.zero;
    /**开火 */
    private fireS(): void {
        this.currentLocation = this.originBulletLoc.clone();
        let tmpEnemyLoc = this.enemy.worldTransform.position;
        this.enemyLoc = new mw.Vector(tmpEnemyLoc.x, tmpEnemyLoc.y, tmpEnemyLoc.z + 100);
        this.targetDir = new mw.Vector(this.currentLocation.x - this.enemyLoc.x, this.currentLocation.y - this.enemyLoc.y, this.currentLocation.z - this.enemyLoc.z).normalized;
        this.targetDir = this.targetDir.multiply(this.speed);
        this.useUpdate = true;
        this.playBulletEffectS(this.bulletEffect, this.bulletEffectScale);
        this.play3DSound(this.fireSound);
    }

    /**敌人 */
    private enemy: mw.GameObject = null;
    /**攻击力 */
    private atk: number = 0;
    /**子弹速度 */
    private speed: number = 0;
    /**子弹特效 */
    private bulletEffect: string = "";
    /**爆炸特效 */
    private bulletExplosionEffect: string = "";
    /**子弹特效缩放 */
    private bulletEffectScale: mw.Vector = mw.Vector.one;
    /**爆炸特效缩放 */
    private bulletExplosionEffectScale: mw.Vector = mw.Vector.one;
    /**开火音效 */
    private fireSound: string = "";
    /**击中角色音效 */
    private hitCharacterSound: string = "";
    /**击中其他音效 */
    private hitOtherSound: string = "";
    /**初始化 */
    public initS(enemy: mw.GameObject, originBulletLoc: mw.Vector, atk: number, speed: number,
        bulletEffect: string, bulletEffectScale: mw.Vector, bulletExplosionEffect: string, bulletExplosionEffectScale: mw.Vector,
        fireSound: string, hitCharacterSound: string, hitOtherSound: string): void {
        this.enemy = enemy;
        this.originBulletLoc = originBulletLoc;
        this.atk = atk;
        this.speed = speed;
        this.bulletEffect = bulletEffect;
        this.bulletEffectScale = bulletEffectScale;
        this.bulletExplosionEffect = bulletExplosionEffect;
        this.bulletExplosionEffectScale = bulletExplosionEffectScale;
        this.fireSound = fireSound;
        this.hitCharacterSound = hitCharacterSound;
        this.hitOtherSound = hitOtherSound;
        this.prepareFireS();
    }

    /**激活 */
    public activeS(atk: number, originBulletLoc: mw.Vector, speed: number): void {
        this.atk = atk;
        this.originBulletLoc = originBulletLoc;
        this.speed = speed;
        if (this.trigger) {
            if (this.trigger.enabled) return;
        }
        this.trigger.enabled = true;
        this.prepareFireS();
    }

    /**回收子弹的延迟ID */
    private recycleTimeOutId: any = null;
    /**准备开火 */
    private prepareFireS(): void {
        this.clearSettimeOutS();
        this.recycleTimeOutId = setTimeout(() => {
            this.reclcleS();
        }, 10 * 1000);
        this.fireS();
    }

    /**清除延迟回收子弹 */
    private clearSettimeOutS(): void {
        if (this.recycleTimeOutId) {
            clearTimeout(this.recycleTimeOutId);
            this.recycleTimeOutId = null;
        }
    }

    /**回收 */
    private reclcleS(): void {
        if (this.trigger) this.trigger.enabled = false;
        if (Helper.activeBulletMap.has(this.guid)) {
            Helper.activeBulletMap.delete(this.guid);
        }
        Helper.inactiveBullets.push(this);
        this.clearSettimeOutS();
        this.useUpdate = false;
        this.stopBulletEffectS();
        this.playBulletExplosoinEffectS(this.bulletExplosionEffect, this.bulletExplosionEffectScale);
    }

    private bulletEffectId: number = null;
    private playBulletEffectS(effeftId: string, scale: mw.Vector): void {
        this.stopBulletEffectS();
        this.bulletEffectId = EffectService.playOnGameObject(
            effeftId,
            this.gameObject,
            {
                loopCount: 0,
                scale: scale,
            }
        );
    }

    private stopBulletEffectS(): void {
        if (this.bulletEffectId) {
            EffectService.stop(this.bulletEffectId);
            this.bulletEffectId = null;
        }
    }

    private bulletExplosoinEffectId: number = null;
    private playBulletExplosoinEffectS(effeftId: string, scale: mw.Vector): void {
        this.stopBulletExplosoinEffectS();
        this.bulletExplosoinEffectId = EffectService.playAtPosition(
            effeftId,
            this.gameObject.worldTransform.position,
            {
                loopCount: 1,
                scale: scale,
            }
        );
    }

    private stopBulletExplosoinEffectS(): void {
        try {
            if (this.bulletExplosoinEffectId) {
                EffectService.stop(this.bulletExplosoinEffectId);
                this.bulletExplosoinEffectId = null;
            }
        } catch (error) {
            Console.error("stopBulletExplosoinEffectS:" + error);
        }
    }

    private play3DSound(soundId: string): void {
        SoundService.play3DSound(
            soundId,
            this.gameObject,
            1,
            1
        );
    }

    /**--------------------------------【服务端】-------------------------------- */

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}