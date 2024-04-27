import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { GameConfig } from "../../config/GameConfig";
import Console from "../../tools/Console";
import { GunData } from "./GunData";
import { GunModuleC } from "./GunModuleC";

export class GunModuleS extends ModuleS<GunModuleC, GunData> {
    private weaponMap: Map<string, mw.GameObject> = new Map<string, mw.GameObject>();
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onPlayerLeft(player: mw.Player): void {
        let userId = player.userId;
        if (this.weaponMap.has(userId)) {
            let weapon = this.weaponMap.get(userId);
            weapon?.getChildren().forEach((value: mw.GameObject) => {
                value?.destroy();
            });
            weapon?.destroy();
            this.weaponMap.delete(userId);
            Console.error("wfz-A");
        }
    }

    @Decorator.noReply()
    public net_buyGun(gunId: number): void {
        this.currentData.buyGun(gunId);
    }

    @Decorator.noReply()
    public net_setCurrentGunId(gunId: number): void {
        this.playerSwitchGun(gunId, this.currentPlayer);
        if (GameConfig.Gun.getElement(gunId).GunType == 2) return;
        this.currentData.setCurrentGunId(gunId);
    }

    @Decorator.noReply()
    public net_playerSwitchGun(gunId: number): void {
        this.playerSwitchGun(gunId, this.currentPlayer);
    }

    private async playerSwitchGun(gunId: number, player: mw.Player): Promise<void> {
        player.character.movementEnabled = false;
        let weapon = await SpawnManager.asyncSpawn({
            guid: GameConfig.Gun.getElement(gunId).GunPrefab,
            replicates: true,
            // transform: new mw.Transform(player.character.worldTransform.position, mw.Rotation.zero, mw.Vector.one)
        });
        await weapon.asyncReady();
        player.character.attachToSlot(weapon, mw.HumanoidSlotType.BackOrnamental);
        weapon.localTransform.position = mw.Vector.zero;
        player.character.movementEnabled = true;

        await TimeUtil.delaySecond(2);
        let userId = player.userId;
        if (this.weaponMap.has(userId)) {
            let weapon = this.weaponMap.get(userId);
            weapon?.getChildren().forEach((value: mw.GameObject) => {
                value?.destroy();
            });
            weapon?.destroy();
            Console.error("wfz-A");
        }
        this.weaponMap.set(userId, weapon);
    }
}