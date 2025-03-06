
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.12.12-22.40.49
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Notice } from "../../../common/notice/Notice";
import { EventType } from "../../../const/Enum";
import { cubicBezier } from "../../../tools/utils";
import HUDPanel_Generate from "../../../ui-generate/HUD/HUDPanel_generate";
import { ATKModuleC } from "../ATKModule";
import { HUDModuleC, KillTipData, KillTipType } from "../HUDModuleC";
import { KillTipItem } from "./KillTipItem";

export default class HUDPanel extends HUDPanel_Generate {
	private atkModuleC: ATKModuleC = null;
	private hudModuleC: HUDModuleC = null;

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;

		this.initDatas();
		this.bindButtons();
		this.initKillTipItems();
	}

	private initDatas(): void {
		this.hudModuleC = ModuleService.getModule(HUDModuleC);
		this.atkModuleC = ModuleService.getModule(ATKModuleC);
		this.initTaskTween();
		this.mRedPointImage.visibility = mw.SlateVisibility.Collapsed;
		this.mDieCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.initFlickerText();
		this.mKillTipCountCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.mKillTipTextBlock3.visibility = mw.SlateVisibility.Collapsed;
	}

	private bindButtons(): void {
		this.mAddCoinButton.onClicked.add(() => {
			this.hudModuleC.onAddCoinAction.call();
		});
		this.mAddDiamondButton.onClicked.add(() => {
			this.hudModuleC.onAddDiamondAction.call();
		});
		this.mTeamButton.onClicked.add(() => {
			this.hudModuleC.onOpenTeamAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.mGunButton.onClicked.add(() => {
			this.hudModuleC.onOpenGunAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.mRoleButton.onClicked.add(() => {
			this.hudModuleC.onOpenRoleAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.mLoginButton.onClicked.add(() => {
			this.hudModuleC.onOpenLoginAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.mRankButton.onClicked.add(() => {
			this.hudModuleC.onOpenRankAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.mLotteryButton.onClicked.add(() => {
			this.hudModuleC.onOpenLotteryAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.mTaskButton.onClicked.add(() => {
			this.hudModuleC.onOpenTaskAction.call();
			Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		this.bindSetButton();
		this.bindATKButton();

		this.mClothButton.onClicked.add(async () => {
			await AvatarEditorService.asyncOpenAvatarEditorModule();
			this.mVirtualJoystickPanel.resetJoyStick();
		});
		mw.AvatarEditorService.avatarServiceDelegate.add(this.addAvatarServiceDelegate.bind(this));
	}

	private addAvatarServiceDelegate(eventName: string, ...params: unknown[]): void {
		console.error(`eventName: ${eventName}`);
		switch (eventName) {
			case "AE_OnQuit":
				Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
				break;
			case "AE_OnOpen":
				Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
				break;
		}
	}

	private initKillTipItems(): void {
		for (let i = 0; i < 4; ++i) {
			let killTipItem = UIService.create(KillTipItem);
			killTipItem.uiObject.position = new mw.Vector2(0, 37 * i);
			killTipItem.uiObject.visibility = mw.SlateVisibility.Collapsed;
			this.mKillTipCanvas.addChild(killTipItem.uiObject);
			this.killTipItems.push(killTipItem);
		}
	}

	private hideKillTipIntervalId: any = null;
	private killTipItems: KillTipItem[] = [];
	private killTipDatas: KillTipData[] = [];
	public killTip(killTipType: KillTipType, killerName: string, killedName: string): void {
		let killTipData: KillTipData = new KillTipData();
		killTipData.killTipType = killTipType;
		killTipData.killerName = killerName;
		killTipData.killedName = killedName;
		if (this.killTipDatas.length >= 4) {
			this.killTipDatas.shift();
		}
		this.killTipDatas.push(killTipData);
		this.updateKillTipItems();

		this.clearHideKillTipIntervalId();
		this.hideKillTipIntervalId = TimeUtil.setInterval(() => {
			if (this.killTipDatas && this.killTipDatas.length > 0) {
				this.killTipDatas.shift();
				this.updateKillTipItems();
			} else {
				this.clearHideKillTipIntervalId();
			}
		}, 5);
	}

	private clearHideKillTipIntervalId(): void {
		if (this.hideKillTipIntervalId) {
			TimeUtil.clearInterval(this.hideKillTipIntervalId);
			this.hideKillTipIntervalId = null;
		}
	}

	private updateKillTipItems(): void {
		for (let i = 0; i < this.killTipDatas.length; ++i) {
			this.killTipItems[i].setInfo(this.killTipDatas[i]);
		}
		for (let i = this.killTipDatas.length; i < 4; ++i) {
			if (this.killTipItems[i].uiObject.visibility != mw.SlateVisibility.Collapsed) {
				this.killTipItems[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
			}
		}
	}

	//#region 任务
	private taskRedPointTween1: mw.Tween<any> = null;
	private taskRedPointTween2: mw.Tween<any> = null;
	public startTaskRedPointTween(): void {
		if (this.taskRedPointTween1) {
			this.taskRedPointTween1.start();
		} else {
			this.initTaskTween();
			this.taskRedPointTween1.start();
		}
		this.mRedPointImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
	}
	public stopTaskRedPointTween(): void {
		if (this.taskRedPointTween1) {
			this.taskRedPointTween1.stop();
		}
		if (this.taskRedPointTween2) {
			this.taskRedPointTween2.stop();
		}
		this.mRedPointImage.visibility = mw.SlateVisibility.Collapsed;
	}
	private initTaskTween(): void {
		this.taskRedPointTween1 = new mw.Tween({ value: 0.8 })
			.to({ value: 1.2 }, 0.2 * 1000)
			.onStart(() => {
				this.mRedPointImage.renderScale = mw.Vector2.one.multiply(0.8);
			})
			.onUpdate((v) => {
				this.mRedPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.taskRedPointTween2.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));

		this.taskRedPointTween2 = new mw.Tween({ value: 1.2 })
			.to({ value: 0.8 }, 0.2 * 1000)
			.onStart(() => {
				this.mRedPointImage.renderScale = mw.Vector2.one.multiply(1.2);
			})
			.onUpdate((v) => {
				this.mRedPointImage.renderScale = mw.Vector2.one.multiply(v.value);
			})
			.onComplete(() => {
				this.taskRedPointTween1.start();
			})
			.easing(cubicBezier(0.25, 0.1, 0.25, 1));
	}
	//#endregion

	private countDownInterval: any = null;
	private countDown: number = 3;
	public startCountDown(): void {
		this.mVirtualJoystickPanel.resetJoyStick();
		this.mDieCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.countDown = 3;
		this.mCountDownTextBlock.text = this.countDown-- + "";
		this.clearCountDownInterval();
		this.countDownInterval = TimeUtil.setInterval(() => {
			this.mCountDownTextBlock.text = this.countDown-- + "";
			if (this.countDown < 0) this.clearCountDownInterval();
		}, 1);
	}

	private clearCountDownInterval(): void {
		if (this.countDownInterval) {
			TimeUtil.clearInterval(this.countDownInterval);
			this.countDownInterval = null;
		}
	}

	public endCountDown(): void {
		this.mDieCanvas.visibility = mw.SlateVisibility.Collapsed;
		this.clearCountDownInterval();
	}

	//#region Set
	public initSetData(fireScale: number, controlScale: number, bgmVolume: number): void {
		this.hudModuleC = ModuleService.getModule(HUDModuleC);
		this.mFireProgressBar.currentValue = fireScale;
		this.mControlProgressBar.currentValue = controlScale;
		this.mBgmProgressBar.currentValue = bgmVolume;
		this.mTouchPad.inputScale = new mw.Vector2(controlScale, controlScale);
		this.mSetCanvas.visibility = mw.SlateVisibility.Collapsed;
	}
	private bindSetButton(): void {
		this.mSetButton.onClicked.add(() => {
			if (this.mSetCanvas.visibility == mw.SlateVisibility.SelfHitTestInvisible) return;
			this.mSetCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		});
		this.mSetCloseButton.onClicked.add(() => {
			if (this.mSetCanvas.visibility == mw.SlateVisibility.Collapsed) return;
			this.mSetCanvas.visibility = mw.SlateVisibility.Collapsed;
			this.hudModuleC.saveSetData();
		});

		this.mFireProgressBar.onSliderValueChanged.add((value: number) => {
			this.hudModuleC.onFireScaleAction.call(value);
		});

		this.mControlProgressBar.onSliderValueChanged.add((value: number) => {
			this.hudModuleC.onControlScaleAction.call(value);
			this.mTouchPad.inputScale = new mw.Vector2(value, value);
		});

		this.mBgmProgressBar.onSliderValueChanged.add((value: number) => {
			this.hudModuleC.onBgmVolumeAction.call(value);
		});
	}
	//#endregion

	//#region ATK
	private bindATKButton(): void {
		this.mMaskButton.clickedDelegate.add(() => {
			this.atkModuleC.onAtkAction.call();
			let tmpCD = this.maxAtkCD;
			new mw.Tween({ x: 0 })
				.to({ x: 1 }, this.maxAtkCD * 1000)
				.onStart(() => {
					this.mMaskButton.enable = false;
					this.mMaskButton.fanShapedValue = 0;
					this.mCDTextBlock.text = tmpCD.toFixed(1);
				})
				.onUpdate((v) => {
					this.mMaskButton.fanShapedValue = v.x;
					this.mCDTextBlock.text = (tmpCD - v.x * tmpCD).toFixed(1);
				})
				.onComplete(() => {
					this.mMaskButton.fanShapedValue = 1;
					this.mMaskButton.enable = true;
					this.mCDTextBlock.text = "";
				})
				.start();
		});
	}
	private maxAtkCD: number = 5;
	public updateAtkCD(cd: number, skillName: string): void {
		this.maxAtkCD = cd;
		this.mMaskButton.fanShapedValue = 1;
		this.mMaskButton.enable = true;
		this.mCDTextBlock.text = "";
		this.mSkillNameTextBlock.text = skillName;
	}
	//#endregion

	//#region 复活无敌
	public showInvincibleTimeUI(invincibleTime: number): void {
		new mw.Tween({ x: 0 })
			.to({ x: 1 }, invincibleTime * 1000)
			.onStart(() => {
				this.setCanvasVisibility(this.mInvincibleCanvas, mw.SlateVisibility.SelfHitTestInvisible);
				this.mInvincibleProgressBar.currentValue = 0;
				this.startFlickerText();
			})
			.onUpdate((v) => {
				this.mInvincibleProgressBar.currentValue = v.x;
			})
			.onComplete(() => {
				this.setCanvasVisibility(this.mInvincibleCanvas, mw.SlateVisibility.Collapsed);
				this.stopFlickerText();
			})
			.start();
	}
	private setCanvasVisibility(canvas: mw.Canvas, visibility: mw.SlateVisibility): void {
		if (canvas.visibility != visibility) canvas.visibility = visibility;
	}

	private flickerTextTween1: Tween<any> = null;
	private flickerTextTween2: Tween<any> = null;
	private initFlickerText(): void {
		this.setCanvasVisibility(this.mInvincibleCanvas, mw.SlateVisibility.Collapsed);
		this.flickerTextTween1 = new mw.Tween({ x: 1 })
			.to({ x: 0 }, 0.4 * 1000)
			.onStart(() => {
				this.mInvincibleTextBlock.renderOpacity = 1;
			})
			.onUpdate((v) => {
				this.mInvincibleTextBlock.renderOpacity = v.x;
			})
			.onComplete(() => {
				this.flickerTextTween2.start();
			});
		this.flickerTextTween2 = new mw.Tween({ x: 0 })
			.to({ x: 1 }, 0.4 * 1000)
			.onStart(() => {
				this.mInvincibleTextBlock.renderOpacity = 0;
			})
			.onUpdate((v) => {
				this.mInvincibleTextBlock.renderOpacity = v.x;
			})
			.onComplete(() => {
				this.flickerTextTween1.start();
			});
	}
	private startFlickerText(): void {
		if (this.flickerTextTween1) this.flickerTextTween1.start();
	}
	private stopFlickerText(): void {
		if (this.flickerTextTween1) this.flickerTextTween1.stop();
		if (this.flickerTextTween2) this.flickerTextTween2.stop();
	}
	//#endregion

	//#region 连杀提示
	private killTipsTimeOutId1: any = null;
	private killTipsTimeOutId2: any = null;
	public showKillTips1(killTips: string, killerName: string, killedName: string): void {
		Notice.showDownNotice("<color=#lime>" + "<size=18>" + killerName + " 击杀了 " + killedName + "</size>" + "</color>"
			+ "\n" + "<color=#red>完成了" + killTips + "</color>");
	}

	private clearKillTipsTimeOutId1(): void {
		if (this.killTipsTimeOutId1) {
			clearTimeout(this.killTipsTimeOutId1);
			this.killTipsTimeOutId1 = null;
		}
	}

	public showKillTips2(killerName: string, killedName: string, killTipType: KillTipType): void {
		if (killTipType == KillTipType.None) return;
		this.clearKillTipsTimeOutId2();
		if (killTipType == KillTipType.Killed) {
			this.mKillTipTextBlock3.text = "你已被 " + killerName + " 击杀";
		} else if (killTipType == KillTipType.revenge) {
			this.mKillTipTextBlock3.text = "击杀 " + killedName + " 完成复仇";
		}
		this.mKillTipTextBlock3.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.killTipsTimeOutId2 = setTimeout(() => {
			this.mKillTipTextBlock3.visibility = mw.SlateVisibility.Collapsed;
			this.clearKillTipsTimeOutId2();
		}, 3 * 1000);
	}

	private clearKillTipsTimeOutId2(): void {
		if (this.killTipsTimeOutId2) {
			clearTimeout(this.killTipsTimeOutId2);
			this.killTipsTimeOutId2 = null;
		}
	}
	//#endregion
}