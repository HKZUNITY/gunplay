import { FlyText } from "../../common/FlyText";
import { Notice } from "../../common/notice/Notice";
import Helper from "../../const/Helper";
import { Utils } from "../../tools/utils";
import { HUDModuleC } from "../HUDModule/HUDModuleC";
import { PlayerData } from "./PlayerData";
import { PlayerModuleS, TeamData } from "./PlayerModuleS";
import { TeamPanel } from "./ui/TeamPanel";

export class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerData> {
    private hudModuleC: HUDModuleC = null;
    private teamPanel: TeamPanel = null;
    private selfTeamId: number = 1;

    protected onStart(): void {
        this.initDatas();
        this.bindActions();
    }

    private initDatas(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.teamPanel = UIService.getUI(TeamPanel);
    }

    private bindActions(): void {
        let i = false;
        InputUtil.onKeyDown(mw.Keys.F1, () => {
            i = !i;
            i ? this.teamPanel.show() : this.teamPanel.hide();
        });

        this.hudModuleC.onOpenTeamAction.add(() => {
            this.teamPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.initSaveData();
        let nickName = mw.AccountService.getNickName();
        nickName = nickName ? nickName : "UserId:" + this.localPlayer.userId;
        this.server.net_onEnterScene(nickName);
    }

    private nameMap: Map<number, TeamData[]> = new Map<number, TeamData[]>();
    public net_syncTeamData(playerIds: string[], playerNames: string[], teamIds: number[]): void {
        this.nameMap.clear();
        for (let i = 0; i < playerIds.length; ++i) {
            Helper.teamMap.set(playerIds[i], teamIds[i]);

            let teamDatas: TeamData[] = [];
            if (this.nameMap.has(teamIds[i])) {
                teamDatas = this.nameMap.get(teamIds[i]);
            }
            let teamData = new TeamData();
            teamData.playerId = playerIds[i];
            teamData.playerName = playerNames[i];
            teamDatas.push(teamData);
            this.nameMap.set(teamIds[i], teamDatas);

            if (this.localPlayer.character.gameObjectId == playerIds[i]) {
                this.selfTeamId = teamIds[i];
                this.teamPanel.selectTeam(this.selfTeamId);
            }
        }
        this.teamPanel.setAllData(this.nameMap);
    }

    public net_syncOneTeamData(teamId: number, playerId: string, playerName: string): void {
        if (this.localPlayer.character.gameObjectId == playerId) return;
        Helper.teamMap.set(playerId, teamId);

        let teamDatas: TeamData[] = [];
        if (this.nameMap.has(teamId)) {
            teamDatas = this.nameMap.get(teamId);
        }
        let teamData = new TeamData();
        teamData.playerId = playerId;
        teamData.playerName = playerName;
        if (!teamDatas) teamDatas = [];
        teamDatas.push(teamData);
        this.nameMap.set(teamId, teamDatas);

        this.teamPanel.setOneData(teamId, teamDatas);
    }

    public net_deleteTeamIdMapData(teamId: number, playerId: string): void {
        if (!Helper.teamMap.has(playerId)) return;
        Helper.teamMap.delete(playerId);
        let teamDatas: TeamData[] = [];
        if (this.nameMap.has(teamId)) {
            teamDatas = this.nameMap.get(teamId);
        }
        if (teamDatas) {
            for (let i = 0; i < teamDatas.length; ++i) {
                if (teamDatas[i].playerId == playerId) {
                    teamDatas.splice(i, 1);
                }
            }
        }
        if (teamDatas.length == 0) teamDatas = null;
        this.nameMap.set(teamId, teamDatas);
        this.teamPanel.setOneData(teamId, teamDatas);
    }

    public async isCanChangeTeam(toTeam: number): Promise<boolean> {
        if (this.selfTeamId == toTeam) return false;
        let isCan = await this.server.net_isCanChangeTeam(this.selfTeamId, toTeam);
        if (isCan) {
            this.teamPanel.unSelectTeam(this.selfTeamId);
            this.selfTeamId = toTeam;
            this.teamPanel.selectTeam(this.selfTeamId);
        }
        return isCan;
    }

    public net_changeTeam(playerId: string, curTeam: number, toTeam: number): void {
        let teamData: TeamData = null;
        let curTeamDatas = this.nameMap.get(curTeam);
        if (curTeamDatas) {
            for (let i = 0; i < curTeamDatas.length; ++i) {
                if (curTeamDatas[i].playerId == playerId) {
                    teamData = curTeamDatas[i];
                    curTeamDatas.splice(i, 1);
                    break;
                }
            }
        }
        if (!curTeamDatas || curTeamDatas.length == 0) curTeamDatas = null;
        this.nameMap.set(curTeam, curTeamDatas);
        let toTeamDatas = this.nameMap.get(toTeam);
        if (!toTeamDatas) toTeamDatas = [];
        toTeamDatas.push(teamData);
        this.nameMap.set(toTeam, toTeamDatas);
        Helper.teamMap.set(playerId, toTeam);
        this.teamPanel.setChangeData(curTeam, curTeamDatas, toTeam, toTeamDatas);
    }

    public getSlefTeamId(): number {
        return this.selfTeamId;
    }

    private coin: number = 0;
    private diamond: number = 0;
    private killCount: number = 0;

    private initSaveData(): void {
        this.coin = this.data.coin;
        this.diamond = this.data.diamond;
        this.killCount = this.data.killCount;
        this.updateUI();
    }

    public updateUI(): void {
        this.hudModuleC.updateUI(this.coin, this.diamond, this.killCount);
    }

    public getCoin(): number {
        return this.coin;
    }

    public setCoin(value: number): void {
        this.coin += value;
        this.server.net_setCoin(value);
        this.updateCoinUI();
    }

    private updateCoinUI(): void {
        this.hudModuleC.updateCoinUI(this.coin);
    }

    public getDiamond(): number {
        return this.diamond;
    }

    public setDiamond(value: number): void {
        this.diamond += value;
        this.server.net_setDiamond(value);
        this.updateDiamondUI();
    }

    public net_updateKillCountUI(value: number, coin: number): void {
        this.hudModuleC.updateKillCountUI(value, coin);
    }

    private updateDiamondUI(): void {
        this.hudModuleC.updateDiamondUI(this.diamond);
    }

    public net_updateHp(curHp: number): void {
        this.hudModuleC.updateHpUI(curHp);
    }

    public net_flyText(damage: number, hitPoint: mw.Vector): void {
        let fontColor: mw.LinearColor[] = Utils.randomColor();
        FlyText.instance.showFlyText("-" + damage, hitPoint, fontColor[0], fontColor[1]);
    }

    public net_hitTeammate(): void {
        Notice.showDownNotice("不要攻击队友");
    }

    public net_killTip(killerUserId: string, killerName: string, killedUserId: string, killedName: string): void {
        this.hudModuleC.killTip(killerUserId, killerName, killedUserId, killedName);
    }

    public net_showInvincibleTimeUI(): void {
        this.hudModuleC.showInvincibleTimeUI();
    }
}