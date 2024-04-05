import Guide from "../../common/Guide";
import { Notice } from "../../common/notice/Notice";
import { EventType } from "../../const/Enum";
import Globaldata from "../../const/Globaldata";
import Helper from "../../const/Helper";
import AdsModuleC, { AdType } from "../AdsModule/AdsModuleC";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { GunPanel } from "../GunModule/ui/GunPanel";
import { LotteryPanel } from "../LotteryModule/LotteryModule";
import { PickUpRoleModuleC } from "../PickUpRoleModule/PickUpRoleModule";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { HUDData } from "./HUDData";
import { HUDModuleS } from "./HUDModuleS";
import HUDPanel from "./ui/HUDPanel";

export class HUDModuleC extends ModuleC<HUDModuleS, HUDData> {
    private playerModuleC: PlayerModuleC = null;
    private pickUpRoleModuleC: PickUpRoleModuleC = null;
    private adsModuleC: AdsModuleC = null;
    private hudPanel: HUDPanel = null;
    private gunPanel: GunPanel = null;
    private lotteryPanel: LotteryPanel = null;
    private adTipsPanel: AdTipsPanel = null;

    public onOpenTeamAction: Action = new Action();
    public onOpenGunAction: Action = new Action();
    public onOpenRoleAction: Action = new Action();
    public onOpenLoginAction: Action = new Action();
    public onOpenRankAction: Action = new Action();
    public onOpenLotteryAction: Action = new Action();
    public onOpenTaskAction: Action = new Action();
    public onAddCoinAction: Action = new Action();
    public onAddDiamondAction: Action = new Action();

