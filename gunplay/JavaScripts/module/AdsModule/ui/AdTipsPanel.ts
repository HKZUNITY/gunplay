import { Notice } from "../../../common/notice/Notice";
import Console from "../../../tools/Console";
import { Utils } from "../../../tools/utils";
import AdsTipsPanel_Generate from "../../../ui-generate/Ads/AdsTipsPanel_generate";
import { AdType } from "../AdsModuleC";

export default class AdTipsPanel extends AdsTipsPanel_Generate {
	/**点击看广告事件 */
	public onWatchAdsAction: Action2<number, number> = new Action2<number, number>();

	/**配置表的ID */
	private id: number = -1;
	private adType: number = -1;

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerDialog;

		this.bindButtons();
	}

	/**按钮绑定 */
	private bindButtons(): void {
		this.mYesBtn.onClose.add(this.onClickYesBtn.bind(this));

		this.mNoBtn.onClicked.add(() => {
			if (!this.visible) return;
			Utils.closeUITween(
				this.rootCanvas,
				null,
				() => {
					this.hide();
				});
		});
	}

	private onClickYesBtn(isSuccess: boolean): void {
		if (!isSuccess) {
			Notice.showDownNotice(`领取失败，请重试`);
			return;
		}
		this.hideAdTips();
		this.onWatchAdsAction.call(this.id, this.adType);
	}

	/**显示此界面 */
	public showAdTips(id: number, adType: number): void {
		if (this.visible) return;
		this.id = id;
		this.adType = adType;
		this.show();
	}

	/**隐藏此界面 */
	public hideAdTips(): void {
		if (!this.visible) return;
		Utils.closeUITween(
			this.rootCanvas,
			null,
			() => {
				this.hide();
			});
	}

	protected onShow(...params: any[]): void {
		switch (this.adType) {
			case AdType.AddCoin:
				this.mContentTxt.text = "免费获得 " + this.id + " 金币";
				break;
			case AdType.AddDiamond:
				this.mContentTxt.text = "免费获得 " + this.id + " 钻石";
				break;
			default:
				break;
		}
		Console.error("[AdTips-onShow]");
		Utils.openUITween(
			this.rootCanvas,
			null,
			null
		);
	}
}
