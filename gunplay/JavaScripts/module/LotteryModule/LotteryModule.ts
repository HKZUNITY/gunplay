import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import { IGunElement } from "../../config/Gun";
import { EventType } from "../../const/Enum";
import Console from "../../tools/Console";
import { Utils } from "../../tools/utils";
import LotteryItem_Generate from "../../ui-generate/Lottery/LotteryItem_generate";
import LotteryPanel_Generate from "../../ui-generate/Lottery/LotteryPanel_generate";
import { AdType } from "../AdsModule/AdsModuleC";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { GunData } from "../GunModule/GunData";
import { GunModuleC } from "../GunModule/GunModuleC";
import { HUDModuleC } from "../HUDModule/HUDModuleC";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";

export class LotteryItem extends LotteryItem_Generate {
    protected onAwake(): void {
        this.mSeletImage.visibility = mw.SlateVisibility.Collapsed;
        this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
        this.mOwnTextBlock.visibility = mw.SlateVisibility.Collapsed;
    }

    public setItemInfo(gunElement: IGunElement): void {
        mw.assetIDChangeIconUrlRequest([gunElement.GunIcon_M]).then(() => {
            try {
                this.mIconImage.setImageByAssetIconData(mw.getAssetIconDataByAssetID(gunElement.GunIcon_M));
            } catch (error) {
                Console.error("setItemInfo:" + error);
            }
        });
        this.mNameTextBlock.text = gunElement.GunName;
        this.mGunTypeTextBlock.text = (gunElement.GunType == 1) ? "永久" : "限时";
    }

    public setSelectState(isSelect: boolean): void {
        this.mSeletImage.visibility = isSelect ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public setOwnMaskState(isOwn: boolean): void {
        if (isOwn) {
            this.mMaskImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mOwnTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
            this.mOwnTextBlock.visibility = mw.SlateVisibility.Collapsed;
        }
    }
}

export class LotteryPanel extends LotteryPanel_Generate {
    private lotteryModuleC: LotteryModuleC = null;
    private hudModuleC: HUDModuleC = null;
    private gunModuleC: GunModuleC = null;

    protected onAwake(): void {
        this.initDatas();
        this.bindButtons();
    }

    private lotteryItems: LotteryItem[] = [];
    private rewardList: number[] = [];
    private initDatas(): void {
        this.lotteryModuleC = ModuleService.getModule(LotteryModuleC);
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.gunModuleC = ModuleService.getModule(GunModuleC);
        this.mCoinStaleButton.text = "18888金币\n抽奖1次";
        this.mDiamondStaleButton.text = "2钻石\n抽奖1次";
        GameConfig.Gun.getAllElement().forEach((value: IGunElement) => {
            if (value.ID >= 14) return;
            if (value.ID == 1) {
                this.lotteryItems.push(null);
            } else {
                let lotteryItem = UIService.create(LotteryItem);
                lotteryItem.setItemInfo(value);
                this.lotteryItems.push(lotteryItem);
                this.mAddCanvas.addChild(lotteryItem.uiObject);
            }
        });
    }

    private bindButtons(): void {
        this.mCloseButton.onClicked.add(() => {
            this.hideTween();
        });

        this.mAddCoinButton.onClicked.add(() => {
            this.hudModuleC.onAddCoinAction.call();
        });

        this.mAddDiamondButton.onClicked.add(() => {
            this.hudModuleC.onAddDiamondAction.call();
        });

        this.mCoinStaleButton.onClicked.add(() => {
            if (this.rewardList.length <= 0) {
                Notice.showDownNotice("已经抽完了");
                return;
            }
            if (this.lotteryModuleC.isCanCoinLottery(18888)) this.startLottery();
        });

        this.mDiamondStaleButton.onClicked.add(() => {
            if (this.rewardList.length <= 0) {
                Notice.showDownNotice("已经抽完了");
                return;
            }
            if (this.lotteryModuleC.isCanDiamondLottery(2)) this.startLottery();
        });
    }

