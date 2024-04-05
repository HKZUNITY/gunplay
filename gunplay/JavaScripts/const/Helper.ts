import EnemyBullet from "../module/Enemy/EnemyBullet";

export default class Helper {
    /**
     * 玩家列表(key:character.gameObjectId, value:player)
     */
    public static playerMap: Map<string, mw.Player> = new Map<string, mw.Player>();
    /**
     * 激活的子弹
     */
    public static activeBulletMap: Map<string, EnemyBullet> = new Map<string, EnemyBullet>();
    /**
     * 失活的子弹
     */
    public static inactiveBullets: EnemyBullet[] = [];
    /**
     * 组队列表(key:character.gameObjectId, value:teamId)
     */
    public static teamMap: Map<string, number> = new Map<string, number>();

    /**圆心半径范围内获取随机点 
     * @param point 圆心点
     * @param range 半径范围
    */
    public static getRangePoint(point: mw.Vector, range: number): mw.Vector {
        //随机半径
        var r = Math.random() * range;
        //随机方向 -180~180
        //如果是平面，仅改变Z轴角度，如果非平面，要随机3个角度
        //随机一个角度（180~-180）
        var angle = Math.random() * 360 - 180;
        var x = Math.sin(angle);
        var y = Math.cos(angle);
        //选取一个合适的高度
        var pos = new mw.Vector(point.x + x * r, point.y + y * r, point.z + 100);
        return pos;
    }

    /**
     * 得到圆周上的n个分布均匀的点的坐标
     * @param center 圆点
     * @param radius 半径
     * @param count 多少点
     * @returns 点的集合
     */
    public static getCirclePoints(center: mw.Vector, radius: number, count: number): mw.Vector[] {
        let points: mw.Vector[] = [];
        let radians = (Math.PI / 180) * Math.round(360 / count);//弧度
        for (let i = 0; i < count; ++i) {
            let x = center.x + Math.sin(radians * i) * radius;
            let y = center.y + Math.cos(radians * i) * radius;
            points.push(new mw.Vector(x, y, center.z + 100));
        }
        return points;
    }

    /**
     * 得到圆弧上的n个分布均匀的点的坐标
     * @param center 圆点  
     * @param radius 半径  
     * @param count 多少点 
     * @param startAngle 起始角度
     * @param endAngle 终止角度
     * @returns 点的集合
     */
    public static getArcPoints(center: mw.Vector, radius: number, count: number, startAngle: number, endAngle: number): mw.Vector[] {
        let points: mw.Vector[] = [];
        let aoa: number = endAngle - startAngle;//角度差
        let amount: number = Math.round(360 * count / aoa);//把圆分成这些份数
        let startI: number = Math.round(startAngle * amount / 360);
        let endI: number = Math.round(endAngle * amount / 360);
        let radians = (Math.PI / 180) * Math.round(360 / amount);//弧度
        for (let i = startI; i < endI; ++i) {
            let x = center.x + Math.sin(radians * i) * radius;
            let y = center.y + Math.cos(radians * i) * radius;
            points.push(new mw.Vector(x, y, center.z + 100));
        }
        return points;
    }

    /**
     * 随机整数[min, max]
     */
    public static getRandomNum(min: number, max: number): number {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    /**
     * 得到两个坐标之间的n个分布均匀的点的坐标,相邻100距离
     * @param start 起始点 
     * @param end 终止点 
     * @returns 点的集合 
     */
    public static getPointsBetween2(start: mw.Vector, end: mw.Vector): mw.Vector[] {
        let points: mw.Vector[] = [];
        let length = mw.Vector.distance(start, end);
        let count = Math.floor(length / 100);
        let dir = new mw.Vector(end.x - start.x, end.y - start.y, end.z - start.z).normalized;
        for (let i = 0; i <= count; ++i) {
            let offsetVec = (dir.clone()).multiply(100 * i);
            let pos = new mw.Vector(offsetVec.x + start.x, offsetVec.y + start.y, offsetVec.z + start.z);
            points.push(pos);
        }
        return points;
    }

    /**
     * 通过击杀数获取等级和经验
     * @param killCount 击杀数
     */
    public static getLvAndExpByKillCount(killCount: number): number[] {
        let offLv: number = 1;
        while (killCount > 0) {
            offLv++;
            killCount -= offLv;
        }
        return [offLv, killCount + offLv - 1];
    }
}