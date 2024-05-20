import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { Notice } from "../../common/notice/Notice";
import Globaldata from "../../const/Globaldata";
import Console from "../../tools/Console";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import AdsModuleS from "./AdsModuleS";
import AdTipsPanel from "./ui/AdTipsPanel";

export default class AdsModuleC extends ModuleC<AdsModuleS, null> {
    private playerModuleC: PlayerModuleC = null;
    /**广告面板 */
    private adTipsPanel: AdTipsPanel = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initData();
        this.registerActions();
    }

    /**初始化数据 */
    private initData(): void {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
    }

    /**注册事件 */
    private registerActions(): void {
        this.adTipsPanel.onWatchAdsAction.add(this.playAds.bind(this));
    }

    protected onEnterScene(sceneType: number): void {
        this.defaultAds();
    }

    /**播放广告 */
    private playAds(id: number, adType: number): void {
        this.getReward(id, adType);
        Notice.showDownNotice("成功获得奖励");
        return;
        mw.AdsService.isReady(mw.AdsType.Reward, (isReady: boolean) => {
            let isGetReward = false;
            if (isReady) {
                GeneralManager.modifyShowAd(mw.AdsType.Reward, (state: mw.AdsState) => {
                    if (state == AdsState.Fail) {
                        // 展示失败。 展示广告失败的时候回调，一般是网络卡顿。 建议在这里做容错
                        Notice.showDownNotice("网络卡顿、再试一次吧");
                    }
                    if (state == AdsState.Success) {
                        //开始展示。 开始展示广告的时候回调，无论是否完成广告播放。 这里可以用来“保护”玩家，顺利开始播放广告后玩家客户端处在一个“挂起”的状态。 如有需要，可在此处加一些保护逻辑，例如在放广告的时候玩家暂时被传送走，等state==1关闭广告后再切回来。
                    }
                    if (state == AdsState.Close) {
                        mw.TimeUtil.delaySecond(1).then(() => {
                            if (isGetReward) {

                                Console.error("成功获得奖励 id = " + id + " type = " + adType);
                            }
                            else {
                                Console.error("获得奖励失败 id = " + id + " type = " + adType);
                            }
                        });
                    }
                    // 用户播放广告完成了，无论是否点击了关闭广告界面
                    if (state == AdsState.Reward) {
                        isGetReward = true;
                    }
                })
            }
            else {
                // 广告没准备好，或后台还有广告在放(玩家没放完广告就切回游戏)
                Notice.showDownNotice("广告没准备好，或后台还有广告在放");
            }
        });
    }

    /**获得奖励 */
    private getReward(id: number, adType: number): void {
        switch (adType) {
            case AdType.AddCoin:
                this.playerModuleC.setCoin(id);
                break;
            case AdType.AddDiamond:
                this.playerModuleC.setDiamond(id);
                break;
            default:
                break;
        }
    }

    private defaultAds(): void {
        this.delay10Seconds();
        this.setInterval180Seconds();
    }

    private delay10Seconds(): void {
        TimeUtil.delaySecond(15).then(() => {
            this.adTipsPanel.showAdTips(2, AdType.AddDiamond);
        });
    }

    private setInterval180Seconds(): void {
        TimeUtil.setInterval(() => {
            this.adTipsPanel.showAdTips(3, AdType.AddDiamond);
        }, 180);
    }

    public dieAds(): void {
        this.adTipsPanel.showAdTips(2, AdType.AddDiamond);
    }
}

export enum AdType {
    /**AddCoin */
    AddCoin = 1,
    /**AddDiamond */
    AddDiamond = 2,
}