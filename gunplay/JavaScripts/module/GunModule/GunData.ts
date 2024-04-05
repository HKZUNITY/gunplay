export class GunData extends Subdata {
    @Decorator.persistence()
    public gunIds: number[] = [];
    @Decorator.persistence()
    public currentGunId: number = 0;

    protected initDefaultData(): void {
        this.gunIds = [1];
        this.currentGunId = 1;
    }

    public buyGun(gunId: number): void {
        if (this.gunIds.includes(gunId)) return;
        this.gunIds.push(gunId);
        this.save(true);
    }

    public setCurrentGunId(gunId: number): void {
        this.currentGunId = gunId;
        this.save(true);
    }
}