/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Gun/GunItem.ui
 * TIME: 2024.01.21-23.17.52
 */
 
@UIBind('UI/Gun/GunItem.ui')
export default class GunItem_Generate extends UIScript {
		private mSelectImage_Internal: mw.Image
	public get mSelectImage(): mw.Image {
		if(!this.mSelectImage_Internal&&this.uiWidgetBase) {
			this.mSelectImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mSelectImage') as mw.Image
		}
		return this.mSelectImage_Internal
	}
	private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mLockTextBlock_Internal: mw.TextBlock
	public get mLockTextBlock(): mw.TextBlock {
		if(!this.mLockTextBlock_Internal&&this.uiWidgetBase) {
			this.mLockTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mLockTextBlock') as mw.TextBlock
		}
		return this.mLockTextBlock_Internal
	}
	private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mTypeTextBlock_Internal: mw.TextBlock
	public get mTypeTextBlock(): mw.TextBlock {
		if(!this.mTypeTextBlock_Internal&&this.uiWidgetBase) {
			this.mTypeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mTypeTextBlock') as mw.TextBlock
		}
		return this.mTypeTextBlock_Internal
	}
	private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}


	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		});
		this.mButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mLockTextBlock)
		
	
		this.initLanguage(this.mNameTextBlock)
		
	
		this.initLanguage(this.mTypeTextBlock)
		
	
		//文本多语言
		
	}
	
	/*初始化多语言*/
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

	/*显示panel*/
    public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	/*隐藏panel*/
    public hide(): void {
		mw.UIService.hideUI(this);
	}
 }
 