    public onFireScaleAction: Action1<number> = new Action1<number>();
    public onControlScaleAction: Action1<number> = new Action1<number>();
    public onBgmVolumeAction: Action1<number> = new Action1<number>();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initDatas();
        this.registerActions();
    }

    private initDatas(): void {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.pickUpRoleModuleC = ModuleService.getModule(PickUpRoleModuleC);
        this.adsModuleC = ModuleService.getModule(AdsModuleC);
        this.hudPanel = UIService.getUI(HUDPanel);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
        this.gunPanel = UIService.getUI(GunPanel);
        this.lotteryPanel = UIService.getUI(LotteryPanel);
    }

    private registerActions(): void {
        Event.addLocalListener(EventType.OpenCloseHUDRadarUI, (isShow: boolean) => {
            isShow ? this.hudPanel.show() : this.hudPanel.hide();
        });

        this.onAddCoinAction.add(() => {
            if (Globaldata.isOpenIAA) {
                this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            } else {
                this.playerModuleC.setCoin(8888);
            }
        });

        this.onAddDiamondAction.add(() => {
            if (Globaldata.isOpenIAA) {
                this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            } else {
                this.playerModuleC.setDiamond(1);
            }
        });

        this.onOpenRoleAction.add(() => {
            Event.dispatchToLocal("IsOpenUI", false);
            this.pickUpRoleModuleC.onOpenRoleAction.call(true);
        });

        this.onFireScaleAction.add((scale: number) => {
            this.currentFireScale = scale;
        });
        this.onControlScaleAction.add((scale: number) => {
            this.currentControlScale = scale;
        });
        this.onBgmVolumeAction.add((volume: number) => {
            this.currentBgmVolume = volume;
            SoundService.BGMVolumeScale = volume;
        });
    }

    protected onEnterScene(sceneType: number): void {
        if (!this.hudPanel) this.hudPanel = UIService.getUI(HUDPanel);
        this.hudPanel.show();
        this.initSetData();
        TimeUtil.delaySecond(5).then(() => {
            this.onOpenTeamAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.hudPanel.mVirtualJoystickPanel.resetJoyStick();
            this.playBgMusic(false);
        });
    }

    public updateCoinUI(coin: number): void {
        let coinText = (coin - Number(this.hudPanel.mCoinTextBlock.text));
        Notice.showDownNotice(((coinText >= 0) ? "获得" : "花费") + Math.abs(coinText) + "金币");
        this.hudPanel.mCoinTextBlock.text = coin.toString();
        this.gunPanel.mBuyCoinTextBlock.text = coin.toString();
        this.lotteryPanel.mCoinTextBlock.text = coin.toString();
    }

    public updateDiamondUI(diamond: number): void {
        this.hudPanel.mDiamondTextBlock.text = diamond.toString();
        this.gunPanel.mBuyDiamondTextBlock.text = diamond.toString();
        this.lotteryPanel.mDiamondTextBlock.text = diamond.toString();
    }

    public updateHpUI(hp: number): void {
        if (hp < 0) hp = 0;
        this.hudPanel.mHpTextBlock.text = 100 + "/" + hp;
        this.hudPanel.mHpProgressBar.currentValue = hp;
        if (hp <= 0) this.hudPanel.startCountDown();
        if (hp == 100) {
            this.hudPanel.endCountDown();
            Guide.startGuide(new mw.Vector(4098.63, 4468.69, 50), null);
            this.adsModuleC.dieAds();
            // this.playBgMusic(false);
        }
    }

    public showInvincibleTimeUI(): void {
        this.hudPanel.showInvincibleTimeUI(2);
        // this.playBgMusic(true);
    }

    public updateKillCountUI(killCount: number, coin: number): void {
        let lvExp = Helper.getLvAndExpByKillCount(killCount);
        this.hudPanel.mLvTextBlock.text = "等级 Lv." + lvExp[0];
        this.hudPanel.mExpTextBlock.text = Math.floor(lvExp[1] / lvExp[0] * 100) + "%";
        this.hudPanel.mExpProgressBar.currentValue = Math.floor(lvExp[1] / lvExp[0] * 100);
        this.updateCoinUI(coin);
    }

    public updateUI(coin: number, diamond: number, killCount: number): void {
        this.updateDiamondUI(diamond);
        this.updateKillCountUI(killCount, coin);
    }

    public killTip(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        let killTipType: KillTipType = KillTipType.None;
        if (killerUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killer;
        } else if (killedUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killed;
        }
        this.hudPanel.killTip(killTipType, killerName, killedName);
        this.killTipsSound(killerUserId, killerName, killedUserId, killedName);
    }

    private currentFireScale: number = 0.05;
    private currentControlScale: number = 1;
    private currentBgmVolume: number = 1;
    private initSetData(): void {
        this.currentFireScale = this.data.fireScale;
        this.currentControlScale = this.data.controlScale;
        this.currentBgmVolume = this.data.bgmVolume;
        this.hudPanel.initSetData(this.currentFireScale, this.currentControlScale, this.currentBgmVolume);
    }

    public getFireScale(): number {
        return this.currentFireScale;
    }

    public saveSetData(): void {
        if (this.data.fireScale == this.currentFireScale &&
            this.data.controlScale == this.currentControlScale &&
            this.data.bgmVolume == this.currentBgmVolume) return;
        this.server.net_saveSetData(this.currentFireScale, this.currentControlScale, this.currentBgmVolume);
    }

    private killCountMap: Map<string, number> = new Map<string, number>();
    private revengeUserIdMap: Set<string> = new Set<string>();
    private killTipsSound(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        let killTipType: KillTipType = KillTipType.None;
        if (killedUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killed;
            if (!this.revengeUserIdMap.has(killerUserId)) this.revengeUserIdMap.add(killerUserId);
            SoundService.playSound("294343");
        } else if (killerUserId == this.localPlayer.userId && this.revengeUserIdMap.has(killedUserId)) {
            killTipType = KillTipType.revenge;
            this.revengeUserIdMap.delete(killedUserId);
            SoundService.playSound("294342");
        }
        this.hudPanel.showKillTips2(killerName, killedName, killTipType);

        if (this.killCountMap.has(killedUserId)) this.killCountMap.delete(killedUserId);
        let killCount: number = 0;
        if (this.killCountMap.has(killerUserId)) {
            killCount = this.killCountMap.get(killerUserId);
        }
        killCount++;
        this.killCountMap.set(killerUserId, killCount);
        if (killCount <= 1) return;

        let soundId: string = "";
        let killCountTips: string = "";
        switch (killCount) {
            case 2:
                soundId = "65877";
                killCountTips = "双杀！势不可当！";
                break;
            case 3:
                soundId = "65874";
                killCountTips = "三连杀！勇冠三军！";
                break;
            case 4:
                soundId = "65873";
                killCountTips = "四连杀！无人能敌！";
                break;
            case 5:
                soundId = "65881";
                killCountTips = "五连杀！横扫千军！";
                break;
            case 6:
                soundId = "65871";
                killCountTips = "六连杀！接近神了！";
                break;
            case 7:
                soundId = "65879";
                killCountTips = "七连杀！超越神了！";
                break;
            default:
                soundId = "65879";
                killCountTips = this.changeToCN(killCount) + "连杀！超越神了！";
                break;
        }
        SoundService.playSound(soundId);
        this.hudPanel.showKillTips1(killCountTips, killerName, killedName);
    }

    private isGirl(): boolean {
        let somatotype = this.localPlayer.character.description.advance.base.characterSetting.somatotype;
        return (somatotype == mw.SomatotypeV2.AnimeFemale || somatotype == mw.SomatotypeV2.CartoonyFemale
            || somatotype == mw.SomatotypeV2.LowpolyAdultFemale || somatotype == mw.SomatotypeV2.RealisticAdultFemale);
    }

    private words: string[] = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    private adds: string[] = ["", '十', '百', '千', '万', '亿', '十', '百', '千'];

    /**根据数字获取汉字*/
    private changeToCN(num: number): string {
        if (this.words[num]) {
            return this.words[num];
        } else if (num > 10 && num < 20) {
            let numStr = num.toString();
            let n = numStr.substring(1, 2);
            let result = this.adds[1] + this.words[n];
            return result;
        } else if (num > 10) {
            let result = "";
            let numStr = num.toString();
            for (var i = 0; i < numStr.length; ++i) {
                let n = numStr.substring(i, i + 1);
                let m = numStr.length - i - 1;
                result += this.words[n] + this.adds[m];
            }
            return result;
        }
        else return "零";
    }

    private playBgMusic(isBoss: boolean): void {
        SoundService.playBGM(isBoss ? "136207" : "146100");
        SoundService.BGMVolumeScale = this.currentBgmVolume;
    }
}

export class KillTipData {
    public killTipType: KillTipType;
    public killerName: string;
    public killedName: string;
}

export enum KillTipType {
    None = 0,
    Killer = 1,
    Killed = 2,
    revenge = 3,
}