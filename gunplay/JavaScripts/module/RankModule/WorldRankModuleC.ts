import { Notice } from "../../common/notice/Notice";
import Globaldata from "../../const/Globaldata";
import Helper from "../../const/Helper";
import { HUDModuleC } from "../HUDModule/HUDModuleC";
import { PlayerData } from "../PlayerModule/PlayerData";
import { PlayerData_CSR, PlayerData_CSW } from "./PlayerPropData";
import { WorldRankModuleS } from "./WorldRankModuleS";
import { WorldRankPanel } from "./ui/WorldRankPanel";

export class WorldRankModuleC extends ModuleC<WorldRankModuleS, null> {
    private hudModuleC: HUDModuleC = null;
    private playerData: PlayerData = null;
    private worldRankPanel: WorldRankPanel = null;

    private userId: string = null;
    private get currentUserId(): string {
        if (this.userId == "" || this.userId == null) {
            this.userId = this.localPlayer.userId;
        }
        return this.userId;
    }


    protected onStart(): void {
        this.initData();
        this.bindAction();
    }

    private initData(): void {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        this.playerData = DataCenterC.getData(PlayerData);
    }

    private bindAction(): void {
        this.hudModuleC.onOpenRankAction.add(() => {
            this.worldRankPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        });
    }

    /**
     * 进入场景
     * @param sceneType 
     */
    protected onEnterScene(sceneType: number): void {
        if (this.playerData == null) this.playerData = DataCenterC.getData(PlayerData);
        let playerKill = this.playerData.killCount;
        let nickName = mw.AccountService.getNickName();
        nickName = nickName ? nickName : "UserId:" + this.localPlayer.userId;
        this.server.net_onEnterScene(nickName, playerKill);

        this.initRankNpcData();
    }

    private rankPlayerDatas_CR: PlayerData_CSR[] = [];
    private rankWorldDatas_CW: PlayerData_CSW[] = [];
    /**
     * 同步排行榜数据（服务端同步）
     * @param playerNames 
     * @param playerLvs 
     * @param worldNames 
     * @param worldLvs 
     */
    public net_syncRankData_C(playerUserIds: string[], playerNames: string[], playerKills: number[],
        isRefreshWorldRank: boolean, worldUserIds: string[], worldNames: string[], worldLvs: number[]): void {
        let curPlayerIndex: number = -1;
        let curPlayerWorldIndex: number = -1;
        this.rankPlayerDatas_CR.length = 0;
        for (let i = 0; i < playerNames.length; ++i) {
            this.rankPlayerDatas_CR.push(new PlayerData_CSR(playerUserIds[i], playerNames[i], playerKills[i]));
        }
        this.sortRankData_C();
        for (let i = 0; i < this.rankPlayerDatas_CR.length; ++i) {
            if (this.rankPlayerDatas_CR[i].userId == this.currentUserId) {
                curPlayerIndex = i;
                if (i == 0) this.server.net_setFirst();
            }
        }
        if (isRefreshWorldRank) {
            this.rankWorldDatas_CW.length = 0;
            for (let i = 0; i < worldNames.length; ++i) {
                this.rankWorldDatas_CW.push(new PlayerData_CSW(worldUserIds[i], worldNames[i], worldLvs[i]));
                if (worldUserIds[i] == this.currentUserId) {
                    curPlayerWorldIndex = i;
                }
            }
        }
        if (!this.worldRankPanel) {
            this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        }
        this.worldRankPanel.refreshRankPanel(this.rankPlayerDatas_CR, curPlayerIndex, isRefreshWorldRank, this.rankWorldDatas_CW, curPlayerWorldIndex);
        this.updateRankNpc();
    }

    /**
     * 排序排行榜数据
     */
    private sortRankData_C(): void {
        this.rankPlayerDatas_CR.sort((a: PlayerData_CSR, b: PlayerData_CSR) => {
            return b.playerKill - a.playerKill;
        });
    }

    //#region 排行榜NPC

