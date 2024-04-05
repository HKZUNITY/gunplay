
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.12.12-23.00.18
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../../config/GameConfig";
import { IGunElement } from "../../../config/Gun";
import { EventType } from "../../../const/Enum";
import Console from "../../../tools/Console";
import { Enums, TouchScript } from "../../../tools/TouchScript";
import GunItem_Generate from "../../../ui-generate/Gun/GunItem_generate";
import GunPanel_Generate from "../../../ui-generate/Gun/GunPanel_generate";
import { HUDModuleC } from "../../HUDModule/HUDModuleC";
import HUDPanel from "../../HUDModule/ui/HUDPanel";
import { GunModuleC } from "../GunModuleC";
import { BuyGunPanel } from "./BuyGunPanel";

export class GunItem extends GunItem_Generate {
	private gunPanel: GunPanel = null;
	private gunId: number = 0;
	private isHas: boolean = false;
	private icon: string = "";
	private name: string = "";
	private gunType: number = 0;
	private isTurnICON: boolean = false;
	// private fireInterval: number = 0;
	// private bulletCount: number = 0;
	// private hurt: number = 0;

	protected onStart(): void {
		this.initData();
		this.bindButton();
	}

	private initData(): void {
		this.gunPanel = mw.UIService.getUI(GunPanel);
		this.mSelectImage.visibility = mw.SlateVisibility.Collapsed;
	}

	private bindButton(): void {
		this.mButton.onClicked.add(() => {
			this.gunPanel.updateSelectGun(this.gunId);
		});
		this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	}

	public setData(isHas: boolean, gunElement: IGunElement): void {
		this.isHas = isHas;
		this.gunId = gunElement.ID;
		this.icon = gunElement.GunIcon_M;
		this.name = gunElement.GunName;
		this.gunType = gunElement.GunType;
		this.isTurnICON = (gunElement.IsTurnICON == 1) ? true : false;
		// this.fireInterval = Number(gunElement.FireInterval);
		// this.bulletCount = gunElement.BulletCount;
		// this.hurt = gunElement.Hurt;
		this.updateUI();
	}

	private updateUI(): void {
		mw.assetIDChangeIconUrlRequest([this.icon]).then(() => {
			try {
				this.mIconImage.setImageByAssetIconData(mw.getAssetIconDataByAssetID(this.icon));
			} catch (error) {
				Console.error("updateUI:" + error);
			}
		});
		this.mLockTextBlock.visibility = this.isHas ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
		this.mNameTextBlock.text = this.name;
		this.mTypeTextBlock.text = this.gunType == 2 ? "限时" : "永久";
	}

	public select(): void {
		this.mSelectImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	}

	public unselect(): void {
		this.mSelectImage.visibility = mw.SlateVisibility.Collapsed;
	}
}

export class GunPanel extends GunPanel_Generate {
	private gunModuleC: GunModuleC = null;
	private hudModuleC: HUDModuleC = null;
	private buyGunPanel: BuyGunPanel = null;
	private hudPanel: HUDPanel = null;

	protected onStart(): void {
		this.initDatas();
		this.bindButtons();
	}

	private initDatas(): void {
		this.gunModuleC = ModuleService.getModule(GunModuleC);
		this.hudModuleC = ModuleService.getModule(HUDModuleC);
		this.buyGunPanel = mw.UIService.getUI(BuyGunPanel);
		this.hudPanel = mw.UIService.getUI(HUDPanel);
		this.moveVec = [];
		mw.TimeUtil.delayExecute(() => {
			this.movePos = this.mTouchImage.position.multiply(1);
		}, 3)
	}

	private bindButtons(): void {
		this.mCloseButton.onClicked.add(() => {
			this.gunModuleC.closeGunPanel();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
		});
		this.mBuyButton.onClicked.add(this.bindBuyButton.bind(this));
		this.mAddCoinButton.onClicked.add(() => {
			this.hudModuleC.onAddCoinAction.call();
		});
		this.mAddDiamondButton.onClicked.add(() => {
			this.hudModuleC.onAddDiamondAction.call();
		});
	}

	private bindBuyButton(): void {
		if (this.gunIds.includes(this.currentGunId)) {
			this.gunModuleC.closeGunPanel();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
		} else {
			this.buyGunPanel.showAndInitData(this.currentGunId, false);
		}
	}

	private gunItmeMap: Map<number, GunItem> = new Map<number, GunItem>();
	public initGunPanel(gunIds: number[], currentGunId: number): void {
		this.gunIds = gunIds;
		let gunElements: IGunElement[] = GameConfig.Gun.getAllElement();
		for (let i = 0; i < gunElements.length; ++i) {
			let gunElement = gunElements[i];
			let gunItem = mw.UIService.create(GunItem);
			let isHas = this.gunIds.includes(gunElement.ID);
			gunItem.setData(isHas, gunElement);
			this.mContentCanvas.addChild(gunItem.uiWidgetBase);
			this.gunItmeMap.set(gunElement.ID, gunItem);
		}
		this.updateSelectGun(currentGunId);
	}

