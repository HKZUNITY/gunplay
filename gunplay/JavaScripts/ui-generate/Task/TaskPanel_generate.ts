/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Task/TaskPanel.ui
 * TIME: 2024.05.20-22.03.02
 */
 
@UIBind('UI/Task/TaskPanel.ui')
export default class TaskPanel_Generate extends UIScript {
		private mDailyTimeTextBlock_Internal: mw.TextBlock
	public get mDailyTimeTextBlock(): mw.TextBlock {
		if(!this.mDailyTimeTextBlock_Internal&&this.uiWidgetBase) {
			this.mDailyTimeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTimeTextBlock') as mw.TextBlock
		}
		return this.mDailyTimeTextBlock_Internal
	}
	private mDailyTaskBox_Internal: mw.ScrollBox
	public get mDailyTaskBox(): mw.ScrollBox {
		if(!this.mDailyTaskBox_Internal&&this.uiWidgetBase) {
			this.mDailyTaskBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTaskBox') as mw.ScrollBox
		}
		return this.mDailyTaskBox_Internal
	}
	private mDailyTaskCanvas_Internal: mw.Canvas
	public get mDailyTaskCanvas(): mw.Canvas {
		if(!this.mDailyTaskCanvas_Internal&&this.uiWidgetBase) {
			this.mDailyTaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTaskBox/mDailyTaskCanvas') as mw.Canvas
		}
		return this.mDailyTaskCanvas_Internal
	}
	private mDailyTaskDoneTextBlock_Internal: mw.TextBlock
	public get mDailyTaskDoneTextBlock(): mw.TextBlock {
		if(!this.mDailyTaskDoneTextBlock_Internal&&this.uiWidgetBase) {
			this.mDailyTaskDoneTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTaskDoneTextBlock') as mw.TextBlock
		}
		return this.mDailyTaskDoneTextBlock_Internal
	}
	private mWeekTimeTextBlock_Internal: mw.TextBlock
	public get mWeekTimeTextBlock(): mw.TextBlock {
		if(!this.mWeekTimeTextBlock_Internal&&this.uiWidgetBase) {
			this.mWeekTimeTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTimeTextBlock') as mw.TextBlock
		}
		return this.mWeekTimeTextBlock_Internal
	}
	private mWeekTaskBox_Internal: mw.ScrollBox
	public get mWeekTaskBox(): mw.ScrollBox {
		if(!this.mWeekTaskBox_Internal&&this.uiWidgetBase) {
			this.mWeekTaskBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTaskBox') as mw.ScrollBox
		}
		return this.mWeekTaskBox_Internal
	}
	private mWeekTaskCanvas_Internal: mw.Canvas
	public get mWeekTaskCanvas(): mw.Canvas {
		if(!this.mWeekTaskCanvas_Internal&&this.uiWidgetBase) {
			this.mWeekTaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTaskBox/mWeekTaskCanvas') as mw.Canvas
		}
		return this.mWeekTaskCanvas_Internal
	}
	private mWeekTaskDoneTextBlock_Internal: mw.TextBlock
	public get mWeekTaskDoneTextBlock(): mw.TextBlock {
		if(!this.mWeekTaskDoneTextBlock_Internal&&this.uiWidgetBase) {
			this.mWeekTaskDoneTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTaskDoneTextBlock') as mw.TextBlock
		}
		return this.mWeekTaskDoneTextBlock_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/TaskCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mRecycleCanvas_Internal: mw.Canvas
	public get mRecycleCanvas(): mw.Canvas {
		if(!this.mRecycleCanvas_Internal&&this.uiWidgetBase) {
			this.mRecycleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRecycleCanvas') as mw.Canvas
		}
		return this.mRecycleCanvas_Internal
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
		
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mDailyTimeTextBlock)
		
	
		this.initLanguage(this.mDailyTaskDoneTextBlock)
		
	
		this.initLanguage(this.mWeekTimeTextBlock)
		
	
		this.initLanguage(this.mWeekTaskDoneTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/DailyTaskCanvas/DailyTaskTitleTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/WeekTaskCanvas/WeekTaskTitleTextBlock") as any);
		
	
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
 