import { Notice } from "../../common/notice/Notice";
import { GameConfig } from "../../config/GameConfig";
import { IRoleElement } from "../../config/Role";
import { EventType } from "../../const/Enum";
import Console from "../../tools/Console";
import BuyRolePanel_Generate from "../../ui-generate/BuyRole/BuyRolePanel_generate";
import RolePanel_Generate from "../../ui-generate/BuyRole/RolePanel_generate";
import { AdType } from "../AdsModule/AdsModuleC";
import AdTipsPanel from "../AdsModule/ui/AdTipsPanel";
import { ATKModuleC } from "../HUDModule/ATKModule";
import { HUDModuleC } from "../HUDModule/HUDModuleC";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";

export class RoleData extends Subdata {
    @Decorator.persistence()
    public roleIds: number[] = [];
    @Decorator.persistence()
    public currentRoleId: number = 0;

    protected initDefaultData(): void {
        this.roleIds = [1];
        this.currentRoleId = 1;
    }

    public buyRole(roleId: number): void {
        this.currentRoleId = roleId;
        if (!this.roleIds.includes(roleId)) this.roleIds.push(roleId);
        this.save(true);
    }

    public setCurrentRoleId(roleId: number): void {
        this.currentRoleId = roleId;
        this.save(true);
    }
}

export class BuyRolePanel extends BuyRolePanel_Generate {
    private pickUpGunModuleC: PickUpRoleModuleC = null;
    private roleElement: IRoleElement = null;

    protected onStart(): void {
        this.layer = mw.UILayerTop;
        this.pickUpGunModuleC = ModuleService.getModule(PickUpRoleModuleC);
        this.bindButtons();
    }

    private bindButtons(): void {
        this.mCloseButton.onClicked.add(() => {
            this.hide();
        });
        this.mDiamondButton.onClicked.add(() => {
            if (this.pickUpGunModuleC.isBuyGunByDiamond(this.roleElement.ID, this.roleElement.Price[0], this.roleElement.Role)) {
                this.hide();
                this.pickUpGunModuleC.onOpenRoleAction.call(false);
                Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
                Event.dispatchToLocal("IsOpenUI", true);
            }
        });
        this.mCoinButton.onClicked.add(() => {
            if (this.pickUpGunModuleC.isBuyGunByCoin(this.roleElement.ID, this.roleElement.Price[1], this.roleElement.Role)) {
                this.hide();
                this.pickUpGunModuleC.onOpenRoleAction.call(false);
                Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
                Event.dispatchToLocal("IsOpenUI", true);
            }
        });
    }

    public showAndInitData(roleElement: IRoleElement): void {
        this.roleElement = roleElement;
        this.mNameTextBlock.text = roleElement.Name + "\n(永久)";
        let prices = roleElement.Price;
        this.mDiamondTextBlock.text = prices[0].toString();
        this.mCoinTextBlock.text = prices[1].toString();
        this.show();
    }

    public show(...param): void {
        mw.UIService.showUI(this, this.layer, ...param);
    }

    public hide(): void {
        mw.UIService.hideUI(this);
    }
}

export class RolePanel extends RolePanel_Generate {
    private pickUpRoleModuleC: PickUpRoleModuleC = null;
    private currentSelectRoleIndex: number = 0;
    private maxRoleCount: number = 0;

    protected onStart(): void {
        this.initDatas();
        this.bindButtons();
    }

    private initDatas(): void {
        this.pickUpRoleModuleC = ModuleService.getModule(PickUpRoleModuleC);
        this.maxRoleCount = GameConfig.Role.getAllElement().length;
    }

    private bindButtons(): void {
        this.mCloseButton.onClicked.add(() => {
            this.hide();
            this.pickUpRoleModuleC.onOpenRoleAction.call(false);
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        });
        this.mUseButton.onClicked.add(() => {
            this.pickUpRoleModuleC.useRole(this.currentSelectRoleIndex + 1);
        });

        this.mLeftButton.onClicked.add(() => {
            if (--this.currentSelectRoleIndex < 0) this.currentSelectRoleIndex = this.maxRoleCount - 1;
            this.pickUpRoleModuleC.onUpdateCameraPos.call(this.currentSelectRoleIndex);
            this.updateUseButtonInfo(this.pickUpRoleModuleC.isHasRoleId(this.currentSelectRoleIndex + 1));
        });

        this.mRightButton.onClicked.add(() => {
            if (++this.currentSelectRoleIndex >= this.maxRoleCount) this.currentSelectRoleIndex = 0;
            this.pickUpRoleModuleC.onUpdateCameraPos.call(this.currentSelectRoleIndex);
            this.updateUseButtonInfo(this.pickUpRoleModuleC.isHasRoleId(this.currentSelectRoleIndex + 1));
        });
    }

