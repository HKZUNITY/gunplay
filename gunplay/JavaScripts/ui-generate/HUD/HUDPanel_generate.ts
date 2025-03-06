/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/HUD/HUDPanel.ui
 * TIME: 2025.03.05-22.33.23
 */
 
@UIBind('UI/HUD/HUDPanel.ui')
export default class HUDPanel_Generate extends UIScript {
		private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
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
	private mRightTopCanvas_Internal: mw.Canvas
	public get mRightTopCanvas(): mw.Canvas {
		if(!this.mRightTopCanvas_Internal&&this.uiWidgetBase) {
			this.mRightTopCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas') as mw.Canvas
		}
		return this.mRightTopCanvas_Internal
	}
	private mSetBtnCanvas_Internal: mw.Canvas
	public get mSetBtnCanvas(): mw.Canvas {
		if(!this.mSetBtnCanvas_Internal&&this.uiWidgetBase) {
			this.mSetBtnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mSetBtnCanvas') as mw.Canvas
		}
		return this.mSetBtnCanvas_Internal
	}
	private mSetButton_Internal: mw.Button
	public get mSetButton(): mw.Button {
		if(!this.mSetButton_Internal&&this.uiWidgetBase) {
			this.mSetButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mSetBtnCanvas/mSetButton') as mw.Button
		}
		return this.mSetButton_Internal
	}
	private mRankCanvas_Internal: mw.Canvas
	public get mRankCanvas(): mw.Canvas {
		if(!this.mRankCanvas_Internal&&this.uiWidgetBase) {
			this.mRankCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mRankCanvas') as mw.Canvas
		}
		return this.mRankCanvas_Internal
	}
	private mRankButton_Internal: mw.Button
	public get mRankButton(): mw.Button {
		if(!this.mRankButton_Internal&&this.uiWidgetBase) {
			this.mRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mRankCanvas/mRankButton') as mw.Button
		}
		return this.mRankButton_Internal
	}
	private mTeamCanvas_Internal: mw.Canvas
	public get mTeamCanvas(): mw.Canvas {
		if(!this.mTeamCanvas_Internal&&this.uiWidgetBase) {
			this.mTeamCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mTeamCanvas') as mw.Canvas
		}
		return this.mTeamCanvas_Internal
	}
	private mTeamButton_Internal: mw.Button
	public get mTeamButton(): mw.Button {
		if(!this.mTeamButton_Internal&&this.uiWidgetBase) {
			this.mTeamButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mTeamCanvas/mTeamButton') as mw.Button
		}
		return this.mTeamButton_Internal
	}
	private mGunCanvas_Internal: mw.Canvas
	public get mGunCanvas(): mw.Canvas {
		if(!this.mGunCanvas_Internal&&this.uiWidgetBase) {
			this.mGunCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mGunCanvas') as mw.Canvas
		}
		return this.mGunCanvas_Internal
	}
	private mGunButton_Internal: mw.Button
	public get mGunButton(): mw.Button {
		if(!this.mGunButton_Internal&&this.uiWidgetBase) {
			this.mGunButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mGunCanvas/mGunButton') as mw.Button
		}
		return this.mGunButton_Internal
	}
	private mLotteryCanvas_Internal: mw.Canvas
	public get mLotteryCanvas(): mw.Canvas {
		if(!this.mLotteryCanvas_Internal&&this.uiWidgetBase) {
			this.mLotteryCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mLotteryCanvas') as mw.Canvas
		}
		return this.mLotteryCanvas_Internal
	}
	private mLotteryButton_Internal: mw.Button
	public get mLotteryButton(): mw.Button {
		if(!this.mLotteryButton_Internal&&this.uiWidgetBase) {
			this.mLotteryButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mLotteryCanvas/mLotteryButton') as mw.Button
		}
		return this.mLotteryButton_Internal
	}
	private mClothBtnCanvas_Internal: mw.Canvas
	public get mClothBtnCanvas(): mw.Canvas {
		if(!this.mClothBtnCanvas_Internal&&this.uiWidgetBase) {
			this.mClothBtnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mClothBtnCanvas') as mw.Canvas
		}
		return this.mClothBtnCanvas_Internal
	}
	private mClothButton_Internal: mw.Button
	public get mClothButton(): mw.Button {
		if(!this.mClothButton_Internal&&this.uiWidgetBase) {
			this.mClothButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mClothBtnCanvas/mClothButton') as mw.Button
		}
		return this.mClothButton_Internal
	}
	private mRoleBtnCanvas_Internal: mw.Canvas
	public get mRoleBtnCanvas(): mw.Canvas {
		if(!this.mRoleBtnCanvas_Internal&&this.uiWidgetBase) {
			this.mRoleBtnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mRoleBtnCanvas') as mw.Canvas
		}
		return this.mRoleBtnCanvas_Internal
	}
	private mRoleButton_Internal: mw.Button
	public get mRoleButton(): mw.Button {
		if(!this.mRoleButton_Internal&&this.uiWidgetBase) {
			this.mRoleButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mRoleBtnCanvas/mRoleButton') as mw.Button
		}
		return this.mRoleButton_Internal
	}
	private mLoginBtnCanvas_Internal: mw.Canvas
	public get mLoginBtnCanvas(): mw.Canvas {
		if(!this.mLoginBtnCanvas_Internal&&this.uiWidgetBase) {
			this.mLoginBtnCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mLoginBtnCanvas') as mw.Canvas
		}
		return this.mLoginBtnCanvas_Internal
	}
	private mLoginButton_Internal: mw.Button
	public get mLoginButton(): mw.Button {
		if(!this.mLoginButton_Internal&&this.uiWidgetBase) {
			this.mLoginButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mLoginBtnCanvas/mLoginButton') as mw.Button
		}
		return this.mLoginButton_Internal
	}
	private mTaskCanvas_Internal: mw.Canvas
	public get mTaskCanvas(): mw.Canvas {
		if(!this.mTaskCanvas_Internal&&this.uiWidgetBase) {
			this.mTaskCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mTaskCanvas') as mw.Canvas
		}
		return this.mTaskCanvas_Internal
	}
	private mTaskButton_Internal: mw.Button
	public get mTaskButton(): mw.Button {
		if(!this.mTaskButton_Internal&&this.uiWidgetBase) {
			this.mTaskButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mTaskCanvas/mTaskButton') as mw.Button
		}
		return this.mTaskButton_Internal
	}
	private mRedPointImage_Internal: mw.Image
	public get mRedPointImage(): mw.Image {
		if(!this.mRedPointImage_Internal&&this.uiWidgetBase) {
			this.mRedPointImage_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mRightTopCanvas/mTaskCanvas/mRedPointImage') as mw.Image
		}
		return this.mRedPointImage_Internal
	}
	private mMiddleBottomCanvas_Internal: mw.Canvas
	public get mMiddleBottomCanvas(): mw.Canvas {
		if(!this.mMiddleBottomCanvas_Internal&&this.uiWidgetBase) {
			this.mMiddleBottomCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas') as mw.Canvas
		}
		return this.mMiddleBottomCanvas_Internal
	}
	private mLvCanvas_Internal: mw.Canvas
	public get mLvCanvas(): mw.Canvas {
		if(!this.mLvCanvas_Internal&&this.uiWidgetBase) {
			this.mLvCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mLvCanvas') as mw.Canvas
		}
		return this.mLvCanvas_Internal
	}
	private mLvTextBlock_Internal: mw.TextBlock
	public get mLvTextBlock(): mw.TextBlock {
		if(!this.mLvTextBlock_Internal&&this.uiWidgetBase) {
			this.mLvTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mLvCanvas/mLvTextBlock') as mw.TextBlock
		}
		return this.mLvTextBlock_Internal
	}
	private mHpCanvas_Internal: mw.Canvas
	public get mHpCanvas(): mw.Canvas {
		if(!this.mHpCanvas_Internal&&this.uiWidgetBase) {
			this.mHpCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mHpCanvas') as mw.Canvas
		}
		return this.mHpCanvas_Internal
	}
	private mExpProgressBar_Internal: mw.ProgressBar
	public get mExpProgressBar(): mw.ProgressBar {
		if(!this.mExpProgressBar_Internal&&this.uiWidgetBase) {
			this.mExpProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mHpCanvas/mExpProgressBar') as mw.ProgressBar
		}
		return this.mExpProgressBar_Internal
	}
	private mExpTextBlock_Internal: mw.TextBlock
	public get mExpTextBlock(): mw.TextBlock {
		if(!this.mExpTextBlock_Internal&&this.uiWidgetBase) {
			this.mExpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mHpCanvas/mExpTextBlock') as mw.TextBlock
		}
		return this.mExpTextBlock_Internal
	}
	private mHpProgressBar_Internal: mw.ProgressBar
	public get mHpProgressBar(): mw.ProgressBar {
		if(!this.mHpProgressBar_Internal&&this.uiWidgetBase) {
			this.mHpProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mHpCanvas/mHpProgressBar') as mw.ProgressBar
		}
		return this.mHpProgressBar_Internal
	}
	private mHpTextBlock_Internal: mw.TextBlock
	public get mHpTextBlock(): mw.TextBlock {
		if(!this.mHpTextBlock_Internal&&this.uiWidgetBase) {
			this.mHpTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMiddleBottomCanvas/mHpCanvas/mHpTextBlock') as mw.TextBlock
		}
		return this.mHpTextBlock_Internal
	}
	private mKillTipCanvas_Internal: mw.Canvas
	public get mKillTipCanvas(): mw.Canvas {
		if(!this.mKillTipCanvas_Internal&&this.uiWidgetBase) {
			this.mKillTipCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKillTipCanvas') as mw.Canvas
		}
		return this.mKillTipCanvas_Internal
	}
	private mDieCanvas_Internal: mw.Canvas
	public get mDieCanvas(): mw.Canvas {
		if(!this.mDieCanvas_Internal&&this.uiWidgetBase) {
			this.mDieCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDieCanvas') as mw.Canvas
		}
		return this.mDieCanvas_Internal
	}
	private mCountDownTextBlock_Internal: mw.TextBlock
	public get mCountDownTextBlock(): mw.TextBlock {
		if(!this.mCountDownTextBlock_Internal&&this.uiWidgetBase) {
			this.mCountDownTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDieCanvas/mCountDownTextBlock') as mw.TextBlock
		}
		return this.mCountDownTextBlock_Internal
	}
	private mSetCanvas_Internal: mw.Canvas
	public get mSetCanvas(): mw.Canvas {
		if(!this.mSetCanvas_Internal&&this.uiWidgetBase) {
			this.mSetCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas') as mw.Canvas
		}
		return this.mSetCanvas_Internal
	}
	private mFireCanvas_Internal: mw.Canvas
	public get mFireCanvas(): mw.Canvas {
		if(!this.mFireCanvas_Internal&&this.uiWidgetBase) {
			this.mFireCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/MainCanvas/mFireCanvas') as mw.Canvas
		}
		return this.mFireCanvas_Internal
	}
	private mFireProgressBar_Internal: mw.ProgressBar
	public get mFireProgressBar(): mw.ProgressBar {
		if(!this.mFireProgressBar_Internal&&this.uiWidgetBase) {
			this.mFireProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/mFireProgressBar') as mw.ProgressBar
		}
		return this.mFireProgressBar_Internal
	}
	private mControlCanvas_Internal: mw.Canvas
	public get mControlCanvas(): mw.Canvas {
		if(!this.mControlCanvas_Internal&&this.uiWidgetBase) {
			this.mControlCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/MainCanvas/mControlCanvas') as mw.Canvas
		}
		return this.mControlCanvas_Internal
	}
	private mControlProgressBar_Internal: mw.ProgressBar
	public get mControlProgressBar(): mw.ProgressBar {
		if(!this.mControlProgressBar_Internal&&this.uiWidgetBase) {
			this.mControlProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/mControlProgressBar') as mw.ProgressBar
		}
		return this.mControlProgressBar_Internal
	}
	private mBgmCanvas_Internal: mw.Canvas
	public get mBgmCanvas(): mw.Canvas {
		if(!this.mBgmCanvas_Internal&&this.uiWidgetBase) {
			this.mBgmCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas') as mw.Canvas
		}
		return this.mBgmCanvas_Internal
	}
	private mBgmProgressBar_Internal: mw.ProgressBar
	public get mBgmProgressBar(): mw.ProgressBar {
		if(!this.mBgmProgressBar_Internal&&this.uiWidgetBase) {
			this.mBgmProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/mBgmProgressBar') as mw.ProgressBar
		}
		return this.mBgmProgressBar_Internal
	}
	private mSetCloseButton_Internal: mw.Button
	public get mSetCloseButton(): mw.Button {
		if(!this.mSetCloseButton_Internal&&this.uiWidgetBase) {
			this.mSetCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSetCanvas/mSetCloseButton') as mw.Button
		}
		return this.mSetCloseButton_Internal
	}
	private mMaskButton_Internal: mw.MaskButton
	public get mMaskButton(): mw.MaskButton {
		if(!this.mMaskButton_Internal&&this.uiWidgetBase) {
			this.mMaskButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/AtkCanvas/mMaskButton') as mw.MaskButton
		}
		return this.mMaskButton_Internal
	}
	private mCDTextBlock_Internal: mw.TextBlock
	public get mCDTextBlock(): mw.TextBlock {
		if(!this.mCDTextBlock_Internal&&this.uiWidgetBase) {
			this.mCDTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/AtkCanvas/mCDTextBlock') as mw.TextBlock
		}
		return this.mCDTextBlock_Internal
	}
	private mSkillNameTextBlock_Internal: mw.TextBlock
	public get mSkillNameTextBlock(): mw.TextBlock {
		if(!this.mSkillNameTextBlock_Internal&&this.uiWidgetBase) {
			this.mSkillNameTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/AtkCanvas/mSkillNameTextBlock') as mw.TextBlock
		}
		return this.mSkillNameTextBlock_Internal
	}
	private mInvincibleCanvas_Internal: mw.Canvas
	public get mInvincibleCanvas(): mw.Canvas {
		if(!this.mInvincibleCanvas_Internal&&this.uiWidgetBase) {
			this.mInvincibleCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInvincibleCanvas') as mw.Canvas
		}
		return this.mInvincibleCanvas_Internal
	}
	private mInvincibleProgressBar_Internal: mw.ProgressBar
	public get mInvincibleProgressBar(): mw.ProgressBar {
		if(!this.mInvincibleProgressBar_Internal&&this.uiWidgetBase) {
			this.mInvincibleProgressBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInvincibleCanvas/mInvincibleProgressBar') as mw.ProgressBar
		}
		return this.mInvincibleProgressBar_Internal
	}
	private mInvincibleTextBlock_Internal: mw.TextBlock
	public get mInvincibleTextBlock(): mw.TextBlock {
		if(!this.mInvincibleTextBlock_Internal&&this.uiWidgetBase) {
			this.mInvincibleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInvincibleCanvas/mInvincibleTextBlock') as mw.TextBlock
		}
		return this.mInvincibleTextBlock_Internal
	}
	private mKillTipCountCanvas_Internal: mw.Canvas
	public get mKillTipCountCanvas(): mw.Canvas {
		if(!this.mKillTipCountCanvas_Internal&&this.uiWidgetBase) {
			this.mKillTipCountCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillTipCanvas/mKillTipCountCanvas') as mw.Canvas
		}
		return this.mKillTipCountCanvas_Internal
	}
	private mKillTipTextBlock1_Internal: mw.TextBlock
	public get mKillTipTextBlock1(): mw.TextBlock {
		if(!this.mKillTipTextBlock1_Internal&&this.uiWidgetBase) {
			this.mKillTipTextBlock1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillTipCanvas/mKillTipCountCanvas/mKillTipTextBlock1') as mw.TextBlock
		}
		return this.mKillTipTextBlock1_Internal
	}
	private mKillTipTextBlock2_Internal: mw.TextBlock
	public get mKillTipTextBlock2(): mw.TextBlock {
		if(!this.mKillTipTextBlock2_Internal&&this.uiWidgetBase) {
			this.mKillTipTextBlock2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillTipCanvas/mKillTipCountCanvas/mKillTipTextBlock2') as mw.TextBlock
		}
		return this.mKillTipTextBlock2_Internal
	}
	private mKillTipTextBlock3_Internal: mw.TextBlock
	public get mKillTipTextBlock3(): mw.TextBlock {
		if(!this.mKillTipTextBlock3_Internal&&this.uiWidgetBase) {
			this.mKillTipTextBlock3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/KillTipCanvas/mKillTipTextBlock3') as mw.TextBlock
		}
		return this.mKillTipTextBlock3_Internal
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
		
		this.mAddCoinButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
		});
		this.mAddCoinButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAddDiamondButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
		});
		this.mAddDiamondButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSetButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSetButton");
		});
		this.mSetButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRankButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRankButton");
		});
		this.mRankButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mTeamButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTeamButton");
		});
		this.mTeamButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mGunButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGunButton");
		});
		this.mGunButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mLotteryButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mLotteryButton");
		});
		this.mLotteryButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mClothButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mClothButton");
		});
		this.mClothButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRoleButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRoleButton");
		});
		this.mRoleButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mLoginButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mLoginButton");
		});
		this.mLoginButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mTaskButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mTaskButton");
		});
		this.mTaskButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mSetCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSetCloseButton");
		});
		this.mSetCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mCoinTextBlock)
		
	
		this.initLanguage(this.mDiamondTextBlock)
		
	
		this.initLanguage(this.mLvTextBlock)
		
	
		this.initLanguage(this.mExpTextBlock)
		
	
		this.initLanguage(this.mHpTextBlock)
		
	
		this.initLanguage(this.mCountDownTextBlock)
		
	
		this.initLanguage(this.mCDTextBlock)
		
	
		this.initLanguage(this.mSkillNameTextBlock)
		
	
		this.initLanguage(this.mInvincibleTextBlock)
		
	
		this.initLanguage(this.mKillTipTextBlock1)
		
	
		this.initLanguage(this.mKillTipTextBlock2)
		
	
		this.initLanguage(this.mKillTipTextBlock3)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mSetBtnCanvas/SetTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRankCanvas/RankTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTeamCanvas/TeamTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mGunCanvas/GunTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLotteryCanvas/LotteryTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mClothBtnCanvas/LoginTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRoleBtnCanvas/RoleTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLoginBtnCanvas/LoginTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTaskCanvas/TaskTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mDieCanvas/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mDieCanvas/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/SetTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/FireTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/LowFireTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/MiddleFireTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/HighFireTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/ControlTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/LowControlTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/MiddleControlTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/HighControlTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/BgmTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/LowBgmTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/MiddleBgmTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/HighBgmTextBlock") as any);
		
	
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
 