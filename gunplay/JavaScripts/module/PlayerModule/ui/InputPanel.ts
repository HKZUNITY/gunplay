
import InputPanel_Generate from "../../../ui-generate/Player/InputPanel_generate";

export default class InputPanel extends InputPanel_Generate {
	public onSureAction: Action1<string> = new Action1<string>();
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;

		this.mButton.onClicked.add(() => {
			this.onSureAction.call(this.mInputBox.text);
			this.hide();
		});
		this.mCloseButton.onClicked.add(() => {
			this.hide();
		});
	}

	public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	public hide(): void {
		mw.UIService.hideUI(this);
	}
}
