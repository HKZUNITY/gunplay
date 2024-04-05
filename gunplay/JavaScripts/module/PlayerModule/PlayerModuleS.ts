import { PrefabEvent } from "../../Prefabs/PrefabEvent";
import Globaldata from "../../const/Globaldata";
import Helper from "../../const/Helper";
import Console from "../../tools/Console";
import { Utils } from "../../tools/utils";
import { WorldRankModuleS } from "../RankModule/WorldRankModuleS";
import TaskModuleS from "../TaskModule/TaskModuleS";
import { PlayerData } from "./PlayerData";
import { PlayerModuleC } from "./PlayerModuleC";

export class TeamData {
    public playerId: string = "";
    public playerName: string = "";
}

export class PlayerModuleS extends ModuleS<PlayerModuleC, PlayerData> {
    private worldRankModuleS: WorldRankModuleS = null;
    private get getWorldRankModuleS(): WorldRankModuleS {
        if (this.worldRankModuleS == null) {
            this.worldRankModuleS = ModuleService.getModule(WorldRankModuleS);
        }
        return this.worldRankModuleS;
    }

    private taskModuleS: TaskModuleS = null;
    private get getTaskModuleS(): TaskModuleS {
        if (this.taskModuleS == null) {
            this.taskModuleS = ModuleService.getModule(TaskModuleS);
        }
        return this.taskModuleS;
    }

    private teamIdMap: Map<number, TeamData[]> = new Map<number, TeamData[]>();

    protected onAwake(): void {
        for (let i = 1; i <= 10; ++i) {
            this.teamIdMap.set(i, null);
        }
    }

    protected onStart(): void {
        this.bindEvent();
        this.bindPortalTrigger();
    }

    private bindEvent(): void {
        PrefabEvent.PrefabEvtFight.onHit(this.playerAtkPlayer.bind(this));
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.setPlayerDataS(player);
    }

    @Decorator.noReply()
    public net_onEnterScene(playerName: string): void {
        this.currentPlayer.character.displayName = playerName;
        let playerId = this.currentPlayer.character.gameObjectId;
        if (Helper.playerMap.has(playerId)) return;
        Helper.playerMap.set(playerId, this.currentPlayer);

        if (Helper.teamMap.has(playerId)) return;
        let teamId = this.getOneNullTeamId();
        Helper.teamMap.set(playerId, teamId);

        if (!this.teamIdMap.has(teamId)) return;
        let teamData = new TeamData();
        teamData.playerId = playerId;
        teamData.playerName = playerName;
        if (this.teamIdMap.get(teamId)) {
            this.teamIdMap.get(teamId).push(teamData);
        } else {
            this.teamIdMap.set(teamId, [teamData]);
        }
        this.getAllClient().net_syncOneTeamData(teamId, playerId, playerName);

        this.syncTeamData(this.currentPlayer);
    }

    private syncTeamData(player: mw.Player): void {
        let playerIds: string[] = [];
        let playerNames: string[] = [];
        let teamIds: number[] = [];
        this.teamIdMap.forEach((teamDatas, teamId) => {
            if (!teamDatas) return;
            teamDatas.forEach(teamData => {
                playerIds.push(teamData.playerId);
                playerNames.push(teamData.playerName);
                teamIds.push(teamId);
            });
        });
        if (playerIds.length == 0) return;
        this.getClient(player).net_syncTeamData(playerIds, playerNames, teamIds);
    }

    protected onPlayerLeft(player: mw.Player): void {
        let playerId = player.character.gameObjectId;
        if (!Helper.playerMap.has(playerId)) return;
        Helper.playerMap.delete(playerId);

        if (!Helper.teamMap.has(playerId)) return;
        let teamId = Helper.teamMap.get(playerId);
        Helper.teamMap.delete(playerId);

        this.deleteTeamIdMapData(teamId, playerId);
    }

    private deleteTeamIdMapData(teamId: number, playerId: string): void {
        let teamDatas = this.teamIdMap.get(teamId);
        if (!teamDatas) return;
        for (let i = 0; i < teamDatas.length; ++i) {
            if (teamDatas[i].playerId == playerId) {
                teamDatas.splice(i, 1);
                break;
            }
        }
        if (teamDatas.length == 0) teamDatas = null;
        this.teamIdMap.set(teamId, teamDatas);
        this.getAllClient().net_deleteTeamIdMapData(teamId, playerId);
    }

