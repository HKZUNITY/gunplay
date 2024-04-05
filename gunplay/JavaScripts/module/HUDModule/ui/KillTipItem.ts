
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.12.21-21.54.19
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import KillTipItem_Generate from "../../../ui-generate/HUD/KillTipItem_generate";
import { KillTipData, KillTipType } from "../HUDModuleC";

export class KillTipItem extends KillTipItem_Generate {
	protected onAwake(): void {

	}

	public setInfo(killTipDatas: KillTipData): void {
		this.mKillerTextBlock.text = killTipDatas.killerName;
		this.mKilledTextBlock.text = killTipDatas.killedName;
		switch (killTipDatas.killTipType) {
			case KillTipType.None:
				this.mKillerTextBlock.fontColor = mw.LinearColor.white;
				this.mKillerTextBlock.shadowColor = mw.LinearColor.white;
				this.mKilledTextBlock.fontColor = mw.LinearColor.white;
				this.mKilledTextBlock.shadowColor = mw.LinearColor.white;
				break;
			case KillTipType.Killer:
				this.mKillerTextBlock.fontColor = mw.LinearColor.yellow;
				this.mKillerTextBlock.shadowColor = mw.LinearColor.red;
				this.mKilledTextBlock.fontColor = mw.LinearColor.white;
				this.mKilledTextBlock.shadowColor = mw.LinearColor.white;
				break;
			case KillTipType.Killed:
				this.mKillerTextBlock.fontColor = mw.LinearColor.white;
				this.mKillerTextBlock.shadowColor = mw.LinearColor.white;
				this.mKilledTextBlock.fontColor = mw.LinearColor.yellow;
				this.mKilledTextBlock.shadowColor = mw.LinearColor.red;
				break;
			default:
				break;
		}
		if (this.uiObject.visibility != mw.SlateVisibility.SelfHitTestInvisible) {
			this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
		setTimeout(() => {
			this.mBgImage.size = new mw.Vector2(this.mMainCanvas.size.x + 20, this.mMainCanvas.size.y);
		}, 1);
	}
}