    private async initRankNpcData(): Promise<void> {
        await this.initRankNpc();
        this.initRankNpcAnim();
    }

    private rankNpcs: mw.Character[] = [];
    private async initRankNpc(): Promise<void> {
        let rankNpcParent = await mw.GameObject.asyncFindGameObjectById("1E1981DB");
        let rankNpcAnchors = rankNpcParent.getChildren();
        for (let i = 0; i < rankNpcAnchors.length; ++i) {
            let rankNpc = await mw.GameObject.asyncSpawn("Character") as mw.Character;
            rankNpc.complexMovementEnabled = false;
            await rankNpc.asyncReady();
            rankNpc.displayName = "";
            this.setCharVisibility(rankNpc, false);
            let rankNpcAnchorLoc = rankNpcAnchors[i].worldTransform.position;
            let rankNpcLocZ = rankNpc.collisionExtent.z / 2;
            rankNpc.worldTransform.position = new mw.Vector(rankNpcAnchorLoc.x, rankNpcAnchorLoc.y, rankNpcAnchorLoc.z + rankNpcLocZ);
            rankNpc.worldTransform.rotation = new mw.Rotation(0, 0, 180);
            this.rankNpcs.push(rankNpc);
        }
        mw.SoundService.play3DSound("119832", rankNpcParent, 0, 1, { radius: 400 });
    }

    private initRankNpcAnim(): void {
        TimeUtil.setInterval(async () => {
            if (this.curCanPlayAnimCount <= 0) return;
            let randomIndex = Math.floor(Math.random() * Globaldata.rankNpcAnimations.length);
            let randomAnim = Globaldata.rankNpcAnimations[randomIndex];
            let randomNpcIndex = Math.floor(Math.random() * this.curCanPlayAnimCount);
            let randomNpc = this.rankNpcs[randomNpcIndex];
            if (randomNpc?.currentAnimation?.isPlaying) randomNpc.currentAnimation?.stop();
            if (!mw.AssetUtil.assetLoaded(randomAnim)) await mw.AssetUtil.asyncDownloadAsset(randomAnim);
            let npcAnim = randomNpc.loadAnimation(randomAnim);
            npcAnim.loop = Math.round(10 / npcAnim.length);
            npcAnim.play();
        }, 5);
    }

    private curCanPlayAnimCount: number = 0;
    private async updateRankNpc(): Promise<void> {
        let userIds: string[] = [];
        let playerNames: string[] = [];
        if (this.rankPlayerDatas_CR.length >= 3) {
            for (let i = 0; i < 3; ++i) {
                userIds.push(this.rankPlayerDatas_CR[i].userId);
                playerNames.push(this.rankPlayerDatas_CR[i].playerName);
            }
        } else {
            for (let i = 0; i < this.rankPlayerDatas_CR.length; ++i) {
                userIds.push(this.rankPlayerDatas_CR[i].userId);
                playerNames.push(this.rankPlayerDatas_CR[i].playerName);
            }
        }
        for (let i = 0; i < userIds.length; ++i) {
            let tmpChar = Player.getPlayer(userIds[i]);
            await tmpChar.character.asyncReady();
            if (!this.rankNpcs[i] || !tmpChar.character) continue;
            this.rankNpcs[i].setDescription(tmpChar.character.getDescription());
            await this.rankNpcs[i].asyncReady();
            this.rankNpcs[i].displayName = playerNames[i];
            this.setCharVisibility(this.rankNpcs[i], true);
        }
        this.curCanPlayAnimCount = userIds.length;
        for (let i = userIds.length; i < this.rankNpcs.length; ++i) {
            this.setCharVisibility(this.rankNpcs[i], false);
        }
    }

    private setCharVisibility(char: mw.Character, visibility: boolean): void {
        if (char.getVisibility() != visibility) char.setVisibility(visibility, true);
    }
    //#endregion
}

/**排行类型 */
export enum RankType {
    Kill = 3,
}