    private getOneNullTeamId(): number {
        let teamId: number = -1;
        for (let i = 1; i <= Globaldata.teamCount; ++i) {
            if (!this.teamIdMap.get(i)) {
                teamId = i;
                break;
            }
        }
        if (teamId == -1) {
            for (let i = 1; i <= Globaldata.teamCount; ++i) {
                if (this.teamIdMap.get(i).length == 1) {
                    teamId = i;
                    break;
                }
            }
        }
        return teamId;
    }

    public net_isCanChangeTeam(curTeam: number, toTeam: number): boolean {
        let teamDatas: TeamData[] = this.teamIdMap.get(toTeam);
        if (!teamDatas || teamDatas.length < 2) {
            let playerId = this.currentPlayer.character.gameObjectId;
            let teamData = this.getTeamData(curTeam, playerId);
            if (!teamData) return false;
            if (!teamDatas) teamDatas = [];
            teamDatas.push(teamData);
            this.teamIdMap.set(toTeam, teamDatas);
            Helper.teamMap.set(playerId, toTeam);
            this.getAllClient().net_changeTeam(playerId, curTeam, toTeam);
            return true;
        }
        return false;
    }

    private getTeamData(teamId: number, playerId: string): TeamData {
        let teamData: TeamData = null;
        let teamDatas = this.teamIdMap.get(teamId);
        if (!teamDatas) return teamData;
        for (let i = 0; i < teamDatas.length; ++i) {
            if (teamDatas[i].playerId == playerId) {
                teamData = teamDatas[i];
                teamDatas.splice(i, 1);
                if (teamDatas.length == 0) teamDatas = null;
                this.teamIdMap.set(teamId, teamDatas);
                return teamData;
            }
        }
    }

    /**
     * 敌人攻击玩家
     * @param gameObjectIds 
     * @param atk 
     * @returns 
     */
    @Decorator.noReply()
    public net_enemyAtkPlayer(gameObjectIds: string[], atk: number): void {
        this.enemyAtkPlayer(gameObjectIds, atk);
    }

    /**
     * 敌人攻击玩家 
     * @param gameObjectIds 
     * @returns 
     */
    public enemyAtkPlayer(gameObjectIds: string[], atk: number): void {
        if (gameObjectIds == null || gameObjectIds == undefined || gameObjectIds.length == 0) return;
        gameObjectIds.forEach(gameObjectId => {
            if (!Helper.playerMap.has(gameObjectId)) return;
            let player = Helper.playerMap.get(gameObjectId);
            if (player == null || player == undefined) return;
            this.updatePlayerData(null, player, atk, null);
        });
        Console.error("Enemy Atk Player。\ngameObjectId:" + gameObjectIds + "。\natk:" + atk + "。");
    }

    public playerAtkPlayerBySkill(senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector): void {
        this.playerAtkPlayer(senderGuid, targetGuid, damage, hitPoint);
    }

    private playerAtkPlayer(senderGuid: string, targetGuid: string, damage: number, hitPoint: mw.Vector): void {
        if (Helper.playerMap.has(senderGuid) && Helper.playerMap.has(targetGuid)
            && Helper.teamMap.has(targetGuid) && Helper.teamMap.has(senderGuid)) {
            let sender = Helper.playerMap.get(senderGuid);
            let targeter = Helper.playerMap.get(targetGuid);
            if (Helper.teamMap.get(senderGuid) != Helper.teamMap.get(targetGuid)) {
                if (!hitPoint) hitPoint = targeter.character.worldTransform.position;
                this.updatePlayerData(sender, targeter, damage, hitPoint);
            } else {
                this.getClient(sender).net_hitTeammate();
            }
        }
    }

    private playerDataSMap: Map<number, PlayerDataS> = new Map<number, PlayerDataS>();
    private setPlayerDataS(player: mw.Player): void {
        let playerDataS: PlayerDataS = new PlayerDataS();
        playerDataS.maxHp = 100;
        playerDataS.hp = 100;
        playerDataS.isDie = true;
        this.playerDataSMap.set(player.playerId, playerDataS);
    }