	private gunIds: number[] = [];
	private currentGunId: number = 0;
	public updateSelectGun(gunId: number): void {
		if (gunId == this.currentGunId) return;
		if (this.currentGunId != 0) this.gunItmeMap.get(this.currentGunId).unselect();
		this.currentGunId = gunId;
		this.gunItmeMap.get(this.currentGunId).select();
		this.gunModuleC.switchGun(this.currentGunId);

		let gunElement = GameConfig.Gun.getElement(this.currentGunId);
		if (this.gunIds.includes(this.currentGunId)) {
			this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
			this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
			this.mBuyTextBlock.text = "使用";
		} else {
			this.mDiamondCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mBuyTextBlock.text = "购买";

			if (gunElement.Price[1] == -1) {
				this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
			} else {
				this.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
				this.mCoinTextBlock.text = gunElement.Price[1].toString();
			}
			this.mDiamondTextBlock.text = gunElement.Price[0].toString();
		}

		this.mFireIntervalTextBlock.text = "射击间隔：" + gunElement.FireInterval;
		this.mBulletCountTextBlock.text = "子弹数量：" + gunElement.BulletCount + "*无限";
		this.mHurtTextBlock.text = "伤害：" + gunElement.Hurt.toString();
	}

	public pickUpGun(gunId: number): void {
		this.hudPanel.mVirtualJoystickPanel.resetJoyStick();
		this.updateSelectGun(gunId);
		if (this.gunIds.includes(gunId)) {
			this.gunModuleC.setCurrentGunId(gunId);
		} else {
			this.buyGunPanel.showAndInitData(gunId, true);
		}
	}

	public hideAndSetCurrentGunId(gunId: number): void {
		this.gunModuleC.setCurrentGunId(gunId);
		this.buyGunPanel.hide();
	}

	protected onShow(...params: any[]): void {
		this.canUpdate = true;
		TouchScript.instance.addScreenListener(this.mTouchImage, this.onMoveTouchEvent.bind(this), false);
	}

	protected onHide(): void {
		this.canUpdate = false;
		this.gunModuleC.setCurrentGunId(this.currentGunId);
		TouchScript.instance.removeScreenListener(this.mTouchImage);
	}

	public buyGunOnComplete(gunIds: number[]): void {
		this.gunIds = gunIds;
		// this.mBuyCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mBuyTextBlock.text = "使用";
		this.gunItmeMap.get(this.currentGunId).mLockTextBlock.visibility = mw.SlateVisibility.Collapsed;
	}

	//#region Camera
	private moveId: number = -1;
	private moveVec: number[] = [];
	private dir: number = 0;

	private movePos: mw.Vector2;
	private onMoveTouchEvent = (widget: mw.Widget, event: Enums.TouchEvent, x: number, y: number, inPointerEvent: mw.PointerEvent) => {
		if (this.movePos) {
			if (event == Enums.TouchEvent.DOWN) {
				if (this.moveId < 0) {
					this.moveId = inPointerEvent.pointerIndex;
					this.moveVec[0] = x;
					this.moveVec[1] = y;
				}
			} else if (event == Enums.TouchEvent.MOVE) {
				if (this.moveId >= 0) {
					let xoffset = x - this.moveVec[0];
					let yoffset = y - this.moveVec[1];
					this.dir = 0;
					if (Math.abs(xoffset) > Math.abs(yoffset)) {
						this.dir = Math.floor(xoffset);
					}
					this.moveVec[0] = x;
					this.moveVec[1] = y;
				}
			} else if (event == Enums.TouchEvent.UP) {
				if (this.moveId >= 0) {
					this.moveId = -1;
					this.dir = 0;
				}
			}
		}
	}

	protected onUpdate(dt: number): void {
		if (this.dir != 0) {
			this.gunModuleC.addRoatation(this.dir * dt);
			this.dir = 0;
		}
	}

	onTouchStarted(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
		return TouchScript.instance.onTouchStarted(inGemory, inPointerEvent);
	}

	onTouchMoved(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
		return TouchScript.instance.onTouchMoved(inGemory, inPointerEvent);
	}

	onTouchEnded(inGemory: mw.Geometry, inPointerEvent: mw.PointerEvent): mw.EventReply {
		return TouchScript.instance.onTouchEnded(inGemory, inPointerEvent);
	}

	public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	public hide(): void {
		mw.UIService.hideUI(this);
	}
	//#endregion
}