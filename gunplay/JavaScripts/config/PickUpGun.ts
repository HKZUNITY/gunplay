import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","GunObj","GunTrigger"],["","",""],[1,"333DE4C4","255CE64F"],[2,"3D2B4051","28506177"],[3,"02961BC2","2511CC9E"],[4,null,"163F882E"],[5,null,"030DDB66"],[6,null,"2D8AC32F"],[7,null,"17BE2BEA"],[8,null,"33E0D4A1"],[9,null,"009FCE0D"],[10,null,"29B89B25"],[11,null,"1479DEF2"],[12,null,"2D7A7E88"],[13,null,"3638E7E0"],[14,null,"035A5C25"],[15,null,"0665A4CD"],[16,null,"3C6AECDB"]];
export interface IPickUpGunElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**枪模型*/
	GunObj:string
	/**触发器*/
	GunTrigger:string
 } 
export class PickUpGunConfig extends ConfigBase<IPickUpGunElement>{
	constructor(){
		super(EXCELDATA);
	}

}