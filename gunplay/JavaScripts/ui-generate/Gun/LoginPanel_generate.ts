/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Gun/LoginPanel.ui
 * TIME: 2024.05.20-22.03.02
 */
 
@UIBind('UI/Gun/LoginPanel.ui')
export default class LoginPanel_Generate extends UIScript {
		private mExplainTextBlock_Internal: mw.TextBlock
	public get mExplainTextBlock(): mw.TextBlock {
		if(!this.mExplainTextBlock_Internal&&this.uiWidgetBase) {
			this.mExplainTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mExplainTextBlock') as mw.TextBlock
		}
		return this.mExplainTextBlock_Internal
	}
	private mConditionTextBlock1_Internal: mw.TextBlock
	public get mConditionTextBlock1(): mw.TextBlock {
		if(!this.mConditionTextBlock1_Internal&&this.uiWidgetBase) {
			this.mConditionTextBlock1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mConditionTextBlock1') as mw.TextBlock
		}
		return this.mConditionTextBlock1_Internal
	}
	private mConditionImage1_Internal: mw.TextBlock
	public get mConditionImage1(): mw.TextBlock {
		if(!this.mConditionImage1_Internal&&this.uiWidgetBase) {
			this.mConditionImage1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mConditionImage1') as mw.TextBlock
		}
		return this.mConditionImage1_Internal
	}
	private mConditionTextBlock2_Internal: mw.TextBlock
	public get mConditionTextBlock2(): mw.TextBlock {
		if(!this.mConditionTextBlock2_Internal&&this.uiWidgetBase) {
			this.mConditionTextBlock2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mConditionTextBlock2') as mw.TextBlock
		}
		return this.mConditionTextBlock2_Internal
	}
	private mConditionImage2_Internal: mw.TextBlock
	public get mConditionImage2(): mw.TextBlock {
		if(!this.mConditionImage2_Internal&&this.uiWidgetBase) {
			this.mConditionImage2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mConditionImage2') as mw.TextBlock
		}
		return this.mConditionImage2_Internal
	}
	private mLoginButton_Internal: mw.Button
	public get mLoginButton(): mw.Button {
		if(!this.mLoginButton_Internal&&this.uiWidgetBase) {
			this.mLoginButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mLoginButton') as mw.Button
		}
		return this.mLoginButton_Internal
	}
	private mLoginTextBlock_Internal: mw.TextBlock
	public get mLoginTextBlock(): mw.TextBlock {
		if(!this.mLoginTextBlock_Internal&&this.uiWidgetBase) {
			this.mLoginTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mLoginButton/mLoginTextBlock') as mw.TextBlock
		}
		return this.mLoginTextBlock_Internal
	}
	private mLoginTextBlock_1_Internal: mw.TextBlock
	public get mLoginTextBlock_1(): mw.TextBlock {
		if(!this.mLoginTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mLoginTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mLoginButton/mLoginTextBlock_1') as mw.TextBlock
		}
		return this.mLoginTextBlock_1_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/MainCanvas/mCloseButton') as mw.Button
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
		
		this.mLoginButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mLoginButton");
		});
		this.mLoginButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mExplainTextBlock)
		
	
		this.initLanguage(this.mConditionTextBlock1)
		
	
		this.initLanguage(this.mConditionImage1)
		
	
		this.initLanguage(this.mConditionTextBlock2)
		
	
		this.initLanguage(this.mConditionImage2)
		
	
		this.initLanguage(this.mLoginTextBlock)
		
	
		this.initLanguage(this.mLoginTextBlock_1)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/LoginTitleTextBlock") as any);
		
	
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
 