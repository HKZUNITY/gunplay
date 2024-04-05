export class PlayerData_CSR {
    public userId: string = "";
    public playerName: string = "";
    public playerKill: number = 0;

    public constructor(id: string, name: string, kill: number) {
        this.userId = id;
        this.playerName = name;
        this.playerKill = kill;
    }
}

export class PlayerData_CSW {
    public userId: string = "";
    public playerName: string = "";
    public playerKill: number = 0;

    public constructor(id: string, name: string, kill: number) {
        this.userId = id;
        this.playerName = name;
        this.playerKill = kill;
    }
}