
/**
* MyClearAct 简单好用的动效编辑器 
* 反馈帖: https://forum.ark.online/forum.php?mod=viewthread&tid=1297
* 版本：v0.1.9 2023.12.16  
* 更新日志：
* 1. 修整方法和事件，并给事件添加参数、回调
* 2. 添加受击音效
* 3. 添加设定，在非编辑器PIE运行态下不会打开EditorUI，及时开启了这个选项
* 4. 方法修改为静态，以减少时序问题
* 作者：guangqi.hu
*/

import Console from "../../tools/Console";

/** 特效参数结构 */
class EffNode {
    public guid: string;
    public time: number;
    public distance: number;
    public zOffset: number;
    public yaw: number;
    public scale: Vector;
    public rotate: Rotation;
    public EffSlot: number;
    constructor() {
        this.guid = "7810";
        this.time = 1;
        this.distance = 100;
        this.zOffset = 50;
        this.yaw = 0;
        this.scale = new Vector(1, 1, 1);
        this.rotate = new Rotation(0, 0, 0);
        this.EffSlot = -1;
    }
}

/** 动画参数结构 */
class AniNode {
    public guid: string;
    public totalTime: number;
    public progress: number;
    public AnimSlot: number;
    constructor() {
        this.guid = "21615";
        this.totalTime = 1.5;
        this.progress = 1;
        this.AnimSlot = 0;
    }
}

/** 音效参数结构 */
class SoundNode {
    public guid: string;
    public volume: number;
    public inner: number;
    public outter: number;
    public stopTime: number;
    constructor() {
        this.guid = "47417";
        this.volume = 1;
        this.inner = 200;
        this.outter = 600;
        this.stopTime = 0;
    }
}

/** 位移参数结构 */
class WeiYiNode {
    public lenth: number;
    public zOffset: number;
    public yaw: number;
    public time: number;
    public checkCount: number;
    constructor() {
        this.lenth = 300;
        this.zOffset = 50;
        this.yaw = 0;
        this.time = 0.3;
        this.checkCount = 6;
    }
}

/** 球、圆柱型判定参数结构 */
class YuanNode {
    public distance: number;
    public yaw: number;
    public zOffset: number;
    public radius: number;
    public height: number;
    public damage: number;
    constructor() {
        this.distance = 100;
        this.yaw = 0;
        this.zOffset = -30;
        this.radius = 50;
        this.height = 20;
        this.damage = 50;
    }
}

/** 盒型判定参数结构 */
class BoxNode {
    public distance: number;
    public yaw: number;
    public pitch: number;
    public zOffset: number;
    public lenth: number;
    public width: number;
    public height: number;
    public damage: number;
    constructor() {
        this.distance = 30;
        this.yaw = 0;
        this.pitch = 15;
        this.zOffset = 10;
        this.lenth = 300;
        this.width = 150;
        this.height = 100;
        this.damage = 30;
    }
}
/** 装备参数结构 */
class EquipNode {
    public guid: string;
    public location: Vector;
    public scale: Vector;
    public rotate: Rotation;
    public SlotType: number;
    constructor() {
        this.guid = "40715";
        this.location = new Vector(1, 1, 1);
        this.scale = new Vector(1, 1, 1);
        this.rotate = new Rotation(0, 0, 0);
        this.SlotType = 16;
    }
}
/** 延迟参数结构 */
class DelayNode {
    public delayTime: number;
    constructor() {
        this.delayTime = 0.3;
    }
}

@Serializable
export class DongXiaoList {
    @mw.Property({ displayName: "技能名" })
    public skillName: string = "";
    @mw.Property({ displayName: "技能Json" })
    public skillJson: string = "";
    constructor(a?: string, b?: string) {
        this.skillName = a ?? "";
        this.skillJson = b ?? "";
    }
}

/************************************
 *  导出口
 ************************************/
@Component
export default class MyClearAct extends mw.Script {

    @mw.Property({ displayName: "是否开启编辑状态", group: "全局配置", tooltip: "开启时，进入游戏会打开动效编辑器；关闭时则不会打开" })
    public enableEditor: boolean = true;
    @mw.Property({ displayName: "优先加载", group: "全局配置", tooltip: "在这里填入需要优先加载的GUID，然后ctrl+s保存该工程，不用担心重复，onStart里有处理" })
    AutoloadAssets: string = "29392,46284,21615,47417,7986"
    @mw.Property({ displayName: "受击特效", group: "全局配置", tooltip: "被击中时受击角色身上的特效" })
    public hitEffect: string = "29392";
    @mw.Property({ displayName: "受击动画", group: "全局配置", tooltip: "被击中时受击角色会播的动画" })
    public hitAinim: string = "46284";
    @mw.Property({ displayName: "受击音效", group: "全局配置", tooltip: "被击中时受击角色会播的音效" })
    public hitSound: string = "46284";
    @mw.Property({ displayName: "类", group: "技能列表" })
    public SkillLists: DongXiaoList[] = [new DongXiaoList("default", '["动画节点","{\\"guid\\":\\"29714\\",\\"totalTime\\":1.5,\\"progress\\":1,\\"AnimSlot\\":1}","延迟节点","{\\"delayTime\\":0.3}","音效节点","{\\"guid\\":\\"21210\\",\\"volume\\":1,\\"inner\\":200,\\"outter\\":600,\\"stopTime\\":0}","延迟节点","{\\"delayTime\\":0.4}","特效节点","{\\"guid\\":\\"123289\\",\\"time\\":1,\\"distance\\":150,\\"zOffset\\":10,\\"yaw\\":0,\\"scale\\":{\\"x\\":0.5,\\"y\\":0.5,\\"z\\":0.5},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":90},\\"EffSlot\\":-1}","延迟节点","{\\"delayTime\\":0.1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":0,\\"lenth\\":350,\\"width\\":60,\\"height\\":60,\\"damage\\":60}","延迟节点","{\\"delayTime\\":0.1}","音效节点","{\\"guid\\":\\"7986\\",\\"volume\\":1,\\"inner\\":200,\\"outter\\":600,\\"stopTime\\":0}"]')];


    /**是否显示界面、碰撞绘制 */
    public isVisible: boolean = true;

    /**角色_插槽：装备静态模型 */
    public charEquipMents: Map<string, mw.GameObject> = new Map();


    /**当前是否在使用技能 */
    public isActing: boolean = false;

    /**是否需要停下技能 */
    public BNeedStop: boolean = false;


    // _isReady 标志用于指示 MyClearAct 是否已经准备就绪
    private static _isReady = false;
    // _instance 用于存储 MyClearAct 的实例
    private static _instance: MyClearAct | null = null;
    // _queuedOperations 数组用于存储还未执行的方法调用
    private static _queuedOperations: (() => void)[] = [];
    // instance 属性用于获取 MyClearAct 的实例
    public static get instance() {
        // 如果实例尚未创建，则创建一个代理（Proxy）
        if (!MyClearAct._instance) {
            MyClearAct._instance = new Proxy({}, {
                get: (target, prop) => {
                    // 如果已经准备就绪，直接返回实例的方法或属性
                    if (MyClearAct._isReady) {
                        return MyClearAct._instance[prop];
                    } else {
                        // 如果尚未准备就绪，返回一个函数，将操作加入队列中
                        return (...args: any[]) => {
                            MyClearAct._queuedOperations.push(() => MyClearAct._instance[prop](...args));
                        };
                    }
                }
            }) as MyClearAct;
        }
        return MyClearAct._instance;
    }

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart() {
        // 初始化真正的 MyClearAct 实例
        MyClearAct._instance = this;
        MyClearAct._isReady = true;

        // 执行队列中的操作
        MyClearAct._queuedOperations.forEach(operation => operation());
        MyClearAct._queuedOperations = [];
        Console.log("[MyClearAct] 初始化成功");


        this.useUpdate = true;
        this.isVisible = this.enableEditor;
        if (SystemUtil.isClient()) {
            this.SkillLists.forEach(async (value: DongXiaoList) => {
                let skJson = value.skillJson;
                let str = JSON.parse(skJson) as string[];
                // Console.log("str " + str);
                const guids = new Set<string>();
                str.forEach((item) => {
                    const match = /"guid":"(\d+)"/.exec(item);
                    if (match) {
                        // guids.add(match[1]);
                        if (!AssetUtil.assetLoaded(match[1])) {
                            AssetUtil.asyncDownloadAsset(match[1]).then((ok: boolean) => {
                                if (ok) {
                                    Console.log("[MyClearAct] 加载资源：" + match[1] + " 成功");
                                } else {
                                    Console.warn("[MyClearAct] 加载资源：" + match[1] + " 失败，请检查一下资源");
                                }
                            });
                        }
                    }
                });
            })

            // 进游戏时预加载
            let pload = this.AutoloadAssets.split(",") as string[];
            pload.forEach((guid: string) => {
                if (!AssetUtil.assetLoaded(guid)) {
                    AssetUtil.asyncDownloadAsset(guid).then((ok: boolean) => {
                        if (ok) {
                            Console.log("[MyClearAct] 加载资源：" + guid + " 成功");
                        } else {
                            Console.warn("[MyClearAct] 加载资源：" + guid + " 失败，请检查一下资源");
                        }
                    });
                }
            })

            setTimeout(() => {
                if (this.enableEditor && SystemUtil.isPIE) {
                    let mainui = mw.UIService.create(MainUI);
                    mw.UIService.showUI(mainui);
                }
            }, 700);
        }
        if (SystemUtil.isServer()) {
            Player.onPlayerLeave.add((player: mw.Player) => {
                // Console.log("he left");
                MyClearAct.serverDetachAllEquip(player);

            })
        }

    }

    /**让玩家执行某个技能
     * @param player 玩家
     * @param skName 技能名，在MyClearAct属性面板里注册
     */
    @RemoteFunction(mw.Client)
    public static actNow(player: mw.Player, skName: string) {

        let skJson: string = undefined;
        MyClearAct.instance.isActing = true;
        MyClearAct.instance.SkillLists.forEach(async (value: DongXiaoList) => {
            if (value.skillName == skName) {
                skJson = value.skillJson;
                if (skJson != undefined) {
                    let MyStringArr = JSON.parse(skJson) as string[];
                    for (let index = 0; index < MyStringArr.length; index++) {
                        // 当攻击者被击倒，即布娃娃系统开启，中断技能释放
                        if (player.character.ragdollEnabled) {
                            MyClearAct.instance.isActing = false;
                            break;
                        }
                        // 当攻击者被系统停下技能，中断技能释放
                        if (MyClearAct.instance.BNeedStop == true) {
                            MyClearAct.instance.isActing = false;
                            MyClearAct.instance.BNeedStop = false;
                            break;
                        }
                        if (index % 2 == 0) {
                            let NodeName = MyStringArr[index]
                            let UINODE = MyStringArr[index + 1];
                            if (NodeName == "特效节点") {
                                let node = JSON.parse(UINODE) as EffNode;

                                if (node.EffSlot < 0) {
                                    let rottat = v3toString(node.rotate);

                                    let parts1 = rottat.split("|").map(parseFloat);
                                    if (parts1.length != 3 || parts1.some(isNaN)) {
                                        parts1[0] = 0; parts1[1] = 0; parts1[2] = 0;
                                    }

                                    let pro = v3toString(player.character.worldTransform.rotation);

                                    let parts2 = pro.split("|").map(parseFloat);
                                    if (parts2.length != 3 || parts2.some(isNaN)) {
                                        parts2[0] = 0; parts2[1] = 0; parts2[2] = 0;
                                    }
                                    let addR = parts1[0] + "|" + parts1[1] + "|" + (parts1[2] + parts2[2] + "");
                                    // Console.log("addR: " + addR);


                                    let roro = stringToRotation(addR);

                                    // Console.log("roro: " + JSON.stringify(roro));


                                    node.rotate = roro;
                                }

                                let newv3 = v3toString(node.scale);
                                node.scale = stringToVector(newv3);

                                MyClearAct.instance.serverPlayEffect(player, node.guid, node.time, node.distance, node.zOffset, node.yaw, node.scale, node.rotate, node.EffSlot);
                            }
                            if (NodeName == "动画节点") {
                                let node = JSON.parse(UINODE) as AniNode;
                                MyClearAct.instance.serverPlayAnimotion(player, node.guid, node.totalTime, node.progress, node.AnimSlot);
                            }
                            if (NodeName == "音效节点") {
                                let node = JSON.parse(UINODE) as SoundNode;
                                MyClearAct.instance.serverPlay3DSound(player, node.guid, node.volume, node.inner, node.outter, node.stopTime);
                            }
                            if (NodeName == "位移节点") {
                                let node = JSON.parse(UINODE) as WeiYiNode;
                                MyClearAct.instance.weiYi(player, node.lenth, node.zOffset, node.yaw, node.time, node.checkCount)
                            }
                            if (NodeName == "球圆判定") {
                                let node = JSON.parse(UINODE) as YuanNode;
                                MyClearAct.instance.yuanPanding(player, node.distance, node.yaw, node.zOffset, node.radius, node.height, node.damage, skName, ((index / 2) + 1))
                            }
                            if (NodeName == "方盒判定") {
                                let node = JSON.parse(UINODE) as BoxNode;
                                MyClearAct.instance.boxPanding(player, node.distance, node.yaw, node.pitch, node.zOffset, node.lenth, node.width, node.height, node.damage, skName, ((index / 2) + 1))
                            }
                            if (NodeName == "装备节点") {
                                let node = JSON.parse(UINODE) as EquipNode;
                                MyClearAct.serverEquipMe(player, node.guid, node.location, node.scale, node.rotate, node.SlotType);
                            }
                            if (NodeName == "延迟节点") {
                                let node = JSON.parse(UINODE) as DelayNode;
                                await new Promise((resolve) => setTimeout(resolve, node.delayTime * 1000));
                            }
                        }
                    }

                    MyClearAct.instance.isActing = false;
                }
            }
        })
    }

