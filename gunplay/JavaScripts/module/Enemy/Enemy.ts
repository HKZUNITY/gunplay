import { PrefabEvent } from "../../Prefabs/PrefabEvent";
import { FlyText } from "../../common/FlyText";
import Helper from "../../const/Helper";
import Console from "../../tools/Console";
import { Utils } from "../../tools/utils";
import CubeLifebar_Generate from "../../ui-generate/Enemy/CubeLifebar_generate";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import RadarUI from "../RadarModule/ui/RadarUI";
import EnemyBullet from "./EnemyBullet";

export enum AtkType {
    /**近战攻击 */
    Melee = 1,
    /**远程攻击 */
    Remote = 2,
}

/**
 * 近战敌人
 */
@Component
export default class Enemy_Cube extends Script {
    @mw.Property({ displayName: "攻击类型", group: "共同属性", tooltip: "攻击类型", enumType: AtkType })
    private atkType: AtkType = AtkType.Melee;

    @mw.Property({ displayName: "血量", group: "共同属性", tooltip: "血量", range: { min: 100, max: 10000, showSlider: true } })
    private maxHp: number = 100;

    @mw.Property({ displayName: "攻击力", group: "共同属性", tooltip: "攻击力", range: { min: 10, max: 100, showSlider: true } })
    private atk: number = 10;

    @mw.Property({ displayName: "攻击时间", group: "共同属性", tooltip: "攻击时间", range: { min: 1, max: 100, showSlider: true } })
    private atkTime: number = 5;

    @mw.Property({ displayName: "爆炸特效", group: "共同属性", tooltip: "爆炸特效" })
    private explosionEffect: string = "57200";

    @mw.Property({ displayName: "重生时间", group: "共同属性", tooltip: "重生时间", range: { min: 5, max: 60, showSlider: true } })
    private respawnTime: number = 5;

    @mw.Property({ displayName: "重生特效", group: "共同属性", tooltip: "重生特效" })
    private respawnEffect: string = "142750";

    @mw.Property({ displayName: "攻击范围", group: "近战攻击", tooltip: "近战攻击", range: { min: 100, max: 1000, showSlider: true } })
    private atkRandom: number = 100;

    @mw.Property({ displayName: "攻击特效", group: "近战攻击", tooltip: "攻击特效" })
    private atkEffect: string = "89081";

    @mw.Property({ displayName: "击中角色音效", group: "近战攻击", tooltip: "击中角色音效" })
    private atkCharacterSound: string = "180595";

    @mw.Property({ displayName: "子弹预制体", group: "远程攻击", tooltip: "子弹预制体" })
    private bulletPrefab: string = "B5EC5B66473AD73B9481C6ADFE757DDA";

    @mw.Property({ displayName: "子弹生成位置偏移", group: "远程攻击", tooltip: "子弹生成位置偏移", range: { min: 100, max: 500, showSlider: true } })
    private bulletOffset: number = 100;

    @mw.Property({ displayName: "子弹速度", group: "远程攻击", tooltip: "远程攻击", range: { min: 100, max: 1000, showSlider: true } })
    private speed: number = 100;

    @mw.Property({ displayName: "子弹特效", group: "远程攻击", tooltip: "子弹特效" })
    private bulletEffect: string = "27428";

    @mw.Property({ displayName: "子弹特效缩放", group: "远程攻击", tooltip: "子弹特效缩放" })
    private bulletEffectScale: mw.Vector = mw.Vector.one;

    @mw.Property({ displayName: "子弹爆炸特效", group: "远程攻击", tooltip: "子弹爆炸特效" })
    private bulletExplosionEffect: string = "27421";

    @mw.Property({ displayName: "子弹爆炸特效缩放", group: "远程攻击", tooltip: "子弹爆炸特效缩放" })
    private bulletExplosionEffectScale: mw.Vector = mw.Vector.one;

    @mw.Property({ displayName: "开火音效", group: "远程攻击", tooltip: "开火音效" })
    private fireSound: string = "208166";

