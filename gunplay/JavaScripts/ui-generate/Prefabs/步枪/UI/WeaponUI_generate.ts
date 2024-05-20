/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 爱玩游戏的小胖子
 * UI: UI/Prefabs/步枪/UI/WeaponUI.ui
 * TIME: 2024.05.20-22.03.02
 */
 
@UIBind('UI/Prefabs/步枪/UI/WeaponUI.ui')
export default class WeaponUI_Generate extends UIScript {
		private point_Internal: mw.Image
	public get point(): mw.Image {
		if(!this.point_Internal&&this.uiWidgetBase) {
			this.point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PointCanvas/point') as mw.Image
		}
		return this.point_Internal
	}
	private up_Internal: mw.Image
	public get up(): mw.Image {
		if(!this.up_Internal&&this.uiWidgetBase) {
			this.up_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PointCanvas/up') as mw.Image
		}
		return this.up_Internal
	}
	private down_Internal: mw.Image
	public get down(): mw.Image {
		if(!this.down_Internal&&this.uiWidgetBase) {
			this.down_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PointCanvas/down') as mw.Image
		}
		return this.down_Internal
	}
	private left_Internal: mw.Image
	public get left(): mw.Image {
		if(!this.left_Internal&&this.uiWidgetBase) {
			this.left_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PointCanvas/left') as mw.Image
		}
		return this.left_Internal
	}
	private right_Internal: mw.Image
	public get right(): mw.Image {
		if(!this.right_Internal&&this.uiWidgetBase) {
			this.right_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/PointCanvas/right') as mw.Image
		}
		return this.right_Internal
	}
	private move_Internal: mw.VirtualJoystickPanel
	public get move(): mw.VirtualJoystickPanel {
		if(!this.move_Internal&&this.uiWidgetBase) {
			this.move_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/move') as mw.VirtualJoystickPanel
		}
		return this.move_Internal
	}
	private right_fire_Internal: mw.VirtualJoystickPanel
	public get right_fire(): mw.VirtualJoystickPanel {
		if(!this.right_fire_Internal&&this.uiWidgetBase) {
			this.right_fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/right_fire') as mw.VirtualJoystickPanel
		}
		return this.right_fire_Internal
	}
	private reload_Internal: mw.Button
	public get reload(): mw.Button {
		if(!this.reload_Internal&&this.uiWidgetBase) {
			this.reload_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/reload') as mw.Button
		}
		return this.reload_Internal
	}
	private crouch_Internal: mw.Button
	public get crouch(): mw.Button {
		if(!this.crouch_Internal&&this.uiWidgetBase) {
			this.crouch_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/crouch') as mw.Button
		}
		return this.crouch_Internal
	}
	private jump_Internal: mw.Button
	public get jump(): mw.Button {
		if(!this.jump_Internal&&this.uiWidgetBase) {
			this.jump_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/jump') as mw.Button
		}
		return this.jump_Internal
	}
	private aim_Internal: mw.Button
	public get aim(): mw.Button {
		if(!this.aim_Internal&&this.uiWidgetBase) {
			this.aim_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/aim') as mw.Button
		}
		return this.aim_Internal
	}
	private left_fire_Internal: mw.Button
	public get left_fire(): mw.Button {
		if(!this.left_fire_Internal&&this.uiWidgetBase) {
			this.left_fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/left_fire') as mw.Button
		}
		return this.left_fire_Internal
	}
	private icon_Internal: mw.Image
	public get icon(): mw.Image {
		if(!this.icon_Internal&&this.uiWidgetBase) {
			this.icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/icon') as mw.Image
		}
		return this.icon_Internal
	}
	private name_Internal: mw.TextBlock
	public get name(): mw.TextBlock {
		if(!this.name_Internal&&this.uiWidgetBase) {
			this.name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/name') as mw.TextBlock
		}
		return this.name_Internal
	}
	private bullet_Internal: mw.TextBlock
	public get bullet(): mw.TextBlock {
		if(!this.bullet_Internal&&this.uiWidgetBase) {
			this.bullet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bullet') as mw.TextBlock
		}
		return this.bullet_Internal
	}
	private mKeepTimeCanvas_Internal: mw.Canvas
	public get mKeepTimeCanvas(): mw.Canvas {
		if(!this.mKeepTimeCanvas_Internal&&this.uiWidgetBase) {
			this.mKeepTimeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKeepTimeCanvas') as mw.Canvas
		}
		return this.mKeepTimeCanvas_Internal
	}
	private keepTimeBar_Internal: mw.ProgressBar
	public get keepTimeBar(): mw.ProgressBar {
		if(!this.keepTimeBar_Internal&&this.uiWidgetBase) {
			this.keepTimeBar_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKeepTimeCanvas/keepTimeBar') as mw.ProgressBar
		}
		return this.keepTimeBar_Internal
	}
	private keepTimeTxt_Internal: mw.TextBlock
	public get keepTimeTxt(): mw.TextBlock {
		if(!this.keepTimeTxt_Internal&&this.uiWidgetBase) {
			this.keepTimeTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKeepTimeCanvas/keepTimeTxt') as mw.TextBlock
		}
		return this.keepTimeTxt_Internal
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
		
		this.reload.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "reload");
		});
		this.reload.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.crouch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "crouch");
		});
		this.crouch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.jump.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "jump");
		});
		this.jump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.aim.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "aim");
		});
		this.aim.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.left_fire.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "left_fire");
		});
		this.left_fire.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.name)
		
	
		this.initLanguage(this.bullet)
		
	
		this.initLanguage(this.keepTimeTxt)
		
	
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
 