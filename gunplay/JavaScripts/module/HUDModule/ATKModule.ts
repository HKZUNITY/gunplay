import { GameConfig } from "../../config/GameConfig";
import { ISkillElement } from "../../config/Skill";
import Console from "../../tools/Console";
import MyClearAct, { DongXiaoList } from "../PlayerModule/MyClearAct";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import HUDPanel from "./ui/HUDPanel";

export class ATKModuleC extends ModuleC<ATKModuleS, null> {
	private hudPanel: HUDPanel = null;
	public onAtkAction: Action = new Action();
	public onChangeSkillAction: Action1<number> = new Action1<number>();
	private skill: ISkillElement = null;

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		this.initDatas();
		this.bindAction();

		let i = 1;
		InputUtil.onKeyDown(mw.Keys.G, () => {
			this.onChangeSkillAction.call(i);
			i++;
			if (i > GameConfig.Skill.getAllElement().length) i = 1;
		});
	}

	private initDatas(): void {
		this.hudPanel = UIService.getUI(HUDPanel);
		GameConfig.Skill.getAllElement().forEach((value: ISkillElement) => {
			MyClearAct.instance.SkillLists.push(new DongXiaoList(value.SkillName, value.SkillJson));
		});
	}

	private bindAction(): void {
		this.onChangeSkillAction.add((skillId: number) => {
			this.skill = GameConfig.Skill.getElement(skillId);
			this.hudPanel.updateAtkCD(this.skill.SkillCD, this.skill.SkillDes);
		});

		this.onAtkAction.add(() => {
			this.localPlayer.character.movementEnabled = false;
			MyClearAct.actNow(this.localPlayer, this.skill.SkillName);
			TimeUtil.delaySecond(this.skill.SkillCD).then(() => {
				this.localPlayer.character.movementEnabled = true;
				if (this.skill.IsHasWeapon) MyClearAct.serverDetachAllEquip(this.localPlayer);
			});
		});
	}
}


export class ATKModuleS extends ModuleS<ATKModuleC, null> {
	private playerModuleS: PlayerModuleS = null;
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		this.playerModuleS = ModuleService.getModule(PlayerModuleS);
		MyClearAct.ServerDamageChar.push((AttackerID: string, VictimID: string, damage: number) => {
			Console.error(AttackerID, VictimID, damage);
			this.playerModuleS.playerAtkPlayerBySkill(AttackerID, VictimID, damage, null);
		});
	}
}