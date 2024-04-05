import { EventType } from "../../const/Enum";
import Helper from "../../const/Helper";
import { RadarModuleS } from "./RadarModuleS";
import RadarUI from "./ui/RadarUI";

export class RadarModuleC extends ModuleC<RadarModuleS, null> {
    /**雷达缩放比，比例越小，可以看得越远 */
    public mapScalRate: number = 1;
    public radarUI: RadarUI = undefined;
    public playerExposeTempMap: Map<mw.Player, number> = new Map();

    protected onStart(): void {
        this.initData();
        this.bindEvent();
    }

    private initData(): void {
        this.radarUI = mw.UIService.create(RadarUI)
        this.radarUI.show();
    }

    private bindEvent(): void {
        Event.addLocalListener(EventType.OpenCloseHUDRadarUI, (isOpen: boolean) => {
            isOpen ? this.radarUI.show() : this.radarUI.hide();
        });
    }

    /**检测是否为友方 */
    public isFriendly(player1: mw.Player, player2: mw.Player): boolean {
        if (Math.abs(Helper.teamMap.get(player1.character.gameObjectId) -
            Helper.teamMap.get(player2.character.gameObjectId)) == 0) return true;
        return false;
    }

    /**
     * 向指定玩家在雷达上暴露一个玩家，无论敌我
     * @param Targetplayer 需要暴露的玩家
     * @param exposeTime 需要暴露的时间，秒，不填则为3秒，新的会把旧的顶掉
     */
    public net_exposePlayer(Targetplayer: mw.Player, exposeTime?: number) {
        if (exposeTime == undefined) {
            exposeTime = 3;
        }
        exposeTime *= 1000;

        if (this.playerExposeTempMap.get(Targetplayer)) {
            clearTimeout(this.playerExposeTempMap.get(Targetplayer));
            this.playerExposeTempMap.delete(Targetplayer);
        }

        let exposeTimeout = setTimeout(() => {
            this.playerExposeTempMap.delete(Targetplayer);
        }, exposeTime);

        this.playerExposeTempMap.set(Targetplayer, exposeTimeout);
    }

    public exposePlayer(Targetplayer: mw.Player, exposeTime?: number) {
        if (exposeTime == undefined) {
            exposeTime = 3;
        }
        exposeTime *= 1000;

        if (this.playerExposeTempMap.get(Targetplayer)) {
            clearTimeout(this.playerExposeTempMap.get(Targetplayer));
            this.playerExposeTempMap.delete(Targetplayer);
        }

        let exposeTimeout = setTimeout(() => {
            this.playerExposeTempMap.delete(Targetplayer);
        }, exposeTime);

        this.playerExposeTempMap.set(Targetplayer, exposeTimeout);
    }

    /**
     * 将世界loc转换成与自己相对的雷达位置
     * @param loc 
     * @returns 
     */
    public Loc2RadarPos(loc: Vector): Vector2 {
        let deltaVector = loc.clone().subtract(this.radarUI.currentPlayer.character.worldTransform.position.clone()).multiply(new Vector(0.1, 0.1, 0)).multiply(this.mapScalRate);
        let deltaVector2 = new Vector2(deltaVector.clone().y, -1 * deltaVector.clone().x);
        let pos = this.radarUI.mRadarCanvas.size.clone().multiply(0.5).clone().subtract(new Vector2(5, 16)).add(deltaVector2);
        return pos;
    }
}