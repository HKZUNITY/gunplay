import {ConfigBase, IElementBase} from "./ConfigBase";
import {GunConfig} from "./Gun";
import {PickUpGunConfig} from "./PickUpGun";
import {RoleConfig} from "./Role";
import {SkillConfig} from "./Skill";
import {TaskConfig} from "./Task";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Gun():GunConfig{ return this.getConfig(GunConfig) };
	public static get PickUpGun():PickUpGunConfig{ return this.getConfig(PickUpGunConfig) };
	public static get Role():RoleConfig{ return this.getConfig(RoleConfig) };
	public static get Skill():SkillConfig{ return this.getConfig(SkillConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
}