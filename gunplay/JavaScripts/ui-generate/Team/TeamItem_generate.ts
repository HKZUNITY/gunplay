/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Team/TeamItem.ui
 * TIME: 2024.05.20-22.03.02
 */
 
@UIBind('UI/Team/TeamItem.ui')
export default class TeamItem_Generate extends UIScript {
		private mCanvas_1_Internal: mw.Canvas
	public get mCanvas_1(): mw.Canvas {
		if(!this.mCanvas_1_Internal&&this.uiWidgetBase) {
			this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_1') as mw.Canvas
		}
		return this.mCanvas_1_Internal
	}
	private mTextBlock_1_Internal: mw.TextBlock
	public get mTextBlock_1(): mw.TextBlock {
		if(!this.mTextBlock_1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_1/mTextBlock_1') as mw.TextBlock
		}
		return this.mTextBlock_1_Internal
	}
	private mCanvas_2_Internal: mw.Canvas
	public get mCanvas_2(): mw.Canvas {
		if(!this.mCanvas_2_Internal&&this.uiWidgetBase) {
			this.mCanvas_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_2') as mw.Canvas
		}
		return this.mCanvas_2_Internal
	}
	private mTextBlock_2_Internal: mw.TextBlock
	public get mTextBlock_2(): mw.TextBlock {
		if(!this.mTextBlock_2_Internal&&this.uiWidgetBase) {
			this.mTextBlock_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_2/mTextBlock_2') as mw.TextBlock
		}
		return this.mTextBlock_2_Internal
	}
	private mCanvas_0_Internal: mw.Canvas
	public get mCanvas_0(): mw.Canvas {
		if(!this.mCanvas_0_Internal&&this.uiWidgetBase) {
			this.mCanvas_0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_0') as mw.Canvas
		}
		return this.mCanvas_0_Internal
	}
	private mTextBlock_3_Internal: mw.TextBlock
	public get mTextBlock_3(): mw.TextBlock {
		if(!this.mTextBlock_3_Internal&&this.uiWidgetBase) {
			this.mTextBlock_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_0/mTextBlock_3') as mw.TextBlock
		}
		return this.mTextBlock_3_Internal
	}
	private mTextBlock_3_1_Internal: mw.TextBlock
	public get mTextBlock_3_1(): mw.TextBlock {
		if(!this.mTextBlock_3_1_Internal&&this.uiWidgetBase) {
			this.mTextBlock_3_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_0/mTextBlock_3_1') as mw.TextBlock
		}
		return this.mTextBlock_3_1_Internal
	}
	private mButton1_Internal: mw.Button
	public get mButton1(): mw.Button {
		if(!this.mButton1_Internal&&this.uiWidgetBase) {
			this.mButton1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_0/mButton1') as mw.Button
		}
		return this.mButton1_Internal
	}
	private mButton_Internal: mw.Button
	public get mButton(): mw.Button {
		if(!this.mButton_Internal&&this.uiWidgetBase) {
			this.mButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton') as mw.Button
		}
		return this.mButton_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mButton/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
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
		
		this.mButton1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton1");
		});
		this.mButton1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mButton");
		});
		this.mButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextBlock_1)
		
	
		this.initLanguage(this.mTextBlock_2)
		
	
		this.initLanguage(this.mTextBlock_3)
		
	
		this.initLanguage(this.mTextBlock_3_1)
		
	
		this.initLanguage(this.mTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_0/mButton1/TextBlock") as any);
		
	
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
 