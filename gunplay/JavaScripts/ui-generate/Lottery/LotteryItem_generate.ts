/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Lottery/LotteryItem.ui
 * TIME: 2024.01.21-23.17.52
 */
 
@UIBind('UI/Lottery/LotteryItem.ui')
export default class LotteryItem_Generate extends UIScript {
		private mIconImage_Internal: mw.Image
	public get mIconImage(): mw.Image {
		if(!this.mIconImage_Internal&&this.uiWidgetBase) {
			this.mIconImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mIconImage') as mw.Image
		}
		return this.mIconImage_Internal
	}
	private mSeletImage_Internal: mw.Image
	public get mSeletImage(): mw.Image {
		if(!this.mSeletImage_Internal&&this.uiWidgetBase) {
			this.mSeletImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mSeletImage') as mw.Image
		}
		return this.mSeletImage_Internal
	}
	private mMaskImage_Internal: mw.Image
	public get mMaskImage(): mw.Image {
		if(!this.mMaskImage_Internal&&this.uiWidgetBase) {
			this.mMaskImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mMaskImage') as mw.Image
		}
		return this.mMaskImage_Internal
	}
	private mOwnTextBlock_Internal: mw.TextBlock
	public get mOwnTextBlock(): mw.TextBlock {
		if(!this.mOwnTextBlock_Internal&&this.uiWidgetBase) {
			this.mOwnTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mOwnTextBlock') as mw.TextBlock
		}
		return this.mOwnTextBlock_Internal
	}
	private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mGunTypeTextBlock_Internal: mw.TextBlock
	public get mGunTypeTextBlock(): mw.TextBlock {
		if(!this.mGunTypeTextBlock_Internal&&this.uiWidgetBase) {
			this.mGunTypeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mGunTypeTextBlock') as mw.TextBlock
		}
		return this.mGunTypeTextBlock_Internal
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
		
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mOwnTextBlock)
		
	
		this.initLanguage(this.mNameTextBlock)
		
	
		this.initLanguage(this.mGunTypeTextBlock)
		
	
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
 