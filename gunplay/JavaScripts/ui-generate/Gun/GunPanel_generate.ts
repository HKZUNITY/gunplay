/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Gun/GunPanel.ui
 * TIME: 2024.05.20-22.03.02
 */
 
@UIBind('UI/Gun/GunPanel.ui')
export default class GunPanel_Generate extends UIScript {
		private mTouchImage_Internal: mw.Image
	public get mTouchImage(): mw.Image {
		if(!this.mTouchImage_Internal&&this.uiWidgetBase) {
			this.mTouchImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTouchImage') as mw.Image
		}
		return this.mTouchImage_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/LeftCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContentCanvas_Internal: mw.Canvas
	public get mContentCanvas(): mw.Canvas {
		if(!this.mContentCanvas_Internal&&this.uiWidgetBase) {
			this.mContentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/LeftCanvas/mScrollBox/mContentCanvas') as mw.Canvas
		}
		return this.mContentCanvas_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCloseButton') as mw.Button
		}
		return this.mCloseButton_Internal
	}
	private mBuyCanvas_Internal: mw.Canvas
	public get mBuyCanvas(): mw.Canvas {
		if(!this.mBuyCanvas_Internal&&this.uiWidgetBase) {
			this.mBuyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas') as mw.Canvas
		}
		return this.mBuyCanvas_Internal
	}
	private mDiamondCanvas_Internal: mw.Canvas
	public get mDiamondCanvas(): mw.Canvas {
		if(!this.mDiamondCanvas_Internal&&this.uiWidgetBase) {
			this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mDiamondCanvas') as mw.Canvas
		}
		return this.mDiamondCanvas_Internal
	}
	private mDiamondTextBlock_Internal: mw.TextBlock
	public get mDiamondTextBlock(): mw.TextBlock {
		if(!this.mDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mDiamondCanvas/mDiamondTextBlock') as mw.TextBlock
		}
		return this.mDiamondTextBlock_Internal
	}
	private mCoinCanvas_Internal: mw.Canvas
	public get mCoinCanvas(): mw.Canvas {
		if(!this.mCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mCoinCanvas') as mw.Canvas
		}
		return this.mCoinCanvas_Internal
	}
	private mCoinTextBlock_Internal: mw.TextBlock
	public get mCoinTextBlock(): mw.TextBlock {
		if(!this.mCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mCoinCanvas/mCoinTextBlock') as mw.TextBlock
		}
		return this.mCoinTextBlock_Internal
	}
	private mBuyButton_Internal: mw.Button
	public get mBuyButton(): mw.Button {
		if(!this.mBuyButton_Internal&&this.uiWidgetBase) {
			this.mBuyButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mBuyButton') as mw.Button
		}
		return this.mBuyButton_Internal
	}
	private mBuyTextBlock_Internal: mw.TextBlock
	public get mBuyTextBlock(): mw.TextBlock {
		if(!this.mBuyTextBlock_Internal&&this.uiWidgetBase) {
			this.mBuyTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mBuyButton/mBuyTextBlock') as mw.TextBlock
		}
		return this.mBuyTextBlock_Internal
	}
	private mExplainCanvas_Internal: mw.Canvas
	public get mExplainCanvas(): mw.Canvas {
		if(!this.mExplainCanvas_Internal&&this.uiWidgetBase) {
			this.mExplainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mExplainCanvas') as mw.Canvas
		}
		return this.mExplainCanvas_Internal
	}
	private mFireIntervalTextBlock_Internal: mw.TextBlock
	public get mFireIntervalTextBlock(): mw.TextBlock {
		if(!this.mFireIntervalTextBlock_Internal&&this.uiWidgetBase) {
			this.mFireIntervalTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mExplainCanvas/mFireIntervalTextBlock') as mw.TextBlock
		}
		return this.mFireIntervalTextBlock_Internal
	}
	private mBulletCountTextBlock_Internal: mw.TextBlock
	public get mBulletCountTextBlock(): mw.TextBlock {
		if(!this.mBulletCountTextBlock_Internal&&this.uiWidgetBase) {
			this.mBulletCountTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mExplainCanvas/mBulletCountTextBlock') as mw.TextBlock
		}
		return this.mBulletCountTextBlock_Internal
	}
	private mHurtTextBlock_Internal: mw.TextBlock
	public get mHurtTextBlock(): mw.TextBlock {
		if(!this.mHurtTextBlock_Internal&&this.uiWidgetBase) {
			this.mHurtTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBuyCanvas/mExplainCanvas/mHurtTextBlock') as mw.TextBlock
		}
		return this.mHurtTextBlock_Internal
	}
	private mMiddleTopCanvas_Internal: mw.Canvas
	public get mMiddleTopCanvas(): mw.Canvas {
		if(!this.mMiddleTopCanvas_Internal&&this.uiWidgetBase) {
			this.mMiddleTopCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas') as mw.Canvas
		}
		return this.mMiddleTopCanvas_Internal
	}
	private mBuyCoinCanvas_Internal: mw.Canvas
	public get mBuyCoinCanvas(): mw.Canvas {
		if(!this.mBuyCoinCanvas_Internal&&this.uiWidgetBase) {
			this.mBuyCoinCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mBuyCoinCanvas') as mw.Canvas
		}
		return this.mBuyCoinCanvas_Internal
	}
	private mBuyCoinTextBlock_Internal: mw.TextBlock
	public get mBuyCoinTextBlock(): mw.TextBlock {
		if(!this.mBuyCoinTextBlock_Internal&&this.uiWidgetBase) {
			this.mBuyCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mBuyCoinCanvas/CoinCanvas/mBuyCoinTextBlock') as mw.TextBlock
		}
		return this.mBuyCoinTextBlock_Internal
	}
	private mAddCoinButton_Internal: mw.Button
	public get mAddCoinButton(): mw.Button {
		if(!this.mAddCoinButton_Internal&&this.uiWidgetBase) {
			this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mBuyCoinCanvas/mAddCoinButton') as mw.Button
		}
		return this.mAddCoinButton_Internal
	}
	private mBuyDiamondCanvas_Internal: mw.Canvas
	public get mBuyDiamondCanvas(): mw.Canvas {
		if(!this.mBuyDiamondCanvas_Internal&&this.uiWidgetBase) {
			this.mBuyDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mBuyDiamondCanvas') as mw.Canvas
		}
		return this.mBuyDiamondCanvas_Internal
	}
	private mBuyDiamondTextBlock_Internal: mw.TextBlock
	public get mBuyDiamondTextBlock(): mw.TextBlock {
		if(!this.mBuyDiamondTextBlock_Internal&&this.uiWidgetBase) {
			this.mBuyDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mBuyDiamondCanvas/DiamondCanvas/mBuyDiamondTextBlock') as mw.TextBlock
		}
		return this.mBuyDiamondTextBlock_Internal
	}
	private mAddDiamondButton_Internal: mw.Button
	public get mAddDiamondButton(): mw.Button {
		if(!this.mAddDiamondButton_Internal&&this.uiWidgetBase) {
			this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleTopCanvas/mBuyDiamondCanvas/mAddDiamondButton') as mw.Button
		}
		return this.mAddDiamondButton_Internal
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
		
	
		this.mBuyButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBuyButton");
		});
		this.mBuyButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
		});
		this.mAddDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mDiamondTextBlock)
		
	
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mBuyTextBlock)
		
	
		this.initLanguage(this.mFireIntervalTextBlock)
		
	
		this.initLanguage(this.mBulletCountTextBlock)
		
	
		this.initLanguage(this.mHurtTextBlock)
		
	
		this.initLanguage(this.mBuyCoinTextBlock)
		
	
		this.initLanguage(this.mBuyDiamondTextBlock)
		
	
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
 