    private updatePlayerData(sendPlayer: mw.Player, targetPlayer: mw.Player, damage: number, hitPoint: mw.Vector): void {
        let playerId = targetPlayer.playerId;
        if (!this.playerDataSMap.has(playerId)) return;

        let targetPlayerData = this.playerDataSMap.get(playerId);
        if (targetPlayerData.isDie) return;

        let curHp = targetPlayerData.hp;
        curHp -= damage;
        if (curHp <= 0) {
            targetPlayerData.hp = 0;
            targetPlayerData.isDie = true;
            if (sendPlayer) this.playerKillEnemy(sendPlayer, 1, true);
            targetPlayer.character.ragdollEnabled = true;
            this.playerDie(targetPlayer);
            if (sendPlayer && targetPlayer) {
                let userId1 = sendPlayer.userId;
                let userId2 = targetPlayer.userId;
                let names = this.getWorldRankModuleS.getNamesByUserId(userId1, userId2);
                if (names) this.getAllClient().net_killTip(userId1, names[0], userId2, names[1]);
            }
            TimeUtil.delaySecond(3).then(() => {
                targetPlayer.character.ragdollEnabled = false;
                targetPlayerData.hp = targetPlayerData.maxHp;
                this.playerBirth(targetPlayer, targetPlayerData.maxHp);
            });
        }
        else {
            targetPlayerData.hp = curHp;
        }
        this.getClient(targetPlayer).net_updateHp(curHp);
        if (sendPlayer) this.getClient(sendPlayer).net_flyText(damage, hitPoint);
    }

    public playerKillEnemy(sendPlayer: mw.Player, killCount: number, isPlayer: boolean): void {
        let playerData = DataCenterS.getData(sendPlayer, PlayerData);
        playerData.setKillCount(killCount);
        let coin = 50;
        if (killCount > 1) coin = 300;
        playerData.setCoin(coin);
        this.getClient(sendPlayer).net_updateKillCountUI(playerData.killCount, playerData.coin);
        this.getWorldRankModuleS.refreshKill_S(sendPlayer.userId, playerData.killCount);
        this.getTaskModuleS.killPlayer(sendPlayer, killCount > 1);
        if (!isPlayer) this.getAllClient().net_killTip(sendPlayer.userId, this.getWorldRankModuleS.getNameByUserId(sendPlayer.userId), "-1", (killCount > 1) ? "感染者" : Utils.getRoleName());
        try {
            if (this.playerDataSMap.get(sendPlayer.playerId).isDie == true) this.playerDataSMap.get(sendPlayer.playerId).isDie = false;
        } catch (error) {

        }
    }

    public playerAtkEnemyFlyText(sendPlayer: mw.Player, hitPoint: mw.Vector, damage: number): void {
        if (sendPlayer) this.getClient(sendPlayer).net_flyText(damage, hitPoint);
    }

    private playerDie(player: mw.Player): void {
        EffectService.playAtPosition(
            "222147",
            player.character.worldTransform.position,
            {
                loopCount: 1
            }
        );
    }

    private playerBirth(player: mw.Player, maxHp: number): void {
        this.getClient(player).net_updateHp(maxHp);
        // let playerId = player.character.gameObjectId;
        // let index = Helper.teamMap.has(playerId) ? Helper.teamMap.get(playerId) - 1 : 0;
        // Console.error("index = " + index);
        let birthLoc = Utils.getWorldLocation();
        player.character.worldTransform.position = birthLoc;
        let loc = new mw.Vector(birthLoc.x, birthLoc.y, birthLoc.z - player.character.collisionExtent.z / 2);
        EffectService.playAtPosition(
            "142750",
            loc,
            {
                loopCount: 1
            }
        );
    }

    private async bindPortalTrigger(): Promise<void> {
        let trigger = await mw.GameObject.asyncFindGameObjectById("08F825C5") as mw.Trigger;
        trigger.onEnter.add((char: mw.Character) => {
            if (Helper.playerMap.has(char.gameObjectId)) this.portal(Helper.playerMap.get(char.gameObjectId));
        });
    }

    private portal(player: mw.Player): void {
        TimeUtil.delaySecond(2).then(() => {
            if (this.playerDataSMap.has(player.playerId)) this.playerDataSMap.get(player.playerId).isDie = false;
        });
        let playerId = player.character.gameObjectId;
        let index = Helper.teamMap.has(playerId) ? Helper.teamMap.get(playerId) - 1 : 0;
        Console.error("index = " + index);
        let birthLoc = Utils.locs[index];
        player.character.worldTransform.position = birthLoc;
        let loc = new mw.Vector(birthLoc.x, birthLoc.y, birthLoc.z - player.character.collisionExtent.z / 2);
        EffectService.playAtPosition(
            "142750",
            loc,
            {
                loopCount: 1
            }
        );
        this.getClient(player).net_showInvincibleTimeUI();
    }

    @Decorator.noReply()
    public net_setCoin(value: number): void {
        this.currentData.setCoin(value);
    }

    @Decorator.noReply()
    public net_setDiamond(value: number): void {
        this.currentData.setDiamond(value);
    }
}

export class PlayerDataS {
    public isDie: boolean = true;
    public maxHp: number = 0;
    public hp: number = 0;
}