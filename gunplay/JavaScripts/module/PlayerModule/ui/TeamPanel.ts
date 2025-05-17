
/** 
 * AUTHOR: 爱玩游戏的小胖子
 * TIME: 2023.12.12-22.53.29
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { Notice } from "../../../common/notice/Notice";
import { EventType } from "../../../const/Enum";
import Globaldata from "../../../const/Globaldata";
import Helper from "../../../const/Helper";
import Console from "../../../tools/Console";
import { Utils } from "../../../tools/utils";
import TeamItem_Generate from "../../../ui-generate/Team/TeamItem_generate";
import TeamPanel_Generate from "../../../ui-generate/Team/TeamPanel_generate";
import { PlayerModuleC } from "../PlayerModuleC";
import { TeamData } from "../PlayerModuleS";
import InputPanel from "./InputPanel";

export class TeamItem extends TeamItem_Generate {
	private inputPanel: InputPanel = null;
	protected onStart(): void {
		this.inputPanel = UIService.getUI(InputPanel);

		for (let i = 0; i < 2; ++i) {
			this["mTextBlock_" + (i + 1)].text = "";
			// this["mCanvas_" + (i + 1)].visibility = mw.SlateVisibility.Collapsed;
		}
		this.mTextBlock_3.text = "队名（可改）";
		this.mTextBlock_3_1.text = "人数：" + 0;

		this.mButton.onClicked.add(async () => {
			let isCanChangeTeam = await ModuleService.getModule(PlayerModuleC).isCanChangeTeam(this.teamId);
			if (!isCanChangeTeam) Notice.showDownNotice("已加入或已满");
		});

		this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;

		this.mButton1.onClicked.add(() => {
			this.inputPanel.show();
			this.inputPanel.onSureAction.add((text: string) => {
				this.mTextBlock_3.text = text;
			});
		});
		this.mButton1.visibility = mw.SlateVisibility.Collapsed;
		// this.updateIcon();
		this.unSelect();
	}

	private async updateIcon(): Promise<void> {
		let index = Helper.getRandomNum(0, Globaldata.TeamIcon.length - 1);
		let icon = Globaldata.TeamIcon[index];
		if (!mw.AssetUtil.assetLoaded(icon)) {
			await mw.AssetUtil.asyncDownloadAsset(icon);
		}
		// this.mImage_4.imageGuid = icon;
		// this.mImage_4.size = Globaldata.TeamIconSize[index];
		// this.mImage_4.position = Globaldata.TeamIconPos[index];
	}

	private teamId: number = 0;

	public initData(id: number): void {
		this.teamId = id;
	}

	public setData(names: string[]): void {
		let namesLen = names.length;
		for (let i = 0; i < namesLen; ++i) {
			this["mTextBlock_" + (i + 1)].text = names[i];
			// this["mCanvas_" + (i + 1)].visibility = mw.SlateVisibility.SelfHitTestInvisible;
		}
		for (let i = namesLen; i < 2; ++i) {
			this["mTextBlock_" + (i + 1)].text = "";
			// this["mCanvas_" + (i + 1)].visibility = mw.SlateVisibility.Collapsed;
		}
		Console.error("namesLen = " + namesLen);
		this.mTextBlock_3_1.text = "人数：" + namesLen;
		this.mTextBlock.text = namesLen == 2 ? "已满" : "加入";
	}

	public select(): void {
		// this.mSelectImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
		this.showHideBtn(true);
	}

	public unSelect(): void {
		// this.mSelectImage.visibility = mw.SlateVisibility.Collapsed;
		this.showHideBtn(false);
		this.inputPanel.onSureAction.clear();
	}

	public showHideBtn(isShow: boolean): void {
		return;
		this.mButton1.visibility = isShow ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
	}
}

export class TeamPanel extends TeamPanel_Generate {
	private teamItems: TeamItem[] = [];

	protected onAwake(): void {
		this.initDatas();
	}

	protected onStart(): void {
		this.bindButtons();
	}

	private bindButtons(): void {
		this.mCloseButton.onClicked.add(() => {
			this.hideTween();
		});
	}

	private initDatas(): void {
		for (let i = 0; i < Globaldata.teamCount; ++i) {
			let teamItem = UIService.create(TeamItem);
			this.mCanvas.addChild(teamItem.uiObject);
			teamItem.initData(i + 1);
			this.teamItems.push(teamItem);
		}
	}

	public setAllData(nameMap: Map<number, TeamData[]>): void {
		nameMap.forEach((teamDatas, teamId) => {
			let names: string[] = [];
			teamDatas.forEach(teamData => {
				names.push(teamData.playerName);
			});
			if (!names) return;
			this.teamItems[teamId - 1].setData(names);
		});
	}

	public setOneData(teamId: number, teamDatas: TeamData[]): void {
		let names: string[] = [];
		if (teamDatas) {
			teamDatas.forEach(teamData => {
				names.push(teamData.playerName);
			});
		}
		Console.error("teamId = " + teamId);
		this.teamItems[teamId - 1].setData(names);
	}

	public setChangeData(curTeam: number, curTeamDatas: TeamData[], toTeam: number, toTeamDatas: TeamData[]): void {
		this.setOneData(curTeam, curTeamDatas);
		this.setOneData(toTeam, toTeamDatas);
	}

	public selectTeam(teamId: number): void {
		this.teamItems[teamId - 1].select();
	}

	public unSelectTeam(teamId: number): void {
		this.teamItems[teamId - 1].unSelect();
	}

	public show(...param): void {
		mw.UIService.showUI(this, this.layer, ...param);
	}

	public hide(): void {
		mw.UIService.hideUI(this);
	}

	protected onShow(...params: any[]): void {
		Utils.openUITween(
			this.rootCanvas,
			() => {
				// this.hudPanel.hide();
			},
			null
		);
	}

	/**
	 * 隐藏缓动
	 */
	public hideTween(): void {
		Utils.closeUITween(
			this.rootCanvas,
			null,
			() => {
				this.hide();
				Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
				Event.dispatchToLocal("IsOpenUI", true);
			});
	}
}
