import { update } from "./common/notice/Tween";
import Globaldata from "./const/Globaldata";
import AdsModuleC from "./module/AdsModule/AdsModuleC";
import AdsModuleS from "./module/AdsModule/AdsModuleS";
import { GuideData, GuideModuleC, GuideModuleS } from "./module/GuideModule/GuideModule";
import { GunData } from "./module/GunModule/GunData";
import { GunModuleC } from "./module/GunModule/GunModuleC";
import { GunModuleS } from "./module/GunModule/GunModuleS";
import { LoginData, LoginModuleC, LoginModuleS } from "./module/GunModule/LoginModule";
import { PickUpGunModuleC, PickUpGunModuleS } from "./module/GunModule/PickUpGunModule";
import { ATKModuleC, ATKModuleS } from "./module/HUDModule/ATKModule";
import { HUDData } from "./module/HUDModule/HUDData";
import { HUDModuleC } from "./module/HUDModule/HUDModuleC";
import { HUDModuleS } from "./module/HUDModule/HUDModuleS";
import { LotteryModuleC, LotteryModuleS } from "./module/LotteryModule/LotteryModule";
import { PickUpRoleModuleC, PickUpRoleModuleS, RoleData } from "./module/PickUpRoleModule/PickUpRoleModule";
import { PlayerData } from "./module/PlayerModule/PlayerData";
import { PlayerModuleC } from "./module/PlayerModule/PlayerModuleC";
import { PlayerModuleS } from "./module/PlayerModule/PlayerModuleS";
import { RadarModuleC } from "./module/RadarModule/RadarModuleC";
import { RadarModuleS } from "./module/RadarModule/RadarModuleS";
import { WorldRankModuleC } from "./module/RankModule/WorldRankModuleC";
import { WorldRankModuleS } from "./module/RankModule/WorldRankModuleS";
import { TaskData } from "./module/TaskModule/TaskData";
import TaskModuleC from "./module/TaskModule/TaskModuleC";
import TaskModuleS from "./module/TaskModule/TaskModuleS";
import { LogType } from "./tools/Console";

@Component
export default class GameLauncher extends mw.Script {
    // @mw.Property({ displayName: "是否隐藏头顶UI", group: "面板设置" })
    // private isHideHeadUI: boolean = true;

    @mw.Property({ displayName: "是否开启IAA", group: "面板设置" })
    private isOpenIAA: boolean = true;

    @mw.Property({ displayName: "日志类型", group: "面板设置", tooltip: "日志类型", enumType: LogType })
    private logLevel: LogType = LogType.None;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.onStartCS();
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        }
        else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }

    /**客户端服务端的onStart */
    private onStartCS(): void {
        this.useUpdate = true;
        this.onRegisterModule();
        Globaldata.logLevel = Number(this.logLevel);
        // Globaldata.isHideHeadUI = this.isHideHeadUI;
        Globaldata.isOpenIAA = !mw.SystemUtil.isPIE || this.isOpenIAA;
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        mw.TweenUtil.TWEEN.update();
        if (mw.SystemUtil.isClient()) {
            update();
            this.onUpdateC(dt);
        }
        else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }

    /**注册模块 */
    private onRegisterModule(): void {
        ModuleService.registerModule(HUDModuleS, HUDModuleC, HUDData);
        ModuleService.registerModule(RadarModuleS, RadarModuleC, null);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        ModuleService.registerModule(ATKModuleS, ATKModuleC, null);
        ModuleService.registerModule(GunModuleS, GunModuleC, GunData);
        ModuleService.registerModule(PickUpGunModuleS, PickUpGunModuleC, null);
        ModuleService.registerModule(PickUpRoleModuleS, PickUpRoleModuleC, RoleData);
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideData);
        ModuleService.registerModule(AdsModuleS, AdsModuleC, null);
        ModuleService.registerModule(WorldRankModuleS, WorldRankModuleC, null);
        ModuleService.registerModule(LotteryModuleS, LotteryModuleC, null);
        ModuleService.registerModule(TaskModuleS, TaskModuleC, TaskData);
        ModuleService.registerModule(LoginModuleS, LoginModuleC, LoginData);
    }

    /**------------------------------------------- 客户端 ------------------------------------------------ */
    /**客户端的OnStart */
    private onStartC(): void {

    }

    /**客户端的update */
    private onUpdateC(dt: number): void {

    }

    /**------------------------------------------- 客户端 ------------------------------------------------ */

    /**------------------------------------------- 服务端 ------------------------------------------------ */
    /**服务端的OnStart */
    private onStartS(): void {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
    }

    /**服务端的update */
    private onUpdateS(dt: number): void {

    }
    /**------------------------------------------- 服务端 ------------------------------------------------ */
}