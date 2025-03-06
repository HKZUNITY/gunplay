/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/WorldRank/WorldRankPanel.ui
 * TIME: 2025.03.05-22.33.23
 */
 
@UIBind('UI/WorldRank/WorldRankPanel.ui')
export default class WorldRankPanel_Generate extends UIScript {
		private mTitleTextBlock_Internal: mw.TextBlock
	public get mTitleTextBlock(): mw.TextBlock {
		if(!this.mTitleTextBlock_Internal&&this.uiWidgetBase) {
			this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mTitleTextBlock') as mw.TextBlock
		}
		return this.mTitleTextBlock_Internal
	}
	private mRoomCanvas_Internal: mw.Canvas
	public get mRoomCanvas(): mw.Canvas {
		if(!this.mRoomCanvas_Internal&&this.uiWidgetBase) {
			this.mRoomCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas') as mw.Canvas
		}
		return this.mRoomCanvas_Internal
	}
	private mScrollBox_Room_Internal: mw.ScrollBox
	public get mScrollBox_Room(): mw.ScrollBox {
		if(!this.mScrollBox_Room_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Room_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/mScrollBox_Room') as mw.ScrollBox
		}
		return this.mScrollBox_Room_Internal
	}
	private mRoomContent_Internal: mw.Canvas
	public get mRoomContent(): mw.Canvas {
		if(!this.mRoomContent_Internal&&this.uiWidgetBase) {
			this.mRoomContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mRoomCanvas/mScrollBox_Room/mRoomContent') as mw.Canvas
		}
		return this.mRoomContent_Internal
	}
	private mWorldCanvas_Internal: mw.Canvas
	public get mWorldCanvas(): mw.Canvas {
		if(!this.mWorldCanvas_Internal&&this.uiWidgetBase) {
			this.mWorldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas') as mw.Canvas
		}
		return this.mWorldCanvas_Internal
	}
	private mScrollBox_World_Internal: mw.ScrollBox
	public get mScrollBox_World(): mw.ScrollBox {
		if(!this.mScrollBox_World_Internal&&this.uiWidgetBase) {
			this.mScrollBox_World_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/mScrollBox_World') as mw.ScrollBox
		}
		return this.mScrollBox_World_Internal
	}
	private mWorldContent_Internal: mw.Canvas
	public get mWorldContent(): mw.Canvas {
		if(!this.mWorldContent_Internal&&this.uiWidgetBase) {
			this.mWorldContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mWorldCanvas/mScrollBox_World/mWorldContent') as mw.Canvas
		}
		return this.mWorldContent_Internal
	}
	private mRankDesTextBlock_Internal: mw.TextBlock
	public get mRankDesTextBlock(): mw.TextBlock {
		if(!this.mRankDesTextBlock_Internal&&this.uiWidgetBase) {
			this.mRankDesTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mRankDesTextBlock') as mw.TextBlock
		}
		return this.mRankDesTextBlock_Internal
	}
	private mRoomRankButton_Internal: mw.Button
	public get mRoomRankButton(): mw.Button {
		if(!this.mRoomRankButton_Internal&&this.uiWidgetBase) {
			this.mRoomRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mRoomRankButton') as mw.Button
		}
		return this.mRoomRankButton_Internal
	}
	private mWorldRankButton_Internal: mw.Button
	public get mWorldRankButton(): mw.Button {
		if(!this.mWorldRankButton_Internal&&this.uiWidgetBase) {
			this.mWorldRankButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/RankTypeCanvas/mWorldRankButton') as mw.Button
		}
		return this.mWorldRankButton_Internal
	}
	private mCloseButton_Internal: mw.Button
	public get mCloseButton(): mw.Button {
		if(!this.mCloseButton_Internal&&this.uiWidgetBase) {
			this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/RankCanvas/mCloseButton') as mw.Button
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
		
		this.mRoomRankButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRoomRankButton");
		});
		this.mRoomRankButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mWorldRankButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mWorldRankButton");
		});
		this.mWorldRankButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mCloseButton.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
		});
		this.mCloseButton.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTitleTextBlock)
		
	
		this.initLanguage(this.mRankDesTextBlock)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomRankTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomNameTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomLvTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomKillTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/WorldRankTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/WorldNameTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/WorldLvTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mRoomRankButton/RoomTextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mWorldRankButton/WorldTextBlock") as any);
		
	
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
 