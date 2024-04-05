export class PlayerData extends Subdata {
    @Decorator.persistence()
    public coin: number = 0;
    @Decorator.persistence()
    public diamond: number = 0;
    @Decorator.persistence()
    public killCount: number = 0;

    protected initDefaultData(): void {
        this.coin = 20000;
        this.diamond = 0;
        this.killCount = 0;
    }

    public setCoin(value: number): void {
        this.coin += value;
        this.save(true);
    }

    public setDiamond(value: number): void {
        this.diamond += value;
        this.save(true);
    }

    public setKillCount(value: number): void {
        this.killCount += value;
        this.save(true);
    }
}