import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { PlayerData_CSR, PlayerData_CSW } from "./PlayerPropData";
import { WorldRankModuleC } from "./WorldRankModuleC";

export class WorldRankModuleS extends ModuleS<WorldRankModuleC, null> {

    private worldDatas: PlayerData_CSW[] = [];
    protected onStart(): void {
        this.initData();
    }

    private async initData(): Promise<void> {
        this.worldDatas = (await this.getCustomdata("WorldData")) as PlayerData_CSW[];
    }

    protected onPlayerEnterGame(player: mw.Player): void {

    }

    protected onPlayerLeft(player: mw.Player): void {
        let userId = player.userId;
        if (!this.playerDataMap_SR.has(userId)) return;
        this.playerDataMap_SR.delete(userId);
        this.syncRankData_S(false);
    }

    /**房间内排行榜数据 */
    private playerDataMap_SR: Map<string, PlayerData_CSR> = new Map<string, PlayerData_CSR>();
    public getNamesByUserId(userId1: string, userId2: string): string[] {
        if (this.playerDataMap_SR.has(userId1) && this.playerDataMap_SR.has(userId2)) {
            return [this.playerDataMap_SR.get(userId1).playerName, this.playerDataMap_SR.get(userId2).playerName];
        }
        return null;
    }
    public getNameByUserId(userId: string): string {
        if (this.playerDataMap_SR.has(userId)) {
            return this.playerDataMap_SR.get(userId).playerName;
        }
        return null;
    }

    /**
     * 进入场景（客户端发起）
     * @param playerName 
     * @param playerLv 
     */
    @Decorator.noReply()
    public net_onEnterScene(playerName: string, playerKill: number): void {
        this.onEnterScene(playerName, playerKill);
    }

    /**
     * 进入场景校对数据
     * @param playerName 
     * @param playerLv 
     */
    private async onEnterScene(playerName: string, playerKill: number): Promise<void> {
        let userId = this.currentPlayer.userId;
        let playerData_S = new PlayerData_CSR(userId, playerName, playerKill);
        this.playerDataMap_SR.set(userId, playerData_S);
        this.worldDatas = (await this.getCustomdata("WorldData")) as PlayerData_CSW[];
        this.syncRankData_S(true);
    }

    /**
     * 刷新击杀数（服务端发起）
     * @param userId 
     * @param kill 
     */
    public refreshKill_S(userId: string, kill: number): void {
        this.refreshKill(userId, kill);
    }

    /**
     * 刷新击杀数
     * @param userId 
     * @param kill 
     * @returns 
     */
    private refreshKill(userId: string, kill: number): void {
        if (!this.playerDataMap_SR.has(userId)) return;
        let playerData_S = this.playerDataMap_SR.get(userId);
        playerData_S.playerKill = kill;
        this.playerDataMap_SR.set(userId, playerData_S);
        this.syncRankData_S(this.isRefreshWorldData_S(
            new PlayerData_CSW(userId, playerData_S.playerName, playerData_S.playerKill)
        ));
    }

    /**
     * 判断是否需要刷新世界排行榜（需要自动存）
     * @param playerData_SW 数据
     * @returns 
     */
    private isRefreshWorldData_S(playerData_SW: PlayerData_CSW): boolean {
        let isPush = false;
        let ishasDelete = false;
        let ishasData = false;
        if (this.worldDatas == null) {
            this.worldDatas = [];
        }
        if (this.worldDatas.length < 100) {
            if (this.worldDatas.length == 0) {
                this.worldDatas.push(playerData_SW);
                isPush = true;
            } else {
                for (let i = 0; i < this.worldDatas.length; ++i) {
                    if (this.worldDatas[i].userId != playerData_SW.userId) continue;
                    if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                        this.worldDatas.splice(i, 1);
                        break;
                    } else {
                        ishasData = true;
                        break;
                    }
                }

                if (ishasData) return isPush;

                for (let i = 0; i < this.worldDatas.length; i++) {
                    if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                        this.worldDatas.splice(i, 0, playerData_SW);
                        isPush = true;
                        break;
                    }
                }

                if (!isPush) {
                    this.worldDatas.push(playerData_SW);
                    isPush = true;
                }
            }
        } else {
            for (let i = 0; i < this.worldDatas.length; ++i) {
                if (this.worldDatas[i].userId != playerData_SW.userId) continue;
                if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                    this.worldDatas.splice(i, 1);
                    ishasDelete = true;
                    break;
                } else {
                    ishasData = true;
                    break;
                }
            }

            if (ishasData) return isPush;

            for (let i = 0; i < this.worldDatas.length; i++) {
                if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                    this.worldDatas.splice(i, 0, playerData_SW);
                    if (!ishasDelete) {
                        this.worldDatas.pop();
                    }
                    isPush = true;
                    break;
                }
            }
        }
        if (isPush) {
            this.setCustomData("WorldData", this.worldDatas);
        }
        return isPush;
    }

    /**
     * 同步排行榜数据
     * @param isRefreshWorldData 
     * @returns 
     */
    private syncRankData_S(isRefreshWorldData: boolean): void {
        if (this.playerDataMap_SR.size == 0) return;
        let playerUserIds: string[] = [];
        let playerNames: string[] = [];
        let playerKills: number[] = [];
        this.playerDataMap_SR.forEach((value: PlayerData_CSR, key: string) => {
            playerUserIds.push(value.userId);
            playerNames.push(value.playerName);
            playerKills.push(value.playerKill);
        });
        let worldUserIds: string[] = [];
        let worldNames: string[] = [];
        let worldKills: number[] = [];
        if (isRefreshWorldData && this.worldDatas != null) {
            for (let i = 0; i < this.worldDatas.length; i++) {
                worldUserIds.push(this.worldDatas[i].userId);
                worldNames.push(this.worldDatas[i].playerName);
                worldKills.push(this.worldDatas[i].playerKill);
            }
        }
        this.getAllClient().net_syncRankData_C(playerUserIds, playerNames, playerKills, isRefreshWorldData, worldUserIds, worldNames, worldKills);
    }

    /**
     * 获取自定义数据
     * @param key 
     * @returns 
     */
    public async getCustomdata(key: string): Promise<any> {
        let data = null;
        data = await GeneralManager.asyncRpcGetData(key);
        return data;
    }

    /**
     * 设置自定义数据
     * @param saveKey 
     * @param dataInfo 
     * @returns 
     */
    public async setCustomData(saveKey: string, dataInfo: any): Promise<boolean> {
        let code: mw.DataStorageResultCode = null;
        code = await DataStorage.asyncSetData(saveKey, dataInfo);
        return code == mw.DataStorageResultCode.Success;
    }

    private firstEffect: number = null;
    /**
     * 设置玩家头顶的第一名特效
     */
    @Decorator.noReply()
    public net_setFirst(): void {
        if (this.firstEffect) {
            EffectService.stop(this.firstEffect);
        }
        this.firstEffect = EffectService.playOnGameObject(
            "31266",
            this.currentPlayer.character,
            {
                slotType: mw.HumanoidSlotType.Head,
                loopCount: 0,
                position: new mw.Vector(0, 0, 20),
                scale: mw.Vector.one.multiply(2)
            }
        );
    }
}