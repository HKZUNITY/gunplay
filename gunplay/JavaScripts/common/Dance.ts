import { Utils } from "../tools/utils";

@Component
export default class Dance extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        if (mw.SystemUtil.isServer()) return;
        await Utils.asyncDownloadAsset("232755");
        let trigger = (this.gameObject as mw.Trigger);
        trigger.onEnter.add((character: mw.Character) => {
            character.loadAnimation("232755").play();
        });
        trigger.onLeave.add((character: mw.Character) => {
            if (character.currentAnimation?.assetId == "232755") character.currentAnimation.stop();
        });
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}