/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/BuyRole/RolePanel.ui
 * TIME: 2025.03.05-22.33.23
 */
 
@UIBind('UI/BuyRole/RolePanel.ui')
export default class RolePanel_Generate extends UIScript {
		private mLeftButton_Internal: mw.Button
	public get mLeftButton(): mw.Button {
		if(!this.mLeftButton_Internal&&this.uiWidgetBase) {
			this.mLeftButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mLeftButton') as mw.Button
		}
		return this.mLeftButton_Internal
	}
	private mRightButton_Internal: mw.Button
	public get mRightButton(): mw.Button {
		if(!this.mRightButton_Internal&&this.uiWidgetBase) {
			this.mRightButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mRightButton') as mw.Button
		}
		return this.mRightButton_Internal
	}
	private mUseButton_Internal: mw.Button
	public get mUseButton(): mw.Button {
		if(!this.mUseButton_Internal&&this.uiWidgetBase) {
			this.mUseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mUseButton') as mw.Button
		}
		return this.mUseButton_Internal
	}
	private mUseTextBlock_Internal: mw.TextBlock
	public get mUseTextBlock(): mw.TextBlock {
		if(!this.mUseTextBlock_Internal&&this.uiWidgetBase) {
			this.mUseTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mUseButton/mUseTextBlock') as mw.TextBlock
		}
		return this.mUseTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
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
		
		this.mLeftButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mLeftButton");
		});
		this.mLeftButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRightButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRightButton");
		});
		this.mRightButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mUseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mUseButton");
		});
		this.mUseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mUseTextBlock)
		
	
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
 