    /** [仅服务器] 查询物主
     * @param objGUID 需要查询的物品的guid
     * @returns 物主player
     */
    public static whoIsOwner(objGUID: string): mw.Player {
        let ReturnPid = null;
        MyClearAct.instance.charEquipMents.forEach((v, k) => {
            if (v.gameObjectId == objGUID) {
                Player.getAllPlayers().forEach((p) => {
                    Console.log("k: " + k + " UserId: " + p.userId);
                    let Pid = p.userId;
                    if (k.includes(Pid)) {
                        ReturnPid = p;
                    }
                })
            }
        })
        return ReturnPid;
    }


    /**让玩家停止执行技能，并清除所有装备节点
     * @param player 玩家
     */
    @RemoteFunction(mw.Client)
    public static stopNow(player: mw.Player) {
        if (MyClearAct.instance.isActing) {
            MyClearAct.instance.BNeedStop = true;
            this.serverDetachAllEquip(player);
        }
    }
    protected onUpdate(dt: number): void {
    }

    /**检测某个string是否为纯数字 */
    public isNumeric(input: string): boolean {
        const pattern = /^\d+$/;
        return pattern.test(input);
    }

    /**装备/去除装备
     * @param Attacker 需要执行装备操作的玩家
     * @param guid 装备的静态模型guid，<0则视为要清除该插槽的装备
     * @param location 装备的相对位置
     * @param scale 装备的相对缩放
     * @param rotate 装备的相对选装
     * @param SlotType 装备需要装在角色的哪个插槽，常用15左手|16右手|12背部，已有的话会清除旧的装新的，如果guid<0且SlotType<0即清除身上所有装备
     */
    @RemoteFunction(mw.Server)
    public static serverEquipMe(Attacker: mw.Player, guid: string, location: Vector, scale: Vector, rotate: Rotation, SlotType: number) {
        location = new Vector(location.x, location.y, location.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        rotate = new Rotation(rotate.x, rotate.y, rotate.z);

        let pid = Attacker.userId;
        let equipId = "Peqp_" + pid + SlotType.toString();


        if (!guid.match(".*[a-zA-Z].*") && Number(guid) <= 0) {
            if (SlotType > 0) {
                if (MyClearAct.instance.charEquipMents.get(equipId)) {
                    MyClearAct.instance.charEquipMents.get(equipId).destroy();
                    MyClearAct.instance.charEquipMents.delete(equipId);
                }

            }
            else {
                this.serverDetachAllEquip(Attacker);
            }
        } else {
            if (!AssetUtil.assetLoaded(guid)) {
                AssetUtil.asyncDownloadAsset(guid).then(() => {

                    if (MyClearAct.instance.charEquipMents.get(equipId)) {
                        MyClearAct.instance.charEquipMents.get(equipId).destroy();
                    }
                    GameObject.asyncSpawn(guid, { transform: new Transform(new Vector(0, 0, -1000), rotate, scale) }).then((equipItem: mw.GameObject) => {
                        if (1) {
                            // if (equipItem instanceof mw.Model) {
                            equipItem.setCollision(2);
                            MyClearAct.instance.charEquipMents.set(equipId, equipItem);
                            Attacker.character.attachToSlot(equipItem, SlotType);
                            equipItem.localTransform.position = location;
                        }
                    })
                })
            } else {
                if (MyClearAct.instance.charEquipMents.get(equipId)) {
                    MyClearAct.instance.charEquipMents.get(equipId).destroy();
                }
                GameObject.asyncSpawn(guid, { transform: new Transform(new Vector(0, 0, -1000), rotate, scale) }).then((equipItem: mw.GameObject) => {
                    if (1) {
                        equipItem.setCollision(2);
                        MyClearAct.instance.charEquipMents.set(equipId, equipItem);
                        Attacker.character.attachToSlot(equipItem, SlotType);
                        equipItem.localTransform.position = location;
                    }
                })
            }
        }
    }

    /**去除某个玩家的所有装备，一般用于死亡或重新选角色的时候
     * @param Attacker 传入需要去去除所有装备的玩家
     */
    @RemoteFunction(mw.Server)
    public static serverDetachAllEquip(Attacker: mw.Player) {
        Console.log("触发去除所有装备");
        let pid = Attacker.userId;
        // Console.log("pid" + pid);
        MyClearAct.instance.charEquipMents.forEach((equipItem: mw.GameObject, key: string) => {
            if (key.includes("Peqp_" + pid)) {
                if (equipItem) {
                    equipItem.destroy();
                    MyClearAct.instance.charEquipMents.delete(key);
                }
            }
        })
    }

    /**服务器处理HitDamage
     * @param Attacker 攻击者
     * @param hitArr 被击中的角色数组，包含npc和playercharter
     * @param damage 此次攻击造成的伤害的值(正数)
     * @param skillName [可选]技能名
     * @param index [可选]技能的节点顺序，从1开始
     */
    @RemoteFunction(mw.Server)
    public onHitDamage(Attacker: mw.Player, hitArr: mw.Pawn[], damage: number, skillName?: string, index?: number) {
        // 遍历所有受害者角色
        hitArr.forEach((char: mw.Character) => {
            // 初始化受害者id
            let victimID = null;
            // 如果受害者是玩家角色
            if (char.player != null) {
                // 受害者id改为玩家userid
                victimID = char.gameObjectId;
            } else {
                // 受害者id改为角色gameobjectId
                victimID = char.gameObjectId
            }
            // 检查是否为敌对关系
            if (!this.isFriendly(Attacker.userId, victimID)) {
                // 自动播放被击中特效
                this.ServerPlayHitEffect(char);
                // 进入伤害判定事件
                MyClearAct.ServerDamageChar.forEach(callbackfn => callbackfn(Attacker.character.gameObjectId, victimID, damage, skillName, index))
            }

        })
    }


    /**服务器处理伤害事件
     * @param AttackerID 攻击者id
     * @param VictimID 被击中的角色的gameobjectid
     * @param damage 此次攻击造成的伤害的值(正数)
     * @param skillName [可选]技能名
     * @param index [可选]技能的节点顺序，从1开始
     */
    public static ServerDamageChar: ((AttackerID: string, VictimID: string, damage: number, skillName?: string, index?: number) => void)[] = [];

    /**检查两个PlayerID是否为友军 */
    public static checkIfFriendly: ((PlayerID1: string, PlayerID2: string) => boolean)[] = [];

    /**判断是否为友军 */
    private isFriendly(PlayerID1: string, PlayerID2: string): boolean {
        for (const check of MyClearAct.checkIfFriendly) {
            if (check(PlayerID1, PlayerID2)) {
                return true;
            }
        }
        return false;
        // //阵营系统 https://forum.ark.online/forum.php?mod=viewthread&tid=1686
        // return MyClearGuns.instance.isFriendly(PlayerID1, PlayerID2);
    }



    /**服务器让指定角色、角色组播放受击动画和特效*/
    public ServerPlayHitEffect(char: Pawn | Pawn[]): void {
        // 判断char是否为数组
        if (Array.isArray(char)) {
            // 如果是数组，处理数组中的每个元素
            char.forEach((pawn) => {
                EffectService.playOnGameObject(this.hitEffect, pawn);
                const mychar = pawn as Character
                mychar.loadAnimation(this.hitAinim).play();
                SoundService.play3DSound(this.isFemale(mychar) ? "135496" : "115257", mychar, 1, 1, { radius: 400, falloffDistance: 800 })
            });
        } else {
            // 如果不是数组，直接处理单个Pawn
            EffectService.playOnGameObject(this.hitEffect, char);
            const mychar = char as Character
            mychar.loadAnimation(this.hitAinim).play();
            SoundService.play3DSound(this.isFemale(mychar) ? "135496" : "115257", mychar, 1, 1, { radius: 400, falloffDistance: 800 })
        }
    }

    private isFemale(mychar: mw.Character): boolean {
        return (mychar.description.advance.base.characterSetting.somatotype % 2) == 0;
    }

    /** 攻击者播放特效，任意端调用，会自动广播
     * @param Attacker 攻击者
     * @param guid 需要播放的特效，建议先拖到优先加载里
     * @param time 特效播放的次数(正数)、时间(负数)
     * @param distance 特效播放位置与攻击者位置的水平距离
     * @param zOffset 特效播放位置与攻击者位置的垂直距离
     * @param yaw 特效播放位置的航向旋转偏移，顺时针为正
     * @param scale 特效的缩放
     * @param rotate 特效的旋转
     * @param EffSlot 特效的播放插槽，<0则在场景里播放，不绑在角色，23绑在角色根节点
     */
    @RemoteFunction(mw.Server)
    public serverPlayEffect(Attacker: mw.Player, guid: string, time: number, distance: number, zOffset: number, yaw: number, scale: Vector, rotate: Rotation, EffSlot: number) {
        scale = new Vector(scale.x, scale.y, scale.z);
        rotate = new Rotation(rotate.x, rotate.y, rotate.z);
        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, 0, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.add(dirc_.clone().multiply(distance)).clone().add(new Vector(0, 0, zOffset));
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then(() => {
                if (EffSlot > 0) {
                    let trn = AttackerChar.worldTransform.clone().clone();
                    let relaLoc = trn.inverseTransformPosition(startLoc).clone();
                    if (time > 0) {
                        EffectService.playOnGameObject(guid, Attacker.character, { slotType: EffSlot, loopCount: time, position: relaLoc, rotation: rotate, scale: scale });
                    }
                    else {
                        EffectService.playOnGameObject(guid, Attacker.character, { slotType: EffSlot, duration: -time, position: relaLoc, rotation: rotate, scale: scale });
                    }
                } else {

                    if (time > 0) {
                        EffectService.playAtPosition(guid, startLoc, { loopCount: time, rotation: rotate, scale: scale })
                    }
                    else {
                        EffectService.playAtPosition(guid, startLoc, { duration: -time, rotation: rotate, scale: scale })
                    }
                }
            })
        } else {
            AssetUtil.asyncDownloadAsset(guid).then(() => {
                if (EffSlot > 0) {
                    let trn = AttackerChar.worldTransform.clone().clone();
                    let relaLoc = trn.inverseTransformPosition(startLoc).clone();

                    if (time > 0) {
                        EffectService.playOnGameObject(guid, Attacker.character, { slotType: EffSlot, loopCount: time, position: relaLoc, rotation: rotate, scale: scale });
                    }
                    else {
                        EffectService.playOnGameObject(guid, Attacker.character, { slotType: EffSlot, duration: -time, position: relaLoc, rotation: rotate, scale: scale });
                    }
                } else {
                    if (time > 0) {
                        EffectService.playAtPosition(guid, startLoc, { loopCount: time, rotation: rotate, scale: scale })
                    }
                    else {
                        EffectService.playAtPosition(guid, startLoc, { duration: -time, rotation: rotate, scale: scale })
                    }
                }
            })
        }
    }