    protected onShow(): void {
        let gunIds = this.gunModuleC.getGunIds();
        this.rewardList.length = 0;
        for (let i = 1; i < this.lotteryItems.length; ++i) {
            if (gunIds.includes(i + 1)) {
                this.lotteryItems[i].setOwnMaskState(true);
            } else {
                this.lotteryItems[i].setOwnMaskState(false);
                this.rewardList.push(i + 1);
            }
        }
        Utils.openUITween(
            this.rootCanvas,
            () => {
                // this.hudPanel.hide();
            },
            null
        );
    }
    private preGunId: number = 0;
    private startLottery(): void {
        if (this.preGunId) this.lotteryItems[this.preGunId - 1].setSelectState(false);
        this.lotteryState(false);
        let gunId = this.rewardList[Math.floor(Math.random() * this.rewardList.length)];
        this.preGunId = gunId;
        let preArr: number[] = [];
        let intervalId = TimeUtil.setInterval(() => {
            if (preArr.length > 0) {
                for (let i = 0; i < preArr.length; ++i) {
                    this.lotteryItems[preArr[i] - 1].setSelectState(false);
                }
            }
            let arr = this.getRandomArrayElements(this.rewardList, this.rewardList.length == 1 ? 1 : Math.floor(this.rewardList.length / 2));
            for (let i = 0; i < arr.length; ++i) {
                this.lotteryItems[arr[i] - 1].setSelectState(true);
            }
            preArr = arr;
            SoundService.playSound("137566");
        }, 0.5);
        TimeUtil.delaySecond(5.4).then(() => {
            TimeUtil.clearInterval(intervalId);
            if (preArr.length > 0) {
                for (let i = 0; i < preArr.length; ++i) {
                    this.lotteryItems[preArr[i] - 1].setSelectState(false);
                }
            }
            this.lotteryItems[gunId - 1].setSelectState(true);
            this.lotteryItems[gunId - 1].setOwnMaskState(true);
            SoundService.playSound("137566");
            this.removeArrayElement(this.rewardList, gunId);
            this.lotteryState(true);
            this.gunModuleC.lottery(gunId);
            Notice.showDownNotice("恭喜获得" + GameConfig.Gun.getElement(gunId).GunName);
            Notice.showDownNotice("前往商店使用");
        });
    }

    private lotteryState(isEnable: boolean): void {
        this.mCoinStaleButton.enable = isEnable;
        this.mDiamondStaleButton.enable = isEnable;
        this.mAddCoinButton.enable = isEnable;
        this.mAddDiamondButton.enable = isEnable;
        this.mCloseButton.enable = isEnable;
    }

    /**
     * 隐藏缓动
     */
    public hideTween(): void {
        Utils.closeUITween(
            this.rootCanvas,
            null,
            () => {
                this.hide();
                Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
                Event.dispatchToLocal("IsOpenUI", true);
            });
    }

    /**
     * 随机从数组中取出n个不重复的元素
     */
    private getRandomArrayElements(arr: number[], count: number): number[] {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    /**
     * 删除数组中的某个元素
     */
    private removeArrayElement(arr: number[], element: number): void {
        let index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
}

export class LotteryModuleC extends ModuleC<LotteryModuleS, null> {
    private hudModuleC: HUDModuleC = null;
    private playerModuleC: PlayerModuleC = null;
    private lotteryPanel: LotteryPanel = null;
    private adTipsPanel: AdTipsPanel = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initData();
        this.bindEvent();
    }

    private initData(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.lotteryPanel = UIService.getUI(LotteryPanel);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
    }

    private bindEvent(): void {
        let isOpen = false;
        InputUtil.onKeyDown(mw.Keys.P, () => {
            isOpen = !isOpen;
            isOpen ? this.lotteryPanel.show() : this.lotteryPanel.hide();
        });
        this.hudModuleC.onOpenLotteryAction.add(() => {
            this.lotteryPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        });

    }

    public isCanCoinLottery(costCoin: number): boolean {
        if (this.playerModuleC.getCoin() >= costCoin) {
            this.playerModuleC.setCoin(-costCoin);
            Notice.showDownNotice("开始抽奖");
            return true;
        } else {
            Notice.showDownNotice("金币不足");
            this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            return false;
        }
    }

    public isCanDiamondLottery(costDiamond: number): boolean {
        if (this.playerModuleC.getDiamond() >= costDiamond) {
            this.playerModuleC.setDiamond(-costDiamond);
            Notice.showDownNotice("开始抽奖");
            return true;
        } else {
            Notice.showDownNotice("钻石不足");
            this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            return false;
        }
    }
}


export class LotteryModuleS extends ModuleS<LotteryModuleC, null> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }
}