import { GameConfig } from "../../config/GameConfig";
import { IPickUpGunElement } from "../../config/PickUpGun";
import { GunPanel } from "./ui/GunPanel";

export class PickUpGunModuleC extends ModuleC<PickUpGunModuleS, null> {
    private gunPanel: GunPanel = null;
    private pickUpGunElements: IPickUpGunElement[] = [];

    protected onStart(): void {
        this.initDatas();
    }

    private initDatas(): void {
        this.gunPanel = UIService.getUI(GunPanel);
        this.pickUpGunElements = GameConfig.PickUpGun.getAllElement();
        this.findGunObjBindTriggers();
    }

    private async findGunObjBindTriggers(): Promise<void> {
        for (let i = 0; i < this.pickUpGunElements.length; ++i) {
            let gunTrigger = await mw.GameObject.asyncFindGameObjectById(this.pickUpGunElements[i].GunTrigger) as mw.Trigger;
            gunTrigger.onEnter.add(this.bindEnterTrigger.bind(this, this.pickUpGunElements[i].ID));
        }
    }

    private bindEnterTrigger(gunId: number, character: mw.Character): void {
        if (character != Player.localPlayer.character) return;
        this.gunPanel.pickUpGun(gunId);
    }
}


export class PickUpGunModuleS extends ModuleS<PickUpGunModuleC, null> {

    protected onStart(): void {

    }
}