    /** 攻击者播放动画,任意端调用，会自动广播
     * @param Attacker 需要播放动画的攻击者
     * @param guid 需要播放动画的guid，建议拖到优先加载里
     * @param totalTime 期望动画播完的总时长，秒
     * @param progress 期望动画播到什么进度(0,1]，接口会自动帮你算好速率
     * @param AnimSlot 期望动画播在什么人物插槽上，0、3=全身，2=下半身，1=上半身
     */
    @RemoteFunction(mw.Server)
    public serverPlayAnimotion(Attacker: mw.Player, guid: string, totalTime: number, progress: number, AnimSlot: number) {
        progress = progress > 1 ? 1 : progress <= 0 ? 0.1 : progress;
        let AttackerChar = Attacker.character;
        let anim: mw.Animation = undefined;

        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then(() => {
                anim = AttackerChar.loadAnimation(guid)
                anim.speed = anim.length * progress / totalTime;
                anim.slot = AnimSlot;
                anim.play();
                setTimeout(() => {
                    anim.stop();
                }, totalTime * 1000);
            })
        } else {
            anim = anim = AttackerChar.loadAnimation(guid)
            anim.speed = anim.length * progress / totalTime;
            anim.slot = AnimSlot;
            anim.play();
            setTimeout(() => {
                anim.stop();
            }, totalTime * 1000);
        }
    }

    /** 攻击者播放音效,任意端调用，会自动广播
     * @param Attacker 需要播放声效的攻击者
     * @param guid 声效guid，建议拖到优先加载里
     * @param volume 声效音量，默认1
     * @param inner 声效内径，这个范围内声效不会衰减
     * @param outter 声效外径，声效内径到声效外径这段距离里，声效会衰减到消失
     * @param stopTime 声效停止时间，秒，0或负数则不按时停止，等播完自动停止
     */
    @RemoteFunction(mw.Server)
    public serverPlay3DSound(Attacker: mw.Player, guid: string, volume: number, inner?: number, outter?: number, stopTime?: number) {
        if (outter != undefined) {
            let omiga1 = Math.max(inner, outter);
            let omiga2 = Math.min(inner, outter);
            inner = omiga2;
            outter = omiga1;
        }
        else if (inner != undefined) {
            outter = inner;
            inner = 0;
        }

        let AttackerChar = Attacker.character;
        let sound: number = undefined;

        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then(() => {
                sound = SoundService.play3DSound(guid, AttackerChar, 1, volume, { radius: inner ?? 200, falloffDistance: outter ?? 600 })
                if (stopTime != undefined && stopTime > 0) {
                    setTimeout(() => {
                        SoundService.stop3DSound(sound);
                    }, stopTime * 1000);
                }
            })
        } else {
            sound = SoundService.play3DSound(guid, AttackerChar, 1, volume, { radius: inner ?? 200, falloffDistance: outter ?? 600 })
            if (stopTime != undefined && stopTime > 0) {
                setTimeout(() => {
                    SoundService.stop3DSound(sound);
                }, stopTime * 1000);
            }
        }

    }

    /** 玩家向给定方向位移
     * @param Attacker 需要位移的玩家
     * @param lenth 需要位移目标点离当前角色的水平直线距离
     * @param zOffset 需要位移目标点离当前角色的垂直直线距离
     * @param yaw 航向旋转偏移，以水平面为钟，角色朝向为12点，顺时针为正
     * @param time 位移需要花费的时间，秒
     * @param checkCount 位移期间需要用射线检测碰撞的次数，建议lenth的每100m(一个标准正方体的边长)检测2次，以减少卡墙概率;
     */
    public weiYi(Attacker: mw.Player, lenth: number, zOffset: number, yaw: number, time: number, checkCount: number) {
        time = 1000 * time;
        checkCount = Math.floor(Math.abs(checkCount));


        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, 0, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.clone();
        let endLoc = startLoc.clone().add(dirc_.clone().multiply(lenth)).clone().add(new Vector(0, 0, zOffset));
        let dirc3 = endLoc.clone().subtract(startLoc.clone()).normalize().clone();
        let distance2 = endLoc.clone().subtract(startLoc.clone()).magnitude;
        let hitMesh = false;
        let startLoc2 = startLoc.clone();
        let endLoc2 = startLoc.clone().add(dirc3.clone().multiply((1 * distance2 / checkCount)));
        let realEndLoc = endLoc;
        for (let index = 0; index < checkCount; index++) {
            if (hitMesh) {
                realEndLoc = startLoc.clone().add(dirc3.clone().multiply(((index - 1) * distance2 / checkCount)));
                time = index * time / checkCount;
                break;
            }
            startLoc2 = startLoc.clone().add(dirc3.clone().multiply((index * distance2 / checkCount)));
            let num = index + 1;
            endLoc2 = startLoc.clone().add(dirc3.clone().multiply((num * distance2 / checkCount)));
            let CharCollisnX = undefined;
            if (AttackerChar.isCrouching) {
                CharCollisnX = 70;
            } else {
                CharCollisnX = 150;
            }



            let checkLine = MyClearAct.modiftboxOverlap(startLoc2, endLoc2, 60, CharCollisnX, this.isVisible);

            checkLine.forEach((value: mw.GameObject) => {
                if (value instanceof mw.Pawn) {
                    if (value.player != Attacker) {
                    }
                }
                else {
                    if (value.netStatus != 1 && (!(value instanceof mw.Trigger))) { hitMesh = true; }

                }
            })
        }



        let moveTween = new mw.Tween(Attacker.character.worldTransform.position).to(realEndLoc, time).onUpdate((obj) => {
            Attacker.character.worldTransform.position = (obj);
            Attacker.character.movementEnabled = false;
        }).onComplete(() => {

            Attacker.character.movementEnabled = true;
        });
        moveTween.start();
    }

    /** 球、圆柱型判定，双端，且发起端会显示具体判定区域
     * @param Attacker 发起判定的玩家
     * @param distance 判定区原点离当前角色的水平直线距离
     * @param yaw 航向旋转偏移，以水平面为钟，角色朝向为12点，顺时针为正
     * @param zOffset 判定区的位置抬高，向上为正
     * @param radius 判定区的半径
     * @param height 判定区的圆柱高度，高度不为正就改为球形判定
     * @param damage 被该判定击中的伤害，可在脚本里搜索onHitDamage，在该方法下接入你自己的伤害协议
     * @returns 返回被判定中的角色数组，可以用forEach来遍历
     */
    @RemoteFunction(mw.Server)
    public yuanPanding(Attacker: mw.Player, distance: number, yaw: number, zOffset: number, radius: number, height: number, damage: number, skillName?: string, index?: number): mw.Pawn[] {
        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, 0, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.add(dirc_.clone().multiply(distance)).clone().add(new Vector(0, 0, zOffset));
        let hitArr: mw.Character[] = [];
        if (height > 0) {
            let yuan = QueryUtil.capsuleOverlap(startLoc, radius, height, this.isVisible);
            // Console.log("height > 0 : " + startLoc + " " + radius + " " + height);
            yuan.forEach((vaule: mw.GameObject) => {
                if (vaule instanceof mw.Character) { if (vaule.player != Attacker || !(vaule.player !== null)) { hitArr.push(vaule); } }
            })
        } else {
            let yuan = QueryUtil.sphereOverlap(startLoc, radius, this.isVisible);
            // Console.log("height < 0 : " + startLoc + " " + radius + " " + height);
            yuan.forEach((vaule: mw.GameObject) => {
                if (vaule instanceof mw.Character) { if (vaule.player != Attacker || !(vaule.player !== null)) { hitArr.push(vaule); } }
            })
        }
        if (SystemUtil.isServer() && this.isVisible) {
            this.yuanPandingShow(Attacker, startLoc, radius, height);
        }

        if (hitArr.length > 0) {

            let NewDamage = damage;
            this.onHitDamage(Attacker, hitArr, NewDamage, skillName, index)
        }
        return hitArr;
    }

    /** 方盒判定，双端，且发起端会显示具体判定区域
     * @param Attacker 发起判定的玩家
     * @param distance 盒型判定区离角色的距离
     * @param yaw 航向旋转偏移，以水平面为钟，角色朝向为12点，顺时针为正
     * @param pitch 俯仰旋转偏移，向上为正
     * @param zOffset 盒型判定区的位置抬高，向上为正
     * @param long 盒型判定区的长度
     * @param width 盒型判定区的宽度
     * @param height 盒型判定区的高度
     * @param damage 被该判定击中的伤害
     * @returns 返回被判定中的角色数组，可以用forEach来遍历
     */
    @RemoteFunction(mw.Server)
    public boxPanding(Attacker: mw.Player, distance: number, yaw: number, pitch: number, zOffset: number, lenth: number, width: number, height: number, damage: number, skillName?: string, index?: number): mw.Pawn[] {
        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, pitch, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.add(dirc_.clone().multiply(distance)).clone().add(new Vector(0, 0, zOffset));
        let endLoc = startLoc.clone().add(dirc_.clone().multiply(lenth)).clone();
        let box = MyClearAct.modiftboxOverlap(startLoc, endLoc, width, height, this.isVisible);
        let hitArr: mw.Pawn[] = [];
        box.forEach((vaule: mw.GameObject) => {
            if (vaule instanceof mw.Pawn) {
                if (vaule.player != Attacker) { hitArr.push(vaule); }
            }
        })
        if (SystemUtil.isServer() && this.isVisible) {
            this.boxPandingShow(Attacker, startLoc, endLoc, width, height);
        }
        if (hitArr.length > 0) {
            let NewDamage = damage;
            this.onHitDamage(Attacker, hitArr, NewDamage, skillName, index)
        }
        return hitArr;
    }

    /** [辅助显示] 发起的C端可以看见的盒型判定区    */
    @RemoteFunction(mw.Client)
    public boxPandingShow(player: mw.Player, startLoc: Vector, endLoc: Vector, width: number, height: number) {
        MyClearAct.modiftboxOverlap(startLoc, endLoc, width, height, true);
    }

    /** [辅助显示] 发起的C端可以看见的球、圆柱型判定区   */
    @RemoteFunction(mw.Client)
    public yuanPandingShow(player: mw.Player, startLoc: Vector, radius: number, height: number) {
        if (height > 0) {
            // Console.log("height > 0 : " + startLoc + " " + radius + " " + height);
            QueryUtil.capsuleOverlap(startLoc, radius, height, true);
        } else {
            // Console.log("height < 0 : " + startLoc + " " + radius + " " + height);
            QueryUtil.sphereOverlap(startLoc, radius, true);
        }
    }


    /** [027适配用] 原旧的方盒判定 */
    public static modiftboxOverlap(startLocation: Vector, endLocation: Vector, width: number, height: number, drawDebug?: boolean, objectsToIgnore?: Array<string>, ignoreObjectsByType?: boolean, self?: GameObject): Array<GameObject> {
        let halfSize = new Vector(height / 2, width / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array<GameObject>();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj) continue;
            if (objResults.indexOf(obj) == -1) objResults.push(obj);
        }
        return objResults;
    }

}

/** MainUI节点 */
class MainUI extends mw.UIScript {

    public static instance: MainUI;

    public skillRoll: mw.ScrollBox = undefined;
    public contentCanv: mw.Canvas = undefined;

    public btnCanv: mw.Canvas = undefined;
    public addEffBtn: mw.StaleButton = undefined;
    public addAnimBtn: mw.StaleButton = undefined;
    public addSoundBtn: mw.StaleButton = undefined;
    public addWeiYiBtn: mw.StaleButton = undefined;
    public addYuanBtn: mw.StaleButton = undefined;
    public addFangBtn: mw.StaleButton = undefined;
    public addEquipBtn: mw.StaleButton = undefined;
    public addDelayBtn: mw.StaleButton = undefined;

    public hideShowBtn: mw.StaleButton = undefined;

    public enCodeBtn: mw.StaleButton = undefined;
    public deCodeBtn: mw.StaleButton = undefined;
    public getGUIDBtn: mw.StaleButton = undefined;
    public PlayBtn: mw.StaleButton = undefined;

    public downInput: mw.InputBox = undefined;

