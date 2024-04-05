export class HUDData extends Subdata {

    @Decorator.persistence()
    public fireScale: number = 0.05;
    @Decorator.persistence()
    public controlScale: number = 0.3;
    @Decorator.persistence()
    public bgmVolume: number = 1;

    protected initDefaultData(): void {
        this.fireScale = 0.05;
        this.controlScale = 0.3;
        this.bgmVolume = 1;
    }
}