    private updateUseButtonInfo(isHas: boolean): void {
        this.mUseTextBlock.text = isHas ? "使用" : "购买";
    }

    protected onShow(...params): void {
        this.updateUseButtonInfo(this.pickUpRoleModuleC.isHasRoleId(this.currentSelectRoleIndex + 1));
    }
}

export class PickUpRoleModuleC extends ModuleC<PickUpRoleModuleS, RoleData> {
    private atkModuleC: ATKModuleC = null;
    private playerModuleC: PlayerModuleC = null;
    private rolePanel: RolePanel = null;
    private buyRolePanel: BuyRolePanel = null;
    private roleElements: IRoleElement[] = [];
    private adTipsPanel: AdTipsPanel = null;

    public onSwitchCameraAction: mw.Action1<number> = new mw.Action1<number>();
    public onUpdateCameraPos: mw.Action1<number> = new mw.Action1<number>();
    public onOpenRoleAction: Action1<boolean> = new Action1<boolean>();

    protected onStart(): void {
        this.initDatas();
        this.bindAction();
    }

    private initDatas(): void {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.atkModuleC = ModuleService.getModule(ATKModuleC);
        this.buyRolePanel = UIService.getUI(BuyRolePanel);
        this.rolePanel = UIService.getUI(RolePanel);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
        this.roleElements = GameConfig.Role.getAllElement();
        this.findRoleBindTriggers();
    }

    private bindAction(): void {
        this.onOpenRoleAction.add((isOpen: boolean) => {
            isOpen ? this.rolePanel.show() : this.rolePanel.hide();
            this.onSwitchCameraAction.call(isOpen ? 1 : 0);
        });
    }

    private cameraAnchors: mw.Transform[] = [];
    private async findRoleBindTriggers(): Promise<void> {
        for (let i = 0; i < this.roleElements.length; ++i) {
            if (!this.roleElements[i].Trigger) continue;

            let roleTrigger = await mw.GameObject.asyncFindGameObjectById(this.roleElements[i].Trigger) as mw.Trigger;
            roleTrigger.onEnter.add(this.bindEnterRoleTrigger.bind(this, this.roleElements[i]));

            let cameraAnchor = await mw.GameObject.asyncFindGameObjectById(this.roleElements[i].CameraAnchor);
            if (cameraAnchor) this.cameraAnchors.push(cameraAnchor.worldTransform);

            if (!mw.AssetUtil.assetLoaded(this.roleElements[i].Role)) {
                await mw.AssetUtil.asyncDownloadAsset(this.roleElements[i].Role);
            }
            let role = await mw.GameObject.asyncSpawn(
                this.roleElements[i].Role,
                {
                    replicates: false,
                }) as mw.Character;
            if (!role || !role.worldTransform) continue;
            role.worldTransform.rotation = new mw.Rotation(this.roleElements[i].Rotation);
            role.displayName = this.roleElements[i].Name;
            role.setDescription([this.roleElements[i].Role]);
            await role.asyncReady();
            let somatotype = role.description.advance.base.characterSetting.somatotype;
            let gunid = "95676";
            if (somatotype % 2 == 0) {
                role.loadSubStance("49096").play();
                gunid = "122720";
            } else {
                role.loadSubStance("94258").play();
            }

            let gun = await mw.GameObject.asyncSpawn(gunid);
            role.attachToSlot(gun, mw.HumanoidSlotType.RightHand);

            let triggerLoc = roleTrigger.worldTransform.position;
            role.worldTransform.position = new mw.Vector(triggerLoc.x, triggerLoc.y, triggerLoc.z + role.collisionExtent.z / 2);
        }
        await this.initCamera();
    }