    public onAwake() {
        MainUI.instance = this;
        this.rootCanvas.renderOpacity = 0.8;
        this.rootCanvas.zOrder = mw.UILayerSystem;
        let size = WindowUtil.getViewportSize();
        let rollY = size.y / 2.8;
        let _margin = new mw.Margin(0.1);

        this.skillRoll = mw.ScrollBox.newObject(this.rootCanvas);
        this.skillRoll.size = new Vector2(size.x, rollY);
        this.skillRoll.alwaysShowScrollBar = true;
        this.skillRoll.orientation = mw.Orientation.OrientHorizontal;
        this.skillRoll.position = new Vector2(20, 10);

        this.contentCanv = mw.Canvas.newObject(this.rootCanvas);
        this.contentCanv.size = new Vector2(size.x, size.y / 3);
        this.contentCanv.position = new Vector2(0, 0);
        this.contentCanv.autoLayoutRule = new mw.UILayout(5, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.LeftCenter, new mw.UIHugContent(0, 0), true, false);
        this.skillRoll.addChild(this.contentCanv);
        this.contentCanv.visibility = 4;

        this.downInput = mw.InputBox.newObject(this.rootCanvas);
        this.downInput.size = new Vector2(size.x - 40, size.y / 30);
        this.downInput.fontSize = 14;
        this.downInput.textLengthLimit = 999999;

        this.btnCanv = mw.Canvas.newObject(this.rootCanvas);
        this.btnCanv.size = new Vector2(size.x, size.y / 20);

        this.downInput.position = new Vector2(20, size.y - 1.1 * this.downInput.size.y);
        this.downInput.text = "";
        this.btnCanv.position = new Vector2(20, size.y - 1.1 * this.btnCanv.size.y - 1.1 * this.downInput.size.y);
        this.btnCanv.autoLayoutRule = new mw.UILayout(10, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.LeftCenter, new mw.UIHugContent(0, 0), true, false);

        this.addEffBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addEffBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.addEffBtn.text = "添加特效";
        this.addEffBtn.fontSize = 18;
        this.btnCanv.addChild(this.addEffBtn);

        this.addAnimBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addAnimBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.addAnimBtn.text = "添加动画";
        this.addAnimBtn.fontSize = 18;
        this.btnCanv.addChild(this.addAnimBtn);

        this.addSoundBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addSoundBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.addSoundBtn.text = "添加音效";
        this.addSoundBtn.fontSize = 18;
        this.btnCanv.addChild(this.addSoundBtn);

        this.addWeiYiBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addWeiYiBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.addWeiYiBtn.text = "添加位移";
        this.addWeiYiBtn.fontSize = 18;
        this.btnCanv.addChild(this.addWeiYiBtn);

        this.addYuanBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addYuanBtn.size = new Vector2(size.x / 12, size.y / 20);
        this.addYuanBtn.text = "添加球圆判定";
        this.addYuanBtn.fontSize = 18;
        this.btnCanv.addChild(this.addYuanBtn);

        this.addFangBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addFangBtn.size = new Vector2(size.x / 12, size.y / 20);
        this.addFangBtn.text = "添加方盒判定";
        this.addFangBtn.fontSize = 18;
        this.btnCanv.addChild(this.addFangBtn);

        this.addEquipBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addEquipBtn.size = new Vector2(size.x / 12, size.y / 20);
        this.addEquipBtn.text = "添加装备节点";
        this.addEquipBtn.fontSize = 18;
        this.btnCanv.addChild(this.addEquipBtn);

        this.addDelayBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.addDelayBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.addDelayBtn.text = "添加延迟";
        this.addDelayBtn.fontSize = 18;
        this.btnCanv.addChild(this.addDelayBtn);

        this.hideShowBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.hideShowBtn.size = new Vector2(size.x / 12, size.y / 20);
        this.hideShowBtn.text = "界面显隐[X]";
        this.hideShowBtn.fontSize = 18;
        this.btnCanv.addChild(this.hideShowBtn);

        this.enCodeBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.enCodeBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.enCodeBtn.text = "↓序列化[G]";
        this.enCodeBtn.fontSize = 18;
        this.btnCanv.addChild(this.enCodeBtn);

        this.deCodeBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.deCodeBtn.size = new Vector2(size.x / 14, size.y / 20);
        this.deCodeBtn.text = "↑反序列化[H]";
        this.deCodeBtn.fontSize = 18;
        this.btnCanv.addChild(this.deCodeBtn);

        this.getGUIDBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.getGUIDBtn.size = new Vector2(size.x / 12, size.y / 20);
        this.getGUIDBtn.text = "获取GUID";
        this.getGUIDBtn.fontSize = 18;
        this.btnCanv.addChild(this.getGUIDBtn);

        this.PlayBtn = mw.StaleButton.newObject(this.rootCanvas);
        this.PlayBtn.size = new Vector2(size.x / 16, size.y / 20);
        this.PlayBtn.text = "播放[1]";
        this.PlayBtn.fontSize = 18;
        this.btnCanv.addChild(this.PlayBtn);

        this.initBtn();

    }

