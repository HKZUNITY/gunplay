import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Role","Trigger","CameraAnchor","Price","Name","Rotation"],["","","","","","",""],[1,"219915","3999536C","1155DA0F",[0,0],"赛博少年",new mw.Vector(0,0,90)],[2,"141618","38883A1C","016FF16A",[1,5888],"时装男青年",new mw.Vector(0,0,90)],[3,"142272","111F6474","38302B3C",[1,18888],"机甲少女",new mw.Vector(0,0,90)],[4,"142255","1055CB6B","15FF1224",[1,20888],"纳米机甲女性",new mw.Vector(0,0,180)],[5,"219912","1A986145","1A650AFE",[2,25888],"赛博少女",new mw.Vector(0,0,180)],[6,"226915","1203EA84","1EAC8412",[2,28888],"赛博少女",new mw.Vector(0,0,180)],[7,"226913","0A5BB5A1","09062AA3",[3,30888],"赛博少年",new mw.Vector(0,0,180)],[8,"142153","2CEFA625","0CDBCE80",[3,35888],"眼镜未来战士",new mw.Vector(0,0,0)],[9,"219909","3785CE76","1F5AB414",[3,38888],"紫色机甲",new mw.Vector(0,0,0)],[10,"142396","37AABFC3","2EF41460",[4,40888],"黑人男纳米机甲",new mw.Vector(0,0,-90)],[11,"142397","10AE7159","331FC07A",[4,48888],"白人男纳米机甲",new mw.Vector(0,0,-90)]];
export interface IRoleElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**角色Guid*/
	Role:string
	/**触发器*/
	Trigger:string
	/**相机锚点*/
	CameraAnchor:string
	/**价格
钻石|金币*/
	Price:Array<number>
	/**名字*/
	Name:string
	/**旋转*/
	Rotation:mw.Vector
 } 
export class RoleConfig extends ConfigBase<IRoleElement>{
	constructor(){
		super(EXCELDATA);
	}

}