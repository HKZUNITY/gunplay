import { Notice } from "../../common/notice/Notice";
import { EventType } from "../../const/Enum";
import LoginPanel_Generate from "../../ui-generate/Gun/LoginPanel_generate";
import { HUDModuleC } from "../HUDModule/HUDModuleC";
import { GunModuleC } from "./GunModuleC";

export class LoginPanel extends LoginPanel_Generate {
    private loginModuleC: LoginModuleC = null;

    protected onStart(): void {
        this.initData();
        this.bindButtons();
    }

    private initData(): void {
        this.loginModuleC = ModuleService.getModule(LoginModuleC);
        this.mExplainTextBlock.text = "活动期间\n每天在线30分钟连续3天\n即可免费领取";
        this.setConditionImage1Visible(false);
    }

    private bindButtons(): void {
        this.mLoginButton.onClicked.add(() => {
            if (this.loginModuleC.isGeted()) {
                Notice.showDownNotice("已经领取过了");
                return;
            }
            if (!this.loginModuleC.isCanGet()) {
                Notice.showDownNotice("未满足领取条件");
                return;
            }
            this.loginModuleC.setGet();
            this.mLoginTextBlock_1.text = "已领取";
            Notice.showDownNotice("领取成功");
        });
        this.mCloseButton.onClicked.add(() => {
            this.hide();
            this.loginModuleC.onSwitchCameraAction.call(0);
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        });
    }

    public setConditionImage1Visible(visible: boolean): void {
        this.mConditionImage2.visibility = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public setLoginText(days: number, isGet: boolean): void {
        this.mLoginTextBlock.text = ((days >= 3) ? "完成" : "未完成") + "(" + days + "/3)";
        if (isGet) this.mLoginTextBlock_1.text = "已领取";
    }

    public setAddLoginText(days: number, isGet: boolean): void {
        this.setConditionImage1Visible(true);
        this.setLoginText(days, isGet);
    }
}

export class LoginData extends Subdata {
    @Decorator.persistence()
    public days: number = 0;
    @Decorator.persistence()
    public isGet: boolean = false;

    protected initDefaultData(): void {
        this.days = 0;
        this.isGet = false;
    }

    //当前最新的版本号(默认是1，升级数据需要重写)
    // protected override get version() {
    //     return 2;
    // }

    // protected onDataInit(): void {
    //     if (this.currentVersion != this.version) {//版本不一致，需要升级数据
    //         this.currentVersion = this.version;//设置当前版本 
    //         this.save(true);
    //     }
    // }

    public setDays(): void {
        this.days++;
        this.save(true);
    }

    public setIsGet(): void {
        this.isGet = true;
        this.save(true);
    }
}

export class LoginModuleC extends ModuleC<LoginModuleS, LoginData> {
    private hudModuleC: HUDModuleC = null;
    private gunModuleC: GunModuleC = null;
    private loginPanel: LoginPanel = null;

    public onSwitchCameraAction: Action1<number> = new Action1<number>();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initData();
        this.initCamera();
        this.bindAction();
        InputUtil.onKeyDown(mw.Keys.G, () => {
            this.setAddLogin();
        });
    }

    private initData(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.gunModuleC = ModuleService.getModule(GunModuleC);
        this.loginPanel = UIService.getUI(LoginPanel);
    }

    private bindAction(): void {
        this.hudModuleC.onOpenLoginAction.add(() => {
            this.loginPanel.show();
            this.onSwitchCameraAction.call(1);
            Event.dispatchToLocal("IsOpenUI", false);
        });
    }

    private async initCamera(): Promise<void> {
        let cameraAnchor = await mw.GameObject.asyncFindGameObjectById("1ED08CCC");
        let myCamera = Camera.currentCamera;
        let gunCamera: mw.Camera = await GameObject.asyncSpawn<mw.Camera>(
            "Camera",
            {
                replicates: false,
                transform: cameraAnchor.worldTransform
            });
        this.onSwitchCameraAction.add((cameraType: number) => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(gunCamera, 0.5, mw.CameraSwitchBlendFunction.Linear);
            }
        });
    }

    private days: number = 0;
    private isGet: boolean = false;
    protected onEnterScene(sceneType: number): void {
        this.days = this.data.days;
        this.isGet = this.data.isGet;
        if (!this.loginPanel) this.loginPanel = UIService.getUI(LoginPanel);
        this.loginPanel.setLoginText(this.days, this.isGet);
        if (this.days >= 3) this.loginPanel.setConditionImage1Visible(true);
    }

    public isCanGet(): boolean {
        return (this.days >= 3);
    }

    public isGeted(): boolean {
        return this.isGet;
    }

    public setAddLogin(): void {
        this.days++;
        this.loginPanel.setAddLoginText(this.days, this.isGet);
        this.server.net_setAddLogin();
    }

    public setGet(): void {
        this.gunModuleC.buyGun(14, true);
        this.isGet = true;
        this.server.net_setIsGet();
    }
}

export class LoginModuleS extends ModuleS<LoginModuleC, LoginData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_setAddLogin(): void {
        this.currentData.setDays();
    }

    @Decorator.noReply()
    public net_setIsGet(): void {
        this.currentData.setIsGet();
    }
}