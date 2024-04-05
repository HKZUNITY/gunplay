/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Task/TaskItem.ui
 * TIME: 2024.01.21-23.17.52
 */
 
@UIBind('UI/Task/TaskItem.ui')
export default class TaskItem_Generate extends UIScript {
		private mNameTextBlock_Internal: mw.TextBlock
	public get mNameTextBlock(): mw.TextBlock {
		if(!this.mNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mNameTextBlock') as mw.TextBlock
		}
		return this.mNameTextBlock_Internal
	}
	private mCoinCanvas_Internal: mw.Canvas
	public get mCoinCanvas(): mw.Canvas {
		if(!this.mCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCoinCanvas') as mw.Canvas
		}
		return this.mCoinCanvas_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCoinCanvas/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
	}
	private mExpCanvas_Internal: mw.Canvas
	public get mExpCanvas(): mw.Canvas {
		if(!this.mExpCanvas_Internal&&this.uiWidgetBase) {
			this.mExpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpCanvas') as mw.Canvas
		}
		return this.mExpCanvas_Internal
	}
	private mExpTextBlock_Internal: mw.TextBlock
	public get mExpTextBlock(): mw.TextBlock {
		if(!this.mExpTextBlock_Internal&&this.uiWidgetBase) {
			this.mExpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mExpCanvas/mExpTextBlock') as mw.TextBlock
		}
		return this.mExpTextBlock_Internal
	}
	private mFinishButton_Internal: mw.Button
	public get mFinishButton(): mw.Button {
		if(!this.mFinishButton_Internal&&this.uiWidgetBase) {
			this.mFinishButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mFinishButton') as mw.Button
		}
		return this.mFinishButton_Internal
	}
	private mUnfinishTextBlock_Internal: mw.TextBlock
	public get mUnfinishTextBlock(): mw.TextBlock {
		if(!this.mUnfinishTextBlock_Internal&&this.uiWidgetBase) {
			this.mUnfinishTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mUnfinishTextBlock') as mw.TextBlock
		}
		return this.mUnfinishTextBlock_Internal
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
		
		this.mFinishButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mFinishButton");
		});
		this.mFinishButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mNameTextBlock)
		
	
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mExpTextBlock)
		
	
		this.initLanguage(this.mUnfinishTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mFinishButton/TextBlock") as any);
		
	
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
 