    /** skill容器变动，自动排序 */
    public onContentChange() {
        let size = WindowUtil.getViewportSize();
        this.contentCanv.size = new Vector2((this.contentCanv.getChildrenCount() + 2) * 1.05 * size.x / 7, size.y / 3);
        this.contentCanv.position = new Vector2(0, 0);
        for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
            let child = this.contentCanv.getChildAt(index - 1) as mw.Widget;
            let UINODE = mw.findUIScript(child) as UINode;
            UINODE.text9.text = index + "";
            refreshNodeColor(UINODE);
        }
    }

    public fanXuLieHua() {
        let size = WindowUtil.getViewportSize();
        this.contentCanv.removeAllChildren();
        let MyStringArr = JSON.parse(this.downInput.text) as string[];
        this.onContentChange();
        MyStringArr.forEach((value: string, index: number) => {
            // index为双数，但是序列是从0开始的
            if (index % 2 == 0) {
                let name = MyStringArr[index];
                if (name == "特效节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as EffNode;
                    let _UInode = mw.UIService.create(UINode);
                    let effNode = Node;
                    _UInode.input1.text = effNode.guid;
                    _UInode.input2.text = effNode.time + "";
                    _UInode.input3.text = effNode.distance + "";
                    _UInode.input4.text = effNode.zOffset + "";
                    _UInode.input5.text = effNode.yaw + "";
                    _UInode.input6.text = v3toString(effNode.scale);
                    _UInode.input7.text = v3toString(effNode.rotate);
                    _UInode.input8.text = effNode.EffSlot + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);

                    this.onContentChange();


                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "动画节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as AniNode;

                    let _UInode = mw.UIService.create(UINode);

                    let ANNODE = Node;
                    _UInode.tittleText.text = "动画节点";
                    _UInode.text1.text = "动画GUID："
                    _UInode.text2.text = "播放耗时："
                    _UInode.text3.text = "播放进度："
                    _UInode.text4.text = "播放插槽："
                    _UInode.input1.text = ANNODE.guid;
                    _UInode.input2.text = ANNODE.totalTime + "";
                    _UInode.input3.text = ANNODE.progress + "";
                    _UInode.input4.text = ANNODE.AnimSlot + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();


                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "音效节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as SoundNode;
                    let _UInode = mw.UIService.create(UINode);

                    let SOUNDNODE = Node;
                    _UInode.tittleText.text = "音效节点";
                    _UInode.text1.text = "音效GUID："
                    _UInode.text2.text = "音量："
                    _UInode.text3.text = "无衰半径："
                    _UInode.text4.text = "衰减半径："
                    _UInode.text5.text = "停止秒数："
                    _UInode.input1.text = SOUNDNODE.guid;
                    _UInode.input2.text = SOUNDNODE.volume + "";
                    _UInode.input3.text = SOUNDNODE.inner + "";
                    _UInode.input4.text = SOUNDNODE.outter + "";
                    _UInode.input5.text = SOUNDNODE.stopTime + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();


                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "位移节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as WeiYiNode;
                    let _UInode = mw.UIService.create(UINode);

                    let WeiYiNode = Node;
                    _UInode.tittleText.text = "位移节点";
                    _UInode.text1.text = "水平距离："
                    _UInode.text2.text = "垂直距离："
                    _UInode.text3.text = "偏航角度："
                    _UInode.text4.text = "位移耗时："
                    _UInode.text5.text = "检测次数："
                    _UInode.input1.text = WeiYiNode.lenth + "";
                    _UInode.input2.text = WeiYiNode.zOffset + "";
                    _UInode.input3.text = WeiYiNode.yaw + "";
                    _UInode.input4.text = WeiYiNode.time + "";
                    _UInode.input5.text = WeiYiNode.checkCount + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();


                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "球圆判定") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as YuanNode;
                    let _UInode = mw.UIService.create(UINode);

                    let YuanNode = Node;
                    _UInode.tittleText.text = "球圆判定";
                    _UInode.text1.text = "水平距离："
                    _UInode.text2.text = "偏航角度："
                    _UInode.text3.text = "垂直距离"
                    _UInode.text4.text = "半径："
                    _UInode.text5.text = "圆柱高度："
                    _UInode.text6.text = "判定伤害："
                    _UInode.input1.text = YuanNode.distance + "";
                    _UInode.input2.text = YuanNode.yaw + "";
                    _UInode.input3.text = YuanNode.zOffset + "";
                    _UInode.input4.text = YuanNode.radius + "";
                    _UInode.input5.text = YuanNode.height + "";
                    _UInode.input6.text = YuanNode.damage + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();


                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "方盒判定") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as BoxNode;
                    let _UInode = mw.UIService.create(UINode);

                    let BoxNode = Node;
                    _UInode.tittleText.text = "方盒判定";
                    _UInode.text1.text = "水平距离："
                    _UInode.text2.text = "偏航角度："
                    _UInode.text3.text = "俯仰角度："
                    _UInode.text4.text = "垂直距离："
                    _UInode.text5.text = "方盒长度："
                    _UInode.text6.text = "方盒宽度："
                    _UInode.text7.text = "方盒高度："
                    _UInode.text8.text = "判定伤害："
                    _UInode.input1.text = BoxNode.distance + "";
                    _UInode.input2.text = BoxNode.yaw + "";
                    _UInode.input3.text = BoxNode.pitch + "";
                    _UInode.input4.text = BoxNode.zOffset + "";
                    _UInode.input5.text = BoxNode.lenth + "";
                    _UInode.input6.text = BoxNode.width + "";
                    _UInode.input7.text = BoxNode.height + "";
                    _UInode.input8.text = BoxNode.damage + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "装备节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as EquipNode;
                    let _UInode = mw.UIService.create(UINode);

                    let BoxNode = Node;
                    _UInode.tittleText.text = "装备节点";
                    _UInode.text1.text = "模型GUID："
                    _UInode.text2.text = "相对位置："
                    _UInode.text3.text = "相对缩放："
                    _UInode.text4.text = "相对旋转："
                    _UInode.text5.text = "装备插槽："
                    _UInode.input1.text = BoxNode.guid;
                    _UInode.input2.text = v3toString(BoxNode.location);
                    _UInode.input3.text = v3toString(BoxNode.scale) + "";
                    _UInode.input4.text = v3toString(BoxNode.rotate) + "";
                    _UInode.input5.text = BoxNode.SlotType + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
                if (name == "延迟节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]) as DelayNode;
                    let _UInode = mw.UIService.create(UINode);

                    let DelayNode = Node;
                    _UInode.tittleText.text = "延迟节点";
                    _UInode.text1.text = "时长秒："
                    _UInode.input1.text = DelayNode.delayTime + "";

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);

                    this.contentCanv.addChild(_UInode.uiObject);
                    hideTextByXCount(_UInode);
                    this.onContentChange();

                    _UInode.visible = true;
                    _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
                    _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
                    _UInode.uiObject.position = new Vector2(0, 0);
                }
            }
        })
    }

    public xuLieHua() {

        /**整个序列的数组 */
        let xulie: string[] = [];
        for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
            // /** 记录node类和具体nodejson的map*/
            // let subMap: Map<string, string> = new Map();
            let child = this.contentCanv.getChildAt(index - 1) as mw.Widget;
            let UINODE = mw.findUIScript(child) as UINode;
            let NodeName = UINODE.tittleText.text;
            if (NodeName == "特效节点") {
                let node = new EffNode();
                node.guid = UINODE.input1.text;
                node.time = Number(UINODE.input2.text);
                node.distance = Number(UINODE.input3.text);
                node.zOffset = Number(UINODE.input4.text);
                node.yaw = Number(UINODE.input5.text);
                node.scale = stringToVector(UINODE.input6.text);
                node.rotate = stringToRotation(UINODE.input7.text);
                node.EffSlot = Number(UINODE.input8.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node) + "";
                xulie.push(json);
            }
            if (NodeName == "动画节点") {
                let node = new AniNode();
                node.guid = UINODE.input1.text;
                node.totalTime = Number(UINODE.input2.text);
                node.progress = Number(UINODE.input3.text);
                node.AnimSlot = Number(UINODE.input4.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "音效节点") {
                let node = new SoundNode();
                node.guid = UINODE.input1.text;
                node.volume = Number(UINODE.input2.text);
                node.inner = Number(UINODE.input3.text);
                node.outter = Number(UINODE.input4.text);
                node.stopTime = Number(UINODE.input5.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "位移节点") {
                let node = new WeiYiNode();
                node.lenth = Number(UINODE.input1.text);
                node.zOffset = Number(UINODE.input2.text);
                node.yaw = Number(UINODE.input3.text);
                node.time = Number(UINODE.input4.text);
                node.checkCount = Number(UINODE.input5.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "球圆判定") {
                let node = new YuanNode();
                node.distance = Number(UINODE.input1.text);
                node.yaw = Number(UINODE.input2.text);
                node.zOffset = Number(UINODE.input3.text);
                node.radius = Number(UINODE.input4.text);
                node.height = Number(UINODE.input5.text);
                node.damage = Number(UINODE.input6.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "方盒判定") {
                let node = new BoxNode();
                node.distance = Number(UINODE.input1.text);
                node.yaw = Number(UINODE.input2.text);
                node.pitch = Number(UINODE.input3.text);
                node.zOffset = Number(UINODE.input4.text);
                node.lenth = Number(UINODE.input5.text);
                node.width = Number(UINODE.input6.text);
                node.height = Number(UINODE.input7.text);
                node.damage = Number(UINODE.input8.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "装备节点") {
                let node = new EquipNode();
                node.guid = UINODE.input1.text;
                node.location = stringToVector(UINODE.input2.text);
                node.scale = stringToVector(UINODE.input3.text);
                node.rotate = stringToRotation(UINODE.input4.text);
                node.SlotType = Number(UINODE.input5.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "延迟节点") {
                let node = new DelayNode();
                node.delayTime = Number(UINODE.input1.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
        }

        let json2 = JSON.stringify(xulie);
        this.downInput.text = json2
    }

    /**初始化所有按钮 */
    public initBtn() {
        Event.addLocalListener("onContentChange", () => {
            this.onContentChange();
        })
        let size = WindowUtil.getViewportSize();

        /** 界面显隐按钮初始化 */
        this.hideShowBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.X, this.hideShowBtn);
        this.hideShowBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.hideShowBtn.onClicked.add(() => {
            if (MyClearAct.instance.isVisible) {
                MyClearAct.instance.isVisible = false;
                this.skillRoll.visibility = 2;
                this.btnCanv.visibility = 2;
                this.downInput.visibility = 2;
            } else {
                MyClearAct.instance.isVisible = true;
                this.skillRoll.visibility = 0;
                this.btnCanv.visibility = 0;
                this.downInput.visibility = 0;

            }
        })

        /** 播放按钮按钮初始化 */
        this.PlayBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.One, this.PlayBtn);
        this.PlayBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        let Attacker = Player.localPlayer;
        this.PlayBtn.onClicked.add(async () => {
            /**整个序列的数组 */
            let xulie: string[] = [];
            for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
                let child = this.contentCanv.getChildAt(index - 1) as mw.Widget;
                let UINODE = mw.findUIScript(child) as UINode;
                let NodeName = UINODE.tittleText.text;
                if (NodeName == "特效节点") {
                    let node = new EffNode();
                    node.guid = UINODE.input1.text;
                    node.time = Number(UINODE.input2.text);
                    node.distance = Number(UINODE.input3.text);
                    node.zOffset = Number(UINODE.input4.text);
                    node.yaw = Number(UINODE.input5.text);
                    node.scale = stringToVector(UINODE.input6.text);
                    node.rotate = stringToRotation(UINODE.input7.text);
                    node.EffSlot = Number(UINODE.input8.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node) + "";
                    xulie.push(json);
                }
                if (NodeName == "动画节点") {
                    let node = new AniNode();
                    node.guid = UINODE.input1.text;
                    node.totalTime = Number(UINODE.input2.text);
                    node.progress = Number(UINODE.input3.text);
                    node.AnimSlot = Number(UINODE.input4.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "音效节点") {
                    let node = new SoundNode();
                    node.guid = UINODE.input1.text;
                    node.volume = Number(UINODE.input2.text);
                    node.inner = Number(UINODE.input3.text);
                    node.outter = Number(UINODE.input4.text);
                    node.stopTime = Number(UINODE.input5.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "位移节点") {
                    let node = new WeiYiNode();
                    node.lenth = Number(UINODE.input1.text);
                    node.zOffset = Number(UINODE.input2.text);
                    node.yaw = Number(UINODE.input3.text);
                    node.time = Number(UINODE.input4.text);
                    node.checkCount = Number(UINODE.input5.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "球圆判定") {
                    let node = new YuanNode();
                    node.distance = Number(UINODE.input1.text);
                    node.yaw = Number(UINODE.input2.text);
                    node.zOffset = Number(UINODE.input3.text);
                    node.radius = Number(UINODE.input4.text);
                    node.height = Number(UINODE.input5.text);
                    node.damage = Number(UINODE.input6.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "方盒判定") {
                    let node = new BoxNode();
                    node.distance = Number(UINODE.input1.text);
                    node.yaw = Number(UINODE.input2.text);
                    node.pitch = Number(UINODE.input3.text);
                    node.zOffset = Number(UINODE.input4.text);
                    node.lenth = Number(UINODE.input5.text);
                    node.width = Number(UINODE.input6.text);
                    node.height = Number(UINODE.input7.text);
                    node.damage = Number(UINODE.input8.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "装备节点") {
                    let node = new EquipNode();
                    node.guid = UINODE.input1.text;
                    node.location = stringToVector(UINODE.input2.text);
                    node.scale = stringToVector(UINODE.input3.text);
                    node.rotate = stringToRotation(UINODE.input4.text);
                    node.SlotType = Number(UINODE.input5.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "延迟节点") {
                    let node = new DelayNode();
                    node.delayTime = Number(UINODE.input1.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
            }
            let json2 = JSON.stringify(xulie);
            if (SystemUtil.isPIE) {
                Console.log("[MyClearAct][防丢小助手]：此次播放动画的Json序列为： " + json2);
            }

            MyClearAct.instance.isActing = true;

            for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
                // 当攻击者被击倒，即布娃娃系统开启，中断技能释放
                if (Attacker.character.ragdollEnabled) {
                    MyClearAct.instance.isActing = false;
                    this.skillRoll.position = new Vector2(this.skillRoll.position.x, 10);
                    break;
                }
                // 当攻击者被系统停下技能，中断技能释放
                if (MyClearAct.instance.BNeedStop == true) {
                    MyClearAct.instance.isActing = false;
                    MyClearAct.instance.BNeedStop = false;
                    break;
                }
                let child = this.contentCanv.getChildAt(index - 1) as mw.Widget;
                let UINODE = mw.findUIScript(child) as UINode;
                let NodeName = UINODE.tittleText.text;
                let Acolor = UINODE.BGP.imageColor;
                UINODE.text9.fontColor = LinearColor.red;
                UINODE.tittleText.fontColor = LinearColor.red;
                UINODE.BGP.imageColor = LinearColor.white;
                setTimeout(() => {
                    UINODE.text9.fontColor = LinearColor.white;
                    UINODE.tittleText.fontColor = LinearColor.white;
                    UINODE.BGP.imageColor = Acolor;
                }, 300);
                if (NodeName == "特效节点") {
                    let node = new EffNode();
                    node.guid = UINODE.input1.text;
                    node.time = Number(UINODE.input2.text);
                    node.distance = Number(UINODE.input3.text);
                    node.zOffset = Number(UINODE.input4.text);
                    node.yaw = Number(UINODE.input5.text);
                    node.scale = stringToVector(UINODE.input6.text);
                    node.rotate = stringToRotation(UINODE.input7.text);
                    node.EffSlot = Number(UINODE.input8.text);
                    if (node.EffSlot < 0) {
                        node.rotate.add(Attacker.character.worldTransform.rotation.clone().multiply(new Rotation(0, 0, 1)));
                    }
                    MyClearAct.instance.serverPlayEffect(Attacker, node.guid, node.time, node.distance, node.zOffset, node.yaw, node.scale, node.rotate, node.EffSlot);
                }
                if (NodeName == "动画节点") {
                    let node = new AniNode();
                    node.guid = UINODE.input1.text;
                    node.totalTime = Number(UINODE.input2.text);
                    node.progress = Number(UINODE.input3.text);
                    node.AnimSlot = Number(UINODE.input4.text);
                    MyClearAct.instance.serverPlayAnimotion(Attacker, node.guid, node.totalTime, node.progress, node.AnimSlot);
                }
                if (NodeName == "音效节点") {
                    let node = new SoundNode();
                    node.guid = UINODE.input1.text;
                    node.volume = Number(UINODE.input2.text);
                    node.inner = Number(UINODE.input3.text);
                    node.outter = Number(UINODE.input4.text);
                    node.stopTime = Number(UINODE.input5.text);
                    MyClearAct.instance.serverPlay3DSound(Attacker, node.guid, node.volume, node.inner, node.outter, node.stopTime);
                }
                if (NodeName == "位移节点") {
                    let node = new WeiYiNode();
                    node.lenth = Number(UINODE.input1.text);
                    node.zOffset = Number(UINODE.input2.text);
                    node.yaw = Number(UINODE.input3.text);
                    node.time = Number(UINODE.input4.text);
                    node.checkCount = Number(UINODE.input5.text);
                    MyClearAct.instance.weiYi(Attacker, node.lenth, node.zOffset, node.yaw, node.time, node.checkCount)
                }
                if (NodeName == "球圆判定") {
                    let node = new YuanNode();
                    node.distance = Number(UINODE.input1.text);
                    node.yaw = Number(UINODE.input2.text);
                    node.zOffset = Number(UINODE.input3.text);
                    node.radius = Number(UINODE.input4.text);
                    node.height = Number(UINODE.input5.text);
                    node.damage = Number(UINODE.input6.text);
                    MyClearAct.instance.yuanPanding(Attacker, node.distance, node.yaw, node.zOffset, node.radius, node.height, node.damage, "未命名技能", index);
                }
                if (NodeName == "方盒判定") {
                    let node = new BoxNode();
                    node.distance = Number(UINODE.input1.text);
                    node.yaw = Number(UINODE.input2.text);
                    node.pitch = Number(UINODE.input3.text);
                    node.zOffset = Number(UINODE.input4.text);
                    node.lenth = Number(UINODE.input5.text);
                    node.width = Number(UINODE.input6.text);
                    node.height = Number(UINODE.input7.text);
                    node.damage = Number(UINODE.input8.text);
                    MyClearAct.instance.boxPanding(Attacker, node.distance, node.yaw, node.pitch, node.zOffset, node.lenth, node.width, node.height, node.damage, "未命名技能", index);
                }
                if (NodeName == "装备节点") {
                    let node = new EquipNode();
                    node.guid = UINODE.input1.text;
                    node.location = stringToVector(UINODE.input2.text);
                    node.scale = stringToVector(UINODE.input3.text);
                    node.rotate = stringToRotation(UINODE.input4.text);
                    node.SlotType = Number(UINODE.input5.text);
                    MyClearAct.serverEquipMe(Attacker, node.guid, node.location, node.scale, node.rotate, node.SlotType);
                }
                if (NodeName == "延迟节点") {
                    let node = new DelayNode();
                    node.delayTime = Number(UINODE.input1.text);
                    await new Promise((resolve) => setTimeout(resolve, node.delayTime * 1000));
                }
            }
            MyClearAct.instance.isActing = false;
        })


        /** 获取唯一GUID按钮初始化 */
        this.getGUIDBtn.transitionEnable = true;
        this.getGUIDBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.getGUIDBtn.onClicked.add(() => {
            let str = JSON.parse(this.downInput.text) as string[];
            // Console.log("str " + str);
            const guids = new Set<string>();
            str.forEach((item) => {
                const match = /"guid":"(\d+)"/.exec(item);
                if (match) {
                    guids.add(match[1]);
                }
            });
            const result = Array.from(guids).join(",");
            // Console.log("result " + result);
            this.downInput.text = result;
        })

        /** 反序列化按钮初始化 */
        this.deCodeBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.H, this.deCodeBtn);
        this.deCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.deCodeBtn.onClicked.add(() => {
            this.fanXuLieHua();
        })


        /** 序列化按钮初始化 */
        this.enCodeBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.G, this.enCodeBtn);
        this.enCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.enCodeBtn.onClicked.add(() => {
            this.xuLieHua();
        })

        /** 特效节点初始化 */
        this.addEffBtn.transitionEnable = true;
        this.addEffBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addEffBtn.fontColor = LinearColor.white;
        this.addEffBtn.setNormalImageColorDecimal(0.2 * 170, 0.6 * 170, 1 * 170, 1 * 255);
        this.addEffBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let effNode = new EffNode();
            _UInode.input1.text = effNode.guid;
            _UInode.input2.text = effNode.time + "";
            _UInode.input3.text = effNode.distance + "";
            _UInode.input4.text = effNode.zOffset + "";
            _UInode.input5.text = effNode.yaw + "";
            _UInode.input6.text = v3toString(effNode.scale);
            _UInode.input7.text = v3toString(effNode.rotate);
            _UInode.input8.text = effNode.EffSlot + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);

            this.onContentChange();

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        /** 动画节点初始化 */
        this.addAnimBtn.transitionEnable = true;
        this.addAnimBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addAnimBtn.fontColor = LinearColor.white;
        this.addAnimBtn.setNormalImageColorDecimal(0.8 * 170, 0.2 * 170, 0.8 * 170, 1 * 255);
        this.addAnimBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let ANNODE = new AniNode();
            _UInode.tittleText.text = "动画节点";
            _UInode.text1.text = "动画GUID："
            _UInode.text2.text = "播放耗时："
            _UInode.text3.text = "播放进度："
            _UInode.text4.text = "播放插槽："
            _UInode.input1.text = ANNODE.guid;
            _UInode.input2.text = ANNODE.totalTime + "";
            _UInode.input3.text = ANNODE.progress + "";
            _UInode.input4.text = ANNODE.AnimSlot + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        /** 音效节点初始化 */
        this.addSoundBtn.transitionEnable = true;
        this.addSoundBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addSoundBtn.fontColor = LinearColor.white;
        this.addSoundBtn.setNormalImageColorDecimal(0.2 * 170, 0.2 * 170, 1 * 170, 1 * 255);
        this.addSoundBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let SOUNDNODE = new SoundNode();
            _UInode.tittleText.text = "音效节点";
            _UInode.text1.text = "音效GUID："
            _UInode.text2.text = "音量："
            _UInode.text3.text = "无衰半径："
            _UInode.text4.text = "衰减半径："
            _UInode.text5.text = "停止秒数："
            _UInode.input1.text = SOUNDNODE.guid;
            _UInode.input2.text = SOUNDNODE.volume + "";
            _UInode.input3.text = SOUNDNODE.inner + "";
            _UInode.input4.text = SOUNDNODE.outter + "";
            _UInode.input5.text = SOUNDNODE.stopTime + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        /** 位移节点初始化 */
        this.addWeiYiBtn.transitionEnable = true;
        this.addWeiYiBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addWeiYiBtn.fontColor = LinearColor.white;
        this.addWeiYiBtn.setNormalImageColorDecimal(0.2 * 170, 1 * 170, 0.2 * 170, 1 * 255);
        this.addWeiYiBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let _WeiYiNode = new WeiYiNode();
            _UInode.tittleText.text = "位移节点";
            _UInode.text1.text = "水平距离："
            _UInode.text2.text = "垂直距离："
            _UInode.text3.text = "偏航角度："
            _UInode.text4.text = "位移耗时："
            _UInode.text5.text = "检测次数："
            _UInode.input1.text = _WeiYiNode.lenth + "";
            _UInode.input2.text = _WeiYiNode.zOffset + "";
            _UInode.input3.text = _WeiYiNode.yaw + "";
            _UInode.input4.text = _WeiYiNode.time + "";
            _UInode.input5.text = _WeiYiNode.checkCount + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();


            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        /** 球圆判定节点初始化 */
        this.addYuanBtn.transitionEnable = true;
        this.addYuanBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addYuanBtn.fontColor = LinearColor.white;
        this.addYuanBtn.setNormalImageColorDecimal(0.8 * 170, 0.2 * 170, 0.2 * 170, 1 * 255);
        this.addYuanBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let _yuanNode = new YuanNode();
            _UInode.tittleText.text = "球圆判定";
            _UInode.text1.text = "水平距离："
            _UInode.text2.text = "偏航角度："
            _UInode.text3.text = "垂直距离"
            _UInode.text4.text = "半径："
            _UInode.text5.text = "圆柱高度："
            _UInode.text6.text = "判定伤害："
            _UInode.input1.text = _yuanNode.distance + "";
            _UInode.input2.text = _yuanNode.yaw + "";
            _UInode.input3.text = _yuanNode.zOffset + "";
            _UInode.input4.text = _yuanNode.radius + "";
            _UInode.input5.text = _yuanNode.height + "";
            _UInode.input6.text = _yuanNode.damage + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        /** 方盒判定节点初始化 */
        this.addFangBtn.transitionEnable = true;
        this.addFangBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addFangBtn.fontColor = LinearColor.white;
        this.addFangBtn.setNormalImageColorDecimal(1 * 170, 0.4 * 170, 0.4 * 170, 1 * 255);
        this.addFangBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let _boxNode = new BoxNode();
            _UInode.tittleText.text = "方盒判定";
            _UInode.text1.text = "水平距离："
            _UInode.text2.text = "偏航角度："
            _UInode.text3.text = "俯仰角度："
            _UInode.text4.text = "垂直距离："
            _UInode.text5.text = "方盒长度："
            _UInode.text6.text = "方盒宽度："
            _UInode.text7.text = "方盒高度："
            _UInode.text8.text = "判定伤害："
            _UInode.input1.text = _boxNode.distance + "";
            _UInode.input2.text = _boxNode.yaw + "";
            _UInode.input3.text = _boxNode.pitch + "";
            _UInode.input4.text = _boxNode.zOffset + "";
            _UInode.input5.text = _boxNode.height + "";
            _UInode.input6.text = _boxNode.damage + "";
            _UInode.input7.text = _boxNode.damage + "";
            _UInode.input8.text = _boxNode.damage + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();


            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })


        /** 装备节点初始化 */
        this.addEquipBtn.transitionEnable = true;
        this.addEquipBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addEquipBtn.fontColor = LinearColor.white;
        this.addEquipBtn.setNormalImageColorDecimal(1 * 170, 0.6 * 170, 0 * 170, 1 * 255);
        this.addEquipBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let BoxNode = new EquipNode();
            _UInode.tittleText.text = "装备节点";
            _UInode.text1.text = "模型GUID："
            _UInode.text2.text = "相对位置："
            _UInode.text3.text = "相对缩放："
            _UInode.text4.text = "相对旋转："
            _UInode.text5.text = "装备插槽："
            _UInode.input1.text = BoxNode.guid;
            _UInode.input2.text = v3toString(BoxNode.location);
            _UInode.input3.text = v3toString(BoxNode.scale) + "";
            _UInode.input4.text = v3toString(BoxNode.rotate) + "";
            _UInode.input5.text = BoxNode.SlotType + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();


            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        /** 延迟节点初始化 */
        this.addDelayBtn.transitionEnable = true;
        this.addDelayBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addDelayBtn.fontColor = LinearColor.white;
        this.addDelayBtn.setNormalImageColorDecimal(0.4 * 170, 0.6 * 170, 0.4 * 170, 1 * 255);
        this.addDelayBtn.onClicked.add(() => {
            let _UInode = mw.UIService.create(UINode);

            let _delayNode = new DelayNode();
            _UInode.tittleText.text = "延迟节点";
            _UInode.text1.text = "时长秒："
            _UInode.input1.text = _delayNode.delayTime + "";

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);

            this.contentCanv.addChild(_UInode.uiObject);
            hideTextByXCount(_UInode);
            this.onContentChange();

            _UInode.visible = true;
            _UInode.uiObject.visibility = mw.SlateVisibility.Visible;
            _UInode.uiObject.size = new Vector2(size.x / 7, size.y / 3);
            _UInode.uiObject.position = new Vector2(0, 0);
        })

        MyClearAct.instance.SkillLists.forEach((value: DongXiaoList) => {
            if (value.skillName == "default") {
                this.downInput.text = value.skillJson;
                setTimeout(() => {
                    this.fanXuLieHua();
                }, 300);
            }
        })


    }

    public targetUIWidget: mw.Widget = undefined;

}

/** 通用UI节点 */
class UINode extends mw.UIScript {
    public BGP: mw.Image = undefined;
    public tittleCanv: mw.Canvas = undefined;
    public tittleText: mw.TextBlock = undefined;
    public playNowBtn: mw.StaleButton = undefined;
    public delteBtn: mw.StaleButton = undefined;

    public canv1: mw.Canvas = undefined;
    public text1: mw.TextBlock = undefined;
    public input1: mw.InputBox = undefined;

    public canv2: mw.Canvas = undefined;
    public text2: mw.TextBlock = undefined;
    public input2: mw.InputBox = undefined;

    public canv3: mw.Canvas = undefined;
    public text3: mw.TextBlock = undefined;
    public input3: mw.InputBox = undefined;

    public canv4: mw.Canvas = undefined;
    public text4: mw.TextBlock = undefined;
    public input4: mw.InputBox = undefined;

    public canv5: mw.Canvas = undefined;
    public text5: mw.TextBlock = undefined;
    public input5: mw.InputBox = undefined;

    public canv6: mw.Canvas = undefined;
    public text6: mw.TextBlock = undefined;
    public input6: mw.InputBox = undefined;

    public canv7: mw.Canvas = undefined;
    public text7: mw.TextBlock = undefined;
    public input7: mw.InputBox = undefined;

    public canv8: mw.Canvas = undefined;
    public text8: mw.TextBlock = undefined;
    public input8: mw.InputBox = undefined;

    public canv9: mw.Canvas = undefined;
    public leftMoveBtn: mw.StaleButton = undefined;
    public text9: mw.TextBlock = undefined;
    public rightMoveBtn: mw.StaleButton = undefined;

    public onAwake() {
        let size = WindowUtil.getViewportSize();
        let _margin = new mw.Margin(0.1);
        let cavX = size.x / 7;
        let cavY = size.y / 3;
        let left_center = new mw.UIConstraintAnchors();
        left_center.constraintHorizontal = 0;
        left_center.constraintVertical = 3;

        this.rootCanvas.size = new Vector2(cavX, cavY);
        this.rootCanvas.clipEnable = true;
        this.layer = mw.UILayerSystem;

        this.BGP = mw.Image.newObject(this.rootCanvas);
        this.BGP.imageGuid = "142238";
        this.BGP.size = this.rootCanvas.size;

        /** tittle */
        this.tittleCanv = mw.Canvas.newObject(this.rootCanvas, "tittleCanv");
        this.tittleCanv.size = new Vector2(cavX, cavY / 11);
        this.tittleCanv.position = Vector2.zero.add(new Vector2(0, 4));
        this.tittleCanv.autoLayoutRule = new mw.UILayout(5, new mw.Margin(0.02), mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.tittleCanv.zOrder += 1;

        this.tittleText = mw.TextBlock.newObject(this.rootCanvas, "tittleText");
        this.tittleText.size = new Vector2(0.6 * cavX, 28);
        this.tittleText.constraints = left_center;
        this.tittleText.text = "特效节点";
        this.tittleCanv.addChild(this.tittleText);

        /** 立即播放当前节点 */
        this.playNowBtn = mw.StaleButton.newObject(this.rootCanvas, "playNowBtn");
        this.playNowBtn.size = new Vector2(0.15 * cavX, 28);
        this.playNowBtn.fontSize = 16;
        this.playNowBtn.text = "▶";
        this.tittleCanv.addChild(this.playNowBtn);
        this.delteBtn = mw.StaleButton.newObject(this.rootCanvas, "delteBtn");
        this.delteBtn.size = new Vector2(0.15 * cavX, 28);
        this.delteBtn.fontSize = 16;
        this.delteBtn.text = "X";
        this.tittleCanv.addChild(this.delteBtn);


        /** 1 */
        this.canv1 = mw.Canvas.newObject(this.rootCanvas, "canv1");
        this.canv1.size = new Vector2(cavX, cavY / 11);
        this.canv1.position = Vector2.zero.add(new Vector2(4, 8 + (1 * cavY / 11)));
        this.canv1.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv1.zOrder += 2;

        this.text1 = mw.TextBlock.newObject(this.rootCanvas, "text1");
        this.text1.size = new Vector2(0.3 * cavX, 28);
        this.text1.fontSize = 16;
        this.text1.text = "特效GUID：";
        this.text1.textHorizontalLayout = 2;
        this.canv1.addChild(this.text1);

        this.input1 = mw.InputBox.newObject(this.rootCanvas, "input1");
        this.input1.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input1.fontSize = 12;
        this.input1.textLengthLimit = 999;
        this.input1.text = "这里输入guid";
        this.input1.textVerticalAlign = 2;
        this.canv1.addChild(this.input1);


        /** 2 */
        this.canv2 = mw.Canvas.newObject(this.rootCanvas, "canv2");
        this.canv2.size = new Vector2(cavX, cavY / 11);
        this.canv2.position = Vector2.zero.add(new Vector2(4, 8 + (2 * cavY / 11)));
        this.canv2.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv2.zOrder += 2;

        this.text2 = mw.TextBlock.newObject(this.rootCanvas, "text2");
        this.text2.size = new Vector2(0.3 * cavX, 28);
        this.text2.fontSize = 16;
        this.text2.text = "时间/次数：";
        this.text2.textHorizontalLayout = 2;
        this.canv2.addChild(this.text2);

        this.input2 = mw.InputBox.newObject(this.rootCanvas, "input2");
        this.input2.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input2.fontSize = 12;
        this.input2.textLengthLimit = 999;
        this.input2.text = "这里输时间或次数";
        this.input2.textVerticalAlign = 2;
        this.canv2.addChild(this.input2);

        /** 3 */
        this.canv3 = mw.Canvas.newObject(this.rootCanvas, "canv3");
        this.canv3.size = new Vector2(cavX, cavY / 11);
        this.canv3.position = Vector2.zero.add(new Vector2(4, 8 + (3 * cavY / 11)));
        this.canv3.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv3.zOrder += 2;

        this.text3 = mw.TextBlock.newObject(this.rootCanvas, "text3");
        this.text3.size = new Vector2(0.3 * cavX, 28);
        this.text3.fontSize = 16;
        this.text3.text = "水平距离：";
        this.text3.textHorizontalLayout = 2;
        this.canv3.addChild(this.text3);

        this.input3 = mw.InputBox.newObject(this.rootCanvas, "input3");
        this.input3.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input3.fontSize = 12;
        this.input3.textLengthLimit = 999;
        this.input3.text = "这里输入水平距离";
        this.input3.textVerticalAlign = 2;
        this.canv3.addChild(this.input3);

        /** 4 */
        this.canv4 = mw.Canvas.newObject(this.rootCanvas, "canv4");
        this.canv4.size = new Vector2(cavX, cavY / 11);
        this.canv4.position = Vector2.zero.add(new Vector2(4, 8 + (4 * cavY / 11)));
        this.canv4.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv4.zOrder += 2;

        this.text4 = mw.TextBlock.newObject(this.rootCanvas, "text4");
        this.text4.size = new Vector2(0.3 * cavX, 28);
        this.text4.fontSize = 16;
        this.text4.text = "垂直距离：";
        this.text4.textHorizontalLayout = 2;
        this.canv4.addChild(this.text4);

        this.input4 = mw.InputBox.newObject(this.rootCanvas, "input4");
        this.input4.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input4.fontSize = 12;
        this.input4.textLengthLimit = 999;
        this.input4.text = "这里输入垂直距离";
        this.input4.textVerticalAlign = 2;
        this.canv4.addChild(this.input4);

        /** 5 */
        this.canv5 = mw.Canvas.newObject(this.rootCanvas, "canv5");
        this.canv5.size = new Vector2(cavX, cavY / 11);
        this.canv5.position = Vector2.zero.add(new Vector2(4, 8 + (5 * cavY / 11)));
        this.canv5.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv5.zOrder += 2;

        this.text5 = mw.TextBlock.newObject(this.rootCanvas, "text5");
        this.text5.size = new Vector2(0.3 * cavX, 28);
        this.text5.fontSize = 16;
        this.text5.text = "偏航角度：";
        this.text5.textHorizontalLayout = 2;
        this.canv5.addChild(this.text5);

        this.input5 = mw.InputBox.newObject(this.rootCanvas, "input5");
        this.input5.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input5.fontSize = 12;
        this.input5.textLengthLimit = 999;
        this.input5.text = "这里输入偏航角度";
        this.input5.textVerticalAlign = 2;
        this.canv5.addChild(this.input5);

        /** 6 */
        this.canv6 = mw.Canvas.newObject(this.rootCanvas, "canv6");
        this.canv6.size = new Vector2(cavX, cavY / 11);
        this.canv6.position = Vector2.zero.add(new Vector2(4, 8 + (6 * cavY / 11)));
        this.canv6.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv6.zOrder += 2;

        this.text6 = mw.TextBlock.newObject(this.rootCanvas, "text6");
        this.text6.size = new Vector2(0.3 * cavX, 28);
        this.text6.fontSize = 16;
        this.text6.text = "特效缩放：";
        this.text6.textHorizontalLayout = 2;
        this.canv6.addChild(this.text6);

        this.input6 = mw.InputBox.newObject(this.rootCanvas, "input6");
        this.input6.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input6.fontSize = 12;
        this.input6.textLengthLimit = 999;
        this.input6.text = "这里输入特效缩放";
        this.input6.textVerticalAlign = 2;
        this.canv6.addChild(this.input6);

        /** 7 */
        this.canv7 = mw.Canvas.newObject(this.rootCanvas, "canv7");
        this.canv7.size = new Vector2(cavX, cavY / 11);
        this.canv7.position = Vector2.zero.add(new Vector2(4, 8 + (7 * cavY / 11)));
        this.canv7.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv7.zOrder += 2;

        this.text7 = mw.TextBlock.newObject(this.rootCanvas, "text7");
        this.text7.size = new Vector2(0.3 * cavX, 28);
        this.text7.fontSize = 16;
        this.text7.text = "特效旋转：";
        this.text7.textHorizontalLayout = 2;
        this.canv7.addChild(this.text7);

        this.input7 = mw.InputBox.newObject(this.rootCanvas, "input7");
        this.input7.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input7.fontSize = 12;
        this.input7.textLengthLimit = 999;
        this.input7.text = "这里输入特效旋转";
        this.input7.textVerticalAlign = 2;
        this.canv7.addChild(this.input7);

        /** 8 */
        this.canv8 = mw.Canvas.newObject(this.rootCanvas, "canv8");
        this.canv8.size = new Vector2(cavX, cavY / 11);
        this.canv8.position = Vector2.zero.add(new Vector2(4, 8 + (8 * cavY / 11)));
        this.canv8.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv8.zOrder += 2;

        this.text8 = mw.TextBlock.newObject(this.rootCanvas, "text8");
        this.text8.size = new Vector2(0.3 * cavX, 28);
        this.text8.fontSize = 16;
        this.text8.text = "特效插槽：";
        this.text8.textHorizontalLayout = 2;
        this.canv8.addChild(this.text8);

        this.input8 = mw.InputBox.newObject(this.rootCanvas, "input8");
        this.input8.size = new Vector2(0.45 * cavX, 0.95 * cavY / 11);
        this.input8.fontSize = 12;
        this.input8.textLengthLimit = 999;
        this.input8.text = "这里输入特效插槽";
        this.input8.textVerticalAlign = 2;
        this.canv8.addChild(this.input8);

        /** 9 */
        this.canv9 = mw.Canvas.newObject(this.rootCanvas, "canv9");
        this.canv9.size = new Vector2(cavX, 1.5 * cavY / 11);
        this.canv9.position = Vector2.zero.add(new Vector2(4, 8 + (9 * cavY / 11)));
        this.canv9.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv9.zOrder += 2;

        this.leftMoveBtn = mw.StaleButton.newObject(this.rootCanvas, "leftMoveBtn");
        this.leftMoveBtn.size = new Vector2(0.2 * cavX, 28);
        this.leftMoveBtn.fontSize = 18;
        this.leftMoveBtn.text = "<";
        this.canv9.addChild(this.leftMoveBtn);

        this.text9 = mw.TextBlock.newObject(this.rootCanvas, "text9");
        this.text9.size = new Vector2(0.25 * cavX, 28);
        this.text9.fontSize = 20;
        this.text9.text = "N";
        this.text9.textHorizontalLayout = 2;
        this.canv9.addChild(this.text9);

        this.rightMoveBtn = mw.StaleButton.newObject(this.rootCanvas, "rightMoveBtn");
        this.rightMoveBtn.size = new Vector2(0.2 * cavX, 28);
        this.rightMoveBtn.fontSize = 18;
        this.rightMoveBtn.text = ">";
        this.canv9.addChild(this.rightMoveBtn);

        this.initBTN();

    }

    onDrop(InGeometry: mw.Geometry, InDragDropEvent: mw.PointerEvent, InOperation: mw.DragDropOperation) {
        // Console.log("OnDrop: " + InDragDropEvent.screenSpacePosition);
        let targetUINODE = mw.findUIScript(MainUI.instance.targetUIWidget) as UINode;
        if (targetUINODE != this) {
            // Console.log("节点 " + targetUINODE.text9.text + " 将要放在 " + this.text9.text + " 的前面");
            insertNode(this, targetUINODE);
        } else {
            let orintext = MainUI.instance.downInput.text;
            MainUI.instance.xuLieHua();
            MainUI.instance.fanXuLieHua();
            MainUI.instance.downInput.text = orintext;
        }
    }

    onTouchStarted(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        return this.detectDragIfPressed(InPointerEvent, mw.Keys.AnyKey);
    }

    onTouchEnded(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.EventReply {
        return mw.EventReply.handled;
    }

    public onDragDetected(InGeometry: mw.Geometry, InPointerEvent: mw.PointerEvent): mw.DragDropOperation {
        MainUI.instance.targetUIWidget = this.uiWidgetBase;
        return this.newDragDrop(this.rootCanvas, "DragDropTag", null, mw.DragPivot.TopLeft, (InPointerEvent.screenSpacePosition.clone().subtract(InGeometry.getAbsolutePosition().clone())).clone().divide(InGeometry.getAbsoluteSize().clone()).clone().multiply(-1));
    }

    /**初始化UI通用节点里的按钮 */
    public initBTN() {

        this.delteBtn.transitionEnable = true;
        this.delteBtn.setPressedImageColorDecimal(200, 100, 100, 255);
        this.delteBtn.onClicked.add(() => {
            this.uiObject.destroyObject();
            Event.dispatchToLocal("onContentChange");
        });

        this.playNowBtn.transitionEnable = true;
        this.playNowBtn.setPressedImageColorDecimal(0, 200, 0, 255);
        this.playNowBtn.onClicked.add(() => {
            let Attacker = Player.localPlayer;
            let NodeName = this.tittleText.text;
            if (NodeName == "特效节点") {
                let node = new EffNode();
                node.guid = this.input1.text;
                node.time = Number(this.input2.text);
                node.distance = Number(this.input3.text);
                node.zOffset = Number(this.input4.text);
                node.yaw = Number(this.input5.text);
                node.scale = stringToVector(this.input6.text);
                node.rotate = stringToRotation(this.input7.text);
                node.EffSlot = Number(this.input8.text);
                if (node.EffSlot < 0) {
                    node.rotate.add(Attacker.character.worldTransform.rotation.clone().multiply(new Rotation(0, 0, 1)));
                }
                MyClearAct.instance.serverPlayEffect(Attacker, node.guid, node.time, node.distance, node.zOffset, node.yaw, node.scale, node.rotate, node.EffSlot);
            }
            if (NodeName == "动画节点") {
                let node = new AniNode();
                node.guid = this.input1.text;
                node.totalTime = Number(this.input2.text);
                node.progress = Number(this.input3.text);
                node.AnimSlot = Number(this.input4.text);
                MyClearAct.instance.serverPlayAnimotion(Attacker, node.guid, node.totalTime, node.progress, node.AnimSlot);
            }
            if (NodeName == "音效节点") {
                let node = new SoundNode();
                node.guid = this.input1.text;
                node.volume = Number(this.input2.text);
                node.inner = Number(this.input3.text);
                node.outter = Number(this.input4.text);
                node.stopTime = Number(this.input5.text);
                MyClearAct.instance.serverPlay3DSound(Attacker, node.guid, node.volume, node.inner, node.outter, node.stopTime);
            }
            if (NodeName == "位移节点") {
                let node = new WeiYiNode();
                node.lenth = Number(this.input1.text);
                node.zOffset = Number(this.input2.text);
                node.yaw = Number(this.input3.text);
                node.time = Number(this.input4.text);
                node.checkCount = Number(this.input5.text);
                MyClearAct.instance.weiYi(Attacker, node.lenth, node.zOffset, node.yaw, node.time, node.checkCount)
            }
            if (NodeName == "球圆判定") {
                let node = new YuanNode();
                node.distance = Number(this.input1.text);
                node.yaw = Number(this.input2.text);
                node.zOffset = Number(this.input3.text);
                node.radius = Number(this.input4.text);
                node.height = Number(this.input5.text);
                node.damage = Number(this.input6.text);
                MyClearAct.instance.yuanPanding(Attacker, node.distance, node.yaw, node.zOffset, node.radius, node.height, node.damage, "未命名技能", Number(this.text9.text));
            }
            if (NodeName == "方盒判定") {
                let node = new BoxNode();
                node.distance = Number(this.input1.text);
                node.yaw = Number(this.input2.text);
                node.pitch = Number(this.input3.text);
                node.zOffset = Number(this.input4.text);
                node.lenth = Number(this.input5.text);
                node.width = Number(this.input6.text);
                node.height = Number(this.input7.text);
                node.damage = Number(this.input8.text);
                MyClearAct.instance.boxPanding(Attacker, node.distance, node.yaw, node.pitch, node.zOffset, node.lenth, node.width, node.height, node.damage, "未命名技能", Number(this.text9.text));
            }
            if (NodeName == "装备节点") {
                let node = new EquipNode();
                node.guid = this.input1.text;
                node.location = stringToVector(this.input2.text);
                node.scale = stringToVector(this.input3.text);
                node.rotate = stringToRotation(this.input4.text);
                node.SlotType = Number(this.input5.text);
                MyClearAct.serverEquipMe(Attacker, node.guid, node.location, node.scale, node.rotate, node.SlotType);
            }
        })
        this.leftMoveBtn.transitionEnable = true;
        this.leftMoveBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.leftMoveBtn.onClicked.add(() => {
            let myIndex = Number(this.text9.text);

            if (myIndex > 1) {
                let targetWidget = MainUI.instance.contentCanv.getChildAt(myIndex - 2) as mw.Widget;
                let targetNode = mw.findUIScript(targetWidget) as UINode;
                // Console.log("My index : " + myIndex + " targetIndex: " + targetNode.text9.text);
                exchange2Node(this, targetNode);
                MainUI.instance.onContentChange();

            }
        })

        this.rightMoveBtn.transitionEnable = true;
        this.rightMoveBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.rightMoveBtn.onClicked.add(() => {
            let myIndex = Number(this.text9.text);
            if (myIndex < MainUI.instance.contentCanv.getChildrenCount()) {
                let targetWidget = MainUI.instance.contentCanv.getChildAt(myIndex) as mw.Widget;
                let targetNode = mw.findUIScript(targetWidget) as UINode;
                // Console.log("My index : " + myIndex + " targetIndex: " + targetNode.text9.text);
                exchange2Node(this, targetNode);
            }
        })
    }

}

/**通过名字获取特效的参数量 */
function getXcountByName(name: string): number {
    if (name == "特效节点") {
        return 8;
    }
    if (name == "动画节点") {
        return 4;
    }
    if (name == "音效节点") {
        return 5;
    }
    if (name == "位移节点") {
        return 5;
    }
    if (name == "球圆判定") {
        return 6;
    }
    if (name == "方盒判定") {
        return 8;
    }
    if (name == "装备节点") {
        return 5;
    }
    if (name == "延迟节点") {
        return 1;
    }
}

/** v3、旋转变量转换为string
 * @param v3 传入的v3或旋转
 * @returns 返回转换好的string
 */
function v3toString(v3: Rotation | Vector): string {
    let st = v3.x + "|" + v3.y + "|" + v3.z;
    return st;
}

/**文本转Rotation，如格式不对则返回Rotation.Zero */
function stringToRotation(st: string): Rotation {
    let parts = st.split("|").map(parseFloat);
    if (parts.length != 3 || parts.some(isNaN)) {
        return Rotation.zero;
    } else {
        return new Rotation(parts[0], parts[1], parts[2]);
    }
}

/**文本转Vector，如格式不对则返回Vector.one */
function stringToVector(st: string): Vector {
    let parts = st.split("|").map(parseFloat);
    if (parts.length != 3 || parts.some(isNaN)) {
        return Vector.one;
    } else {
        return new Vector(parts[0], parts[1], parts[2]);
    }
}

/**交换两个UINode的text
 * @param n1 传入的两个UINode
 * @param n2 传入的两个UINode
 */
function exchange2Node(n1: UINode, n2: UINode) {
    // Console.log("ok");

    let nn = mw.UIService.create(UINode);
    nn.tittleText.text = n1.tittleText.text
    nn.text1.text = n1.text1.text
    nn.text2.text = n1.text2.text
    nn.text3.text = n1.text3.text
    nn.text4.text = n1.text4.text
    nn.text5.text = n1.text5.text
    nn.text6.text = n1.text6.text
    nn.text7.text = n1.text7.text
    nn.text8.text = n1.text8.text
    nn.input1.text = n1.input1.text
    nn.input2.text = n1.input2.text
    nn.input3.text = n1.input3.text
    nn.input4.text = n1.input4.text
    nn.input5.text = n1.input5.text
    nn.input6.text = n1.input6.text
    nn.input7.text = n1.input7.text
    nn.input8.text = n1.input8.text

    n1.tittleText.text = n2.tittleText.text
    n1.text1.text = n2.text1.text
    n1.text2.text = n2.text2.text
    n1.text3.text = n2.text3.text
    n1.text4.text = n2.text4.text
    n1.text5.text = n2.text5.text
    n1.text6.text = n2.text6.text
    n1.text7.text = n2.text7.text
    n1.text8.text = n2.text8.text
    n1.input1.text = n2.input1.text
    n1.input2.text = n2.input2.text
    n1.input3.text = n2.input3.text
    n1.input4.text = n2.input4.text
    n1.input5.text = n2.input5.text
    n1.input6.text = n2.input6.text
    n1.input7.text = n2.input7.text
    n1.input8.text = n2.input8.text

    n2.tittleText.text = nn.tittleText.text
    n2.text1.text = nn.text1.text
    n2.text2.text = nn.text2.text
    n2.text3.text = nn.text3.text
    n2.text4.text = nn.text4.text
    n2.text5.text = nn.text5.text
    n2.text6.text = nn.text6.text
    n2.text7.text = nn.text7.text
    n2.text8.text = nn.text8.text
    n2.input1.text = nn.input1.text
    n2.input2.text = nn.input2.text
    n2.input3.text = nn.input3.text
    n2.input4.text = nn.input4.text
    n2.input5.text = nn.input5.text
    n2.input6.text = nn.input6.text
    n2.input7.text = nn.input7.text
    n2.input8.text = nn.input8.text
    nn.destroy();
    refreshNodeColor(n1);
    refreshNodeColor(n2);
    hideTextByXCount(n1);
    hideTextByXCount(n2);

}

/**在n1前面插入n2
 * @param n1 
 * @param n2 
 */
function insertNode(n1: UINode, n2: UINode) {
    let num1 = Number(n1.text9.text);
    let num2 = Number(n2.text9.text);

    let tempCont: mw.Widget[] = [];
    let insertOne: mw.Widget = undefined;


    for (let index = 1; index <= MainUI.instance.contentCanv.getChildrenCount(); index++) {
        // 拿到当前节点
        let child = MainUI.instance.contentCanv.getChildAt(index - 1) as mw.Widget;
        let childUINODE = mw.findUIScript(child) as UINode;
        let numN = Number(childUINODE.text9.text);
        if (numN != num2) {
            tempCont.push(child);
        } else {
            insertOne = child;
        }
    }
    if (num1 < num2) {
        tempCont.splice(num1 - 1, 0, insertOne);
    } else {
        tempCont.splice(num1 - 2, 0, insertOne);
    }
    // 这一步完成序列重构
    /**整个序列的数组 */
    let xulie: string[] = [];

    tempCont.forEach((value) => {
        let UINODE = mw.findUIScript(value) as UINode;
        let NodeName = UINODE.tittleText.text;
        if (NodeName == "特效节点") {
            let node = new EffNode();
            node.guid = UINODE.input1.text;
            node.time = Number(UINODE.input2.text);
            node.distance = Number(UINODE.input3.text);
            node.zOffset = Number(UINODE.input4.text);
            node.yaw = Number(UINODE.input5.text);
            node.scale = stringToVector(UINODE.input6.text);
            node.rotate = stringToRotation(UINODE.input7.text);
            node.EffSlot = Number(UINODE.input8.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node) + "";
            xulie.push(json);
        }
        if (NodeName == "动画节点") {
            let node = new AniNode();
            node.guid = UINODE.input1.text;
            node.totalTime = Number(UINODE.input2.text);
            node.progress = Number(UINODE.input3.text);
            node.AnimSlot = Number(UINODE.input4.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "音效节点") {
            let node = new SoundNode();
            node.guid = UINODE.input1.text;
            node.volume = Number(UINODE.input2.text);
            node.inner = Number(UINODE.input3.text);
            node.outter = Number(UINODE.input4.text);
            node.stopTime = Number(UINODE.input5.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "位移节点") {
            let node = new WeiYiNode();
            node.lenth = Number(UINODE.input1.text);
            node.zOffset = Number(UINODE.input2.text);
            node.yaw = Number(UINODE.input3.text);
            node.time = Number(UINODE.input4.text);
            node.checkCount = Number(UINODE.input5.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "球圆判定") {
            let node = new YuanNode();
            node.distance = Number(UINODE.input1.text);
            node.yaw = Number(UINODE.input2.text);
            node.zOffset = Number(UINODE.input3.text);
            node.radius = Number(UINODE.input4.text);
            node.height = Number(UINODE.input5.text);
            node.damage = Number(UINODE.input6.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "方盒判定") {
            let node = new BoxNode();
            node.distance = Number(UINODE.input1.text);
            node.yaw = Number(UINODE.input2.text);
            node.pitch = Number(UINODE.input3.text);
            node.zOffset = Number(UINODE.input4.text);
            node.lenth = Number(UINODE.input5.text);
            node.width = Number(UINODE.input6.text);
            node.height = Number(UINODE.input7.text);
            node.damage = Number(UINODE.input8.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "装备节点") {
            let node = new EquipNode();
            node.guid = UINODE.input1.text;
            node.location = stringToVector(UINODE.input2.text);
            node.scale = stringToVector(UINODE.input3.text);
            node.rotate = stringToRotation(UINODE.input4.text);
            node.SlotType = Number(UINODE.input5.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "延迟节点") {
            let node = new DelayNode();
            node.delayTime = Number(UINODE.input1.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
    })

    let json2 = JSON.stringify(xulie);

    let orintext = MainUI.instance.downInput.text;
    MainUI.instance.downInput.text = json2;
    MainUI.instance.fanXuLieHua();
    MainUI.instance.downInput.text = orintext;

}

/**隐藏UINode多余的文字
 * @param n 需要传入的UINode
 * @param Xcount 可选传入Xcount
 */
function hideTextByXCount(n: UINode, Xcount?: number) {
    if (Xcount == undefined) {
        Xcount = getXcountByName(n.tittleText.text);
    }
    if (Xcount == 1) {
        n.text1.visibility = 0;
        n.text2.visibility = 2;
        n.text3.visibility = 2;
        n.text4.visibility = 2;
        n.text5.visibility = 2;
        n.text6.visibility = 2;
        n.text7.visibility = 2;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 2;
        n.input3.visibility = 2;
        n.input4.visibility = 2;
        n.input5.visibility = 2;
        n.input6.visibility = 2;
        n.input7.visibility = 2;
        n.input8.visibility = 2;
    }
    if (Xcount == 2) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 2;
        n.text4.visibility = 2;
        n.text5.visibility = 2;
        n.text6.visibility = 2;
        n.text7.visibility = 2;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 2;
        n.input4.visibility = 2;
        n.input5.visibility = 2;
        n.input6.visibility = 2;
        n.input7.visibility = 2;
        n.input8.visibility = 2;
    }
    if (Xcount == 3) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 0;
        n.text4.visibility = 2;
        n.text5.visibility = 2;
        n.text6.visibility = 2;
        n.text7.visibility = 2;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 0;
        n.input4.visibility = 2;
        n.input5.visibility = 2;
        n.input6.visibility = 2;
        n.input7.visibility = 2;
        n.input8.visibility = 2;
    }
    if (Xcount == 4) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 0;
        n.text4.visibility = 0;
        n.text5.visibility = 2;
        n.text6.visibility = 2;
        n.text7.visibility = 2;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 0;
        n.input4.visibility = 0;
        n.input5.visibility = 2;
        n.input6.visibility = 2;
        n.input7.visibility = 2;
        n.input8.visibility = 2;
    }
    if (Xcount == 5) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 0;
        n.text4.visibility = 0;
        n.text5.visibility = 0;
        n.text6.visibility = 2;
        n.text7.visibility = 2;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 0;
        n.input4.visibility = 0;
        n.input5.visibility = 0;
        n.input6.visibility = 2;
        n.input7.visibility = 2;
        n.input8.visibility = 2;
    }
    if (Xcount == 6) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 0;
        n.text4.visibility = 0;
        n.text5.visibility = 0;
        n.text6.visibility = 0;
        n.text7.visibility = 2;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 0;
        n.input4.visibility = 0;
        n.input5.visibility = 0;
        n.input6.visibility = 0;
        n.input7.visibility = 2;
        n.input8.visibility = 2;
    }
    if (Xcount == 7) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 0;
        n.text4.visibility = 0;
        n.text5.visibility = 0;
        n.text6.visibility = 0;
        n.text7.visibility = 0;
        n.text8.visibility = 2;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 0;
        n.input4.visibility = 0;
        n.input5.visibility = 0;
        n.input6.visibility = 0;
        n.input7.visibility = 0;
        n.input8.visibility = 2;
    }
    if (Xcount == 8) {
        n.text1.visibility = 0;
        n.text2.visibility = 0;
        n.text3.visibility = 0;
        n.text4.visibility = 0;
        n.text5.visibility = 0;
        n.text6.visibility = 0;
        n.text7.visibility = 0;
        n.text8.visibility = 0;
        n.input1.visibility = 0;
        n.input2.visibility = 0;
        n.input3.visibility = 0;
        n.input4.visibility = 0;
        n.input5.visibility = 0;
        n.input6.visibility = 0;
        n.input7.visibility = 0;
        n.input8.visibility = 0;
    }
}

/**刷新节点的图片颜色
 * @param UINODE 需要刷新图片颜色的节点
 */
function refreshNodeColor(UINODE: UINode) {
    let name = UINODE.tittleText.text;
    if (name == "特效节点") {
        UINODE.BGP.imageColor = new LinearColor(0.2, 0.6, 1);
    }
    if (name == "动画节点") {
        UINODE.BGP.imageColor = new LinearColor(0.8, 0.2, 0.8);
    }
    if (name == "音效节点") {
        UINODE.BGP.imageColor = new LinearColor(0.2, 0.2, 1);
    }
    if (name == "位移节点") {
        UINODE.BGP.imageColor = new LinearColor(0.2, 1, 0.2);
    }
    if (name == "球圆判定") {
        UINODE.BGP.imageColor = new LinearColor(0.8, 0.2, 0.2);
    }
    if (name == "方盒判定") {
        UINODE.BGP.imageColor = new LinearColor(1, 0.4, 0.4);
    }
    if (name == "装备节点") {
        UINODE.BGP.imageColor = new LinearColor(1, 0.6, 0);
    }
    if (name == "延迟节点") {
        UINODE.BGP.imageColor = new LinearColor(0.4, 0.6, 0.4);
    }
}
