import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import Console from "../../tools/Console";
import { AdType } from "../AdsModule/AdsModuleC";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { HUDModuleC } from "../HUDModule/HUDModuleC";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { GunData } from "./GunData";
import { GunModuleS } from "./GunModuleS";
import { GunPanel } from "./ui/GunPanel";

export class GunModuleC extends ModuleC<GunModuleS, GunData> {
    private hudModuleC: HUDModuleC = null;
    private playerModuleC: PlayerModuleC = null;
    private gunPanel: GunPanel = null;
    private adTipsPanel: AdTipsPanel = null;

    private gunAnchor: mw.GameObject = null;
    private cameraAnchor: mw.GameObject = null;
    private gunEffect: mw.Effect = null;
    private onSwitchCameraAction: Action1<number> = new Action1<number>();

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initData();
        this.bindActions();
    }

    private gunIds: number[] = [];
    private currentGunId: number = 0;
    private initData(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
    }

    private bindActions(): void {
        let isOpen = false;
        InputUtil.onKeyDown(mw.Keys.One, () => {
            isOpen = !isOpen;
            isOpen ? this.openGunPanel() : this.closeGunPanel();
        });
        let isOpenFly = false;
        InputUtil.onKeyDown(mw.Keys.Two, () => {
            isOpenFly = !isOpenFly;
            isOpenFly ? this.localPlayer.character.switchToFlying() : this.localPlayer.character.switchToWalking();
        });
        this.hudModuleC.onOpenGunAction.add(() => {
            this.openGunPanel();
        });
    }

    public openGunPanel(): void {
        Event.dispatchToLocal("IsOpenUI", false);
        this.gunPanel.show();
        // this.openCamera();
        this.onSwitchCameraAction.call(1);
    }

    public closeGunPanel(): void {
        Event.dispatchToLocal("IsOpenUI", true);
        this.gunPanel.hide();
        // this.closeCamera();
        this.onSwitchCameraAction.call(0);
    }

    protected onEnterScene(sceneType: number): void {
        this.findGunAnchor();
    }

    private async findGunAnchor(): Promise<void> {
        this.gunPanel = mw.UIService.getUI(GunPanel);
        this.gunIds = this.data.gunIds;
        this.currentGunId = this.data.currentGunId;
        this.gunAnchor = await GameObject.asyncFindGameObjectById("19BF5A36");
        this.cameraAnchor = await GameObject.asyncFindGameObjectById("072B5519");
        this.gunEffect = (await GameObject.asyncFindGameObjectById("1B50DFAB")) as mw.Effect;
        this.gunPanel.initGunPanel(this.gunIds, this.currentGunId);
        this.gunAnchor.localTransform.rotation = new mw.Rotation(0, 0, -180);
        this.playerSwitchGun(this.currentGunId);
        let myCamera = Camera.currentCamera;
        let gunCamera: mw.Camera = await GameObject.asyncSpawn<mw.Camera>(
            "Camera",
            {
                replicates: false,
                transform: new mw.Transform(
                    this.cameraAnchor.worldTransform.position,
                    this.cameraAnchor.worldTransform.rotation,
                    mw.Vector.one
                )
            });
        this.onSwitchCameraAction.add((cameraType: number) => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(gunCamera, 0.5, mw.CameraSwitchBlendFunction.Linear);
            }
        });
    }

    public lottery(gunId: number): void {
        this.gunPanel.updateSelectGun(gunId);
        this.buyGun(gunId, false);
    }

    public getGunIds(): number[] {
        return this.gunIds;
    }

    private buyGunOnComplete(): void {
        this.gunEffect.stop();
        this.gunPanel.buyGunOnComplete(this.gunIds);
    }

    public buyGun(gunId: number, isDirectUse: boolean): void {
        if (this.gunIds.includes(gunId)) return;
        this.gunIds.push(gunId);
        if (isDirectUse) this.setCurrentGunId(gunId);
        this.buyGunOnComplete();
        if (GameConfig.Gun.getElement(gunId).GunType == 2) return;
        this.server.net_buyGun(gunId);
    }

    public isBuyGunByCoin(gunId: number, isDirectUse: boolean): boolean {
        if (this.gunIds.includes(gunId)) {
            Console.error("已经购买过该枪支");
            Notice.showDownNotice("已经购买过该枪支");
            return true;
        }
        let gunElement = GameConfig.Gun.getElement(gunId);
        if (this.playerModuleC.getCoin() >= gunElement.Price[1]) {
            this.playerModuleC.setCoin(-gunElement.Price[1]);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyGun(gunId, isDirectUse);
            return true;
        } else {
            Console.error("金币不足");
            Notice.showDownNotice("金币不足");
            this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            return false;
        }
    }

    public isBuyGunByDiamond(gunId: number, isDirectUse: boolean): boolean {
        if (this.gunIds.includes(gunId)) {
            Console.error("已经购买过该枪支");
            Notice.showDownNotice("已经购买过该枪支");
            return true;
        }
        let gunElement = GameConfig.Gun.getElement(gunId);
        if (this.playerModuleC.getDiamond() >= gunElement.Price[0]) {
            this.playerModuleC.setDiamond(-gunElement.Price[0]);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyGun(gunId, isDirectUse);
            return true;
        } else {
            Console.error("钻石不足");
            Notice.showDownNotice("钻石不足");

            this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            return false;
        }
    }

    private currentGunGo: mw.GameObject = null;
    public switchGun(gunId: number): void {
        if (!this.gunIds.includes(gunId)) {
            Console.error("没有该枪支");
            Notice.showDownNotice("没有该枪支");
            this.gunEffect.play();
        } else {
            this.gunEffect.stop();
        }
        this.spawnGun(gunId);
    }

    private async spawnGun(gunId: number): Promise<void> {
        if (this.currentGunGo) {
            mwext.GameObjPool.despawn(this.currentGunGo);
            this.currentGunGo = null;
        }
        let gunElement = GameConfig.Gun.getElement(gunId);
        let gunGo = await SpawnManager.modifyPoolAsyncSpawn(gunElement.GunIcon_M);
        if (!gunGo) return;
        if (gunId == 14) (gunGo as mw.Model).setMaterial("55588");
        if (gunId == 11) (gunGo as mw.Model).resetMaterial();
        gunGo.parent = this.gunAnchor;
        gunGo.localTransform.position = gunElement.GunLoc;
        gunGo.localTransform.rotation = new mw.Rotation(0, 10, 0);
        gunGo.localTransform.scale = gunElement.GunScale;
        this.currentGunGo = gunGo;
    }

    public setCurrentGunId(gunId: number): void {
        if (!this.gunIds.includes(gunId)) {
            Console.error("没有该枪支");
            Notice.showDownNotice("没有该枪支");
            return;
        }
        if (this.currentGunId == gunId) return;
        this.currentGunId = gunId;
        Notice.showDownNotice("切换成功");
        this.server.net_setCurrentGunId(gunId);
    }

    public playerSwitchGun(gunId: number): void {
        this.server.net_playerSwitchGun(gunId);
    }

    //#region Camera
    // private openCamera(): void {
    //     this.camera.parent = this.cameraAnchor;
    //     this.camera.positionMode = mw.CameraPositionMode.PositionFixed;
    //     this.camera.rotationMode = mw.CameraRotationMode.RotationFixed;
    //     this.cameraTransform.position = new mw.Vector(Globaldata.isShoot ? 450 : 400, 80, 50);
    //     this.cameraTransform.rotation = new mw.Rotation(0, 0, -90);
    //     this.camera.localTransform = this.cameraTransform;
    // }

    // private closeCamera(): void {
    //     this.camera.parent = this.localPlayer.character;
    //     this.camera.positionMode = mw.CameraPositionMode.PositionFollow;
    //     this.camera.rotationMode = mw.CameraRotationMode.RotationControl;
    //     this.cameraTransform.position = new mw.Vector(175, 25, -3);
    //     this.cameraTransform.rotation = mw.Rotation.zero;
    //     this.camera.localTransform = this.cameraTransform;
    //     this.localPlayer.character.addMovement(this.localPlayer.character.worldTransform.getForwardVector());
    // }

    public addRoatation(dir: number) {
        if (this.gunAnchor) {
            this.gunAnchor.worldTransform.rotation = this.gunAnchor.worldTransform.rotation.add(new mw.Rotation(0, 0, -20 * dir))
        }
    }
    //#endregion
}