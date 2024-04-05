import { RadarModuleC } from "./RadarModuleC";

export class RadarModuleS extends ModuleS<RadarModuleC, null> {

    protected onStart(): void {
        this.bindEvent();
    }

    private bindEvent(): void {
        Event.addClientListener("exposeSelf", (_exposedPlayer: mw.Player) => {
            Player.getAllPlayers().forEach((player) => {
                if (player.character.gameObjectId != _exposedPlayer.character.gameObjectId) {
                    this.getClient(player).net_exposePlayer(_exposedPlayer, 86400);
                }
            });
        });
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        Player.getAllPlayers().forEach((oldPlayer: mw.Player) => {
            if (player.character.gameObjectId != oldPlayer.character.gameObjectId) {
                this.getClient(oldPlayer).net_exposePlayer(player, 86400);
                this.getClient(player).net_exposePlayer(oldPlayer, 86400);
            }
        });
    }
}