    private async initCamera(): Promise<void> {
        let myCamera = Camera.currentCamera;
        let gunCamera: mw.Camera = await GameObject.asyncSpawn<mw.Camera>(
            "Camera",
            {
                replicates: false,
                transform: this.cameraAnchors[0]
            });
        this.onSwitchCameraAction.add((cameraType: number) => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(gunCamera, 0.5, mw.CameraSwitchBlendFunction.Linear);
            }
        });
        this.onUpdateCameraPos.add((i: number) => {
            gunCamera.worldTransform = this.cameraAnchors[i];
        });
    }

    private bindEnterRoleTrigger(roleElement: IRoleElement, character: mw.Character): void {
        if (character != Player.localPlayer.character) return;
        if (roleElement.ID == this.currentRoleId) {
            Notice.showDownNotice("正在使用");
            return;
        }
        if (this.roleIds.includes(roleElement.ID)) {
            this.setCurrentRoleId(roleElement.ID, roleElement.Role);
        } else {
            this.buyRolePanel.showAndInitData(roleElement);
        }
    }

    public useRole(roleId: number): void {
        let roleElement = GameConfig.Role.getElement(roleId);
        if (roleElement.ID == this.currentRoleId) {
            Notice.showDownNotice("正在使用");
            return;
        }
        if (this.roleIds.includes(roleElement.ID)) {
            this.setCurrentRoleId(roleElement.ID, roleElement.Role);
            this.onOpenRoleAction.call(false);
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
            Notice.showDownNotice("使用成功");
        } else {
            this.buyRolePanel.showAndInitData(roleElement);
        }
    }

    public isHasRoleId(roleId: number): boolean {
        return this.roleIds.includes(roleId);
    }

    private roleIds: number[] = [];
    private currentRoleId: number = 0;

    protected onEnterScene(sceneType: number): void {
        this.roleIds = this.data.roleIds;
        this.currentRoleId = this.data.currentRoleId;
        this.setDescription(this.currentRoleId);
    }

    public isBuyGunByCoin(roleId: number, coin: number, role: string): boolean {
        if (this.roleIds.includes(roleId)) {
            Console.error("已经购买过该角色");
            Notice.showDownNotice("已经购买过该角色");
            return true;
        }
        if (this.playerModuleC.getCoin() >= coin) {
            this.playerModuleC.setCoin(-coin);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyRole(roleId, role);
            return true;
        } else {
            Console.error("金币不足");
            Notice.showDownNotice("金币不足");
            this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            return false;
        }
    }

    public isBuyGunByDiamond(roleId: number, diamond: number, role: string): boolean {
        if (this.roleIds.includes(roleId)) {
            Console.error("已经购买过该角色");
            Notice.showDownNotice("已经购买过该角色");
            return true;
        }
        if (this.playerModuleC.getDiamond() >= diamond) {
            this.playerModuleC.setDiamond(-diamond);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyRole(roleId, role);
            return true;
        } else {
            Console.error("钻石不足");
            Notice.showDownNotice("钻石不足");
            this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            return false;
        }
    }

    private buyRole(roleId: number, role: string): void {
        this.currentRoleId = roleId;
        if (!this.roleIds.includes(roleId)) this.roleIds.push(roleId);
        this.atkModuleC.onChangeSkillAction.call(roleId);
        this.server.net_buyRole(roleId, role);
    }

    private setCurrentRoleId(roleId: number, role: string): void {
        this.currentRoleId = roleId;
        this.atkModuleC.onChangeSkillAction.call(roleId);
        this.server.net_setCurrentRoleId(roleId, role);
    }

    private setDescription(roleId: number): void {
        let role = this.roleElements[roleId - 1].Role;
        this.atkModuleC.onChangeSkillAction.call(roleId);
        this.server.net_setDescription(role);
    }
}


export class PickUpRoleModuleS extends ModuleS<PickUpRoleModuleC, RoleData> {

    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_buyRole(roleId: number, role: string): void {
        this.currentData.buyRole(roleId);
        this.currentPlayer.character.setDescription([role]);
    }

    @Decorator.noReply()
    public net_setCurrentRoleId(roleId: number, role: string): void {
        this.currentData.setCurrentRoleId(roleId);
        this.currentPlayer.character.setDescription([role]);
    }

    @Decorator.noReply()
    public net_setDescription(roleId: string): void {
        this.currentPlayer.character.setDescription([roleId]);
    }
}