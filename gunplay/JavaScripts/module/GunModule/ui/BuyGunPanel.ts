
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.12.12-23.00.23
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { GameConfig } from "../../../config/GameConfig";
import Console from "../../../tools/Console";
import BuyGunPanel_Generate from "../../../ui-generate/Gun/BuyGunPanel_generate";
import { GunModuleC } from "../GunModuleC";

export class BuyGunPanel extends BuyGunPanel_Generate {
	private gunModuleC: GunModuleC = null;
	private gunId: number = 0;
	private isDirectUse: boolean = false;

	protected onStart(): void {
		this.layer = mw.UILayerTop;
		this.initData();
		this.bindButtons();
	}

	private initData(): void {
		this.gunModuleC = ModuleService.getModule(GunModuleC);
	}

	private bindButtons(): void {
		this.mCloseButton.onClicked.add(() => {
			this.hide();
		});
		this.mDiamondButton.onClicked.add(() => {
			if (this.gunModuleC.isBuyGunByDiamond(this.gunId, this.isDirectUse)) this.hide();
		});
		this.mCoinButton.onClicked.add(() => {
			if (this.gunModuleC.isBuyGunByCoin(this.gunId, this.isDirectUse)) this.hide();
		});
	}

	public showAndInitData(gunId: number, isDirectUse: boolean): void {
		this.gunId = gunId;
		this.isDirectUse = isDirectUse;
		let gunElement = GameConfig.Gun.getElement(this.gunId);
		mw.assetIDChangeIconUrlRequest([gunElement.GunIcon_M]).then(() => {
			try {
				this.mIconImage.setImageByAssetIconData(mw.getAssetIconDataByAssetID(gunElement.GunIcon_M));
			} catch (error) {
				Console.error("showAndInitData:" + error);
			}
		});
		let price = gunElement.Price;
		let gunType = gunElement.GunType;
		let gunTypeStr: string = "";
		if (gunType == 1) {
			this.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
			this.mCoinTextBlock.text = price[1].toString();
			gunTypeStr = "永久";
		} else if (gunType == 2) {
			this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
			gunTypeStr = "限时";
		}
		this.mDiamondTextBlock.text = price[0].toString();
		this.mNameTextBlock.text = gunElement.GunName + "\n(" + gunTypeStr + ")";

		this.show();
	}

	protected onShow(...params: any[]): void {

	}

	protected onHide(): void {

	}

	public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	public hide(): void {
		mw.UIService.hideUI(this);
	}
}