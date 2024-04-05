import Helper from "../const/Helper";
import Console from "../tools/Console";
import { Notice } from "./notice/Notice";

export default class Guide {
    /**当前客户端角色 */
    private static localPlayer: mw.Player = null;
    /**引导线特效 */
    private static guideEffect: string = "146775";
    /**更新引导间隔标识Id */
    private static guideIntervalId: any = null;
    /**存储当前引导特效标识 */
    private static guideEffectIds: number[] = [];
    /**玩家上次坐标 */
    private static preVec: mw.Vector = mw.Vector.zero;
    /**目标特效 */
    private static targetEffect: string = "31263";
    /**目标特效标识 */
    private static targetEffectId: number = null;

    /**
     * 开始引导 
     * @param targetVec 目标点 
     */
    public static async startGuide(targetVec: mw.Vector, callback: () => void): Promise<void> {
        await this.initPlayer();
        this.playTargetEffect(targetVec);
        this.preVec = mw.Vector.zero;
        this.clearGuideInterval();
        this.guideIntervalId = TimeUtil.setInterval(() => {
            let currentVec = this.getPlayerLoc();
            if (mw.Vector.distance(this.preVec, currentVec) < 10) return;
            this.preVec = currentVec;

            this.playGuideEffects(currentVec, targetVec);

            let distance = mw.Vector.distance(currentVec, targetVec);
            if (distance <= 200) {
                this.clearGuideInterval();
                this.stopGuideEffects();
                this.stopTargetEffect();
                this.preVec = mw.Vector.zero;
                Notice.showDownNotice("到达目标点");
                if (callback) callback();
            }
        }, 0.02);
    }

    /**
     * 初始化Player
     */
    private static async initPlayer(): Promise<void> {
        if (this.localPlayer == null) {
            this.localPlayer = await mw.Player.asyncGetLocalPlayer();
        }
    }

    /**
     * 播放目标特效
     * @param targetVec 目标点
     */
    private static playTargetEffect(targetVec: mw.Vector): void {
        this.stopTargetEffect();
        this.targetEffectId = EffectService.playAtPosition(
            this.targetEffect,
            targetVec,
            {
                loopCount: 0,
            }
        );
    }

    /**
     * 停止目标特效
     */
    private static stopTargetEffect(): void {
        if (this.targetEffectId != null) {
            EffectService.stop(this.targetEffectId);
            this.targetEffectId = null;
        }
    }

    /**
     * 得到当前玩家坐标 
     * @returns 
     */
    private static getPlayerLoc(): mw.Vector {
        let playerLoc = this.localPlayer.character.worldTransform.position;
        let playerExtentZ = this.localPlayer.character.collisionExtent.z;
        return new mw.Vector(playerLoc.x, playerLoc.y, playerLoc.z - (playerExtentZ / 2));
    }

    /**
     * 停止引导特效
     */
    private static stopGuideEffects(): void {
        if (this.guideEffectIds.length > 0) {
            for (let i = 0; i < this.guideEffectIds.length; ++i) {
                EffectService.stop(this.guideEffectIds[i]);
            }
            this.guideEffectIds.length = 0;
        }
    }

    /**
     * 清除引导setInterval
     */
    private static clearGuideInterval(): void {
        if (this.guideIntervalId != null) {
            TimeUtil.clearInterval(this.guideIntervalId);
            this.guideIntervalId = null;
        }
    }

    /**
     * 播放引导特效 
     * @param currentVec 起始点 
     * @param targetVec 目标点 
     */
    private static playGuideEffects(currentVec: mw.Vector, targetVec: mw.Vector): void {
        let points = Helper.getPointsBetween2(currentVec, targetVec);
        Console.error("points.length", points.length);

        if (points.length >= this.guideEffectIds.length) {
            for (let i = 0; i < this.guideEffectIds.length; ++i) {
                EffectService.getEffectById(this.guideEffectIds[i]).then((effect) => {
                    if (effect) effect.worldTransform.position = points[i];
                });
            }
            for (let i = this.guideEffectIds.length; i < points.length; ++i) {
                let effectId = EffectService.playAtPosition(
                    this.guideEffect,
                    points[i],
                    {
                        loopCount: 0,
                    }
                );
                this.guideEffectIds.push(effectId);
            }
        } else {
            for (let i = 0; i < points.length; ++i) {
                EffectService.getEffectById(this.guideEffectIds[i]).then((effect) => {
                    if (effect) effect.worldTransform.position = points[i];
                });
            }
            for (let i = points.length; i < this.guideEffectIds.length; ++i) {
                EffectService.stop(this.guideEffectIds[i]);
            }
            this.guideEffectIds.length = points.length;
        }
    }
}