    @mw.Property({ displayName: "击中角色音效", group: "远程攻击", tooltip: "击中角色音效" })
    private hitCharacterSound: string = "135752";

    @mw.Property({ displayName: "击中其他音效", group: "远程攻击", tooltip: "击中其他音效" })
    private hitOtherSound: string = "208026";

    @mw.Property({ displayName: "当前剩余血量", group: "属性同步S->C", tooltip: "当前剩余血量", replicated: true, onChanged: "onHpChanged" })
    private curHp: number = 0;

    // @mw.Property({ displayName: "攻击范围", group: "属性同步~", tooltip: "攻击范围", replicated: true, onChanged: "onIsCanAtkChanged" })
    // private isCanAtk: boolean = true;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.onStartCS();
    }

    /**onStart */
    private async onStartCS(): Promise<void> {
        await ModuleService.ready();
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
            // this.onUpdateS(dt);
        }
    }
    /**--------------------------------【客户端】-------------------------------- */
    private cubeLifebar: CubeLifebar_Generate = null;
    private cubeLifebarWidget: mw.UIWidget = null;
    private isInitLifebar = false;
    private radarUI: RadarUI = null;

    /**客户端的onStart */
    private onStartC(): void {
        this.useUpdate = false;
        this.initDataC();
    }

    private initDataC(): void {
        this.preHp = Math.floor(this.maxHp);
        this.initLifebar();
        this.radarUI = UIService.getUI(RadarUI);
        this.radarUI.setEnemyPoint(this.gameObject.worldTransform.position, this.gameObject.gameObjectId);
    }

    private async initLifebar(): Promise<void> {
        this.cubeLifebar = UIService.create(CubeLifebar_Generate);
        this.cubeLifebarWidget = await mw.GameObject.asyncSpawn<mw.UIWidget>(
            "UIWidget",
            {
                replicates: false
            });
        this.cubeLifebarWidget.setTargetUIWidget(this.cubeLifebar.uiWidgetBase);
        this.cubeLifebarWidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;

        this.cubeLifebarWidget.parent = this.gameObject;
        this.cubeLifebarWidget.localTransform.position = mw.Vector.up.multiply(this.gameObject.getBoundingBoxExtent().z / 2);
        this.cubeLifebarWidget.occlusionEnable = false;
        this.cubeLifebarWidget.scaledByDistanceEnable = true;
        this.cubeLifebarWidget.hideByDistanceEnable = true;
        this.cubeLifebarWidget.headUIMaxVisibleDistance = 10000;

        this.isInitLifebar = true;
        this.onHpChanged();
    }

    /**客户端的onUpdate */
    private onUpdateC(dt: number): void {

    }

    private preHp: number = 0;
    /**
     * 血量改变
     */
    private onHpChanged(): void {
        if (!this.isInitLifebar) return;
        Console.error("onHpChanged = " + this.curHp);

        if (this.preHp <= 0) this.preHp = Math.floor(this.maxHp);

        let damage = this.preHp - this.curHp;
        if (damage > 0) this.preHp = this.curHp;

        this.cubeLifebar.mLifebarProgressBar.percent = this.curHp / this.maxHp;
        this.cubeLifebar.mHpTextBlock.text = `${Math.floor(this.curHp)}/${Math.floor(this.maxHp)}`;

        if (this.curHp <= 0) {
            if (this.cubeLifebarWidget.getVisibility()) this.cubeLifebarWidget.setVisibility(false);
            if (this.cubeLifebarWidget.getVisibility()) {
                this.cubeLifebarWidget.setVisibility(false);
                this.radarUI.setEnemyState(this.gameObject.gameObjectId, true);
            }
        } else if (this.curHp >= this.maxHp) {
            if (!this.cubeLifebarWidget.getVisibility()) this.cubeLifebarWidget.setVisibility(true);
            if (!this.cubeLifebarWidget.getVisibility()) {
                this.cubeLifebarWidget.setVisibility(true);
                this.radarUI.setEnemyState(this.gameObject.gameObjectId, false);
            }
        }
    }

    /**--------------------------------【客户端】-------------------------------- */

    /**--------------------------------【服务端】-------------------------------- */
    /**攻击定时器 */
    private atkTimer: number = 0;
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
        this.initDataS();
        this.bindEventS();
    }

    private initDataS(): void {
        this.maxHp = Math.floor(this.maxHp);
        this.curHp = this.maxHp;
    }

    /**
     * 绑定事件
     */
    private bindEventS(): void {
        PrefabEvent.PrefabEvtFight.onHit(this.playerAtkEnemyS.bind(this));
    }

    /**
     * 玩家攻击敌人 
     * @param senderGuid 
     * @param targetGuid 
     * @param damage 
     * @param hitPoint 
     * @returns 
     */
    private playerAtkEnemyS(senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector): void {
        Console.error("Enemy_Cube onHit this.gameObject.gameObjectId = " + this.gameObject.gameObjectId + "。targetGuid = " + targetGuid + "。damage = " + damage + "。");
        if (this.gameObject.gameObjectId != targetGuid) return;
        if (this.curHp <= 0) return;
        let tmpHp = this.curHp - damage;
        if (tmpHp >= 0) {
            this.curHp = tmpHp;
        } else {
            this.curHp = 0;
        }
        if (this.curHp <= 0) {
            this.setAttackStateS(false);
            this.dieS();
            if (Helper.playerMap.has(senderGuid)) this.getPlayerModuleS.playerKillEnemy(Helper.playerMap.get(senderGuid), 5, false);
            TimeUtil.delaySecond(this.respawnTime).then(() => {
                this.setAttackStateS(true);
                this.curHp = this.maxHp;
                this.respawnS();
            });
        }
        Console.error("curHp = " + this.curHp);
        if (Helper.playerMap.has(senderGuid)) this.getPlayerModuleS.playerAtkEnemyFlyText(Helper.playerMap.get(senderGuid), hitPoint, damage);
    }

    private dieS(): void {
        this.setVisibilityS(false);
        EffectService.playAtPosition(
            this.explosionEffect,
            this.gameObject.worldTransform.position,
            {
                scale: mw.Vector.one.multiply(1)
            });
    }

    private respawnS(): void {
        this.setVisibilityS(true);
        EffectService.playAtPosition(
            this.respawnEffect,
            this.gameObject.worldTransform.position,
            {
                scale: mw.Vector.one.multiply(1)
            });
    }

    /**
     * 设置攻击状态 
     * @param isCanAtk 
     */
    private setAttackStateS(isCanAtk: boolean): void {
        if (isCanAtk) this.atkTimer = 0;
        this.useUpdate = isCanAtk;
    }

    /**
     * 设置物体是否被显示
     * @param isVisibility 
     */
    private setVisibilityS(isVisibility: boolean): void {
        this.gameObject.setVisibility(isVisibility, true);
        this.gameObject.setCollision(isVisibility ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }

    /**服务端的onUpdate */
    // private onUpdateS(dt: number): void {
    //     this.atkTimer += dt;
    //     if (this.atkTimer >= this.atkTime) {
    //         this.atkTimer = 0;
    //         //攻击
    //         this.attackS();
    //     }
    // }

    /**攻击 */
    private attackS(): void {
        if (this.atkType == AtkType.Melee) {
            this.meleeAttackS();
        } else if (this.atkType == AtkType.Remote) {
            this.remoteAttackS();
        }
    }

    //#region 近战攻击
    private meleeAttackS(): void {
        let targets = this.circleCheckS();
        if (targets == null || targets == undefined || targets.length == 0) return;
        let gameObjectIds: string[] = [];
        for (let i = 0; i < targets.length; ++i) {
            let target = targets[i];
            if (target == null || target == undefined || !(target instanceof mw.Character)) continue;
            gameObjectIds.push(target.gameObjectId);
        }
        if (gameObjectIds == null || gameObjectIds.length == 0) return;
        this.getPlayerModuleS.enemyAtkPlayer(gameObjectIds, this.atk);
        SoundService.play3DSound(
            this.atkCharacterSound,
            this.gameObject,
            1,
            1
        );
    }

    /**
     * 圆形检测
     * @returns 
     */
    private circleCheckS(): mw.GameObject[] {
        EffectService.playOnGameObject(
            this.atkEffect,
            this.gameObject,
            {
                loopCount: 1,
                position: mw.Vector.zero,
                scale: mw.Vector.one.multiply(1)
            }
        );
        return QueryUtil.sphereOverlap(
            this.gameObject.worldTransform.position,
            this.atkRandom,
            false,
            [this.gameObject.gameObjectId]
        );
    }
    //#endregion

    //#region 远程攻击
    private async remoteAttackS(): Promise<void> {
        if (this.randomValueS(1, 10) <= 8) {//80%概率
            Console.error("1-8");
            await this.fireS(Helper.getRangePoint(this.gameObject.worldTransform.position, this.bulletOffset));
        } else {//20%概率
            Console.error("9-10");
            let points: mw.Vector[] = [];
            if (this.randomValueS(1, 10) <= 6) {//60%概率
                Console.error("1-6");
                let angles = this.randomAngleS();
                points = Helper.getArcPoints(this.gameObject.worldTransform.position, this.bulletOffset,
                    this.randomValueS(3, 10),
                    angles[0],
                    angles[1]
                );
            } else {//40%概率
                Console.error("7-10");
                points = Helper.getCirclePoints(this.gameObject.worldTransform.position, this.bulletOffset,
                    this.randomValueS(10, 20));
            }
            let delaySecond = this.randomValueS(0, 1);
            for (let i = 0; i < points.length; ++i) {
                await new Promise<void>((resolve: () => void) => {
                    setTimeout(async () => {
                        await this.fireS(points[i]);
                        return resolve();
                    }, delaySecond * 200);
                });
            }
        }
        Console.error("Helper.inactiveBullets.length = " + Helper.inactiveBullets.length);
        Console.error("Helper.activeBulletMap.size = " + Helper.activeBulletMap.size);
    }

    /**激活的子弹 */
    // private activeBulletMap: Map<string, EnemyBullet> = new Map<string, EnemyBullet>();
    /**失活的子弹 */
    // private inactiveBullets: EnemyBullet[] = [];

    private async fireS(originBulletLoc: mw.Vector): Promise<void> {
        let enemyBullet: EnemyBullet = null;
        if (Helper.inactiveBullets.length > 0) {
            enemyBullet = Helper.inactiveBullets.shift();
            enemyBullet.activeS(this.atk, originBulletLoc, this.speed);
            // Console.error("AAA");
        } else {
            enemyBullet = await this.spawnBulletS();
            enemyBullet.initS(this.gameObject, originBulletLoc, this.atk, this.speed, this.bulletEffect, this.bulletEffectScale,
                this.bulletExplosionEffect, this.bulletExplosionEffectScale, this.fireSound, this.hitCharacterSound, this.hitOtherSound);
            // Console.error("BBB");
        }
        Helper.activeBulletMap.set(enemyBullet.guid, enemyBullet);
    }

    private async spawnBulletS(): Promise<EnemyBullet> {
        let bullet = await mw.GameObject.asyncSpawn(
            this.bulletPrefab, {
            replicates: true,
            /* transform: new Transform(
                 new Vector(this.randomValueS(-1000, 1000), this.randomValueS(-1000, 1000), 100),
                 mw.Rotation.zero,
                 mw.Vector.one
             )*/
        });
        return (bullet.getScripts()[0] as EnemyBullet);
    }

    /**随机一个值 */
    private randomValueS(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**随机两个角度360以内 */
    private randomAngleS(): number[] {
        let angle1 = this.randomValueS(0, 360);
        let offAngle = this.randomValueS(90, 180);
        let angle2 = angle1 + offAngle;
        if (angle2 > 360) {
            angle2 = angle2 - (offAngle * 2);
        }
        if (angle1 > angle2) {
            let tmp = angle1;
            angle1 = angle2;
            angle2 = tmp;
        }
        return [angle1, angle2];
    }
    //#endregion

    /**--------------------------------【服务端】-------------------------------- */

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}