import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","GunName","GunPrefab","GunIcon","GunIcon_M","GunLoc","GunScale","IsTurnICON","GunType","Price","FireInterval","BulletCount","Hurt"],["","","","","","","","","","","","",""],[1,"M4A1卡宾枪","587777AD4056DC3AB465FBA7D3F5F7BA","101168","94153",new mw.Vector(-20,0,110),new mw.Vector(1,1,1),0,0,null,"0.1",30,25],[2,"AK47自动步枪","0D543D5346C331F41DA890A5E6DD3DB5","101171","95712",new mw.Vector(-20,0,110),new mw.Vector(1,1,1),0,1,[1,8888],"0.1",30,30],[3,"QBZ95式突击步枪","E3E0C2994D3518540DBB6D8C00C8AB83","120590","44974",new mw.Vector(0,0,110),new mw.Vector(1,1,1),0,1,[2,38888],"0.1",30,35],[4,"SCAR突击步枪","5181250F44DF914A714B668F99177E3A","120588","43712",new mw.Vector(-10,0,110),new mw.Vector(1,1,1),0,1,[2,40888],"0.1",30,35],[5,"突击步枪","1CD6AEAB4602DF140ACE93BD49D5CA19","120587","43710",new mw.Vector(-10,0,110),new mw.Vector(1,1,1),1,1,[3,48888],"0.07",20,25],[6,"MP5冲锋枪","A469CCC84AAA873815243BB25439707C","101167","99703",new mw.Vector(0,0,110),new mw.Vector(1,1,1),0,1,[3,58888],"0.07",35,25],[7,"MP7冲锋枪","68E812DC47B714F9A2BB2ABE18304C5B","101169","99701",new mw.Vector(-5,0,110),new mw.Vector(1,1,1),0,1,[3,60888],"0.07",35,25],[8,"P90冲锋枪","BA1BDC034FCDE8574CBBAA8C4831A950","120592","43734",new mw.Vector(10,0,110),new mw.Vector(1,1,1),0,1,[4,68888],"0.07",40,25],[9,"M249机枪","FCFE18BE440FAEBD5AB999A222F10AA9","101166","95717",new mw.Vector(-20,0,110),new mw.Vector(1,1,1),0,1,[4,78888],"0.1",100,30],[10,"激光幽灵枪","23240FEE4F3BD25DE8EA6DBE525B3A20",null,"122716",new mw.Vector(0,0,110),new mw.Vector(1,1,1),1,1,[5,80888],"1",5,70],[11,"激光巴雷特","015C826546EBC60F95EF399D16523B78","101165","99699",new mw.Vector(-30,0,110),new mw.Vector(1,1,1),1,1,[5,88888],"1",10,100],[12,"激光烈火枪","0C7F278C4254F90F69614086DCA0B906","101163","95676",new mw.Vector(-30,0,110),new mw.Vector(1,1,1),0,1,[10,188888],"0.3",40,80],[13,"激光冰雷枪","29CD5E6145D1B05590E887A050E0D3C8","66181","122720",new mw.Vector(-30,0,110),new mw.Vector(1,1,1),0,2,[3,-1],"0.3",40,90],[14,"赛博激光巴雷特","1172035A40E88AC00E32E98A96BA38B4",null,"99699",new mw.Vector(-30,0,110),new mw.Vector(1,1,1),0,1,[20,288888],"1",10,100],[15,"鸡枪","5F47861B4393F17B401DE1B260C37FFF",null,"20799",new mw.Vector(-30,0,110),new mw.Vector(1,1,1),0,2,[5,-1],"0.3",20,100],[16,"烟花枪","A830458640D6EA21FB7AEA8F7E029CB7",null,"122726",new mw.Vector(0,0,110),new mw.Vector(1,1,1),0,2,[5,-1],"1",0,0]];
export interface IGunElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**枪名字*/
	GunName:string
	/**枪预制体Guid*/
	GunPrefab:string
	/**枪ICON*/
	GunIcon:string
	/**枪模型*/
	GunIcon_M:string
	/**枪展示位置*/
	GunLoc:mw.Vector
	/**枪缩放*/
	GunScale:mw.Vector
	/**是否翻转ICON*/
	IsTurnICON:number
	/**0：免费
1：金币购买|Ads
2：ads*/
	GunType:number
	/**钻石|金币*/
	Price:Array<number>
	/**发射间隔*/
	FireInterval:string
	/**子弹*/
	BulletCount:number
	/**伤害*/
	Hurt:number
 } 
export class GunConfig extends ConfigBase<IGunElement>{
	constructor(){
		super(EXCELDATA);
	}

}