/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Lottery/LotteryPanel.ui
 * TIME: 2025.03.05-22.33.23
 */
 
@UIBind('UI/Lottery/LotteryPanel.ui')
export default class LotteryPanel_Generate extends UIScript {
		private mMiddleTopCanvas_Internal: mw.Canvas
	public get mMiddleTopCanvas(): mw.Canvas {
		if(!this.mMiddleTopCanvas_Internal&&this.uiWidgetBase) {
			this.mMiddleTopCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas') as mw.Canvas
		}
		return this.mMiddleTopCanvas_Internal
	}
	private mCoinCanvas_Internal: mw.Canvas
	public get mCoinCanvas(): mw.Canvas {
		if(!this.mCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mCoinCanvas') as mw.Canvas
		}
		return this.mCoinCanvas_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mCoinCanvas/CoinCanvas/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
	}
	private mAddCoinButton_Internal: mw.Button
	public get mAddCoinButton(): mw.Button {
		if(!this.mAddCoinButton_Internal&&this.uiWidgetBase) {
			this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mCoinCanvas/mAddCoinButton') as mw.Button
		}
		return this.mAddCoinButton_Internal
	}
	private mDiamondCanvas_Internal: mw.Canvas
	public get mDiamondCanvas(): mw.Canvas {
		if(!this.mDiamondCanvas_Internal&&this.uiWidgetBase) {
			this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mDiamondCanvas') as mw.Canvas
		}
		return this.mDiamondCanvas_Internal
	}
	private mDiamondTextBlock_Internal: mw.TextBlock
	public get mDiamondTextBlock(): mw.TextBlock {
		if(!this.mDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mDiamondCanvas/DiamondCanvas/mDiamondTextBlock') as mw.TextBlock
		}
		return this.mDiamondTextBlock_Internal
	}
	private mAddDiamondButton_Internal: mw.Button
	public get mAddDiamondButton(): mw.Button {
		if(!this.mAddDiamondButton_Internal&&this.uiWidgetBase) {
			this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mDiamondCanvas/mAddDiamondButton') as mw.Button
		}
		return this.mAddDiamondButton_Internal
	}
	private mAddCanvas_Internal: mw.Canvas
	public get mAddCanvas(): mw.Canvas {
		if(!this.mAddCanvas_Internal&&this.uiWidgetBase) {
			this.mAddCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/LeftCanvas/mAddCanvas') as mw.Canvas
		}
		return this.mAddCanvas_Internal
	}
	private mCoinStaleButton_Internal: mw.StaleButton
	public get mCoinStaleButton(): mw.StaleButton {
		if(!this.mCoinStaleButton_Internal&&this.uiWidgetBase) {
			this.mCoinStaleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightCanvas/CoinCanvas/mCoinStaleButton') as mw.StaleButton
		}
		return this.mCoinStaleButton_Internal
	}
	private mDiamondStaleButton_Internal: mw.StaleButton
	public get mDiamondStaleButton(): mw.StaleButton {
		if(!this.mDiamondStaleButton_Internal&&this.uiWidgetBase) {
			this.mDiamondStaleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RightCanvas/DiamondCanvas/mDiamondStaleButton') as mw.StaleButton
		}
		return this.mDiamondStaleButton_Internal
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
		
		this.mCoinStaleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCoinStaleButton");
		});
		this.initLanguage(this.mCoinStaleButton);
		this.mCoinStaleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mDiamondStaleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mDiamondStaleButton");
		});
		this.initLanguage(this.mDiamondStaleButton);
		this.mDiamondStaleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
		});
		this.mAddDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1") as any);
		
	
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
 