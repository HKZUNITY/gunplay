import Guide from "../../common/Guide";

export class GuideData extends Subdata {
    @Decorator.persistence()
    public isFirst: boolean = true;

    protected initDefaultData(): void {
        this.isFirst = true;
    }

    public setFirst(): void {
        this.isFirst = false;
        this.save(true);
    }
}

export class GuideModuleC extends ModuleC<GuideModuleS, GuideData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    protected onEnterScene(sceneType: number): void {
        if (!this.data.isFirst) {
            Guide.startGuide(new mw.Vector(4098.63, 4468.69, 50), null);
            return;
        }
        Guide.startGuide(new mw.Vector(4600, 5300, 0), () => {
            Guide.startGuide(new mw.Vector(5400, 4000, 150), () => {
                Guide.startGuide(new mw.Vector(4098.63, 4468.69, 50), () => {
                    this.server.net_setFirst();
                });
            });
        });
    }
}


export class GuideModuleS extends ModuleS<GuideModuleC, GuideData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    @Decorator.noReply()
    public net_setFirst(): void {
        this.currentData.setFirst();
    }
}