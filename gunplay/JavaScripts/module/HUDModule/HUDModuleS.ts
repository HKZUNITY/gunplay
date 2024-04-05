import { HUDData } from "./HUDData";
import { HUDModuleC } from "./HUDModuleC";

export class HUDModuleS extends ModuleS<HUDModuleC, HUDData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_saveSetData(fireScale: number, controlScale: number, bgmVolume: number): void {
        this.currentData.fireScale = fireScale;
        this.currentData.controlScale = controlScale;
        this.currentData.bgmVolume = bgmVolume;
        this.currentData.save(true);
    }
}