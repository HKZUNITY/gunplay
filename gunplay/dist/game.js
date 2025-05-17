"use strict";

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

class Globaldata {}

Globaldata.logLevel = 0;

Globaldata.isHideHeadUI = false;

Globaldata.isOpenIAA = false;

Globaldata.TeamIcon = [ "165111", "165109", "165108", "165107", "165106", "184518", "159775", "184516", "184927", "170391", "169718", "54193", "168056", "168058" ];

Globaldata.TeamIconSize = [ new mw.Vector2(460.8, 691.2), new mw.Vector2(460.8, 691.2), new mw.Vector2(460.8, 691.2), new mw.Vector2(460.8, 691.2), new mw.Vector2(460.8, 691.2), new mw.Vector2(617.5, 572), new mw.Vector2(600, 600), new mw.Vector2(460.8, 691.2), new mw.Vector2(563.2, 601.6), new mw.Vector2(876, 614.4), new mw.Vector2(672.77, 721.92), new mw.Vector2(650, 650), new mw.Vector2(672.77, 721.92), new mw.Vector2(672.77, 721.92) ];

Globaldata.TeamIconPos = [ new mw.Vector2(20, 70), new mw.Vector2(20, 70), new mw.Vector2(20, 70), new mw.Vector2(20, 70), new mw.Vector2(20, 70), new mw.Vector2(-58.75, 121.28), new mw.Vector2(-50, 164.36), new mw.Vector2(20, 70), new mw.Vector2(-63.2, 156.36), new mw.Vector2(-188, 161.88), new mw.Vector2(-86.92, 76.32), new mw.Vector2(-75, 124), new mw.Vector2(-86.92, 76.32), new mw.Vector2(-86.92, 76.32) ];

Globaldata.dailyRefreshTime = "4:0";

Globaldata.weeklyRefreshTime = "4:0";

Globaldata.rankNpcAnimations = [ "14625", "123720", "123722", "148733", "123296" ];

Globaldata.teamCount = 10;

var foreign16 = Object.freeze({
    __proto__: null,
    default: Globaldata
});

var LogType;

(function(LogType) {
    LogType[LogType["None"] = 0] = "None";
    LogType[LogType["Log"] = 1] = "Log";
    LogType[LogType["Warn"] = 2] = "Warn";
    LogType[LogType["Error"] = 3] = "Error";
    LogType[LogType["Log_Warn"] = 4] = "Log_Warn";
    LogType[LogType["Log_Error"] = 5] = "Log_Error";
    LogType[LogType["Warn_Error"] = 6] = "Warn_Error";
    LogType[LogType["Log_Warn_Error"] = 7] = "Log_Warn_Error";
})(LogType || (LogType = {}));

class Console {
    static log(...data) {
        if (Globaldata.logLevel == LogType.None || Globaldata.logLevel == LogType.Warn || Globaldata.logLevel == LogType.Error || Globaldata.logLevel == LogType.Warn_Error) return;
        console.log(data);
    }
    static warn(...data) {
        if (Globaldata.logLevel == LogType.None || Globaldata.logLevel == LogType.Log || Globaldata.logLevel == LogType.Error || Globaldata.logLevel == LogType.Log_Error) return;
        console.warn(data);
    }
    static error(...data) {
        if (Globaldata.logLevel == LogType.None || Globaldata.logLevel == LogType.Log || Globaldata.logLevel == LogType.Warn || Globaldata.logLevel == LogType.Log_Warn) return;
        console.error(data);
    }
}

var foreign67 = Object.freeze({
    __proto__: null,
    get LogType() {
        return LogType;
    },
    default: Console
});

let Tween$2 = class Tween extends mw.Tween {};

class Utils {
    static getRandomInteger(min, max) {
        let Range = max - min;
        let Rand = Math.random();
        return min + Math.round(Rand * Range);
    }
    static getRandomDecimals(maxNum = 0, minNum = 0, decimalNum = 0) {
        let max = 0;
        let min = 0;
        minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
        switch (arguments.length) {
          case 1:
            return Math.floor(Math.random() * (max + 1));

          case 2:
            return Math.floor(Math.random() * (max - min + 1) + min);

          case 3:
            return Number((Math.random() * (max - min) + min).toFixed(decimalNum));

          default:
            return Math.random();
        }
    }
    static getCurvePointsInNum(points, num) {
        let result = new Array;
        for (let i = 0; i < num; i++) {
            let t = i / (num - 1);
            let point = this.getKeyPoint(points, t);
            result.push(point);
        }
        return result;
    }
    static getKeyPoint(points, t) {
        if (points.length > 1) {
            let dirs = new Array;
            for (let i = 0; i < points.length - 1; ++i) {
                dirs.push(new mw.Vector(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y, points[i + 1].z - points[i].z));
            }
            let points2 = new Array;
            for (let j = 0; j < dirs.length; j++) {
                points2.push(new mw.Vector(points[j].x + dirs[j].x * t, points[j].y + dirs[j].y * t, points[j].z + dirs[j].z * t));
            }
            return this.getKeyPoint(points2, t);
        } else {
            return new mw.Vector(points[0].x, points[0].y, points[0].z);
        }
    }
    static shakeFunc(x, speed, frequency, amplitude) {
        return Math.pow(speed, -x) * Math.sin(2 * frequency * Math.PI * x) / amplitude;
    }
    static getTdAngle(center, start, end) {
        let x1 = start.x - center.x, y1 = start.y - center.y, z1 = start.z - center.z;
        let x2 = end.x - center.x, y2 = end.y - center.y, z2 = end.z - center.z;
        let vectorDot = x1 * x2 + y1 * y2 + z1 * z2;
        let vectorMold1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2));
        let vectorMold2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2) + Math.pow(z2, 2));
        let cosAngle = vectorDot / (vectorMold1 * vectorMold2);
        let radian = Math.acos(cosAngle);
        return 180 / Math.PI * radian;
    }
    static getmsArea(center, start, end) {
        let x1 = start.x - center.x, y1 = start.y - center.y, z1 = start.z - center.z;
        let x2 = end.x - center.x, y2 = end.y - center.y, z2 = end.z - center.z;
        let vectorMultiplication = new mw.Vector(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
        Console.error("[叉乘 - vectorMultiplication]" + vectorMultiplication);
        let area = Math.sqrt(Math.pow(vectorMultiplication.x, 2) + Math.pow(vectorMultiplication.y, 2) + Math.pow(vectorMultiplication.z, 2));
        return area;
    }
    static getDay() {
        let day = "";
        day += (new Date).getFullYear();
        day += (new Date).getMonth() + 1;
        day += (new Date).getDate();
        return day;
    }
    static getRandomArr(arr, num) {
        let len = arr.length;
        for (let i = len - 1; i >= 0; --i) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemIndex = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = itemIndex;
        }
        let arrList = [];
        for (let i = 0; i < num; ++i) {
            arrList.push(arr[i]);
        }
        return arrList;
    }
    static circularRandomCoordinates(point, radius, centerZ) {
        const u = Math.random();
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.sqrt(u);
        return new mw.Vector(point.x + r * Math.cos(theta) * radius, point.y + r * Math.sin(theta) * radius, centerZ);
    }
    static randomColor() {
        let colors = [ mw.LinearColor.red, mw.LinearColor.green, mw.LinearColor.blue, mw.LinearColor.yellow, new mw.LinearColor(1, 0, 1, 1), new mw.LinearColor(0, 1, 1, 1), mw.LinearColor.white ];
        let fontColor = colors[this.getRandomInteger(0, colors.length - 1)];
        let outlineColor = colors[this.getRandomInteger(0, colors.length - 1)];
        while (fontColor.a == outlineColor.a && fontColor.r == outlineColor.r && fontColor.g == outlineColor.g && fontColor.b == outlineColor.b) {
            outlineColor = colors[this.getRandomInteger(0, colors.length - 1)];
            Console.error("颜色重复");
        }
        return [ fontColor, outlineColor ];
    }
    static getCurrentTime() {
        let date = new Date;
        return date.getHours() + ":" + date.getMinutes();
    }
    static getWhatDay() {
        let whatDay = "7123456".charAt((new Date).getDay());
        return whatDay;
    }
    static getLastDay(day) {
        let whatDay = "7123456".charAt(day);
        return whatDay;
    }
    static iSameWeek(date1, date2) {
        let dt1 = new Date;
        dt1.setTime(date1);
        let dt2 = new Date;
        dt2.setTime(date2);
        let md1 = this.tmonday(dt1);
        let md2 = this.tmonday(dt2);
        return md1 === md2;
    }
    static tmonday(dtm) {
        let dte = new Date(dtm);
        let day = dte.getDay();
        let dty = dte.getDate();
        if (day === 0) {
            day = 7;
        }
        dte.setDate(dty - day + 1);
        return dte.getFullYear() + "-" + dte.getMonth() + "-" + dte.getDate();
    }
    static openUITween(mCanvas, onStart, onComplete) {
        let tmpX = 0;
        let tmpY = 0;
        if (this.getRandomInteger(0, 1) == 0) {
            if (this.getRandomInteger(0, 1)) {
                tmpX = mCanvas.size.x;
            } else {
                tmpX = -mCanvas.size.x;
            }
            tmpY = this.getRandomInteger(-mCanvas.size.y, mCanvas.size.y);
            Console.error("wfz - A - tmpX = " + tmpX + "\ntmpY = " + tmpY);
        } else {
            tmpX = this.getRandomInteger(-mCanvas.size.x, mCanvas.size.x);
            if (this.getRandomInteger(0, 1)) {
                tmpY = mCanvas.size.y;
            } else {
                tmpY = -mCanvas.size.y;
            }
            Console.error("wfz - A - tmpX = " + tmpX + "\ntmpY = " + tmpY);
        }
        new mw.Tween({
            x: tmpX,
            y: tmpY
        }).to({
            x: 0,
            y: 0
        }, .5 * 1e3).onStart((() => {
            mCanvas.position = new mw.Vector2(tmpX, tmpY);
            if (onStart) onStart();
        })).onUpdate((v => {
            mCanvas.position = new mw.Vector2(v.x, v.y);
        })).easing(cubicBezier(.75, 2.9, .46, -.18)).onComplete((() => {
            mCanvas.position = mw.Vector2.zero;
            if (onComplete) onComplete();
        })).start();
        let scaleType = this.getRandomInteger(0, 2);
        new mw.Tween({
            x: 0,
            y: 0
        }).to({
            x: 1,
            y: 1
        }, .5 * 1e3).onStart((() => {
            switch (scaleType) {
              case 0:
                mCanvas.renderScale = new mw.Vector2(1, 0);
                break;

              case 1:
                mCanvas.renderScale = new mw.Vector2(0, 1);
                break;

              case 2:
                mCanvas.renderScale = new mw.Vector2(1, 1);
                break;
            }
        })).onUpdate((v => {
            switch (scaleType) {
              case 0:
                mCanvas.renderScale = new mw.Vector2(1, v.y);
                break;

              case 1:
                mCanvas.renderScale = new mw.Vector2(v.x, 1);
                break;

              case 2:
                mCanvas.renderScale = new mw.Vector2(v.x, v.y);
                break;
            }
        })).onComplete((() => {
            mCanvas.renderScale = mw.Vector2.one;
        })).start();
    }
    static openUITween1(mCanvas, onStart, onComplete) {
        let scaleType = this.getRandomInteger(0, 2);
        new mw.Tween({
            x: 0,
            y: 0
        }).to({
            x: 1,
            y: 1
        }, .5 * 1e3).onStart((() => {
            if (onStart) {
                onStart();
            }
            switch (scaleType) {
              case 0:
                mCanvas.renderScale = new mw.Vector2(1, 0);
                break;

              case 1:
                mCanvas.renderScale = new mw.Vector2(0, 1);
                break;

              case 2:
                mCanvas.renderScale = new mw.Vector2(1, 1);
                break;
            }
        })).onUpdate((v => {
            switch (scaleType) {
              case 0:
                mCanvas.renderScale = new mw.Vector2(1, v.y);
                break;

              case 1:
                mCanvas.renderScale = new mw.Vector2(v.x, 1);
                break;

              case 2:
                mCanvas.renderScale = new mw.Vector2(v.x, v.y);
                break;
            }
        })).onComplete((() => {
            if (onComplete) {
                onComplete();
            }
            mCanvas.renderScale = mw.Vector2.one;
        })).start();
    }
    static closeUITween(mCanvas, onStart, onComplete) {
        let scaleType = this.getRandomInteger(0, 2);
        new mw.Tween({
            x: 1,
            y: 1
        }).to({
            x: 0,
            y: 0
        }, .5 * 1e3).onStart((() => {
            if (onStart) onStart();
            mCanvas.renderScale = new mw.Vector2(1, 1);
        })).onUpdate((v => {
            switch (scaleType) {
              case 0:
                mCanvas.renderScale = new mw.Vector2(1, v.y);
                break;

              case 1:
                mCanvas.renderScale = new mw.Vector2(v.x, 1);
                break;

              case 2:
                mCanvas.renderScale = new mw.Vector2(v.x, v.y);
                break;
            }
        })).onComplete((() => {
            if (onComplete) onComplete();
            switch (scaleType) {
              case 0:
                mCanvas.renderScale = new mw.Vector2(1, 0);
                break;

              case 1:
                mCanvas.renderScale = new mw.Vector2(0, 1);
                break;

              case 2:
                mCanvas.renderScale = new mw.Vector2(0, 0);
                break;
            }
        })).start();
    }
    static getLvText(lv) {
        let lvText = "";
        let lvType = Math.floor(lv / 10);
        switch (lvType) {
          case 0:
            lvText = "坚韧黑铁";
            break;

          case 1:
            lvText = "英勇青铜";
            break;

          case 2:
            lvText = "不屈白银";
            break;

          case 3:
            lvText = "荣耀黄金";
            break;

          case 4:
            lvText = "华贵铂金";
            break;

          case 5:
            lvText = "流光翡翠";
            break;

          case 6:
            lvText = "璀璨钻石";
            break;

          case 7:
            lvText = "超凡大师";
            break;

          case 8:
            lvText = "傲世宗师";
            break;

          case 9:
            lvText = "最强王者";
            break;

          default:
            lvText = "最强王者";
            break;
        }
        return lvText;
    }
    static getWorldLocation() {
        return this.locs1[this.getRandomInteger(0, this.locs1.length - 1)];
    }
    static getRole() {
        return this.role[this.getRandomInteger(0, this.role.length - 1)];
    }
    static getBoss() {
        return this.boss[this.getRandomInteger(0, this.boss.length - 1)];
    }
    static async asyncDownloadAsset(guid) {
        if (!mw.AssetUtil.assetLoaded(guid)) {
            await mw.AssetUtil.asyncDownloadAsset(guid);
        }
    }
    static getRoleName() {
        return this.roleNames[this.getRandomInteger(0, this.roleNames.length - 1)];
    }
}

Utils.locs = [ new mw.Vector(-2815.27, 6414.78, 634.89), new mw.Vector(-5679.18, 5856.87, 641.54), new mw.Vector(-6074.14, 3747.37, 634.89), new mw.Vector(-2450.97, 1541.83, 1123.84), new mw.Vector(-5821.87, 1541.48, 1123.84), new mw.Vector(289.15, 730.21, 1335.22), new mw.Vector(3766.14, 747.63, 1335.22), new mw.Vector(4215.02, 3238, 120.07), new mw.Vector(-26.71, 4482.2, 117.67), new mw.Vector(-1569.16, 715.07, 1335.22) ];

Utils.locs1 = [ new mw.Vector(5200, 5e3, 200), new mw.Vector(5400, 4500, 200), new mw.Vector(4e3, 5e3, 150), new mw.Vector(5300, 5e3, 200), new mw.Vector(5400, 4600, 200), new mw.Vector(4100, 5e3, 150), new mw.Vector(5200, 5100, 200), new mw.Vector(5500, 4500, 200), new mw.Vector(4e3, 5100, 150) ];

Utils.role = [ "219915", "141618", "142272", "142255", "219912", "226915", "226913", "142153", "219909", "142396", "142397" ];

Utils.boss = [ "725755E0486B49CB76B639ADEFBBA0CA", "DDD55DB5477B195FBBC8B7AB8CA13158", "85203412476957700C2C359F393D04F6", "6AD38A03493BBC1664E97A8A325B0194", "5D48D5924A4528FEC71E25B32B642DA3", "1EB7E14C40A79DDAE64E4FA130932EBD", "F3EDE2C4488A8150264E37911C50274B", "0BE51745491ED48A55D55981D4F98DE0", "FF8E54FB4921FABA9FF8FEBFA72D45F5" ];

Utils.bossGuns = [ "43712", "122716", "99699", "95676", "122720" ];

Utils.bossFireEffects = [ "13594", "157439", "157440", "157451", "157453" ];

Utils.bossFireEffectOffsets = [ new mw.Vector(65, 0, 10), new mw.Vector(35, 0, 10), new mw.Vector(120, 0, 10), new mw.Vector(85, 0, 10), new mw.Vector(90, 0, 10) ];

Utils.roleNames = [ "张吉惟", "林国瑞", "林玫书", "林雅南", "江奕云", "刘柏宏", "阮建安", "林子帆", "夏志豪", "吉茹定", "李中冰", "谢彦文", "傅智翔", "洪振霞", "刘姿婷", "荣姿康", "吕致盈", "方一强", "黎芸贵", "郑伊雯", "雷进宝", "吴美隆", "吴心真", "王美珠", "郭芳天", "李雅惠", "陈文婷", "曹敏侑", "王依婷", "陈婉璇", "吴美玉", "蔡依婷", "郑昌梦", "林家纶", "黄丽昆", "李育泉", "黄芸欢", "吴韵如", "李肇芬", "卢木仲", "李成白", "方兆玉", "刘翊惠", "丁汉臻", "吴佳瑞", "舒绿珮", "周白芷", "张姿妤", "张虹伦", "周琼玫", "倪怡芳", "郭贵妃", "杨佩芳", "黄盛玫", "郑丽青", "许智云", "张孟涵", "李小爱", "王恩龙", "朱政廷", "邓诗涵", "陈政倩", "吴俊伯", "阮馨学", "翁惠珠", "吴思翰", "林佩玲", "邓海来", "陈翊依", "李建智", "武淑芬", "金雅琪", "赖怡宜", "黄育霖", "张仪湖", "王俊民", "张诗刚", "林慧颖", "沈俊君", "陈淑妤", "李姿伶", "高咏钰", "黄彦宜", "周孟儒", "潘欣臻", "李祯韵", "叶洁启", "梁哲宇", "黄晓萍", "杨雅萍", "卢志铭", "张茂以", "林婉婷", "蔡宜芸", "林珮瑜", "黄柏仪", "周逸珮", "夏雅惠", "王采珮", "林孟霖", "林竹水", "王怡乐", "王爱乐", "金佳蓉", "韩健毓", "李士杰", "陈董珍", "苏姿婷", "张政霖", "李志宏", "陈素达", "陈虹荣", "何美玲", "李仪琳", "张俞幸", "黄秋萍", "潘吉维" ];

function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;
    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;
    function sampleCurveDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }
    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }
    function solveCurveX(x) {
        let t2 = x;
        let derivative;
        let x2;
        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }
        let t1 = 1;
        let t0 = 0;
        t2 = x;
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }
        return t2;
    }
    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }
    return solve;
}

var foreign71 = Object.freeze({
    __proto__: null,
    Tween: Tween$2,
    Utils: Utils,
    cubicBezier: cubicBezier
});

let Dance = class Dance extends Script {
    async onStart() {
        if (mw.SystemUtil.isServer()) return;
        await Utils.asyncDownloadAsset("232755");
        let trigger = this.gameObject;
        trigger.onEnter.add((character => {
            character?.loadAnimation("232755")?.play();
        }));
        trigger.onLeave.add((character => {
            if (character?.currentAnimation?.assetId == "232755") character?.currentAnimation?.stop();
        }));
    }
    onUpdate(dt) {}
    onDestroy() {}
};

Dance = __decorate([ Component ], Dance);

var Dance$1 = Dance;

var foreign1 = Object.freeze({
    __proto__: null,
    default: Dance$1
});

class FlyText {
    constructor() {
        this._uiWidget = null;
        this._rootCanvas = null;
        this._textPools = [];
        this._defaultTextSize = new Vector2(200, 100);
        this._defaultFontColor = LinearColor.white;
        this._defaultOutlineColor = new mw.LinearColor(1, 0, 1, 1);
    }
    static get instance() {
        if (FlyText._instance == null) {
            FlyText._instance = new FlyText;
        }
        return FlyText._instance;
    }
    showFlyText(content, worldLocation, fontColor, outlineColor) {
        let vec2 = mw.InputUtil.projectWorldPositionToWidgetPosition(worldLocation, true).screenPosition;
        let textBlock = null;
        if (this._textPools.length == 0) {
            textBlock = this.createText();
        } else {
            textBlock = this._textPools.pop();
        }
        vec2.x -= 120;
        vec2.y -= 160;
        let toX = this.getRandomIntInclusive(100, 300);
        Math.random() < .5 ? toX = -toX : toX = toX;
        let toY = this.getRandomIntInclusive(-300, 100);
        let animator = new mw.Tween({
            a: 0
        }).to({
            a: Math.PI
        }, 1e3).onUpdate((object => {
            textBlock.position = vec2.clone().add(new mw.Vector2(toX * object.a / Math.PI, toY * Math.sin(object.a)));
            textBlock.renderScale = new mw.Vector2(Math.sin(object.a));
        })).onStart((() => {
            textBlock.fontColor = fontColor ? fontColor : this._defaultFontColor;
            textBlock.outlineColor = outlineColor ? outlineColor : this._defaultOutlineColor;
            textBlock.text = content;
            textBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        })).onComplete((() => {
            textBlock.visibility = mw.SlateVisibility.Hidden;
            this._textPools.push(textBlock);
        }));
        animator.start();
    }
    createText() {
        if (!this._uiWidget) {
            this._uiWidget = mw.UserWidget.newObject();
            this._uiWidget.addToViewport(1);
            if (!this._rootCanvas) {
                this._rootCanvas = mw.Canvas.newObject();
                this._rootCanvas.size = new mw.Vector2(1920, 1080);
                this._rootCanvas.position = mw.Vector2.zero;
                this._uiWidget.rootContent = this._rootCanvas;
            }
        }
        let textBlock = mw.TextBlock.newObject(this._rootCanvas);
        textBlock.size = this._defaultTextSize;
        textBlock.fontSize = 30;
        textBlock.fontLetterSpace = 1;
        textBlock.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping;
        textBlock.autoAdjust = false;
        textBlock.outlineSize = 4;
        textBlock.glyph = mw.UIFontGlyph.Light;
        return textBlock;
    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

var foreign2 = Object.freeze({
    __proto__: null,
    FlyText: FlyText
});

class Helper {
    static getRangePoint(point, range) {
        var r = Math.random() * range;
        var angle = Math.random() * 360 - 180;
        var x = Math.sin(angle);
        var y = Math.cos(angle);
        var pos = new mw.Vector(point.x + x * r, point.y + y * r, point.z + 100);
        return pos;
    }
    static getCirclePoints(center, radius, count) {
        let points = [];
        let radians = Math.PI / 180 * Math.round(360 / count);
        for (let i = 0; i < count; ++i) {
            let x = center.x + Math.sin(radians * i) * radius;
            let y = center.y + Math.cos(radians * i) * radius;
            points.push(new mw.Vector(x, y, center.z + 100));
        }
        return points;
    }
    static getArcPoints(center, radius, count, startAngle, endAngle) {
        let points = [];
        let aoa = endAngle - startAngle;
        let amount = Math.round(360 * count / aoa);
        let startI = Math.round(startAngle * amount / 360);
        let endI = Math.round(endAngle * amount / 360);
        let radians = Math.PI / 180 * Math.round(360 / amount);
        for (let i = startI; i < endI; ++i) {
            let x = center.x + Math.sin(radians * i) * radius;
            let y = center.y + Math.cos(radians * i) * radius;
            points.push(new mw.Vector(x, y, center.z + 100));
        }
        return points;
    }
    static getRandomNum(min, max) {
        let Range = max - min;
        let Rand = Math.random();
        return min + Math.round(Rand * Range);
    }
    static getPointsBetween2(start, end) {
        let points = [];
        let length = mw.Vector.distance(start, end);
        let count = Math.floor(length / 100);
        let dir = new mw.Vector(end.x - start.x, end.y - start.y, end.z - start.z).normalized;
        for (let i = 0; i <= count; ++i) {
            let offsetVec = dir.clone().multiply(100 * i);
            let pos = new mw.Vector(offsetVec.x + start.x, offsetVec.y + start.y, offsetVec.z + start.z);
            points.push(pos);
        }
        return points;
    }
    static getLvAndExpByKillCount(killCount) {
        let offLv = 1;
        while (killCount > 0) {
            offLv++;
            killCount -= offLv;
        }
        return [ offLv, killCount + offLv - 1 ];
    }
}

Helper.playerMap = new Map;

Helper.activeBulletMap = new Map;

Helper.inactiveBullets = [];

Helper.teamMap = new Map;

var foreign17 = Object.freeze({
    __proto__: null,
    default: Helper
});

let NoticeView_Generate = class NoticeView_Generate extends UIScript {
    get con_top_notice() {
        if (!this.con_top_notice_Internal && this.uiWidgetBase) {
            this.con_top_notice_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/con_top_notice");
        }
        return this.con_top_notice_Internal;
    }
    get con_second_notice() {
        if (!this.con_second_notice_Internal && this.uiWidgetBase) {
            this.con_second_notice_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/con_second_notice");
        }
        return this.con_second_notice_Internal;
    }
    get con_top_notice_2() {
        if (!this.con_top_notice_2_Internal && this.uiWidgetBase) {
            this.con_top_notice_2_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/con_top_notice_2");
        }
        return this.con_top_notice_2_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {}
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

NoticeView_Generate = __decorate([ UIBind("UI/notice/NoticeView.ui") ], NoticeView_Generate);

var NoticeView_Generate$1 = NoticeView_Generate;

var foreign84 = Object.freeze({
    __proto__: null,
    default: NoticeView_Generate$1
});

let TopNoticeItem_Generate = class TopNoticeItem_Generate extends UIScript {
    get txt_context() {
        if (!this.txt_context_Internal && this.uiWidgetBase) {
            this.txt_context_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/txt_context");
        }
        return this.txt_context_Internal;
    }
    get eff() {
        if (!this.eff_Internal && this.uiWidgetBase) {
            this.eff_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/eff");
        }
        return this.eff_Internal;
    }
    get eff_line_1() {
        if (!this.eff_line_1_Internal && this.uiWidgetBase) {
            this.eff_line_1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/eff_line_1");
        }
        return this.eff_line_1_Internal;
    }
    get eff_line_1_1() {
        if (!this.eff_line_1_1_Internal && this.uiWidgetBase) {
            this.eff_line_1_1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/eff_line_1_1");
        }
        return this.eff_line_1_1_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.txt_context);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

TopNoticeItem_Generate = __decorate([ UIBind("UI/notice/TopNoticeItem.ui") ], TopNoticeItem_Generate);

var TopNoticeItem_Generate$1 = TopNoticeItem_Generate;

var foreign86 = Object.freeze({
    __proto__: null,
    default: TopNoticeItem_Generate$1
});

const Easing = {
    Linear: {
        None: function(amount) {
            return amount;
        }
    },
    Quadratic: {
        In: function(amount) {
            return amount * amount;
        },
        Out: function(amount) {
            return amount * (2 - amount);
        },
        InOut: function(amount) {
            if ((amount *= 2) < 1) {
                return .5 * amount * amount;
            }
            return -.5 * (--amount * (amount - 2) - 1);
        }
    },
    Cubic: {
        In: function(amount) {
            return amount * amount * amount;
        },
        Out: function(amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function(amount) {
            if ((amount *= 2) < 1) {
                return .5 * amount * amount * amount;
            }
            return .5 * ((amount -= 2) * amount * amount + 2);
        }
    },
    Quartic: {
        In: function(amount) {
            return amount * amount * amount * amount;
        },
        Out: function(amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function(amount) {
            if ((amount *= 2) < 1) {
                return .5 * amount * amount * amount * amount;
            }
            return -.5 * ((amount -= 2) * amount * amount * amount - 2);
        }
    },
    Quintic: {
        In: function(amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function(amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function(amount) {
            if ((amount *= 2) < 1) {
                return .5 * amount * amount * amount * amount * amount;
            }
            return .5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        }
    },
    Sinusoidal: {
        In: function(amount) {
            return 1 - Math.sin((1 - amount) * Math.PI / 2);
        },
        Out: function(amount) {
            return Math.sin(amount * Math.PI / 2);
        },
        InOut: function(amount) {
            return .5 * (1 - Math.sin(Math.PI * (.5 - amount)));
        }
    },
    Exponential: {
        In: function(amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function(amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function(amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return .5 * Math.pow(1024, amount - 1);
            }
            return .5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        }
    },
    Circular: {
        In: function(amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function(amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function(amount) {
            if ((amount *= 2) < 1) {
                return -.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return .5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        }
    },
    Elastic: {
        In: function(amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function(amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - .1) * 5 * Math.PI) + 1;
        },
        InOut: function(amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return .5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        }
    },
    Back: {
        In: function(amount) {
            const s = 1.70158;
            return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
        },
        Out: function(amount) {
            const s = 1.70158;
            return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function(amount) {
            const s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return .5 * (amount * amount * ((s + 1) * amount - s));
            }
            return .5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        }
    },
    Bounce: {
        In: function(amount) {
            return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function(amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            } else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + .75;
            } else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + .9375;
            } else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + .984375;
            }
        },
        InOut: function(amount) {
            if (amount < .5) {
                return Easing.Bounce.In(amount * 2) * .5;
            }
            return Easing.Bounce.Out(amount * 2 - 1) * .5 + .5;
        }
    },
    generatePow: function(power = 4) {
        power = power < Number.EPSILON ? Number.EPSILON : power;
        power = power > 1e4 ? 1e4 : power;
        return {
            In: function(amount) {
                return amount ** power;
            },
            Out: function(amount) {
                return 1 - (1 - amount) ** power;
            },
            InOut: function(amount) {
                if (amount < .5) {
                    return (amount * 2) ** power / 2;
                }
                return (1 - (2 - amount * 2) ** power) / 2 + .5;
            }
        };
    }
};

const Interpolation = {
    Linear: function(v, k) {
        const m = v.length - 1;
        const f = m * k;
        const i = Math.floor(f);
        const fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function(v, k) {
        let b = 0;
        const n = v.length - 1;
        const pw = Math.pow;
        const bn = Interpolation.Utils.Bernstein;
        for (let i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function(v, k) {
        const m = v.length - 1;
        let f = m * k;
        let i = Math.floor(f);
        const fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor(f = m * (1 + k));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        } else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function(p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function(n, i) {
            const fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: function() {
            const a = [ 1 ];
            return function(n) {
                let s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (let i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        }(),
        CatmullRom: function(p0, p1, p2, p3, t) {
            const v0 = (p2 - p0) * .5;
            const v1 = (p3 - p1) * .5;
            const t2 = t * t;
            const t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
    }
};

class Sequence {
    static nextId() {
        return Sequence._nextId++;
    }
}

Sequence._nextId = 0;

class Group {
    constructor() {
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
    }
    getAll() {
        return Object.keys(this._tweens).map((tweenId => this._tweens[tweenId]));
    }
    removeAll() {
        this._tweens = {};
    }
    add(tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    }
    remove(tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    }
    update(time = now(), preserve = false) {
        let tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (let i = 0; i < tweenIds.length; i++) {
                const tween = this._tweens[tweenIds[i]];
                const autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve) {
                    delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    }
}

const mainGroup = new Group;

const now = function() {
    return Date.now();
};

let Tween$1 = class Tween {
    constructor(_object, _group = mainGroup) {
        this._object = _object;
        this._group = _group;
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1e3;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._goToEnd = false;
    }
    getId() {
        return this._id;
    }
    isPlaying() {
        return this._isPlaying;
    }
    isPaused() {
        return this._isPaused;
    }
    to(properties, duration) {
        this._valuesEnd = Object.create(properties);
        if (duration !== undefined) {
            this._duration = duration;
        }
        return this;
    }
    duration(d = 1e3) {
        this._duration = d;
        return this;
    }
    start(time = now()) {
        if (this._isPlaying) {
            return this;
        }
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            this._reversed = false;
            for (const property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time;
        this._startTime += this._delayTime;
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
        return this;
    }
    _setupProperties(_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
        for (const property in _valuesEnd) {
            const startValue = _object[property];
            const startValueIsArray = Array.isArray(startValue);
            const propType = startValueIsArray ? "array" : typeof startValue;
            const isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            if (propType === "undefined" || propType === "function") {
                continue;
            }
            if (isInterpolationList) {
                let endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                _valuesEnd[property] = [ startValue ].concat(endValues);
            }
            if ((propType === "object" || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                for (const prop in startValue) {
                    _valuesStart[property][prop] = startValue[prop];
                }
                _valuesStartRepeat[property] = startValueIsArray ? [] : {};
                this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
            } else {
                if (typeof _valuesStart[property] === "undefined") {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    _valuesStart[property] *= 1;
                }
                if (isInterpolationList) {
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                } else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    }
    stop() {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        this._group && this._group.remove(this);
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    }
    end() {
        this._goToEnd = true;
        this.update(Infinity);
        return this;
    }
    pause(time = now()) {
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        this._group && this._group.remove(this);
        return this;
    }
    resume(time = now()) {
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        this._group && this._group.add(this);
        return this;
    }
    stopChainedTweens() {
        for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    }
    group(group = mainGroup) {
        this._group = group;
        return this;
    }
    delay(amount = 0) {
        this._delayTime = amount;
        return this;
    }
    repeat(times = 0) {
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    }
    repeatDelay(amount) {
        this._repeatDelayTime = amount;
        return this;
    }
    yoyo(yoyo = false) {
        this._yoyo = yoyo;
        return this;
    }
    easing(easingFunction = Easing.Linear.None) {
        this._easingFunction = easingFunction;
        return this;
    }
    interpolation(interpolationFunction = Interpolation.Linear) {
        this._interpolationFunction = interpolationFunction;
        return this;
    }
    chain(...tweens) {
        this._chainedTweens = tweens;
        return this;
    }
    onStart(callback) {
        this._onStartCallback = callback;
        return this;
    }
    onUpdate(callback) {
        this._onUpdateCallback = callback;
        return this;
    }
    onRepeat(callback) {
        this._onRepeatCallback = callback;
        return this;
    }
    onComplete(callback) {
        this._onCompleteCallback = callback;
        return this;
    }
    onStop(callback) {
        this._onStopCallback = callback;
        return this;
    }
    update(time = now(), autoStart = true) {
        if (this._isPaused) return true;
        let property;
        let elapsed;
        const endTime = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
            if (time > endTime) return false;
            if (autoStart) this.start(time);
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        const value = this._easingFunction(elapsed);
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
            if (this._repeat > 0) {
                if (isFinite(this._repeat)) {
                    this._repeat--;
                }
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === "string") {
                        this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                if (this._repeatDelayTime !== undefined) {
                    this._startTime = time + this._repeatDelayTime;
                } else {
                    this._startTime = time + this._delayTime;
                }
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                return true;
            } else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (let i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    this._chainedTweens[i].start(this._startTime + this._duration);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    }
    _updateProperties(_object, _valuesStart, _valuesEnd, value) {
        for (const property in _valuesEnd) {
            if (_valuesStart[property] === undefined) {
                continue;
            }
            const start = _valuesStart[property] || 0;
            let end = _valuesEnd[property];
            const startIsArray = Array.isArray(_object[property]);
            const endIsArray = Array.isArray(end);
            const isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            } else if (typeof end === "object" && end) {
                this._updateProperties(_object[property], start, end, value);
            } else {
                end = this._handleRelativeValue(start, end);
                if (typeof end === "number") {
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    }
    _handleRelativeValue(start, end) {
        if (typeof end !== "string") {
            return end;
        }
        if (end.charAt(0) === "+" || end.charAt(0) === "-") {
            return start + parseFloat(end);
        } else {
            return parseFloat(end);
        }
    }
    _swapEndStartRepeatValues(property) {
        const tmp = this._valuesStartRepeat[property];
        const endValue = this._valuesEnd[property];
        if (typeof endValue === "string") {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        } else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    }
};

const nextId = Sequence.nextId;

const TWEEN = mainGroup;

const getAll = TWEEN.getAll.bind(TWEEN);

const removeAll = TWEEN.removeAll.bind(TWEEN);

const add = TWEEN.add.bind(TWEEN);

const remove = TWEEN.remove.bind(TWEEN);

const update = TWEEN.update.bind(TWEEN);

var foreign5 = Object.freeze({
    __proto__: null,
    Easing: Easing,
    Group: Group,
    Interpolation: Interpolation,
    Sequence: Sequence,
    Tween: Tween$1,
    add: add,
    getAll: getAll,
    nextId: nextId,
    now: now,
    remove: remove,
    removeAll: removeAll,
    update: update
});

class UIPool {
    constructor(creator) {
        this.pool = [];
        this.creator = creator;
    }
    get count() {
        return this.pool ? this.pool.length : 0;
    }
    get firstActiveItem() {
        for (let t of this.pool) {
            if (t.uiObject.visibility == mw.SlateVisibility.Hidden) continue;
            return t;
        }
    }
    byIndex(index) {
        return this.pool[index];
    }
    setCreator(func) {
        this.creator = func;
    }
    setPoolGetFunction(func) {
        this.poolGetFunction = func;
    }
    setResetItemFunction(resetItemFunction) {
        this.resetItemFunction = resetItemFunction;
    }
    get() {
        for (let item of this.pool) {
            if (item.uiObject.visibility == mw.SlateVisibility.Hidden) {
                item.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                if (this.poolGetFunction) this.poolGetFunction(item);
                return item;
            }
        }
        let result = this.creator();
        this.pool.push(result);
        return result;
    }
    giveBack(item) {
        if (this.resetItemFunction) this.resetItemFunction(item);
        item.uiObject.visibility = mw.SlateVisibility.Hidden;
    }
    resetAll() {
        for (let item of this.pool) {
            this.giveBack(item);
        }
    }
    eachVisibleItem(action) {
        for (let t of this.pool) {
            if (t.uiObject.visibility == mw.SlateVisibility.Hidden) continue;
            action(t);
        }
    }
    eachVisibleItemWithoutFocus(action, focus) {
        for (let t of this.pool) {
            if (t.uiObject.visibility == mw.SlateVisibility.Hidden) continue;
            if (t == focus) continue;
            action(t);
        }
    }
}

class UIElementPool {
    constructor() {
        this.pool = [];
    }
    get count() {
        return this.pool ? this.pool.length : 0;
    }
    get firstActiveItem() {
        for (let t of this.pool) {
            if (t.visibility == mw.SlateVisibility.Hidden) continue;
            return t;
        }
    }
    setCreator(func) {
        this.creator = func;
    }
    get() {
        for (let i of this.pool) {
            if (i.visibility == mw.SlateVisibility.Hidden) {
                i.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                return i;
            }
        }
        let result = this.creator();
        this.pool.push(result);
        return result;
    }
    giveBack(item) {
        item.visibility = mw.SlateVisibility.Hidden;
    }
    resetAll() {
        for (let item of this.pool) {
            this.giveBack(item);
        }
    }
    eachVisibleItem(action) {
        for (let t of this.pool) {
            if (t.visibility == mw.SlateVisibility.Hidden) continue;
            action(t);
        }
    }
}

class WorldUIPool {
    constructor(creatorFunc) {
        this.pool = [];
        if (creatorFunc) this.creator = creatorFunc;
    }
    setCreator(func) {
        this.creator = func;
    }
    setPoolGetFunction(func) {
        this.poolGetFunction = func;
    }
    setResetItemFunction(resetItemFunction) {
        this.resetItemFunction = resetItemFunction;
    }
    eachVisibleItem(action) {
        for (let t of this.pool) {
            if (!t.stage) continue;
            action(t);
        }
    }
    get() {
        for (let item of this.pool) {
            if (item.stage) continue;
            if (this.poolGetFunction) this.poolGetFunction(item);
            item.uiWidget.setVisibility(mw.PropertyStatus.On);
            item.stage = true;
            return item;
        }
        let result = this.creator();
        result.stage = true;
        this.pool.push(result);
        return result;
    }
    giveBack(item) {
        if (this.resetItemFunction) this.resetItemFunction(item);
        item.stage = false;
        item.uiWidget.setVisibility(mw.PropertyStatus.Off);
    }
    resetAll() {
        for (let item of this.pool) {
            this.giveBack(item);
        }
    }
}

var foreign6 = Object.freeze({
    __proto__: null,
    UIElementPool: UIElementPool,
    UIPool: UIPool,
    WorldUIPool: WorldUIPool
});

var updater;

(function(updater) {
    updater.updateByFrameInterval = (interval, targetFunctionName) => function(target, prototypeKey, prototypeDescriptor) {
        let intervalVaryingName = `${prototypeKey.toString()}_current_interval`;
        let targetIntervalVaryingName = `${prototypeKey.toString()}_target_interval`;
        target[intervalVaryingName] = 0;
        target[targetIntervalVaryingName] = interval;
        let updateFunc = target[targetFunctionName || "onUpdate"];
        let targetFunc = prototypeDescriptor.value;
        target[targetFunctionName || "onUpdate"] = function(...args) {
            target[intervalVaryingName]++;
            if (target[intervalVaryingName] >= target[targetIntervalVaryingName]) {
                targetFunc.apply(this, args);
                target[intervalVaryingName] = 0;
            }
            updateFunc.apply(this, args);
        };
    };
})(updater || (updater = {}));

var foreign7 = Object.freeze({
    __proto__: null,
    get updater() {
        return updater;
    }
});

class Notice {
    static showDownNotice(context) {
        this.checkView();
        this.view.topNoticeComponent2.insert((notice => {
            notice.setInfo(context);
        }));
    }
    static checkView() {
        if (this.view) return;
        this.view = mw.UIService.show(NoticeView);
    }
}

class TopNoticeComponent {
    init(targetCanvas) {
        this.visibleNotice = [];
        this.pendingQueue = [];
        this.targetCanvas = targetCanvas;
        this.noticeCanvasHeight = this.targetCanvas.size.y;
        this.insertItemTempLocation = new mw.Vector2;
        this.noticeItemPool = new UIPool((() => {
            let item = mw.UIService.create(TopNoticeItem);
            this.targetCanvas.addChild(item.uiObject);
            item.uiObject.size = new mw.Vector2(700, 60);
            return item;
        }));
    }
    insert(initAction) {
        this.pendingQueue.push(initAction);
    }
    update() {
        if (this.visibleNotice.length == 0) return;
        for (let item of this.visibleNotice) {
            item.lifeTime += .03;
        }
        let first = this.visibleNotice[0];
        if (first.lifeTime >= TopNoticeComponent.NoticeItemLifeTime) {
            this.fadeoutNoticeElement();
        }
        this.noticeItemPool.eachVisibleItem((item => {
            if (item.targetHeight >= item.position.y) return;
            item.setLocation(item.position.x, item.position.y - TopNoticeComponent.NoticeMoveStepCount);
        }));
    }
    insertPendingNotice(initAction) {
        if (this.visibleNotice.length >= TopNoticeComponent.NoticeItemMaxCount) {
            this.fadeoutNoticeElement();
        }
        for (let i = 0; i < this.visibleNotice.length; i++) {
            const element = this.visibleNotice[i];
            element.targetHeight = this.noticeCanvasHeight - TopNoticeComponent.NoticeItemIntervalSpace - (this.visibleNotice.length - i) * TopNoticeComponent.NoticeItemIntervalSpace;
        }
        let recent = this.noticeItemPool.get();
        this.visibleNotice.push(recent);
        initAction(recent);
        recent.lifeTime = 0;
        this.insertItemTempLocation.x = this.targetCanvas.size.x / 2 - recent.uiObject.size.x / 2;
        this.insertItemTempLocation.y = this.targetCanvas.size.y - TopNoticeComponent.NoticeItemIntervalSpace;
        recent.setLocation(this.insertItemTempLocation.x, this.insertItemTempLocation.y);
        recent.targetHeight = this.insertItemTempLocation.y;
        recent.uiObject.renderOpacity = 0;
        new Tween({
            alpha: 0
        }).to({
            alpha: 1
        }, 250).onUpdate((arg => {
            recent.uiObject.renderOpacity = arg.alpha;
        })).start();
    }
    fadeoutNoticeElement() {
        let item = this.visibleNotice.shift();
        new Tween({
            alpha: 1
        }).to({
            alpha: 0
        }, 250).onUpdate((arg => {
            item.uiObject.renderOpacity = arg.alpha;
        })).onComplete((() => {
            this.noticeItemPool.giveBack(item);
        })).start();
    }
    checkPendingNotice() {
        if (this.pendingQueue.length < 1) return;
        this.insertPendingNotice(this.pendingQueue.shift());
    }
}

TopNoticeComponent.NoticeItemLifeTime = 2;

TopNoticeComponent.NoticeItemMaxCount = 3;

TopNoticeComponent.NoticeMoveStepCount = 15;

TopNoticeComponent.NoticeItemIntervalSpace = 75;

__decorate([ updater.updateByFrameInterval(15, "update") ], TopNoticeComponent.prototype, "checkPendingNotice", null);

class TopNoticeComponent2 {
    constructor() {
        this.isLeft = false;
        this.isRemoveing = false;
        this.needmovingNotice = [];
        this.isinsert = false;
    }
    init(targetCanvas) {
        this.visibleNotice = [];
        this.targetCanvas = targetCanvas;
        this.noticeCanvasHeight = this.targetCanvas.size.y;
        this.insertItemTempLocation = new mw.Vector2;
        this.noticeItemPool = new UIPool((() => {
            let item = mw.UIService.create(TopNoticeItem);
            this.targetCanvas.addChild(item.uiObject);
            item.uiObject.size = new mw.Vector2(item.uiObject.size.x, item.uiObject.size.y);
            return item;
        }));
    }
    insert(initAction) {
        this.insertPendingNotice(initAction);
    }
    update() {
        if (this.visibleNotice.length == 0) return;
        for (let item of this.visibleNotice) {
            item.lifeTime += .03;
            if (item.lifeTime >= TopNoticeComponent2.NoticeItemLifeTime) {
                if (!this.needmovingNotice.includes(item)) {
                    this.needmovingNotice.push(item);
                }
            }
        }
        this.eachLeftRightItem();
        this.noticeItemPool.eachVisibleItem((item => {
            if (item.targetHeight >= item.position.y) return;
            item.setLocation(item.position.x, item.position.y - TopNoticeComponent2.NoticeMoveStepCount);
        }));
    }
    insertPendingNotice(initAction) {
        this.isinsert = true;
        if (this.visibleNotice.length >= TopNoticeComponent2.NoticeItemMaxCount) {
            for (let index = 0; index < this.visibleNotice.length; index++) {
                let element = this.visibleNotice[index];
                if (index <= this.visibleNotice.length - TopNoticeComponent2.NoticeItemMaxCount) {
                    element.lifeTime += TopNoticeComponent2.NoticeItemLifeTime;
                }
            }
        }
        if (this.visibleNotice.length >= TopNoticeComponent2.NoticeSameItemMaxCount) {
            let count = this.visibleNotice.length;
            for (let index = 0; index < count; index++) {
                let element = this.visibleNotice[index];
                element.lifeTime += count * TopNoticeComponent2.everydiveidetime;
            }
        }
        this.eachLeftRightItem();
        for (let i = 0; i < this.visibleNotice.length; i++) {
            const element = this.visibleNotice[i];
            element.targetHeight = TopNoticeComponent2.NoticeItemIntervalSpace + i * TopNoticeComponent2.NoticeItemIntervalSpace;
            element.setLocation(this.insertItemTempLocation.x, element.targetHeight);
        }
        let recent = this.noticeItemPool.get();
        this.visibleNotice.push(recent);
        initAction(recent);
        recent.lifeTime = 0;
        this.insertItemTempLocation.x = this.targetCanvas.size.x / 2 - recent.uiObject.size.x / 2;
        let targetHeight = TopNoticeComponent2.NoticeItemIntervalSpace + (this.visibleNotice.length - 1) * TopNoticeComponent2.NoticeItemIntervalSpace;
        this.insertItemTempLocation.y = targetHeight;
        recent.targetHeight = this.insertItemTempLocation.y;
        recent.uiObject.renderOpacity = 0;
        recent.setLocation(this.insertItemTempLocation.x, -500);
        recent.uiObject.renderOpacity = 1;
        new Tween({
            posy: -500
        }).to({
            posy: this.insertItemTempLocation.y
        }, 500).onUpdate((arg => {
            recent.setLocation(this.insertItemTempLocation.x, arg.posy);
        })).start().easing(Easing.Linear.None);
        this.isinsert = false;
    }
    eachLeftRightItem() {
        if (this.needmovingNotice.length <= 0) {
            return;
        }
        if (this.isRemoveing) {
            return;
        }
        this.isRemoveing = true;
        new Tween({
            posX: 0
        }).to({
            posX: 1
        }, 500).onComplete((() => {
            this.isRemoveing = false;
        })).start();
        let arr = this.visibleNotice.filter((e => !this.needmovingNotice.includes(e)));
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            element.targetHeight = TopNoticeComponent2.NoticeItemIntervalSpace + i * TopNoticeComponent2.NoticeItemIntervalSpace;
            new Tween({
                posy: element.uiObject.position.y
            }).to({
                posy: element.targetHeight
            }, 500).onUpdate((arg => {
                element.setLocation(this.insertItemTempLocation.x, arg.posy);
            })).onComplete((() => {})).easing(Easing.Linear.None).start();
        }
        while (this.needmovingNotice.length > 0) {
            let item = this.needmovingNotice.shift();
            let pos = item.uiObject.position;
            this.isLeft = !this.isLeft;
            let target = new mw.Vector(0, pos.y);
            new Tween({
                posX: 0
            }).to({
                posX: this.isLeft ? 3e3 : -3e3
            }, 250).onUpdate((arg => {
                target.x = arg.posX;
                item.uiObject.position = target;
            })).onComplete((() => {
                this.noticeItemPool.giveBack(item);
            })).easing(Easing.Linear.None).start();
            let index = this.visibleNotice.findIndex((ele => item));
            if (index != -1) {
                this.visibleNotice.splice(index, 1);
            }
        }
    }
}

TopNoticeComponent2.NoticeItemLifeTime = 4;

TopNoticeComponent2.NoticeItemMaxCount = 10;

TopNoticeComponent2.NoticeItemIntervalSpace = 70;

TopNoticeComponent2.NoticeSameItemMaxCount = 3;

TopNoticeComponent2.NoticeMoveStepCount = 15;

TopNoticeComponent2.everydiveidetime = 0;

class NoticeView extends NoticeView_Generate$1 {
    onStart() {
        this.topNoticeComponent = new TopNoticeComponent;
        this.topNoticeComponent.init(this.con_top_notice);
        this.topNoticeComponent2 = new TopNoticeComponent2;
        this.topNoticeComponent2.init(this.con_top_notice_2);
        this.canUpdate = true;
        this.layer = mw.UILayerTop;
    }
    onUpdate() {
        this.topNoticeComponent.update();
        this.topNoticeComponent2.update();
    }
}

class TopNoticeItem extends TopNoticeItem_Generate$1 {
    setLocation(x, y) {
        if (!this.position) {
            this.position = new mw.Vector2(x, y);
        } else {
            this.position.x = x;
            this.position.y = y;
        }
        this.uiObject.position = this.position;
    }
    setInfo(context) {
        this.txt_context.text = context;
    }
}

var foreign4 = Object.freeze({
    __proto__: null,
    Notice: Notice
});

class Guide {
    static async startGuide(targetVec, callback) {
        await this.initPlayer();
        this.playTargetEffect(targetVec);
        this.preVec = mw.Vector.zero;
        this.clearGuideInterval();
        this.guideIntervalId = TimeUtil.setInterval((() => {
            let currentVec = this.getPlayerLoc();
            if (mw.Vector.distance(this.preVec, currentVec) < 10) return;
            this.preVec = currentVec;
            this.playGuideEffects(currentVec, targetVec);
            let distance = mw.Vector.distance(currentVec, targetVec);
            if (distance <= 200) {
                this.clearGuideInterval();
                this.stopGuideEffects();
                this.stopTargetEffect();
                this.preVec = mw.Vector.zero;
                Notice.showDownNotice("到达目标点");
                if (callback) callback();
            }
        }), .02);
    }
    static async initPlayer() {
        if (this.localPlayer == null) {
            this.localPlayer = await mw.Player.asyncGetLocalPlayer();
        }
    }
    static playTargetEffect(targetVec) {
        this.stopTargetEffect();
        this.targetEffectId = EffectService.playAtPosition(this.targetEffect, targetVec, {
            loopCount: 0
        });
    }
    static stopTargetEffect() {
        if (this.targetEffectId != null) {
            EffectService.stop(this.targetEffectId);
            this.targetEffectId = null;
        }
    }
    static getPlayerLoc() {
        let playerLoc = this.localPlayer.character.worldTransform.position;
        let playerExtentZ = this.localPlayer.character.collisionExtent.z;
        return new mw.Vector(playerLoc.x, playerLoc.y, playerLoc.z - playerExtentZ / 2);
    }
    static stopGuideEffects() {
        if (this.guideEffectIds.length > 0) {
            for (let i = 0; i < this.guideEffectIds.length; ++i) {
                EffectService.stop(this.guideEffectIds[i]);
            }
            this.guideEffectIds.length = 0;
        }
    }
    static clearGuideInterval() {
        if (this.guideIntervalId != null) {
            TimeUtil.clearInterval(this.guideIntervalId);
            this.guideIntervalId = null;
        }
    }
    static playGuideEffects(currentVec, targetVec) {
        let points = Helper.getPointsBetween2(currentVec, targetVec);
        Console.error("points.length", points.length);
        if (points.length >= this.guideEffectIds.length) {
            for (let i = 0; i < this.guideEffectIds.length; ++i) {
                EffectService.getEffectById(this.guideEffectIds[i]).then((effect => {
                    if (effect) effect.worldTransform.position = points[i];
                }));
            }
            for (let i = this.guideEffectIds.length; i < points.length; ++i) {
                let effectId = EffectService.playAtPosition(this.guideEffect, points[i], {
                    loopCount: 0
                });
                this.guideEffectIds.push(effectId);
            }
        } else {
            for (let i = 0; i < points.length; ++i) {
                EffectService.getEffectById(this.guideEffectIds[i]).then((effect => {
                    if (effect) effect.worldTransform.position = points[i];
                }));
            }
            for (let i = points.length; i < this.guideEffectIds.length; ++i) {
                EffectService.stop(this.guideEffectIds[i]);
            }
            this.guideEffectIds.length = points.length;
        }
    }
}

Guide.localPlayer = null;

Guide.guideEffect = "146775";

Guide.guideIntervalId = null;

Guide.guideEffectIds = [];

Guide.preVec = mw.Vector.zero;

Guide.targetEffect = "31263";

Guide.targetEffectId = null;

var foreign3 = Object.freeze({
    __proto__: null,
    default: Guide
});

class ConfigBase {
    constructor(excelData) {
        this.ELEMENTARR = [];
        this.ELEMENTMAP = new Map;
        this.KEYMAP = new Map;
        let headerLine = 2;
        this.ELEMENTARR = new Array(excelData.length - headerLine);
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            this.ELEMENTARR[i] = {};
        }
        let column = excelData[0].length;
        for (let j = 0; j < column; j++) {
            let name = excelData[0][j];
            let tags = excelData[1][j].split("|");
            if (tags.includes(ConfigBase.TAG_CHILDLANGUAGE)) continue;
            let jOffect = 0;
            if (tags.includes(ConfigBase.TAG_MAINLANGUAGE)) {
                let index = j + ConfigBase.languageIndex;
                let targetTags = excelData[1][index].split("|");
                if (index < column && targetTags.includes(ConfigBase.TAG_CHILDLANGUAGE)) {
                    jOffect = ConfigBase.languageIndex;
                }
            }
            let hasTag_Key = tags.includes(ConfigBase.TAG_KEY);
            let hasTag_Language = tags.includes(ConfigBase.TAG_LANGUAGE);
            for (let i = 0; i < this.ELEMENTARR.length; i++) {
                let ele = this.ELEMENTARR[i];
                let value = excelData[i + headerLine][j + jOffect];
                if (j == 0) {
                    this.ELEMENTMAP.set(value, ele);
                } else {
                    if (hasTag_Key) {
                        this.KEYMAP.set(value, excelData[i + headerLine][0]);
                    }
                    if (hasTag_Language) {
                        if (ConfigBase.getLanguage != null) {
                            value = ConfigBase.getLanguage(value);
                        } else {
                            value = "unknow";
                        }
                    }
                }
                ele[name] = value;
            }
        }
    }
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.languageIndex = languageIndex;
        ConfigBase.getLanguage = getLanguageFun;
        if (ConfigBase.languageIndex < 0) {
            ConfigBase.languageIndex = ConfigBase.getSystemLanguageIndex();
        }
    }
    static getSystemLanguageIndex() {
        let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
        if (!!language.match("en")) {
            return 0;
        }
        if (!!language.match("zh")) {
            return 1;
        }
        if (!!language.match("ja")) {
            return 2;
        }
        if (!!language.match("de")) {
            return 3;
        }
        return 0;
    }
    getElement(id) {
        let ele = this.ELEMENTMAP.get(Number(id)) || this.ELEMENTMAP.get(this.KEYMAP.get(id));
        if (ele == null) {
            console.warn(this.constructor.name + "配置表中找不到元素 id:" + id);
        }
        return ele;
    }
    findElement(fieldName, fieldValue) {
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                return this.ELEMENTARR[i];
            }
        }
    }
    findElements(fieldName, fieldValue) {
        let arr = [];
        for (let i = 0; i < this.ELEMENTARR.length; i++) {
            if (this.ELEMENTARR[i][fieldName] == fieldValue) {
                arr.push(this.ELEMENTARR[i]);
            }
        }
        return arr;
    }
    getAllElement() {
        return this.ELEMENTARR;
    }
}

ConfigBase.TAG_KEY = "Key";

ConfigBase.TAG_LANGUAGE = "Language";

ConfigBase.TAG_MAINLANGUAGE = "MainLanguage";

ConfigBase.TAG_CHILDLANGUAGE = "ChildLanguage";

ConfigBase.languageIndex = 0;

var foreign8 = Object.freeze({
    __proto__: null,
    ConfigBase: ConfigBase
});

const EXCELDATA$4 = [ [ "ID", "GunName", "GunPrefab", "GunIcon", "GunIcon_M", "GunLoc", "GunScale", "IsTurnICON", "GunType", "Price", "FireInterval", "BulletCount", "Hurt" ], [ "", "", "", "", "", "", "", "", "", "", "", "", "" ], [ 1, "M4A1卡宾枪", "587777AD4056DC3AB465FBA7D3F5F7BA", "101168", "94153", new mw.Vector(-20, 0, 110), new mw.Vector(1, 1, 1), 0, 0, null, "0.1", 30, 25 ], [ 2, "AK47自动步枪", "0D543D5346C331F41DA890A5E6DD3DB5", "101171", "95712", new mw.Vector(-20, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 1, 8888 ], "0.1", 30, 30 ], [ 3, "QBZ95式突击步枪", "E3E0C2994D3518540DBB6D8C00C8AB83", "120590", "44974", new mw.Vector(0, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 2, 38888 ], "0.1", 30, 35 ], [ 4, "SCAR突击步枪", "5181250F44DF914A714B668F99177E3A", "120588", "43712", new mw.Vector(-10, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 2, 40888 ], "0.1", 30, 35 ], [ 5, "突击步枪", "1CD6AEAB4602DF140ACE93BD49D5CA19", "120587", "43710", new mw.Vector(-10, 0, 110), new mw.Vector(1, 1, 1), 1, 1, [ 3, 48888 ], "0.07", 20, 25 ], [ 6, "MP5冲锋枪", "A469CCC84AAA873815243BB25439707C", "101167", "99703", new mw.Vector(0, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 3, 58888 ], "0.07", 35, 25 ], [ 7, "MP7冲锋枪", "68E812DC47B714F9A2BB2ABE18304C5B", "101169", "99701", new mw.Vector(-5, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 3, 60888 ], "0.07", 35, 25 ], [ 8, "P90冲锋枪", "BA1BDC034FCDE8574CBBAA8C4831A950", "120592", "43734", new mw.Vector(10, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 4, 68888 ], "0.07", 40, 25 ], [ 9, "M249机枪", "FCFE18BE440FAEBD5AB999A222F10AA9", "101166", "95717", new mw.Vector(-20, 0, 110), new mw.Vector(1, 1, 1), 0, 1, [ 4, 78888 ], "0.1", 100, 30 ], [ 10, "激光幽灵枪", "23240FEE4F3BD25DE8EA6DBE525B3A20", null, "122716", new mw.Vector(0, 0, 110), new mw.Vector(1, 1, 1), 1, 2, [ 3, -1 ], "1", 5, 70 ], [ 11, "激光巴雷特", "015C826546EBC60F95EF399D16523B78", "101165", "99699", new mw.Vector(-30, 0, 110), new mw.Vector(1, 1, 1), 1, 2, [ 3, -1 ], "1", 10, 100 ], [ 12, "激光烈火枪", "0C7F278C4254F90F69614086DCA0B906", "101163", "95676", new mw.Vector(-30, 0, 110), new mw.Vector(1, 1, 1), 0, 2, [ 3, -1 ], "0.3", 40, 80 ], [ 13, "激光冰雷枪", "29CD5E6145D1B05590E887A050E0D3C8", "66181", "122720", new mw.Vector(-30, 0, 110), new mw.Vector(1, 1, 1), 0, 2, [ 5, -1 ], "0.3", 40, 90 ], [ 14, "赛博激光巴雷特", "1172035A40E88AC00E32E98A96BA38B4", null, "99699", new mw.Vector(-30, 0, 110), new mw.Vector(1, 1, 1), 0, 2, [ 5, -1 ], "1", 10, 100 ], [ 15, "鸡枪", "5F47861B4393F17B401DE1B260C37FFF", null, "20799", new mw.Vector(-30, 0, 110), new mw.Vector(1, 1, 1), 0, 2, [ 5, -1 ], "0.3", 20, 100 ], [ 16, "烟花枪", "A830458640D6EA21FB7AEA8F7E029CB7", null, "122726", new mw.Vector(0, 0, 110), new mw.Vector(1, 1, 1), 0, 2, [ 5, -1 ], "1", 0, 0 ] ];

class GunConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$4);
    }
}

var foreign10 = Object.freeze({
    __proto__: null,
    GunConfig: GunConfig
});

const EXCELDATA$3 = [ [ "ID", "GunObj", "GunTrigger" ], [ "", "", "" ], [ 1, "333DE4C4", "255CE64F" ], [ 2, "3D2B4051", "28506177" ], [ 3, "02961BC2", "2511CC9E" ], [ 4, null, "163F882E" ], [ 5, null, "030DDB66" ], [ 6, null, "2D8AC32F" ], [ 7, null, "17BE2BEA" ], [ 8, null, "33E0D4A1" ], [ 9, null, "009FCE0D" ], [ 10, null, "29B89B25" ], [ 11, null, "1479DEF2" ], [ 12, null, "2D7A7E88" ], [ 13, null, "3638E7E0" ], [ 14, null, "035A5C25" ], [ 15, null, "0665A4CD" ], [ 16, null, "3C6AECDB" ] ];

class PickUpGunConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$3);
    }
}

var foreign11 = Object.freeze({
    __proto__: null,
    PickUpGunConfig: PickUpGunConfig
});

const EXCELDATA$2 = [ [ "ID", "Role", "Trigger", "CameraAnchor", "Price", "Name", "Rotation" ], [ "", "", "", "", "", "", "" ], [ 1, "219915", "3999536C", "1155DA0F", [ 0, 0 ], "赛博少年", new mw.Vector(0, 0, 90) ], [ 2, "141618", "38883A1C", "016FF16A", [ 1, 5888 ], "时装男青年", new mw.Vector(0, 0, 90) ], [ 3, "142272", "111F6474", "38302B3C", [ 1, 18888 ], "机甲少女", new mw.Vector(0, 0, 90) ], [ 4, "142255", "1055CB6B", "15FF1224", [ 1, 20888 ], "纳米机甲女性", new mw.Vector(0, 0, 180) ], [ 5, "219912", "1A986145", "1A650AFE", [ 2, 25888 ], "赛博少女", new mw.Vector(0, 0, 180) ], [ 6, "226915", "1203EA84", "1EAC8412", [ 2, 28888 ], "赛博少女", new mw.Vector(0, 0, 180) ], [ 7, "226913", "0A5BB5A1", "09062AA3", [ 3, 30888 ], "赛博少年", new mw.Vector(0, 0, 180) ], [ 8, "142153", "2CEFA625", "0CDBCE80", [ 3, 35888 ], "眼镜未来战士", new mw.Vector(0, 0, 0) ], [ 9, "219909", "3785CE76", "1F5AB414", [ 3, 38888 ], "紫色机甲", new mw.Vector(0, 0, 0) ], [ 10, "142396", "37AABFC3", "2EF41460", [ 4, 40888 ], "黑人男纳米机甲", new mw.Vector(0, 0, -90) ], [ 11, "142397", "10AE7159", "331FC07A", [ 4, 48888 ], "白人男纳米机甲", new mw.Vector(0, 0, -90) ] ];

class RoleConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$2);
    }
}

var foreign12 = Object.freeze({
    __proto__: null,
    RoleConfig: RoleConfig
});

const EXCELDATA$1 = [ [ "ID", "IsHasWeapon", "SkillCD", "SkillIcon", "SkillName", "SkillJson", "HitEffect", "AtkAnimation", "Damage", "SkillDes" ], [ "", "", "", "", "", "", "", "", "", "" ], [ 1, false, 1.4, "120641", "1", '["动画节点","{\\"guid\\":\\"135369\\",\\"totalTime\\":1.63,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.8}","特效节点","{\\"guid\\":\\"92838\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":20,\\"yaw\\":0,\\"scale\\":{\\"x\\":0.5,\\"y\\":0.5,\\"z\\":0.5},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":30,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":10,\\"lenth\\":60,\\"width\\":30,\\"height\\":30,\\"damage\\":100}"]', "169537", null, 100, "蓄力一拳" ], [ 2, false, 1.63, "148620", "2", '["动画节点","{\\"guid\\":\\"135373\\",\\"totalTime\\":1.4,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.3}","特效节点","{\\"guid\\":\\"168957\\",\\"time\\":1,\\"distance\\":40,\\"zOffset\\":10,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":0.5,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":-90},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":30,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":10,\\"lenth\\":60,\\"width\\":30,\\"height\\":30,\\"damage\\":100}"]', "169537", null, 100, "大脚踹" ], [ 3, false, 1, null, "3", '["动画节点","{\\"guid\\":\\"129180\\",\\"totalTime\\":1,\\"progress\\":1,\\"AnimSlot\\":0}","位移节点","{\\"lenth\\":300,\\"zOffset\\":0,\\"yaw\\":0,\\"time\\":0.5,\\"checkCount\\":6}","方盒判定","{\\"distance\\":50,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":-50,\\"lenth\\":300,\\"width\\":50,\\"height\\":50,\\"damage\\":100}"]', "169537", null, 100, "滑铲" ], [ 4, false, 1, null, "4", '["动画节点","{\\"guid\\":\\"119945\\",\\"totalTime\\":0.93,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.3}","特效节点","{\\"guid\\":\\"84962\\",\\"time\\":-0.55,\\"distance\\":0,\\"zOffset\\":0,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","球圆判定","{\\"distance\\":0,\\"yaw\\":0,\\"zOffset\\":0,\\"radius\\":150,\\"height\\":20,\\"damage\\":100}"]', "27450", null, 100, "回旋踢" ], [ 5, false, 2.5, null, "5", '["动画节点","{\\"guid\\":\\"117407\\",\\"totalTime\\":2.5,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.2}","位移节点","{\\"lenth\\":250,\\"zOffset\\":50,\\"yaw\\":0,\\"time\\":0.6,\\"checkCount\\":6}","延迟节点","{\\"delayTime\\":0.8}","特效节点","{\\"guid\\":\\"164528\\",\\"time\\":1,\\"distance\\":50,\\"zOffset\\":-80,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","球圆判定","{\\"distance\\":50,\\"yaw\\":0,\\"zOffset\\":-80,\\"radius\\":100,\\"height\\":20,\\"damage\\":100}"]', "168829", null, 100, "藤曼突刺" ], [ 6, false, 3.33, null, "6", '["动画节点","{\\"guid\\":\\"162137\\",\\"totalTime\\":1.8,\\"progress\\":1,\\"AnimSlot\\":0}","特效节点","{\\"guid\\":\\"163348\\",\\"time\\":-1.1,\\"distance\\":-50,\\"zOffset\\":100,\\"yaw\\":0,\\"scale\\":{\\"x\\":2,\\"y\\":2,\\"z\\":2},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":23}","延迟节点","{\\"delayTime\\":1}","动画节点","{\\"guid\\":\\"29728\\",\\"totalTime\\":2.33,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.5}","特效节点","{\\"guid\\":\\"163349\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":20,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":20,\\"lenth\\":1000,\\"width\\":30,\\"height\\":30,\\"damage\\":100}"]', "163337", null, 100, "蓄力红激光" ], [ 7, false, 3.33, null, "7", '["动画节点","{\\"guid\\":\\"162137\\",\\"totalTime\\":1.8,\\"progress\\":1,\\"AnimSlot\\":0}","特效节点","{\\"guid\\":\\"163346\\",\\"time\\":-1.1,\\"distance\\":-50,\\"zOffset\\":100,\\"yaw\\":0,\\"scale\\":{\\"x\\":2,\\"y\\":2,\\"z\\":2},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":23}","延迟节点","{\\"delayTime\\":1}","动画节点","{\\"guid\\":\\"29728\\",\\"totalTime\\":2.33,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.5}","特效节点","{\\"guid\\":\\"163347\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":20,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":20,\\"lenth\\":1000,\\"width\\":30,\\"height\\":30,\\"damage\\":100}"]', "135892", null, 100, "蓄力白激光" ], [ 8, false, 1.83, null, "8", '["动画节点","{\\"guid\\":\\"117528\\",\\"totalTime\\":1.83,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":1}","特效节点","{\\"guid\\":\\"101407\\",\\"time\\":1,\\"distance\\":20,\\"zOffset\\":-90,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":50,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":-80,\\"lenth\\":450,\\"width\\":100,\\"height\\":50,\\"damage\\":100}"]', "135892", null, 100, "砸地突刺" ], [ 9, true, 3.23, null, "9", '["装备节点","{\\"guid\\":\\"103072\\",\\"location\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"SlotType\\":16}","动画节点","{\\"guid\\":\\"119910\\",\\"totalTime\\":3.23,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.8}","特效节点","{\\"guid\\":\\"168834\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":-80,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":100,\\"yaw\\":1,\\"pitch\\":0,\\"zOffset\\":-30,\\"lenth\\":1000,\\"width\\":10,\\"height\\":100,\\"damage\\":100}"]', "135892", null, 100, "镰刀劈砍" ], [ 10, true, 1.3, null, "10", '["装备节点","{\\"guid\\":\\"122956\\",\\"location\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":0},\\"SlotType\\":16}","动画节点","{\\"guid\\":\\"117523\\",\\"totalTime\\":1.6,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.3}","特效节点","{\\"guid\\":\\"130640\\",\\"time\\":1,\\"distance\\":900,\\"zOffset\\":30,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":1,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":-90},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":30,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":10,\\"lenth\\":800,\\"width\\":30,\\"height\\":30,\\"damage\\":100}"]', "14328", null, 100, "突刺" ], [ 11, false, 2, null, "11", '["动画节点","{\\"guid\\":\\"121413\\",\\"totalTime\\":1.3,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.5}","特效节点","{\\"guid\\":\\"224108\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":50,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":0.6,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":-90},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":50,\\"lenth\\":1000,\\"width\\":30,\\"height\\":30,\\"damage\\":100}","动画节点","{\\"guid\\":\\"121654\\",\\"totalTime\\":1.47,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.5}","特效节点","{\\"guid\\":\\"224108\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":10,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":0.6,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":-90},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":10,\\"lenth\\":1000,\\"width\\":30,\\"height\\":30,\\"damage\\":100}","动画节点","{\\"guid\\":\\"121416\\",\\"totalTime\\":1.73,\\"progress\\":1,\\"AnimSlot\\":0}","延迟节点","{\\"delayTime\\":0.5}","特效节点","{\\"guid\\":\\"224108\\",\\"time\\":1,\\"distance\\":100,\\"zOffset\\":80,\\"yaw\\":0,\\"scale\\":{\\"x\\":1,\\"y\\":0.6,\\"z\\":1},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":-90},\\"EffSlot\\":-1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":80,\\"lenth\\":1000,\\"width\\":30,\\"height\\":30,\\"damage\\":100}"]', "14328", null, 100, "激光三连击" ] ];

class SkillConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA$1);
    }
}

var foreign13 = Object.freeze({
    __proto__: null,
    SkillConfig: SkillConfig
});

const EXCELDATA = [ [ "id", "Name", "TaskType", "TaskItemType", "NextId", "TragetNum", "Coin", "Exp" ], [ "", "", "", "", "", "", "", "" ], [ 1, "每日登陆游戏（{0}/{1}）", 1, 1, 0, 1, 100, 0 ], [ 2, "每日在线时长5分钟（{0}/{1}）", 1, 2, 3, 5, 500, 0 ], [ 3, "每日在线时长10分钟（{0}/{1}）", 1, 2, 4, 10, 1e3, 0 ], [ 4, "每日在线时长15分钟（{0}/{1}）", 1, 2, 5, 15, 1500, 0 ], [ 5, "每日在线时长20分钟（{0}/{1}）", 1, 2, 6, 20, 2e3, 0 ], [ 6, "每日在线时长30分钟（{0}/{1}）", 1, 2, 7, 30, 3e3, 0 ], [ 7, "每日在线时长60分钟（{0}/{1}）", 1, 2, 0, 60, 6e3, 0 ], [ 8, "每日击杀敌人1个（{0}/{1}）", 1, 3, 9, 1, 50, 0 ], [ 9, "每日击杀敌人5个（{0}/{1}）", 1, 3, 10, 5, 200, 0 ], [ 10, "每日击杀敌人10个（{0}/{1}）", 1, 3, 11, 10, 250, 0 ], [ 11, "每日击杀敌人30个（{0}/{1}）", 1, 3, 12, 30, 1e3, 0 ], [ 12, "每日击杀敌人50个（{0}/{1}）", 1, 3, 13, 50, 1e3, 0 ], [ 13, "每日击杀敌人100个（{0}/{1}）", 1, 3, 0, 100, 2500, 0 ], [ 14, "每日击杀1个Boss（{0}/{1}）", 1, 4, 15, 1, 500, 0 ], [ 15, "每日击杀3个Boss（{0}/{1}）", 1, 4, 16, 3, 1e3, 0 ], [ 16, "每日击杀10个Boss（{0}/{1}）", 1, 4, 17, 10, 1500, 0 ], [ 17, "每日击杀30个Boss（{0}/{1}）", 1, 4, 18, 30, 2e3, 0 ], [ 18, "每日击杀100个Boss（{0}/{1}）", 1, 4, 0, 100, 3e3, 0 ], [ 19, "每周登录2天（{0}/{1}）", 2, 30, 20, 2, 1e3, 0 ], [ 20, "每周登录3天（{0}/{1}）", 2, 30, 21, 3, 3e3, 0 ], [ 21, "每周登录5天（{0}/{1}）", 2, 30, 22, 5, 5e3, 0 ], [ 22, "每周登录7天（{0}/{1}）", 2, 30, 0, 7, 7e3, 0 ], [ 23, "每周时长达到30分钟2天（{0}/{1}）", 2, 31, 24, 2, 2e3, 0 ], [ 24, "每周时长达到30分钟3天（{0}/{1}）", 2, 31, 25, 3, 3e3, 0 ], [ 25, "每周时长达到30分钟5天（{0}/{1}）", 2, 31, 26, 5, 5e3, 0 ], [ 26, "每周时长达到30分钟7天（{0}/{1}）", 2, 31, 0, 7, 7e3, 0 ], [ 27, "每周击杀敌人50个（{0}/{1}）", 2, 32, 28, 50, 2500, 0 ], [ 28, "每周击杀敌人100个（{0}/{1}）", 2, 32, 29, 100, 2500, 0 ], [ 29, "每周击杀敌人300个（{0}/{1}）", 2, 32, 30, 300, 1e4, 0 ], [ 30, "每周击杀敌人500个（{0}/{1}）", 2, 32, 31, 500, 1e4, 0 ], [ 31, "每周击杀敌人800个（{0}/{1}）", 2, 32, 0, 800, 15e3, 0 ], [ 32, "每周击杀30个Boss（{0}/{1}）", 2, 33, 33, 30, 500, 0 ], [ 33, "每周击杀100个Boss（{0}/{1}）", 2, 33, 34, 100, 1e3, 0 ], [ 34, "每周击杀200个Boss（{0}/{1}）", 2, 33, 35, 200, 3e3, 0 ], [ 35, "每周击杀500个Boss（{0}/{1}）", 2, 33, 36, 500, 5e3, 0 ], [ 36, "每周击杀1000个Boss（{0}/{1}）", 2, 33, 0, 1e3, 1e4, 0 ] ];

class TaskConfig extends ConfigBase {
    constructor() {
        super(EXCELDATA);
    }
}

var foreign14 = Object.freeze({
    __proto__: null,
    TaskConfig: TaskConfig
});

class GameConfig {
    static initLanguage(languageIndex, getLanguageFun) {
        ConfigBase.initLanguage(languageIndex, getLanguageFun);
        this.configMap.clear();
    }
    static getConfig(ConfigClass) {
        if (!this.configMap.has(ConfigClass.name)) {
            this.configMap.set(ConfigClass.name, new ConfigClass);
        }
        return this.configMap.get(ConfigClass.name);
    }
    static get Gun() {
        return this.getConfig(GunConfig);
    }
    static get PickUpGun() {
        return this.getConfig(PickUpGunConfig);
    }
    static get Role() {
        return this.getConfig(RoleConfig);
    }
    static get Skill() {
        return this.getConfig(SkillConfig);
    }
    static get Task() {
        return this.getConfig(TaskConfig);
    }
}

GameConfig.configMap = new Map;

var foreign9 = Object.freeze({
    __proto__: null,
    GameConfig: GameConfig
});

var EventType;

(function(EventType) {
    EventType["OpenCloseHUDRadarUI"] = "OpenCloseHUDRadarUI";
})(EventType || (EventType = {}));

var foreign15 = Object.freeze({
    __proto__: null,
    get EventType() {
        return EventType;
    }
});

class GeneralManager {
    vscodeChange() {
        let animation;
        animation.speed = 1;
        let obj;
        obj.gameObjectId;
        let camera;
        camera.worldTransform;
        let model;
        model.onTouch;
        model.onTouchEnd;
        let effect;
        effect.maskcolor;
        effect.onFinish;
        effect.timeLength;
        let sound;
        sound.timePosition;
        sound.timeLength;
        sound.timeLength;
        sound.isLoop;
        let transform;
        transform.position;
        class module extends ModuleC {
            get localPlayer() {
                return null;
            }
            get localPlayerId() {
                return null;
            }
        }
    }
    static async asyncRpcGetData(key) {
        let value = await DataStorage.asyncGetData(key);
        return value.data;
    }
    static rpcPlayEffectOnPlayer(source, target, slotType, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target instanceof mw.Player ? target.character : target, {
            slotType: slotType,
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    static rpcPlayEffectOnGameObject(source, target, loopCount, offset, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playOnGameObject(source, target, {
            loopCount: loopCount,
            duration: duration,
            position: offset,
            rotation: rotation,
            scale: scale
        });
    }
    static rpcPlayEffectAtLocation(source, location, loopCount, rotation, scale) {
        let duration = undefined;
        if (loopCount < 0) {
            duration = -loopCount;
            loopCount = undefined;
        }
        return EffectService.playAtPosition(source, location, {
            loopCount: loopCount,
            duration: duration,
            rotation: rotation,
            scale: scale
        });
    }
    static modifyShowAd(adsType, callback) {
        AdsService.showAd(adsType, (isSuccess => {
            if (isSuccess) {
                callback(AdsState.Success);
                callback(AdsState.Close);
                callback(AdsState.Reward);
            } else {
                callback(AdsState.Fail);
            }
        }));
    }
    static modiftEnterInteractiveState(inter, characterObj) {
        if (!(characterObj instanceof mw.Character)) {
            return Promise.resolve(false);
        }
        let reult = inter.enter(characterObj);
        if (!reult) return Promise.resolve(false);
        return new Promise(((resolve, reject) => {
            let resultFun = () => {
                inter.onEnter.remove(resultFun);
                resolve(true);
            };
            inter.onEnter.add(resultFun);
        }));
    }
    static modifyExitInteractiveState(inter, Location, stance) {
        let result = inter.leave(Location, null, stance);
        return Promise.resolve(result);
    }
    static modifyaddOutlineEffect(obj, OutlineColor, OutlineWidth, OutlineDepthOffset, OutlineClampValue, considerCameraPosition, outlineSilhouetteOnly) {
        if (obj instanceof mw.Model) {
            obj.setOutline(true, OutlineColor, OutlineWidth);
        }
    }
    static modifyRemoveOutlineEffect(obj) {
        if (obj instanceof mw.Model) {
            obj.setOutline(false);
        }
    }
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(width / 2, height / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array;
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj) continue;
            if (objResults.indexOf(obj) == -1) objResults.push(obj);
        }
        return objResults;
    }
    static modifyboxOverlapInLevel(StartLocation, EndLocation, Width, Height, debug, IgnoreObjectsGuid, IgnoreByKind, Source) {
        let halfSize = new Vector(Width / 2, Height / 2);
        let orientation = Vector.subtract(EndLocation, StartLocation).toRotation();
        let results = QueryUtil.boxTrace(StartLocation, EndLocation, halfSize, orientation, true, debug, IgnoreObjectsGuid, IgnoreByKind, Source);
        let objResults = new Array;
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj) continue;
            if (objResults.indexOf(obj) == -1) objResults.push(obj);
        }
        return objResults;
    }
    static modifyGetShootDir(chara, startPos, shootRange) {
        const camera = Camera.currentCamera;
        let start = Vector.zero;
        let end = Vector.zero;
        let dir = Vector.zero;
        if (startPos) {
            start = startPos;
        }
        if (camera) {
            end = camera.worldTransform.position.add(camera.worldTransform.getForwardVector().multiply(shootRange));
            const hits = QueryUtil.lineTrace(camera.worldTransform.position, end, false, true, [], false, false, chara);
            dir = end.subtract(start);
            if (hits.length > 0) {
                dir = hits[0].impactPoint.subtract(start);
            }
        }
        return dir.normalize();
    }
    static modifyProjectWorldLocationToWidgetPosition(player, worldLocation, outScreenPosition, isPlayerViewportRelative) {
        let result = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, isPlayerViewportRelative);
        outScreenPosition.x = result.screenPosition.x;
        outScreenPosition.y = result.screenPosition.y;
        return result.result;
    }
    static setMaterialColor(model, Index, InColor) {
        let materialList = model.getMaterialInstance();
        materialList[Index].getAllVectorParameterName().forEach(((v, i) => {
            materialList[Index].setVectorParameterValue(v, InColor);
        }));
    }
    static getMaterialColor(model, Index) {
        let materialList = model.getMaterialInstance();
        if (!(materialList.length > 0)) {
            return;
        }
        let nameList = materialList[Index].getAllVectorParameterName();
        return nameList.length > 0 ? materialList[Index].getVectorParameterValue(nameList[0]) : new LinearColor(1, 1, 1, 1);
    }
}

var foreign23 = Object.freeze({
    __proto__: null,
    GeneralManager: GeneralManager
});

let AdsTipsPanel_Generate = class AdsTipsPanel_Generate extends UIScript {
    get mTitleTxt() {
        if (!this.mTitleTxt_Internal && this.uiWidgetBase) {
            this.mTitleTxt_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/mTitleTxt");
        }
        return this.mTitleTxt_Internal;
    }
    get mContentTxt() {
        if (!this.mContentTxt_Internal && this.uiWidgetBase) {
            this.mContentTxt_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/mContentTxt");
        }
        return this.mContentTxt_Internal;
    }
    get mNoBtn() {
        if (!this.mNoBtn_Internal && this.uiWidgetBase) {
            this.mNoBtn_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/mNoBtn");
        }
        return this.mNoBtn_Internal;
    }
    get mYesBtn() {
        if (!this.mYesBtn_Internal && this.uiWidgetBase) {
            this.mYesBtn_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/Canvas_1/mYesBtn");
        }
        return this.mYesBtn_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mNoBtn.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mNoBtn");
        }));
        this.initLanguage(this.mNoBtn);
        this.mNoBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mTitleTxt);
        this.initLanguage(this.mContentTxt);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

AdsTipsPanel_Generate = __decorate([ UIBind("UI/Ads/AdsTipsPanel.ui") ], AdsTipsPanel_Generate);

var AdsTipsPanel_Generate$1 = AdsTipsPanel_Generate;

var foreign72 = Object.freeze({
    __proto__: null,
    default: AdsTipsPanel_Generate$1
});

class AdTipsPanel extends AdsTipsPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.onWatchAdsAction = new Action2;
        this.id = -1;
        this.adType = -1;
    }
    onStart() {
        this.canUpdate = false;
        this.layer = mw.UILayerDialog;
        this.bindButtons();
    }
    bindButtons() {
        this.mYesBtn.onClose.add(this.onClickYesBtn.bind(this));
        this.mNoBtn.onClicked.add((() => {
            if (!this.visible) return;
            Utils.closeUITween(this.rootCanvas, null, (() => {
                this.hide();
            }));
        }));
    }
    onClickYesBtn(isSuccess) {
        if (!isSuccess) {
            Notice.showDownNotice(`领取失败，请重试`);
            return;
        }
        this.hideAdTips();
        this.onWatchAdsAction.call(this.id, this.adType);
    }
    showAdTips(id, adType) {
        if (this.visible) return;
        this.id = id;
        this.adType = adType;
        this.show();
    }
    hideAdTips() {
        if (!this.visible) return;
        Utils.closeUITween(this.rootCanvas, null, (() => {
            this.hide();
        }));
    }
    onShow(...params) {
        switch (this.adType) {
          case AdType.AddCoin:
            this.mContentTxt.text = "免费获得 " + this.id + " 金币";
            break;

          case AdType.AddDiamond:
            this.mContentTxt.text = "免费获得 " + this.id + " 钻石";
            break;
        }
        Console.error("[AdTips-onShow]");
        Utils.openUITween(this.rootCanvas, null, null);
    }
}

var foreign26 = Object.freeze({
    __proto__: null,
    default: AdTipsPanel
});

var Enums;

(function(Enums) {
    (function(TouchEvent) {
        TouchEvent[TouchEvent["DOWN"] = 0] = "DOWN";
        TouchEvent[TouchEvent["MOVE"] = 1] = "MOVE";
        TouchEvent[TouchEvent["UP"] = 2] = "UP";
    })(Enums.TouchEvent || (Enums.TouchEvent = {}));
})(Enums || (Enums = {}));

class TouchScript {
    constructor() {
        this.captureMap = new Map;
        this.screenListeners = [];
    }
    onStart() {}
    static get instance() {
        if (this._ins == null) {
            this._ins = new TouchScript;
        }
        return this._ins;
    }
    addScreenListener(widget, callback, adjuestCenter) {
        this.screenListeners.push({
            widget: widget,
            callback: callback,
            adjuestCenter: adjuestCenter
        });
    }
    removeScreenListener(widget) {
        for (let i = 0; i < this.screenListeners.length; i++) {
            if (this.screenListeners[i].widget == widget) {
                this.screenListeners.splice(i, 1);
                i--;
            }
        }
    }
    onTouchStarted(inGemory, inPointerEvent) {
        for (let i = 0; i < this.screenListeners.length; i++) {
            const position = inPointerEvent.screenSpacePosition;
            const localPosition = mw.absoluteToLocal(inGemory, position);
            const pos = new mw.Vector2(this.screenListeners[i].widget.position.x, this.screenListeners[i].widget.position.y);
            const size = this.screenListeners[i].widget.size;
            if (localPosition.x > pos.x && localPosition.y > pos.y && localPosition.x < pos.x + size.x && localPosition.y < pos.y + size.y) {
                this.captureMap.set(inPointerEvent.pointerIndex, this.screenListeners[i]);
                this.screenListeners[i].callback(this.screenListeners[i].widget, Enums.TouchEvent.DOWN, localPosition.x, localPosition.y, inPointerEvent);
                return mw.EventReply.handled;
            }
        }
        return mw.EventReply.handled;
    }
    onTouchMoved(inGemory, inPointerEvent) {
        if (this.captureMap.has(inPointerEvent.pointerIndex)) {
            const position = inPointerEvent.screenSpacePosition;
            const localPosition = mw.absoluteToLocal(inGemory, position);
            let capture = this.captureMap.get(inPointerEvent.pointerIndex);
            const pos = new mw.Vector2(capture.widget.position.x, capture.widget.position.y);
            const size = capture.widget.size;
            if (localPosition.x > pos.x && localPosition.y > pos.y && localPosition.x < pos.x + size.x && localPosition.y < pos.y + size.y) {
                capture.callback(capture.widget, Enums.TouchEvent.MOVE, localPosition.x, localPosition.y, inPointerEvent);
            }
        }
        return mw.EventReply.handled;
    }
    onTouchEnded(inGemory, inPointerEvent) {
        if (this.captureMap.has(inPointerEvent.pointerIndex)) {
            const position = inPointerEvent.screenSpacePosition;
            const localPosition = mw.absoluteToLocal(inGemory, position);
            let capture = this.captureMap.get(inPointerEvent.pointerIndex);
            capture.callback(capture.widget, Enums.TouchEvent.UP, localPosition.x, localPosition.y, inPointerEvent);
            this.captureMap.delete(inPointerEvent.pointerIndex);
        }
        return mw.EventReply.handled;
    }
}

var foreign70 = Object.freeze({
    __proto__: null,
    get Enums() {
        return Enums;
    },
    TouchScript: TouchScript
});

let GunItem_Generate = class GunItem_Generate extends UIScript {
    get mSelectImage() {
        if (!this.mSelectImage_Internal && this.uiWidgetBase) {
            this.mSelectImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mSelectImage");
        }
        return this.mSelectImage_Internal;
    }
    get mIconImage() {
        if (!this.mIconImage_Internal && this.uiWidgetBase) {
            this.mIconImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mIconImage");
        }
        return this.mIconImage_Internal;
    }
    get mLockTextBlock() {
        if (!this.mLockTextBlock_Internal && this.uiWidgetBase) {
            this.mLockTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mLockTextBlock");
        }
        return this.mLockTextBlock_Internal;
    }
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mTypeTextBlock() {
        if (!this.mTypeTextBlock_Internal && this.uiWidgetBase) {
            this.mTypeTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mTypeTextBlock");
        }
        return this.mTypeTextBlock_Internal;
    }
    get mButton() {
        if (!this.mButton_Internal && this.uiWidgetBase) {
            this.mButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mButton");
        }
        return this.mButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mButton");
        }));
        this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mLockTextBlock);
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mTypeTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

GunItem_Generate = __decorate([ UIBind("UI/Gun/GunItem.ui") ], GunItem_Generate);

var GunItem_Generate$1 = GunItem_Generate;

var foreign77 = Object.freeze({
    __proto__: null,
    default: GunItem_Generate$1
});

let GunPanel_Generate = class GunPanel_Generate extends UIScript {
    get mTouchImage() {
        if (!this.mTouchImage_Internal && this.uiWidgetBase) {
            this.mTouchImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mTouchImage");
        }
        return this.mTouchImage_Internal;
    }
    get mScrollBox() {
        if (!this.mScrollBox_Internal && this.uiWidgetBase) {
            this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/LeftCanvas/mScrollBox");
        }
        return this.mScrollBox_Internal;
    }
    get mContentCanvas() {
        if (!this.mContentCanvas_Internal && this.uiWidgetBase) {
            this.mContentCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/LeftCanvas/mScrollBox/mContentCanvas");
        }
        return this.mContentCanvas_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    get mBuyCanvas() {
        if (!this.mBuyCanvas_Internal && this.uiWidgetBase) {
            this.mBuyCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas");
        }
        return this.mBuyCanvas_Internal;
    }
    get mDiamondCanvas() {
        if (!this.mDiamondCanvas_Internal && this.uiWidgetBase) {
            this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mDiamondCanvas");
        }
        return this.mDiamondCanvas_Internal;
    }
    get mDiamondTextBlock() {
        if (!this.mDiamondTextBlock_Internal && this.uiWidgetBase) {
            this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mDiamondCanvas/mDiamondTextBlock");
        }
        return this.mDiamondTextBlock_Internal;
    }
    get mCoinCanvas() {
        if (!this.mCoinCanvas_Internal && this.uiWidgetBase) {
            this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mCoinCanvas");
        }
        return this.mCoinCanvas_Internal;
    }
    get mCoinTextBlock() {
        if (!this.mCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mCoinCanvas/mCoinTextBlock");
        }
        return this.mCoinTextBlock_Internal;
    }
    get mBuyButton() {
        if (!this.mBuyButton_Internal && this.uiWidgetBase) {
            this.mBuyButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mBuyButton");
        }
        return this.mBuyButton_Internal;
    }
    get mBuyTextBlock() {
        if (!this.mBuyTextBlock_Internal && this.uiWidgetBase) {
            this.mBuyTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mBuyButton/mBuyTextBlock");
        }
        return this.mBuyTextBlock_Internal;
    }
    get mExplainCanvas() {
        if (!this.mExplainCanvas_Internal && this.uiWidgetBase) {
            this.mExplainCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mExplainCanvas");
        }
        return this.mExplainCanvas_Internal;
    }
    get mFireIntervalTextBlock() {
        if (!this.mFireIntervalTextBlock_Internal && this.uiWidgetBase) {
            this.mFireIntervalTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mExplainCanvas/mFireIntervalTextBlock");
        }
        return this.mFireIntervalTextBlock_Internal;
    }
    get mBulletCountTextBlock() {
        if (!this.mBulletCountTextBlock_Internal && this.uiWidgetBase) {
            this.mBulletCountTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mExplainCanvas/mBulletCountTextBlock");
        }
        return this.mBulletCountTextBlock_Internal;
    }
    get mHurtTextBlock() {
        if (!this.mHurtTextBlock_Internal && this.uiWidgetBase) {
            this.mHurtTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBuyCanvas/mExplainCanvas/mHurtTextBlock");
        }
        return this.mHurtTextBlock_Internal;
    }
    get mMiddleTopCanvas() {
        if (!this.mMiddleTopCanvas_Internal && this.uiWidgetBase) {
            this.mMiddleTopCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas");
        }
        return this.mMiddleTopCanvas_Internal;
    }
    get mBuyCoinCanvas() {
        if (!this.mBuyCoinCanvas_Internal && this.uiWidgetBase) {
            this.mBuyCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mBuyCoinCanvas");
        }
        return this.mBuyCoinCanvas_Internal;
    }
    get mBuyCoinTextBlock() {
        if (!this.mBuyCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mBuyCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mBuyCoinCanvas/CoinCanvas/mBuyCoinTextBlock");
        }
        return this.mBuyCoinTextBlock_Internal;
    }
    get mAddCoinButton() {
        if (!this.mAddCoinButton_Internal && this.uiWidgetBase) {
            this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mBuyCoinCanvas/mAddCoinButton");
        }
        return this.mAddCoinButton_Internal;
    }
    get mBuyDiamondCanvas() {
        if (!this.mBuyDiamondCanvas_Internal && this.uiWidgetBase) {
            this.mBuyDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mBuyDiamondCanvas");
        }
        return this.mBuyDiamondCanvas_Internal;
    }
    get mBuyDiamondTextBlock() {
        if (!this.mBuyDiamondTextBlock_Internal && this.uiWidgetBase) {
            this.mBuyDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mBuyDiamondCanvas/DiamondCanvas/mBuyDiamondTextBlock");
        }
        return this.mBuyDiamondTextBlock_Internal;
    }
    get mAddDiamondButton() {
        if (!this.mAddDiamondButton_Internal && this.uiWidgetBase) {
            this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mBuyDiamondCanvas/mAddDiamondButton");
        }
        return this.mAddDiamondButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mBuyButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mBuyButton");
        }));
        this.mBuyButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mAddCoinButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
        }));
        this.mAddCoinButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mAddDiamondButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
        }));
        this.mAddDiamondButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mDiamondTextBlock);
        this.initLanguage(this.mCoinTextBlock);
        this.initLanguage(this.mBuyTextBlock);
        this.initLanguage(this.mFireIntervalTextBlock);
        this.initLanguage(this.mBulletCountTextBlock);
        this.initLanguage(this.mHurtTextBlock);
        this.initLanguage(this.mBuyCoinTextBlock);
        this.initLanguage(this.mBuyDiamondTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

GunPanel_Generate = __decorate([ UIBind("UI/Gun/GunPanel.ui") ], GunPanel_Generate);

var GunPanel_Generate$1 = GunPanel_Generate;

var foreign78 = Object.freeze({
    __proto__: null,
    default: GunPanel_Generate$1
});

let HUDPanel_Generate = class HUDPanel_Generate extends UIScript {
    get mMainCanvas() {
        if (!this.mMainCanvas_Internal && this.uiWidgetBase) {
            this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas");
        }
        return this.mMainCanvas_Internal;
    }
    get mVirtualJoystickPanel() {
        if (!this.mVirtualJoystickPanel_Internal && this.uiWidgetBase) {
            this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas/mVirtualJoystickPanel");
        }
        return this.mVirtualJoystickPanel_Internal;
    }
    get mTouchPad() {
        if (!this.mTouchPad_Internal && this.uiWidgetBase) {
            this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas/mTouchPad");
        }
        return this.mTouchPad_Internal;
    }
    get mMiddleTopCanvas() {
        if (!this.mMiddleTopCanvas_Internal && this.uiWidgetBase) {
            this.mMiddleTopCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas");
        }
        return this.mMiddleTopCanvas_Internal;
    }
    get mCoinCanvas() {
        if (!this.mCoinCanvas_Internal && this.uiWidgetBase) {
            this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mCoinCanvas");
        }
        return this.mCoinCanvas_Internal;
    }
    get mCoinTextBlock() {
        if (!this.mCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mCoinCanvas/CoinCanvas/mCoinTextBlock");
        }
        return this.mCoinTextBlock_Internal;
    }
    get mAddCoinButton() {
        if (!this.mAddCoinButton_Internal && this.uiWidgetBase) {
            this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mCoinCanvas/mAddCoinButton");
        }
        return this.mAddCoinButton_Internal;
    }
    get mDiamondCanvas() {
        if (!this.mDiamondCanvas_Internal && this.uiWidgetBase) {
            this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mDiamondCanvas");
        }
        return this.mDiamondCanvas_Internal;
    }
    get mDiamondTextBlock() {
        if (!this.mDiamondTextBlock_Internal && this.uiWidgetBase) {
            this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mDiamondCanvas/DiamondCanvas/mDiamondTextBlock");
        }
        return this.mDiamondTextBlock_Internal;
    }
    get mAddDiamondButton() {
        if (!this.mAddDiamondButton_Internal && this.uiWidgetBase) {
            this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mDiamondCanvas/mAddDiamondButton");
        }
        return this.mAddDiamondButton_Internal;
    }
    get mRightTopCanvas() {
        if (!this.mRightTopCanvas_Internal && this.uiWidgetBase) {
            this.mRightTopCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas");
        }
        return this.mRightTopCanvas_Internal;
    }
    get mSetBtnCanvas() {
        if (!this.mSetBtnCanvas_Internal && this.uiWidgetBase) {
            this.mSetBtnCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mSetBtnCanvas");
        }
        return this.mSetBtnCanvas_Internal;
    }
    get mSetButton() {
        if (!this.mSetButton_Internal && this.uiWidgetBase) {
            this.mSetButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mSetBtnCanvas/mSetButton");
        }
        return this.mSetButton_Internal;
    }
    get mRankCanvas() {
        if (!this.mRankCanvas_Internal && this.uiWidgetBase) {
            this.mRankCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRankCanvas");
        }
        return this.mRankCanvas_Internal;
    }
    get mRankButton() {
        if (!this.mRankButton_Internal && this.uiWidgetBase) {
            this.mRankButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRankCanvas/mRankButton");
        }
        return this.mRankButton_Internal;
    }
    get mTeamCanvas() {
        if (!this.mTeamCanvas_Internal && this.uiWidgetBase) {
            this.mTeamCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTeamCanvas");
        }
        return this.mTeamCanvas_Internal;
    }
    get mTeamButton() {
        if (!this.mTeamButton_Internal && this.uiWidgetBase) {
            this.mTeamButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTeamCanvas/mTeamButton");
        }
        return this.mTeamButton_Internal;
    }
    get mGunCanvas() {
        if (!this.mGunCanvas_Internal && this.uiWidgetBase) {
            this.mGunCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mGunCanvas");
        }
        return this.mGunCanvas_Internal;
    }
    get mGunButton() {
        if (!this.mGunButton_Internal && this.uiWidgetBase) {
            this.mGunButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mGunCanvas/mGunButton");
        }
        return this.mGunButton_Internal;
    }
    get mLotteryCanvas() {
        if (!this.mLotteryCanvas_Internal && this.uiWidgetBase) {
            this.mLotteryCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLotteryCanvas");
        }
        return this.mLotteryCanvas_Internal;
    }
    get mLotteryButton() {
        if (!this.mLotteryButton_Internal && this.uiWidgetBase) {
            this.mLotteryButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLotteryCanvas/mLotteryButton");
        }
        return this.mLotteryButton_Internal;
    }
    get mClothBtnCanvas() {
        if (!this.mClothBtnCanvas_Internal && this.uiWidgetBase) {
            this.mClothBtnCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mClothBtnCanvas");
        }
        return this.mClothBtnCanvas_Internal;
    }
    get mClothButton() {
        if (!this.mClothButton_Internal && this.uiWidgetBase) {
            this.mClothButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mClothBtnCanvas/mClothButton");
        }
        return this.mClothButton_Internal;
    }
    get mRoleBtnCanvas() {
        if (!this.mRoleBtnCanvas_Internal && this.uiWidgetBase) {
            this.mRoleBtnCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRoleBtnCanvas");
        }
        return this.mRoleBtnCanvas_Internal;
    }
    get mRoleButton() {
        if (!this.mRoleButton_Internal && this.uiWidgetBase) {
            this.mRoleButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRoleBtnCanvas/mRoleButton");
        }
        return this.mRoleButton_Internal;
    }
    get mLoginBtnCanvas() {
        if (!this.mLoginBtnCanvas_Internal && this.uiWidgetBase) {
            this.mLoginBtnCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLoginBtnCanvas");
        }
        return this.mLoginBtnCanvas_Internal;
    }
    get mLoginButton() {
        if (!this.mLoginButton_Internal && this.uiWidgetBase) {
            this.mLoginButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLoginBtnCanvas/mLoginButton");
        }
        return this.mLoginButton_Internal;
    }
    get mTaskCanvas() {
        if (!this.mTaskCanvas_Internal && this.uiWidgetBase) {
            this.mTaskCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTaskCanvas");
        }
        return this.mTaskCanvas_Internal;
    }
    get mTaskButton() {
        if (!this.mTaskButton_Internal && this.uiWidgetBase) {
            this.mTaskButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTaskCanvas/mTaskButton");
        }
        return this.mTaskButton_Internal;
    }
    get mRedPointImage() {
        if (!this.mRedPointImage_Internal && this.uiWidgetBase) {
            this.mRedPointImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTaskCanvas/mRedPointImage");
        }
        return this.mRedPointImage_Internal;
    }
    get mMiddleBottomCanvas() {
        if (!this.mMiddleBottomCanvas_Internal && this.uiWidgetBase) {
            this.mMiddleBottomCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas");
        }
        return this.mMiddleBottomCanvas_Internal;
    }
    get mLvCanvas() {
        if (!this.mLvCanvas_Internal && this.uiWidgetBase) {
            this.mLvCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mLvCanvas");
        }
        return this.mLvCanvas_Internal;
    }
    get mLvTextBlock() {
        if (!this.mLvTextBlock_Internal && this.uiWidgetBase) {
            this.mLvTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mLvCanvas/mLvTextBlock");
        }
        return this.mLvTextBlock_Internal;
    }
    get mHpCanvas() {
        if (!this.mHpCanvas_Internal && this.uiWidgetBase) {
            this.mHpCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mHpCanvas");
        }
        return this.mHpCanvas_Internal;
    }
    get mExpProgressBar() {
        if (!this.mExpProgressBar_Internal && this.uiWidgetBase) {
            this.mExpProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mHpCanvas/mExpProgressBar");
        }
        return this.mExpProgressBar_Internal;
    }
    get mExpTextBlock() {
        if (!this.mExpTextBlock_Internal && this.uiWidgetBase) {
            this.mExpTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mHpCanvas/mExpTextBlock");
        }
        return this.mExpTextBlock_Internal;
    }
    get mHpProgressBar() {
        if (!this.mHpProgressBar_Internal && this.uiWidgetBase) {
            this.mHpProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mHpCanvas/mHpProgressBar");
        }
        return this.mHpProgressBar_Internal;
    }
    get mHpTextBlock() {
        if (!this.mHpTextBlock_Internal && this.uiWidgetBase) {
            this.mHpTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleBottomCanvas/mHpCanvas/mHpTextBlock");
        }
        return this.mHpTextBlock_Internal;
    }
    get mKillTipCanvas() {
        if (!this.mKillTipCanvas_Internal && this.uiWidgetBase) {
            this.mKillTipCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mKillTipCanvas");
        }
        return this.mKillTipCanvas_Internal;
    }
    get mDieCanvas() {
        if (!this.mDieCanvas_Internal && this.uiWidgetBase) {
            this.mDieCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mDieCanvas");
        }
        return this.mDieCanvas_Internal;
    }
    get mCountDownTextBlock() {
        if (!this.mCountDownTextBlock_Internal && this.uiWidgetBase) {
            this.mCountDownTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mDieCanvas/mCountDownTextBlock");
        }
        return this.mCountDownTextBlock_Internal;
    }
    get mSetCanvas() {
        if (!this.mSetCanvas_Internal && this.uiWidgetBase) {
            this.mSetCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas");
        }
        return this.mSetCanvas_Internal;
    }
    get mFireCanvas() {
        if (!this.mFireCanvas_Internal && this.uiWidgetBase) {
            this.mFireCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas");
        }
        return this.mFireCanvas_Internal;
    }
    get mFireProgressBar() {
        if (!this.mFireProgressBar_Internal && this.uiWidgetBase) {
            this.mFireProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/mFireProgressBar");
        }
        return this.mFireProgressBar_Internal;
    }
    get mControlCanvas() {
        if (!this.mControlCanvas_Internal && this.uiWidgetBase) {
            this.mControlCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas");
        }
        return this.mControlCanvas_Internal;
    }
    get mControlProgressBar() {
        if (!this.mControlProgressBar_Internal && this.uiWidgetBase) {
            this.mControlProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/mControlProgressBar");
        }
        return this.mControlProgressBar_Internal;
    }
    get mBgmCanvas() {
        if (!this.mBgmCanvas_Internal && this.uiWidgetBase) {
            this.mBgmCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas");
        }
        return this.mBgmCanvas_Internal;
    }
    get mBgmProgressBar() {
        if (!this.mBgmProgressBar_Internal && this.uiWidgetBase) {
            this.mBgmProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/mBgmProgressBar");
        }
        return this.mBgmProgressBar_Internal;
    }
    get mSetCloseButton() {
        if (!this.mSetCloseButton_Internal && this.uiWidgetBase) {
            this.mSetCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/mSetCloseButton");
        }
        return this.mSetCloseButton_Internal;
    }
    get mMaskButton() {
        if (!this.mMaskButton_Internal && this.uiWidgetBase) {
            this.mMaskButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/AtkCanvas/mMaskButton");
        }
        return this.mMaskButton_Internal;
    }
    get mCDTextBlock() {
        if (!this.mCDTextBlock_Internal && this.uiWidgetBase) {
            this.mCDTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/AtkCanvas/mCDTextBlock");
        }
        return this.mCDTextBlock_Internal;
    }
    get mSkillNameTextBlock() {
        if (!this.mSkillNameTextBlock_Internal && this.uiWidgetBase) {
            this.mSkillNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/AtkCanvas/mSkillNameTextBlock");
        }
        return this.mSkillNameTextBlock_Internal;
    }
    get mInvincibleCanvas() {
        if (!this.mInvincibleCanvas_Internal && this.uiWidgetBase) {
            this.mInvincibleCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mInvincibleCanvas");
        }
        return this.mInvincibleCanvas_Internal;
    }
    get mInvincibleProgressBar() {
        if (!this.mInvincibleProgressBar_Internal && this.uiWidgetBase) {
            this.mInvincibleProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mInvincibleCanvas/mInvincibleProgressBar");
        }
        return this.mInvincibleProgressBar_Internal;
    }
    get mInvincibleTextBlock() {
        if (!this.mInvincibleTextBlock_Internal && this.uiWidgetBase) {
            this.mInvincibleTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mInvincibleCanvas/mInvincibleTextBlock");
        }
        return this.mInvincibleTextBlock_Internal;
    }
    get mKillTipCountCanvas() {
        if (!this.mKillTipCountCanvas_Internal && this.uiWidgetBase) {
            this.mKillTipCountCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/KillTipCanvas/mKillTipCountCanvas");
        }
        return this.mKillTipCountCanvas_Internal;
    }
    get mKillTipTextBlock1() {
        if (!this.mKillTipTextBlock1_Internal && this.uiWidgetBase) {
            this.mKillTipTextBlock1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/KillTipCanvas/mKillTipCountCanvas/mKillTipTextBlock1");
        }
        return this.mKillTipTextBlock1_Internal;
    }
    get mKillTipTextBlock2() {
        if (!this.mKillTipTextBlock2_Internal && this.uiWidgetBase) {
            this.mKillTipTextBlock2_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/KillTipCanvas/mKillTipCountCanvas/mKillTipTextBlock2");
        }
        return this.mKillTipTextBlock2_Internal;
    }
    get mKillTipTextBlock3() {
        if (!this.mKillTipTextBlock3_Internal && this.uiWidgetBase) {
            this.mKillTipTextBlock3_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/KillTipCanvas/mKillTipTextBlock3");
        }
        return this.mKillTipTextBlock3_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mAddCoinButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
        }));
        this.mAddCoinButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mAddDiamondButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
        }));
        this.mAddDiamondButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mSetButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mSetButton");
        }));
        this.mSetButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mRankButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mRankButton");
        }));
        this.mRankButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mTeamButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mTeamButton");
        }));
        this.mTeamButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mGunButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mGunButton");
        }));
        this.mGunButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mLotteryButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mLotteryButton");
        }));
        this.mLotteryButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mClothButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mClothButton");
        }));
        this.mClothButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mRoleButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mRoleButton");
        }));
        this.mRoleButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mLoginButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mLoginButton");
        }));
        this.mLoginButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mTaskButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mTaskButton");
        }));
        this.mTaskButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mSetCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mSetCloseButton");
        }));
        this.mSetCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mCoinTextBlock);
        this.initLanguage(this.mDiamondTextBlock);
        this.initLanguage(this.mLvTextBlock);
        this.initLanguage(this.mExpTextBlock);
        this.initLanguage(this.mHpTextBlock);
        this.initLanguage(this.mCountDownTextBlock);
        this.initLanguage(this.mCDTextBlock);
        this.initLanguage(this.mSkillNameTextBlock);
        this.initLanguage(this.mInvincibleTextBlock);
        this.initLanguage(this.mKillTipTextBlock1);
        this.initLanguage(this.mKillTipTextBlock2);
        this.initLanguage(this.mKillTipTextBlock3);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mSetBtnCanvas/SetTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRankCanvas/RankTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTeamCanvas/TeamTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mGunCanvas/GunTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLotteryCanvas/LotteryTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mClothBtnCanvas/LoginTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mRoleBtnCanvas/RoleTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mLoginBtnCanvas/LoginTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mRightTopCanvas/mTaskCanvas/TaskTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mDieCanvas/TextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mDieCanvas/TextBlock_1"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/SetTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/FireTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/LowFireTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/MiddleFireTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mFireCanvas/HighFireTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/ControlTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/LowControlTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/MiddleControlTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mControlCanvas/HighControlTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/BgmTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/LowBgmTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/MiddleBgmTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mSetCanvas/MainCanvas/mBgmCanvas/HighBgmTextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

HUDPanel_Generate = __decorate([ UIBind("UI/HUD/HUDPanel.ui") ], HUDPanel_Generate);

var HUDPanel_Generate$1 = HUDPanel_Generate;

var foreign80 = Object.freeze({
    __proto__: null,
    default: HUDPanel_Generate$1
});

var MyClearAct_1;

class EffNode {
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

class AniNode {
    constructor() {
        this.guid = "21615";
        this.totalTime = 1.5;
        this.progress = 1;
        this.AnimSlot = 0;
    }
}

class SoundNode {
    constructor() {
        this.guid = "47417";
        this.volume = 1;
        this.inner = 200;
        this.outter = 600;
        this.stopTime = 0;
    }
}

class WeiYiNode {
    constructor() {
        this.lenth = 300;
        this.zOffset = 50;
        this.yaw = 0;
        this.time = .3;
        this.checkCount = 6;
    }
}

class YuanNode {
    constructor() {
        this.distance = 100;
        this.yaw = 0;
        this.zOffset = -30;
        this.radius = 50;
        this.height = 20;
        this.damage = 50;
    }
}

class BoxNode {
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

class EquipNode {
    constructor() {
        this.guid = "40715";
        this.location = new Vector(1, 1, 1);
        this.scale = new Vector(1, 1, 1);
        this.rotate = new Rotation(0, 0, 0);
        this.SlotType = 16;
    }
}

class DelayNode {
    constructor() {
        this.delayTime = .3;
    }
}

let DongXiaoList = class DongXiaoList {
    constructor(a, b) {
        this.skillName = "";
        this.skillJson = "";
        this.skillName = a ?? "";
        this.skillJson = b ?? "";
    }
};

__decorate([ mw.Property({
    displayName: "技能名"
}) ], DongXiaoList.prototype, "skillName", void 0);

__decorate([ mw.Property({
    displayName: "技能Json"
}) ], DongXiaoList.prototype, "skillJson", void 0);

DongXiaoList = __decorate([ Serializable ], DongXiaoList);

let MyClearAct = MyClearAct_1 = class MyClearAct extends mw.Script {
    constructor() {
        super(...arguments);
        this.enableEditor = true;
        this.AutoloadAssets = "29392,46284,21615,47417,7986";
        this.hitEffect = "29392";
        this.hitAinim = "46284";
        this.hitSound = "46284";
        this.SkillLists = [ new DongXiaoList("default", '["动画节点","{\\"guid\\":\\"29714\\",\\"totalTime\\":1.5,\\"progress\\":1,\\"AnimSlot\\":1}","延迟节点","{\\"delayTime\\":0.3}","音效节点","{\\"guid\\":\\"21210\\",\\"volume\\":1,\\"inner\\":200,\\"outter\\":600,\\"stopTime\\":0}","延迟节点","{\\"delayTime\\":0.4}","特效节点","{\\"guid\\":\\"123289\\",\\"time\\":1,\\"distance\\":150,\\"zOffset\\":10,\\"yaw\\":0,\\"scale\\":{\\"x\\":0.5,\\"y\\":0.5,\\"z\\":0.5},\\"rotate\\":{\\"x\\":0,\\"y\\":0,\\"z\\":90},\\"EffSlot\\":-1}","延迟节点","{\\"delayTime\\":0.1}","方盒判定","{\\"distance\\":100,\\"yaw\\":0,\\"pitch\\":0,\\"zOffset\\":0,\\"lenth\\":350,\\"width\\":60,\\"height\\":60,\\"damage\\":60}","延迟节点","{\\"delayTime\\":0.1}","音效节点","{\\"guid\\":\\"7986\\",\\"volume\\":1,\\"inner\\":200,\\"outter\\":600,\\"stopTime\\":0}"]') ];
        this.isVisible = true;
        this.charEquipMents = new Map;
        this.isActing = false;
        this.BNeedStop = false;
    }
    static get instance() {
        if (!MyClearAct_1._instance) {
            MyClearAct_1._instance = new Proxy({}, {
                get: (target, prop) => {
                    if (MyClearAct_1._isReady) {
                        return MyClearAct_1._instance[prop];
                    } else {
                        return (...args) => {
                            MyClearAct_1._queuedOperations.push((() => MyClearAct_1._instance[prop](...args)));
                        };
                    }
                }
            });
        }
        return MyClearAct_1._instance;
    }
    onStart() {
        MyClearAct_1._instance = this;
        MyClearAct_1._isReady = true;
        MyClearAct_1._queuedOperations.forEach((operation => operation()));
        MyClearAct_1._queuedOperations = [];
        Console.log("[MyClearAct] 初始化成功");
        this.useUpdate = true;
        this.isVisible = this.enableEditor;
        if (SystemUtil.isClient()) {
            this.SkillLists.forEach((async value => {
                let skJson = value.skillJson;
                let str = JSON.parse(skJson);
                str.forEach((item => {
                    const match = /"guid":"(\d+)"/.exec(item);
                    if (match) {
                        if (!AssetUtil.assetLoaded(match[1])) {
                            AssetUtil.asyncDownloadAsset(match[1]).then((ok => {
                                if (ok) {
                                    Console.log("[MyClearAct] 加载资源：" + match[1] + " 成功");
                                } else {
                                    Console.warn("[MyClearAct] 加载资源：" + match[1] + " 失败，请检查一下资源");
                                }
                            }));
                        }
                    }
                }));
            }));
            let pload = this.AutoloadAssets.split(",");
            pload.forEach((guid => {
                if (!AssetUtil.assetLoaded(guid)) {
                    AssetUtil.asyncDownloadAsset(guid).then((ok => {
                        if (ok) {
                            Console.log("[MyClearAct] 加载资源：" + guid + " 成功");
                        } else {
                            Console.warn("[MyClearAct] 加载资源：" + guid + " 失败，请检查一下资源");
                        }
                    }));
                }
            }));
            setTimeout((() => {
                if (this.enableEditor && SystemUtil.isPIE) {
                    let mainui = mw.UIService.create(MainUI);
                    mw.UIService.showUI(mainui);
                }
            }), 700);
        }
        if (SystemUtil.isServer()) {
            Player.onPlayerLeave.add((player => {
                MyClearAct_1.serverDetachAllEquip(player);
            }));
        }
    }
    static actNow(player, skName) {
        let skJson = undefined;
        MyClearAct_1.instance.isActing = true;
        MyClearAct_1.instance.SkillLists.forEach((async value => {
            if (value.skillName == skName) {
                skJson = value.skillJson;
                if (skJson != undefined) {
                    let MyStringArr = JSON.parse(skJson);
                    for (let index = 0; index < MyStringArr.length; index++) {
                        if (player.character.ragdollEnabled) {
                            MyClearAct_1.instance.isActing = false;
                            break;
                        }
                        if (MyClearAct_1.instance.BNeedStop == true) {
                            MyClearAct_1.instance.isActing = false;
                            MyClearAct_1.instance.BNeedStop = false;
                            break;
                        }
                        if (index % 2 == 0) {
                            let NodeName = MyStringArr[index];
                            let UINODE = MyStringArr[index + 1];
                            if (NodeName == "特效节点") {
                                let node = JSON.parse(UINODE);
                                if (node.EffSlot < 0) {
                                    let rottat = v3toString(node.rotate);
                                    let parts1 = rottat.split("|").map(parseFloat);
                                    if (parts1.length != 3 || parts1.some(isNaN)) {
                                        parts1[0] = 0;
                                        parts1[1] = 0;
                                        parts1[2] = 0;
                                    }
                                    let pro = v3toString(player.character.worldTransform.rotation);
                                    let parts2 = pro.split("|").map(parseFloat);
                                    if (parts2.length != 3 || parts2.some(isNaN)) {
                                        parts2[0] = 0;
                                        parts2[1] = 0;
                                        parts2[2] = 0;
                                    }
                                    let addR = parts1[0] + "|" + parts1[1] + "|" + (parts1[2] + parts2[2] + "");
                                    let roro = stringToRotation(addR);
                                    node.rotate = roro;
                                }
                                let newv3 = v3toString(node.scale);
                                node.scale = stringToVector(newv3);
                                MyClearAct_1.instance.serverPlayEffect(player, node.guid, node.time, node.distance, node.zOffset, node.yaw, node.scale, node.rotate, node.EffSlot);
                            }
                            if (NodeName == "动画节点") {
                                let node = JSON.parse(UINODE);
                                MyClearAct_1.instance.serverPlayAnimotion(player, node.guid, node.totalTime, node.progress, node.AnimSlot);
                            }
                            if (NodeName == "音效节点") {
                                let node = JSON.parse(UINODE);
                                MyClearAct_1.instance.serverPlay3DSound(player, node.guid, node.volume, node.inner, node.outter, node.stopTime);
                            }
                            if (NodeName == "位移节点") {
                                let node = JSON.parse(UINODE);
                                MyClearAct_1.instance.weiYi(player, node.lenth, node.zOffset, node.yaw, node.time, node.checkCount);
                            }
                            if (NodeName == "球圆判定") {
                                let node = JSON.parse(UINODE);
                                MyClearAct_1.instance.yuanPanding(player, node.distance, node.yaw, node.zOffset, node.radius, node.height, node.damage, skName, index / 2 + 1);
                            }
                            if (NodeName == "方盒判定") {
                                let node = JSON.parse(UINODE);
                                MyClearAct_1.instance.boxPanding(player, node.distance, node.yaw, node.pitch, node.zOffset, node.lenth, node.width, node.height, node.damage, skName, index / 2 + 1);
                            }
                            if (NodeName == "装备节点") {
                                let node = JSON.parse(UINODE);
                                MyClearAct_1.serverEquipMe(player, node.guid, node.location, node.scale, node.rotate, node.SlotType);
                            }
                            if (NodeName == "延迟节点") {
                                let node = JSON.parse(UINODE);
                                await new Promise((resolve => setTimeout(resolve, node.delayTime * 1e3)));
                            }
                        }
                    }
                    MyClearAct_1.instance.isActing = false;
                }
            }
        }));
    }
    static whoIsOwner(objGUID) {
        let ReturnPid = null;
        MyClearAct_1.instance.charEquipMents.forEach(((v, k) => {
            if (v.gameObjectId == objGUID) {
                Player.getAllPlayers().forEach((p => {
                    Console.log("k: " + k + " UserId: " + p.userId);
                    let Pid = p.userId;
                    if (k.includes(Pid)) {
                        ReturnPid = p;
                    }
                }));
            }
        }));
        return ReturnPid;
    }
    static stopNow(player) {
        if (MyClearAct_1.instance.isActing) {
            MyClearAct_1.instance.BNeedStop = true;
            this.serverDetachAllEquip(player);
        }
    }
    onUpdate(dt) {}
    isNumeric(input) {
        const pattern = /^\d+$/;
        return pattern.test(input);
    }
    static serverEquipMe(Attacker, guid, location, scale, rotate, SlotType) {
        location = new Vector(location.x, location.y, location.z);
        scale = new Vector(scale.x, scale.y, scale.z);
        rotate = new Rotation(rotate.x, rotate.y, rotate.z);
        let pid = Attacker.userId;
        let equipId = "Peqp_" + pid + SlotType.toString();
        if (!guid.match(".*[a-zA-Z].*") && Number(guid) <= 0) {
            if (SlotType > 0) {
                if (MyClearAct_1.instance.charEquipMents.get(equipId)) {
                    MyClearAct_1.instance.charEquipMents.get(equipId).destroy();
                    MyClearAct_1.instance.charEquipMents.delete(equipId);
                }
            } else {
                this.serverDetachAllEquip(Attacker);
            }
        } else {
            if (!AssetUtil.assetLoaded(guid)) {
                AssetUtil.asyncDownloadAsset(guid).then((() => {
                    if (MyClearAct_1.instance.charEquipMents.get(equipId)) {
                        MyClearAct_1.instance.charEquipMents.get(equipId).destroy();
                    }
                    GameObject.asyncSpawn(guid, {
                        transform: new Transform(new Vector(0, 0, -1e3), rotate, scale)
                    }).then((equipItem => {
                        {
                            equipItem.setCollision(2);
                            MyClearAct_1.instance.charEquipMents.set(equipId, equipItem);
                            Attacker.character.attachToSlot(equipItem, SlotType);
                            equipItem.localTransform.position = location;
                        }
                    }));
                }));
            } else {
                if (MyClearAct_1.instance.charEquipMents.get(equipId)) {
                    MyClearAct_1.instance.charEquipMents.get(equipId).destroy();
                }
                GameObject.asyncSpawn(guid, {
                    transform: new Transform(new Vector(0, 0, -1e3), rotate, scale)
                }).then((equipItem => {
                    {
                        equipItem.setCollision(2);
                        MyClearAct_1.instance.charEquipMents.set(equipId, equipItem);
                        Attacker.character.attachToSlot(equipItem, SlotType);
                        equipItem.localTransform.position = location;
                    }
                }));
            }
        }
    }
    static serverDetachAllEquip(Attacker) {
        Console.log("触发去除所有装备");
        let pid = Attacker.userId;
        MyClearAct_1.instance.charEquipMents.forEach(((equipItem, key) => {
            if (key.includes("Peqp_" + pid)) {
                if (equipItem) {
                    equipItem.destroy();
                    MyClearAct_1.instance.charEquipMents.delete(key);
                }
            }
        }));
    }
    onHitDamage(Attacker, hitArr, damage, skillName, index) {
        hitArr.forEach((char => {
            let victimID = null;
            if (char.player != null) {
                victimID = char.gameObjectId;
            } else {
                victimID = char.gameObjectId;
            }
            if (!this.isFriendly(Attacker.userId, victimID)) {
                this.ServerPlayHitEffect(char);
                MyClearAct_1.ServerDamageChar.forEach((callbackfn => callbackfn(Attacker.character.gameObjectId, victimID, damage, skillName, index)));
            }
        }));
    }
    isFriendly(PlayerID1, PlayerID2) {
        for (const check of MyClearAct_1.checkIfFriendly) {
            if (check(PlayerID1, PlayerID2)) {
                return true;
            }
        }
        return false;
    }
    ServerPlayHitEffect(char) {
        if (Array.isArray(char)) {
            char.forEach((pawn => {
                EffectService.playOnGameObject(this.hitEffect, pawn);
                const mychar = pawn;
                mychar.loadAnimation(this.hitAinim).play();
                SoundService.play3DSound(this.isFemale(mychar) ? "135496" : "115257", mychar, 1, 1, {
                    radius: 400,
                    falloffDistance: 800
                });
            }));
        } else {
            EffectService.playOnGameObject(this.hitEffect, char);
            const mychar = char;
            mychar.loadAnimation(this.hitAinim).play();
            SoundService.play3DSound(this.isFemale(mychar) ? "135496" : "115257", mychar, 1, 1, {
                radius: 400,
                falloffDistance: 800
            });
        }
    }
    isFemale(mychar) {
        return mychar.description.advance.base.characterSetting.somatotype % 2 == 0;
    }
    serverPlayEffect(Attacker, guid, time, distance, zOffset, yaw, scale, rotate, EffSlot) {
        scale = new Vector(scale.x, scale.y, scale.z);
        rotate = new Rotation(rotate.x, rotate.y, rotate.z);
        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, 0, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.add(dirc_.clone().multiply(distance)).clone().add(new Vector(0, 0, zOffset));
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((() => {
                if (EffSlot > 0) {
                    let trn = AttackerChar.worldTransform.clone().clone();
                    let relaLoc = trn.inverseTransformPosition(startLoc).clone();
                    if (time > 0) {
                        EffectService.playOnGameObject(guid, Attacker.character, {
                            slotType: EffSlot,
                            loopCount: time,
                            position: relaLoc,
                            rotation: rotate,
                            scale: scale
                        });
                    } else {
                        EffectService.playOnGameObject(guid, Attacker.character, {
                            slotType: EffSlot,
                            duration: -time,
                            position: relaLoc,
                            rotation: rotate,
                            scale: scale
                        });
                    }
                } else {
                    if (time > 0) {
                        EffectService.playAtPosition(guid, startLoc, {
                            loopCount: time,
                            rotation: rotate,
                            scale: scale
                        });
                    } else {
                        EffectService.playAtPosition(guid, startLoc, {
                            duration: -time,
                            rotation: rotate,
                            scale: scale
                        });
                    }
                }
            }));
        } else {
            AssetUtil.asyncDownloadAsset(guid).then((() => {
                if (EffSlot > 0) {
                    let trn = AttackerChar.worldTransform.clone().clone();
                    let relaLoc = trn.inverseTransformPosition(startLoc).clone();
                    if (time > 0) {
                        EffectService.playOnGameObject(guid, Attacker.character, {
                            slotType: EffSlot,
                            loopCount: time,
                            position: relaLoc,
                            rotation: rotate,
                            scale: scale
                        });
                    } else {
                        EffectService.playOnGameObject(guid, Attacker.character, {
                            slotType: EffSlot,
                            duration: -time,
                            position: relaLoc,
                            rotation: rotate,
                            scale: scale
                        });
                    }
                } else {
                    if (time > 0) {
                        EffectService.playAtPosition(guid, startLoc, {
                            loopCount: time,
                            rotation: rotate,
                            scale: scale
                        });
                    } else {
                        EffectService.playAtPosition(guid, startLoc, {
                            duration: -time,
                            rotation: rotate,
                            scale: scale
                        });
                    }
                }
            }));
        }
    }
    serverPlayAnimotion(Attacker, guid, totalTime, progress, AnimSlot) {
        progress = progress > 1 ? 1 : progress <= 0 ? .1 : progress;
        let AttackerChar = Attacker.character;
        let anim = undefined;
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((() => {
                anim = AttackerChar.loadAnimation(guid);
                anim.speed = anim.length * progress / totalTime;
                anim.slot = AnimSlot;
                anim.play();
                setTimeout((() => {
                    anim.stop();
                }), totalTime * 1e3);
            }));
        } else {
            anim = anim = AttackerChar.loadAnimation(guid);
            anim.speed = anim.length * progress / totalTime;
            anim.slot = AnimSlot;
            anim.play();
            setTimeout((() => {
                anim.stop();
            }), totalTime * 1e3);
        }
    }
    serverPlay3DSound(Attacker, guid, volume, inner, outter, stopTime) {
        if (outter != undefined) {
            let omiga1 = Math.max(inner, outter);
            let omiga2 = Math.min(inner, outter);
            inner = omiga2;
            outter = omiga1;
        } else if (inner != undefined) {
            outter = inner;
            inner = 0;
        }
        let AttackerChar = Attacker.character;
        let sound = undefined;
        if (!AssetUtil.assetLoaded(guid)) {
            AssetUtil.asyncDownloadAsset(guid).then((() => {
                sound = SoundService.play3DSound(guid, AttackerChar, 1, volume, {
                    radius: inner ?? 200,
                    falloffDistance: outter ?? 600
                });
                if (stopTime != undefined && stopTime > 0) {
                    setTimeout((() => {
                        SoundService.stop3DSound(sound);
                    }), stopTime * 1e3);
                }
            }));
        } else {
            sound = SoundService.play3DSound(guid, AttackerChar, 1, volume, {
                radius: inner ?? 200,
                falloffDistance: outter ?? 600
            });
            if (stopTime != undefined && stopTime > 0) {
                setTimeout((() => {
                    SoundService.stop3DSound(sound);
                }), stopTime * 1e3);
            }
        }
    }
    weiYi(Attacker, lenth, zOffset, yaw, time, checkCount) {
        time = 1e3 * time;
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
        let endLoc2 = startLoc.clone().add(dirc3.clone().multiply(1 * distance2 / checkCount));
        let realEndLoc = endLoc;
        for (let index = 0; index < checkCount; index++) {
            if (hitMesh) {
                realEndLoc = startLoc.clone().add(dirc3.clone().multiply((index - 1) * distance2 / checkCount));
                time = index * time / checkCount;
                break;
            }
            startLoc2 = startLoc.clone().add(dirc3.clone().multiply(index * distance2 / checkCount));
            let num = index + 1;
            endLoc2 = startLoc.clone().add(dirc3.clone().multiply(num * distance2 / checkCount));
            let CharCollisnX = undefined;
            if (AttackerChar.isCrouching) {
                CharCollisnX = 70;
            } else {
                CharCollisnX = 150;
            }
            let checkLine = MyClearAct_1.modiftboxOverlap(startLoc2, endLoc2, 60, CharCollisnX, this.isVisible);
            checkLine.forEach((value => {
                if (value instanceof mw.Pawn) {
                    if (value.player != Attacker) ;
                } else {
                    if (value.netStatus != 1 && !(value instanceof mw.Trigger)) {
                        hitMesh = true;
                    }
                }
            }));
        }
        let moveTween = new mw.Tween(Attacker.character.worldTransform.position).to(realEndLoc, time).onUpdate((obj => {
            Attacker.character.worldTransform.position = obj;
            Attacker.character.movementEnabled = false;
        })).onComplete((() => {
            Attacker.character.movementEnabled = true;
        }));
        moveTween.start();
    }
    yuanPanding(Attacker, distance, yaw, zOffset, radius, height, damage, skillName, index) {
        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, 0, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.add(dirc_.clone().multiply(distance)).clone().add(new Vector(0, 0, zOffset));
        let hitArr = [];
        if (height > 0) {
            let yuan = QueryUtil.capsuleOverlap(startLoc, radius, height, this.isVisible);
            yuan.forEach((vaule => {
                if (vaule instanceof mw.Character) {
                    if (vaule.player != Attacker || !(vaule.player !== null)) {
                        hitArr.push(vaule);
                    }
                }
            }));
        } else {
            let yuan = QueryUtil.sphereOverlap(startLoc, radius, this.isVisible);
            yuan.forEach((vaule => {
                if (vaule instanceof mw.Character) {
                    if (vaule.player != Attacker || !(vaule.player !== null)) {
                        hitArr.push(vaule);
                    }
                }
            }));
        }
        if (SystemUtil.isServer() && this.isVisible) {
            this.yuanPandingShow(Attacker, startLoc, radius, height);
        }
        if (hitArr.length > 0) {
            let NewDamage = damage;
            this.onHitDamage(Attacker, hitArr, NewDamage, skillName, index);
        }
        return hitArr;
    }
    boxPanding(Attacker, distance, yaw, pitch, zOffset, lenth, width, height, damage, skillName, index) {
        let AttackerChar = Attacker.character;
        let dirc = AttackerChar.worldTransform.getForwardVector().clone().multiply(new Vector(1, 1, 0)).normalize().clone();
        let dirc_ = dirc.clone().toRotation().add(new Rotation(0, pitch, yaw)).getForce();
        let startLoc = AttackerChar.worldTransform.position.add(dirc_.clone().multiply(distance)).clone().add(new Vector(0, 0, zOffset));
        let endLoc = startLoc.clone().add(dirc_.clone().multiply(lenth)).clone();
        let box = MyClearAct_1.modiftboxOverlap(startLoc, endLoc, width, height, this.isVisible);
        let hitArr = [];
        box.forEach((vaule => {
            if (vaule instanceof mw.Pawn) {
                if (vaule.player != Attacker) {
                    hitArr.push(vaule);
                }
            }
        }));
        if (SystemUtil.isServer() && this.isVisible) {
            this.boxPandingShow(Attacker, startLoc, endLoc, width, height);
        }
        if (hitArr.length > 0) {
            let NewDamage = damage;
            this.onHitDamage(Attacker, hitArr, NewDamage, skillName, index);
        }
        return hitArr;
    }
    boxPandingShow(player, startLoc, endLoc, width, height) {
        MyClearAct_1.modiftboxOverlap(startLoc, endLoc, width, height, true);
    }
    yuanPandingShow(player, startLoc, radius, height) {
        if (height > 0) {
            QueryUtil.capsuleOverlap(startLoc, radius, height, true);
        } else {
            QueryUtil.sphereOverlap(startLoc, radius, true);
        }
    }
    static modiftboxOverlap(startLocation, endLocation, width, height, drawDebug, objectsToIgnore, ignoreObjectsByType, self) {
        let halfSize = new Vector(height / 2, width / 2);
        let orientation = Vector.subtract(endLocation, startLocation).toRotation();
        let results = QueryUtil.boxTrace(startLocation, endLocation, halfSize, orientation, true, drawDebug, objectsToIgnore, ignoreObjectsByType, self);
        let objResults = new Array;
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj) continue;
            if (objResults.indexOf(obj) == -1) objResults.push(obj);
        }
        return objResults;
    }
};

MyClearAct._isReady = false;

MyClearAct._instance = null;

MyClearAct._queuedOperations = [];

MyClearAct.ServerDamageChar = [];

MyClearAct.checkIfFriendly = [];

__decorate([ mw.Property({
    displayName: "是否开启编辑状态",
    group: "全局配置",
    tooltip: "开启时，进入游戏会打开动效编辑器；关闭时则不会打开"
}) ], MyClearAct.prototype, "enableEditor", void 0);

__decorate([ mw.Property({
    displayName: "优先加载",
    group: "全局配置",
    tooltip: "在这里填入需要优先加载的GUID，然后ctrl+s保存该工程，不用担心重复，onStart里有处理"
}) ], MyClearAct.prototype, "AutoloadAssets", void 0);

__decorate([ mw.Property({
    displayName: "受击特效",
    group: "全局配置",
    tooltip: "被击中时受击角色身上的特效"
}) ], MyClearAct.prototype, "hitEffect", void 0);

__decorate([ mw.Property({
    displayName: "受击动画",
    group: "全局配置",
    tooltip: "被击中时受击角色会播的动画"
}) ], MyClearAct.prototype, "hitAinim", void 0);

__decorate([ mw.Property({
    displayName: "受击音效",
    group: "全局配置",
    tooltip: "被击中时受击角色会播的音效"
}) ], MyClearAct.prototype, "hitSound", void 0);

__decorate([ mw.Property({
    displayName: "类",
    group: "技能列表"
}) ], MyClearAct.prototype, "SkillLists", void 0);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct.prototype, "onHitDamage", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct.prototype, "serverPlayEffect", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct.prototype, "serverPlayAnimotion", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct.prototype, "serverPlay3DSound", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct.prototype, "yuanPanding", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct.prototype, "boxPanding", null);

__decorate([ RemoteFunction(mw.Client) ], MyClearAct.prototype, "boxPandingShow", null);

__decorate([ RemoteFunction(mw.Client) ], MyClearAct.prototype, "yuanPandingShow", null);

__decorate([ RemoteFunction(mw.Client) ], MyClearAct, "actNow", null);

__decorate([ RemoteFunction(mw.Client) ], MyClearAct, "stopNow", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct, "serverEquipMe", null);

__decorate([ RemoteFunction(mw.Server) ], MyClearAct, "serverDetachAllEquip", null);

MyClearAct = MyClearAct_1 = __decorate([ Component ], MyClearAct);

var MyClearAct$1 = MyClearAct;

class MainUI extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.skillRoll = undefined;
        this.contentCanv = undefined;
        this.btnCanv = undefined;
        this.addEffBtn = undefined;
        this.addAnimBtn = undefined;
        this.addSoundBtn = undefined;
        this.addWeiYiBtn = undefined;
        this.addYuanBtn = undefined;
        this.addFangBtn = undefined;
        this.addEquipBtn = undefined;
        this.addDelayBtn = undefined;
        this.hideShowBtn = undefined;
        this.enCodeBtn = undefined;
        this.deCodeBtn = undefined;
        this.getGUIDBtn = undefined;
        this.PlayBtn = undefined;
        this.downInput = undefined;
        this.targetUIWidget = undefined;
    }
    onAwake() {
        MainUI.instance = this;
        this.rootCanvas.renderOpacity = .8;
        this.rootCanvas.zOrder = mw.UILayerSystem;
        let size = WindowUtil.getViewportSize();
        let rollY = size.y / 2.8;
        let _margin = new mw.Margin(.1);
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
    onContentChange() {
        let size = WindowUtil.getViewportSize();
        this.contentCanv.size = new Vector2((this.contentCanv.getChildrenCount() + 2) * 1.05 * size.x / 7, size.y / 3);
        this.contentCanv.position = new Vector2(0, 0);
        for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
            let child = this.contentCanv.getChildAt(index - 1);
            let UINODE = mw.findUIScript(child);
            UINODE.text9.text = index + "";
            refreshNodeColor(UINODE);
        }
    }
    fanXuLieHua() {
        let size = WindowUtil.getViewportSize();
        this.contentCanv.removeAllChildren();
        let MyStringArr = JSON.parse(this.downInput.text);
        this.onContentChange();
        MyStringArr.forEach(((value, index) => {
            if (index % 2 == 0) {
                let name = MyStringArr[index];
                if (name == "特效节点") {
                    let Node = JSON.parse(MyStringArr[index + 1]);
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let ANNODE = Node;
                    _UInode.tittleText.text = "动画节点";
                    _UInode.text1.text = "动画GUID：";
                    _UInode.text2.text = "播放耗时：";
                    _UInode.text3.text = "播放进度：";
                    _UInode.text4.text = "播放插槽：";
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let SOUNDNODE = Node;
                    _UInode.tittleText.text = "音效节点";
                    _UInode.text1.text = "音效GUID：";
                    _UInode.text2.text = "音量：";
                    _UInode.text3.text = "无衰半径：";
                    _UInode.text4.text = "衰减半径：";
                    _UInode.text5.text = "停止秒数：";
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let WeiYiNode = Node;
                    _UInode.tittleText.text = "位移节点";
                    _UInode.text1.text = "水平距离：";
                    _UInode.text2.text = "垂直距离：";
                    _UInode.text3.text = "偏航角度：";
                    _UInode.text4.text = "位移耗时：";
                    _UInode.text5.text = "检测次数：";
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let YuanNode = Node;
                    _UInode.tittleText.text = "球圆判定";
                    _UInode.text1.text = "水平距离：";
                    _UInode.text2.text = "偏航角度：";
                    _UInode.text3.text = "垂直距离";
                    _UInode.text4.text = "半径：";
                    _UInode.text5.text = "圆柱高度：";
                    _UInode.text6.text = "判定伤害：";
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let BoxNode = Node;
                    _UInode.tittleText.text = "方盒判定";
                    _UInode.text1.text = "水平距离：";
                    _UInode.text2.text = "偏航角度：";
                    _UInode.text3.text = "俯仰角度：";
                    _UInode.text4.text = "垂直距离：";
                    _UInode.text5.text = "方盒长度：";
                    _UInode.text6.text = "方盒宽度：";
                    _UInode.text7.text = "方盒高度：";
                    _UInode.text8.text = "判定伤害：";
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let BoxNode = Node;
                    _UInode.tittleText.text = "装备节点";
                    _UInode.text1.text = "模型GUID：";
                    _UInode.text2.text = "相对位置：";
                    _UInode.text3.text = "相对缩放：";
                    _UInode.text4.text = "相对旋转：";
                    _UInode.text5.text = "装备插槽：";
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
                    let Node = JSON.parse(MyStringArr[index + 1]);
                    let _UInode = mw.UIService.create(UINode);
                    let DelayNode = Node;
                    _UInode.tittleText.text = "延迟节点";
                    _UInode.text1.text = "时长秒：";
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
        }));
    }
    xuLieHua() {
        let xulie = [];
        for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
            let child = this.contentCanv.getChildAt(index - 1);
            let UINODE = mw.findUIScript(child);
            let NodeName = UINODE.tittleText.text;
            if (NodeName == "特效节点") {
                let node = new EffNode;
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
                let node = new AniNode;
                node.guid = UINODE.input1.text;
                node.totalTime = Number(UINODE.input2.text);
                node.progress = Number(UINODE.input3.text);
                node.AnimSlot = Number(UINODE.input4.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
            if (NodeName == "音效节点") {
                let node = new SoundNode;
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
                let node = new WeiYiNode;
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
                let node = new YuanNode;
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
                let node = new BoxNode;
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
                let node = new EquipNode;
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
                let node = new DelayNode;
                node.delayTime = Number(UINODE.input1.text);
                xulie.push(NodeName);
                let json = JSON.stringify(node);
                xulie.push(json);
            }
        }
        let json2 = JSON.stringify(xulie);
        this.downInput.text = json2;
    }
    initBtn() {
        Event.addLocalListener("onContentChange", (() => {
            this.onContentChange();
        }));
        let size = WindowUtil.getViewportSize();
        this.hideShowBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.X, this.hideShowBtn);
        this.hideShowBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.hideShowBtn.onClicked.add((() => {
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
        }));
        this.PlayBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.One, this.PlayBtn);
        this.PlayBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        let Attacker = Player.localPlayer;
        this.PlayBtn.onClicked.add((async () => {
            let xulie = [];
            for (let index = 1; index <= this.contentCanv.getChildrenCount(); index++) {
                let child = this.contentCanv.getChildAt(index - 1);
                let UINODE = mw.findUIScript(child);
                let NodeName = UINODE.tittleText.text;
                if (NodeName == "特效节点") {
                    let node = new EffNode;
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
                    let node = new AniNode;
                    node.guid = UINODE.input1.text;
                    node.totalTime = Number(UINODE.input2.text);
                    node.progress = Number(UINODE.input3.text);
                    node.AnimSlot = Number(UINODE.input4.text);
                    xulie.push(NodeName);
                    let json = JSON.stringify(node);
                    xulie.push(json);
                }
                if (NodeName == "音效节点") {
                    let node = new SoundNode;
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
                    let node = new WeiYiNode;
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
                    let node = new YuanNode;
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
                    let node = new BoxNode;
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
                    let node = new EquipNode;
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
                    let node = new DelayNode;
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
                if (Attacker.character.ragdollEnabled) {
                    MyClearAct.instance.isActing = false;
                    this.skillRoll.position = new Vector2(this.skillRoll.position.x, 10);
                    break;
                }
                if (MyClearAct.instance.BNeedStop == true) {
                    MyClearAct.instance.isActing = false;
                    MyClearAct.instance.BNeedStop = false;
                    break;
                }
                let child = this.contentCanv.getChildAt(index - 1);
                let UINODE = mw.findUIScript(child);
                let NodeName = UINODE.tittleText.text;
                let Acolor = UINODE.BGP.imageColor;
                UINODE.text9.fontColor = LinearColor.red;
                UINODE.tittleText.fontColor = LinearColor.red;
                UINODE.BGP.imageColor = LinearColor.white;
                setTimeout((() => {
                    UINODE.text9.fontColor = LinearColor.white;
                    UINODE.tittleText.fontColor = LinearColor.white;
                    UINODE.BGP.imageColor = Acolor;
                }), 300);
                if (NodeName == "特效节点") {
                    let node = new EffNode;
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
                    let node = new AniNode;
                    node.guid = UINODE.input1.text;
                    node.totalTime = Number(UINODE.input2.text);
                    node.progress = Number(UINODE.input3.text);
                    node.AnimSlot = Number(UINODE.input4.text);
                    MyClearAct.instance.serverPlayAnimotion(Attacker, node.guid, node.totalTime, node.progress, node.AnimSlot);
                }
                if (NodeName == "音效节点") {
                    let node = new SoundNode;
                    node.guid = UINODE.input1.text;
                    node.volume = Number(UINODE.input2.text);
                    node.inner = Number(UINODE.input3.text);
                    node.outter = Number(UINODE.input4.text);
                    node.stopTime = Number(UINODE.input5.text);
                    MyClearAct.instance.serverPlay3DSound(Attacker, node.guid, node.volume, node.inner, node.outter, node.stopTime);
                }
                if (NodeName == "位移节点") {
                    let node = new WeiYiNode;
                    node.lenth = Number(UINODE.input1.text);
                    node.zOffset = Number(UINODE.input2.text);
                    node.yaw = Number(UINODE.input3.text);
                    node.time = Number(UINODE.input4.text);
                    node.checkCount = Number(UINODE.input5.text);
                    MyClearAct.instance.weiYi(Attacker, node.lenth, node.zOffset, node.yaw, node.time, node.checkCount);
                }
                if (NodeName == "球圆判定") {
                    let node = new YuanNode;
                    node.distance = Number(UINODE.input1.text);
                    node.yaw = Number(UINODE.input2.text);
                    node.zOffset = Number(UINODE.input3.text);
                    node.radius = Number(UINODE.input4.text);
                    node.height = Number(UINODE.input5.text);
                    node.damage = Number(UINODE.input6.text);
                    MyClearAct.instance.yuanPanding(Attacker, node.distance, node.yaw, node.zOffset, node.radius, node.height, node.damage, "未命名技能", index);
                }
                if (NodeName == "方盒判定") {
                    let node = new BoxNode;
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
                    let node = new EquipNode;
                    node.guid = UINODE.input1.text;
                    node.location = stringToVector(UINODE.input2.text);
                    node.scale = stringToVector(UINODE.input3.text);
                    node.rotate = stringToRotation(UINODE.input4.text);
                    node.SlotType = Number(UINODE.input5.text);
                    MyClearAct.serverEquipMe(Attacker, node.guid, node.location, node.scale, node.rotate, node.SlotType);
                }
                if (NodeName == "延迟节点") {
                    let node = new DelayNode;
                    node.delayTime = Number(UINODE.input1.text);
                    await new Promise((resolve => setTimeout(resolve, node.delayTime * 1e3)));
                }
            }
            MyClearAct.instance.isActing = false;
        }));
        this.getGUIDBtn.transitionEnable = true;
        this.getGUIDBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.getGUIDBtn.onClicked.add((() => {
            let str = JSON.parse(this.downInput.text);
            const guids = new Set;
            str.forEach((item => {
                const match = /"guid":"(\d+)"/.exec(item);
                if (match) {
                    guids.add(match[1]);
                }
            }));
            const result = Array.from(guids).join(",");
            this.downInput.text = result;
        }));
        this.deCodeBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.H, this.deCodeBtn);
        this.deCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.deCodeBtn.onClicked.add((() => {
            this.fanXuLieHua();
        }));
        this.enCodeBtn.transitionEnable = true;
        InputUtil.bindButton(mw.Keys.G, this.enCodeBtn);
        this.enCodeBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.enCodeBtn.onClicked.add((() => {
            this.xuLieHua();
        }));
        this.addEffBtn.transitionEnable = true;
        this.addEffBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addEffBtn.fontColor = LinearColor.white;
        this.addEffBtn.setNormalImageColorDecimal(.2 * 170, .6 * 170, 1 * 170, 1 * 255);
        this.addEffBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let effNode = new EffNode;
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
        }));
        this.addAnimBtn.transitionEnable = true;
        this.addAnimBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addAnimBtn.fontColor = LinearColor.white;
        this.addAnimBtn.setNormalImageColorDecimal(.8 * 170, .2 * 170, .8 * 170, 1 * 255);
        this.addAnimBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let ANNODE = new AniNode;
            _UInode.tittleText.text = "动画节点";
            _UInode.text1.text = "动画GUID：";
            _UInode.text2.text = "播放耗时：";
            _UInode.text3.text = "播放进度：";
            _UInode.text4.text = "播放插槽：";
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
        }));
        this.addSoundBtn.transitionEnable = true;
        this.addSoundBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addSoundBtn.fontColor = LinearColor.white;
        this.addSoundBtn.setNormalImageColorDecimal(.2 * 170, .2 * 170, 1 * 170, 1 * 255);
        this.addSoundBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let SOUNDNODE = new SoundNode;
            _UInode.tittleText.text = "音效节点";
            _UInode.text1.text = "音效GUID：";
            _UInode.text2.text = "音量：";
            _UInode.text3.text = "无衰半径：";
            _UInode.text4.text = "衰减半径：";
            _UInode.text5.text = "停止秒数：";
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
        }));
        this.addWeiYiBtn.transitionEnable = true;
        this.addWeiYiBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addWeiYiBtn.fontColor = LinearColor.white;
        this.addWeiYiBtn.setNormalImageColorDecimal(.2 * 170, 1 * 170, .2 * 170, 1 * 255);
        this.addWeiYiBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let _WeiYiNode = new WeiYiNode;
            _UInode.tittleText.text = "位移节点";
            _UInode.text1.text = "水平距离：";
            _UInode.text2.text = "垂直距离：";
            _UInode.text3.text = "偏航角度：";
            _UInode.text4.text = "位移耗时：";
            _UInode.text5.text = "检测次数：";
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
        }));
        this.addYuanBtn.transitionEnable = true;
        this.addYuanBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addYuanBtn.fontColor = LinearColor.white;
        this.addYuanBtn.setNormalImageColorDecimal(.8 * 170, .2 * 170, .2 * 170, 1 * 255);
        this.addYuanBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let _yuanNode = new YuanNode;
            _UInode.tittleText.text = "球圆判定";
            _UInode.text1.text = "水平距离：";
            _UInode.text2.text = "偏航角度：";
            _UInode.text3.text = "垂直距离";
            _UInode.text4.text = "半径：";
            _UInode.text5.text = "圆柱高度：";
            _UInode.text6.text = "判定伤害：";
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
        }));
        this.addFangBtn.transitionEnable = true;
        this.addFangBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addFangBtn.fontColor = LinearColor.white;
        this.addFangBtn.setNormalImageColorDecimal(1 * 170, .4 * 170, .4 * 170, 1 * 255);
        this.addFangBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let _boxNode = new BoxNode;
            _UInode.tittleText.text = "方盒判定";
            _UInode.text1.text = "水平距离：";
            _UInode.text2.text = "偏航角度：";
            _UInode.text3.text = "俯仰角度：";
            _UInode.text4.text = "垂直距离：";
            _UInode.text5.text = "方盒长度：";
            _UInode.text6.text = "方盒宽度：";
            _UInode.text7.text = "方盒高度：";
            _UInode.text8.text = "判定伤害：";
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
        }));
        this.addEquipBtn.transitionEnable = true;
        this.addEquipBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addEquipBtn.fontColor = LinearColor.white;
        this.addEquipBtn.setNormalImageColorDecimal(1 * 170, .6 * 170, 0 * 170, 1 * 255);
        this.addEquipBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let BoxNode = new EquipNode;
            _UInode.tittleText.text = "装备节点";
            _UInode.text1.text = "模型GUID：";
            _UInode.text2.text = "相对位置：";
            _UInode.text3.text = "相对缩放：";
            _UInode.text4.text = "相对旋转：";
            _UInode.text5.text = "装备插槽：";
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
        }));
        this.addDelayBtn.transitionEnable = true;
        this.addDelayBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.addDelayBtn.fontColor = LinearColor.white;
        this.addDelayBtn.setNormalImageColorDecimal(.4 * 170, .6 * 170, .4 * 170, 1 * 255);
        this.addDelayBtn.onClicked.add((() => {
            let _UInode = mw.UIService.create(UINode);
            let _delayNode = new DelayNode;
            _UInode.tittleText.text = "延迟节点";
            _UInode.text1.text = "时长秒：";
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
        }));
        MyClearAct.instance.SkillLists.forEach((value => {
            if (value.skillName == "default") {
                this.downInput.text = value.skillJson;
                setTimeout((() => {
                    this.fanXuLieHua();
                }), 300);
            }
        }));
    }
}

class UINode extends mw.UIScript {
    constructor() {
        super(...arguments);
        this.BGP = undefined;
        this.tittleCanv = undefined;
        this.tittleText = undefined;
        this.playNowBtn = undefined;
        this.delteBtn = undefined;
        this.canv1 = undefined;
        this.text1 = undefined;
        this.input1 = undefined;
        this.canv2 = undefined;
        this.text2 = undefined;
        this.input2 = undefined;
        this.canv3 = undefined;
        this.text3 = undefined;
        this.input3 = undefined;
        this.canv4 = undefined;
        this.text4 = undefined;
        this.input4 = undefined;
        this.canv5 = undefined;
        this.text5 = undefined;
        this.input5 = undefined;
        this.canv6 = undefined;
        this.text6 = undefined;
        this.input6 = undefined;
        this.canv7 = undefined;
        this.text7 = undefined;
        this.input7 = undefined;
        this.canv8 = undefined;
        this.text8 = undefined;
        this.input8 = undefined;
        this.canv9 = undefined;
        this.leftMoveBtn = undefined;
        this.text9 = undefined;
        this.rightMoveBtn = undefined;
    }
    onAwake() {
        let size = WindowUtil.getViewportSize();
        let _margin = new mw.Margin(.1);
        let cavX = size.x / 7;
        let cavY = size.y / 3;
        let left_center = new mw.UIConstraintAnchors;
        left_center.constraintHorizontal = 0;
        left_center.constraintVertical = 3;
        this.rootCanvas.size = new Vector2(cavX, cavY);
        this.rootCanvas.clipEnable = true;
        this.layer = mw.UILayerSystem;
        this.BGP = mw.Image.newObject(this.rootCanvas);
        this.BGP.imageGuid = "142238";
        this.BGP.size = this.rootCanvas.size;
        this.tittleCanv = mw.Canvas.newObject(this.rootCanvas, "tittleCanv");
        this.tittleCanv.size = new Vector2(cavX, cavY / 11);
        this.tittleCanv.position = Vector2.zero.add(new Vector2(0, 4));
        this.tittleCanv.autoLayoutRule = new mw.UILayout(5, new mw.Margin(.02), mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.tittleCanv.zOrder += 1;
        this.tittleText = mw.TextBlock.newObject(this.rootCanvas, "tittleText");
        this.tittleText.size = new Vector2(.6 * cavX, 28);
        this.tittleText.constraints = left_center;
        this.tittleText.text = "特效节点";
        this.tittleCanv.addChild(this.tittleText);
        this.playNowBtn = mw.StaleButton.newObject(this.rootCanvas, "playNowBtn");
        this.playNowBtn.size = new Vector2(.15 * cavX, 28);
        this.playNowBtn.fontSize = 16;
        this.playNowBtn.text = "▶";
        this.tittleCanv.addChild(this.playNowBtn);
        this.delteBtn = mw.StaleButton.newObject(this.rootCanvas, "delteBtn");
        this.delteBtn.size = new Vector2(.15 * cavX, 28);
        this.delteBtn.fontSize = 16;
        this.delteBtn.text = "X";
        this.tittleCanv.addChild(this.delteBtn);
        this.canv1 = mw.Canvas.newObject(this.rootCanvas, "canv1");
        this.canv1.size = new Vector2(cavX, cavY / 11);
        this.canv1.position = Vector2.zero.add(new Vector2(4, 8 + 1 * cavY / 11));
        this.canv1.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv1.zOrder += 2;
        this.text1 = mw.TextBlock.newObject(this.rootCanvas, "text1");
        this.text1.size = new Vector2(.3 * cavX, 28);
        this.text1.fontSize = 16;
        this.text1.text = "特效GUID：";
        this.text1.textHorizontalLayout = 2;
        this.canv1.addChild(this.text1);
        this.input1 = mw.InputBox.newObject(this.rootCanvas, "input1");
        this.input1.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input1.fontSize = 12;
        this.input1.textLengthLimit = 999;
        this.input1.text = "这里输入guid";
        this.input1.textVerticalAlign = 2;
        this.canv1.addChild(this.input1);
        this.canv2 = mw.Canvas.newObject(this.rootCanvas, "canv2");
        this.canv2.size = new Vector2(cavX, cavY / 11);
        this.canv2.position = Vector2.zero.add(new Vector2(4, 8 + 2 * cavY / 11));
        this.canv2.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv2.zOrder += 2;
        this.text2 = mw.TextBlock.newObject(this.rootCanvas, "text2");
        this.text2.size = new Vector2(.3 * cavX, 28);
        this.text2.fontSize = 16;
        this.text2.text = "时间/次数：";
        this.text2.textHorizontalLayout = 2;
        this.canv2.addChild(this.text2);
        this.input2 = mw.InputBox.newObject(this.rootCanvas, "input2");
        this.input2.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input2.fontSize = 12;
        this.input2.textLengthLimit = 999;
        this.input2.text = "这里输时间或次数";
        this.input2.textVerticalAlign = 2;
        this.canv2.addChild(this.input2);
        this.canv3 = mw.Canvas.newObject(this.rootCanvas, "canv3");
        this.canv3.size = new Vector2(cavX, cavY / 11);
        this.canv3.position = Vector2.zero.add(new Vector2(4, 8 + 3 * cavY / 11));
        this.canv3.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv3.zOrder += 2;
        this.text3 = mw.TextBlock.newObject(this.rootCanvas, "text3");
        this.text3.size = new Vector2(.3 * cavX, 28);
        this.text3.fontSize = 16;
        this.text3.text = "水平距离：";
        this.text3.textHorizontalLayout = 2;
        this.canv3.addChild(this.text3);
        this.input3 = mw.InputBox.newObject(this.rootCanvas, "input3");
        this.input3.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input3.fontSize = 12;
        this.input3.textLengthLimit = 999;
        this.input3.text = "这里输入水平距离";
        this.input3.textVerticalAlign = 2;
        this.canv3.addChild(this.input3);
        this.canv4 = mw.Canvas.newObject(this.rootCanvas, "canv4");
        this.canv4.size = new Vector2(cavX, cavY / 11);
        this.canv4.position = Vector2.zero.add(new Vector2(4, 8 + 4 * cavY / 11));
        this.canv4.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv4.zOrder += 2;
        this.text4 = mw.TextBlock.newObject(this.rootCanvas, "text4");
        this.text4.size = new Vector2(.3 * cavX, 28);
        this.text4.fontSize = 16;
        this.text4.text = "垂直距离：";
        this.text4.textHorizontalLayout = 2;
        this.canv4.addChild(this.text4);
        this.input4 = mw.InputBox.newObject(this.rootCanvas, "input4");
        this.input4.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input4.fontSize = 12;
        this.input4.textLengthLimit = 999;
        this.input4.text = "这里输入垂直距离";
        this.input4.textVerticalAlign = 2;
        this.canv4.addChild(this.input4);
        this.canv5 = mw.Canvas.newObject(this.rootCanvas, "canv5");
        this.canv5.size = new Vector2(cavX, cavY / 11);
        this.canv5.position = Vector2.zero.add(new Vector2(4, 8 + 5 * cavY / 11));
        this.canv5.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv5.zOrder += 2;
        this.text5 = mw.TextBlock.newObject(this.rootCanvas, "text5");
        this.text5.size = new Vector2(.3 * cavX, 28);
        this.text5.fontSize = 16;
        this.text5.text = "偏航角度：";
        this.text5.textHorizontalLayout = 2;
        this.canv5.addChild(this.text5);
        this.input5 = mw.InputBox.newObject(this.rootCanvas, "input5");
        this.input5.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input5.fontSize = 12;
        this.input5.textLengthLimit = 999;
        this.input5.text = "这里输入偏航角度";
        this.input5.textVerticalAlign = 2;
        this.canv5.addChild(this.input5);
        this.canv6 = mw.Canvas.newObject(this.rootCanvas, "canv6");
        this.canv6.size = new Vector2(cavX, cavY / 11);
        this.canv6.position = Vector2.zero.add(new Vector2(4, 8 + 6 * cavY / 11));
        this.canv6.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv6.zOrder += 2;
        this.text6 = mw.TextBlock.newObject(this.rootCanvas, "text6");
        this.text6.size = new Vector2(.3 * cavX, 28);
        this.text6.fontSize = 16;
        this.text6.text = "特效缩放：";
        this.text6.textHorizontalLayout = 2;
        this.canv6.addChild(this.text6);
        this.input6 = mw.InputBox.newObject(this.rootCanvas, "input6");
        this.input6.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input6.fontSize = 12;
        this.input6.textLengthLimit = 999;
        this.input6.text = "这里输入特效缩放";
        this.input6.textVerticalAlign = 2;
        this.canv6.addChild(this.input6);
        this.canv7 = mw.Canvas.newObject(this.rootCanvas, "canv7");
        this.canv7.size = new Vector2(cavX, cavY / 11);
        this.canv7.position = Vector2.zero.add(new Vector2(4, 8 + 7 * cavY / 11));
        this.canv7.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv7.zOrder += 2;
        this.text7 = mw.TextBlock.newObject(this.rootCanvas, "text7");
        this.text7.size = new Vector2(.3 * cavX, 28);
        this.text7.fontSize = 16;
        this.text7.text = "特效旋转：";
        this.text7.textHorizontalLayout = 2;
        this.canv7.addChild(this.text7);
        this.input7 = mw.InputBox.newObject(this.rootCanvas, "input7");
        this.input7.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input7.fontSize = 12;
        this.input7.textLengthLimit = 999;
        this.input7.text = "这里输入特效旋转";
        this.input7.textVerticalAlign = 2;
        this.canv7.addChild(this.input7);
        this.canv8 = mw.Canvas.newObject(this.rootCanvas, "canv8");
        this.canv8.size = new Vector2(cavX, cavY / 11);
        this.canv8.position = Vector2.zero.add(new Vector2(4, 8 + 8 * cavY / 11));
        this.canv8.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv8.zOrder += 2;
        this.text8 = mw.TextBlock.newObject(this.rootCanvas, "text8");
        this.text8.size = new Vector2(.3 * cavX, 28);
        this.text8.fontSize = 16;
        this.text8.text = "特效插槽：";
        this.text8.textHorizontalLayout = 2;
        this.canv8.addChild(this.text8);
        this.input8 = mw.InputBox.newObject(this.rootCanvas, "input8");
        this.input8.size = new Vector2(.45 * cavX, .95 * cavY / 11);
        this.input8.fontSize = 12;
        this.input8.textLengthLimit = 999;
        this.input8.text = "这里输入特效插槽";
        this.input8.textVerticalAlign = 2;
        this.canv8.addChild(this.input8);
        this.canv9 = mw.Canvas.newObject(this.rootCanvas, "canv9");
        this.canv9.size = new Vector2(cavX, 1.5 * cavY / 11);
        this.canv9.position = Vector2.zero.add(new Vector2(4, 8 + 9 * cavY / 11));
        this.canv9.autoLayoutRule = new mw.UILayout(30, _margin, mw.UILayoutType.Horizontal, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.canv9.zOrder += 2;
        this.leftMoveBtn = mw.StaleButton.newObject(this.rootCanvas, "leftMoveBtn");
        this.leftMoveBtn.size = new Vector2(.2 * cavX, 28);
        this.leftMoveBtn.fontSize = 18;
        this.leftMoveBtn.text = "<";
        this.canv9.addChild(this.leftMoveBtn);
        this.text9 = mw.TextBlock.newObject(this.rootCanvas, "text9");
        this.text9.size = new Vector2(.25 * cavX, 28);
        this.text9.fontSize = 20;
        this.text9.text = "N";
        this.text9.textHorizontalLayout = 2;
        this.canv9.addChild(this.text9);
        this.rightMoveBtn = mw.StaleButton.newObject(this.rootCanvas, "rightMoveBtn");
        this.rightMoveBtn.size = new Vector2(.2 * cavX, 28);
        this.rightMoveBtn.fontSize = 18;
        this.rightMoveBtn.text = ">";
        this.canv9.addChild(this.rightMoveBtn);
        this.initBTN();
    }
    onDrop(InGeometry, InDragDropEvent, InOperation) {
        let targetUINODE = mw.findUIScript(MainUI.instance.targetUIWidget);
        if (targetUINODE != this) {
            insertNode(this, targetUINODE);
        } else {
            let orintext = MainUI.instance.downInput.text;
            MainUI.instance.xuLieHua();
            MainUI.instance.fanXuLieHua();
            MainUI.instance.downInput.text = orintext;
        }
    }
    onTouchStarted(InGeometry, InPointerEvent) {
        return this.detectDragIfPressed(InPointerEvent, mw.Keys.AnyKey);
    }
    onTouchEnded(InGeometry, InPointerEvent) {
        return mw.EventReply.handled;
    }
    onDragDetected(InGeometry, InPointerEvent) {
        MainUI.instance.targetUIWidget = this.uiWidgetBase;
        return this.newDragDrop(this.rootCanvas, "DragDropTag", null, mw.DragPivot.TopLeft, InPointerEvent.screenSpacePosition.clone().subtract(InGeometry.getAbsolutePosition().clone()).clone().divide(InGeometry.getAbsoluteSize().clone()).clone().multiply(-1));
    }
    initBTN() {
        this.delteBtn.transitionEnable = true;
        this.delteBtn.setPressedImageColorDecimal(200, 100, 100, 255);
        this.delteBtn.onClicked.add((() => {
            this.uiObject.destroyObject();
            Event.dispatchToLocal("onContentChange");
        }));
        this.playNowBtn.transitionEnable = true;
        this.playNowBtn.setPressedImageColorDecimal(0, 200, 0, 255);
        this.playNowBtn.onClicked.add((() => {
            let Attacker = Player.localPlayer;
            let NodeName = this.tittleText.text;
            if (NodeName == "特效节点") {
                let node = new EffNode;
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
                let node = new AniNode;
                node.guid = this.input1.text;
                node.totalTime = Number(this.input2.text);
                node.progress = Number(this.input3.text);
                node.AnimSlot = Number(this.input4.text);
                MyClearAct.instance.serverPlayAnimotion(Attacker, node.guid, node.totalTime, node.progress, node.AnimSlot);
            }
            if (NodeName == "音效节点") {
                let node = new SoundNode;
                node.guid = this.input1.text;
                node.volume = Number(this.input2.text);
                node.inner = Number(this.input3.text);
                node.outter = Number(this.input4.text);
                node.stopTime = Number(this.input5.text);
                MyClearAct.instance.serverPlay3DSound(Attacker, node.guid, node.volume, node.inner, node.outter, node.stopTime);
            }
            if (NodeName == "位移节点") {
                let node = new WeiYiNode;
                node.lenth = Number(this.input1.text);
                node.zOffset = Number(this.input2.text);
                node.yaw = Number(this.input3.text);
                node.time = Number(this.input4.text);
                node.checkCount = Number(this.input5.text);
                MyClearAct.instance.weiYi(Attacker, node.lenth, node.zOffset, node.yaw, node.time, node.checkCount);
            }
            if (NodeName == "球圆判定") {
                let node = new YuanNode;
                node.distance = Number(this.input1.text);
                node.yaw = Number(this.input2.text);
                node.zOffset = Number(this.input3.text);
                node.radius = Number(this.input4.text);
                node.height = Number(this.input5.text);
                node.damage = Number(this.input6.text);
                MyClearAct.instance.yuanPanding(Attacker, node.distance, node.yaw, node.zOffset, node.radius, node.height, node.damage, "未命名技能", Number(this.text9.text));
            }
            if (NodeName == "方盒判定") {
                let node = new BoxNode;
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
                let node = new EquipNode;
                node.guid = this.input1.text;
                node.location = stringToVector(this.input2.text);
                node.scale = stringToVector(this.input3.text);
                node.rotate = stringToRotation(this.input4.text);
                node.SlotType = Number(this.input5.text);
                MyClearAct.serverEquipMe(Attacker, node.guid, node.location, node.scale, node.rotate, node.SlotType);
            }
        }));
        this.leftMoveBtn.transitionEnable = true;
        this.leftMoveBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.leftMoveBtn.onClicked.add((() => {
            let myIndex = Number(this.text9.text);
            if (myIndex > 1) {
                let targetWidget = MainUI.instance.contentCanv.getChildAt(myIndex - 2);
                let targetNode = mw.findUIScript(targetWidget);
                exchange2Node(this, targetNode);
                MainUI.instance.onContentChange();
            }
        }));
        this.rightMoveBtn.transitionEnable = true;
        this.rightMoveBtn.setPressedImageColorDecimal(200, 200, 200, 255);
        this.rightMoveBtn.onClicked.add((() => {
            let myIndex = Number(this.text9.text);
            if (myIndex < MainUI.instance.contentCanv.getChildrenCount()) {
                let targetWidget = MainUI.instance.contentCanv.getChildAt(myIndex);
                let targetNode = mw.findUIScript(targetWidget);
                exchange2Node(this, targetNode);
            }
        }));
    }
}

function getXcountByName(name) {
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

function v3toString(v3) {
    let st = v3.x + "|" + v3.y + "|" + v3.z;
    return st;
}

function stringToRotation(st) {
    let parts = st.split("|").map(parseFloat);
    if (parts.length != 3 || parts.some(isNaN)) {
        return Rotation.zero;
    } else {
        return new Rotation(parts[0], parts[1], parts[2]);
    }
}

function stringToVector(st) {
    let parts = st.split("|").map(parseFloat);
    if (parts.length != 3 || parts.some(isNaN)) {
        return Vector.one;
    } else {
        return new Vector(parts[0], parts[1], parts[2]);
    }
}

function exchange2Node(n1, n2) {
    let nn = mw.UIService.create(UINode);
    nn.tittleText.text = n1.tittleText.text;
    nn.text1.text = n1.text1.text;
    nn.text2.text = n1.text2.text;
    nn.text3.text = n1.text3.text;
    nn.text4.text = n1.text4.text;
    nn.text5.text = n1.text5.text;
    nn.text6.text = n1.text6.text;
    nn.text7.text = n1.text7.text;
    nn.text8.text = n1.text8.text;
    nn.input1.text = n1.input1.text;
    nn.input2.text = n1.input2.text;
    nn.input3.text = n1.input3.text;
    nn.input4.text = n1.input4.text;
    nn.input5.text = n1.input5.text;
    nn.input6.text = n1.input6.text;
    nn.input7.text = n1.input7.text;
    nn.input8.text = n1.input8.text;
    n1.tittleText.text = n2.tittleText.text;
    n1.text1.text = n2.text1.text;
    n1.text2.text = n2.text2.text;
    n1.text3.text = n2.text3.text;
    n1.text4.text = n2.text4.text;
    n1.text5.text = n2.text5.text;
    n1.text6.text = n2.text6.text;
    n1.text7.text = n2.text7.text;
    n1.text8.text = n2.text8.text;
    n1.input1.text = n2.input1.text;
    n1.input2.text = n2.input2.text;
    n1.input3.text = n2.input3.text;
    n1.input4.text = n2.input4.text;
    n1.input5.text = n2.input5.text;
    n1.input6.text = n2.input6.text;
    n1.input7.text = n2.input7.text;
    n1.input8.text = n2.input8.text;
    n2.tittleText.text = nn.tittleText.text;
    n2.text1.text = nn.text1.text;
    n2.text2.text = nn.text2.text;
    n2.text3.text = nn.text3.text;
    n2.text4.text = nn.text4.text;
    n2.text5.text = nn.text5.text;
    n2.text6.text = nn.text6.text;
    n2.text7.text = nn.text7.text;
    n2.text8.text = nn.text8.text;
    n2.input1.text = nn.input1.text;
    n2.input2.text = nn.input2.text;
    n2.input3.text = nn.input3.text;
    n2.input4.text = nn.input4.text;
    n2.input5.text = nn.input5.text;
    n2.input6.text = nn.input6.text;
    n2.input7.text = nn.input7.text;
    n2.input8.text = nn.input8.text;
    nn.destroy();
    refreshNodeColor(n1);
    refreshNodeColor(n2);
    hideTextByXCount(n1);
    hideTextByXCount(n2);
}

function insertNode(n1, n2) {
    let num1 = Number(n1.text9.text);
    let num2 = Number(n2.text9.text);
    let tempCont = [];
    let insertOne = undefined;
    for (let index = 1; index <= MainUI.instance.contentCanv.getChildrenCount(); index++) {
        let child = MainUI.instance.contentCanv.getChildAt(index - 1);
        let childUINODE = mw.findUIScript(child);
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
    let xulie = [];
    tempCont.forEach((value => {
        let UINODE = mw.findUIScript(value);
        let NodeName = UINODE.tittleText.text;
        if (NodeName == "特效节点") {
            let node = new EffNode;
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
            let node = new AniNode;
            node.guid = UINODE.input1.text;
            node.totalTime = Number(UINODE.input2.text);
            node.progress = Number(UINODE.input3.text);
            node.AnimSlot = Number(UINODE.input4.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
        if (NodeName == "音效节点") {
            let node = new SoundNode;
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
            let node = new WeiYiNode;
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
            let node = new YuanNode;
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
            let node = new BoxNode;
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
            let node = new EquipNode;
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
            let node = new DelayNode;
            node.delayTime = Number(UINODE.input1.text);
            xulie.push(NodeName);
            let json = JSON.stringify(node);
            xulie.push(json);
        }
    }));
    let json2 = JSON.stringify(xulie);
    let orintext = MainUI.instance.downInput.text;
    MainUI.instance.downInput.text = json2;
    MainUI.instance.fanXuLieHua();
    MainUI.instance.downInput.text = orintext;
}

function hideTextByXCount(n, Xcount) {
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

function refreshNodeColor(UINODE) {
    let name = UINODE.tittleText.text;
    if (name == "特效节点") {
        UINODE.BGP.imageColor = new LinearColor(.2, .6, 1);
    }
    if (name == "动画节点") {
        UINODE.BGP.imageColor = new LinearColor(.8, .2, .8);
    }
    if (name == "音效节点") {
        UINODE.BGP.imageColor = new LinearColor(.2, .2, 1);
    }
    if (name == "位移节点") {
        UINODE.BGP.imageColor = new LinearColor(.2, 1, .2);
    }
    if (name == "球圆判定") {
        UINODE.BGP.imageColor = new LinearColor(.8, .2, .2);
    }
    if (name == "方盒判定") {
        UINODE.BGP.imageColor = new LinearColor(1, .4, .4);
    }
    if (name == "装备节点") {
        UINODE.BGP.imageColor = new LinearColor(1, .6, 0);
    }
    if (name == "延迟节点") {
        UINODE.BGP.imageColor = new LinearColor(.4, .6, .4);
    }
}

var foreign47 = Object.freeze({
    __proto__: null,
    get DongXiaoList() {
        return DongXiaoList;
    },
    default: MyClearAct$1
});

var PrefabEvent;

(function(PrefabEvent) {
    var _onEventNetKey = "PrefabEventNeyKey";
    var _onEventKey = "PrefabEvetKey";
    var _retrySetCustomDataList = [];
    function initEvent() {
        if (mwext["PrefabEvent"]) {
            return;
        }
        mwext["PrefabEvent"] = true;
        if (SystemUtil.isServer()) {
            DataStorage.setTemporaryStorage(mw.SystemUtil.isPIE);
            Event.addLocalListener("__setCustomDataCache", ((k, v) => {
                _retrySetCustomDataList.push({
                    key: k,
                    val: v
                });
            }));
            setInterval((() => {
                let keyMap = new Map;
                _retrySetCustomDataList.forEach((e => {
                    keyMap.set(e.key, e.val);
                }));
                _retrySetCustomDataList = [];
                keyMap.forEach(((v, k, maps) => {
                    _retrySetCustomDataList.push({
                        key: k,
                        val: v
                    });
                }));
                while (_retrySetCustomDataList.length > 0) {
                    let data = _retrySetCustomDataList.shift();
                    if (data) {
                        DataStorage.asyncSetData(data.key, data.val).then((res => {
                            if (res != mw.DataStorageResultCode.Success) {
                                _retrySetCustomDataList.push(data);
                            }
                        })).catch((err => {
                            _retrySetCustomDataList.push(data);
                        }));
                    }
                }
            }), 6500);
        }
        var call = (clazzName, funcName, ...params) => {
            if (!PrefabEvent[clazzName]) {
                Console.error("无效协议 : " + clazzName);
                return;
            }
            if (!PrefabEvent[clazzName][funcName]) {
                Console.error("无效协议 : " + clazzName + ":" + funcName);
                return;
            }
            Console.log("调用 : " + _onEventKey + ":" + clazzName + ":" + funcName);
            Event.dispatchToLocal(_onEventKey + ":" + clazzName + ":" + funcName, ...params);
        };
        if (mw.SystemUtil.isServer()) {
            Event.addClientListener(_onEventNetKey, ((player, clazzName, funcName, ...params) => {
                call(clazzName, funcName, ...params);
            }));
        }
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener(_onEventNetKey, ((clazzName, funcName, ...params) => {
                call(clazzName, funcName, ...params);
            }));
        }
    }
    function callClientFunc(clazzName, funcName, ...params) {
        Event.dispatchToLocal(_onEventKey + ":" + clazzName + ":" + funcName, ...params);
    }
    function callFunc(clazzName, funcName, ...params) {
        if (mw.SystemUtil.isClient()) {
            Event.dispatchToServer(_onEventNetKey, clazzName, funcName, ...params);
        }
        if (mw.SystemUtil.isServer()) {
            Event.dispatchToAllClient(_onEventNetKey, clazzName, funcName, ...params);
        }
        Event.dispatchToLocal(_onEventKey + ":" + clazzName + ":" + funcName, ...params);
    }
    function onFunc(clazzName, funcName, callback) {
        Console.log("注册 : " + _onEventKey + ":" + clazzName + ":" + funcName);
        return Event.addLocalListener(_onEventKey + ":" + clazzName + ":" + funcName, callback);
    }
    class DBSaveBase {}
    class DBServerTool {
        static getPlayerDataCache(playerId) {
            let dataCache = null;
            if (mwext["PrefabEventDataCache"]) {
                dataCache = mwext["PrefabEventDataCache"];
            } else {
                mwext["PrefabEventDataCache"] = {};
                dataCache = mwext["PrefabEventDataCache"];
            }
            if (!dataCache[playerId]) {
                dataCache[playerId] = {};
            }
            return dataCache[playerId];
        }
        static async asyncGetValue(playerId, key) {
            return new Promise(((resolve, reject) => {
                let playerDataCache = this.getPlayerDataCache(playerId);
                let dataKey = key + "_" + playerId + "_key";
                let dataVal = null;
                let keys = Object.keys(playerDataCache);
                keys.forEach(((v, i, arr) => {
                    if (v == dataKey) {
                        dataVal = playerDataCache[dataKey];
                    }
                }));
                if (dataVal) {
                    let res = null;
                    let db = dataVal;
                    if (!db) {
                        resolve(null);
                        return;
                    }
                    res = JSON.parse(db);
                    resolve(res.value);
                    return;
                }
                GeneralManager.asyncRpcGetData(dataKey).then((v => {
                    let res = null;
                    let db = v;
                    if (!db) {
                        resolve(null);
                    }
                    res = JSON.parse(db);
                    playerDataCache[dataKey] = db;
                    resolve(res.value);
                })).catch((err => {
                    Console.log(err);
                    reject("不存在这份存档，可能是新玩家");
                }));
            }));
        }
        static async asyncSetValue(playerId, key, val) {
            return new Promise(((resolve, reject) => {
                let data = new DBSaveBase;
                data.value = val;
                let dataStr = JSON.stringify(data);
                let playerDataCache = this.getPlayerDataCache(playerId);
                let dataKey = key + "_" + playerId + "_key";
                if (playerDataCache[dataKey] == dataStr) {
                    resolve();
                    return;
                }
                playerDataCache[dataKey] = dataStr;
                Event.dispatchToLocal("__setCustomDataCache", key + "_" + playerId + "_key", dataStr);
                resolve();
            }));
        }
    }
    PrefabEvent.DBServerTool = DBServerTool;
    (function(AttrType) {
        AttrType[AttrType["MaxHp"] = 0] = "MaxHp";
        AttrType[AttrType["MaxMp"] = 1] = "MaxMp";
        AttrType[AttrType["Attack"] = 2] = "Attack";
        AttrType[AttrType["Magic"] = 3] = "Magic";
        AttrType[AttrType["Def"] = 4] = "Def";
        AttrType[AttrType["MDef"] = 5] = "MDef";
        AttrType[AttrType["Speed"] = 6] = "Speed";
        AttrType[AttrType["Jump"] = 7] = "Jump";
        AttrType[AttrType["AttackSpeed"] = 8] = "AttackSpeed";
        AttrType[AttrType["AttackDistance"] = 9] = "AttackDistance";
    })(PrefabEvent.AttrType || (PrefabEvent.AttrType = {}));
    class PrefabEvtAttr {
        static addAttrVal(senderGuid, targetGuid, val, attrType) {
            callFunc(this.name, this.onAddAttrVal.name, senderGuid, targetGuid, val, attrType);
        }
        static onAddAttrVal(callback) {
            return onFunc(this.name, this.onAddAttrVal.name, callback);
        }
    }
    PrefabEvent.PrefabEvtAttr = PrefabEvtAttr;
    (function(EquipSlot) {
        EquipSlot[EquipSlot["Weapon"] = 1] = "Weapon";
    })(PrefabEvent.EquipSlot || (PrefabEvent.EquipSlot = {}));
    class PrefabEvtEquip {
        static equip(targetGuid, slot, equipGuid) {
            callFunc(this.name, this.onEquip.name, targetGuid, slot, equipGuid);
        }
        static onEquip(callback) {
            return onFunc(this.name, this.onEquip.name, callback);
        }
    }
    PrefabEvent.PrefabEvtEquip = PrefabEvtEquip;
    let PlayerInfoType;
    (function(PlayerInfoType) {
        PlayerInfoType[PlayerInfoType["Name"] = 0] = "Name";
        PlayerInfoType[PlayerInfoType["Level"] = 1] = "Level";
        PlayerInfoType[PlayerInfoType["Exp"] = 2] = "Exp";
        PlayerInfoType[PlayerInfoType["Gold"] = 3] = "Gold";
        PlayerInfoType[PlayerInfoType["Score"] = 4] = "Score";
        PlayerInfoType[PlayerInfoType["Stage"] = 5] = "Stage";
        PlayerInfoType[PlayerInfoType["Popularity"] = 6] = "Popularity";
    })(PlayerInfoType = PrefabEvent.PlayerInfoType || (PrefabEvent.PlayerInfoType = {}));
    class PrefabEvtPlayerInfo {
        static setPlayerInfo(senderGuid, targetGuid, val, infoType) {
            callFunc(this.name, this.onSetPlayerInfo.name, senderGuid, targetGuid, val, infoType);
        }
        static onSetPlayerInfo(callback) {
            return onFunc(this.name, this.onSetPlayerInfo.name, callback);
        }
        static addPlayerInfo(senderGuid, targetGuid, val, attrType) {
            callFunc(this.name, this.onAddPlayerInfo.name, senderGuid, targetGuid, val, PlayerInfoType);
        }
        static onAddPlayerInfo(callback) {
            return onFunc(this.name, this.onAddPlayerInfo.name, callback);
        }
        static setPlayerName(senderGuid, targetGuid, name) {
            callFunc(this.name, this.onSetPlayerName.name, senderGuid, targetGuid, name);
        }
        static onSetPlayerName(callback) {
            return onFunc(this.name, this.onSetPlayerName.name, callback);
        }
    }
    PrefabEvent.PrefabEvtPlayerInfo = PrefabEvtPlayerInfo;
    class PrefabEvtFight {
        static hit(senderGuid, targetGuid, damage, hitPoint) {
            callFunc(this.name, this.onHit.name, senderGuid, targetGuid, damage, hitPoint);
        }
        static onHit(callback) {
            return onFunc(this.name, this.onHit.name, callback);
        }
        static hurt(senderGuid, targetGuid, damage) {
            callFunc(this.name, this.onHurt.name, senderGuid, targetGuid, damage);
        }
        static onHurt(callback) {
            return onFunc(this.name, this.onHurt.name, callback);
        }
        static cure(senderGuid, targetGuid, cureVal) {
            callFunc(this.name, this.onCure.name, senderGuid, targetGuid, cureVal);
        }
        static onCure(callback) {
            return onFunc(this.name, this.onCure.name, callback);
        }
        static die(targetGuid) {
            callFunc(this.name, this.onDie.name, targetGuid);
        }
        static onDie(callback) {
            return onFunc(this.name, this.onDie.name, callback);
        }
        static revive(targetGuid) {
            callFunc(this.name, this.onRevive.name, targetGuid);
        }
        static onRevive(callback) {
            return onFunc(this.name, this.onRevive.name, callback);
        }
    }
    PrefabEvent.PrefabEvtFight = PrefabEvtFight;
    class PrefabEvtRecordPoint {
        static setRecordPoint(senderGuid, targetGuid, recordPointId) {
            callFunc(this.name, this.onSetRecordPoint.name, senderGuid, targetGuid, recordPointId);
        }
        static onSetRecordPoint(callback) {
            return onFunc(this.name, this.onSetRecordPoint.name, callback);
        }
        static backCurrentRecordPoint(senderGuid) {
            callFunc(this.name, this.onBackCurrentRecordPoint.name, senderGuid);
        }
        static onBackCurrentRecordPoint(callback) {
            return onFunc(this.name, this.onBackCurrentRecordPoint.name, callback);
        }
        static backRecordPoint(senderGuid, recordPointId) {
            callFunc(this.name, this.onBackRecordPoint.name, senderGuid, recordPointId);
        }
        static onBackRecordPoint(callback) {
            return onFunc(this.name, this.onBackRecordPoint.name, callback);
        }
    }
    PrefabEvent.PrefabEvtRecordPoint = PrefabEvtRecordPoint;
    class PrefabEvtNotify {
        static notifyLocal(text) {
            callClientFunc(this.name, this.onNotify.name, text);
        }
        static notify(text) {
            callFunc(this.name, this.onNotify.name, text);
        }
        static onNotify(callback) {
            return onFunc(this.name, this.onNotify.name, callback);
        }
    }
    PrefabEvent.PrefabEvtNotify = PrefabEvtNotify;
    class PrefabEvtRank {
        static openRank() {
            callClientFunc(this.name, this.onOpenRank.name);
        }
        static onOpenRank(callback) {
            return onFunc(this.name, this.onOpenRank.name, callback);
        }
        static setRankData(senderGuid, name, score, typeName) {
            callFunc(this.name, this.onSetRankData.name, senderGuid, name, score, typeName);
        }
        static onSetRankData(callback) {
            return onFunc(this.name, this.onSetRankData.name, callback);
        }
        static delRankData(senderGuid) {
            callFunc(this.name, this.onDelRankData.name, senderGuid);
        }
        static onDelRankData(callback) {
            return onFunc(this.name, this.onDelRankData.name, callback);
        }
    }
    PrefabEvent.PrefabEvtRank = PrefabEvtRank;
    class PrefabEvtCloth {
        static loadRole(senderGuid, targetGuid, dressResGuid) {
            callClientFunc(this.name, this.onLoadRole.name, senderGuid, targetGuid, dressResGuid);
        }
        static onLoadRole(callback) {
            return onFunc(this.name, this.onLoadRole.name, callback);
        }
        static loadCloth(senderGuid, targetGuid, dressResGuid) {
            callClientFunc(this.name, this.onLoadCloth.name, senderGuid, targetGuid, dressResGuid);
        }
        static onLoadCloth(callback) {
            return onFunc(this.name, this.onLoadCloth.name, callback);
        }
        static loadSlot(senderGuid, targetGuid, slotResGuid) {
            callClientFunc(this.name, this.onLoadSlot.name, senderGuid, targetGuid, slotResGuid);
        }
        static onLoadSlot(callback) {
            return onFunc(this.name, this.onLoadSlot.name, callback);
        }
    }
    PrefabEvent.PrefabEvtCloth = PrefabEvtCloth;
    function PrefabReport(reportId = null) {
        return function(target, propertyKey, descriptor) {
            const method = descriptor.value;
            descriptor.value = function(...args) {
                if (SystemUtil.isClient() && reportId) {
                    Console.log("模板", target.constructor.name, "埋点", reportId);
                    mw.RoomService.reportLogInfo("ts_action_firstdo", "模板埋点", JSON.stringify({
                        record: "TemplatePrefab",
                        lifetime: reportId
                    }));
                }
                const result = method.apply(this, args);
                return result;
            };
        };
    }
    PrefabEvent.PrefabReport = PrefabReport;
    class PrefabEvtCollection {
        static openCollectionUI() {
            callClientFunc(this.name, this.onOpenCollectionUI.name);
        }
        static onOpenCollectionUI(callback) {
            return onFunc(this.name, this.onOpenCollectionUI.name, callback);
        }
        static addCollection(atlasId, playerId) {
            callFunc(this.name, this.onAddCollection.name, atlasId, playerId);
        }
        static onAddCollection(callback) {
            return onFunc(this.name, this.onAddCollection.name, callback);
        }
    }
    PrefabEvent.PrefabEvtCollection = PrefabEvtCollection;
    initEvent();
})(PrefabEvent || (PrefabEvent = {}));

function PrefabReport(reportId = null) {
    return function(target, propertyKey, descriptor) {
        const method = descriptor.value;
        descriptor.value = function(...args) {
            if (SystemUtil.isClient() && reportId) {
                Console.log("模板", target.constructor.name, "埋点", reportId);
                mw.RoomService.reportLogInfo("ts_action_firstdo", "模板埋点", JSON.stringify({
                    record: "TemplatePrefab",
                    lifetime: reportId
                }));
            }
            const result = method.apply(this, args);
            return result;
        };
    };
}

var foreign66 = Object.freeze({
    __proto__: null,
    get PrefabEvent() {
        return PrefabEvent;
    },
    PrefabReport: PrefabReport
});

class PlayerData_CSR {
    constructor(id, name, kill) {
        this.userId = "";
        this.playerName = "";
        this.playerKill = 0;
        this.userId = id;
        this.playerName = name;
        this.playerKill = kill;
    }
}

class PlayerData_CSW {
    constructor(id, name, kill) {
        this.userId = "";
        this.playerName = "";
        this.playerKill = 0;
        this.userId = id;
        this.playerName = name;
        this.playerKill = kill;
    }
}

var foreign56 = Object.freeze({
    __proto__: null,
    PlayerData_CSR: PlayerData_CSR,
    PlayerData_CSW: PlayerData_CSW
});

class WorldRankModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        this.worldDatas = [];
        this.playerDataMap_SR = new Map;
        this.firstEffect = null;
    }
    onStart() {
        this.initData();
    }
    async initData() {
        this.worldDatas = await this.getCustomdata("WorldData");
    }
    onPlayerEnterGame(player) {}
    onPlayerLeft(player) {
        let userId = player.userId;
        if (!this.playerDataMap_SR.has(userId)) return;
        this.playerDataMap_SR.delete(userId);
        this.syncRankData_S(false);
    }
    getNamesByUserId(userId1, userId2) {
        if (this.playerDataMap_SR.has(userId1) && this.playerDataMap_SR.has(userId2)) {
            return [ this.playerDataMap_SR.get(userId1).playerName, this.playerDataMap_SR.get(userId2).playerName ];
        }
        return null;
    }
    getNameByUserId(userId) {
        if (this.playerDataMap_SR.has(userId)) {
            return this.playerDataMap_SR.get(userId).playerName;
        }
        return null;
    }
    net_onEnterScene(playerName, playerKill) {
        this.onEnterScene(playerName, playerKill);
    }
    async onEnterScene(playerName, playerKill) {
        let userId = this.currentPlayer.userId;
        let playerData_S = new PlayerData_CSR(userId, playerName, playerKill);
        this.playerDataMap_SR.set(userId, playerData_S);
        this.worldDatas = await this.getCustomdata("WorldData");
        this.syncRankData_S(true);
    }
    refreshKill_S(userId, kill) {
        this.refreshKill(userId, kill);
    }
    refreshKill(userId, kill) {
        if (!this.playerDataMap_SR.has(userId)) return;
        let playerData_S = this.playerDataMap_SR.get(userId);
        playerData_S.playerKill = kill;
        this.playerDataMap_SR.set(userId, playerData_S);
        this.syncRankData_S(this.isRefreshWorldData_S(new PlayerData_CSW(userId, playerData_S.playerName, playerData_S.playerKill)));
    }
    isRefreshWorldData_S(playerData_SW) {
        let isPush = false;
        let ishasDelete = false;
        let ishasData = false;
        if (this.worldDatas == null) {
            this.worldDatas = [];
        }
        if (this.worldDatas.length < 100) {
            if (this.worldDatas.length == 0) {
                this.worldDatas.push(playerData_SW);
                isPush = true;
            } else {
                for (let i = 0; i < this.worldDatas.length; ++i) {
                    if (this.worldDatas[i].userId != playerData_SW.userId) continue;
                    if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                        this.worldDatas.splice(i, 1);
                        break;
                    } else {
                        ishasData = true;
                        break;
                    }
                }
                if (ishasData) return isPush;
                for (let i = 0; i < this.worldDatas.length; i++) {
                    if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                        this.worldDatas.splice(i, 0, playerData_SW);
                        isPush = true;
                        break;
                    }
                }
                if (!isPush) {
                    this.worldDatas.push(playerData_SW);
                    isPush = true;
                }
            }
        } else {
            for (let i = 0; i < this.worldDatas.length; ++i) {
                if (this.worldDatas[i].userId != playerData_SW.userId) continue;
                if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                    this.worldDatas.splice(i, 1);
                    ishasDelete = true;
                    break;
                } else {
                    ishasData = true;
                    break;
                }
            }
            if (ishasData) return isPush;
            for (let i = 0; i < this.worldDatas.length; i++) {
                if (playerData_SW.playerKill > this.worldDatas[i].playerKill) {
                    this.worldDatas.splice(i, 0, playerData_SW);
                    if (!ishasDelete) {
                        this.worldDatas.pop();
                    }
                    isPush = true;
                    break;
                }
            }
        }
        if (isPush) {
            this.setCustomData("WorldData", this.worldDatas);
        }
        return isPush;
    }
    syncRankData_S(isRefreshWorldData) {
        if (this.playerDataMap_SR.size == 0) return;
        let playerUserIds = [];
        let playerNames = [];
        let playerKills = [];
        this.playerDataMap_SR.forEach(((value, key) => {
            playerUserIds.push(value.userId);
            playerNames.push(value.playerName);
            playerKills.push(value.playerKill);
        }));
        let worldUserIds = [];
        let worldNames = [];
        let worldKills = [];
        if (isRefreshWorldData && this.worldDatas != null) {
            for (let i = 0; i < this.worldDatas.length; i++) {
                worldUserIds.push(this.worldDatas[i].userId);
                worldNames.push(this.worldDatas[i].playerName);
                worldKills.push(this.worldDatas[i].playerKill);
            }
        }
        this.getAllClient().net_syncRankData_C(playerUserIds, playerNames, playerKills, isRefreshWorldData, worldUserIds, worldNames, worldKills);
    }
    async getCustomdata(key) {
        let data = null;
        data = await GeneralManager.asyncRpcGetData(key);
        return data;
    }
    async setCustomData(saveKey, dataInfo) {
        let code = null;
        code = await DataStorage.asyncSetData(saveKey, dataInfo);
        return code == mw.DataStorageResultCode.Success;
    }
    net_setFirst() {
        if (this.firstEffect) {
            EffectService.stop(this.firstEffect);
        }
        this.firstEffect = EffectService.playOnGameObject("31266", this.currentPlayer.character, {
            slotType: mw.HumanoidSlotType.Head,
            loopCount: 0,
            position: new mw.Vector(0, 0, 20),
            scale: mw.Vector.one.multiply(2)
        });
    }
}

__decorate([ Decorator.noReply() ], WorldRankModuleS.prototype, "net_onEnterScene", null);

__decorate([ Decorator.noReply() ], WorldRankModuleS.prototype, "net_setFirst", null);

var foreign59 = Object.freeze({
    __proto__: null,
    WorldRankModuleS: WorldRankModuleS
});

var MapEx;

(function(MapEx) {
    function isNull(map) {
        return !map || map == null || map == undefined;
    }
    MapEx.isNull = isNull;
    function get(map, key) {
        if (map[key]) {
            return map[key];
        }
        let has = false;
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }
        if (has) {
            return map[key];
        }
        return null;
    }
    MapEx.get = get;
    function set(map, key, val) {
        map[key] = val;
    }
    MapEx.set = set;
    function del(map, key) {
        if (map[key]) {
            delete map[key];
            return true;
        }
        let has = false;
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }
        if (has) {
            delete map[key];
            return true;
        }
        return false;
    }
    MapEx.del = del;
    function has(map, key) {
        if (map[key]) {
            return true;
        }
        let has = false;
        let keys = Object.keys(map);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] == key) {
                has = true;
                break;
            }
        }
        if (has) {
            return true;
        }
        return false;
    }
    MapEx.has = has;
    function count(map) {
        let res = 0;
        forEach(map, (e => {
            ++res;
        }));
        return res;
    }
    MapEx.count = count;
    function forEach(map, callback) {
        for (let key in map) {
            if (map[key]) {
                callback(key, map[key]);
            }
        }
    }
    MapEx.forEach = forEach;
    function copy(map) {
        let res = {};
        for (let key in map) {
            res[key] = map[key];
        }
        return res;
    }
    MapEx.copy = copy;
})(MapEx || (MapEx = {}));

var foreign68 = Object.freeze({
    __proto__: null,
    get MapEx() {
        return MapEx;
    }
});

var TaskItemType;

(function(TaskItemType) {
    TaskItemType[TaskItemType["None"] = 0] = "None";
    TaskItemType[TaskItemType["DailyLogin"] = 1] = "DailyLogin";
    TaskItemType[TaskItemType["DailyOnlineTime"] = 2] = "DailyOnlineTime";
    TaskItemType[TaskItemType["DailyKillPlayer"] = 3] = "DailyKillPlayer";
    TaskItemType[TaskItemType["DailyKillBoss"] = 4] = "DailyKillBoss";
    TaskItemType[TaskItemType["WeeklyLogin"] = 30] = "WeeklyLogin";
    TaskItemType[TaskItemType["WeeklyOnlineTime"] = 31] = "WeeklyOnlineTime";
    TaskItemType[TaskItemType["WeeklyKillPlayer"] = 32] = "WeeklyKillPlayer";
    TaskItemType[TaskItemType["WeeklyKillBoss"] = 33] = "WeeklyKillBoss";
})(TaskItemType || (TaskItemType = {}));

var TaskType;

(function(TaskType) {
    TaskType[TaskType["DailyTask"] = 1] = "DailyTask";
    TaskType[TaskType["WeeklyTask"] = 2] = "WeeklyTask";
})(TaskType || (TaskType = {}));

class Task {
    constructor(taskId, progress, isGetReward) {
        this.taskId = taskId;
        this.progress = progress;
        this.isGetReward = isGetReward;
    }
}

class TaskData extends Subdata {
    constructor() {
        super(...arguments);
        this.lastDayNow = 0;
        this.lastWeekNow = 0;
        this.dailyTasks = {};
        this.weeklyTasks = {};
    }
    initDefaultData() {
        this.dailyTasks = {};
        this.weeklyTasks = {};
        this.lastDayNow = Date.now();
        this.lastWeekNow = Number(Utils.getWhatDay());
    }
    saveDailyTask(taskId, vipTaskType, progress) {
        let dailyTask = null;
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            dailyTask = MapEx.get(this.dailyTasks, vipTaskType);
            dailyTask.progress = progress;
        } else {
            dailyTask = new Task(taskId, progress, false);
        }
        MapEx.set(this.dailyTasks, vipTaskType, dailyTask);
    }
    saveWeeklyTask(taskId, vipTaskType, progress) {
        let weeklyTask = null;
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            weeklyTask = MapEx.get(this.weeklyTasks, vipTaskType);
            weeklyTask.progress = progress;
        } else {
            weeklyTask = new Task(taskId, progress, false);
        }
        MapEx.set(this.weeklyTasks, vipTaskType, weeklyTask);
    }
    updateTaskCompleteData(vipTaskType) {
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            let dailyTask = MapEx.get(this.dailyTasks, vipTaskType);
            let nextId = GameConfig.Task.getElement(dailyTask.taskId).NextId;
            if (nextId != 0) {
                dailyTask.taskId = nextId;
                dailyTask.isGetReward = false;
            } else {
                dailyTask.isGetReward = true;
            }
            MapEx.set(this.dailyTasks, vipTaskType, dailyTask);
        }
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            let weeklyTask = MapEx.get(this.weeklyTasks, vipTaskType);
            let nextId = GameConfig.Task.getElement(weeklyTask.taskId).NextId;
            if (nextId != 0) {
                weeklyTask.taskId = nextId;
                weeklyTask.isGetReward = false;
            } else {
                weeklyTask.isGetReward = true;
            }
            MapEx.set(this.weeklyTasks, vipTaskType, weeklyTask);
        }
        this.save(true);
    }
    saveLastDayNow(lastDayNow, lastWeekNow) {
        this.lastDayNow = lastDayNow;
        this.lastWeekNow = lastWeekNow;
        this.save(true);
    }
    resetDailyTask() {
        this.dailyTasks = {};
        this.save(true);
        Console.error("重置每日任务");
    }
    resetWeeklyTask() {
        this.weeklyTasks = {};
        this.save(true);
        Console.error("重置每周任务");
    }
}

__decorate([ Decorator.persistence() ], TaskData.prototype, "lastDayNow", void 0);

__decorate([ Decorator.persistence() ], TaskData.prototype, "lastWeekNow", void 0);

__decorate([ Decorator.persistence() ], TaskData.prototype, "dailyTasks", void 0);

__decorate([ Decorator.persistence() ], TaskData.prototype, "weeklyTasks", void 0);

var foreign60 = Object.freeze({
    __proto__: null,
    Task: Task,
    TaskData: TaskData,
    get TaskItemType() {
        return TaskItemType;
    },
    get TaskType() {
        return TaskType;
    }
});

class TaskModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        this.playerTaskMap = new Map;
        this.taskCheckTime = 60;
        this.taskCheckTimer = 0;
    }
    onStart() {}
    onPlayerEnterGame(player) {
        this.playerTaskMap.set(player.playerId, player);
        this.checkResetTask_onEnterGame(player, 0);
        this.getClient(player).net_getServerTaskData((new Date).getTime());
    }
    onPlayerLeft(player) {
        let playerID = player.playerId;
        if (!this.playerTaskMap.has(playerID)) return;
        this.playerTaskMap.delete(playerID);
        DataCenterS.getData(player, TaskData).saveLastDayNow(Date.now(), Number(Utils.getWhatDay()));
    }
    onUpdate(dt) {
        this.checkResetTask_onLine(dt);
    }
    checkResetTask_onLine(dt) {
        this.taskCheckTimer += dt;
        if (this.taskCheckTimer < this.taskCheckTime) {
            return;
        }
        this.taskCheckTimer = 0;
        let currentTime = Utils.getCurrentTime();
        if (Utils.getWhatDay() == "1" && currentTime == Globaldata.weeklyRefreshTime) {
            this.resetAllPlayersWeeklyTask();
        }
        if (currentTime == Globaldata.dailyRefreshTime) {
            this.resetAllPlayersDailyTask();
        }
    }
    resetAllPlayersDailyTask() {
        this.playerTaskMap.forEach((player => {
            DataCenterS.getData(player, TaskData).resetDailyTask();
        }));
        this.getAllClient().net_resetDailyTask();
    }
    resetAllPlayersWeeklyTask() {
        this.playerTaskMap.forEach((player => {
            DataCenterS.getData(player, TaskData).resetWeeklyTask();
        }));
        this.getAllClient().net_resetWeeklyTask();
    }
    net_saveTaskProgress(dailyTaskIds, dailyTaskTypes, dailyProgresss, weeklyTaskIds, weeklyTaskTypes, weeklyProgresss) {
        if (dailyTaskIds.length != 0) {
            for (let i = 0; i < dailyTaskIds.length; ++i) {
                this.currentData.saveDailyTask(dailyTaskIds[i], dailyTaskTypes[i], dailyProgresss[i]);
            }
        }
        if (weeklyTaskIds.length != 0) {
            for (let i = 0; i < weeklyTaskIds.length; ++i) {
                this.currentData.saveWeeklyTask(weeklyTaskIds[i], weeklyTaskTypes[i], weeklyProgresss[i]);
            }
        }
        this.currentData.save(true);
    }
    net_updateTaskConpleteData(vipTaskType) {
        this.currentData.updateTaskCompleteData(vipTaskType);
    }
    checkResetTask_onEnterGame_GM(player, day) {
        this.checkResetTask_onEnterGame(player, day * 86400 * 1e3);
        this.getClient(player).net_getServerTaskData((new Date).getTime());
    }
    checkResetTask_onEnterGame(player, day) {
        let dailyRefreshTime = 0;
        let dailyRefreshTimeNums = Globaldata.dailyRefreshTime.split(":");
        dailyRefreshTime = Number(dailyRefreshTimeNums[0]) + Number((Number(dailyRefreshTimeNums[1]) / 60).toFixed(2));
        let weeklyRefreshTime = 0;
        let weeklyRefreshTimeNums = Globaldata.weeklyRefreshTime.split(":");
        weeklyRefreshTime = Number(weeklyRefreshTimeNums[0]) + Number((Number(weeklyRefreshTimeNums[1]) / 60).toFixed(2));
        let currentDayNow = Date.now() + day;
        let lastDayNow = DataCenterS.getData(player, TaskData).lastDayNow;
        let seconds = Math.floor((currentDayNow - lastDayNow) / 1e3);
        let lastDate = new Date(lastDayNow);
        let currentDate = new Date(currentDayNow);
        let lastDay = lastDate.getDay();
        let currentDay = currentDate.getDay();
        let lastHours = lastDate.getHours();
        let currentHours = currentDate.getHours();
        let lastMinutes = lastDate.getMinutes();
        let currentMinutes = currentDate.getMinutes();
        let lastSeconds = lastDate.getSeconds();
        let currentSeconds = currentDate.getSeconds();
        let lastSecondss = lastHours * 3600 + lastMinutes * 60 + lastSeconds;
        let currentSecondss = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
        if (seconds >= 86400) {
            DataCenterS.getData(player, TaskData).resetDailyTask();
        } else {
            if (lastDay == currentDay) {
                if (lastSecondss < dailyRefreshTime * 3600 && currentSecondss >= dailyRefreshTime * 3600) {
                    DataCenterS.getData(player, TaskData).resetDailyTask();
                }
            } else {
                if (lastSecondss >= 0 && lastSecondss < dailyRefreshTime * 3600 && currentSecondss >= 0 && currentSecondss < dailyRefreshTime * 3600 || lastSecondss >= dailyRefreshTime * 3600 && lastSecondss < 24 * 3600 && currentSecondss >= dailyRefreshTime * 3600 && currentSecondss < 24 * 3600) {
                    DataCenterS.getData(player, TaskData).resetDailyTask();
                }
            }
        }
        if (seconds >= 86400 * 7) {
            DataCenterS.getData(player, TaskData).resetWeeklyTask();
        } else {
            let latWhatDay = Utils.getLastDay(lastDay);
            let currentWhatDay = Utils.getWhatDay();
            if (Utils.iSameWeek(lastDayNow, currentDayNow)) {
                if (latWhatDay == "1" && lastSecondss < weeklyRefreshTime * 3600) {
                    if (currentWhatDay == "1" && currentSecondss >= weeklyRefreshTime * 3600 || currentWhatDay != "1") {
                        DataCenterS.getData(player, TaskData).resetWeeklyTask();
                    }
                }
            } else {
                if (latWhatDay == "1" && lastSecondss >= 0 && lastSecondss < weeklyRefreshTime * 3600 && currentWhatDay == "1" && currentSecondss >= 0 && currentSecondss < weeklyRefreshTime * 3600) {
                    DataCenterS.getData(player, TaskData).resetWeeklyTask();
                }
                if ((latWhatDay == "1" && lastSecondss >= weeklyRefreshTime * 3600 && lastSecondss < 24 * 3600 || latWhatDay != "1") && (currentWhatDay == "1" && currentSecondss >= weeklyRefreshTime * 3600 && currentSecondss < 24 * 3600 || currentWhatDay != "1")) {
                    DataCenterS.getData(player, TaskData).resetWeeklyTask();
                }
            }
        }
    }
    net_resetDailyTask() {
        this.currentData.resetDailyTask();
    }
    net_resetWeeklyTask() {
        this.currentData.resetWeeklyTask();
    }
    killPlayer(player, isBoss) {
        this.getClient(player).net_killPlayer(isBoss);
    }
}

__decorate([ Decorator.noReply() ], TaskModuleS.prototype, "net_saveTaskProgress", null);

__decorate([ Decorator.noReply() ], TaskModuleS.prototype, "net_updateTaskConpleteData", null);

var foreign62 = Object.freeze({
    __proto__: null,
    default: TaskModuleS
});

class PlayerData extends Subdata {
    constructor() {
        super(...arguments);
        this.coin = 0;
        this.diamond = 0;
        this.killCount = 0;
    }
    initDefaultData() {
        this.coin = 2e4;
        this.diamond = 0;
        this.killCount = 0;
    }
    setCoin(value) {
        this.coin += value;
        this.save(true);
    }
    setDiamond(value) {
        this.diamond += value;
        this.save(true);
    }
    setKillCount(value) {
        this.killCount += value;
        this.save(true);
    }
}

__decorate([ Decorator.persistence() ], PlayerData.prototype, "coin", void 0);

__decorate([ Decorator.persistence() ], PlayerData.prototype, "diamond", void 0);

__decorate([ Decorator.persistence() ], PlayerData.prototype, "killCount", void 0);

var foreign48 = Object.freeze({
    __proto__: null,
    PlayerData: PlayerData
});

class TeamData {
    constructor() {
        this.playerId = "";
        this.playerName = "";
    }
}

class PlayerModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        this.worldRankModuleS = null;
        this.taskModuleS = null;
        this.teamIdMap = new Map;
        this.playerDataSMap = new Map;
    }
    get getWorldRankModuleS() {
        if (this.worldRankModuleS == null) {
            this.worldRankModuleS = ModuleService.getModule(WorldRankModuleS);
        }
        return this.worldRankModuleS;
    }
    get getTaskModuleS() {
        if (this.taskModuleS == null) {
            this.taskModuleS = ModuleService.getModule(TaskModuleS);
        }
        return this.taskModuleS;
    }
    onAwake() {
        for (let i = 1; i <= 10; ++i) {
            this.teamIdMap.set(i, null);
        }
    }
    onStart() {
        this.bindEvent();
        this.bindPortalTrigger();
    }
    bindEvent() {
        PrefabEvent.PrefabEvtFight.onHit(this.playerAtkPlayer.bind(this));
    }
    onPlayerEnterGame(player) {
        this.setPlayerDataS(player);
    }
    net_onEnterScene(playerName) {
        this.currentPlayer.character.displayName = playerName;
        let playerId = this.currentPlayer.character.gameObjectId;
        if (Helper.playerMap.has(playerId)) return;
        Helper.playerMap.set(playerId, this.currentPlayer);
        if (Helper.teamMap.has(playerId)) return;
        let teamId = this.getOneNullTeamId();
        Helper.teamMap.set(playerId, teamId);
        if (!this.teamIdMap.has(teamId)) return;
        let teamData = new TeamData;
        teamData.playerId = playerId;
        teamData.playerName = playerName;
        if (this.teamIdMap.get(teamId)) {
            this.teamIdMap.get(teamId).push(teamData);
        } else {
            this.teamIdMap.set(teamId, [ teamData ]);
        }
        this.getAllClient().net_syncOneTeamData(teamId, playerId, playerName);
        this.syncTeamData(this.currentPlayer);
    }
    syncTeamData(player) {
        let playerIds = [];
        let playerNames = [];
        let teamIds = [];
        this.teamIdMap.forEach(((teamDatas, teamId) => {
            if (!teamDatas) return;
            teamDatas.forEach((teamData => {
                playerIds.push(teamData.playerId);
                playerNames.push(teamData.playerName);
                teamIds.push(teamId);
            }));
        }));
        if (playerIds.length == 0) return;
        this.getClient(player).net_syncTeamData(playerIds, playerNames, teamIds);
    }
    onPlayerLeft(player) {
        let playerId = player.character.gameObjectId;
        if (!Helper.playerMap.has(playerId)) return;
        Helper.playerMap.delete(playerId);
        if (!Helper.teamMap.has(playerId)) return;
        let teamId = Helper.teamMap.get(playerId);
        Helper.teamMap.delete(playerId);
        this.deleteTeamIdMapData(teamId, playerId);
    }
    deleteTeamIdMapData(teamId, playerId) {
        let teamDatas = this.teamIdMap.get(teamId);
        if (!teamDatas) return;
        for (let i = 0; i < teamDatas.length; ++i) {
            if (teamDatas[i].playerId == playerId) {
                teamDatas.splice(i, 1);
                break;
            }
        }
        if (teamDatas.length == 0) teamDatas = null;
        this.teamIdMap.set(teamId, teamDatas);
        this.getAllClient().net_deleteTeamIdMapData(teamId, playerId);
    }
    getOneNullTeamId() {
        let teamId = -1;
        for (let i = 1; i <= Globaldata.teamCount; ++i) {
            if (!this.teamIdMap.get(i)) {
                teamId = i;
                break;
            }
        }
        if (teamId == -1) {
            for (let i = 1; i <= Globaldata.teamCount; ++i) {
                if (this.teamIdMap.get(i).length == 1) {
                    teamId = i;
                    break;
                }
            }
        }
        return teamId;
    }
    net_isCanChangeTeam(curTeam, toTeam) {
        let teamDatas = this.teamIdMap.get(toTeam);
        if (!teamDatas || teamDatas.length < 2) {
            let playerId = this.currentPlayer.character.gameObjectId;
            let teamData = this.getTeamData(curTeam, playerId);
            if (!teamData) return false;
            if (!teamDatas) teamDatas = [];
            teamDatas.push(teamData);
            this.teamIdMap.set(toTeam, teamDatas);
            Helper.teamMap.set(playerId, toTeam);
            this.getAllClient().net_changeTeam(playerId, curTeam, toTeam);
            return true;
        }
        return false;
    }
    getTeamData(teamId, playerId) {
        let teamData = null;
        let teamDatas = this.teamIdMap.get(teamId);
        if (!teamDatas) return teamData;
        for (let i = 0; i < teamDatas.length; ++i) {
            if (teamDatas[i].playerId == playerId) {
                teamData = teamDatas[i];
                teamDatas.splice(i, 1);
                if (teamDatas.length == 0) teamDatas = null;
                this.teamIdMap.set(teamId, teamDatas);
                return teamData;
            }
        }
    }
    net_enemyAtkPlayer(gameObjectIds, atk) {
        this.enemyAtkPlayer(gameObjectIds, atk);
    }
    enemyAtkPlayer(gameObjectIds, atk) {
        if (gameObjectIds == null || gameObjectIds == undefined || gameObjectIds.length == 0) return;
        gameObjectIds.forEach((gameObjectId => {
            if (!Helper.playerMap.has(gameObjectId)) return;
            let player = Helper.playerMap.get(gameObjectId);
            if (player == null || player == undefined) return;
            this.updatePlayerData(null, player, atk, null);
        }));
        Console.error("Enemy Atk Player。\ngameObjectId:" + gameObjectIds + "。\natk:" + atk + "。");
    }
    playerAtkPlayerBySkill(senderGuid, targetGuid, damage, hitPoint) {
        this.playerAtkPlayer(senderGuid, targetGuid, damage, hitPoint);
    }
    playerAtkPlayer(senderGuid, targetGuid, damage, hitPoint) {
        if (Helper.playerMap.has(senderGuid) && Helper.playerMap.has(targetGuid) && Helper.teamMap.has(targetGuid) && Helper.teamMap.has(senderGuid)) {
            let sender = Helper.playerMap.get(senderGuid);
            let targeter = Helper.playerMap.get(targetGuid);
            if (Helper.teamMap.get(senderGuid) != Helper.teamMap.get(targetGuid)) {
                if (!hitPoint) hitPoint = targeter.character.worldTransform.position;
                this.updatePlayerData(sender, targeter, damage, hitPoint);
            } else {
                this.getClient(sender).net_hitTeammate();
            }
        }
    }
    setPlayerDataS(player) {
        let playerDataS = new PlayerDataS;
        playerDataS.maxHp = 100;
        playerDataS.hp = 100;
        playerDataS.isDie = true;
        this.playerDataSMap.set(player.playerId, playerDataS);
    }
    updatePlayerData(sendPlayer, targetPlayer, damage, hitPoint) {
        let playerId = targetPlayer.playerId;
        if (!this.playerDataSMap.has(playerId)) return;
        let targetPlayerData = this.playerDataSMap.get(playerId);
        if (targetPlayerData.isDie) return;
        let curHp = targetPlayerData.hp;
        curHp -= damage;
        if (curHp <= 0) {
            targetPlayerData.hp = 0;
            targetPlayerData.isDie = true;
            if (sendPlayer) this.playerKillEnemy(sendPlayer, 1, true);
            targetPlayer.character.ragdollEnabled = true;
            this.playerDie(targetPlayer);
            if (sendPlayer && targetPlayer) {
                let userId1 = sendPlayer.userId;
                let userId2 = targetPlayer.userId;
                let names = this.getWorldRankModuleS.getNamesByUserId(userId1, userId2);
                if (names) this.getAllClient().net_killTip(userId1, names[0], userId2, names[1]);
            }
            TimeUtil.delaySecond(3).then((() => {
                targetPlayer.character.ragdollEnabled = false;
                targetPlayerData.hp = targetPlayerData.maxHp;
                this.playerBirth(targetPlayer, targetPlayerData.maxHp);
            }));
        } else {
            targetPlayerData.hp = curHp;
        }
        this.getClient(targetPlayer).net_updateHp(curHp);
        if (sendPlayer) this.getClient(sendPlayer).net_flyText(damage, hitPoint);
    }
    playerKillEnemy(sendPlayer, killCount, isPlayer) {
        let playerData = DataCenterS.getData(sendPlayer, PlayerData);
        playerData.setKillCount(killCount);
        let coin = 50;
        if (killCount > 1) coin = 300;
        playerData.setCoin(coin);
        this.getClient(sendPlayer).net_updateKillCountUI(playerData.killCount, playerData.coin);
        this.getWorldRankModuleS.refreshKill_S(sendPlayer.userId, playerData.killCount);
        this.getTaskModuleS.killPlayer(sendPlayer, killCount > 1);
        if (!isPlayer) this.getAllClient().net_killTip(sendPlayer.userId, this.getWorldRankModuleS.getNameByUserId(sendPlayer.userId), "-1", killCount > 1 ? "感染者" : Utils.getRoleName());
        try {
            if (this.playerDataSMap.get(sendPlayer.playerId).isDie == true) this.playerDataSMap.get(sendPlayer.playerId).isDie = false;
        } catch (error) {}
    }
    playerAtkEnemyFlyText(sendPlayer, hitPoint, damage) {
        if (sendPlayer) this.getClient(sendPlayer).net_flyText(damage, hitPoint);
    }
    playerDie(player) {
        EffectService.playAtPosition("222147", player.character.worldTransform.position, {
            loopCount: 1
        });
    }
    playerBirth(player, maxHp) {
        this.getClient(player).net_updateHp(maxHp);
        let birthLoc = Utils.getWorldLocation();
        player.character.worldTransform.position = birthLoc;
        let loc = new mw.Vector(birthLoc.x, birthLoc.y, birthLoc.z - player.character.collisionExtent.z / 2);
        EffectService.playAtPosition("142750", loc, {
            loopCount: 1
        });
    }
    async bindPortalTrigger() {
        let trigger = await mw.GameObject.asyncFindGameObjectById("08F825C5");
        trigger.onEnter.add((char => {
            if (Helper.playerMap.has(char.gameObjectId)) this.portal(Helper.playerMap.get(char.gameObjectId));
        }));
    }
    portal(player) {
        TimeUtil.delaySecond(2).then((() => {
            if (this.playerDataSMap.has(player.playerId)) this.playerDataSMap.get(player.playerId).isDie = false;
        }));
        let playerId = player.character.gameObjectId;
        let index = Helper.teamMap.has(playerId) ? Helper.teamMap.get(playerId) - 1 : 0;
        Console.error("index = " + index);
        let birthLoc = Utils.locs[index];
        player.character.worldTransform.position = birthLoc;
        let loc = new mw.Vector(birthLoc.x, birthLoc.y, birthLoc.z - player.character.collisionExtent.z / 2);
        EffectService.playAtPosition("142750", loc, {
            loopCount: 1
        });
        this.getClient(player).net_showInvincibleTimeUI();
    }
    net_setCoin(value) {
        this.currentData.setCoin(value);
    }
    net_setDiamond(value) {
        this.currentData.setDiamond(value);
    }
}

__decorate([ Decorator.noReply() ], PlayerModuleS.prototype, "net_onEnterScene", null);

__decorate([ Decorator.noReply() ], PlayerModuleS.prototype, "net_enemyAtkPlayer", null);

__decorate([ Decorator.noReply() ], PlayerModuleS.prototype, "net_setCoin", null);

__decorate([ Decorator.noReply() ], PlayerModuleS.prototype, "net_setDiamond", null);

class PlayerDataS {
    constructor() {
        this.isDie = true;
        this.maxHp = 0;
        this.hp = 0;
    }
}

var foreign50 = Object.freeze({
    __proto__: null,
    PlayerDataS: PlayerDataS,
    PlayerModuleS: PlayerModuleS,
    TeamData: TeamData
});

class ATKModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudPanel = null;
        this.onAtkAction = new Action;
        this.onChangeSkillAction = new Action1;
        this.skill = null;
    }
    onStart() {
        this.initDatas();
        this.bindAction();
        let i = 1;
        InputUtil.onKeyDown(mw.Keys.G, (() => {
            this.onChangeSkillAction.call(i);
            i++;
            if (i > GameConfig.Skill.getAllElement().length) i = 1;
        }));
    }
    initDatas() {
        this.hudPanel = UIService.getUI(HUDPanel);
        GameConfig.Skill.getAllElement().forEach((value => {
            MyClearAct$1.instance.SkillLists.push(new DongXiaoList(value.SkillName, value.SkillJson));
        }));
    }
    bindAction() {
        this.onChangeSkillAction.add((skillId => {
            this.skill = GameConfig.Skill.getElement(skillId);
            this.hudPanel.updateAtkCD(this.skill.SkillCD, this.skill.SkillDes);
        }));
        this.onAtkAction.add((() => {
            this.localPlayer.character.movementEnabled = false;
            MyClearAct$1.actNow(this.localPlayer, this.skill.SkillName);
            TimeUtil.delaySecond(this.skill.SkillCD).then((() => {
                this.localPlayer.character.movementEnabled = true;
                if (this.skill.IsHasWeapon) MyClearAct$1.serverDetachAllEquip(this.localPlayer);
            }));
        }));
    }
}

class ATKModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        this.playerModuleS = null;
    }
    onStart() {
        this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        MyClearAct$1.ServerDamageChar.push(((AttackerID, VictimID, damage) => {
            Console.error(AttackerID, VictimID, damage);
            this.playerModuleS.playerAtkPlayerBySkill(AttackerID, VictimID, damage, null);
        }));
    }
}

var foreign39 = Object.freeze({
    __proto__: null,
    ATKModuleC: ATKModuleC,
    ATKModuleS: ATKModuleS
});

let KillTipItem_Generate = class KillTipItem_Generate extends UIScript {
    get mBgImage() {
        if (!this.mBgImage_Internal && this.uiWidgetBase) {
            this.mBgImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mBgImage");
        }
        return this.mBgImage_Internal;
    }
    get mMainCanvas() {
        if (!this.mMainCanvas_Internal && this.uiWidgetBase) {
            this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas");
        }
        return this.mMainCanvas_Internal;
    }
    get mKillerTextBlock() {
        if (!this.mKillerTextBlock_Internal && this.uiWidgetBase) {
            this.mKillerTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas/KillerCanvas/mKillerTextBlock");
        }
        return this.mKillerTextBlock_Internal;
    }
    get mKilledTextBlock() {
        if (!this.mKilledTextBlock_Internal && this.uiWidgetBase) {
            this.mKilledTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas/KilledCanvas/mKilledTextBlock");
        }
        return this.mKilledTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.mKillerTextBlock);
        this.initLanguage(this.mKilledTextBlock);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mMainCanvas/KillCanvas/KillTextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

KillTipItem_Generate = __decorate([ UIBind("UI/HUD/KillTipItem.ui") ], KillTipItem_Generate);

var KillTipItem_Generate$1 = KillTipItem_Generate;

var foreign81 = Object.freeze({
    __proto__: null,
    default: KillTipItem_Generate$1
});

class KillTipItem extends KillTipItem_Generate$1 {
    onAwake() {}
    setInfo(killTipDatas) {
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
        }
        if (this.uiObject.visibility != mw.SlateVisibility.SelfHitTestInvisible) {
            this.uiObject.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        setTimeout((() => {
            this.mBgImage.size = new mw.Vector2(this.mMainCanvas.size.x + 20, this.mMainCanvas.size.y);
        }), 1);
    }
}

var foreign44 = Object.freeze({
    __proto__: null,
    KillTipItem: KillTipItem
});

class HUDPanel extends HUDPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.atkModuleC = null;
        this.hudModuleC = null;
        this.hideKillTipIntervalId = null;
        this.killTipItems = [];
        this.killTipDatas = [];
        this.taskRedPointTween1 = null;
        this.taskRedPointTween2 = null;
        this.countDownInterval = null;
        this.countDown = 3;
        this.maxAtkCD = 5;
        this.flickerTextTween1 = null;
        this.flickerTextTween2 = null;
        this.killTipsTimeOutId1 = null;
        this.killTipsTimeOutId2 = null;
    }
    onStart() {
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.initDatas();
        this.bindButtons();
        this.initKillTipItems();
    }
    initDatas() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.atkModuleC = ModuleService.getModule(ATKModuleC);
        this.initTaskTween();
        this.mRedPointImage.visibility = mw.SlateVisibility.Collapsed;
        this.mDieCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.initFlickerText();
        this.mKillTipCountCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mKillTipTextBlock3.visibility = mw.SlateVisibility.Collapsed;
    }
    bindButtons() {
        this.mAddCoinButton.onClicked.add((() => {
            this.hudModuleC.onAddCoinAction.call();
        }));
        this.mAddDiamondButton.onClicked.add((() => {
            this.hudModuleC.onAddDiamondAction.call();
        }));
        this.mTeamButton.onClicked.add((() => {
            this.hudModuleC.onOpenTeamAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.mGunButton.onClicked.add((() => {
            this.hudModuleC.onOpenGunAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.mRoleButton.onClicked.add((() => {
            this.hudModuleC.onOpenRoleAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.mLoginButton.onClicked.add((() => {
            this.hudModuleC.onOpenLoginAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.mRankButton.onClicked.add((() => {
            this.hudModuleC.onOpenRankAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.mLotteryButton.onClicked.add((() => {
            this.hudModuleC.onOpenLotteryAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.mTaskButton.onClicked.add((() => {
            this.hudModuleC.onOpenTaskAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        this.bindSetButton();
        this.bindATKButton();
        this.mClothButton.onClicked.add((async () => {
            await AvatarEditorService.asyncOpenAvatarEditorModule();
            this.mVirtualJoystickPanel.resetJoyStick();
        }));
        mw.AvatarEditorService.avatarServiceDelegate.add(this.addAvatarServiceDelegate.bind(this));
    }
    addAvatarServiceDelegate(eventName, ...params) {
        console.error(`eventName: ${eventName}`);
        switch (eventName) {
          case "AE_OnQuit":
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            break;

          case "AE_OnOpen":
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            break;
        }
    }
    initKillTipItems() {
        for (let i = 0; i < 4; ++i) {
            let killTipItem = UIService.create(KillTipItem);
            killTipItem.uiObject.position = new mw.Vector2(0, 37 * i);
            killTipItem.uiObject.visibility = mw.SlateVisibility.Collapsed;
            this.mKillTipCanvas.addChild(killTipItem.uiObject);
            this.killTipItems.push(killTipItem);
        }
    }
    killTip(killTipType, killerName, killedName) {
        let killTipData = new KillTipData;
        killTipData.killTipType = killTipType;
        killTipData.killerName = killerName;
        killTipData.killedName = killedName;
        if (this.killTipDatas.length >= 4) {
            this.killTipDatas.shift();
        }
        this.killTipDatas.push(killTipData);
        this.updateKillTipItems();
        this.clearHideKillTipIntervalId();
        this.hideKillTipIntervalId = TimeUtil.setInterval((() => {
            if (this.killTipDatas && this.killTipDatas.length > 0) {
                this.killTipDatas.shift();
                this.updateKillTipItems();
            } else {
                this.clearHideKillTipIntervalId();
            }
        }), 5);
    }
    clearHideKillTipIntervalId() {
        if (this.hideKillTipIntervalId) {
            TimeUtil.clearInterval(this.hideKillTipIntervalId);
            this.hideKillTipIntervalId = null;
        }
    }
    updateKillTipItems() {
        for (let i = 0; i < this.killTipDatas.length; ++i) {
            this.killTipItems[i].setInfo(this.killTipDatas[i]);
        }
        for (let i = this.killTipDatas.length; i < 4; ++i) {
            if (this.killTipItems[i].uiObject.visibility != mw.SlateVisibility.Collapsed) {
                this.killTipItems[i].uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
        }
    }
    startTaskRedPointTween() {
        if (this.taskRedPointTween1) {
            this.taskRedPointTween1.start();
        } else {
            this.initTaskTween();
            this.taskRedPointTween1.start();
        }
        this.mRedPointImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }
    stopTaskRedPointTween() {
        if (this.taskRedPointTween1) {
            this.taskRedPointTween1.stop();
        }
        if (this.taskRedPointTween2) {
            this.taskRedPointTween2.stop();
        }
        this.mRedPointImage.visibility = mw.SlateVisibility.Collapsed;
    }
    initTaskTween() {
        this.taskRedPointTween1 = new mw.Tween({
            value: .8
        }).to({
            value: 1.2
        }, .2 * 1e3).onStart((() => {
            this.mRedPointImage.renderScale = mw.Vector2.one.multiply(.8);
        })).onUpdate((v => {
            this.mRedPointImage.renderScale = mw.Vector2.one.multiply(v.value);
        })).onComplete((() => {
            this.taskRedPointTween2.start();
        })).easing(cubicBezier(.25, .1, .25, 1));
        this.taskRedPointTween2 = new mw.Tween({
            value: 1.2
        }).to({
            value: .8
        }, .2 * 1e3).onStart((() => {
            this.mRedPointImage.renderScale = mw.Vector2.one.multiply(1.2);
        })).onUpdate((v => {
            this.mRedPointImage.renderScale = mw.Vector2.one.multiply(v.value);
        })).onComplete((() => {
            this.taskRedPointTween1.start();
        })).easing(cubicBezier(.25, .1, .25, 1));
    }
    startCountDown() {
        this.mVirtualJoystickPanel.resetJoyStick();
        this.mDieCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.countDown = 3;
        this.mCountDownTextBlock.text = this.countDown-- + "";
        this.clearCountDownInterval();
        this.countDownInterval = TimeUtil.setInterval((() => {
            this.mCountDownTextBlock.text = this.countDown-- + "";
            if (this.countDown < 0) this.clearCountDownInterval();
        }), 1);
    }
    clearCountDownInterval() {
        if (this.countDownInterval) {
            TimeUtil.clearInterval(this.countDownInterval);
            this.countDownInterval = null;
        }
    }
    endCountDown() {
        this.mDieCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.clearCountDownInterval();
    }
    initSetData(fireScale, controlScale, bgmVolume) {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.mFireProgressBar.currentValue = fireScale;
        this.mControlProgressBar.currentValue = controlScale;
        this.mBgmProgressBar.currentValue = bgmVolume;
        this.mTouchPad.inputScale = new mw.Vector2(controlScale, controlScale);
        this.mSetCanvas.visibility = mw.SlateVisibility.Collapsed;
    }
    bindSetButton() {
        this.mSetButton.onClicked.add((() => {
            if (this.mSetCanvas.visibility == mw.SlateVisibility.SelfHitTestInvisible) return;
            this.mSetCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }));
        this.mSetCloseButton.onClicked.add((() => {
            if (this.mSetCanvas.visibility == mw.SlateVisibility.Collapsed) return;
            this.mSetCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.hudModuleC.saveSetData();
        }));
        this.mFireProgressBar.onSliderValueChanged.add((value => {
            this.hudModuleC.onFireScaleAction.call(value);
        }));
        this.mControlProgressBar.onSliderValueChanged.add((value => {
            this.hudModuleC.onControlScaleAction.call(value);
            this.mTouchPad.inputScale = new mw.Vector2(value, value);
        }));
        this.mBgmProgressBar.onSliderValueChanged.add((value => {
            this.hudModuleC.onBgmVolumeAction.call(value);
        }));
    }
    bindATKButton() {
        this.mMaskButton.clickedDelegate.add((() => {
            this.atkModuleC.onAtkAction.call();
            let tmpCD = this.maxAtkCD;
            new mw.Tween({
                x: 0
            }).to({
                x: 1
            }, this.maxAtkCD * 1e3).onStart((() => {
                this.mMaskButton.enable = false;
                this.mMaskButton.fanShapedValue = 0;
                this.mCDTextBlock.text = tmpCD.toFixed(1);
            })).onUpdate((v => {
                this.mMaskButton.fanShapedValue = v.x;
                this.mCDTextBlock.text = (tmpCD - v.x * tmpCD).toFixed(1);
            })).onComplete((() => {
                this.mMaskButton.fanShapedValue = 1;
                this.mMaskButton.enable = true;
                this.mCDTextBlock.text = "";
            })).start();
        }));
    }
    updateAtkCD(cd, skillName) {
        this.maxAtkCD = cd;
        this.mMaskButton.fanShapedValue = 1;
        this.mMaskButton.enable = true;
        this.mCDTextBlock.text = "";
        this.mSkillNameTextBlock.text = skillName;
    }
    showInvincibleTimeUI(invincibleTime) {
        new mw.Tween({
            x: 0
        }).to({
            x: 1
        }, invincibleTime * 1e3).onStart((() => {
            this.setCanvasVisibility(this.mInvincibleCanvas, mw.SlateVisibility.SelfHitTestInvisible);
            this.mInvincibleProgressBar.currentValue = 0;
            this.startFlickerText();
        })).onUpdate((v => {
            this.mInvincibleProgressBar.currentValue = v.x;
        })).onComplete((() => {
            this.setCanvasVisibility(this.mInvincibleCanvas, mw.SlateVisibility.Collapsed);
            this.stopFlickerText();
        })).start();
    }
    setCanvasVisibility(canvas, visibility) {
        if (canvas.visibility != visibility) canvas.visibility = visibility;
    }
    initFlickerText() {
        this.setCanvasVisibility(this.mInvincibleCanvas, mw.SlateVisibility.Collapsed);
        this.flickerTextTween1 = new mw.Tween({
            x: 1
        }).to({
            x: 0
        }, .4 * 1e3).onStart((() => {
            this.mInvincibleTextBlock.renderOpacity = 1;
        })).onUpdate((v => {
            this.mInvincibleTextBlock.renderOpacity = v.x;
        })).onComplete((() => {
            this.flickerTextTween2.start();
        }));
        this.flickerTextTween2 = new mw.Tween({
            x: 0
        }).to({
            x: 1
        }, .4 * 1e3).onStart((() => {
            this.mInvincibleTextBlock.renderOpacity = 0;
        })).onUpdate((v => {
            this.mInvincibleTextBlock.renderOpacity = v.x;
        })).onComplete((() => {
            this.flickerTextTween1.start();
        }));
    }
    startFlickerText() {
        if (this.flickerTextTween1) this.flickerTextTween1.start();
    }
    stopFlickerText() {
        if (this.flickerTextTween1) this.flickerTextTween1.stop();
        if (this.flickerTextTween2) this.flickerTextTween2.stop();
    }
    showKillTips1(killTips, killerName, killedName) {
        Notice.showDownNotice("<color=#lime>" + "<size=18>" + killerName + " 击杀了 " + killedName + "</size>" + "</color>" + "\n" + "<color=#red>完成了" + killTips + "</color>");
    }
    clearKillTipsTimeOutId1() {
        if (this.killTipsTimeOutId1) {
            clearTimeout(this.killTipsTimeOutId1);
            this.killTipsTimeOutId1 = null;
        }
    }
    showKillTips2(killerName, killedName, killTipType) {
        if (killTipType == KillTipType.None) return;
        this.clearKillTipsTimeOutId2();
        if (killTipType == KillTipType.Killed) {
            this.mKillTipTextBlock3.text = "你已被 " + killerName + " 击杀";
        } else if (killTipType == KillTipType.revenge) {
            this.mKillTipTextBlock3.text = "击杀 " + killedName + " 完成复仇";
        }
        this.mKillTipTextBlock3.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.killTipsTimeOutId2 = setTimeout((() => {
            this.mKillTipTextBlock3.visibility = mw.SlateVisibility.Collapsed;
            this.clearKillTipsTimeOutId2();
        }), 3 * 1e3);
    }
    clearKillTipsTimeOutId2() {
        if (this.killTipsTimeOutId2) {
            clearTimeout(this.killTipsTimeOutId2);
            this.killTipsTimeOutId2 = null;
        }
    }
}

var foreign43 = Object.freeze({
    __proto__: null,
    default: HUDPanel
});

class SpawnManager {
    static replicateGuid(guid) {
        let res = guid;
        if (this.replicateDic.has(guid)) {
            res = this.replicateDic.get(guid);
        } else if (this.deleteDic.has(guid)) {
            Console.error("-------", guid, "------- is deleted!");
        }
        return res;
    }
    static modifyPoolSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.spawn(assetId);
        }
        return GameObjPool.spawn(assetId, type);
    }
    static modifyPoolAsyncSpawn(guid, type) {
        let assetId = this.replicateGuid(guid);
        if (type == undefined) {
            return GameObjPool.asyncSpawn(assetId);
        }
        return GameObjPool.asyncSpawn(assetId, type);
    }
    static wornSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.spawn(info);
    }
    static wornAsyncSpawn(assetId, inReplicates, transform) {
        let info = {
            guid: assetId,
            replicates: inReplicates,
            transform: transform
        };
        return this.asyncSpawn(info);
    }
    static spawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.spawn(guid, {
            replicates: info.replicates,
            transform: info.transform
        });
        return obj;
    }
    static asyncSpawn(info) {
        let assetId = info.gameObjectId ? info.gameObjectId : info.guid;
        let guid = this.replicateGuid(assetId);
        let obj = mw.GameObject.asyncSpawn(guid, {
            replicates: info.replicates,
            transform: info.transform
        });
        return obj;
    }
}

SpawnManager.replicateDic = new Map([ [ "104", "Sound" ], [ "109", "SpawnLocation" ], [ "113", "Trigger" ], [ "116", "Interactor" ], [ "117", "BlockingVolume" ], [ "4301", "PointLight" ], [ "4306", "Effect" ], [ "20191", "PhysicsThruster" ], [ "20193", "NavigationVolume" ], [ "21151", "PostProcess" ], [ "108547", "ObjectLauncher" ], [ "119918", "IntegratedMover" ], [ "12683", "SwimmingVolume" ], [ "16037", "UIWidget" ], [ "16038", "WheeledVehicle4W" ], [ "20504", "PhysicsFulcrum" ], [ "20194", "NavModifierVolume" ], [ "20638", "HotWeapon" ], [ "25782", "Anchor" ], [ "67455", "PhysicsImpulse" ], [ "NPC", "Character" ], [ "31969", "Character" ], [ "124744", "Character" ], [ "28449", "Character" ], [ "BlockingArea", "BlockingVolume" ], [ "RelativeEffect", "Effect" ], [ "Thruster", "PhysicsThruster" ], [ "NavMeshVolume", "NavigationVolume" ], [ "PostProcessAdvance", "PostProcess" ], [ "ProjectileLauncher", "ObjectLauncher" ], [ "PhysicsSports", "IntegratedMover" ] ]);

SpawnManager.deleteDic = new Map([ [ "110", true ], [ "8444", true ], [ "14090", true ], [ "14971", true ], [ "2695", true ], [ "30829", true ], [ "31479", true ], [ "14197", true ] ]);

var foreign22 = Object.freeze({
    __proto__: null,
    SpawnManager: SpawnManager
});

class GunModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudModuleC = null;
        this.playerModuleC = null;
        this.gunPanel = null;
        this.adTipsPanel = null;
        this.gunAnchor = null;
        this.cameraAnchor = null;
        this.gunEffect = null;
        this.onSwitchCameraAction = new Action1;
        this.gunIds = [];
        this.currentGunId = 0;
        this.currentGunGo = null;
    }
    onStart() {
        this.initData();
        this.bindActions();
    }
    initData() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
    }
    bindActions() {
        let isOpen = false;
        InputUtil.onKeyDown(mw.Keys.One, (() => {
            isOpen = !isOpen;
            isOpen ? this.openGunPanel() : this.closeGunPanel();
        }));
        let isOpenFly = false;
        InputUtil.onKeyDown(mw.Keys.Two, (() => {
            isOpenFly = !isOpenFly;
            isOpenFly ? this.localPlayer.character.switchToFlying() : this.localPlayer.character.switchToWalking();
        }));
        this.hudModuleC.onOpenGunAction.add((() => {
            this.openGunPanel();
        }));
    }
    openGunPanel() {
        Event.dispatchToLocal("IsOpenUI", false);
        this.gunPanel.show();
        this.onSwitchCameraAction.call(1);
    }
    closeGunPanel() {
        Event.dispatchToLocal("IsOpenUI", true);
        this.gunPanel.hide();
        this.onSwitchCameraAction.call(0);
    }
    onEnterScene(sceneType) {
        this.findGunAnchor();
    }
    async findGunAnchor() {
        this.gunPanel = mw.UIService.getUI(GunPanel);
        this.gunIds = this.data.gunIds;
        this.currentGunId = this.data.currentGunId;
        this.gunAnchor = await GameObject.asyncFindGameObjectById("19BF5A36");
        this.cameraAnchor = await GameObject.asyncFindGameObjectById("072B5519");
        this.gunEffect = await GameObject.asyncFindGameObjectById("1B50DFAB");
        this.gunPanel.initGunPanel(this.gunIds, this.currentGunId);
        this.gunAnchor.localTransform.rotation = new mw.Rotation(0, 0, -180);
        this.playerSwitchGun(this.currentGunId);
        let myCamera = Camera.currentCamera;
        let gunCamera = await GameObject.asyncSpawn("Camera", {
            replicates: false,
            transform: new mw.Transform(this.cameraAnchor.worldTransform.position, this.cameraAnchor.worldTransform.rotation, mw.Vector.one)
        });
        this.onSwitchCameraAction.add((cameraType => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(gunCamera, .5, mw.CameraSwitchBlendFunction.Linear);
            }
        }));
    }
    lottery(gunId) {
        this.gunPanel.updateSelectGun(gunId);
        this.buyGun(gunId, false);
    }
    getGunIds() {
        return this.gunIds;
    }
    buyGunOnComplete() {
        this.gunEffect.stop();
        this.gunPanel.buyGunOnComplete(this.gunIds);
    }
    buyGun(gunId, isDirectUse) {
        if (this.gunIds.includes(gunId)) return;
        this.gunIds.push(gunId);
        if (isDirectUse) this.setCurrentGunId(gunId);
        this.buyGunOnComplete();
        if (GameConfig.Gun.getElement(gunId).GunType == 2) return;
        this.server.net_buyGun(gunId);
    }
    isBuyGunByCoin(gunId, isDirectUse) {
        if (this.gunIds.includes(gunId)) {
            Console.error("已经购买过该枪支");
            Notice.showDownNotice("已经购买过该枪支");
            return true;
        }
        let gunElement = GameConfig.Gun.getElement(gunId);
        if (this.playerModuleC.getCoin() >= gunElement.Price[1]) {
            this.playerModuleC.setCoin(-gunElement.Price[1]);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyGun(gunId, isDirectUse);
            return true;
        } else {
            Console.error("金币不足");
            Notice.showDownNotice("金币不足");
            this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            return false;
        }
    }
    isBuyGunByDiamond(gunId, isDirectUse) {
        if (this.gunIds.includes(gunId)) {
            Console.error("已经购买过该枪支");
            Notice.showDownNotice("已经购买过该枪支");
            return true;
        }
        let gunElement = GameConfig.Gun.getElement(gunId);
        if (this.playerModuleC.getDiamond() >= gunElement.Price[0]) {
            this.playerModuleC.setDiamond(-gunElement.Price[0]);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyGun(gunId, isDirectUse);
            return true;
        } else {
            Console.error("钻石不足");
            Notice.showDownNotice("钻石不足");
            this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            return false;
        }
    }
    switchGun(gunId) {
        if (!this.gunIds.includes(gunId)) {
            Console.error("没有该枪支");
            Notice.showDownNotice("没有该枪支");
            this.gunEffect.play();
        } else {
            this.gunEffect.stop();
        }
        this.spawnGun(gunId);
    }
    async spawnGun(gunId) {
        if (this.currentGunGo) {
            mwext.GameObjPool.despawn(this.currentGunGo);
            this.currentGunGo = null;
        }
        let gunElement = GameConfig.Gun.getElement(gunId);
        let gunGo = await SpawnManager.modifyPoolAsyncSpawn(gunElement.GunIcon_M);
        if (!gunGo) return;
        if (gunId == 14) gunGo.setMaterial("55588");
        if (gunId == 11) gunGo.resetMaterial();
        gunGo.parent = this.gunAnchor;
        gunGo.localTransform.position = gunElement.GunLoc;
        gunGo.localTransform.rotation = new mw.Rotation(0, 10, 0);
        gunGo.localTransform.scale = gunElement.GunScale;
        this.currentGunGo = gunGo;
    }
    setCurrentGunId(gunId) {
        if (!this.gunIds.includes(gunId)) {
            Console.error("没有该枪支");
            Notice.showDownNotice("没有该枪支");
            return;
        }
        if (this.currentGunId == gunId) return;
        this.currentGunId = gunId;
        Notice.showDownNotice("切换成功");
        this.server.net_setCurrentGunId(gunId);
    }
    playerSwitchGun(gunId) {
        this.server.net_playerSwitchGun(gunId);
    }
    addRoatation(dir) {
        if (this.gunAnchor) {
            this.gunAnchor.worldTransform.rotation = this.gunAnchor.worldTransform.rotation.add(new mw.Rotation(0, 0, -20 * dir));
        }
    }
}

var foreign33 = Object.freeze({
    __proto__: null,
    GunModuleC: GunModuleC
});

let BuyGunPanel_Generate = class BuyGunPanel_Generate extends UIScript {
    get mIconImage() {
        if (!this.mIconImage_Internal && this.uiWidgetBase) {
            this.mIconImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mIconImage");
        }
        return this.mIconImage_Internal;
    }
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mDiamondCanvas() {
        if (!this.mDiamondCanvas_Internal && this.uiWidgetBase) {
            this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mDiamondCanvas");
        }
        return this.mDiamondCanvas_Internal;
    }
    get mDiamondButton() {
        if (!this.mDiamondButton_Internal && this.uiWidgetBase) {
            this.mDiamondButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mDiamondCanvas/mDiamondButton");
        }
        return this.mDiamondButton_Internal;
    }
    get mDiamondTextBlock() {
        if (!this.mDiamondTextBlock_Internal && this.uiWidgetBase) {
            this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mDiamondCanvas/mDiamondTextBlock");
        }
        return this.mDiamondTextBlock_Internal;
    }
    get mCoinCanvas() {
        if (!this.mCoinCanvas_Internal && this.uiWidgetBase) {
            this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCoinCanvas");
        }
        return this.mCoinCanvas_Internal;
    }
    get mCoinButton() {
        if (!this.mCoinButton_Internal && this.uiWidgetBase) {
            this.mCoinButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCoinCanvas/mCoinButton");
        }
        return this.mCoinButton_Internal;
    }
    get mCoinTextBlock() {
        if (!this.mCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCoinCanvas/mCoinTextBlock");
        }
        return this.mCoinTextBlock_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mDiamondButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mDiamondButton");
        }));
        this.mDiamondButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCoinButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCoinButton");
        }));
        this.mCoinButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mDiamondTextBlock);
        this.initLanguage(this.mCoinTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

BuyGunPanel_Generate = __decorate([ UIBind("UI/Gun/BuyGunPanel.ui") ], BuyGunPanel_Generate);

var BuyGunPanel_Generate$1 = BuyGunPanel_Generate;

var foreign76 = Object.freeze({
    __proto__: null,
    default: BuyGunPanel_Generate$1
});

class BuyGunPanel extends BuyGunPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.gunModuleC = null;
        this.gunId = 0;
        this.isDirectUse = false;
    }
    onStart() {
        this.layer = mw.UILayerTop;
        this.initData();
        this.bindButtons();
    }
    initData() {
        this.gunModuleC = ModuleService.getModule(GunModuleC);
    }
    bindButtons() {
        this.mCloseButton.onClicked.add((() => {
            this.hide();
        }));
        this.mDiamondButton.onClicked.add((() => {
            if (this.gunModuleC.isBuyGunByDiamond(this.gunId, this.isDirectUse)) this.hide();
        }));
        this.mCoinButton.onClicked.add((() => {
            if (this.gunModuleC.isBuyGunByCoin(this.gunId, this.isDirectUse)) this.hide();
        }));
    }
    showAndInitData(gunId, isDirectUse) {
        this.gunId = gunId;
        this.isDirectUse = isDirectUse;
        let gunElement = GameConfig.Gun.getElement(this.gunId);
        mw.assetIDChangeIconUrlRequest([ gunElement.GunIcon_M ]).then((() => {
            try {
                this.mIconImage.setImageByAssetIconData(mw.getAssetIconDataByAssetID(gunElement.GunIcon_M));
            } catch (error) {
                Console.error("showAndInitData:" + error);
            }
        }));
        let price = gunElement.Price;
        let gunType = gunElement.GunType;
        let gunTypeStr = "";
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
    onShow(...params) {}
    onHide() {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
}

var foreign37 = Object.freeze({
    __proto__: null,
    BuyGunPanel: BuyGunPanel
});

class GunItem extends GunItem_Generate$1 {
    constructor() {
        super(...arguments);
        this.gunPanel = null;
        this.gunId = 0;
        this.isHas = false;
        this.icon = "";
        this.name = "";
        this.gunType = 0;
        this.isTurnICON = false;
    }
    onStart() {
        this.initData();
        this.bindButton();
    }
    initData() {
        this.gunPanel = mw.UIService.getUI(GunPanel);
        this.mSelectImage.visibility = mw.SlateVisibility.Collapsed;
    }
    bindButton() {
        this.mButton.onClicked.add((() => {
            this.gunPanel.updateSelectGun(this.gunId);
        }));
        this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
    }
    setData(isHas, gunElement) {
        this.isHas = isHas;
        this.gunId = gunElement.ID;
        this.icon = gunElement.GunIcon_M;
        this.name = gunElement.GunName;
        this.gunType = gunElement.GunType;
        this.isTurnICON = gunElement.IsTurnICON == 1 ? true : false;
        this.updateUI();
    }
    updateUI() {
        mw.assetIDChangeIconUrlRequest([ this.icon ]).then((() => {
            try {
                this.mIconImage.setImageByAssetIconData(mw.getAssetIconDataByAssetID(this.icon));
            } catch (error) {
                Console.error("updateUI:" + error);
            }
        }));
        this.mLockTextBlock.visibility = this.isHas ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.SelfHitTestInvisible;
        this.mNameTextBlock.text = this.name;
        this.mTypeTextBlock.text = this.gunType == 2 ? "限时" : "永久";
    }
    select() {
        this.mSelectImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }
    unselect() {
        this.mSelectImage.visibility = mw.SlateVisibility.Collapsed;
    }
}

class GunPanel extends GunPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.gunModuleC = null;
        this.hudModuleC = null;
        this.buyGunPanel = null;
        this.hudPanel = null;
        this.gunItmeMap = new Map;
        this.gunIds = [];
        this.currentGunId = 0;
        this.moveId = -1;
        this.moveVec = [];
        this.dir = 0;
        this.onMoveTouchEvent = (widget, event, x, y, inPointerEvent) => {
            if (this.movePos) {
                if (event == Enums.TouchEvent.DOWN) {
                    if (this.moveId < 0) {
                        this.moveId = inPointerEvent.pointerIndex;
                        this.moveVec[0] = x;
                        this.moveVec[1] = y;
                    }
                } else if (event == Enums.TouchEvent.MOVE) {
                    if (this.moveId >= 0) {
                        let xoffset = x - this.moveVec[0];
                        let yoffset = y - this.moveVec[1];
                        this.dir = 0;
                        if (Math.abs(xoffset) > Math.abs(yoffset)) {
                            this.dir = Math.floor(xoffset);
                        }
                        this.moveVec[0] = x;
                        this.moveVec[1] = y;
                    }
                } else if (event == Enums.TouchEvent.UP) {
                    if (this.moveId >= 0) {
                        this.moveId = -1;
                        this.dir = 0;
                    }
                }
            }
        };
    }
    onStart() {
        this.initDatas();
        this.bindButtons();
    }
    initDatas() {
        this.gunModuleC = ModuleService.getModule(GunModuleC);
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.buyGunPanel = mw.UIService.getUI(BuyGunPanel);
        this.hudPanel = mw.UIService.getUI(HUDPanel);
        this.moveVec = [];
        mw.TimeUtil.delayExecute((() => {
            this.movePos = this.mTouchImage.position.multiply(1);
        }), 3);
    }
    bindButtons() {
        this.mCloseButton.onClicked.add((() => {
            this.gunModuleC.closeGunPanel();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
        }));
        this.mBuyButton.onClicked.add(this.bindBuyButton.bind(this));
        this.mAddCoinButton.onClicked.add((() => {
            this.hudModuleC.onAddCoinAction.call();
        }));
        this.mAddDiamondButton.onClicked.add((() => {
            this.hudModuleC.onAddDiamondAction.call();
        }));
    }
    bindBuyButton() {
        if (this.gunIds.includes(this.currentGunId)) {
            this.gunModuleC.closeGunPanel();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
        } else {
            this.buyGunPanel.showAndInitData(this.currentGunId, false);
        }
    }
    initGunPanel(gunIds, currentGunId) {
        this.gunIds = gunIds;
        let gunElements = GameConfig.Gun.getAllElement();
        for (let i = 0; i < gunElements.length; ++i) {
            let gunElement = gunElements[i];
            let gunItem = mw.UIService.create(GunItem);
            let isHas = this.gunIds.includes(gunElement.ID);
            gunItem.setData(isHas, gunElement);
            this.mContentCanvas.addChild(gunItem.uiWidgetBase);
            this.gunItmeMap.set(gunElement.ID, gunItem);
        }
        this.updateSelectGun(currentGunId);
    }
    updateSelectGun(gunId) {
        if (gunId == this.currentGunId) return;
        if (this.currentGunId != 0) this.gunItmeMap.get(this.currentGunId).unselect();
        this.currentGunId = gunId;
        this.gunItmeMap.get(this.currentGunId).select();
        this.gunModuleC.switchGun(this.currentGunId);
        let gunElement = GameConfig.Gun.getElement(this.currentGunId);
        if (this.gunIds.includes(this.currentGunId)) {
            this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.mBuyTextBlock.text = "使用";
        } else {
            this.mDiamondCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mBuyTextBlock.text = "购买";
            if (gunElement.Price[1] == -1) {
                this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
            } else {
                this.mCoinCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mCoinTextBlock.text = gunElement.Price[1].toString();
            }
            this.mDiamondTextBlock.text = gunElement.Price[0].toString();
        }
        this.mFireIntervalTextBlock.text = "射击间隔：" + gunElement.FireInterval;
        this.mBulletCountTextBlock.text = "子弹数量：" + gunElement.BulletCount + "*无限";
        this.mHurtTextBlock.text = "伤害：" + gunElement.Hurt.toString();
    }
    pickUpGun(gunId) {
        this.hudPanel.mVirtualJoystickPanel.resetJoyStick();
        this.updateSelectGun(gunId);
        if (this.gunIds.includes(gunId)) {
            this.gunModuleC.setCurrentGunId(gunId);
        } else {
            this.buyGunPanel.showAndInitData(gunId, true);
        }
    }
    hideAndSetCurrentGunId(gunId) {
        this.gunModuleC.setCurrentGunId(gunId);
        this.buyGunPanel.hide();
    }
    onShow(...params) {
        this.canUpdate = true;
        TouchScript.instance.addScreenListener(this.mTouchImage, this.onMoveTouchEvent.bind(this), false);
    }
    onHide() {
        this.canUpdate = false;
        this.gunModuleC.setCurrentGunId(this.currentGunId);
        TouchScript.instance.removeScreenListener(this.mTouchImage);
    }
    buyGunOnComplete(gunIds) {
        this.gunIds = gunIds;
        this.mDiamondCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mCoinCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mBuyTextBlock.text = "使用";
        this.gunItmeMap.get(this.currentGunId).mLockTextBlock.visibility = mw.SlateVisibility.Collapsed;
    }
    onUpdate(dt) {
        if (this.dir != 0) {
            this.gunModuleC.addRoatation(this.dir * dt);
            this.dir = 0;
        }
    }
    onTouchStarted(inGemory, inPointerEvent) {
        return TouchScript.instance.onTouchStarted(inGemory, inPointerEvent);
    }
    onTouchMoved(inGemory, inPointerEvent) {
        return TouchScript.instance.onTouchMoved(inGemory, inPointerEvent);
    }
    onTouchEnded(inGemory, inPointerEvent) {
        return TouchScript.instance.onTouchEnded(inGemory, inPointerEvent);
    }
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
}

var foreign38 = Object.freeze({
    __proto__: null,
    GunItem: GunItem,
    GunPanel: GunPanel
});

let LotteryItem_Generate = class LotteryItem_Generate extends UIScript {
    get mIconImage() {
        if (!this.mIconImage_Internal && this.uiWidgetBase) {
            this.mIconImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mIconImage");
        }
        return this.mIconImage_Internal;
    }
    get mSeletImage() {
        if (!this.mSeletImage_Internal && this.uiWidgetBase) {
            this.mSeletImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mSeletImage");
        }
        return this.mSeletImage_Internal;
    }
    get mMaskImage() {
        if (!this.mMaskImage_Internal && this.uiWidgetBase) {
            this.mMaskImage_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mMaskImage");
        }
        return this.mMaskImage_Internal;
    }
    get mOwnTextBlock() {
        if (!this.mOwnTextBlock_Internal && this.uiWidgetBase) {
            this.mOwnTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mOwnTextBlock");
        }
        return this.mOwnTextBlock_Internal;
    }
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mGunTypeTextBlock() {
        if (!this.mGunTypeTextBlock_Internal && this.uiWidgetBase) {
            this.mGunTypeTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mGunTypeTextBlock");
        }
        return this.mGunTypeTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.mOwnTextBlock);
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mGunTypeTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

LotteryItem_Generate = __decorate([ UIBind("UI/Lottery/LotteryItem.ui") ], LotteryItem_Generate);

var LotteryItem_Generate$1 = LotteryItem_Generate;

var foreign82 = Object.freeze({
    __proto__: null,
    default: LotteryItem_Generate$1
});

let LotteryPanel_Generate = class LotteryPanel_Generate extends UIScript {
    get mMiddleTopCanvas() {
        if (!this.mMiddleTopCanvas_Internal && this.uiWidgetBase) {
            this.mMiddleTopCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas");
        }
        return this.mMiddleTopCanvas_Internal;
    }
    get mCoinCanvas() {
        if (!this.mCoinCanvas_Internal && this.uiWidgetBase) {
            this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mCoinCanvas");
        }
        return this.mCoinCanvas_Internal;
    }
    get mCoinTextBlock() {
        if (!this.mCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mCoinCanvas/CoinCanvas/mCoinTextBlock");
        }
        return this.mCoinTextBlock_Internal;
    }
    get mAddCoinButton() {
        if (!this.mAddCoinButton_Internal && this.uiWidgetBase) {
            this.mAddCoinButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mCoinCanvas/mAddCoinButton");
        }
        return this.mAddCoinButton_Internal;
    }
    get mDiamondCanvas() {
        if (!this.mDiamondCanvas_Internal && this.uiWidgetBase) {
            this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mDiamondCanvas");
        }
        return this.mDiamondCanvas_Internal;
    }
    get mDiamondTextBlock() {
        if (!this.mDiamondTextBlock_Internal && this.uiWidgetBase) {
            this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mDiamondCanvas/DiamondCanvas/mDiamondTextBlock");
        }
        return this.mDiamondTextBlock_Internal;
    }
    get mAddDiamondButton() {
        if (!this.mAddDiamondButton_Internal && this.uiWidgetBase) {
            this.mAddDiamondButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mMiddleTopCanvas/mDiamondCanvas/mAddDiamondButton");
        }
        return this.mAddDiamondButton_Internal;
    }
    get mAddCanvas() {
        if (!this.mAddCanvas_Internal && this.uiWidgetBase) {
            this.mAddCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/LeftCanvas/mAddCanvas");
        }
        return this.mAddCanvas_Internal;
    }
    get mCoinStaleButton() {
        if (!this.mCoinStaleButton_Internal && this.uiWidgetBase) {
            this.mCoinStaleButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RightCanvas/CoinCanvas/mCoinStaleButton");
        }
        return this.mCoinStaleButton_Internal;
    }
    get mDiamondStaleButton() {
        if (!this.mDiamondStaleButton_Internal && this.uiWidgetBase) {
            this.mDiamondStaleButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RightCanvas/DiamondCanvas/mDiamondStaleButton");
        }
        return this.mDiamondStaleButton_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mCoinStaleButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCoinStaleButton");
        }));
        this.initLanguage(this.mCoinStaleButton);
        this.mCoinStaleButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mDiamondStaleButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mDiamondStaleButton");
        }));
        this.initLanguage(this.mDiamondStaleButton);
        this.mDiamondStaleButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mAddCoinButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddCoinButton");
        }));
        this.mAddCoinButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mAddDiamondButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mAddDiamondButton");
        }));
        this.mAddDiamondButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mCoinTextBlock);
        this.initLanguage(this.mDiamondTextBlock);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock_1"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

LotteryPanel_Generate = __decorate([ UIBind("UI/Lottery/LotteryPanel.ui") ], LotteryPanel_Generate);

var LotteryPanel_Generate$1 = LotteryPanel_Generate;

var foreign83 = Object.freeze({
    __proto__: null,
    default: LotteryPanel_Generate$1
});

class LotteryItem extends LotteryItem_Generate$1 {
    onAwake() {
        this.mSeletImage.visibility = mw.SlateVisibility.Collapsed;
        this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
        this.mOwnTextBlock.visibility = mw.SlateVisibility.Collapsed;
    }
    setItemInfo(gunElement) {
        mw.assetIDChangeIconUrlRequest([ gunElement.GunIcon_M ]).then((() => {
            try {
                this.mIconImage.setImageByAssetIconData(mw.getAssetIconDataByAssetID(gunElement.GunIcon_M));
            } catch (error) {
                Console.error("setItemInfo:" + error);
            }
        }));
        this.mNameTextBlock.text = gunElement.GunName;
        this.mGunTypeTextBlock.text = gunElement.GunType == 1 ? "永久" : "限时";
    }
    setSelectState(isSelect) {
        this.mSeletImage.visibility = isSelect ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
    setOwnMaskState(isOwn) {
        if (isOwn) {
            this.mMaskImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mOwnTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mMaskImage.visibility = mw.SlateVisibility.Collapsed;
            this.mOwnTextBlock.visibility = mw.SlateVisibility.Collapsed;
        }
    }
}

class LotteryPanel extends LotteryPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.lotteryModuleC = null;
        this.hudModuleC = null;
        this.gunModuleC = null;
        this.lotteryItems = [];
        this.rewardList = [];
        this.preGunId = 0;
    }
    onAwake() {
        this.initDatas();
        this.bindButtons();
    }
    initDatas() {
        this.lotteryModuleC = ModuleService.getModule(LotteryModuleC);
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.gunModuleC = ModuleService.getModule(GunModuleC);
        this.mCoinStaleButton.text = "18888金币\n抽奖1次";
        this.mDiamondStaleButton.text = "2钻石\n抽奖1次";
        GameConfig.Gun.getAllElement().forEach((value => {
            if (value.ID >= 14) return;
            if (value.ID == 1) {
                this.lotteryItems.push(null);
            } else {
                let lotteryItem = UIService.create(LotteryItem);
                lotteryItem.setItemInfo(value);
                this.lotteryItems.push(lotteryItem);
                this.mAddCanvas.addChild(lotteryItem.uiObject);
            }
        }));
    }
    bindButtons() {
        this.mCloseButton.onClicked.add((() => {
            this.hideTween();
        }));
        this.mAddCoinButton.onClicked.add((() => {
            this.hudModuleC.onAddCoinAction.call();
        }));
        this.mAddDiamondButton.onClicked.add((() => {
            this.hudModuleC.onAddDiamondAction.call();
        }));
        this.mCoinStaleButton.onClicked.add((() => {
            if (this.rewardList.length <= 0) {
                Notice.showDownNotice("已经抽完了");
                return;
            }
            if (this.lotteryModuleC.isCanCoinLottery(18888)) this.startLottery();
        }));
        this.mDiamondStaleButton.onClicked.add((() => {
            if (this.rewardList.length <= 0) {
                Notice.showDownNotice("已经抽完了");
                return;
            }
            if (this.lotteryModuleC.isCanDiamondLottery(2)) this.startLottery();
        }));
    }
    onShow() {
        let gunIds = this.gunModuleC.getGunIds();
        this.rewardList.length = 0;
        for (let i = 1; i < this.lotteryItems.length; ++i) {
            if (gunIds.includes(i + 1)) {
                this.lotteryItems[i].setOwnMaskState(true);
            } else {
                this.lotteryItems[i].setOwnMaskState(false);
                this.rewardList.push(i + 1);
            }
        }
        Utils.openUITween(this.rootCanvas, (() => {}), null);
    }
    startLottery() {
        if (this.preGunId) this.lotteryItems[this.preGunId - 1].setSelectState(false);
        this.lotteryState(false);
        let gunId = this.rewardList[Math.floor(Math.random() * this.rewardList.length)];
        this.preGunId = gunId;
        let preArr = [];
        let intervalId = TimeUtil.setInterval((() => {
            if (preArr.length > 0) {
                for (let i = 0; i < preArr.length; ++i) {
                    this.lotteryItems[preArr[i] - 1].setSelectState(false);
                }
            }
            let arr = this.getRandomArrayElements(this.rewardList, this.rewardList.length == 1 ? 1 : Math.floor(this.rewardList.length / 2));
            for (let i = 0; i < arr.length; ++i) {
                this.lotteryItems[arr[i] - 1].setSelectState(true);
            }
            preArr = arr;
            SoundService.playSound("137566");
        }), .5);
        TimeUtil.delaySecond(5.4).then((() => {
            TimeUtil.clearInterval(intervalId);
            if (preArr.length > 0) {
                for (let i = 0; i < preArr.length; ++i) {
                    this.lotteryItems[preArr[i] - 1].setSelectState(false);
                }
            }
            this.lotteryItems[gunId - 1].setSelectState(true);
            this.lotteryItems[gunId - 1].setOwnMaskState(true);
            SoundService.playSound("137566");
            this.removeArrayElement(this.rewardList, gunId);
            this.lotteryState(true);
            this.gunModuleC.lottery(gunId);
            Notice.showDownNotice("恭喜获得" + GameConfig.Gun.getElement(gunId).GunName);
            Notice.showDownNotice("前往商店使用");
        }));
    }
    lotteryState(isEnable) {
        this.mCoinStaleButton.enable = isEnable;
        this.mDiamondStaleButton.enable = isEnable;
        this.mAddCoinButton.enable = isEnable;
        this.mAddDiamondButton.enable = isEnable;
        this.mCloseButton.enable = isEnable;
    }
    hideTween() {
        Utils.closeUITween(this.rootCanvas, null, (() => {
            this.hide();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        }));
    }
    getRandomArrayElements(arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
    removeArrayElement(arr, element) {
        let index = arr.indexOf(element);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
}

class LotteryModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudModuleC = null;
        this.playerModuleC = null;
        this.lotteryPanel = null;
        this.adTipsPanel = null;
    }
    onStart() {
        this.initData();
        this.bindEvent();
    }
    initData() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.lotteryPanel = UIService.getUI(LotteryPanel);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
    }
    bindEvent() {
        let isOpen = false;
        InputUtil.onKeyDown(mw.Keys.P, (() => {
            isOpen = !isOpen;
            isOpen ? this.lotteryPanel.show() : this.lotteryPanel.hide();
        }));
        this.hudModuleC.onOpenLotteryAction.add((() => {
            this.lotteryPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        }));
    }
    isCanCoinLottery(costCoin) {
        if (this.playerModuleC.getCoin() >= costCoin) {
            this.playerModuleC.setCoin(-costCoin);
            Notice.showDownNotice("开始抽奖");
            return true;
        } else {
            Notice.showDownNotice("金币不足");
            this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            return false;
        }
    }
    isCanDiamondLottery(costDiamond) {
        if (this.playerModuleC.getDiamond() >= costDiamond) {
            this.playerModuleC.setDiamond(-costDiamond);
            Notice.showDownNotice("开始抽奖");
            return true;
        } else {
            Notice.showDownNotice("钻石不足");
            this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            return false;
        }
    }
}

class LotteryModuleS extends ModuleS {
    onStart() {}
}

var foreign45 = Object.freeze({
    __proto__: null,
    LotteryItem: LotteryItem,
    LotteryModuleC: LotteryModuleC,
    LotteryModuleS: LotteryModuleS,
    LotteryPanel: LotteryPanel
});

let BuyRolePanel_Generate = class BuyRolePanel_Generate extends UIScript {
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mDiamondCanvas() {
        if (!this.mDiamondCanvas_Internal && this.uiWidgetBase) {
            this.mDiamondCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mDiamondCanvas");
        }
        return this.mDiamondCanvas_Internal;
    }
    get mDiamondButton() {
        if (!this.mDiamondButton_Internal && this.uiWidgetBase) {
            this.mDiamondButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mDiamondCanvas/mDiamondButton");
        }
        return this.mDiamondButton_Internal;
    }
    get mDiamondTextBlock() {
        if (!this.mDiamondTextBlock_Internal && this.uiWidgetBase) {
            this.mDiamondTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mDiamondCanvas/mDiamondTextBlock");
        }
        return this.mDiamondTextBlock_Internal;
    }
    get mCoinCanvas() {
        if (!this.mCoinCanvas_Internal && this.uiWidgetBase) {
            this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCoinCanvas");
        }
        return this.mCoinCanvas_Internal;
    }
    get mCoinButton() {
        if (!this.mCoinButton_Internal && this.uiWidgetBase) {
            this.mCoinButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCoinCanvas/mCoinButton");
        }
        return this.mCoinButton_Internal;
    }
    get mCoinTextBlock() {
        if (!this.mCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCoinCanvas/mCoinTextBlock");
        }
        return this.mCoinTextBlock_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mDiamondButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mDiamondButton");
        }));
        this.mDiamondButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCoinButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCoinButton");
        }));
        this.mCoinButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mDiamondTextBlock);
        this.initLanguage(this.mCoinTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

BuyRolePanel_Generate = __decorate([ UIBind("UI/BuyRole/BuyRolePanel.ui") ], BuyRolePanel_Generate);

var BuyRolePanel_Generate$1 = BuyRolePanel_Generate;

var foreign73 = Object.freeze({
    __proto__: null,
    default: BuyRolePanel_Generate$1
});

let RolePanel_Generate = class RolePanel_Generate extends UIScript {
    get mLeftButton() {
        if (!this.mLeftButton_Internal && this.uiWidgetBase) {
            this.mLeftButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mLeftButton");
        }
        return this.mLeftButton_Internal;
    }
    get mRightButton() {
        if (!this.mRightButton_Internal && this.uiWidgetBase) {
            this.mRightButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mRightButton");
        }
        return this.mRightButton_Internal;
    }
    get mUseButton() {
        if (!this.mUseButton_Internal && this.uiWidgetBase) {
            this.mUseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mUseButton");
        }
        return this.mUseButton_Internal;
    }
    get mUseTextBlock() {
        if (!this.mUseTextBlock_Internal && this.uiWidgetBase) {
            this.mUseTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mUseButton/mUseTextBlock");
        }
        return this.mUseTextBlock_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mLeftButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mLeftButton");
        }));
        this.mLeftButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mRightButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mRightButton");
        }));
        this.mRightButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mUseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mUseButton");
        }));
        this.mUseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mUseTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

RolePanel_Generate = __decorate([ UIBind("UI/BuyRole/RolePanel.ui") ], RolePanel_Generate);

var RolePanel_Generate$1 = RolePanel_Generate;

var foreign74 = Object.freeze({
    __proto__: null,
    default: RolePanel_Generate$1
});

class RoleData extends Subdata {
    constructor() {
        super(...arguments);
        this.roleIds = [];
        this.currentRoleId = 0;
    }
    initDefaultData() {
        this.roleIds = [ 1 ];
        this.currentRoleId = 1;
    }
    buyRole(roleId) {
        this.currentRoleId = roleId;
        if (!this.roleIds.includes(roleId)) this.roleIds.push(roleId);
        this.save(true);
    }
    setCurrentRoleId(roleId) {
        this.currentRoleId = roleId;
        this.save(true);
    }
}

__decorate([ Decorator.persistence() ], RoleData.prototype, "roleIds", void 0);

__decorate([ Decorator.persistence() ], RoleData.prototype, "currentRoleId", void 0);

class BuyRolePanel extends BuyRolePanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.pickUpGunModuleC = null;
        this.roleElement = null;
    }
    onStart() {
        this.layer = mw.UILayerTop;
        this.pickUpGunModuleC = ModuleService.getModule(PickUpRoleModuleC);
        this.bindButtons();
    }
    bindButtons() {
        this.mCloseButton.onClicked.add((() => {
            this.hide();
        }));
        this.mDiamondButton.onClicked.add((() => {
            if (this.pickUpGunModuleC.isBuyGunByDiamond(this.roleElement.ID, this.roleElement.Price[0], this.roleElement.Role)) {
                this.hide();
                this.pickUpGunModuleC.onOpenRoleAction.call(false);
                Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
                Event.dispatchToLocal("IsOpenUI", true);
            }
        }));
        this.mCoinButton.onClicked.add((() => {
            if (this.pickUpGunModuleC.isBuyGunByCoin(this.roleElement.ID, this.roleElement.Price[1], this.roleElement.Role)) {
                this.hide();
                this.pickUpGunModuleC.onOpenRoleAction.call(false);
                Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
                Event.dispatchToLocal("IsOpenUI", true);
            }
        }));
    }
    showAndInitData(roleElement) {
        this.roleElement = roleElement;
        this.mNameTextBlock.text = roleElement.Name + "\n(永久)";
        let prices = roleElement.Price;
        this.mDiamondTextBlock.text = prices[0].toString();
        this.mCoinTextBlock.text = prices[1].toString();
        this.show();
    }
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
}

class RolePanel extends RolePanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.pickUpRoleModuleC = null;
        this.currentSelectRoleIndex = 0;
        this.maxRoleCount = 0;
    }
    onStart() {
        this.initDatas();
        this.bindButtons();
    }
    initDatas() {
        this.pickUpRoleModuleC = ModuleService.getModule(PickUpRoleModuleC);
        this.maxRoleCount = GameConfig.Role.getAllElement().length;
    }
    bindButtons() {
        this.mCloseButton.onClicked.add((() => {
            this.hide();
            this.pickUpRoleModuleC.onOpenRoleAction.call(false);
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        }));
        this.mUseButton.onClicked.add((() => {
            this.pickUpRoleModuleC.useRole(this.currentSelectRoleIndex + 1);
        }));
        this.mLeftButton.onClicked.add((() => {
            if (--this.currentSelectRoleIndex < 0) this.currentSelectRoleIndex = this.maxRoleCount - 1;
            this.pickUpRoleModuleC.onUpdateCameraPos.call(this.currentSelectRoleIndex);
            this.updateUseButtonInfo(this.pickUpRoleModuleC.isHasRoleId(this.currentSelectRoleIndex + 1));
        }));
        this.mRightButton.onClicked.add((() => {
            if (++this.currentSelectRoleIndex >= this.maxRoleCount) this.currentSelectRoleIndex = 0;
            this.pickUpRoleModuleC.onUpdateCameraPos.call(this.currentSelectRoleIndex);
            this.updateUseButtonInfo(this.pickUpRoleModuleC.isHasRoleId(this.currentSelectRoleIndex + 1));
        }));
    }
    updateUseButtonInfo(isHas) {
        this.mUseTextBlock.text = isHas ? "使用" : "购买";
    }
    onShow(...params) {
        this.updateUseButtonInfo(this.pickUpRoleModuleC.isHasRoleId(this.currentSelectRoleIndex + 1));
    }
}

class PickUpRoleModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.atkModuleC = null;
        this.playerModuleC = null;
        this.rolePanel = null;
        this.buyRolePanel = null;
        this.roleElements = [];
        this.adTipsPanel = null;
        this.onSwitchCameraAction = new mw.Action1;
        this.onUpdateCameraPos = new mw.Action1;
        this.onOpenRoleAction = new Action1;
        this.cameraAnchors = [];
        this.roleIds = [];
        this.currentRoleId = 0;
    }
    onStart() {
        this.initDatas();
        this.bindAction();
    }
    initDatas() {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.atkModuleC = ModuleService.getModule(ATKModuleC);
        this.buyRolePanel = UIService.getUI(BuyRolePanel);
        this.rolePanel = UIService.getUI(RolePanel);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
        this.roleElements = GameConfig.Role.getAllElement();
        this.findRoleBindTriggers();
    }
    bindAction() {
        this.onOpenRoleAction.add((isOpen => {
            isOpen ? this.rolePanel.show() : this.rolePanel.hide();
            this.onSwitchCameraAction.call(isOpen ? 1 : 0);
        }));
    }
    async findRoleBindTriggers() {
        for (let i = 0; i < this.roleElements.length; ++i) {
            if (!this.roleElements[i].Trigger) continue;
            let roleTrigger = await mw.GameObject.asyncFindGameObjectById(this.roleElements[i].Trigger);
            roleTrigger.onEnter.add(this.bindEnterRoleTrigger.bind(this, this.roleElements[i]));
            let cameraAnchor = await mw.GameObject.asyncFindGameObjectById(this.roleElements[i].CameraAnchor);
            if (cameraAnchor) this.cameraAnchors.push(cameraAnchor.worldTransform);
            if (!mw.AssetUtil.assetLoaded(this.roleElements[i].Role)) {
                await mw.AssetUtil.asyncDownloadAsset(this.roleElements[i].Role);
            }
            let role = await mw.GameObject.asyncSpawn(this.roleElements[i].Role, {
                replicates: false
            });
            if (!role || !role.worldTransform) continue;
            role.worldTransform.rotation = new mw.Rotation(this.roleElements[i].Rotation);
            role.displayName = this.roleElements[i].Name;
            role.setDescription([ this.roleElements[i].Role ]);
            await role.asyncReady();
            let somatotype = role.description.advance.base.characterSetting.somatotype;
            let gunid = "95676";
            if (somatotype % 2 == 0) {
                role.loadSubStance("49096").play();
                gunid = "122720";
            } else {
                role.loadSubStance("94258").play();
            }
            let gun = await mw.GameObject.asyncSpawn(gunid);
            role.attachToSlot(gun, mw.HumanoidSlotType.RightHand);
            let triggerLoc = roleTrigger.worldTransform.position;
            role.worldTransform.position = new mw.Vector(triggerLoc.x, triggerLoc.y, triggerLoc.z + role.collisionExtent.z / 2);
        }
        await this.initCamera();
    }
    async initCamera() {
        let myCamera = Camera.currentCamera;
        let gunCamera = await GameObject.asyncSpawn("Camera", {
            replicates: false,
            transform: this.cameraAnchors[0]
        });
        this.onSwitchCameraAction.add((cameraType => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(gunCamera, .5, mw.CameraSwitchBlendFunction.Linear);
            }
        }));
        this.onUpdateCameraPos.add((i => {
            gunCamera.worldTransform = this.cameraAnchors[i];
        }));
    }
    bindEnterRoleTrigger(roleElement, character) {
        if (character != Player.localPlayer.character) return;
        if (roleElement.ID == this.currentRoleId) {
            Notice.showDownNotice("正在使用");
            return;
        }
        if (this.roleIds.includes(roleElement.ID)) {
            this.setCurrentRoleId(roleElement.ID, roleElement.Role);
        } else {
            this.buyRolePanel.showAndInitData(roleElement);
        }
    }
    useRole(roleId) {
        let roleElement = GameConfig.Role.getElement(roleId);
        if (roleElement.ID == this.currentRoleId) {
            Notice.showDownNotice("正在使用");
            return;
        }
        if (this.roleIds.includes(roleElement.ID)) {
            this.setCurrentRoleId(roleElement.ID, roleElement.Role);
            this.onOpenRoleAction.call(false);
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
            Notice.showDownNotice("使用成功");
        } else {
            this.buyRolePanel.showAndInitData(roleElement);
        }
    }
    isHasRoleId(roleId) {
        return this.roleIds.includes(roleId);
    }
    onEnterScene(sceneType) {
        this.roleIds = this.data.roleIds;
        this.currentRoleId = this.data.currentRoleId;
        this.setDescription(this.currentRoleId);
    }
    isBuyGunByCoin(roleId, coin, role) {
        if (this.roleIds.includes(roleId)) {
            Console.error("已经购买过该角色");
            Notice.showDownNotice("已经购买过该角色");
            return true;
        }
        if (this.playerModuleC.getCoin() >= coin) {
            this.playerModuleC.setCoin(-coin);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyRole(roleId, role);
            return true;
        } else {
            Console.error("金币不足");
            Notice.showDownNotice("金币不足");
            this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            return false;
        }
    }
    isBuyGunByDiamond(roleId, diamond, role) {
        if (this.roleIds.includes(roleId)) {
            Console.error("已经购买过该角色");
            Notice.showDownNotice("已经购买过该角色");
            return true;
        }
        if (this.playerModuleC.getDiamond() >= diamond) {
            this.playerModuleC.setDiamond(-diamond);
            Console.error("购买成功");
            Notice.showDownNotice("购买成功");
            this.buyRole(roleId, role);
            return true;
        } else {
            Console.error("钻石不足");
            Notice.showDownNotice("钻石不足");
            this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            return false;
        }
    }
    buyRole(roleId, role) {
        this.currentRoleId = roleId;
        if (!this.roleIds.includes(roleId)) this.roleIds.push(roleId);
        this.atkModuleC.onChangeSkillAction.call(roleId);
        this.server.net_buyRole(roleId, role);
    }
    setCurrentRoleId(roleId, role) {
        this.currentRoleId = roleId;
        this.atkModuleC.onChangeSkillAction.call(roleId);
        this.server.net_setCurrentRoleId(roleId, role);
    }
    setDescription(roleId) {
        let role = this.roleElements[roleId - 1].Role;
        this.atkModuleC.onChangeSkillAction.call(roleId);
        this.server.net_setDescription(role);
    }
}

class PickUpRoleModuleS extends ModuleS {
    onStart() {}
    net_buyRole(roleId, role) {
        this.currentData.buyRole(roleId);
        this.currentPlayer.character.setDescription([ role ]);
    }
    net_setCurrentRoleId(roleId, role) {
        this.currentData.setCurrentRoleId(roleId);
        this.currentPlayer.character.setDescription([ role ]);
    }
    net_setDescription(roleId) {
        this.currentPlayer.character.setDescription([ roleId ]);
    }
}

__decorate([ Decorator.noReply() ], PickUpRoleModuleS.prototype, "net_buyRole", null);

__decorate([ Decorator.noReply() ], PickUpRoleModuleS.prototype, "net_setCurrentRoleId", null);

__decorate([ Decorator.noReply() ], PickUpRoleModuleS.prototype, "net_setDescription", null);

var foreign46 = Object.freeze({
    __proto__: null,
    BuyRolePanel: BuyRolePanel,
    PickUpRoleModuleC: PickUpRoleModuleC,
    PickUpRoleModuleS: PickUpRoleModuleS,
    RoleData: RoleData,
    RolePanel: RolePanel
});

class HUDModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.playerModuleC = null;
        this.pickUpRoleModuleC = null;
        this.adsModuleC = null;
        this.hudPanel = null;
        this.gunPanel = null;
        this.lotteryPanel = null;
        this.adTipsPanel = null;
        this.onOpenTeamAction = new Action;
        this.onOpenGunAction = new Action;
        this.onOpenRoleAction = new Action;
        this.onOpenLoginAction = new Action;
        this.onOpenRankAction = new Action;
        this.onOpenLotteryAction = new Action;
        this.onOpenTaskAction = new Action;
        this.onAddCoinAction = new Action;
        this.onAddDiamondAction = new Action;
        this.onFireScaleAction = new Action1;
        this.onControlScaleAction = new Action1;
        this.onBgmVolumeAction = new Action1;
        this.currentFireScale = .05;
        this.currentControlScale = 1;
        this.currentBgmVolume = 1;
        this.killCountMap = new Map;
        this.revengeUserIdMap = new Set;
        this.words = [ "", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十" ];
        this.adds = [ "", "十", "百", "千", "万", "亿", "十", "百", "千" ];
    }
    onStart() {
        this.initDatas();
        this.registerActions();
    }
    initDatas() {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.pickUpRoleModuleC = ModuleService.getModule(PickUpRoleModuleC);
        this.adsModuleC = ModuleService.getModule(AdsModuleC);
        this.hudPanel = UIService.getUI(HUDPanel);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
        this.gunPanel = UIService.getUI(GunPanel);
        this.lotteryPanel = UIService.getUI(LotteryPanel);
    }
    registerActions() {
        Event.addLocalListener(EventType.OpenCloseHUDRadarUI, (isShow => {
            isShow ? this.hudPanel.show() : this.hudPanel.hide();
        }));
        this.onAddCoinAction.add((() => {
            if (Globaldata.isOpenIAA) {
                this.adTipsPanel.showAdTips(8888, AdType.AddCoin);
            } else {
                this.playerModuleC.setCoin(8888);
            }
        }));
        this.onAddDiamondAction.add((() => {
            if (Globaldata.isOpenIAA) {
                this.adTipsPanel.showAdTips(1, AdType.AddDiamond);
            } else {
                this.playerModuleC.setDiamond(1);
            }
        }));
        this.onOpenRoleAction.add((() => {
            Event.dispatchToLocal("IsOpenUI", false);
            this.pickUpRoleModuleC.onOpenRoleAction.call(true);
        }));
        this.onFireScaleAction.add((scale => {
            this.currentFireScale = scale;
        }));
        this.onControlScaleAction.add((scale => {
            this.currentControlScale = scale;
        }));
        this.onBgmVolumeAction.add((volume => {
            this.currentBgmVolume = volume;
            SoundService.BGMVolumeScale = volume;
        }));
    }
    onEnterScene(sceneType) {
        if (!this.hudPanel) this.hudPanel = UIService.getUI(HUDPanel);
        this.hudPanel.show();
        this.initSetData();
        TimeUtil.delaySecond(5).then((() => {
            this.onOpenTeamAction.call();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, false);
            this.hudPanel.mVirtualJoystickPanel.resetJoyStick();
            this.playBgMusic(false);
        }));
    }
    updateCoinUI(coin) {
        let coinText = coin - Number(this.hudPanel.mCoinTextBlock.text);
        Notice.showDownNotice((coinText >= 0 ? "获得" : "花费") + Math.abs(coinText) + "金币");
        this.hudPanel.mCoinTextBlock.text = coin.toString();
        this.gunPanel.mBuyCoinTextBlock.text = coin.toString();
        this.lotteryPanel.mCoinTextBlock.text = coin.toString();
    }
    updateDiamondUI(diamond) {
        this.hudPanel.mDiamondTextBlock.text = diamond.toString();
        this.gunPanel.mBuyDiamondTextBlock.text = diamond.toString();
        this.lotteryPanel.mDiamondTextBlock.text = diamond.toString();
    }
    updateHpUI(hp) {
        if (hp < 0) hp = 0;
        this.hudPanel.mHpTextBlock.text = 100 + "/" + hp;
        this.hudPanel.mHpProgressBar.currentValue = hp;
        if (hp <= 0) this.hudPanel.startCountDown();
        if (hp == 100) {
            this.hudPanel.endCountDown();
            Guide.startGuide(new mw.Vector(4098.63, 4468.69, 50), null);
            this.adsModuleC.dieAds();
        }
    }
    showInvincibleTimeUI() {
        this.hudPanel.showInvincibleTimeUI(2);
    }
    updateKillCountUI(killCount, coin) {
        let lvExp = Helper.getLvAndExpByKillCount(killCount);
        this.hudPanel.mLvTextBlock.text = "等级 Lv." + lvExp[0];
        this.hudPanel.mExpTextBlock.text = Math.floor(lvExp[1] / lvExp[0] * 100) + "%";
        this.hudPanel.mExpProgressBar.currentValue = Math.floor(lvExp[1] / lvExp[0] * 100);
        this.updateCoinUI(coin);
    }
    updateUI(coin, diamond, killCount) {
        this.updateDiamondUI(diamond);
        this.updateKillCountUI(killCount, coin);
    }
    killTip(killerUserId, killerName, killedUserId, killedName) {
        let killTipType = KillTipType.None;
        if (killerUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killer;
        } else if (killedUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killed;
        }
        this.hudPanel.killTip(killTipType, killerName, killedName);
        this.killTipsSound(killerUserId, killerName, killedUserId, killedName);
    }
    initSetData() {
        this.currentFireScale = this.data.fireScale;
        this.currentControlScale = this.data.controlScale;
        this.currentBgmVolume = this.data.bgmVolume;
        this.hudPanel.initSetData(this.currentFireScale, this.currentControlScale, this.currentBgmVolume);
    }
    getFireScale() {
        return this.currentFireScale;
    }
    saveSetData() {
        if (this.data.fireScale == this.currentFireScale && this.data.controlScale == this.currentControlScale && this.data.bgmVolume == this.currentBgmVolume) return;
        this.server.net_saveSetData(this.currentFireScale, this.currentControlScale, this.currentBgmVolume);
    }
    killTipsSound(killerUserId, killerName, killedUserId, killedName) {
        let killTipType = KillTipType.None;
        if (killedUserId == this.localPlayer.userId) {
            killTipType = KillTipType.Killed;
            if (!this.revengeUserIdMap.has(killerUserId)) this.revengeUserIdMap.add(killerUserId);
            SoundService.playSound("294343");
        } else if (killerUserId == this.localPlayer.userId && this.revengeUserIdMap.has(killedUserId)) {
            killTipType = KillTipType.revenge;
            this.revengeUserIdMap.delete(killedUserId);
            SoundService.playSound("294342");
        }
        this.hudPanel.showKillTips2(killerName, killedName, killTipType);
        if (this.killCountMap.has(killedUserId)) this.killCountMap.delete(killedUserId);
        let killCount = 0;
        if (this.killCountMap.has(killerUserId)) {
            killCount = this.killCountMap.get(killerUserId);
        }
        killCount++;
        this.killCountMap.set(killerUserId, killCount);
        if (killCount <= 1) return;
        let soundId = "";
        let killCountTips = "";
        switch (killCount) {
          case 2:
            soundId = "65877";
            killCountTips = "双杀！势不可当！";
            break;

          case 3:
            soundId = "65874";
            killCountTips = "三连杀！勇冠三军！";
            break;

          case 4:
            soundId = "65873";
            killCountTips = "四连杀！无人能敌！";
            break;

          case 5:
            soundId = "65881";
            killCountTips = "五连杀！横扫千军！";
            break;

          case 6:
            soundId = "65871";
            killCountTips = "六连杀！接近神了！";
            break;

          case 7:
            soundId = "65879";
            killCountTips = "七连杀！超越神了！";
            break;

          default:
            soundId = "65879";
            killCountTips = this.changeToCN(killCount) + "连杀！超越神了！";
            break;
        }
        SoundService.playSound(soundId);
        this.hudPanel.showKillTips1(killCountTips, killerName, killedName);
    }
    isGirl() {
        let somatotype = this.localPlayer.character.description.advance.base.characterSetting.somatotype;
        return somatotype == mw.SomatotypeV2.AnimeFemale || somatotype == mw.SomatotypeV2.CartoonyFemale || somatotype == mw.SomatotypeV2.LowpolyAdultFemale || somatotype == mw.SomatotypeV2.RealisticAdultFemale;
    }
    changeToCN(num) {
        if (this.words[num]) {
            return this.words[num];
        } else if (num > 10 && num < 20) {
            let numStr = num.toString();
            let n = numStr.substring(1, 2);
            let result = this.adds[1] + this.words[n];
            return result;
        } else if (num > 10) {
            let result = "";
            let numStr = num.toString();
            for (var i = 0; i < numStr.length; ++i) {
                let n = numStr.substring(i, i + 1);
                let m = numStr.length - i - 1;
                result += this.words[n] + this.adds[m];
            }
            return result;
        } else return "零";
    }
    playBgMusic(isBoss) {
        SoundService.playBGM(isBoss ? "136207" : "146100");
        SoundService.BGMVolumeScale = this.currentBgmVolume;
    }
}

class KillTipData {}

var KillTipType;

(function(KillTipType) {
    KillTipType[KillTipType["None"] = 0] = "None";
    KillTipType[KillTipType["Killer"] = 1] = "Killer";
    KillTipType[KillTipType["Killed"] = 2] = "Killed";
    KillTipType[KillTipType["revenge"] = 3] = "revenge";
})(KillTipType || (KillTipType = {}));

var foreign41 = Object.freeze({
    __proto__: null,
    HUDModuleC: HUDModuleC,
    KillTipData: KillTipData,
    get KillTipType() {
        return KillTipType;
    }
});

let TeamItem_Generate = class TeamItem_Generate extends UIScript {
    get mCanvas_1() {
        if (!this.mCanvas_1_Internal && this.uiWidgetBase) {
            this.mCanvas_1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_1");
        }
        return this.mCanvas_1_Internal;
    }
    get mTextBlock_1() {
        if (!this.mTextBlock_1_Internal && this.uiWidgetBase) {
            this.mTextBlock_1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_1/mTextBlock_1");
        }
        return this.mTextBlock_1_Internal;
    }
    get mCanvas_2() {
        if (!this.mCanvas_2_Internal && this.uiWidgetBase) {
            this.mCanvas_2_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_2");
        }
        return this.mCanvas_2_Internal;
    }
    get mTextBlock_2() {
        if (!this.mTextBlock_2_Internal && this.uiWidgetBase) {
            this.mTextBlock_2_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_2/mTextBlock_2");
        }
        return this.mTextBlock_2_Internal;
    }
    get mCanvas_0() {
        if (!this.mCanvas_0_Internal && this.uiWidgetBase) {
            this.mCanvas_0_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_0");
        }
        return this.mCanvas_0_Internal;
    }
    get mTextBlock_3() {
        if (!this.mTextBlock_3_Internal && this.uiWidgetBase) {
            this.mTextBlock_3_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_0/mTextBlock_3");
        }
        return this.mTextBlock_3_Internal;
    }
    get mTextBlock_3_1() {
        if (!this.mTextBlock_3_1_Internal && this.uiWidgetBase) {
            this.mTextBlock_3_1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_0/mTextBlock_3_1");
        }
        return this.mTextBlock_3_1_Internal;
    }
    get mButton1() {
        if (!this.mButton1_Internal && this.uiWidgetBase) {
            this.mButton1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_0/mButton1");
        }
        return this.mButton1_Internal;
    }
    get mButton() {
        if (!this.mButton_Internal && this.uiWidgetBase) {
            this.mButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mButton");
        }
        return this.mButton_Internal;
    }
    get mTextBlock() {
        if (!this.mTextBlock_Internal && this.uiWidgetBase) {
            this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mButton/mTextBlock");
        }
        return this.mTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mButton1.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mButton1");
        }));
        this.mButton1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mButton");
        }));
        this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mTextBlock_1);
        this.initLanguage(this.mTextBlock_2);
        this.initLanguage(this.mTextBlock_3);
        this.initLanguage(this.mTextBlock_3_1);
        this.initLanguage(this.mTextBlock);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mCanvas_0/mButton1/TextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

TeamItem_Generate = __decorate([ UIBind("UI/Team/TeamItem.ui") ], TeamItem_Generate);

var TeamItem_Generate$1 = TeamItem_Generate;

var foreign92 = Object.freeze({
    __proto__: null,
    default: TeamItem_Generate$1
});

let TeamPanel_Generate = class TeamPanel_Generate extends UIScript {
    get mCanvas() {
        if (!this.mCanvas_Internal && this.uiWidgetBase) {
            this.mCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/ScrollBox/mCanvas");
        }
        return this.mCanvas_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TitleCanvas/TextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

TeamPanel_Generate = __decorate([ UIBind("UI/Team/TeamPanel.ui") ], TeamPanel_Generate);

var TeamPanel_Generate$1 = TeamPanel_Generate;

var foreign93 = Object.freeze({
    __proto__: null,
    default: TeamPanel_Generate$1
});

let InputPanel_Generate = class InputPanel_Generate extends UIScript {
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    get mInputBox() {
        if (!this.mInputBox_Internal && this.uiWidgetBase) {
            this.mInputBox_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mInputBox");
        }
        return this.mInputBox_Internal;
    }
    get mButton() {
        if (!this.mButton_Internal && this.uiWidgetBase) {
            this.mButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mButton");
        }
        return this.mButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mButton");
        }));
        this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mButton/TextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

InputPanel_Generate = __decorate([ UIBind("UI/Player/InputPanel.ui") ], InputPanel_Generate);

var InputPanel_Generate$1 = InputPanel_Generate;

var foreign87 = Object.freeze({
    __proto__: null,
    default: InputPanel_Generate$1
});

class InputPanel extends InputPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.onSureAction = new Action1;
    }
    onStart() {
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.mButton.onClicked.add((() => {
            this.onSureAction.call(this.mInputBox.text);
            this.hide();
        }));
        this.mCloseButton.onClicked.add((() => {
            this.hide();
        }));
    }
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
}

var foreign51 = Object.freeze({
    __proto__: null,
    default: InputPanel
});

class TeamItem extends TeamItem_Generate$1 {
    constructor() {
        super(...arguments);
        this.inputPanel = null;
        this.teamId = 0;
    }
    onStart() {
        this.inputPanel = UIService.getUI(InputPanel);
        for (let i = 0; i < 2; ++i) {
            this["mTextBlock_" + (i + 1)].text = "";
        }
        this.mTextBlock_3.text = "队名（可改）";
        this.mTextBlock_3_1.text = "人数：" + 0;
        this.mButton.onClicked.add((async () => {
            let isCanChangeTeam = await ModuleService.getModule(PlayerModuleC).isCanChangeTeam(this.teamId);
            if (!isCanChangeTeam) Notice.showDownNotice("已加入或已满");
        }));
        this.mButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mButton1.onClicked.add((() => {
            this.inputPanel.show();
            this.inputPanel.onSureAction.add((text => {
                this.mTextBlock_3.text = text;
            }));
        }));
        this.mButton1.visibility = mw.SlateVisibility.Collapsed;
        this.unSelect();
    }
    async updateIcon() {
        let index = Helper.getRandomNum(0, Globaldata.TeamIcon.length - 1);
        let icon = Globaldata.TeamIcon[index];
        if (!mw.AssetUtil.assetLoaded(icon)) {
            await mw.AssetUtil.asyncDownloadAsset(icon);
        }
    }
    initData(id) {
        this.teamId = id;
    }
    setData(names) {
        let namesLen = names.length;
        for (let i = 0; i < namesLen; ++i) {
            this["mTextBlock_" + (i + 1)].text = names[i];
        }
        for (let i = namesLen; i < 2; ++i) {
            this["mTextBlock_" + (i + 1)].text = "";
        }
        Console.error("namesLen = " + namesLen);
        this.mTextBlock_3_1.text = "人数：" + namesLen;
        this.mTextBlock.text = namesLen == 2 ? "已满" : "加入";
    }
    select() {
        this.showHideBtn(true);
    }
    unSelect() {
        this.showHideBtn(false);
        this.inputPanel.onSureAction.clear();
    }
    showHideBtn(isShow) {
        return;
    }
}

class TeamPanel extends TeamPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.teamItems = [];
    }
    onAwake() {
        this.initDatas();
    }
    onStart() {
        this.bindButtons();
    }
    bindButtons() {
        this.mCloseButton.onClicked.add((() => {
            this.hideTween();
        }));
    }
    initDatas() {
        for (let i = 0; i < Globaldata.teamCount; ++i) {
            let teamItem = UIService.create(TeamItem);
            this.mCanvas.addChild(teamItem.uiObject);
            teamItem.initData(i + 1);
            this.teamItems.push(teamItem);
        }
    }
    setAllData(nameMap) {
        nameMap.forEach(((teamDatas, teamId) => {
            let names = [];
            teamDatas.forEach((teamData => {
                names.push(teamData.playerName);
            }));
            if (!names) return;
            this.teamItems[teamId - 1].setData(names);
        }));
    }
    setOneData(teamId, teamDatas) {
        let names = [];
        if (teamDatas) {
            teamDatas.forEach((teamData => {
                names.push(teamData.playerName);
            }));
        }
        Console.error("teamId = " + teamId);
        this.teamItems[teamId - 1].setData(names);
    }
    setChangeData(curTeam, curTeamDatas, toTeam, toTeamDatas) {
        this.setOneData(curTeam, curTeamDatas);
        this.setOneData(toTeam, toTeamDatas);
    }
    selectTeam(teamId) {
        this.teamItems[teamId - 1].select();
    }
    unSelectTeam(teamId) {
        this.teamItems[teamId - 1].unSelect();
    }
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
    onShow(...params) {
        Utils.openUITween(this.rootCanvas, (() => {}), null);
    }
    hideTween() {
        Utils.closeUITween(this.rootCanvas, null, (() => {
            this.hide();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        }));
    }
}

var foreign52 = Object.freeze({
    __proto__: null,
    TeamItem: TeamItem,
    TeamPanel: TeamPanel
});

class PlayerModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudModuleC = null;
        this.teamPanel = null;
        this.selfTeamId = 1;
        this.nameMap = new Map;
        this.coin = 0;
        this.diamond = 0;
        this.killCount = 0;
    }
    onStart() {
        this.initDatas();
        this.bindActions();
    }
    initDatas() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.teamPanel = UIService.getUI(TeamPanel);
    }
    bindActions() {
        let i = false;
        InputUtil.onKeyDown(mw.Keys.F1, (() => {
            i = !i;
            i ? this.teamPanel.show() : this.teamPanel.hide();
        }));
        this.hudModuleC.onOpenTeamAction.add((() => {
            this.teamPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        }));
    }
    onEnterScene(sceneType) {
        this.initSaveData();
        let nickName = mw.AccountService.getNickName();
        nickName = nickName ? nickName : "UserId:" + this.localPlayer.userId;
        this.server.net_onEnterScene(nickName);
    }
    net_syncTeamData(playerIds, playerNames, teamIds) {
        this.nameMap.clear();
        for (let i = 0; i < playerIds.length; ++i) {
            Helper.teamMap.set(playerIds[i], teamIds[i]);
            let teamDatas = [];
            if (this.nameMap.has(teamIds[i])) {
                teamDatas = this.nameMap.get(teamIds[i]);
            }
            let teamData = new TeamData;
            teamData.playerId = playerIds[i];
            teamData.playerName = playerNames[i];
            teamDatas.push(teamData);
            this.nameMap.set(teamIds[i], teamDatas);
            if (this.localPlayer.character.gameObjectId == playerIds[i]) {
                this.selfTeamId = teamIds[i];
                this.teamPanel.selectTeam(this.selfTeamId);
            }
        }
        this.teamPanel.setAllData(this.nameMap);
    }
    net_syncOneTeamData(teamId, playerId, playerName) {
        if (this.localPlayer.character.gameObjectId == playerId) return;
        Helper.teamMap.set(playerId, teamId);
        let teamDatas = [];
        if (this.nameMap.has(teamId)) {
            teamDatas = this.nameMap.get(teamId);
        }
        let teamData = new TeamData;
        teamData.playerId = playerId;
        teamData.playerName = playerName;
        if (!teamDatas) teamDatas = [];
        teamDatas.push(teamData);
        this.nameMap.set(teamId, teamDatas);
        this.teamPanel.setOneData(teamId, teamDatas);
    }
    net_deleteTeamIdMapData(teamId, playerId) {
        if (!Helper.teamMap.has(playerId)) return;
        Helper.teamMap.delete(playerId);
        let teamDatas = [];
        if (this.nameMap.has(teamId)) {
            teamDatas = this.nameMap.get(teamId);
        }
        if (teamDatas) {
            for (let i = 0; i < teamDatas.length; ++i) {
                if (teamDatas[i].playerId == playerId) {
                    teamDatas.splice(i, 1);
                }
            }
        }
        if (teamDatas.length == 0) teamDatas = null;
        this.nameMap.set(teamId, teamDatas);
        this.teamPanel.setOneData(teamId, teamDatas);
    }
    async isCanChangeTeam(toTeam) {
        if (this.selfTeamId == toTeam) return false;
        let isCan = await this.server.net_isCanChangeTeam(this.selfTeamId, toTeam);
        if (isCan) {
            this.teamPanel.unSelectTeam(this.selfTeamId);
            this.selfTeamId = toTeam;
            this.teamPanel.selectTeam(this.selfTeamId);
        }
        return isCan;
    }
    net_changeTeam(playerId, curTeam, toTeam) {
        let teamData = null;
        let curTeamDatas = this.nameMap.get(curTeam);
        if (curTeamDatas) {
            for (let i = 0; i < curTeamDatas.length; ++i) {
                if (curTeamDatas[i].playerId == playerId) {
                    teamData = curTeamDatas[i];
                    curTeamDatas.splice(i, 1);
                    break;
                }
            }
        }
        if (!curTeamDatas || curTeamDatas.length == 0) curTeamDatas = null;
        this.nameMap.set(curTeam, curTeamDatas);
        let toTeamDatas = this.nameMap.get(toTeam);
        if (!toTeamDatas) toTeamDatas = [];
        toTeamDatas.push(teamData);
        this.nameMap.set(toTeam, toTeamDatas);
        Helper.teamMap.set(playerId, toTeam);
        this.teamPanel.setChangeData(curTeam, curTeamDatas, toTeam, toTeamDatas);
    }
    getSlefTeamId() {
        return this.selfTeamId;
    }
    initSaveData() {
        this.coin = this.data.coin;
        this.diamond = this.data.diamond;
        this.killCount = this.data.killCount;
        this.updateUI();
    }
    updateUI() {
        this.hudModuleC.updateUI(this.coin, this.diamond, this.killCount);
    }
    getCoin() {
        return this.coin;
    }
    setCoin(value) {
        this.coin += value;
        this.server.net_setCoin(value);
        this.updateCoinUI();
    }
    updateCoinUI() {
        this.hudModuleC.updateCoinUI(this.coin);
    }
    getDiamond() {
        return this.diamond;
    }
    setDiamond(value) {
        this.diamond += value;
        this.server.net_setDiamond(value);
        this.updateDiamondUI();
    }
    net_updateKillCountUI(value, coin) {
        this.hudModuleC.updateKillCountUI(value, coin);
    }
    updateDiamondUI() {
        this.hudModuleC.updateDiamondUI(this.diamond);
    }
    net_updateHp(curHp) {
        this.hudModuleC.updateHpUI(curHp);
    }
    net_flyText(damage, hitPoint) {
        let fontColor = Utils.randomColor();
        FlyText.instance.showFlyText("-" + damage, hitPoint, fontColor[0], fontColor[1]);
    }
    net_hitTeammate() {
        Notice.showDownNotice("不要攻击队友");
    }
    net_killTip(killerUserId, killerName, killedUserId, killedName) {
        this.hudModuleC.killTip(killerUserId, killerName, killedUserId, killedName);
    }
    net_showInvincibleTimeUI() {
        this.hudModuleC.showInvincibleTimeUI();
    }
}

var foreign49 = Object.freeze({
    __proto__: null,
    PlayerModuleC: PlayerModuleC
});

class AdsModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.playerModuleC = null;
        this.adTipsPanel = null;
    }
    onStart() {
        this.initData();
        this.registerActions();
    }
    initData() {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.adTipsPanel = UIService.getUI(AdTipsPanel);
    }
    registerActions() {
        this.adTipsPanel.onWatchAdsAction.add(this.playAds.bind(this));
    }
    onEnterScene(sceneType) {
        this.defaultAds();
    }
    playAds(id, adType) {
        this.getReward(id, adType);
        Notice.showDownNotice("成功获得奖励");
        return;
    }
    getReward(id, adType) {
        switch (adType) {
          case AdType.AddCoin:
            this.playerModuleC.setCoin(id);
            break;

          case AdType.AddDiamond:
            this.playerModuleC.setDiamond(id);
            break;
        }
    }
    defaultAds() {
        this.delay10Seconds();
        this.setInterval180Seconds();
    }
    delay10Seconds() {
        TimeUtil.delaySecond(15).then((() => {
            this.adTipsPanel.showAdTips(2, AdType.AddDiamond);
        }));
    }
    setInterval180Seconds() {
        TimeUtil.setInterval((() => {
            this.adTipsPanel.showAdTips(3, AdType.AddDiamond);
        }), 180);
    }
    dieAds() {
        this.adTipsPanel.showAdTips(2, AdType.AddDiamond);
    }
}

var AdType;

(function(AdType) {
    AdType[AdType["AddCoin"] = 1] = "AddCoin";
    AdType[AdType["AddDiamond"] = 2] = "AddDiamond";
})(AdType || (AdType = {}));

var foreign24 = Object.freeze({
    __proto__: null,
    get AdType() {
        return AdType;
    },
    default: AdsModuleC
});

class AdsModuleS extends ModuleS {
    onStart() {}
}

var foreign25 = Object.freeze({
    __proto__: null,
    default: AdsModuleS
});

class GuideData extends Subdata {
    constructor() {
        super(...arguments);
        this.isFirst = true;
    }
    initDefaultData() {
        this.isFirst = true;
    }
    setFirst() {
        this.isFirst = false;
        this.save(true);
    }
}

__decorate([ Decorator.persistence() ], GuideData.prototype, "isFirst", void 0);

class GuideModuleC extends ModuleC {
    onStart() {}
    onEnterScene(sceneType) {
        if (!this.data.isFirst) {
            Guide.startGuide(new mw.Vector(4098.63, 4468.69, 50), null);
            return;
        }
        Guide.startGuide(new mw.Vector(4600, 5300, 0), (() => {
            Guide.startGuide(new mw.Vector(5400, 4e3, 150), (() => {
                Guide.startGuide(new mw.Vector(4098.63, 4468.69, 50), (() => {
                    this.server.net_setFirst();
                }));
            }));
        }));
    }
}

class GuideModuleS extends ModuleS {
    onStart() {}
    net_setFirst() {
        this.currentData.setFirst();
    }
}

__decorate([ Decorator.noReply() ], GuideModuleS.prototype, "net_setFirst", null);

var foreign31 = Object.freeze({
    __proto__: null,
    GuideData: GuideData,
    GuideModuleC: GuideModuleC,
    GuideModuleS: GuideModuleS
});

class GunData extends Subdata {
    constructor() {
        super(...arguments);
        this.gunIds = [];
        this.currentGunId = 0;
    }
    initDefaultData() {
        this.gunIds = [ 1 ];
        this.currentGunId = 1;
    }
    buyGun(gunId) {
        if (this.gunIds.includes(gunId)) return;
        this.gunIds.push(gunId);
        this.save(true);
    }
    setCurrentGunId(gunId) {
        this.currentGunId = gunId;
        this.save(true);
    }
}

__decorate([ Decorator.persistence() ], GunData.prototype, "gunIds", void 0);

__decorate([ Decorator.persistence() ], GunData.prototype, "currentGunId", void 0);

var foreign32 = Object.freeze({
    __proto__: null,
    GunData: GunData
});

class GunModuleS extends ModuleS {
    constructor() {
        super(...arguments);
        this.weaponMap = new Map;
    }
    onStart() {}
    onPlayerLeft(player) {
        let userId = player.userId;
        if (this.weaponMap.has(userId)) {
            let weapon = this.weaponMap.get(userId);
            weapon?.getChildren().forEach((value => {
                value?.destroy();
            }));
            weapon?.destroy();
            this.weaponMap.delete(userId);
            Console.error("wfz-A");
        }
    }
    net_buyGun(gunId) {
        this.currentData.buyGun(gunId);
    }
    net_setCurrentGunId(gunId) {
        this.playerSwitchGun(gunId, this.currentPlayer);
        if (GameConfig.Gun.getElement(gunId).GunType == 2) return;
        this.currentData.setCurrentGunId(gunId);
    }
    net_playerSwitchGun(gunId) {
        this.playerSwitchGun(gunId, this.currentPlayer);
    }
    async playerSwitchGun(gunId, player) {
        player.character.movementEnabled = false;
        let weapon = await SpawnManager.asyncSpawn({
            guid: GameConfig.Gun.getElement(gunId).GunPrefab,
            replicates: true
        });
        await weapon.asyncReady();
        player.character.attachToSlot(weapon, mw.HumanoidSlotType.BackOrnamental);
        weapon.localTransform.position = mw.Vector.zero;
        weapon.localTransform.rotation = mw.Rotation.zero;
        player.character.movementEnabled = true;
        await TimeUtil.delaySecond(2);
        let userId = player.userId;
        if (this.weaponMap.has(userId)) {
            let weapon = this.weaponMap.get(userId);
            weapon?.getChildren().forEach((value => {
                value?.destroy();
            }));
            weapon?.destroy();
            Console.error("wfz-A");
        }
        this.weaponMap.set(userId, weapon);
    }
}

__decorate([ Decorator.noReply() ], GunModuleS.prototype, "net_buyGun", null);

__decorate([ Decorator.noReply() ], GunModuleS.prototype, "net_setCurrentGunId", null);

__decorate([ Decorator.noReply() ], GunModuleS.prototype, "net_playerSwitchGun", null);

var foreign34 = Object.freeze({
    __proto__: null,
    GunModuleS: GunModuleS
});

let LoginPanel_Generate = class LoginPanel_Generate extends UIScript {
    get mExplainTextBlock() {
        if (!this.mExplainTextBlock_Internal && this.uiWidgetBase) {
            this.mExplainTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mExplainTextBlock");
        }
        return this.mExplainTextBlock_Internal;
    }
    get mConditionTextBlock1() {
        if (!this.mConditionTextBlock1_Internal && this.uiWidgetBase) {
            this.mConditionTextBlock1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mConditionTextBlock1");
        }
        return this.mConditionTextBlock1_Internal;
    }
    get mConditionImage1() {
        if (!this.mConditionImage1_Internal && this.uiWidgetBase) {
            this.mConditionImage1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mConditionImage1");
        }
        return this.mConditionImage1_Internal;
    }
    get mConditionTextBlock2() {
        if (!this.mConditionTextBlock2_Internal && this.uiWidgetBase) {
            this.mConditionTextBlock2_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mConditionTextBlock2");
        }
        return this.mConditionTextBlock2_Internal;
    }
    get mConditionImage2() {
        if (!this.mConditionImage2_Internal && this.uiWidgetBase) {
            this.mConditionImage2_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mConditionImage2");
        }
        return this.mConditionImage2_Internal;
    }
    get mLoginButton() {
        if (!this.mLoginButton_Internal && this.uiWidgetBase) {
            this.mLoginButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mLoginButton");
        }
        return this.mLoginButton_Internal;
    }
    get mLoginTextBlock() {
        if (!this.mLoginTextBlock_Internal && this.uiWidgetBase) {
            this.mLoginTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mLoginButton/mLoginTextBlock");
        }
        return this.mLoginTextBlock_Internal;
    }
    get mLoginTextBlock_1() {
        if (!this.mLoginTextBlock_1_Internal && this.uiWidgetBase) {
            this.mLoginTextBlock_1_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mLoginButton/mLoginTextBlock_1");
        }
        return this.mLoginTextBlock_1_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mLoginButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mLoginButton");
        }));
        this.mLoginButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mExplainTextBlock);
        this.initLanguage(this.mConditionTextBlock1);
        this.initLanguage(this.mConditionImage1);
        this.initLanguage(this.mConditionTextBlock2);
        this.initLanguage(this.mConditionImage2);
        this.initLanguage(this.mLoginTextBlock);
        this.initLanguage(this.mLoginTextBlock_1);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/MainCanvas/LoginTitleTextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

LoginPanel_Generate = __decorate([ UIBind("UI/Gun/LoginPanel.ui") ], LoginPanel_Generate);

var LoginPanel_Generate$1 = LoginPanel_Generate;

var foreign79 = Object.freeze({
    __proto__: null,
    default: LoginPanel_Generate$1
});

class LoginPanel extends LoginPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.loginModuleC = null;
    }
    onStart() {
        this.initData();
        this.bindButtons();
    }
    initData() {
        this.loginModuleC = ModuleService.getModule(LoginModuleC);
        this.mExplainTextBlock.text = "活动期间\n每天在线30分钟连续3天\n即可免费领取";
        this.setConditionImage1Visible(false);
    }
    bindButtons() {
        this.mLoginButton.onClicked.add((() => {
            if (this.loginModuleC.isGeted()) {
                Notice.showDownNotice("已经领取过了");
                return;
            }
            if (!this.loginModuleC.isCanGet()) {
                Notice.showDownNotice("未满足领取条件");
                return;
            }
            this.loginModuleC.setGet();
            this.mLoginTextBlock_1.text = "已领取";
            Notice.showDownNotice("领取成功");
        }));
        this.mCloseButton.onClicked.add((() => {
            this.hide();
            this.loginModuleC.onSwitchCameraAction.call(0);
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        }));
    }
    setConditionImage1Visible(visible) {
        this.mConditionImage2.visibility = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }
    setLoginText(days, isGet) {
        this.mLoginTextBlock.text = (days >= 3 ? "完成" : "未完成") + "(" + days + "/3)";
        if (isGet) this.mLoginTextBlock_1.text = "已领取";
    }
    setAddLoginText(days, isGet) {
        this.setConditionImage1Visible(true);
        this.setLoginText(days, isGet);
    }
}

class LoginData extends Subdata {
    constructor() {
        super(...arguments);
        this.days = 0;
        this.isGet = false;
    }
    initDefaultData() {
        this.days = 0;
        this.isGet = false;
    }
    setDays() {
        this.days++;
        this.save(true);
    }
    setIsGet() {
        this.isGet = true;
        this.save(true);
    }
}

__decorate([ Decorator.persistence() ], LoginData.prototype, "days", void 0);

__decorate([ Decorator.persistence() ], LoginData.prototype, "isGet", void 0);

class LoginModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudModuleC = null;
        this.gunModuleC = null;
        this.loginPanel = null;
        this.onSwitchCameraAction = new Action1;
        this.days = 0;
        this.isGet = false;
    }
    onStart() {
        this.initData();
        this.initCamera();
        this.bindAction();
        InputUtil.onKeyDown(mw.Keys.G, (() => {
            this.setAddLogin();
        }));
    }
    initData() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.gunModuleC = ModuleService.getModule(GunModuleC);
        this.loginPanel = UIService.getUI(LoginPanel);
    }
    bindAction() {
        this.hudModuleC.onOpenLoginAction.add((() => {
            this.loginPanel.show();
            this.onSwitchCameraAction.call(1);
            Event.dispatchToLocal("IsOpenUI", false);
        }));
    }
    async initCamera() {
        let cameraAnchor = await mw.GameObject.asyncFindGameObjectById("1ED08CCC");
        let myCamera = Camera.currentCamera;
        let gunCamera = await GameObject.asyncSpawn("Camera", {
            replicates: false,
            transform: cameraAnchor.worldTransform
        });
        this.onSwitchCameraAction.add((cameraType => {
            if (cameraType == 0) {
                Camera.switch(myCamera);
            } else {
                Camera.switch(gunCamera, .5, mw.CameraSwitchBlendFunction.Linear);
            }
        }));
    }
    onEnterScene(sceneType) {
        this.days = this.data.days;
        this.isGet = this.data.isGet;
        if (!this.loginPanel) this.loginPanel = UIService.getUI(LoginPanel);
        this.loginPanel.setLoginText(this.days, this.isGet);
        if (this.days >= 3) this.loginPanel.setConditionImage1Visible(true);
    }
    isCanGet() {
        return this.days >= 3;
    }
    isGeted() {
        return this.isGet;
    }
    setAddLogin() {
        this.days++;
        this.loginPanel.setAddLoginText(this.days, this.isGet);
        this.server.net_setAddLogin();
    }
    setGet() {
        this.gunModuleC.buyGun(14, true);
        this.isGet = true;
        this.server.net_setIsGet();
    }
}

class LoginModuleS extends ModuleS {
    onStart() {}
    net_setAddLogin() {
        this.currentData.setDays();
    }
    net_setIsGet() {
        this.currentData.setIsGet();
    }
}

__decorate([ Decorator.noReply() ], LoginModuleS.prototype, "net_setAddLogin", null);

__decorate([ Decorator.noReply() ], LoginModuleS.prototype, "net_setIsGet", null);

var foreign35 = Object.freeze({
    __proto__: null,
    LoginData: LoginData,
    LoginModuleC: LoginModuleC,
    LoginModuleS: LoginModuleS,
    LoginPanel: LoginPanel
});

class PickUpGunModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.gunPanel = null;
        this.pickUpGunElements = [];
    }
    onStart() {
        this.initDatas();
    }
    initDatas() {
        this.gunPanel = UIService.getUI(GunPanel);
        this.pickUpGunElements = GameConfig.PickUpGun.getAllElement();
        this.findGunObjBindTriggers();
    }
    async findGunObjBindTriggers() {
        for (let i = 0; i < this.pickUpGunElements.length; ++i) {
            let gunTrigger = await mw.GameObject.asyncFindGameObjectById(this.pickUpGunElements[i].GunTrigger);
            gunTrigger.onEnter.add(this.bindEnterTrigger.bind(this, this.pickUpGunElements[i].ID));
        }
    }
    bindEnterTrigger(gunId, character) {
        if (character != Player.localPlayer.character) return;
        this.gunPanel.pickUpGun(gunId);
    }
}

class PickUpGunModuleS extends ModuleS {
    onStart() {}
}

var foreign36 = Object.freeze({
    __proto__: null,
    PickUpGunModuleC: PickUpGunModuleC,
    PickUpGunModuleS: PickUpGunModuleS
});

class HUDData extends Subdata {
    constructor() {
        super(...arguments);
        this.fireScale = .05;
        this.controlScale = .3;
        this.bgmVolume = 1;
    }
    initDefaultData() {
        this.fireScale = .05;
        this.controlScale = .3;
        this.bgmVolume = 1;
    }
}

__decorate([ Decorator.persistence() ], HUDData.prototype, "fireScale", void 0);

__decorate([ Decorator.persistence() ], HUDData.prototype, "controlScale", void 0);

__decorate([ Decorator.persistence() ], HUDData.prototype, "bgmVolume", void 0);

var foreign40 = Object.freeze({
    __proto__: null,
    HUDData: HUDData
});

class HUDModuleS extends ModuleS {
    onStart() {}
    net_saveSetData(fireScale, controlScale, bgmVolume) {
        this.currentData.fireScale = fireScale;
        this.currentData.controlScale = controlScale;
        this.currentData.bgmVolume = bgmVolume;
        this.currentData.save(true);
    }
}

__decorate([ Decorator.noReply() ], HUDModuleS.prototype, "net_saveSetData", null);

var foreign42 = Object.freeze({
    __proto__: null,
    HUDModuleS: HUDModuleS
});

class RadarUI extends UIScript {
    constructor() {
        super(...arguments);
        this.mCutCanvas = undefined;
        this.mRadarCanvas = undefined;
        this.currentPlayer = undefined;
        this.playerPointMap = new Map;
        this.enemyPointMap = new Map;
        this.enemyLocMap = new Map;
        this.characterPointMap = new Map;
        this.radarModuleC = null;
    }
    async onAwake() {
        this.radarModuleC = ModuleService.getModule(RadarModuleC);
        this.currentPlayer = await Player.asyncGetLocalPlayer();
        let windowSize = WindowUtil.getViewportSize();
        this.rootCanvas.size = windowSize;
        this.rootCanvas.zOrder = mw.UILayerTop;
        let _margin = new mw.Margin(0);
        this.mCutCanvas = mw.Canvas.newObject(this.rootCanvas, "MyCanvas");
        this.mCutCanvas.size = new Vector2(400, 400);
        this.mCutCanvas.zOrder = 2;
        this.mCutCanvas.autoLayoutRule = new mw.UILayout(0, _margin, mw.UILayoutType.Vertical, mw.UILayoutPacket.CenterCenter, new mw.UIHugContent(0, 0), true, false);
        this.mCutCanvas.clipEnable = true;
        let bgp = mw.Image.newObject(this.rootCanvas, "bgp");
        bgp.imageGuid = "86650";
        bgp.imageColor = LinearColor.black;
        bgp.renderOpacity = .2;
        bgp.size = this.mCutCanvas.size.clone();
        let fgp = mw.Image.newObject(this.rootCanvas, "fgp");
        fgp.imageGuid = "166605";
        fgp.imageColor = LinearColor.white;
        fgp.renderOpacity = 1;
        fgp.size = this.mCutCanvas.size.clone();
        let selfImage = mw.Image.newObject(this.rootCanvas, "selfImage");
        selfImage.imageGuid = "130054";
        selfImage.size = new Vector2(64, 64);
        selfImage.zOrder = 1;
        this.mRadarCanvas = mw.Canvas.newObject(this.rootCanvas, "RadarCanvas");
        this.mRadarCanvas.size = this.mCutCanvas.size.clone();
        this.mRadarCanvas.position = Vector2.zero;
        this.mCutCanvas.addChild(this.mRadarCanvas);
        TimeUtil.setInterval((() => {
            windowSize = WindowUtil.getViewportSize();
            this.mCutCanvas.position = mw.Vector.zero;
            bgp.position = this.mCutCanvas.position;
            fgp.position = this.mCutCanvas.position;
            selfImage.position = this.mCutCanvas.position.add(this.mCutCanvas.size.clone().multiply(.5).clone().subtract(selfImage.size.clone().multiply(.5)));
            this.mRadarCanvas.renderTransformAngle = -1 * Camera.currentCamera.worldTransform.clone().rotation.z;
            Player.getAllPlayers().forEach((otherPlayer => {
                if (otherPlayer != this.currentPlayer) {
                    if (this.playerPointMap.get(otherPlayer)) {
                        let otherPlayerPoint = this.playerPointMap.get(otherPlayer);
                        if (otherPlayer.character.ragdollEnabled) {
                            otherPlayerPoint.text = "×";
                            if (this.radarModuleC.isFriendly(this.currentPlayer, otherPlayer)) {
                                otherPlayerPoint.fontColor = LinearColor.green;
                                otherPlayerPoint.visibility = 4;
                            } else {
                                otherPlayerPoint.visibility = 4;
                                otherPlayerPoint.fontColor = LinearColor.red;
                            }
                        } else {
                            otherPlayerPoint.text = "◆";
                            if (this.radarModuleC.isFriendly(this.currentPlayer, otherPlayer)) {
                                otherPlayerPoint.fontColor = LinearColor.green;
                                otherPlayerPoint.visibility = 4;
                            } else {
                                otherPlayerPoint.fontColor = LinearColor.red;
                                if (this.radarModuleC.playerExposeTempMap.get(otherPlayer)) {
                                    otherPlayerPoint.visibility = 4;
                                } else {
                                    otherPlayerPoint.visibility = 1;
                                }
                            }
                        }
                        let loc = this.radarModuleC.Loc2RadarPos(otherPlayer.character.worldTransform.position);
                        let offset = otherPlayerPoint.size;
                        let retP = new Vector2(loc.x - offset.x / 2, loc.y - offset.y / 2);
                        if (retP.x < 0 || retP.x > 400 || retP.y < 0 || retP.y > 400) {
                            otherPlayerPoint.visibility = 1;
                        } else {
                            otherPlayerPoint.position = retP;
                            otherPlayerPoint.visibility = 4;
                        }
                    } else {
                        let otherPlayerPoint = mw.TextBlock.newObject(this.rootCanvas, otherPlayer.userId);
                        otherPlayerPoint.fontSize = 32;
                        otherPlayerPoint.text = "";
                        otherPlayerPoint.outlineColor = LinearColor.black;
                        otherPlayerPoint.zOrder = 1;
                        otherPlayerPoint.outlineSize = 1;
                        otherPlayerPoint.fontColor = LinearColor.green;
                        otherPlayerPoint.textHorizontalLayout = 2;
                        otherPlayerPoint.textJustification = 0;
                        otherPlayerPoint.textVerticalJustification = 0;
                        otherPlayerPoint.textAlign = 0;
                        otherPlayerPoint.textVerticalAlign = 0;
                        otherPlayerPoint.size = new Vector2(32, 32);
                        otherPlayerPoint.visibility = 1;
                        this.mRadarCanvas.addChild(otherPlayerPoint);
                        this.playerPointMap.set(otherPlayer, otherPlayerPoint);
                    }
                }
            }));
            if (this.enemyLocMap.size > 0) {
                this.enemyLocMap.forEach(((value, key) => {
                    let loc = this.radarModuleC.Loc2RadarPos(value);
                    let offset = this.enemyPointMap.get(key).size;
                    let retP = new Vector2(loc.x - offset.x / 2, loc.y - offset.y / 2);
                    if (retP.x < 0 || retP.x > 400 || retP.y < 0 || retP.y > 400) {
                        this.enemyPointMap.get(key).visibility = 1;
                    } else {
                        this.enemyPointMap.get(key).position = retP;
                        this.enemyPointMap.get(key).visibility = 4;
                    }
                }));
            }
            if (this.characterPointMap.size > 0) {
                this.characterPointMap.forEach(((value, key) => {
                    if (key.ragdollEnabled) {
                        value.text = "×";
                    } else {
                        value.text = "◆";
                    }
                    let loc = this.radarModuleC.Loc2RadarPos(key.worldTransform.position);
                    let offset = value.size;
                    let retP = new Vector2(loc.x - offset.x / 2, loc.y - offset.y / 2);
                    if (retP.x < 0 || retP.x > 400 || retP.y < 0 || retP.y > 400) {
                        value.visibility = 1;
                    } else {
                        value.position = retP;
                        value.visibility = 4;
                    }
                }));
            }
        }), .1);
        Player.onPlayerLeave.add((otherPlayer => {
            if (this.playerPointMap.get(otherPlayer)) {
                this.playerPointMap.get(otherPlayer).destroyObject();
            }
            this.playerPointMap.delete(otherPlayer);
        }));
    }
    setEnemyPoint(enemyLoc, enemyId) {
        let enemyPoint = mw.TextBlock.newObject(this.rootCanvas, enemyId.toString());
        enemyPoint.fontSize = 48;
        enemyPoint.text = "◆";
        enemyPoint.outlineColor = LinearColor.black;
        enemyPoint.zOrder = 1;
        enemyPoint.outlineSize = 1;
        enemyPoint.fontColor = LinearColor.red;
        enemyPoint.textHorizontalLayout = 2;
        enemyPoint.textJustification = 0;
        enemyPoint.textVerticalJustification = 0;
        enemyPoint.textAlign = 0;
        enemyPoint.textVerticalAlign = 0;
        enemyPoint.size = new Vector2(48, 48);
        enemyPoint.visibility = 4;
        this.mRadarCanvas.addChild(enemyPoint);
        this.enemyPointMap.set(enemyId, enemyPoint);
        this.enemyLocMap.set(enemyId, enemyLoc);
        let loc = this.radarModuleC.Loc2RadarPos(enemyLoc);
        let offset = enemyPoint.size;
        enemyPoint.position = new Vector2(loc.x - offset.x / 2, loc.y - offset.y / 2);
    }
    setEnemyState(enemyId, isDie) {
        if (this.enemyPointMap.get(enemyId)) {
            if (isDie) {
                this.enemyPointMap.get(enemyId).text = "x";
            } else {
                this.enemyPointMap.get(enemyId).text = "◆";
            }
        }
    }
    setCharacterPoint(character) {
        let characterPoint = mw.TextBlock.newObject(this.rootCanvas, character.gameObjectId);
        characterPoint.fontSize = 32;
        characterPoint.text = "";
        characterPoint.outlineColor = LinearColor.black;
        characterPoint.zOrder = 1;
        characterPoint.outlineSize = 1;
        characterPoint.fontColor = LinearColor.red;
        characterPoint.textHorizontalLayout = 2;
        characterPoint.textJustification = 0;
        characterPoint.textVerticalJustification = 0;
        characterPoint.textAlign = 0;
        characterPoint.textVerticalAlign = 0;
        characterPoint.size = new Vector2(32, 32);
        characterPoint.visibility = 4;
        this.mRadarCanvas.addChild(characterPoint);
        this.characterPointMap.set(character, characterPoint);
    }
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
}

var foreign55 = Object.freeze({
    __proto__: null,
    default: RadarUI
});

class RadarModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.mapScalRate = 1;
        this.radarUI = undefined;
        this.playerExposeTempMap = new Map;
    }
    onStart() {
        this.initData();
        this.bindEvent();
    }
    initData() {
        this.radarUI = mw.UIService.create(RadarUI);
        this.radarUI.show();
    }
    bindEvent() {
        Event.addLocalListener(EventType.OpenCloseHUDRadarUI, (isOpen => {
            isOpen ? this.radarUI.show() : this.radarUI.hide();
        }));
    }
    isFriendly(player1, player2) {
        if (Math.abs(Helper.teamMap.get(player1.character.gameObjectId) - Helper.teamMap.get(player2.character.gameObjectId)) == 0) return true;
        return false;
    }
    net_exposePlayer(Targetplayer, exposeTime) {
        if (exposeTime == undefined) {
            exposeTime = 3;
        }
        exposeTime *= 1e3;
        if (this.playerExposeTempMap.get(Targetplayer)) {
            clearTimeout(this.playerExposeTempMap.get(Targetplayer));
            this.playerExposeTempMap.delete(Targetplayer);
        }
        let exposeTimeout = setTimeout((() => {
            this.playerExposeTempMap.delete(Targetplayer);
        }), exposeTime);
        this.playerExposeTempMap.set(Targetplayer, exposeTimeout);
    }
    exposePlayer(Targetplayer, exposeTime) {
        if (exposeTime == undefined) {
            exposeTime = 3;
        }
        exposeTime *= 1e3;
        if (this.playerExposeTempMap.get(Targetplayer)) {
            clearTimeout(this.playerExposeTempMap.get(Targetplayer));
            this.playerExposeTempMap.delete(Targetplayer);
        }
        let exposeTimeout = setTimeout((() => {
            this.playerExposeTempMap.delete(Targetplayer);
        }), exposeTime);
        this.playerExposeTempMap.set(Targetplayer, exposeTimeout);
    }
    Loc2RadarPos(loc) {
        let deltaVector = loc.clone().subtract(this.radarUI.currentPlayer.character.worldTransform.position.clone()).multiply(new Vector(.1, .1, 0)).multiply(this.mapScalRate);
        let deltaVector2 = new Vector2(deltaVector.clone().y, -1 * deltaVector.clone().x);
        let pos = this.radarUI.mRadarCanvas.size.clone().multiply(.5).clone().subtract(new Vector2(5, 16)).add(deltaVector2);
        return pos;
    }
}

var foreign53 = Object.freeze({
    __proto__: null,
    RadarModuleC: RadarModuleC
});

class RadarModuleS extends ModuleS {
    onStart() {
        this.bindEvent();
    }
    bindEvent() {
        Event.addClientListener("exposeSelf", (_exposedPlayer => {
            Player.getAllPlayers().forEach((player => {
                if (player.character.gameObjectId != _exposedPlayer.character.gameObjectId) {
                    this.getClient(player).net_exposePlayer(_exposedPlayer, 86400);
                }
            }));
        }));
    }
    onPlayerEnterGame(player) {
        Player.getAllPlayers().forEach((oldPlayer => {
            if (player.character.gameObjectId != oldPlayer.character.gameObjectId) {
                this.getClient(oldPlayer).net_exposePlayer(player, 86400);
                this.getClient(player).net_exposePlayer(oldPlayer, 86400);
            }
        }));
    }
}

var foreign54 = Object.freeze({
    __proto__: null,
    RadarModuleS: RadarModuleS
});

var ObjectPoolServices;

(function(ObjectPoolServices) {
    class ObjectPool {
        constructor(spawn, initNum = 3) {
            this.spawnFun = spawn;
            this.pool = new Array(initNum);
            this.oPool = new Array;
            for (let index = 0; index < initNum; index++) {
                this.pool[index] = this.spawnFun();
            }
        }
        spawn() {
            if (this.pool.length > 0) {
                let a = this.pool.pop();
                this.oPool.push(a);
                return a;
            }
            let a = this.spawnFun();
            this.oPool.push(a);
            return a;
        }
        return(instance) {
            if (instance == null) {
                return;
            }
            this.pool.push(instance);
        }
        getSize() {
            return this.pool.length;
        }
        clear() {
            this.pool.length = 0;
        }
        oPoolClear() {
            this.oPool.length = 0;
        }
        getAll() {
            return this.pool;
        }
        getOPool() {
            return this.oPool;
        }
    }
    ObjectPoolServices.ObjectPool = ObjectPool;
    const poolMap = new Map;
    function getPool(cls, autoCreat = true) {
        let pool = poolMap.get(cls.name);
        if (pool === undefined && autoCreat) {
            initPool(cls, (() => new cls));
        }
        return poolMap.get(cls.name);
    }
    ObjectPoolServices.getPool = getPool;
    function initPool(cls, spawn, initNum = 3) {
        let pool = poolMap.get(cls.name);
        if (pool === undefined) {
            pool = new ObjectPool(spawn, initNum);
            poolMap.set(cls.name, pool);
        }
        return pool;
    }
    ObjectPoolServices.initPool = initPool;
    function destroyPool(cls) {
        let pool = poolMap.get(cls.name);
        if (pool !== undefined) {
            pool.clear();
        }
        poolMap.delete(cls.name);
    }
    ObjectPoolServices.destroyPool = destroyPool;
    function clear() {
        for (const [key, pool] of poolMap) {
            pool.clear();
        }
        poolMap.clear();
    }
    ObjectPoolServices.clear = clear;
})(ObjectPoolServices || (ObjectPoolServices = {}));

var SourceType;

(function(SourceType) {
    SourceType[SourceType["Error"] = 0] = "Error";
    SourceType[SourceType["Asset"] = 1] = "Asset";
    SourceType[SourceType["GameObject"] = 2] = "GameObject";
    SourceType[SourceType["Prefab"] = 3] = "Prefab";
})(SourceType || (SourceType = {}));

class ObjPool {
    constructor() {
        this.POOL_RES_GUID = "poolResGuid";
        this.sourceTypeMap = new Map;
        this.sceneSource = new Map;
        this.subPoolMap = new Map;
    }
    destroy() {
        ObjPool.instance = null;
    }
    spawn(guid) {
        if (this.subPoolMap.has(guid) && this.subPoolMap.get(guid).length > 0) {
            let obj = this.subPoolMap.get(guid).pop();
            obj.setVisibility(mw.PropertyStatus.On);
            return obj;
        }
        if (!this.sourceTypeMap.has(guid)) {
            this.sourceTypeMap.set(guid, this.getSourceType(guid));
        }
        let obj = null;
        switch (this.sourceTypeMap.get(guid)) {
          case SourceType.Asset:
            obj = SpawnManager.wornSpawn(guid);
            break;

          case SourceType.GameObject:
            obj = this.sceneSource.get(guid).clone();
            break;

          case SourceType.Prefab:
            obj = SpawnManager.wornSpawn(guid);
            break;
        }
        if (obj == null) {
            this.sourceTypeMap.set(guid, SourceType.Error);
        } else {
            obj.setVisibility(mw.PropertyStatus.On);
            obj.worldTransform.position = mw.Vector.zero;
            obj[this.POOL_RES_GUID] = guid;
        }
        return obj;
    }
    getSourceType(guid) {
        if (guid.length > 18) {
            let source = GameObject.findGameObjectById(guid);
            if (source != null) {
                source.parent = null;
                source.setVisibility(mw.PropertyStatus.Off);
                this.sceneSource.set(guid, source);
                return SourceType.GameObject;
            } else {
                return SourceType.Prefab;
            }
        } else {
            return SourceType.Asset;
        }
    }
    despawn(obj) {
        let guid = obj[this.POOL_RES_GUID];
        if (guid == null) return;
        if (!this.subPoolMap.has(guid)) this.subPoolMap.set(guid, []);
        if (this.subPoolMap.get(guid).includes(obj)) return;
        this.subPoolMap.get(guid).push(obj);
    }
    clear(guid) {
        if (!this.subPoolMap.has(guid) && this.subPoolMap.get(guid).length == 0) {
            return;
        }
        let arr = this.subPoolMap.get(guid);
        for (let i = 0; i < arr.length; i++) {
            arr[i].destroy();
        }
        arr.length = 0;
    }
}

var foreign69 = Object.freeze({
    __proto__: null,
    ObjPool: ObjPool,
    get ObjectPoolServices() {
        return ObjectPoolServices;
    }
});

let WorldRankPanel_Generate = class WorldRankPanel_Generate extends UIScript {
    get mTitleTextBlock() {
        if (!this.mTitleTextBlock_Internal && this.uiWidgetBase) {
            this.mTitleTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mTitleTextBlock");
        }
        return this.mTitleTextBlock_Internal;
    }
    get mRoomCanvas() {
        if (!this.mRoomCanvas_Internal && this.uiWidgetBase) {
            this.mRoomCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas");
        }
        return this.mRoomCanvas_Internal;
    }
    get mScrollBox_Room() {
        if (!this.mScrollBox_Room_Internal && this.uiWidgetBase) {
            this.mScrollBox_Room_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/mScrollBox_Room");
        }
        return this.mScrollBox_Room_Internal;
    }
    get mRoomContent() {
        if (!this.mRoomContent_Internal && this.uiWidgetBase) {
            this.mRoomContent_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/mScrollBox_Room/mRoomContent");
        }
        return this.mRoomContent_Internal;
    }
    get mWorldCanvas() {
        if (!this.mWorldCanvas_Internal && this.uiWidgetBase) {
            this.mWorldCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas");
        }
        return this.mWorldCanvas_Internal;
    }
    get mScrollBox_World() {
        if (!this.mScrollBox_World_Internal && this.uiWidgetBase) {
            this.mScrollBox_World_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/mScrollBox_World");
        }
        return this.mScrollBox_World_Internal;
    }
    get mWorldContent() {
        if (!this.mWorldContent_Internal && this.uiWidgetBase) {
            this.mWorldContent_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/mScrollBox_World/mWorldContent");
        }
        return this.mWorldContent_Internal;
    }
    get mRankDesTextBlock() {
        if (!this.mRankDesTextBlock_Internal && this.uiWidgetBase) {
            this.mRankDesTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mRankDesTextBlock");
        }
        return this.mRankDesTextBlock_Internal;
    }
    get mRoomRankButton() {
        if (!this.mRoomRankButton_Internal && this.uiWidgetBase) {
            this.mRoomRankButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mRoomRankButton");
        }
        return this.mRoomRankButton_Internal;
    }
    get mWorldRankButton() {
        if (!this.mWorldRankButton_Internal && this.uiWidgetBase) {
            this.mWorldRankButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mWorldRankButton");
        }
        return this.mWorldRankButton_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    get mRecycleCanvas() {
        if (!this.mRecycleCanvas_Internal && this.uiWidgetBase) {
            this.mRecycleCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRecycleCanvas");
        }
        return this.mRecycleCanvas_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mRoomRankButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mRoomRankButton");
        }));
        this.mRoomRankButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mWorldRankButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mWorldRankButton");
        }));
        this.mWorldRankButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mTitleTextBlock);
        this.initLanguage(this.mRankDesTextBlock);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomRankTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomNameTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomLvTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mRoomCanvas/RoomCanvas/RoomKillTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/WorldRankTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/WorldNameTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/mWorldCanvas/WorldCanvas/WorldLvTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mRoomRankButton/RoomTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/RankCanvas/RankTypeCanvas/mWorldRankButton/WorldTextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

WorldRankPanel_Generate = __decorate([ UIBind("UI/WorldRank/WorldRankPanel.ui") ], WorldRankPanel_Generate);

var WorldRankPanel_Generate$1 = WorldRankPanel_Generate;

var foreign96 = Object.freeze({
    __proto__: null,
    default: WorldRankPanel_Generate$1
});

class WorldRankItem {
    constructor() {
        this.mRankTextBlock = undefined;
        this.mNameTextBlock = undefined;
        this.mLvTextBlock = undefined;
        this.worldRankItem = mw.createUIByName("WorldRank/WorldRankItem");
        this.mRankTextBlock = this.worldRankItem.findChildByPath("RootCanvas/Canvas/mRankTextBlock");
        this.mNameTextBlock = this.worldRankItem.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        this.mLvTextBlock = this.worldRankItem.findChildByPath("RootCanvas/Canvas/mLvTextBlock");
    }
    setData(isSelf, rank, name, killCount) {
        let color = isSelf ? new mw.LinearColor(1, 0, 1, 1) : mw.LinearColor.black;
        this.mRankTextBlock.text = rank.toString();
        this.mNameTextBlock.text = name;
        if (killCount == 0) {
            this.mLvTextBlock.text = "暂无";
        } else {
            this.mLvTextBlock.text = "Lv." + Helper.getLvAndExpByKillCount(killCount)[0];
        }
        this.mRankTextBlock.outlineColor = color;
        this.mNameTextBlock.outlineColor = color;
        this.mLvTextBlock.outlineColor = color;
    }
    recycle() {
        ObjectPoolServices.getPool(WorldRankItem).return(this);
    }
}

class RankItem {
    constructor() {
        this.mRankTextBlock = undefined;
        this.mNameTextBlock = undefined;
        this.mLvTextBlock = undefined;
        this.mKillTextBlock = undefined;
        this.rankItem = mw.createUIByName("WorldRank/RankItem");
        this.mRankTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mRankTextBlock");
        this.mNameTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        this.mLvTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mLvTextBlock");
        this.mKillTextBlock = this.rankItem.findChildByPath("RootCanvas/Canvas/mKillTextBlock");
    }
    setData(isSelf, rank, name, killCount) {
        let color = isSelf ? new mw.LinearColor(1, 0, 1, 1) : mw.LinearColor.black;
        this.mRankTextBlock.text = rank.toString();
        this.mNameTextBlock.text = name;
        if (killCount == 0) {
            this.mLvTextBlock.text = "暂无";
        } else {
            this.mLvTextBlock.text = "Lv." + Helper.getLvAndExpByKillCount(killCount)[0];
        }
        if (killCount == 0) {
            this.mKillTextBlock.text = "暂无";
        } else {
            this.mKillTextBlock.text = killCount.toString();
        }
        this.mRankTextBlock.outlineColor = color;
        this.mNameTextBlock.outlineColor = color;
        this.mLvTextBlock.outlineColor = color;
        this.mKillTextBlock.outlineColor = color;
    }
    recycle() {
        ObjectPoolServices.getPool(RankItem).return(this);
    }
}

class WorldRankPanel extends WorldRankPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.currentShowCanvas = ShowCanvasType.None;
        this.roomItems = [];
        this.worldItems = [];
    }
    onStart() {
        this.initData();
        this.bindButton();
    }
    initData() {
        this.showRoomCanvas();
    }
    bindButton() {
        this.mRoomRankButton.onClicked.add((() => {
            this.showRoomCanvas();
        }));
        this.mWorldRankButton.onClicked.add((() => {
            this.showWorldCanvas();
        }));
        this.mCloseButton.onClicked.add((() => {
            this.hideTween();
        }));
    }
    showRoomCanvas() {
        if (this.currentShowCanvas == ShowCanvasType.Room) return;
        this.currentShowCanvas = ShowCanvasType.Room;
        this.mRoomCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mWorldCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mRankDesTextBlock.text = "你所在房间内的排行榜。";
        this.mTitleTextBlock.text = "房间排行榜";
    }
    showWorldCanvas() {
        if (this.currentShowCanvas == ShowCanvasType.World) return;
        this.currentShowCanvas = ShowCanvasType.World;
        this.mRoomCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mWorldCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mRankDesTextBlock.text = "全服前100名";
        this.mTitleTextBlock.text = "全服排行榜";
    }
    onShow(...params) {
        Utils.openUITween(this.rootCanvas, (() => {}), null);
    }
    hideTween() {
        Utils.closeUITween(this.rootCanvas, null, (() => {
            this.hide();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        }));
    }
    refreshRankPanel(playerDatas_CR, curPlayerIndex, isRefreshWorldRank, worldDatas_CW, curPlayerWorldIndex) {
        this.refreshRoomRankPanel(playerDatas_CR, curPlayerIndex);
        if (isRefreshWorldRank) {
            this.refreshWorldRankPanel(worldDatas_CW, curPlayerWorldIndex);
        }
    }
    refreshRoomRankPanel(playerDatas_CR, curPlayerIndex) {
        if (playerDatas_CR.length >= this.roomItems.length) {
            for (let i = 0; i < this.roomItems.length; ++i) {
                this.roomItems[i].setData(i == curPlayerIndex, i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerKill);
            }
            for (let i = this.roomItems.length; i < playerDatas_CR.length; ++i) {
                let roomItem = ObjectPoolServices.getPool(RankItem).spawn();
                roomItem.setData(i == curPlayerIndex, i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerKill);
                this.mRoomContent.addChild(roomItem.rankItem);
                roomItem.rankItem.size = new mw.Vector2(1200, 100);
                this.roomItems.push(roomItem);
            }
        } else {
            for (let i = 0; i < playerDatas_CR.length; ++i) {
                this.roomItems[i].setData(i == curPlayerIndex, i + 1, playerDatas_CR[i].playerName, playerDatas_CR[i].playerKill);
            }
            for (let i = playerDatas_CR.length; i < this.roomItems.length; ++i) {
                this.roomItems[i].recycle();
                this.mRecycleCanvas.addChild(this.roomItems[i].rankItem);
            }
            this.roomItems.length = playerDatas_CR.length;
        }
    }
    refreshWorldRankPanel(worldDatas_C, curPlayerWorldIndex) {
        if (worldDatas_C.length >= this.worldItems.length) {
            for (let i = 0; i < this.worldItems.length; ++i) {
                this.worldItems[i].setData(i == curPlayerWorldIndex, i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerKill);
            }
            for (let i = this.worldItems.length; i < worldDatas_C.length; ++i) {
                let worldItem = ObjectPoolServices.getPool(WorldRankItem).spawn();
                worldItem.setData(i == curPlayerWorldIndex, i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerKill);
                this.mWorldContent.addChild(worldItem.worldRankItem);
                worldItem.worldRankItem.size = new mw.Vector2(1200, 100);
                this.worldItems.push(worldItem);
            }
        } else {
            for (let i = 0; i < worldDatas_C.length; i++) {
                this.worldItems[i].setData(i == curPlayerWorldIndex, i + 1, worldDatas_C[i].playerName, worldDatas_C[i].playerKill);
            }
            for (let i = worldDatas_C.length; i < this.worldItems.length; i++) {
                this.worldItems[i].recycle();
                this.mRecycleCanvas.addChild(this.worldItems[i].worldRankItem);
            }
            this.worldItems.length = worldDatas_C.length;
        }
    }
}

var ShowCanvasType;

(function(ShowCanvasType) {
    ShowCanvasType[ShowCanvasType["None"] = 0] = "None";
    ShowCanvasType[ShowCanvasType["Room"] = 1] = "Room";
    ShowCanvasType[ShowCanvasType["World"] = 2] = "World";
})(ShowCanvasType || (ShowCanvasType = {}));

var foreign57 = Object.freeze({
    __proto__: null,
    RankItem: RankItem,
    get ShowCanvasType() {
        return ShowCanvasType;
    },
    WorldRankItem: WorldRankItem,
    WorldRankPanel: WorldRankPanel
});

class WorldRankModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudModuleC = null;
        this.playerData = null;
        this.worldRankPanel = null;
        this.userId = null;
        this.rankPlayerDatas_CR = [];
        this.rankWorldDatas_CW = [];
        this.rankNpcs = [];
        this.curCanPlayAnimCount = 0;
    }
    get currentUserId() {
        if (this.userId == "" || this.userId == null) {
            this.userId = this.localPlayer.userId;
        }
        return this.userId;
    }
    onStart() {
        this.initData();
        this.bindAction();
    }
    initData() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        this.playerData = DataCenterC.getData(PlayerData);
    }
    bindAction() {
        this.hudModuleC.onOpenRankAction.add((() => {
            this.worldRankPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        }));
    }
    onEnterScene(sceneType) {
        if (this.playerData == null) this.playerData = DataCenterC.getData(PlayerData);
        let playerKill = this.playerData.killCount;
        let nickName = mw.AccountService.getNickName();
        nickName = nickName ? nickName : "UserId:" + this.localPlayer.userId;
        this.server.net_onEnterScene(nickName, playerKill);
        this.initRankNpcData();
    }
    net_syncRankData_C(playerUserIds, playerNames, playerKills, isRefreshWorldRank, worldUserIds, worldNames, worldLvs) {
        let curPlayerIndex = -1;
        let curPlayerWorldIndex = -1;
        this.rankPlayerDatas_CR.length = 0;
        for (let i = 0; i < playerNames.length; ++i) {
            this.rankPlayerDatas_CR.push(new PlayerData_CSR(playerUserIds[i], playerNames[i], playerKills[i]));
        }
        this.sortRankData_C();
        for (let i = 0; i < this.rankPlayerDatas_CR.length; ++i) {
            if (this.rankPlayerDatas_CR[i].userId == this.currentUserId) {
                curPlayerIndex = i;
                if (i == 0) this.server.net_setFirst();
            }
        }
        if (isRefreshWorldRank) {
            this.rankWorldDatas_CW.length = 0;
            for (let i = 0; i < worldNames.length; ++i) {
                this.rankWorldDatas_CW.push(new PlayerData_CSW(worldUserIds[i], worldNames[i], worldLvs[i]));
                if (worldUserIds[i] == this.currentUserId) {
                    curPlayerWorldIndex = i;
                }
            }
        }
        if (!this.worldRankPanel) {
            this.worldRankPanel = mw.UIService.getUI(WorldRankPanel);
        }
        this.worldRankPanel.refreshRankPanel(this.rankPlayerDatas_CR, curPlayerIndex, isRefreshWorldRank, this.rankWorldDatas_CW, curPlayerWorldIndex);
        this.updateRankNpc();
    }
    sortRankData_C() {
        this.rankPlayerDatas_CR.sort(((a, b) => b.playerKill - a.playerKill));
    }
    async initRankNpcData() {
        await this.initRankNpc();
        this.initRankNpcAnim();
    }
    async initRankNpc() {
        let rankNpcParent = await mw.GameObject.asyncFindGameObjectById("1E1981DB");
        let rankNpcAnchors = rankNpcParent.getChildren();
        for (let i = 0; i < rankNpcAnchors.length; ++i) {
            let rankNpc = await mw.GameObject.asyncSpawn("Character");
            rankNpc.complexMovementEnabled = false;
            await rankNpc.asyncReady();
            rankNpc.displayName = "";
            this.setCharVisibility(rankNpc, false);
            let rankNpcAnchorLoc = rankNpcAnchors[i].worldTransform.position;
            let rankNpcLocZ = rankNpc.collisionExtent.z / 2;
            rankNpc.worldTransform.position = new mw.Vector(rankNpcAnchorLoc.x, rankNpcAnchorLoc.y, rankNpcAnchorLoc.z + rankNpcLocZ);
            rankNpc.worldTransform.rotation = new mw.Rotation(0, 0, 180);
            this.rankNpcs.push(rankNpc);
        }
        mw.SoundService.play3DSound("119832", rankNpcParent, 0, 1, {
            radius: 400
        });
    }
    initRankNpcAnim() {
        TimeUtil.setInterval((async () => {
            if (this.curCanPlayAnimCount <= 0) return;
            let randomIndex = Math.floor(Math.random() * Globaldata.rankNpcAnimations.length);
            let randomAnim = Globaldata.rankNpcAnimations[randomIndex];
            let randomNpcIndex = Math.floor(Math.random() * this.curCanPlayAnimCount);
            let randomNpc = this.rankNpcs[randomNpcIndex];
            if (randomNpc?.currentAnimation?.isPlaying) randomNpc.currentAnimation?.stop();
            if (!mw.AssetUtil.assetLoaded(randomAnim)) await mw.AssetUtil.asyncDownloadAsset(randomAnim);
            let npcAnim = randomNpc.loadAnimation(randomAnim);
            npcAnim.loop = Math.round(10 / npcAnim.length);
            npcAnim.play();
        }), 5);
    }
    async updateRankNpc() {
        let userIds = [];
        let playerNames = [];
        if (this.rankPlayerDatas_CR.length >= 3) {
            for (let i = 0; i < 3; ++i) {
                userIds.push(this.rankPlayerDatas_CR[i].userId);
                playerNames.push(this.rankPlayerDatas_CR[i].playerName);
            }
        } else {
            for (let i = 0; i < this.rankPlayerDatas_CR.length; ++i) {
                userIds.push(this.rankPlayerDatas_CR[i].userId);
                playerNames.push(this.rankPlayerDatas_CR[i].playerName);
            }
        }
        for (let i = 0; i < userIds.length; ++i) {
            let tmpChar = Player.getPlayer(userIds[i]);
            await tmpChar.character.asyncReady();
            if (!this.rankNpcs[i] || !tmpChar.character) continue;
            this.rankNpcs[i].setDescription(tmpChar.character.getDescription());
            await this.rankNpcs[i].asyncReady();
            this.rankNpcs[i].displayName = playerNames[i];
            this.setCharVisibility(this.rankNpcs[i], true);
        }
        this.curCanPlayAnimCount = userIds.length;
        for (let i = userIds.length; i < this.rankNpcs.length; ++i) {
            this.setCharVisibility(this.rankNpcs[i], false);
        }
    }
    setCharVisibility(char, visibility) {
        if (char.getVisibility() != visibility) char.setVisibility(visibility, true);
    }
}

var RankType;

(function(RankType) {
    RankType[RankType["Kill"] = 3] = "Kill";
})(RankType || (RankType = {}));

var foreign58 = Object.freeze({
    __proto__: null,
    get RankType() {
        return RankType;
    },
    WorldRankModuleC: WorldRankModuleC
});

let TaskPanel_Generate = class TaskPanel_Generate extends UIScript {
    get mDailyTimeTextBlock() {
        if (!this.mDailyTimeTextBlock_Internal && this.uiWidgetBase) {
            this.mDailyTimeTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTimeTextBlock");
        }
        return this.mDailyTimeTextBlock_Internal;
    }
    get mDailyTaskBox() {
        if (!this.mDailyTaskBox_Internal && this.uiWidgetBase) {
            this.mDailyTaskBox_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTaskBox");
        }
        return this.mDailyTaskBox_Internal;
    }
    get mDailyTaskCanvas() {
        if (!this.mDailyTaskCanvas_Internal && this.uiWidgetBase) {
            this.mDailyTaskCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTaskBox/mDailyTaskCanvas");
        }
        return this.mDailyTaskCanvas_Internal;
    }
    get mDailyTaskDoneTextBlock() {
        if (!this.mDailyTaskDoneTextBlock_Internal && this.uiWidgetBase) {
            this.mDailyTaskDoneTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/DailyTaskCanvas/mDailyTaskDoneTextBlock");
        }
        return this.mDailyTaskDoneTextBlock_Internal;
    }
    get mWeekTimeTextBlock() {
        if (!this.mWeekTimeTextBlock_Internal && this.uiWidgetBase) {
            this.mWeekTimeTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTimeTextBlock");
        }
        return this.mWeekTimeTextBlock_Internal;
    }
    get mWeekTaskBox() {
        if (!this.mWeekTaskBox_Internal && this.uiWidgetBase) {
            this.mWeekTaskBox_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTaskBox");
        }
        return this.mWeekTaskBox_Internal;
    }
    get mWeekTaskCanvas() {
        if (!this.mWeekTaskCanvas_Internal && this.uiWidgetBase) {
            this.mWeekTaskCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTaskBox/mWeekTaskCanvas");
        }
        return this.mWeekTaskCanvas_Internal;
    }
    get mWeekTaskDoneTextBlock() {
        if (!this.mWeekTaskDoneTextBlock_Internal && this.uiWidgetBase) {
            this.mWeekTaskDoneTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/WeekTaskCanvas/mWeekTaskDoneTextBlock");
        }
        return this.mWeekTaskDoneTextBlock_Internal;
    }
    get mCloseButton() {
        if (!this.mCloseButton_Internal && this.uiWidgetBase) {
            this.mCloseButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/mCloseButton");
        }
        return this.mCloseButton_Internal;
    }
    get mRecycleCanvas() {
        if (!this.mRecycleCanvas_Internal && this.uiWidgetBase) {
            this.mRecycleCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mRecycleCanvas");
        }
        return this.mRecycleCanvas_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mCloseButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mCloseButton");
        }));
        this.mCloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mDailyTimeTextBlock);
        this.initLanguage(this.mDailyTaskDoneTextBlock);
        this.initLanguage(this.mWeekTimeTextBlock);
        this.initLanguage(this.mWeekTaskDoneTextBlock);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/DailyTaskCanvas/DailyTaskTitleTextBlock"));
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TaskCanvas/WeekTaskCanvas/WeekTaskTitleTextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

TaskPanel_Generate = __decorate([ UIBind("UI/Task/TaskPanel.ui") ], TaskPanel_Generate);

var TaskPanel_Generate$1 = TaskPanel_Generate;

var foreign91 = Object.freeze({
    __proto__: null,
    default: TaskPanel_Generate$1
});

class TaskPanel extends TaskPanel_Generate$1 {
    constructor() {
        super(...arguments);
        this.hudPanel = null;
        this.picIndex = 0;
        this.isPic = false;
        this.dailyTaskItemsMap = new Map;
        this.weeklyTaskItemsMap = new Map;
        this.refreshDailyHourTime = 0;
        this.refreshWeekHourTime = 0;
        this.hourTimer = 0;
        this.hourTime = 60;
        this.hour = 0;
        this.week = 0;
    }
    onStart() {
        this.canUpdate = false;
        this.layer = mw.UILayerMiddle;
        this.initData();
        this.bindButton();
        this.initTime();
    }
    initData() {
        this.hudPanel = mw.UIService.getUI(HUDPanel);
    }
    bindButton() {
        this.mCloseButton.onClicked.add((() => {
            this.hideTween();
        }));
    }
    hideTween() {
        Utils.closeUITween(this.rootCanvas, null, (() => {
            this.hide();
            Event.dispatchToLocal(EventType.OpenCloseHUDRadarUI, true);
            Event.dispatchToLocal("IsOpenUI", true);
        }));
    }
    onShow(...params) {
        this.canUpdate = true;
        Utils.openUITween(this.rootCanvas, null, null);
    }
    onHide() {
        this.canUpdate = false;
    }
    controllerPic(value) {
        this.picIndex += value;
        if (this.picIndex > 0 && this.isPic == false) {
            this.hudPanel.startTaskRedPointTween();
            this.isPic = true;
        } else if (this.picIndex <= 0 && this.isPic == true) {
            this.hudPanel.stopTaskRedPointTween();
            this.isPic = false;
        }
    }
    initTaskPanel(dailyTaskDataMap, weeklyTaskDataMap) {
        this.initDailyTaskPanel(dailyTaskDataMap);
        this.initWeeklyTaskPanel(weeklyTaskDataMap);
    }
    initDailyTaskPanel(dailyTaskDataMap) {
        this.recycleAllDailyTaskItem();
        if (dailyTaskDataMap.size == 0) return;
        this.mDailyTaskDoneTextBlock.visibility = mw.SlateVisibility.Collapsed;
        dailyTaskDataMap.forEach(((value, key) => {
            let dailyTaskItem = ObjectPoolServices.getPool(TaskItem).spawn();
            dailyTaskItem.initTaskItemData(key, value);
            this.mDailyTaskCanvas.addChild(dailyTaskItem.taskItem);
            dailyTaskItem.taskItem.size = new mw.Vector2(556, 94);
            this.dailyTaskItemsMap.set(key, dailyTaskItem);
        }));
    }
    updateTaskPanel(vipTaskType, progress) {
        if (this.dailyTaskItemsMap.has(vipTaskType)) {
            let dailyTaskItem = this.dailyTaskItemsMap.get(vipTaskType);
            dailyTaskItem.updateTaskItemData(progress);
        }
        if (this.weeklyTaskItemsMap.has(vipTaskType)) {
            let weeklyTaskItem = this.weeklyTaskItemsMap.get(vipTaskType);
            weeklyTaskItem.updateTaskItemData(progress);
        }
    }
    initWeeklyTaskPanel(weeklyTaskDataMap) {
        this.recycleAllWeeklyTaskItem();
        if (weeklyTaskDataMap.size == 0) return;
        this.mWeekTaskDoneTextBlock.visibility = mw.SlateVisibility.Collapsed;
        weeklyTaskDataMap.forEach(((value, key) => {
            let weeklyTaskItem = ObjectPoolServices.getPool(TaskItem).spawn();
            weeklyTaskItem.initTaskItemData(key, value);
            this.mWeekTaskCanvas.addChild(weeklyTaskItem.taskItem);
            weeklyTaskItem.taskItem.size = new mw.Vector2(556, 94);
            this.weeklyTaskItemsMap.set(key, weeklyTaskItem);
        }));
    }
    updateTaskCompletePanel(vipTaskType) {
        if (this.dailyTaskItemsMap.has(vipTaskType)) {
            let dailyTaskItem = this.dailyTaskItemsMap.get(vipTaskType);
            dailyTaskItem.updateTaskCompaleteItemData();
        }
        if (this.weeklyTaskItemsMap.has(vipTaskType)) {
            let weeklyTaskItem = this.weeklyTaskItemsMap.get(vipTaskType);
            weeklyTaskItem.updateTaskCompaleteItemData();
        }
    }
    recycleTaskItem(vipTaskType) {
        if (this.dailyTaskItemsMap.has(vipTaskType)) {
            let dailyTaskItem = this.dailyTaskItemsMap.get(vipTaskType);
            dailyTaskItem.recycle();
            this.mRecycleCanvas.addChild(dailyTaskItem.taskItem);
            this.dailyTaskItemsMap.delete(vipTaskType);
            this.mDailyTaskBox.scrollOffset = 0;
            if (this.dailyTaskItemsMap.size <= 0) {
                this.mDailyTaskDoneTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
        }
        if (this.weeklyTaskItemsMap.has(vipTaskType)) {
            let weeklyTaskItem = this.weeklyTaskItemsMap.get(vipTaskType);
            weeklyTaskItem.recycle();
            this.mRecycleCanvas.addChild(weeklyTaskItem.taskItem);
            this.weeklyTaskItemsMap.delete(vipTaskType);
            this.mWeekTaskBox.scrollOffset = 0;
            if (this.weeklyTaskItemsMap.size <= 0) {
                this.mWeekTaskDoneTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
        }
    }
    recycleAllDailyTaskItem() {
        if (this.dailyTaskItemsMap.size == 0) return;
        this.dailyTaskItemsMap.forEach(((value, key) => {
            value.recycle();
            this.mRecycleCanvas.addChild(value.taskItem);
            this.dailyTaskItemsMap.delete(key);
        }));
        this.mDailyTaskBox.scrollOffset = 0;
        this.dailyTaskItemsMap.clear();
    }
    recycleAllWeeklyTaskItem() {
        if (this.weeklyTaskItemsMap.size == 0) return;
        this.weeklyTaskItemsMap.forEach(((value, key) => {
            value.recycle();
            this.mRecycleCanvas.addChild(value.taskItem);
            this.weeklyTaskItemsMap.delete(key);
        }));
        this.mWeekTaskBox.scrollOffset = 0;
        this.weeklyTaskItemsMap.clear();
    }
    initTime() {
        this.hour = (new Date).getHours();
        this.updateHourTime();
        this.week = 8 - Number(Utils.getWhatDay());
        this.updateWeekTime();
        this.refreshDailyHourTime = Number(Globaldata.dailyRefreshTime.split(":")[0]);
        this.refreshWeekHourTime = Number(Globaldata.weeklyRefreshTime.split(":")[0]);
    }
    onUpdate(dt) {
        this.hourTimer += dt;
        if (this.hourTimer >= this.hourTime) {
            let hour = (new Date).getHours();
            if (hour != this.hour) {
                this.hour = hour;
                this.updateHourTime();
            }
            let week = Number(Utils.getWhatDay());
            if (week != this.week) {
                this.week = week;
                this.updateWeekTime();
            }
            this.hourTimer = 0;
        }
    }
    updateHourTime() {
        if (this.hour >= 0 && this.hour < this.refreshDailyHourTime) {
            this.hour = this.refreshDailyHourTime - this.hour;
        } else {
            this.hour = 24 - this.hour + this.refreshDailyHourTime;
        }
        this.mDailyTimeTextBlock.text = "剩余: " + this.hour + "小时";
    }
    updateWeekTime() {
        if (Number(Utils.getWhatDay()) == 1 && this.hour < this.refreshWeekHourTime) {
            this.mWeekTimeTextBlock.text = "剩余: " + 1 + "天";
            this.week = 1;
        } else {
            this.mWeekTimeTextBlock.text = "剩余: " + this.week + "天";
        }
    }
}

class TaskItem {
    constructor() {
        this.mNameTextBlock = undefined;
        this.mCoinCanvas = undefined;
        this.mCoinTextBlock = undefined;
        this.mExpCanvas = undefined;
        this.mExpTextBlock = undefined;
        this.mFinishButton = undefined;
        this.mUnfinishTextBlock = undefined;
        this.vipTaskType = TaskItemType.None;
        this.task = null;
        this.vIPTaskElement = null;
        this.taskItem = mw.createUIByName("Task/TaskItem");
        this.mNameTextBlock = this.taskItem.findChildByPath("RootCanvas/mNameTextBlock");
        this.mCoinCanvas = this.taskItem.findChildByPath("RootCanvas/mCoinCanvas");
        this.mCoinTextBlock = this.taskItem.findChildByPath("RootCanvas/mCoinCanvas/mCoinTextBlock");
        this.mExpCanvas = this.taskItem.findChildByPath("RootCanvas/mExpCanvas");
        this.mExpTextBlock = this.taskItem.findChildByPath("RootCanvas/mExpCanvas/mExpTextBlock");
        this.mFinishButton = this.taskItem.findChildByPath("RootCanvas/mFinishButton");
        this.mUnfinishTextBlock = this.taskItem.findChildByPath("RootCanvas/mUnfinishTextBlock");
        this.mFinishButton.visibility = mw.SlateVisibility.Collapsed;
        this.mFinishButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
    }
    initTaskItemData(vipTaskType, task) {
        this.vipTaskType = vipTaskType;
        this.task = task;
        this.vIPTaskElement = GameConfig.Task.getElement(this.task.taskId);
        if (task.isGetReward) {
            this.isShowFinishBtn(false);
            this.mUnfinishTextBlock.visibility = mw.SlateVisibility.Collapsed;
        } else {
            let isShow = task.progress >= this.vIPTaskElement.TragetNum;
            this.isShowFinishBtn(isShow);
            if (isShow) {
                mw.UIService.getUI(TaskPanel).controllerPic(1);
            }
        }
        this.mNameTextBlock.text = StringUtil.format(this.vIPTaskElement.Name, this.task.progress, this.vIPTaskElement.TragetNum);
        this.mCoinTextBlock.text = this.vIPTaskElement.Coin.toString();
        this.mExpTextBlock.text = this.vIPTaskElement.Exp.toString();
        if (this.vIPTaskElement.Exp == 0 || this.vIPTaskElement.Exp == null) {
            this.mExpCanvas.visibility = mw.SlateVisibility.Collapsed;
        }
        this.mFinishButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick");
            ModuleService.getModule(TaskModuleC).onTaskRewardAction.call(this.vipTaskType, this.task.taskId);
            mw.UIService.getUI(TaskPanel).controllerPic(-1);
        }));
    }
    isShowFinishBtn(isShow) {
        if (isShow) {
            if (this.mFinishButton.visibility != mw.SlateVisibility.Visible) {
                this.mFinishButton.visibility = mw.SlateVisibility.Visible;
            }
            if (this.mUnfinishTextBlock.visibility != mw.SlateVisibility.Collapsed) {
                this.mUnfinishTextBlock.visibility = mw.SlateVisibility.Collapsed;
            }
        } else {
            if (this.mFinishButton.visibility != mw.SlateVisibility.Collapsed) {
                this.mFinishButton.visibility = mw.SlateVisibility.Collapsed;
            }
            if (this.mUnfinishTextBlock.visibility != mw.SlateVisibility.SelfHitTestInvisible) {
                this.mUnfinishTextBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            }
        }
    }
    updateTaskItemData(progress) {
        let tragetNum = this.vIPTaskElement.TragetNum;
        this.task.progress = progress;
        this.mNameTextBlock.text = StringUtil.format(this.vIPTaskElement.Name, progress, tragetNum);
        if (progress >= tragetNum) {
            if (this.mFinishButton.visibility != mw.SlateVisibility.Visible) {
                mw.UIService.getUI(TaskPanel).controllerPic(1);
            }
            this.isShowFinishBtn(true);
        }
    }
    updateTaskCompaleteItemData() {
        let nextId = this.vIPTaskElement.NextId;
        if (nextId != 0) {
            this.task.taskId = nextId;
            this.task.isGetReward = false;
            this.vIPTaskElement = GameConfig.Task.getElement(nextId);
            this.mNameTextBlock.text = StringUtil.format(this.vIPTaskElement.Name, this.task.progress, this.vIPTaskElement.TragetNum);
            this.mCoinTextBlock.text = this.vIPTaskElement.Coin.toString();
            this.mExpTextBlock.text = this.vIPTaskElement.Exp.toString();
            if (this.task.progress >= this.vIPTaskElement.TragetNum) {
                this.isShowFinishBtn(true);
                mw.UIService.getUI(TaskPanel).controllerPic(1);
                return;
            }
        } else {
            this.mUnfinishTextBlock.visibility = mw.SlateVisibility.Collapsed;
            this.task.isGetReward = true;
            mw.UIService.getUI(TaskPanel).recycleTaskItem(this.vipTaskType);
        }
        this.isShowFinishBtn(false);
    }
    recycle() {
        ObjectPoolServices.getPool(TaskItem).return(this);
    }
}

var foreign63 = Object.freeze({
    __proto__: null,
    default: TaskPanel
});

class TaskModuleC extends ModuleC {
    constructor() {
        super(...arguments);
        this.hudModuleC = null;
        this.playerModuleC = null;
        this.loginModuleC = null;
        this.taskPanel = null;
        this.onExecuteTaskAction = new Action2;
        this.onTaskRewardAction = new Action2;
        this.nowTime = 0;
        this.tempDailTask = {};
        this.tempWeeklyTask = {};
        this.dailyTasks = {};
        this.weeklyTasks = {};
        this.dailyTaskMap = new Map;
        this.weeklyTaskMap = new Map;
        this.dailyLoginTimer = 0;
        this.dailyLoginTime = 60;
    }
    onStart() {
        this.initData();
        this.bindActions();
    }
    initData() {
        this.hudModuleC = ModuleService.getModule(HUDModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        this.loginModuleC = ModuleService.getModule(LoginModuleC);
        this.taskPanel = mw.UIService.getUI(TaskPanel);
    }
    bindActions() {
        this.onExecuteTaskAction.add(this.executeTask.bind(this));
        this.onTaskRewardAction.add(this.getTaskRewardAndUpdateData.bind(this));
        this.hudModuleC.onOpenTaskAction.add((() => {
            this.taskPanel.show();
            Event.dispatchToLocal("IsOpenUI", false);
        }));
    }
    net_getServerTaskData(nowTime) {
        this.nowTime = nowTime;
        this.dailyTasks = this.data.dailyTasks;
        this.weeklyTasks = this.data.weeklyTasks;
        this.initTaskData();
        this.dailyLogin();
    }
    saveTaskToServer() {
        if (MapEx.count(this.tempDailTask) <= 0 && MapEx.count(this.tempWeeklyTask) <= 0) return;
        Console.error("[MapEx.count(this.tempDailTask)] A = " + MapEx.count(this.tempDailTask));
        Console.error("[MapEx.count(this.tempWeeklyTask)] A = " + MapEx.count(this.tempWeeklyTask));
        let dailyTaskIds = [];
        let dailyTaskTypes = [];
        let dailyProgresss = [];
        if (MapEx.count(this.tempDailTask) > 0) {
            MapEx.forEach(this.tempDailTask, ((key, value) => {
                dailyTaskIds.push(value.taskId);
                dailyTaskTypes.push(key);
                dailyProgresss.push(value.progress);
                MapEx.del(this.tempDailTask, key);
                Console.error("[key] = " + key);
            }));
        }
        let weeklyTaskIds = [];
        let weeklyTaskTypes = [];
        let weeklyProgresss = [];
        if (MapEx.count(this.tempWeeklyTask) > 0) {
            MapEx.forEach(this.tempWeeklyTask, ((key, value) => {
                weeklyTaskIds.push(value.taskId);
                weeklyTaskTypes.push(key);
                weeklyProgresss.push(value.progress);
                MapEx.del(this.tempWeeklyTask, key);
            }));
        }
        if (dailyTaskIds.length == 0 && weeklyTaskIds.length == 0) {
            Console.error("[dailyTaskIds.length == 0 && weeklyTaskIds.length == 0]");
            return;
        }
        this.server.net_saveTaskProgress(dailyTaskIds, dailyTaskTypes, dailyProgresss, weeklyTaskIds, weeklyTaskTypes, weeklyProgresss);
        Console.error("[MapEx.count(this.tempDailTask)] B = " + MapEx.count(this.tempDailTask));
        Console.error("[MapEx.count(this.tempWeeklyTask)] B = " + MapEx.count(this.tempWeeklyTask));
    }
    initTaskData() {
        this.dailyTaskMap.clear();
        this.weeklyTaskMap.clear();
        let dailyTaskDataMap = new Map;
        let weeklyTaskDataMap = new Map;
        let task = GameConfig.Task.getAllElement();
        for (let i = 0; i < task.length; ++i) {
            if (task[i].TaskType == TaskType.DailyTask) {
                let vipTaskType = task[i].TaskItemType;
                if (this.dailyTaskMap.has(vipTaskType)) continue;
                if (MapEx.has(this.dailyTasks, vipTaskType)) {
                    let value = MapEx.get(this.dailyTasks, vipTaskType);
                    this.dailyTaskMap.set(vipTaskType, GameConfig.Task.getElement(value.taskId));
                    if (value.isGetReward) continue;
                    dailyTaskDataMap.set(vipTaskType, value);
                } else {
                    this.dailyTaskMap.set(vipTaskType, task[i]);
                    dailyTaskDataMap.set(vipTaskType, new Task(task[i].id, 0, false));
                }
            } else if (task[i].TaskType == TaskType.WeeklyTask) {
                let vipTaskType = task[i].TaskItemType;
                if (this.weeklyTaskMap.has(vipTaskType)) continue;
                if (MapEx.has(this.weeklyTasks, vipTaskType)) {
                    let value = MapEx.get(this.weeklyTasks, vipTaskType);
                    this.weeklyTaskMap.set(vipTaskType, GameConfig.Task.getElement(value.taskId));
                    if (value.isGetReward) continue;
                    weeklyTaskDataMap.set(vipTaskType, value);
                } else {
                    this.weeklyTaskMap.set(vipTaskType, task[i]);
                    weeklyTaskDataMap.set(vipTaskType, new Task(task[i].id, 0, false));
                }
            }
        }
        if (dailyTaskDataMap.size == 0 && weeklyTaskDataMap.size == 0) return;
        Console.error("[dailyTaskDataMap.size] = " + dailyTaskDataMap.size);
        Console.error("[weeklyTaskDataMap.size] = " + weeklyTaskDataMap.size);
        this.taskPanel.initTaskPanel(dailyTaskDataMap, weeklyTaskDataMap);
    }
    executeTask(vipTaskType, num) {
        this.executeDailyTask(vipTaskType, num);
        this.executeWeeklyTask(vipTaskType, num);
    }
    executeDailyTask(vipTaskType, num) {
        let progress = 0;
        let taskId = 0;
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            let task = MapEx.get(this.dailyTasks, vipTaskType);
            progress = task.progress + num;
            GameConfig.Task.getElement(task.taskId).TragetNum;
            taskId = task.taskId;
        } else {
            if (!this.dailyTaskMap.has(vipTaskType)) {
                Console.error("[任务类型为" + vipTaskType + "的任务不存在]");
                return;
            }
            let dailTaskElement = this.dailyTaskMap.get(vipTaskType);
            progress = num;
            dailTaskElement.TragetNum;
            taskId = dailTaskElement.id;
        }
        this.saveDailyTask(taskId, vipTaskType, progress);
        let tmpDailTask = new Task(taskId, progress, false);
        MapEx.set(this.tempDailTask, vipTaskType, tmpDailTask);
        this.taskPanel.updateTaskPanel(vipTaskType, progress);
    }
    saveDailyTask(taskId, vipTaskType, progress) {
        let dailTask = null;
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            dailTask = MapEx.get(this.dailyTasks, vipTaskType);
            dailTask.progress = progress;
        } else {
            dailTask = new Task(taskId, progress, false);
        }
        MapEx.set(this.dailyTasks, vipTaskType, dailTask);
        this.weeklyOnlineTime(vipTaskType);
    }
    executeWeeklyTask(vipTaskType, num) {
        let progress = 0;
        let taskId = 0;
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            let task = MapEx.get(this.weeklyTasks, vipTaskType);
            progress = task.progress + num;
            GameConfig.Task.getElement(task.taskId).TragetNum;
            taskId = task.taskId;
        } else {
            if (!this.weeklyTaskMap.has(vipTaskType)) {
                Console.error("[任务类型为" + vipTaskType + "的任务不存在]");
                return;
            }
            let weeklyTaskElement = this.weeklyTaskMap.get(vipTaskType);
            progress = num;
            weeklyTaskElement.TragetNum;
            taskId = weeklyTaskElement.id;
        }
        this.saveWeeklyTask(taskId, vipTaskType, progress);
        let tmpWeeklyTask = new Task(taskId, progress, false);
        MapEx.set(this.tempWeeklyTask, vipTaskType, tmpWeeklyTask);
        this.taskPanel.updateTaskPanel(vipTaskType, progress);
    }
    saveWeeklyTask(taskId, vipTaskType, progress) {
        let weeklyTask = null;
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            weeklyTask = MapEx.get(this.weeklyTasks, vipTaskType);
            weeklyTask.progress = progress;
        } else {
            weeklyTask = new Task(taskId, progress, false);
        }
        MapEx.set(this.weeklyTasks, vipTaskType, weeklyTask);
    }
    getTaskRewardAndUpdateData(vipTaskType, taskId) {
        this.updateTaskCompleteData(vipTaskType);
        this.taskPanel.updateTaskCompletePanel(vipTaskType);
        this.getTaskReward(taskId);
    }
    updateTaskCompleteData(vipTaskType) {
        if (MapEx.has(this.dailyTasks, vipTaskType)) {
            let dailyTask = MapEx.get(this.dailyTasks, vipTaskType);
            let nextId = GameConfig.Task.getElement(dailyTask.taskId).NextId;
            if (nextId != 0) {
                dailyTask.taskId = nextId;
                dailyTask.isGetReward = false;
            } else {
                dailyTask.isGetReward = true;
            }
            MapEx.set(this.dailyTasks, vipTaskType, dailyTask);
        }
        if (MapEx.has(this.weeklyTasks, vipTaskType)) {
            let weeklyTask = MapEx.get(this.weeklyTasks, vipTaskType);
            let nextId = GameConfig.Task.getElement(weeklyTask.taskId).NextId;
            if (nextId != 0) {
                weeklyTask.taskId = nextId;
                weeklyTask.isGetReward = false;
            } else {
                weeklyTask.isGetReward = true;
            }
            MapEx.set(this.weeklyTasks, vipTaskType, weeklyTask);
        }
        if (this.dailyTaskMap.has(vipTaskType)) {
            let dailyTaskElement = this.dailyTaskMap.get(vipTaskType);
            if (dailyTaskElement.NextId != 0) {
                this.dailyTaskMap.set(vipTaskType, GameConfig.Task.getElement(dailyTaskElement.NextId));
            }
        }
        if (this.weeklyTaskMap.has(vipTaskType)) {
            let weeklyTaskElement = this.weeklyTaskMap.get(vipTaskType);
            if (weeklyTaskElement.NextId != 0) {
                this.weeklyTaskMap.set(vipTaskType, GameConfig.Task.getElement(weeklyTaskElement.NextId));
            }
        }
        this.server.net_updateTaskConpleteData(vipTaskType);
    }
    getTaskReward(taskId) {
        let taskElement = GameConfig.Task.getElement(taskId);
        let rewardCoin = taskElement.Coin;
        Console.error("[奖励金币：" + rewardCoin + "]");
        Notice.showDownNotice("奖励金币：" + rewardCoin);
        this.playerModuleC.setCoin(rewardCoin);
    }
    net_resetDailyTask() {
        this.dailyTasks = {};
        this.initTaskData();
        this.dailyLogin();
    }
    net_resetWeeklyTask() {
        this.weeklyTasks = {};
        this.initTaskData();
    }
    onUpdate(dt) {
        this.saveTaskToServer();
        this.updateDailyLogin(dt);
    }
    dailyLogin() {
        if (MapEx.has(this.dailyTasks, TaskItemType.DailyLogin)) return;
        this.onExecuteTaskAction.call(TaskItemType.DailyLogin, 1);
        this.weeklyLogin();
    }
    updateDailyLogin(dt) {
        this.dailyLoginTimer += dt;
        if (this.dailyLoginTimer >= this.dailyLoginTime) {
            this.onExecuteTaskAction.call(TaskItemType.DailyOnlineTime, 1);
            this.dailyLoginTimer = 0;
        }
    }
    net_killPlayer(isBoss) {
        isBoss ? this.dailyKillBoss() : this.dailyKillPlayer();
    }
    dailyKillPlayer() {
        this.onExecuteTaskAction.call(TaskItemType.DailyKillPlayer, 1);
        this.weeklyKillPlayer();
    }
    dailyKillBoss() {
        this.onExecuteTaskAction.call(TaskItemType.DailyKillBoss, 1);
        this.weeklyKillBoss();
    }
    weeklyLogin() {
        this.onExecuteTaskAction.call(TaskItemType.WeeklyLogin, 1);
    }
    weeklyOnlineTime(vipTaskType) {
        if (vipTaskType != TaskItemType.DailyOnlineTime) return;
        if (MapEx.has(this.dailyTasks, TaskItemType.DailyOnlineTime)) {
            let progress = MapEx.get(this.dailyTasks, TaskItemType.DailyOnlineTime).progress;
            if (progress == 30) {
                this.onExecuteTaskAction.call(TaskItemType.WeeklyOnlineTime, 1);
                this.loginModuleC.setAddLogin();
            }
        }
    }
    weeklyKillPlayer() {
        this.onExecuteTaskAction.call(TaskItemType.WeeklyKillPlayer, 1);
    }
    weeklyKillBoss() {
        this.onExecuteTaskAction.call(TaskItemType.WeeklyKillBoss, 1);
    }
}

var foreign61 = Object.freeze({
    __proto__: null,
    default: TaskModuleC
});

let GameLauncher = class GameLauncher extends mw.Script {
    constructor() {
        super(...arguments);
        this.isOpenIAA = true;
        this.logLevel = LogType.None;
    }
    onStart() {
        this.onStartCS();
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        } else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }
    onStartCS() {
        this.useUpdate = true;
        this.onRegisterModule();
        Globaldata.logLevel = Number(this.logLevel);
        Globaldata.isOpenIAA = !mw.SystemUtil.isPIE || this.isOpenIAA;
    }
    onUpdate(dt) {
        mw.TweenUtil.TWEEN.update();
        if (mw.SystemUtil.isClient()) {
            update();
            this.onUpdateC(dt);
        } else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }
    onRegisterModule() {
        ModuleService.registerModule(HUDModuleS, HUDModuleC, HUDData);
        ModuleService.registerModule(RadarModuleS, RadarModuleC, null);
        ModuleService.registerModule(PlayerModuleS, PlayerModuleC, PlayerData);
        ModuleService.registerModule(ATKModuleS, ATKModuleC, null);
        ModuleService.registerModule(GunModuleS, GunModuleC, GunData);
        ModuleService.registerModule(PickUpGunModuleS, PickUpGunModuleC, null);
        ModuleService.registerModule(PickUpRoleModuleS, PickUpRoleModuleC, RoleData);
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideData);
        ModuleService.registerModule(AdsModuleS, AdsModuleC, null);
        ModuleService.registerModule(WorldRankModuleS, WorldRankModuleC, null);
        ModuleService.registerModule(LotteryModuleS, LotteryModuleC, null);
        ModuleService.registerModule(TaskModuleS, TaskModuleC, TaskData);
        ModuleService.registerModule(LoginModuleS, LoginModuleC, LoginData);
    }
    onStartC() {}
    onUpdateC(dt) {}
    onStartS() {
        DataStorage.setTemporaryStorage(SystemUtil.isPIE);
    }
    onUpdateS(dt) {}
};

__decorate([ mw.Property({
    displayName: "是否开启IAA",
    group: "面板设置"
}) ], GameLauncher.prototype, "isOpenIAA", void 0);

__decorate([ mw.Property({
    displayName: "日志类型",
    group: "面板设置",
    tooltip: "日志类型",
    enumType: LogType
}) ], GameLauncher.prototype, "logLevel", void 0);

GameLauncher = __decorate([ Component ], GameLauncher);

var GameLauncher$1 = GameLauncher;

var foreign18 = Object.freeze({
    __proto__: null,
    default: GameLauncher$1
});

let SP_SoundMoveBoard = class SP_SoundMoveBoard extends mw.Script {
    constructor() {
        super(...arguments);
        this.config_triggerGuid = "";
        this.config_keyBoardGuid = "";
        this.config_upSpeed = 30;
        this.config_downSpeed = 50;
        this.config_distance = 20;
        this.config_metarialGuid = "196924";
        this.config_soundGuid = "66244";
        this.number_soundDistance = 1e3;
        this.trigger_enter = null;
        this.obj_keyBoard = null;
        this.material_piano = null;
        this.sound_piano = null;
        this.list_player = [];
        this._onOff = false;
        this.vector_begin = null;
        this.vector_end = null;
    }
    async onStart() {
        if (!this.assetIsEmpty()) {
            Console.error(` no asset --------------- `);
            return;
        }
        if (SystemUtil.isServer()) ;
        if (SystemUtil.isClient()) {
            await this.init();
            this.trigger_enter.onEnter.add(this.onTriggerIn.bind(this));
            this.trigger_enter.onLeave.add(this.onTriggerOut.bind(this));
            this.useUpdate = true;
            Event.addLocalListener("sound" + this.obj_keyBoard.gameObjectId, (() => {
                this.sound_piano.play();
            }));
            Event.addLocalListener(`material` + this.obj_keyBoard.gameObjectId, (or => {
                switch (or) {
                  case true:
                    this.material_piano.setMaterial(this.config_metarialGuid);
                    break;

                  case false:
                    this.material_piano.resetMaterial();
                    break;
                }
                Console.error(`material`, or);
            }));
        }
    }
    onUpdate(dt) {
        if (this._onOff) {
            if (this.obj_keyBoard.worldTransform.position.z > this.vector_end) {
                let curL = this.obj_keyBoard.worldTransform.position;
                curL.z -= dt * this.config_downSpeed;
                this.obj_keyBoard.worldTransform.position = curL;
            }
        } else {
            if (this.obj_keyBoard.worldTransform.position.z < this.vector_begin) {
                let curL = this.obj_keyBoard.worldTransform.position;
                curL.z += dt * this.config_upSpeed;
                this.obj_keyBoard.worldTransform.position = curL;
            }
        }
    }
    async init() {
        this.obj_keyBoard = await mw.GameObject.asyncFindGameObjectById(this.config_keyBoardGuid);
        this.trigger_enter = await mw.GameObject.asyncFindGameObjectById(this.config_triggerGuid);
        let success = false;
        if (!AssetUtil.assetLoaded(this.config_soundGuid)) {
            success = await AssetUtil.asyncDownloadAsset(this.config_soundGuid);
        } else {
            success = true;
        }
        this.sound_piano = mw.GameObject.spawn(this.config_soundGuid);
        Console.log("success_______________", success, this.sound_piano);
        this.sound_piano.isLoop = false;
        this.sound_piano.isSpatialization = true;
        this.sound_piano.attenuationShapeExtents = new Vector(1, 1, 1).multiply(this.number_soundDistance);
        this.sound_piano.parent = this.obj_keyBoard;
        this.sound_piano.localTransform.position = mw.Vector.zero;
        this.material_piano = this.obj_keyBoard;
        this.vector_begin = this.obj_keyBoard.worldTransform.position.z;
        this.vector_end = this.obj_keyBoard.worldTransform.position.z - this.config_distance;
    }
    assetIsEmpty() {
        if (this.config_metarialGuid == "" || this.config_soundGuid == "") {
            return false;
        } else {
            return true;
        }
    }
    onTriggerIn(other) {
        if (other instanceof mw.Character) {
            let player = other.player;
            if (!this.list_player.includes(player)) {
                this.list_player.push(player);
            }
            if (this.list_player.length == 1) {
                Event.dispatchToLocal("sound" + this.obj_keyBoard.gameObjectId);
                Event.dispatchToLocal(`material` + this.obj_keyBoard.gameObjectId, true);
            }
            this._onOff = true;
        }
    }
    onTriggerOut(other) {
        if (other instanceof mw.Character) {
            let player = other.player;
            if (this.list_player.includes(player)) {
                let index = this.list_player.indexOf(player);
                this.list_player.splice(index, 1);
            }
            if (this.list_player.length <= 0) {
                this._onOff = false;
                Event.dispatchToLocal(`material` + this.obj_keyBoard.gameObjectId, false);
            }
        }
    }
};

__decorate([ mw.Property({
    capture: true,
    displayName: "触发器",
    group: "对象"
}) ], SP_SoundMoveBoard.prototype, "config_triggerGuid", void 0);

__decorate([ mw.Property({
    capture: true,
    displayName: "主体",
    group: "对象"
}) ], SP_SoundMoveBoard.prototype, "config_keyBoardGuid", void 0);

__decorate([ mw.Property({
    displayName: "向下速度",
    group: "准备"
}) ], SP_SoundMoveBoard.prototype, "config_upSpeed", void 0);

__decorate([ mw.Property({
    displayName: "回弹速度",
    group: "准备"
}) ], SP_SoundMoveBoard.prototype, "config_downSpeed", void 0);

__decorate([ mw.Property({
    displayName: "按压距离",
    group: "准备"
}) ], SP_SoundMoveBoard.prototype, "config_distance", void 0);

__decorate([ mw.Property({
    displayName: "进入材质",
    group: "资源"
}) ], SP_SoundMoveBoard.prototype, "config_metarialGuid", void 0);

__decorate([ mw.Property({
    displayName: "播放音效",
    group: "资源"
}) ], SP_SoundMoveBoard.prototype, "config_soundGuid", void 0);

__decorate([ mw.Property({
    displayName: "音效距离",
    group: "设置"
}) ], SP_SoundMoveBoard.prototype, "number_soundDistance", void 0);

SP_SoundMoveBoard = __decorate([ Component ], SP_SoundMoveBoard);

var SP_SoundMoveBoard$1 = SP_SoundMoveBoard;

var foreign19 = Object.freeze({
    __proto__: null,
    default: SP_SoundMoveBoard$1
});

class ModifiedCameraSystem {
    static get cameraLocationMode() {
        if (!SystemUtil.isClient()) {
            return;
        }
        return Camera.currentCamera.positionMode;
    }
    static set cameraLocationMode(newCameraLocationMode) {
        if (!SystemUtil.isClient()) {
            return;
        }
        let tempTransform = Camera.currentCamera.springArm.localTransform;
        Camera.currentCamera.positionMode = newCameraLocationMode;
        if (newCameraLocationMode == CameraPositionMode.PositionFollow) {
            Camera.currentCamera.parent = Player.localPlayer.character;
            Camera.currentCamera.springArm.localTransform = tempTransform;
        }
    }
    static setCameraFollowTarget(target) {
        if (!SystemUtil.isClient()) return;
        Camera.currentCamera.parent = target;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static cancelCameraFollowTarget() {
        if (!SystemUtil.isClient()) return;
        Camera.currentCamera.parent = Player.localPlayer.character;
        Camera.currentCamera.springArm.localTransform = Transform.identity;
    }
    static setOverrideCameraRotation(newOverrideRotation) {
        if (!SystemUtil.isClient()) return;
        ModifiedCameraSystem.followEnable = true;
        ModifiedCameraSystem.followRotationValue = newOverrideRotation;
        Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
        if (!ModifiedCameraSystem.isBind) {
            TimeUtil.onEnterFrame.add((() => {
                if (ModifiedCameraSystem.followEnable) {
                    Player.setControllerRotation(ModifiedCameraSystem.followRotationValue);
                }
            }), this);
            ModifiedCameraSystem.isBind = true;
        }
    }
    static resetOverrideCameraRotation() {
        if (!SystemUtil.isClient()) return;
        ModifiedCameraSystem.followEnable = false;
    }
    static getCurrentSettings() {
        if (!SystemUtil.isClient()) return;
        cameraSystemConfig.cameraRelativeTransform = Camera.currentCamera.localTransform;
        cameraSystemConfig.cameraWorldTransform = Camera.currentCamera.worldTransform;
        cameraSystemConfig.targetArmLength = Camera.currentCamera.springArm.length;
        cameraSystemConfig.enableCameraLocationLag = Camera.currentCamera.positionLagEnabled;
        cameraSystemConfig.cameraLocationLagSpeed = Camera.currentCamera.positionLagSpeed;
        cameraSystemConfig.enableCameraRotationLag = Camera.currentCamera.rotationLagEnabled;
        cameraSystemConfig.cameraRotationLagSpeed = Camera.currentCamera.rotationLagSpeed;
        cameraSystemConfig.cameraFOV = Camera.currentCamera.fov;
        cameraSystemConfig.cameraLocationMode = Camera.currentCamera.positionMode;
        cameraSystemConfig.cameraRotationMode = Camera.currentCamera.rotationMode;
        cameraSystemConfig.enableCameraCollision = Camera.currentCamera.springArm.collisionEnabled;
        cameraSystemConfig.cameraUpLimitAngle = Camera.currentCamera.upAngleLimit;
        cameraSystemConfig.cameraDownLimitAngle = Camera.currentCamera.downAngleLimit;
        return cameraSystemConfig;
    }
    static applySettings(CameraSetting) {
        if (!SystemUtil.isClient()) return;
        Camera.currentCamera.localTransform = CameraSetting.cameraRelativeTransform;
        Camera.currentCamera.springArm.length = CameraSetting.targetArmLength;
        Camera.currentCamera.positionLagEnabled = CameraSetting.enableCameraLocationLag;
        Camera.currentCamera.positionLagSpeed = CameraSetting.cameraLocationLagSpeed;
        Camera.currentCamera.rotationLagEnabled = CameraSetting.enableCameraRotationLag;
        Camera.currentCamera.rotationLagSpeed = CameraSetting.cameraRotationLagSpeed;
        Camera.currentCamera.fov = CameraSetting.cameraFOV;
        ModifiedCameraSystem.cameraLocationMode = CameraSetting.cameraLocationMode;
        Camera.currentCamera.rotationMode = CameraSetting.cameraRotationMode;
        Camera.currentCamera.springArm.collisionEnabled = CameraSetting.enableCameraCollision;
        Camera.currentCamera.upAngleLimit = CameraSetting.cameraUpLimitAngle;
        Camera.currentCamera.downAngleLimit = CameraSetting.cameraDownLimitAngle;
    }
    static cameraFocusing(targetArmLength, targetOffset, timeInterval = 20) {
        if (!SystemUtil.isClient()) return;
        let timer = TimeUtil.onEnterFrame.add((() => {
            let interpolationValue = Camera.currentCamera.springArm.length + (targetArmLength - Camera.currentCamera.springArm.length) / timeInterval;
            Camera.currentCamera.springArm.length = interpolationValue;
            if (Math.abs(Camera.currentCamera.springArm.length - targetArmLength) <= .5) {
                TimeUtil.onEnterFrame.remove(timer);
            }
        }));
    }
    static startCameraShake(shakeData) {
        if (!SystemUtil.isClient()) return;
        let info = {
            rotationYAmplitude: shakeData.rotYawOscillation.amplitude,
            rotationYFrequency: shakeData.rotYawOscillation.frequency,
            rotationZAmplitude: shakeData.rotRollOscillation.amplitude,
            rotationZFrequency: shakeData.rotRollOscillation.frequency,
            rotationXAmplitude: shakeData.rotPitchOscillation.amplitude,
            rotationXFrequency: shakeData.rotPitchOscillation.frequency,
            positionXAmplitude: shakeData.locXOscillation.amplitude,
            positionXFrequency: shakeData.locXOscillation.frequency,
            positionYAmplitude: shakeData.locYOscillation.amplitude,
            positionYFrequency: shakeData.locYOscillation.frequency,
            positionZAmplitude: shakeData.locZOscillation.amplitude,
            positionZFrequency: shakeData.locZOscillation.frequency
        };
        Camera.shake(info);
    }
    static stopCameraShake() {
        if (!SystemUtil.isClient()) return;
        Camera.stopShake();
    }
    static getDefaultCameraShakeData() {
        const defaultOscillator = {
            amplitude: 0,
            frequency: 0,
            waveform: CameraModifid.EOscillatorWaveform.SineWave
        };
        const defaultCameraShakeData = {
            rotPitchOscillation: {
                ...defaultOscillator
            },
            rotYawOscillation: {
                ...defaultOscillator
            },
            rotRollOscillation: {
                ...defaultOscillator
            },
            locXOscillation: {
                ...defaultOscillator
            },
            locYOscillation: {
                ...defaultOscillator
            },
            locZOscillation: {
                ...defaultOscillator
            },
            fovOscillation: {
                ...defaultOscillator
            }
        };
        return defaultCameraShakeData;
    }
}

ModifiedCameraSystem.isBind = false;

ModifiedCameraSystem.followTargetEnable = true;

ModifiedCameraSystem.followTargetInterpSpeed = 15;

var CameraModifid;

(function(CameraModifid) {
    (function(EOscillatorWaveform) {
        EOscillatorWaveform[EOscillatorWaveform["SineWave"] = 0] = "SineWave";
        EOscillatorWaveform[EOscillatorWaveform["PerlinNoise"] = 1] = "PerlinNoise";
    })(CameraModifid.EOscillatorWaveform || (CameraModifid.EOscillatorWaveform = {}));
})(CameraModifid || (CameraModifid = {}));

const cameraSystemConfig = {
    cameraRelativeTransform: Transform.identity,
    cameraWorldTransform: Transform.identity,
    targetArmLength: 400,
    enableCameraLocationLag: false,
    cameraLocationLagSpeed: 10,
    enableCameraRotationLag: false,
    cameraRotationLagSpeed: 10,
    cameraFOV: 90,
    cameraLocationMode: CameraPositionMode.PositionFollow,
    cameraRotationMode: CameraRotationMode.RotationControl,
    enableCameraCollision: true,
    cameraUpLimitAngle: 40,
    cameraDownLimitAngle: -40
};

var foreign20 = Object.freeze({
    __proto__: null,
    get CameraModifid() {
        return CameraModifid;
    },
    ModifiedCameraSystem: ModifiedCameraSystem
});

class PlayerManagerExtesion {
    static init() {
        ModuleService.registerModule(RpcExtesionS, RpcExtesionC, null);
    }
    static isNpc(obj) {
        if (obj instanceof Character && obj.player == null) {
            return true;
        }
        return false;
    }
    static isCharacter(obj) {
        if (obj instanceof Character && obj.player != null) {
            return true;
        }
        return false;
    }
    static isUseRpc(isSync) {
        if (SystemUtil.isServer()) {
            return false;
        } else {
            return isSync;
        }
    }
    static stopStanceExtesion(char, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            char.currentSubStance?.stop();
            return;
        }
        let mtStance = new RpcStance("", char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(char.gameObjectId, mtStance);
    }
    static changeBaseStanceExtesion(char, assetId) {
        if (!this.isUseRpc(true)) {
            char.currentSubStance?.stop();
            let basicStance = char.loadStance(assetId);
            basicStance.play();
        } else {
            let module = ModuleService.getModule(RpcExtesionC);
            module.playBasicStance(char.gameObjectId, assetId);
        }
    }
    static changeStanceExtesion(char, assetId) {
        let sync = true;
        if (!this.isUseRpc(sync)) {
            if (assetId == "") {
                char.currentSubStance?.stop();
                return;
            }
            char.loadSubStance(assetId).play();
            return;
        }
        let mtStance = new RpcStance(assetId, char);
        let module = ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(char.gameObjectId, mtStance);
    }
    static loadStanceExtesion(char, assetId, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadSubStance(assetId);
        }
        sync = sync == undefined ? true : sync;
        const stance = new RpcStance(assetId, char);
        return stance;
    }
    static rpcPlayAnimation(owner, assetId, loop = 1, speed = 1) {
        let ani = this.loadAnimationExtesion(owner, assetId);
        ani.loop = loop;
        ani.speed = speed;
        ani.play();
        return ani;
    }
    static rpcStopAnimation(owner, assetId) {
        if (!this.isUseRpc(true)) {
            if (owner.currentAnimation && owner.currentAnimation.assetId == assetId) owner.currentAnimation.stop();
            return;
        }
        if (owner.currentAnimation && owner.currentAnimation.assetId == assetId) owner.currentAnimation.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(owner.gameObjectId, assetId);
    }
    static playAnimationLocally(owner, assetId, speed, loop) {
        if (owner === undefined || owner === null) return;
        let anim = owner.loadAnimation(assetId);
        anim.loop = loop;
        anim.speed = speed;
        anim.play();
        return anim;
    }
    static loadAnimationExtesion(char, assetid, sync) {
        sync = sync === undefined ? true : sync;
        if (!this.isUseRpc(sync)) {
            return char.loadAnimation(assetid);
        }
        const anim = new RpcAnimation(char, assetid);
        return anim;
    }
}

class RpcExtesionC extends ModuleC {
    constructor() {
        super(...arguments);
        this.syncAnimation = null;
    }
    net_playerJoin(playerId) {
        if (this.localPlayerId == playerId) return;
        let char = this.localPlayer.character;
        let curAnimation = char.currentAnimation;
        if (!curAnimation) return;
        let ani = this.syncAnimation;
        if (ani && curAnimation.assetId == ani.assetId && ani.isPlaying) {
            this.server.net_playAnimationSync(char.gameObjectId, ani.assetId, ani.speed, ani.loop, ani.slot, playerId);
        }
    }
    playAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = myAnimation;
        }
        this.server.net_playAnimationSync(charGuid, myAnimation.assetId, myAnimation.speed, myAnimation.loop, myAnimation.slot);
    }
    pauseAnimationSync(charGuid, myAnimation) {
        this.server.net_pauseAnimationSync(charGuid, myAnimation.assetId);
    }
    resumeAnimationSync(charGuid, myAnimation) {
        this.server.net_resumeAnimationSync(charGuid, myAnimation.assetId);
    }
    stopAnimationSync(charGuid, myAnimation) {
        if (charGuid == this.localPlayer.character.gameObjectId) {
            this.syncAnimation = null;
        }
        let assetId = typeof myAnimation == "string" ? myAnimation : myAnimation.assetId;
        this.server.net_stopAnimationSync(charGuid, assetId);
    }
    playBasicStance(charGuid, basicStance) {
        this.server.net_playBasicStance(charGuid, basicStance);
    }
    playStanceSync(charGuid, myStance) {
        this.server.net_playStanceSync(charGuid, myStance.assetId, myStance.blendMode);
    }
    stopStanceSync(charGuid, stance) {
        this.server.net_stopStanceSync(charGuid, stance.assetId);
    }
    net_playAnimation(charGuid, assetId, rate, loop, slot) {
        if (charGuid == this.localPlayer.character.gameObjectId) return;
        RpcAnimation.playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId) return;
        RpcAnimation.pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId) return;
        RpcAnimation.resumeAnimation(charGuid, assetId);
    }
    net_stopAnimation(charGuid, assetId) {
        if (charGuid == this.localPlayer.character.gameObjectId) return;
        RpcAnimation.stopAnimation(charGuid, assetId);
    }
}

class RpcExtesionS extends ModuleS {
    async net_playBasicStance(charGuid, basicStance) {
        let char = await GameObject.asyncFindGameObjectById(charGuid);
        char.loadStance(basicStance).play();
    }
    net_playAnimationSync(charGuid, assetId, rate, loop, slot, playerId = 0) {
        if (playerId != 0) {
            this.getClient(playerId).net_playAnimation(charGuid, assetId, rate, loop, slot);
            return;
        }
        this.getAllClient().net_playAnimation(charGuid, assetId, rate, loop, slot);
    }
    net_pauseAnimationSync(charGuid, assetId) {
        this.getAllClient().net_pauseAnimation(charGuid, assetId);
    }
    net_resumeAnimationSync(charGuid, assetId) {
        this.getAllClient().net_resumeAnimation(charGuid, assetId);
    }
    net_stopAnimationSync(charGuid, assetId) {
        this.getAllClient().net_stopAnimation(charGuid, assetId);
    }
    playStanceSync(charGuid, mystance) {
        RpcStance.playStance(charGuid, mystance.assetId, mystance.blendMode);
    }
    net_stopStanceSync(charGuid, assetId) {
        RpcStance.stopStance(charGuid, assetId);
    }
    stopStanceSync(charGuid, stance) {
        RpcStance.stopStance(charGuid, stance.assetId);
    }
    net_playStanceSync(charGuid, assetid, blendMode) {
        RpcStance.playStance(charGuid, assetid, blendMode);
    }
    onPlayerEnterGame(player) {
        this.getAllClient().net_playerJoin(player.playerId);
    }
}

class RpcAnimation {
    constructor(char, assetId) {
        this.ani = null;
        this.assetId = null;
        this.owner = null;
        this._loop = 1;
        this._speed = 1;
        this._slot = mw.AnimSlot.Default;
        this.owner = char;
        this.assetId = assetId;
        this.ani = char.loadAnimation(assetId);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        this.ani.loop = value;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
        this.ani.speed = value;
    }
    get slot() {
        return this._slot;
    }
    set slot(value) {
        this._slot = value;
        this.ani.slot = value;
    }
    get length() {
        return this.ani.length;
    }
    get isPlaying() {
        return this.ani.isPlaying;
    }
    get onFinish() {
        return this.ani.onFinish;
    }
    play() {
        this.ani?.play();
        let module = ModuleService.getModule(RpcExtesionC);
        module.playAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    pause() {
        this.ani?.pause();
        let module = ModuleService.getModule(RpcExtesionC);
        module.pauseAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    resume() {
        this.ani?.resume();
        let module = ModuleService.getModule(RpcExtesionC);
        module.resumeAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        this.ani?.stop();
        let module = ModuleService.getModule(RpcExtesionC);
        module.stopAnimationSync(this.owner.gameObjectId, this);
        return true;
    }
    static playAnimation(guid, assetid, speed, loop, slot) {
        let char = Character.findGameObjectById(guid);
        if (!char) return;
        let anim = char.loadAnimation(assetid);
        anim.loop = loop;
        anim.speed = speed;
        anim.slot = slot;
        anim.play();
        return anim;
    }
    static pauseAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char) return;
        let anim = char.currentAnimation;
        if (!anim) return;
        anim.pause();
    }
    static resumeAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char) return;
        let anim = char.currentAnimation;
        if (!anim) return;
        anim.resume();
    }
    static stopAnimation(guid, assetId) {
        let char = Character.findGameObjectById(guid);
        if (!char) return;
        let anim = char.currentAnimation;
        if (!anim) return;
        anim.stop();
    }
}

class RpcStance {
    constructor(assetId, owner) {
        this.assetId = null;
        this.owner = null;
        this.blendMode = null;
        this.assetId = assetId;
        this.owner = owner;
    }
    play() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.playStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    stop() {
        let module = SystemUtil.isServer() ? ModuleService.getModule(RpcExtesionS) : ModuleService.getModule(RpcExtesionC);
        module.stopStanceSync(this.owner.gameObjectId, this);
        return true;
    }
    static playStance(charGuid, assetId, blendMode) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char) return;
        if (assetId == "") {
            char.currentSubStance?.stop();
            return;
        }
        let stance = char.loadSubStance(assetId);
        if (blendMode != null) stance.blendMode = blendMode;
        stance.play();
    }
    static stopStance(charGuid, assetId) {
        let char = GameObject.findGameObjectById(charGuid);
        if (!char) return;
        let currentStance = char.currentSubStance;
        if (currentStance && (currentStance.assetId == assetId || assetId == "")) {
            currentStance.stop();
        }
    }
}

PlayerManagerExtesion.init();

var foreign21 = Object.freeze({
    __proto__: null,
    PlayerManagerExtesion: PlayerManagerExtesion
});

let CubeLifebar_Generate = class CubeLifebar_Generate extends UIScript {
    get mLifebarProgressBar() {
        if (!this.mLifebarProgressBar_Internal && this.uiWidgetBase) {
            this.mLifebarProgressBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mLifebarProgressBar");
        }
        return this.mLifebarProgressBar_Internal;
    }
    get mHpTextBlock() {
        if (!this.mHpTextBlock_Internal && this.uiWidgetBase) {
            this.mHpTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mHpTextBlock");
        }
        return this.mHpTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.mHpTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

CubeLifebar_Generate = __decorate([ UIBind("UI/Enemy/CubeLifebar.ui") ], CubeLifebar_Generate);

var CubeLifebar_Generate$1 = CubeLifebar_Generate;

var foreign75 = Object.freeze({
    __proto__: null,
    default: CubeLifebar_Generate$1
});

let Boss = class Boss extends Script {
    constructor() {
        super(...arguments);
        this.bossScale = 1;
        this.maxHp = 100;
        this.gunIndex = 1;
        this.curHp = 0;
        this.pathVector = [ mw.Vector.zero ];
        this.moveSpeed = 100;
        this.explosionEffect = "27422";
        this.respawnTime = 5;
        this.respawnEffect = "142750";
        this.boss = null;
        this.cubeLifebar = null;
        this.cubeLifebarWidget = null;
        this.isInitLifebar = false;
        this.fireEffect = null;
        this.preHp = 0;
        this.playerModuleS = null;
        this.frameCount = 0;
        this.maxFrameCount = 1;
        this.index = 0;
        this.pathFlag = true;
        this.curBossDir = mw.Vector.zero;
        this.targetPos = mw.Vector.zero;
        this.targetDistance = 0;
    }
    onStart() {
        this.onStartCS();
    }
    async onStartCS() {
        await ModuleService.ready();
        this.boss = this.gameObject;
        await this.boss.asyncReady();
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        } else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }
    onUpdate(dt) {
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        } else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }
    onStartC() {
        this.useUpdate = false;
        this.initDataC();
        UIService.getUI(RadarUI).setCharacterPoint(this.boss);
    }
    initDataC() {
        this.preHp = Math.floor(this.maxHp);
        this.initLifebar();
        if (this.gunIndex > 0) this.initGun();
    }
    async initLifebar() {
        this.cubeLifebar = UIService.create(CubeLifebar_Generate$1);
        this.cubeLifebarWidget = await mw.GameObject.asyncSpawn("UIWidget", {
            replicates: false
        });
        this.cubeLifebarWidget.setTargetUIWidget(this.cubeLifebar.uiWidgetBase);
        this.cubeLifebarWidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        let boss = this.gameObject;
        boss.attachToSlot(this.cubeLifebarWidget, mw.HumanoidSlotType.Rings);
        this.cubeLifebarWidget.occlusionEnable = false;
        this.cubeLifebarWidget.scaledByDistanceEnable = true;
        this.cubeLifebarWidget.hideByDistanceEnable = true;
        this.cubeLifebarWidget.headUIMaxVisibleDistance = 1e4;
        this.isInitLifebar = true;
        this.onHpChanged();
    }
    async initGun() {
        let bossGun = await mw.GameObject.asyncSpawn(Utils.bossGuns[this.gunIndex - 1]);
        this.boss.attachToSlot(bossGun, mw.HumanoidSlotType.RightHand);
        this.boss.loadSubStance("94261").play();
        this.fireEffect = await mw.GameObject.asyncSpawn(Utils.bossFireEffects[this.gunIndex - 1]);
        this.fireEffect.loopCount = 0;
        this.fireEffect.parent = bossGun;
        this.fireEffect.localTransform.position = Utils.bossFireEffectOffsets[this.gunIndex - 1];
        this.fireEffect.localTransform.rotation = mw.Rotation.zero;
    }
    setGunState(isFire) {
        try {
            if (this.fireEffect) {
                isFire ? this.fireEffect.play() : this.fireEffect.stop();
            }
        } catch (error) {
            Console.error(error);
        }
    }
    onUpdateC(dt) {}
    onHpChanged() {
        if (!this.isInitLifebar) return;
        Console.error("onHpChanged = " + this.curHp);
        if (this.preHp <= 0) this.preHp = Math.floor(this.maxHp);
        let damage = this.preHp - this.curHp;
        if (damage > 0) this.preHp = this.curHp;
        this.cubeLifebar.mLifebarProgressBar.percent = this.curHp / this.maxHp;
        this.cubeLifebar.mHpTextBlock.text = `${Math.floor(this.curHp)}/${Math.floor(this.maxHp)}`;
        if (this.curHp <= 0) {
            if (this.cubeLifebarWidget.getVisibility()) {
                this.cubeLifebarWidget.setVisibility(false);
                this.setGunState(false);
            }
        } else if (this.curHp >= this.maxHp) {
            if (!this.cubeLifebarWidget.getVisibility()) {
                this.cubeLifebarWidget.setVisibility(true);
                this.setGunState(true);
            }
        }
    }
    get getPlayerModuleS() {
        if (this.playerModuleS == null) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }
    onStartS() {
        this.useUpdate = true;
        this.initDataS();
        this.initMove();
        this.bindEventS();
    }
    async initDataS() {
        this.maxHp = Math.floor(this.maxHp);
        this.curHp = this.maxHp;
        this.boss.displayName = "";
        let bossDes = this.bossScale == 1 ? Utils.getRole() : Utils.getBoss();
        await Utils.asyncDownloadAsset(bossDes);
        this.boss.setDescription([ bossDes ]);
    }
    bindEventS() {
        PrefabEvent.PrefabEvtFight.onHit(this.playerAtkEnemyS.bind(this));
    }
    playerAtkEnemyS(senderGuid, targetGuid, damage, hitPoint) {
        Console.error("Enemy_Cube onHit this.gameObject.gameObjectId = " + this.gameObject.gameObjectId + "。targetGuid = " + targetGuid + "。damage = " + damage + "。");
        if (this.gameObject.gameObjectId != targetGuid) return;
        if (this.curHp <= 0) return;
        let tmpHp = this.curHp - damage;
        if (tmpHp >= 0) {
            this.curHp = tmpHp;
        } else {
            this.curHp = 0;
        }
        if (this.curHp <= 0) {
            this.dieS();
            if (Helper.playerMap.has(senderGuid)) this.getPlayerModuleS.playerKillEnemy(Helper.playerMap.get(senderGuid), this.maxHp == 100 ? 1 : 5, false);
            TimeUtil.delaySecond(this.respawnTime).then((() => {
                this.curHp = this.maxHp;
                this.respawnS();
            }));
        }
        Console.error("curHp = " + this.curHp);
        if (Helper.playerMap.has(senderGuid)) this.getPlayerModuleS.playerAtkEnemyFlyText(Helper.playerMap.get(senderGuid), hitPoint, damage);
    }
    dieS() {
        this.setVisibilityS(false);
        EffectService.playAtPosition(this.explosionEffect, this.gameObject.worldTransform.position, {
            scale: mw.Vector.one.multiply(1)
        });
    }
    async respawnS() {
        let bossDes = this.bossScale == 1 ? Utils.getRole() : Utils.getBoss();
        await Utils.asyncDownloadAsset(bossDes);
        this.boss.setDescription([ bossDes ]);
        this.setVisibilityS(true);
        EffectService.playAtPosition(this.respawnEffect, this.gameObject.worldTransform.position, {
            scale: mw.Vector.one.multiply(1)
        });
    }
    setVisibilityS(isVisibility) {
        this.boss.ragdollEnabled = !isVisibility;
        this.useUpdate = isVisibility;
    }
    initMove() {
        this.targetPos = this.pathVector[this.index];
        this.boss.maxWalkSpeed = this.moveSpeed;
    }
    onUpdateS(dt) {
        this.frameCount++;
        if (this.frameCount < this.maxFrameCount) return;
        this.frameCount = 0;
        this.updateMove();
    }
    updateMove() {
        if (!this.pathVector || this.pathVector.length == 0) return;
        this.curBossDir = this.targetPos.clone().add(this.targetPos.clone().subtract(this.boss.worldTransform.position.clone()));
        this.boss.lookAt(this.curBossDir);
        this.boss.addMovement(mw.Vector.forward);
        this.targetDistance = Math.sqrt(Math.pow(this.boss.worldTransform.position.x - this.pathVector[this.index].x, 2) + Math.pow(this.boss.worldTransform.position.y - this.pathVector[this.index].y, 2));
        if (this.targetDistance > 50) return;
        if (this.pathFlag && this.index < this.pathVector.length - 1) {
            this.index++;
            if (this.index == this.pathVector.length - 1) this.pathFlag = false;
        } else if (!this.pathFlag && this.index > 0) {
            this.index--;
            if (this.index == 0) this.pathFlag = true;
        }
        this.targetPos = this.pathVector[this.index];
    }
    onDestroy() {}
};

__decorate([ mw.Property({
    displayName: "体型大小",
    group: "设置属性",
    range: {
        min: 1,
        max: 5,
        showSlider: true
    }
}) ], Boss.prototype, "bossScale", void 0);

__decorate([ mw.Property({
    displayName: "血量",
    group: "设置属性",
    tooltip: "血量",
    range: {
        min: 100,
        max: 1e5,
        showSlider: true
    }
}) ], Boss.prototype, "maxHp", void 0);

__decorate([ mw.Property({
    displayName: "枪索引（1-5）",
    group: "设置属性"
}) ], Boss.prototype, "gunIndex", void 0);

__decorate([ mw.Property({
    displayName: "当前剩余血量",
    group: "设置属性",
    tooltip: "当前剩余血量",
    replicated: true,
    onChanged: "onHpChanged"
}) ], Boss.prototype, "curHp", void 0);

__decorate([ mw.Property({
    displayName: "路径",
    group: "设置属性",
    tooltip: "路径"
}) ], Boss.prototype, "pathVector", void 0);

__decorate([ mw.Property({
    displayName: "移动速度",
    group: "设置属性",
    tooltip: "移动速度",
    range: {
        min: 100,
        max: 1e3,
        showSlider: true
    }
}) ], Boss.prototype, "moveSpeed", void 0);

__decorate([ mw.Property({
    displayName: "爆炸特效",
    group: "设置属性",
    tooltip: "爆炸特效"
}) ], Boss.prototype, "explosionEffect", void 0);

__decorate([ mw.Property({
    displayName: "重生时间",
    group: "设置属性",
    tooltip: "重生时间",
    range: {
        min: 5,
        max: 60,
        showSlider: true
    }
}) ], Boss.prototype, "respawnTime", void 0);

__decorate([ mw.Property({
    displayName: "重生特效",
    group: "设置属性",
    tooltip: "重生特效"
}) ], Boss.prototype, "respawnEffect", void 0);

Boss = __decorate([ Component ], Boss);

var Boss$1 = Boss;

var foreign27 = Object.freeze({
    __proto__: null,
    default: Boss$1
});

var AtkType;

(function(AtkType) {
    AtkType[AtkType["Melee"] = 1] = "Melee";
    AtkType[AtkType["Remote"] = 2] = "Remote";
})(AtkType || (AtkType = {}));

let Enemy_Cube = class Enemy_Cube extends Script {
    constructor() {
        super(...arguments);
        this.atkType = AtkType.Melee;
        this.maxHp = 100;
        this.atk = 10;
        this.atkTime = 5;
        this.explosionEffect = "57200";
        this.respawnTime = 5;
        this.respawnEffect = "142750";
        this.atkRandom = 100;
        this.atkEffect = "89081";
        this.atkCharacterSound = "180595";
        this.bulletPrefab = "B5EC5B66473AD73B9481C6ADFE757DDA";
        this.bulletOffset = 100;
        this.speed = 100;
        this.bulletEffect = "27428";
        this.bulletEffectScale = mw.Vector.one;
        this.bulletExplosionEffect = "27421";
        this.bulletExplosionEffectScale = mw.Vector.one;
        this.fireSound = "208166";
        this.hitCharacterSound = "135752";
        this.hitOtherSound = "208026";
        this.curHp = 0;
        this.cubeLifebar = null;
        this.cubeLifebarWidget = null;
        this.isInitLifebar = false;
        this.radarUI = null;
        this.preHp = 0;
        this.atkTimer = 0;
        this.playerModuleS = null;
    }
    onStart() {
        this.onStartCS();
    }
    async onStartCS() {
        await ModuleService.ready();
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        } else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }
    onUpdate(dt) {
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        } else if (mw.SystemUtil.isServer()) ;
    }
    onStartC() {
        this.useUpdate = false;
        this.initDataC();
    }
    initDataC() {
        this.preHp = Math.floor(this.maxHp);
        this.initLifebar();
        this.radarUI = UIService.getUI(RadarUI);
        this.radarUI.setEnemyPoint(this.gameObject.worldTransform.position, this.gameObject.gameObjectId);
    }
    async initLifebar() {
        this.cubeLifebar = UIService.create(CubeLifebar_Generate$1);
        this.cubeLifebarWidget = await mw.GameObject.asyncSpawn("UIWidget", {
            replicates: false
        });
        this.cubeLifebarWidget.setTargetUIWidget(this.cubeLifebar.uiWidgetBase);
        this.cubeLifebarWidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        this.cubeLifebarWidget.parent = this.gameObject;
        this.cubeLifebarWidget.localTransform.position = mw.Vector.up.multiply(this.gameObject.getBoundingBoxExtent().z / 2);
        this.cubeLifebarWidget.occlusionEnable = false;
        this.cubeLifebarWidget.scaledByDistanceEnable = true;
        this.cubeLifebarWidget.hideByDistanceEnable = true;
        this.cubeLifebarWidget.headUIMaxVisibleDistance = 1e4;
        this.isInitLifebar = true;
        this.onHpChanged();
    }
    onUpdateC(dt) {}
    onHpChanged() {
        if (!this.isInitLifebar) return;
        Console.error("onHpChanged = " + this.curHp);
        if (this.preHp <= 0) this.preHp = Math.floor(this.maxHp);
        let damage = this.preHp - this.curHp;
        if (damage > 0) this.preHp = this.curHp;
        this.cubeLifebar.mLifebarProgressBar.percent = this.curHp / this.maxHp;
        this.cubeLifebar.mHpTextBlock.text = `${Math.floor(this.curHp)}/${Math.floor(this.maxHp)}`;
        if (this.curHp <= 0) {
            if (this.cubeLifebarWidget.getVisibility()) this.cubeLifebarWidget.setVisibility(false);
            if (this.cubeLifebarWidget.getVisibility()) {
                this.cubeLifebarWidget.setVisibility(false);
                this.radarUI.setEnemyState(this.gameObject.gameObjectId, true);
            }
        } else if (this.curHp >= this.maxHp) {
            if (!this.cubeLifebarWidget.getVisibility()) this.cubeLifebarWidget.setVisibility(true);
            if (!this.cubeLifebarWidget.getVisibility()) {
                this.cubeLifebarWidget.setVisibility(true);
                this.radarUI.setEnemyState(this.gameObject.gameObjectId, false);
            }
        }
    }
    get getPlayerModuleS() {
        if (this.playerModuleS == null) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }
    onStartS() {
        this.useUpdate = true;
        this.initDataS();
        this.bindEventS();
    }
    initDataS() {
        this.maxHp = Math.floor(this.maxHp);
        this.curHp = this.maxHp;
    }
    bindEventS() {
        PrefabEvent.PrefabEvtFight.onHit(this.playerAtkEnemyS.bind(this));
    }
    playerAtkEnemyS(senderGuid, targetGuid, damage, hitPoint) {
        Console.error("Enemy_Cube onHit this.gameObject.gameObjectId = " + this.gameObject.gameObjectId + "。targetGuid = " + targetGuid + "。damage = " + damage + "。");
        if (this.gameObject.gameObjectId != targetGuid) return;
        if (this.curHp <= 0) return;
        let tmpHp = this.curHp - damage;
        if (tmpHp >= 0) {
            this.curHp = tmpHp;
        } else {
            this.curHp = 0;
        }
        if (this.curHp <= 0) {
            this.setAttackStateS(false);
            this.dieS();
            if (Helper.playerMap.has(senderGuid)) this.getPlayerModuleS.playerKillEnemy(Helper.playerMap.get(senderGuid), 5, false);
            TimeUtil.delaySecond(this.respawnTime).then((() => {
                this.setAttackStateS(true);
                this.curHp = this.maxHp;
                this.respawnS();
            }));
        }
        Console.error("curHp = " + this.curHp);
        if (Helper.playerMap.has(senderGuid)) this.getPlayerModuleS.playerAtkEnemyFlyText(Helper.playerMap.get(senderGuid), hitPoint, damage);
    }
    dieS() {
        this.setVisibilityS(false);
        EffectService.playAtPosition(this.explosionEffect, this.gameObject.worldTransform.position, {
            scale: mw.Vector.one.multiply(1)
        });
    }
    respawnS() {
        this.setVisibilityS(true);
        EffectService.playAtPosition(this.respawnEffect, this.gameObject.worldTransform.position, {
            scale: mw.Vector.one.multiply(1)
        });
    }
    setAttackStateS(isCanAtk) {
        if (isCanAtk) this.atkTimer = 0;
        this.useUpdate = isCanAtk;
    }
    setVisibilityS(isVisibility) {
        this.gameObject.setVisibility(isVisibility, true);
        this.gameObject.setCollision(isVisibility ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }
    attackS() {
        if (this.atkType == AtkType.Melee) {
            this.meleeAttackS();
        } else if (this.atkType == AtkType.Remote) {
            this.remoteAttackS();
        }
    }
    meleeAttackS() {
        let targets = this.circleCheckS();
        if (targets == null || targets == undefined || targets.length == 0) return;
        let gameObjectIds = [];
        for (let i = 0; i < targets.length; ++i) {
            let target = targets[i];
            if (target == null || target == undefined || !(target instanceof mw.Character)) continue;
            gameObjectIds.push(target.gameObjectId);
        }
        if (gameObjectIds == null || gameObjectIds.length == 0) return;
        this.getPlayerModuleS.enemyAtkPlayer(gameObjectIds, this.atk);
        SoundService.play3DSound(this.atkCharacterSound, this.gameObject, 1, 1);
    }
    circleCheckS() {
        EffectService.playOnGameObject(this.atkEffect, this.gameObject, {
            loopCount: 1,
            position: mw.Vector.zero,
            scale: mw.Vector.one.multiply(1)
        });
        return QueryUtil.sphereOverlap(this.gameObject.worldTransform.position, this.atkRandom, false, [ this.gameObject.gameObjectId ]);
    }
    async remoteAttackS() {
        if (this.randomValueS(1, 10) <= 8) {
            Console.error("1-8");
            await this.fireS(Helper.getRangePoint(this.gameObject.worldTransform.position, this.bulletOffset));
        } else {
            Console.error("9-10");
            let points = [];
            if (this.randomValueS(1, 10) <= 6) {
                Console.error("1-6");
                let angles = this.randomAngleS();
                points = Helper.getArcPoints(this.gameObject.worldTransform.position, this.bulletOffset, this.randomValueS(3, 10), angles[0], angles[1]);
            } else {
                Console.error("7-10");
                points = Helper.getCirclePoints(this.gameObject.worldTransform.position, this.bulletOffset, this.randomValueS(10, 20));
            }
            let delaySecond = this.randomValueS(0, 1);
            for (let i = 0; i < points.length; ++i) {
                await new Promise((resolve => {
                    setTimeout((async () => {
                        await this.fireS(points[i]);
                        return resolve();
                    }), delaySecond * 200);
                }));
            }
        }
        Console.error("Helper.inactiveBullets.length = " + Helper.inactiveBullets.length);
        Console.error("Helper.activeBulletMap.size = " + Helper.activeBulletMap.size);
    }
    async fireS(originBulletLoc) {
        let enemyBullet = null;
        if (Helper.inactiveBullets.length > 0) {
            enemyBullet = Helper.inactiveBullets.shift();
            enemyBullet.activeS(this.atk, originBulletLoc, this.speed);
        } else {
            enemyBullet = await this.spawnBulletS();
            enemyBullet.initS(this.gameObject, originBulletLoc, this.atk, this.speed, this.bulletEffect, this.bulletEffectScale, this.bulletExplosionEffect, this.bulletExplosionEffectScale, this.fireSound, this.hitCharacterSound, this.hitOtherSound);
        }
        Helper.activeBulletMap.set(enemyBullet.guid, enemyBullet);
    }
    async spawnBulletS() {
        let bullet = await mw.GameObject.asyncSpawn(this.bulletPrefab, {
            replicates: true
        });
        return bullet.getScripts()[0];
    }
    randomValueS(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    randomAngleS() {
        let angle1 = this.randomValueS(0, 360);
        let offAngle = this.randomValueS(90, 180);
        let angle2 = angle1 + offAngle;
        if (angle2 > 360) {
            angle2 = angle2 - offAngle * 2;
        }
        if (angle1 > angle2) {
            let tmp = angle1;
            angle1 = angle2;
            angle2 = tmp;
        }
        return [ angle1, angle2 ];
    }
    onDestroy() {}
};

__decorate([ mw.Property({
    displayName: "攻击类型",
    group: "共同属性",
    tooltip: "攻击类型",
    enumType: AtkType
}) ], Enemy_Cube.prototype, "atkType", void 0);

__decorate([ mw.Property({
    displayName: "血量",
    group: "共同属性",
    tooltip: "血量",
    range: {
        min: 100,
        max: 1e4,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "maxHp", void 0);

__decorate([ mw.Property({
    displayName: "攻击力",
    group: "共同属性",
    tooltip: "攻击力",
    range: {
        min: 10,
        max: 100,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "atk", void 0);

__decorate([ mw.Property({
    displayName: "攻击时间",
    group: "共同属性",
    tooltip: "攻击时间",
    range: {
        min: 1,
        max: 100,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "atkTime", void 0);

__decorate([ mw.Property({
    displayName: "爆炸特效",
    group: "共同属性",
    tooltip: "爆炸特效"
}) ], Enemy_Cube.prototype, "explosionEffect", void 0);

__decorate([ mw.Property({
    displayName: "重生时间",
    group: "共同属性",
    tooltip: "重生时间",
    range: {
        min: 5,
        max: 60,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "respawnTime", void 0);

__decorate([ mw.Property({
    displayName: "重生特效",
    group: "共同属性",
    tooltip: "重生特效"
}) ], Enemy_Cube.prototype, "respawnEffect", void 0);

__decorate([ mw.Property({
    displayName: "攻击范围",
    group: "近战攻击",
    tooltip: "近战攻击",
    range: {
        min: 100,
        max: 1e3,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "atkRandom", void 0);

__decorate([ mw.Property({
    displayName: "攻击特效",
    group: "近战攻击",
    tooltip: "攻击特效"
}) ], Enemy_Cube.prototype, "atkEffect", void 0);

__decorate([ mw.Property({
    displayName: "击中角色音效",
    group: "近战攻击",
    tooltip: "击中角色音效"
}) ], Enemy_Cube.prototype, "atkCharacterSound", void 0);

__decorate([ mw.Property({
    displayName: "子弹预制体",
    group: "远程攻击",
    tooltip: "子弹预制体"
}) ], Enemy_Cube.prototype, "bulletPrefab", void 0);

__decorate([ mw.Property({
    displayName: "子弹生成位置偏移",
    group: "远程攻击",
    tooltip: "子弹生成位置偏移",
    range: {
        min: 100,
        max: 500,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "bulletOffset", void 0);

__decorate([ mw.Property({
    displayName: "子弹速度",
    group: "远程攻击",
    tooltip: "远程攻击",
    range: {
        min: 100,
        max: 1e3,
        showSlider: true
    }
}) ], Enemy_Cube.prototype, "speed", void 0);

__decorate([ mw.Property({
    displayName: "子弹特效",
    group: "远程攻击",
    tooltip: "子弹特效"
}) ], Enemy_Cube.prototype, "bulletEffect", void 0);

__decorate([ mw.Property({
    displayName: "子弹特效缩放",
    group: "远程攻击",
    tooltip: "子弹特效缩放"
}) ], Enemy_Cube.prototype, "bulletEffectScale", void 0);

__decorate([ mw.Property({
    displayName: "子弹爆炸特效",
    group: "远程攻击",
    tooltip: "子弹爆炸特效"
}) ], Enemy_Cube.prototype, "bulletExplosionEffect", void 0);

__decorate([ mw.Property({
    displayName: "子弹爆炸特效缩放",
    group: "远程攻击",
    tooltip: "子弹爆炸特效缩放"
}) ], Enemy_Cube.prototype, "bulletExplosionEffectScale", void 0);

__decorate([ mw.Property({
    displayName: "开火音效",
    group: "远程攻击",
    tooltip: "开火音效"
}) ], Enemy_Cube.prototype, "fireSound", void 0);

__decorate([ mw.Property({
    displayName: "击中角色音效",
    group: "远程攻击",
    tooltip: "击中角色音效"
}) ], Enemy_Cube.prototype, "hitCharacterSound", void 0);

__decorate([ mw.Property({
    displayName: "击中其他音效",
    group: "远程攻击",
    tooltip: "击中其他音效"
}) ], Enemy_Cube.prototype, "hitOtherSound", void 0);

__decorate([ mw.Property({
    displayName: "当前剩余血量",
    group: "属性同步S->C",
    tooltip: "当前剩余血量",
    replicated: true,
    onChanged: "onHpChanged"
}) ], Enemy_Cube.prototype, "curHp", void 0);

Enemy_Cube = __decorate([ Component ], Enemy_Cube);

var Enemy_Cube$1 = Enemy_Cube;

var foreign28 = Object.freeze({
    __proto__: null,
    get AtkType() {
        return AtkType;
    },
    default: Enemy_Cube$1
});

let EnemyBullet = class EnemyBullet extends Script {
    constructor() {
        super(...arguments);
        this.playerModuleS = null;
        this.trigger = null;
        this.hitSound = "";
        this.stride = mw.Vector.zero;
        this.currentLocation = mw.Vector.zero;
        this.targetDir = mw.Vector.zero;
        this.originBulletLoc = mw.Vector.zero;
        this.enemyLoc = mw.Vector.zero;
        this.enemy = null;
        this.atk = 0;
        this.speed = 0;
        this.bulletEffect = "";
        this.bulletExplosionEffect = "";
        this.bulletEffectScale = mw.Vector.one;
        this.bulletExplosionEffectScale = mw.Vector.one;
        this.fireSound = "";
        this.hitCharacterSound = "";
        this.hitOtherSound = "";
        this.recycleTimeOutId = null;
        this.bulletEffectId = null;
        this.bulletExplosoinEffectId = null;
    }
    onStart() {
        if (mw.SystemUtil.isClient()) {
            this.onStartC();
        } else if (mw.SystemUtil.isServer()) {
            this.onStartS();
        }
    }
    onUpdate(dt) {
        if (mw.SystemUtil.isClient()) {
            this.onUpdateC(dt);
        } else if (mw.SystemUtil.isServer()) {
            this.onUpdateS(dt);
        }
    }
    onStartC() {
        this.useUpdate = false;
    }
    initEffectC() {}
    onUpdateC(dt) {}
    get getPlayerModuleS() {
        if (this.playerModuleS == null) {
            this.playerModuleS = ModuleService.getModule(PlayerModuleS);
        }
        return this.playerModuleS;
    }
    onStartS() {
        this.useUpdate = true;
        this.initTriggerS();
    }
    initTriggerS() {
        this.trigger = this.gameObject.getChildByName("mBulletTrigger");
        if (!this.trigger) return;
        this.trigger.onEnter.add(this.onTriggerEnterS.bind(this));
    }
    onTriggerEnterS(other) {
        if (other.tag == "self" || other.tag == "bullet") return;
        this.reclcleS();
        this.hitSound = this.hitOtherSound;
        if (other instanceof mw.Character) {
            this.hitSound = this.hitCharacterSound;
            this.getPlayerModuleS.enemyAtkPlayer([ other.gameObjectId ], this.atk);
        }
        this.play3DSound(this.hitSound);
    }
    onUpdateS(dt) {
        this.stride = mw.Vector.multiply(this.targetDir, dt, this.stride);
        this.currentLocation.x += this.stride.x;
        this.currentLocation.y += this.stride.y;
        this.currentLocation.z += this.stride.z;
        this.gameObject.worldTransform.position = this.currentLocation;
    }
    fireS() {
        this.currentLocation = this.originBulletLoc.clone();
        let tmpEnemyLoc = this.enemy.worldTransform.position;
        this.enemyLoc = new mw.Vector(tmpEnemyLoc.x, tmpEnemyLoc.y, tmpEnemyLoc.z + 100);
        this.targetDir = new mw.Vector(this.currentLocation.x - this.enemyLoc.x, this.currentLocation.y - this.enemyLoc.y, this.currentLocation.z - this.enemyLoc.z).normalized;
        this.targetDir = this.targetDir.multiply(this.speed);
        this.useUpdate = true;
        this.playBulletEffectS(this.bulletEffect, this.bulletEffectScale);
        this.play3DSound(this.fireSound);
    }
    initS(enemy, originBulletLoc, atk, speed, bulletEffect, bulletEffectScale, bulletExplosionEffect, bulletExplosionEffectScale, fireSound, hitCharacterSound, hitOtherSound) {
        this.enemy = enemy;
        this.originBulletLoc = originBulletLoc;
        this.atk = atk;
        this.speed = speed;
        this.bulletEffect = bulletEffect;
        this.bulletEffectScale = bulletEffectScale;
        this.bulletExplosionEffect = bulletExplosionEffect;
        this.bulletExplosionEffectScale = bulletExplosionEffectScale;
        this.fireSound = fireSound;
        this.hitCharacterSound = hitCharacterSound;
        this.hitOtherSound = hitOtherSound;
        this.prepareFireS();
    }
    activeS(atk, originBulletLoc, speed) {
        this.atk = atk;
        this.originBulletLoc = originBulletLoc;
        this.speed = speed;
        if (this.trigger) {
            if (this.trigger.enabled) return;
        }
        this.trigger.enabled = true;
        this.prepareFireS();
    }
    prepareFireS() {
        this.clearSettimeOutS();
        this.recycleTimeOutId = setTimeout((() => {
            this.reclcleS();
        }), 10 * 1e3);
        this.fireS();
    }
    clearSettimeOutS() {
        if (this.recycleTimeOutId) {
            clearTimeout(this.recycleTimeOutId);
            this.recycleTimeOutId = null;
        }
    }
    reclcleS() {
        if (this.trigger) this.trigger.enabled = false;
        if (Helper.activeBulletMap.has(this.guid)) {
            Helper.activeBulletMap.delete(this.guid);
        }
        Helper.inactiveBullets.push(this);
        this.clearSettimeOutS();
        this.useUpdate = false;
        this.stopBulletEffectS();
        this.playBulletExplosoinEffectS(this.bulletExplosionEffect, this.bulletExplosionEffectScale);
    }
    playBulletEffectS(effeftId, scale) {
        this.stopBulletEffectS();
        this.bulletEffectId = EffectService.playOnGameObject(effeftId, this.gameObject, {
            loopCount: 0,
            scale: scale
        });
    }
    stopBulletEffectS() {
        if (this.bulletEffectId) {
            EffectService.stop(this.bulletEffectId);
            this.bulletEffectId = null;
        }
    }
    playBulletExplosoinEffectS(effeftId, scale) {
        this.stopBulletExplosoinEffectS();
        this.bulletExplosoinEffectId = EffectService.playAtPosition(effeftId, this.gameObject.worldTransform.position, {
            loopCount: 1,
            scale: scale
        });
    }
    stopBulletExplosoinEffectS() {
        try {
            if (this.bulletExplosoinEffectId) {
                EffectService.stop(this.bulletExplosoinEffectId);
                this.bulletExplosoinEffectId = null;
            }
        } catch (error) {
            Console.error("stopBulletExplosoinEffectS:" + error);
        }
    }
    play3DSound(soundId) {
        SoundService.play3DSound(soundId, this.gameObject, 1, 1);
    }
    onDestroy() {}
};

EnemyBullet = __decorate([ Component ], EnemyBullet);

var EnemyBullet$1 = EnemyBullet;

var foreign29 = Object.freeze({
    __proto__: null,
    default: EnemyBullet$1
});

class EnemyModuleC extends ModuleC {
    onStart() {}
}

class EnemyModuleS extends ModuleS {
    onStart() {}
}

var foreign30 = Object.freeze({
    __proto__: null,
    EnemyModuleC: EnemyModuleC,
    EnemyModuleS: EnemyModuleS
});

let WeaponUI_Generate = class WeaponUI_Generate extends UIScript {
    get point() {
        if (!this.point_Internal && this.uiWidgetBase) {
            this.point_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/PointCanvas/point");
        }
        return this.point_Internal;
    }
    get up() {
        if (!this.up_Internal && this.uiWidgetBase) {
            this.up_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/PointCanvas/up");
        }
        return this.up_Internal;
    }
    get down() {
        if (!this.down_Internal && this.uiWidgetBase) {
            this.down_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/PointCanvas/down");
        }
        return this.down_Internal;
    }
    get left() {
        if (!this.left_Internal && this.uiWidgetBase) {
            this.left_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/PointCanvas/left");
        }
        return this.left_Internal;
    }
    get right() {
        if (!this.right_Internal && this.uiWidgetBase) {
            this.right_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/PointCanvas/right");
        }
        return this.right_Internal;
    }
    get move() {
        if (!this.move_Internal && this.uiWidgetBase) {
            this.move_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/move");
        }
        return this.move_Internal;
    }
    get right_fire() {
        if (!this.right_fire_Internal && this.uiWidgetBase) {
            this.right_fire_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/right_fire");
        }
        return this.right_fire_Internal;
    }
    get reload() {
        if (!this.reload_Internal && this.uiWidgetBase) {
            this.reload_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/reload");
        }
        return this.reload_Internal;
    }
    get crouch() {
        if (!this.crouch_Internal && this.uiWidgetBase) {
            this.crouch_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/crouch");
        }
        return this.crouch_Internal;
    }
    get jump() {
        if (!this.jump_Internal && this.uiWidgetBase) {
            this.jump_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/jump");
        }
        return this.jump_Internal;
    }
    get aim() {
        if (!this.aim_Internal && this.uiWidgetBase) {
            this.aim_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/aim");
        }
        return this.aim_Internal;
    }
    get left_fire() {
        if (!this.left_fire_Internal && this.uiWidgetBase) {
            this.left_fire_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/left_fire");
        }
        return this.left_fire_Internal;
    }
    get icon() {
        if (!this.icon_Internal && this.uiWidgetBase) {
            this.icon_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/icon");
        }
        return this.icon_Internal;
    }
    get name() {
        if (!this.name_Internal && this.uiWidgetBase) {
            this.name_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/name");
        }
        return this.name_Internal;
    }
    get bullet() {
        if (!this.bullet_Internal && this.uiWidgetBase) {
            this.bullet_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/bullet");
        }
        return this.bullet_Internal;
    }
    get mKeepTimeCanvas() {
        if (!this.mKeepTimeCanvas_Internal && this.uiWidgetBase) {
            this.mKeepTimeCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mKeepTimeCanvas");
        }
        return this.mKeepTimeCanvas_Internal;
    }
    get keepTimeBar() {
        if (!this.keepTimeBar_Internal && this.uiWidgetBase) {
            this.keepTimeBar_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mKeepTimeCanvas/keepTimeBar");
        }
        return this.keepTimeBar_Internal;
    }
    get keepTimeTxt() {
        if (!this.keepTimeTxt_Internal && this.uiWidgetBase) {
            this.keepTimeTxt_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mKeepTimeCanvas/keepTimeTxt");
        }
        return this.keepTimeTxt_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.reload.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "reload");
        }));
        this.reload.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.crouch.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "crouch");
        }));
        this.crouch.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.jump.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "jump");
        }));
        this.jump.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.aim.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "aim");
        }));
        this.aim.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.left_fire.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "left_fire");
        }));
        this.left_fire.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.name);
        this.initLanguage(this.bullet);
        this.initLanguage(this.keepTimeTxt);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

WeaponUI_Generate = __decorate([ UIBind("UI/Prefabs/步枪/UI/WeaponUI.ui") ], WeaponUI_Generate);

var WeaponUI_Generate$1 = WeaponUI_Generate;

var foreign89 = Object.freeze({
    __proto__: null,
    default: WeaponUI_Generate$1
});

class WeaponUI extends WeaponUI_Generate$1 {
    constructor() {
        super(...arguments);
        this.curWeapon = null;
        this.upPosition = mw.Vector2.zero;
        this.downPosition = mw.Vector2.zero;
        this.leftPosition = mw.Vector2.zero;
        this.rightPosition = mw.Vector2.zero;
        this.upCurPosition = mw.Vector2.zero;
        this.downCurPosition = mw.Vector2.zero;
        this.leftCurPosition = mw.Vector2.zero;
        this.rightCurPosition = mw.Vector2.zero;
    }
    onStart() {
        this.right_fire.onJoyStickDown.add((() => {
            Console.error("right_fire onJoyStickDown");
            if (!this.curWeapon) return;
            this.curWeapon.startFire();
        }));
        this.right_fire.onJoyStickUp.add((() => {
            Console.error("right_fire onJoyStickUp");
            if (!this.curWeapon) return;
            this.curWeapon.stopFire();
        }));
        this.left_fire.onPressed.add((() => {
            Console.error("left_fire onPressed");
            if (!this.curWeapon) return;
            this.curWeapon.startFire();
        }));
        this.left_fire.onReleased.add((() => {
            Console.error("left_fire onReleased");
            if (!this.curWeapon) return;
            this.curWeapon.stopFire();
        }));
        this.reload.onClicked.add((() => {
            Console.error("reload onClicked");
            if (!this.curWeapon) return;
            this.curWeapon.startReload();
        }));
        this.aim.onClicked.add((() => {
            Console.error("aim onClicked");
            if (!this.curWeapon) return;
            if (this.curWeapon.isAimming) {
                this.curWeapon.stopAim();
            } else {
                this.curWeapon.startAim();
            }
        }));
        this.crouch.onClicked.add((() => {
            Console.error("crouch onClicked");
            let player = Player.localPlayer;
            if (player) {
                if (player.character.isCrouching) {
                    player.character.crouch(false);
                } else {
                    player.character.crouch(true);
                }
            }
        }));
        this.jump.onClicked.add((() => {
            Console.error("jump onClicked");
            let player = Player.localPlayer;
            if (player) {
                player.character.jump();
                if (!player.character.movementEnabled) player.character.movementEnabled = true;
            }
        }));
        Event.addLocalListener("HotWeapon-Unequiped", (() => {
            if (this.curWeapon != null) {
                this.curWeapon.unEquip();
                this.curWeapon = null;
            }
        }));
        let hudModuleC = ModuleService.getModule(HUDModuleC);
        let inputScale = hudModuleC.getFireScale();
        Console.error("inputScale", inputScale);
        this.right_fire.inputScale = new mw.Vector2(inputScale, inputScale);
        hudModuleC.onFireScaleAction.add((scale => {
            this.right_fire.inputScale = new mw.Vector2(scale, scale);
            Console.error("onControlScaleAction", scale);
        }));
    }
    onShow(weapon, crossValue, iconId, weaponName) {
        Console.error("show");
        this.curWeapon = weapon;
        mw.assetIDChangeIconUrlRequest([ iconId ]).then((() => {
            try {
                this.icon.setImageByAssetIconData(mw.getAssetIconDataByAssetID(iconId));
            } catch (error) {
                Console.error("onShow:" + error);
            }
        }));
        this.name.text = weaponName;
        this.upPosition = this.upPosition.set(this.up.position);
        this.downPosition = this.downPosition.set(this.down.position);
        this.leftPosition = this.leftPosition.set(this.left.position);
        this.rightPosition = this.rightPosition.set(this.right.position);
        this.changeCross(crossValue * 10);
    }
    onHide() {
        Console.error("hide");
        this.changeCross(0);
    }
    changeBullet(bullet, ammo) {
        if (ammo == -1) {
            this.bullet.text = `${bullet} / 无限`;
        } else {
            this.bullet.text = `${bullet} / ${ammo}`;
        }
    }
    changeCross(value) {
        this.up.position = this.upCurPosition.set(this.upPosition.x, this.upPosition.y - value);
        this.down.position = this.downCurPosition.set(this.downPosition.x, this.downPosition.y + value);
        this.left.position = this.leftCurPosition.set(this.leftPosition.x - value, this.leftPosition.y);
        this.right.position = this.rightCurPosition.set(this.rightPosition.x + value, this.rightPosition.y);
    }
    setTimeText(restTime, keepTime) {
        if (restTime <= 0) {
            this.mKeepTimeCanvas.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mKeepTimeCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            let percent = restTime / keepTime;
            this.keepTimeBar.percent = percent;
            this.keepTimeTxt.text = `${restTime.toFixed(1)}s`;
        }
    }
    setReloadBtn(enable) {
        this.reload.visibility = enable ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
    }
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
}

var foreign65 = Object.freeze({
    __proto__: null,
    default: WeaponUI
});

var WeaponDriver_1;

const SHOOT_RANGE = 1e5;

const CASING_LIFE = 1;

const CASING_OFFSET = new mw.Vector(8, 5, 10);

const DEBUG_FLAG = false;

const GRAVITAIONAL_ACCELERATION = 9.8;

const MAX_SHOOTSPEED = 10001;

class Pool {
    constructor() {
        this.mCacheStack = new Array;
        this.mUsingArray = new Array;
    }
    get CacheStackCount() {
        return this.mCacheStack.length;
    }
    get UsingCount() {
        return this.mUsingArray.length;
    }
    allocate() {
        let obj = this.mCacheStack.length > 0 ? this.mCacheStack.pop() : this.mFactory.create();
        this.mUsingArray.push(obj);
        return obj;
    }
    release() {
        for (let i = 0; i < this.mUsingArray.length; i++) {
            const element = this.mUsingArray[i];
            this.mFactory.destroy(element);
        }
        this.mUsingArray.length = 0;
        for (let i = 0; i < this.mCacheStack.length; i++) {
            const element = this.mCacheStack[i];
            this.mFactory.destroy(element);
        }
        this.mCacheStack.length = 0;
    }
}

class CustomObjectFactory {
    constructor(factoryCreateMethod, factoryDestroyMethod) {
        this.mFactoryCreateMethod = factoryCreateMethod;
        this.mFactoryDestroyMethod = factoryDestroyMethod;
    }
    create() {
        return this.mFactoryCreateMethod();
    }
    destroy(obj) {
        return this.mFactoryDestroyMethod(obj);
    }
}

class SimpleObjectPool extends Pool {
    constructor(factoryCreateMethod, factoryDestroyMethod, resetMethod = null) {
        super();
        this.mFactory = new CustomObjectFactory(factoryCreateMethod, factoryDestroyMethod);
        this.mResetMethod = resetMethod;
    }
    recycle(obj) {
        if (this.mCacheStack.indexOf(obj) > -1) {
            return;
        }
        if (this.mResetMethod != null) {
            this.mResetMethod(obj);
        }
        let index = this.mUsingArray.indexOf(obj);
        if (index > -1) {
            this.mUsingArray.splice(index, 1);
        }
        this.mCacheStack.push(obj);
        return true;
    }
    recycleAll() {
        for (let i = 0; i < this.mUsingArray.length; i++) {
            const element = this.mUsingArray[i];
            this.mResetMethod(element);
            this.mCacheStack.push(element);
        }
        this.mUsingArray.length = 0;
    }
    printTotalSize() {
        Console.error("total size: " + (this.UsingCount + this.CacheStackCount));
    }
}

class Ammo {
    constructor(owner, ammoPool, startLoc, direction, shootRange, ammoSpeed, gravityScale, detectRadius, hitResult = []) {
        this.owner = owner;
        this.ammoPool = ammoPool;
        this.entity = this.ammoPool.allocate();
        this.entity.parent = null;
        this.currentLocation = startLoc.clone();
        this.entity.worldTransform.position = this.currentLocation;
        this.entity.worldTransform.rotation = direction.toRotation();
        this.entity.setVisibility(mw.PropertyStatus.On);
        this.displacement = mw.Vector.multiply(direction, ammoSpeed, this.displacement);
        this.lifeTime = shootRange / ammoSpeed;
        this.currentTime = 0;
        this.gravityScale = gravityScale;
        this.stride = mw.Vector.zero;
        this.detectRadius = detectRadius;
        this.hitResult = hitResult;
    }
    update(dt) {
        this.stride = mw.Vector.multiply(this.displacement, dt, this.stride);
        if (this.gravityScale) {
            this.stride.z -= 50 * this.gravityScale * GRAVITAIONAL_ACCELERATION * (Math.pow(this.currentTime + dt, 2) - Math.pow(this.currentTime, 2));
            this.entity.worldTransform.rotation = this.stride.toRotation();
            this.currentTime += dt;
        }
        this.currentLocation.x += this.stride.x;
        this.currentLocation.y += this.stride.y;
        this.currentLocation.z += this.stride.z;
        if (this.detectRadius) {
            if (this.detectRadius < 10) {
                let lineResult = QueryUtil.lineTrace(this.entity.worldTransform.position, this.currentLocation, true, DEBUG_FLAG);
                lineResult = lineResult.filter((e => !(e.gameObject instanceof mw.Trigger)));
                if (lineResult.length > 0) {
                    this.lifeTime = -1;
                    let temp = new Array;
                    for (let element of lineResult) {
                        temp.push(element);
                    }
                    this.hitResult = temp;
                }
            } else {
                let boxResult = GeneralManager.modifyboxOverlapInLevel(this.entity.worldTransform.position, this.currentLocation, this.detectRadius, this.detectRadius, DEBUG_FLAG);
                if (boxResult.length > 0) {
                    this.lifeTime = -1;
                    this.hitResult = boxResult;
                }
            }
        }
        this.entity.worldTransform.position = this.currentLocation;
        this.lifeTime -= dt;
        return this.lifeTime <= 0;
    }
    destroy() {
        this.ammoPool.recycle(this.entity);
    }
}

class Casing {
    constructor(casingPool, casing, direction) {
        this.casingPool = casingPool;
        this.loc = mw.Vector.add(casing.worldTransform.position, casing.worldTransform.rotation.rotateVector(CASING_OFFSET));
        this.entity = this.casingPool.allocate();
        this.entity.worldTransform.position = this.loc;
        this.entity.worldTransform.rotation = new mw.Rotation(mw.MathUtil.randomFloat(0, 180), mw.MathUtil.randomFloat(0, 180), mw.MathUtil.randomFloat(0, 180));
        this.entity.setVisibility(mw.PropertyStatus.On);
        this.displacement = direction.multiply(100);
        this.gravity = mw.MathUtil.randomFloat(1, 3);
        this.lifeTime = CASING_LIFE;
        this.stride = mw.Vector.zero;
    }
    update(dt) {
        this.stride = mw.Vector.multiply(this.displacement, dt, this.stride);
        this.loc.x += this.stride.x;
        this.loc.y += this.stride.y;
        this.loc.z += this.stride.z + this.gravity;
        this.gravity -= dt * 20;
        this.entity.worldTransform.position = this.loc;
        this.lifeTime -= dt;
        return this.lifeTime <= 0;
    }
    destroy() {
        this.casingPool.recycle(this.entity);
    }
}

class WeaponAction {
    constructor() {
        this.shootAnimation = "";
        this.aimShootAnimation = "";
        this.reloadAnimation = "";
        this.loadAnimation = "";
        this.equipAnimation = "";
        this.unequipAnimation = "";
        this.holdStance = "";
        this.aimStance = "";
    }
}

let MaleAction = class MaleAction extends WeaponAction {
    constructor() {
        super(...arguments);
        this.shootAnimation = "80484";
        this.aimShootAnimation = "80483";
        this.reloadAnimation = "80479";
        this.loadAnimation = "80482";
        this.equipAnimation = "80585";
        this.unequipAnimation = "80481";
        this.holdStance = "94258";
        this.aimStance = "94261";
    }
};

__decorate([ mw.Property({
    displayName: "射击动画"
}) ], MaleAction.prototype, "shootAnimation", void 0);

__decorate([ mw.Property({
    displayName: "瞄准射击动画"
}) ], MaleAction.prototype, "aimShootAnimation", void 0);

__decorate([ mw.Property({
    displayName: "换弹动画"
}) ], MaleAction.prototype, "reloadAnimation", void 0);

__decorate([ mw.Property({
    displayName: "上膛动画"
}) ], MaleAction.prototype, "loadAnimation", void 0);

__decorate([ mw.Property({
    displayName: "装备武器动画"
}) ], MaleAction.prototype, "equipAnimation", void 0);

__decorate([ mw.Property({
    displayName: "卸载武器动画"
}) ], MaleAction.prototype, "unequipAnimation", void 0);

__decorate([ mw.Property({
    displayName: "持有姿态"
}) ], MaleAction.prototype, "holdStance", void 0);

__decorate([ mw.Property({
    displayName: "瞄准姿态"
}) ], MaleAction.prototype, "aimStance", void 0);

MaleAction = __decorate([ Serializable ], MaleAction);

let FemaleAction = class FemaleAction extends WeaponAction {
    constructor() {
        super(...arguments);
        this.shootAnimation = "49094";
        this.aimShootAnimation = "49095";
        this.reloadAnimation = "80479";
        this.loadAnimation = "80482";
        this.equipAnimation = "80585";
        this.unequipAnimation = "80481";
        this.holdStance = "49096";
        this.aimStance = "49098";
    }
};

__decorate([ mw.Property({
    displayName: "射击动画"
}) ], FemaleAction.prototype, "shootAnimation", void 0);

__decorate([ mw.Property({
    displayName: "瞄准射击动画"
}) ], FemaleAction.prototype, "aimShootAnimation", void 0);

__decorate([ mw.Property({
    displayName: "换弹动画"
}) ], FemaleAction.prototype, "reloadAnimation", void 0);

__decorate([ mw.Property({
    displayName: "上膛动画"
}) ], FemaleAction.prototype, "loadAnimation", void 0);

__decorate([ mw.Property({
    displayName: "装备武器动画"
}) ], FemaleAction.prototype, "equipAnimation", void 0);

__decorate([ mw.Property({
    displayName: "卸载武器动画"
}) ], FemaleAction.prototype, "unequipAnimation", void 0);

__decorate([ mw.Property({
    displayName: "持有姿态"
}) ], FemaleAction.prototype, "holdStance", void 0);

__decorate([ mw.Property({
    displayName: "瞄准姿态"
}) ], FemaleAction.prototype, "aimStance", void 0);

FemaleAction = __decorate([ Serializable ], FemaleAction);

let WeaponDriver = WeaponDriver_1 = class WeaponDriver extends mw.Script {
    constructor() {
        super(...arguments);
        this.maleAction = new MaleAction;
        this.femaleAction = new FemaleAction;
        this.WaponIcon = "101168";
        this.weaponName = "步枪";
        this.equipmentSlot = mw.HumanoidSlotType.RightHand;
        this.equipmentCameraOffset = mw.Vector.zero;
        this.equipmentCameraFov = 90;
        this.aimCameraOffset = mw.Vector.zero;
        this.aimCameraFov = 60;
        this.aimSpeed = 90;
        this.damage = 30;
        this.shootRange = 5e3;
        this.ammoSpeed = 1e4;
        this.detectRadius = 1;
        this.gravityScale = 0;
        this.hurtRadius = 1;
        this.isAutoReload = true;
        this.isAutoLock = false;
        this.isDefaultUI = true;
        this.isWeaponHaveCasing = true;
        this.fireBlockDistance = 100;
        this.totalAmmo = 180;
        this.isEmptyToDestroy = true;
        this.isSupportRepAmmo = false;
        this.rotateSpeed = 90;
        this.keepTime = 10;
        this.isEquiped = false;
        this.isWeaponHaveScope = false;
        this.isAutoDestroy = true;
        this.assets = this.maleAction.aimShootAnimation + "," + this.maleAction.aimStance + "," + this.maleAction.equipAnimation + "," + this.maleAction.holdStance + "," + this.maleAction.loadAnimation + "," + this.maleAction.reloadAnimation + "," + this.maleAction.shootAnimation + "," + this.maleAction.unequipAnimation + "," + this.femaleAction.aimShootAnimation + "," + this.femaleAction.aimStance + "," + this.femaleAction.equipAnimation + "," + this.femaleAction.holdStance + "," + this.femaleAction.loadAnimation + "," + this.femaleAction.reloadAnimation + "," + this.femaleAction.shootAnimation + "," + this.femaleAction.unequipAnimation;
        this.weaponObj = null;
        this.weaponAction = null;
        this.weaponUI = null;
        this.player = null;
        this.chara = null;
        this.camera = null;
        this.pickUpTrigger = null;
        this.weaponEntityRoot = null;
        this.ammoEntityRoot = null;
        this.ammoPool = null;
        this.ammoArray = [];
        this.casingEntity = null;
        this.casingPool = null;
        this.casingArray = [];
        this.fireEffect = null;
        this.hitCharaEffect = null;
        this.hitCharaEffectPool = null;
        this.hitEffect = null;
        this.hitEffectPool = null;
        this.fireSound = null;
        this.reloadSound = null;
        this.loadSound = null;
        this.aimSound = null;
        this.hitCharaSound = null;
        this.hitCharaSoundPool = null;
        this.hitSound = null;
        this.hitSoundPool = null;
        this.isFiring = false;
        this.bFiring = false;
        this.isCanFire = 0;
        this.isAimming = false;
        this.isZooming = false;
        this.isBlock = false;
        this._rotateRotation = Rotation.zero;
        this.tempDispersionMax = 0;
        this.tempDispersionDefault = 0;
        this._isInited = false;
    }
    onStart() {
        this.useUpdate = true;
        this.weaponObj = this.gameObject;
        if (this.weaponObj) {
            if (mw.SystemUtil.isClient()) {
                this.clientInit();
            }
            if (mw.SystemUtil.isServer()) {
                this.serverInit();
            }
            if (mw.SystemUtil.isClient()) {
                this.clientOnHit = (hitResult, attackPlayer, isObj) => {
                    hitResult.forEach((e => {
                        if (e instanceof mw.HitResult) {
                            if (PlayerManagerExtesion.isCharacter(e.gameObject) || e.gameObject instanceof mw.GameObject) {
                                PrefabEvent.PrefabEvtFight.hit(this.chara.gameObjectId, e.gameObject.gameObjectId, this.damage, e.impactPoint.clone());
                                return;
                            }
                        }
                        if (PlayerManagerExtesion.isCharacter(e) || e instanceof mw.GameObject) {
                            PrefabEvent.PrefabEvtFight.hit(this.chara.gameObjectId, e.gameObjectId, this.damage, e.worldTransform.position.clone());
                            return;
                        }
                    }));
                };
                PrefabEvent.PrefabEvtEquip.onEquip((async (targetGuid, slot, equipGuid) => {
                    if (this.weaponObj && this.weaponObj.getCurrentOwner() && this.weaponObj.getCurrentOwner().gameObjectId == targetGuid && this.weaponObj.gameObjectId != equipGuid) {
                        this.unEquip();
                    }
                }));
            }
        }
    }
    onEquipdChanged() {
        if (this.weaponEntityRoot && this.weaponEntityRoot.localTransform) this.weaponEntityRoot.localTransform.rotation = Rotation.zero;
    }
    onUpdate(dt) {
        if (mw.SystemUtil.isServer()) return;
        if (this.weaponObj == null) {
            this.weaponObj = this.gameObject;
            if (this.weaponObj == null) return;
            this.clientInit();
        }
        if (!this.isEquiped && this.weaponEntityRoot) {
            this._rotateRotation.z = this.rotateSpeed * dt;
            this.weaponEntityRoot.worldTransform.rotation = this.weaponEntityRoot.worldTransform.rotation.add(this._rotateRotation);
            return;
        }
        for (let i = 0; i < this.ammoArray.length; i++) {
            if (this.ammoArray[i].update(dt)) {
                if (this.ammoArray[i].owner == this.chara) {
                    this.serverDestroyAmmo(i);
                    this.hit(this.ammoArray[i].hitResult);
                    this.ammoArray[i].destroy();
                    this.ammoArray.splice(i, 1);
                    i--;
                }
            }
        }
        for (let i = 0; i < this.casingArray.length; i++) {
            if (this.casingArray[i].update(dt)) {
                this.casingArray[i].destroy();
                this.casingArray.splice(i, 1);
                i--;
            }
        }
        if (this.weaponObj.getCurrentOwner() !== this.chara) return;
        if (this.isCanFire != 0) {
            this.isCanFire -= dt;
            if (this.isCanFire < 0) {
                this.isCanFire = 0;
            }
        }
        this.cameraUpdate(dt);
        if (!this.updatebFiring()) {
            if (!this.bFiring && this.fireEffect.loop && this.fireSound.isLoop) {
                this.fireEffect.stop();
                this.fireSound.stop();
                if (!this.isAimming) {
                    this.weaponObj.aimComponent.enableAiming(false);
                }
            }
        }
        if (!this.updateBlockFire()) {
            if (this.clientOnBlockChange) this.clientOnBlockChange(this.isBlock);
        }
        switch (this.weaponObj.getCurrentState()) {
          case mw.HotWeaponState.Idle:
            if (this.weaponObj.fireComponent.currentBullet < 1) {
                if (this.isAutoReload) {
                    this.startReload();
                    this.isAutoReload = false;
                    setTimeout((() => {
                        this.isAutoReload = true;
                    }), this.weaponObj.reloadComponent.reloadDuration * 1e3);
                }
            } else {
                if (this.isFiring && !this.bFiring && this.weaponObj.fireComponent.fireMode == 2) {
                    this.startFire();
                }
            }
            break;

          case mw.HotWeaponState.Reloading:
            break;

          case mw.HotWeaponState.Loading:
            break;

          case mw.HotWeaponState.Firing:
            if (this.isEmptyToDestroy && this.totalAmmo == 0 && this.weaponObj.fireComponent.currentBullet == 0) {
                this.unEquip();
            }
            break;
        }
        if (this.weaponUI) {
            this.weaponUI.changeBullet(this.weaponObj.fireComponent.currentBullet, this.totalAmmo);
            if (this.keepTime != -1) {
                this._restTime -= dt;
                this.weaponUI.setTimeText(this._restTime, this.keepTime);
                if (this._restTime <= 0) {
                    this.unEquip();
                }
            }
        }
    }
    onDestroy() {}
    hit(hitResult) {
        if (!(hitResult.length > 0)) return;
        if (this.detectRadius > 10) {
            for (let element of hitResult) {
                let temp = element;
                if (temp instanceof mw.Pawn) {
                    this.hitCharacterMulticast(temp.worldTransform.position, temp.worldTransform.rotation);
                } else {
                    this.hitObjectMulticast(temp.worldTransform.position, temp.worldTransform.rotation);
                }
            }
            if (this.hurtRadius > 10) {
                let sphereResult = QueryUtil.sphereOverlap(hitResult[0].worldTransform.position, this.hurtRadius, DEBUG_FLAG);
                this.clientOnHit(sphereResult, this.player.playerId, true);
            } else {
                this.clientOnHit(hitResult, this.player.playerId, true);
            }
        } else {
            for (let element of hitResult) {
                let temp = element;
                let rot = temp.impactNormal.toRotation();
                rot.y -= 90;
                if (temp.gameObject instanceof mw.Pawn) {
                    this.hitCharacterMulticast(temp.impactPoint, rot);
                } else {
                    this.hitObjectMulticast(temp.impactPoint, rot);
                }
            }
            if (this.hurtRadius > 10) {
                let sphereResult = QueryUtil.sphereOverlap(hitResult[0].impactPoint, this.hurtRadius, DEBUG_FLAG);
                this.clientOnHit(sphereResult, this.player.playerId, true);
            } else {
                this.clientOnHit(hitResult, this.player.playerId, false);
            }
        }
    }
    hitCharacterMulticast(loc, rot) {
        this.hitCharaPerformance(loc, rot);
    }
    hitObjectMulticast(loc, rot) {
        this.hitObjectPerformance(loc, rot);
    }
    hitCharaPerformance(loc, rot) {
        try {
            if (this.hitCharaEffect) GeneralManager.rpcPlayEffectAtLocation(this.hitCharaEffect.assetId, loc, 1, rot, this.hitCharaEffect.worldTransform.scale);
            if (this.hitCharaSound) SoundService.play3DSound(this.hitCharaSound.assetId, loc, 1, 1, {
                falloffDistance: 3e3
            });
        } catch (error) {
            Console.error("hitCharaPerformance:" + error);
        }
    }
    hitObjectPerformance(loc, rot) {
        try {
            if (this.hitEffect) GeneralManager.rpcPlayEffectAtLocation(this.hitEffect.assetId, loc, 1, rot, this.hitEffect.worldTransform.scale);
            if (this.hitSound) SoundService.play3DSound(this.hitSound.assetId, loc, 1, 1, {
                falloffDistance: 3e3
            });
        } catch (error) {
            Console.error("hitObjectPerformance:" + error);
        }
    }
    playEffect(particle) {}
    playSound(sound) {
        sound.volume = WeaponDriver_1.soundVolume;
        sound.play();
    }
    serverDestroyAmmo(index) {
        this.clientDestroyAmmo(index);
    }
    clientDestroyAmmo(index) {
        if (!this.weaponObj) {
            return;
        }
        if (this.weaponObj.getCurrentOwner() == this.chara) {
            return;
        } else if (this.ammoArray.length != 0) {
            if (index < this.ammoArray.length) {
                this.ammoArray[index].destroy();
                this.ammoArray.splice(index, 1);
            }
        }
    }
    equip() {
        if (!this.chara && mw.SystemUtil.isClient()) {
            this.chara = Player.localPlayer.character;
        }
        this.serverEquip(this.chara.player.playerId);
    }
    unEquip() {
        try {
            if (!this.weaponObj) return;
            if (this.chara !== this.weaponObj.getCurrentOwner()) return;
            if (this.isAimming) {
                this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax;
                this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault;
                this.isAimming = false;
            }
            this.weaponObj?.stopFire();
            this.weaponObj?.breakLoad();
            this.weaponObj?.breakReload();
            this.weaponObj?.destroy();
            this.weaponObj?.unequip();
            mw.UIService.hide(WeaponUI);
            this.weaponUI = null;
            PlayerManagerExtesion.changeStanceExtesion(this.chara, this.tempanimationStance?.assetId);
            PlayerManagerExtesion.rpcPlayAnimation(this.chara, this.weaponAction.unequipAnimation);
            this.chara.moveFacingDirection = this.tempMoveFacingDirection;
            this.camera.localTransform = new mw.Transform(this.tempcameraOffset, this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
            this.camera.springArm.localTransform = new mw.Transform(this.temptargetArmOffset, this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
            this.camera.fov = this.tempcameraFOV;
            this.camera.springArm.length = this.temptargetArmLength;
            if (this.isAutoDestroy) {
                mw.UIService.destroyUI(WeaponUI);
                this.weaponObj = null;
                let destroyInterval = setInterval((() => {
                    if (this.ammoArray.length == 0 && this.casingArray.length == 0) {
                        this.serverDestroy();
                        clearInterval(destroyInterval);
                    }
                }), 100);
            }
        } catch (error) {
            Console.error("unEquip-[error]" + error);
        }
    }
    serverHideWeaponEntity(playerID) {
        this.hideWeaponEntity();
    }
    hideWeaponEntity() {
        if (!this.weaponEntityRoot) return;
        this.weaponEntityRoot.setVisibility(mw.PropertyStatus.Off);
    }
    serverDestroy() {
        this.destroy();
    }
    startFire() {
        if (!this.weaponObj || this.isCanFire != 0) return;
        try {
            this.weaponObj.startFire();
            this.isFiring = true;
            if (!this.isAimming) {
                this.weaponObj.aimComponent.enableAiming(true);
            }
        } catch (error) {
            Console.error("startFire-[error]" + error);
        }
    }
    stopFire() {
        if (this.weaponObj == null) return;
        try {
            this.weaponObj.stopFire();
            this.isFiring = false;
            if (!this.isAimming) {
                this.weaponObj.aimComponent.enableAiming(false);
            }
        } catch (error) {
            Console.error("stopFire:" + error);
        }
    }
    startReload() {
        try {
            if (!this.weaponObj || !this.weaponObj.reloadEnabled || this.weaponObj.fireComponent.currentBullet == this.weaponObj.fireComponent.clipSize) return;
            let ammoGap = this.weaponObj.fireComponent.clipSize - this.weaponObj.fireComponent.currentBullet;
            if (this.totalAmmo == -1) {
                this.weaponObj.reload(ammoGap);
            }
            if (this.totalAmmo <= 0) {
                return;
            }
            if (this.totalAmmo < ammoGap) {
                this.weaponObj.reload(this.totalAmmo);
                this.totalAmmo = 0;
            } else {
                this.weaponObj.reload(ammoGap);
                this.totalAmmo -= ammoGap;
            }
        } catch (error) {
            Console.error("startReload:" + error);
        }
    }
    stopReload() {
        if (this.weaponObj == null) return;
        this.weaponObj.breakReload();
        this.weaponObj.breakLoad();
    }
    startAim() {
        Console.error("startAim");
        try {
            if (this.aimSound) {
                this.aimSound.stop();
                this.aimSound.play();
            }
            PlayerManagerExtesion.changeStanceExtesion(this.chara, this.weaponAction.aimStance);
            this.weaponObj.fireComponent.animationAssetId = this.weaponAction.aimShootAnimation;
            this.tempDispersionDefault = this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle;
            this.tempDispersionMax = this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle;
            this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle;
            this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.weaponObj.accuracyOfFireComponent.minDispersionHalfAngle;
            this.isZooming = true;
            this.zoomIn();
            if (this.isWeaponHaveScope) {
                this.camera.springArm.length = 0;
            }
        } catch (error) {
            Console.error("startAim:" + error);
        }
    }
    stopAim() {
        Console.error("stopAim");
        try {
            this.weaponObj.accuracyOfFireComponent.maxDispersionHalfAngle = this.tempDispersionMax;
            this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle = this.tempDispersionDefault;
            PlayerManagerExtesion.changeStanceExtesion(this.chara, this.weaponAction.holdStance);
            this.weaponObj.fireComponent.animationAssetId = this.weaponAction.shootAnimation;
            this.isZooming = true;
            this.zoomOut();
            if (this.isWeaponHaveScope) {
                this.camera.springArm.length = 400;
            }
            this.aimSound.stop();
            this.aimSound.play();
        } catch (error) {
            Console.error("stopAim:" + error);
        }
    }
    startLoad() {}
    endLoad() {}
    getBulletSize() {
        if (this.weaponObj == null) return;
        return this.weaponObj.fireComponent.currentBullet;
    }
    clientDestroy() {
        if (this.pickUpTrigger) {
            this.pickUpTrigger.destroy();
        }
        if (this.weaponEntityRoot) {
            this.weaponEntityRoot.destroy();
        }
        if (this.ammoEntityRoot) {
            this.ammoEntityRoot.destroy();
        }
        if (this.casingEntity) {
            this.casingEntity.destroy();
        }
        if (this.fireEffect) {
            this.fireEffect.destroy();
        }
        if (this.fireSound) {
            this.fireSound.destroy();
        }
        if (this.hitCharaEffect) {
            this.hitCharaEffect.destroy();
        }
        if (this.hitCharaSound) {
            this.hitCharaSound.destroy();
        }
        if (this.hitEffect) {
            this.hitEffect.destroy();
        }
        if (this.hitSound) {
            this.hitSound.destroy();
        }
        if (this.reloadSound) {
            this.reloadSound.destroy();
        }
        if (this.aimSound) {
            this.aimSound.destroy();
        }
        if (this.loadSound) {
            this.loadSound.destroy();
        }
    }
    initAssets(assetIds) {
        let assetIdArray = this.resolveString(assetIds);
        for (let element of assetIdArray) {
            mw.AssetUtil.asyncDownloadAsset(element).then((value => {
                if (value) {
                    mw.AssetUtil.assetLoaded(element);
                }
            }));
        }
    }
    serverInit() {
        this.serverInitDelegate();
    }
    serverInitDelegate() {
        this.weaponObj.onEquip.add(this.onServerEquip.bind(this));
        this.weaponObj.onUnequip.add(this.onServerUnequip.bind(this));
        this.weaponObj.fireComponent.onStartFire.add(this.onServerStartFire.bind(this));
        this.weaponObj.fireComponent.onEndFire.add(this.onServerEndFire.bind(this));
        if (this.weaponObj.reloadComponent) {
            this.weaponObj.reloadComponent.onStartReload.add(this.onServerStartReload.bind(this));
            this.weaponObj.reloadComponent.onEndReload.add(this.onServerEndReload.bind(this));
        }
        if (this.weaponObj.loadComponent) {
            this.weaponObj.loadComponent.onStartLoad.add(this.onServerStartLoad.bind(this));
            this.weaponObj.loadComponent.onEndLoad.add(this.onServerEndLoad.bind(this));
        }
        if (this.weaponObj.aimComponent) {
            this.weaponObj.aimComponent.onStartAim.add(this.onServerStartAim.bind(this));
            this.weaponObj.aimComponent.onEndAim.add(this.onServerEndAim.bind(this));
        }
        if (this.weaponObj.recoilForceComponent) {
            this.weaponObj.recoilForceComponent.onStartRecoil.add(this.onServerStartRecoil.bind(this));
        }
    }
    onServerEquip() {
        Console.error("ServerEquip " + this.weaponObj.getCurrentOwner().displayName);
        if (!this.weaponObj.getCurrentOwner()) return;
        let v2 = this.weaponObj.getCurrentOwner();
        if (v2.description.advance.base.characterSetting.somatotype % 2 == 0) {
            Console.error("female");
            this.changeWeaponAction(0);
            this.clientEquip(this.weaponObj.getCurrentOwner().player, 0);
        } else {
            Console.error("male");
            this.changeWeaponAction(1);
            this.clientEquip(this.weaponObj.getCurrentOwner().player, 1);
        }
    }
    onServerUnequip() {
        Console.error("onServerUnequip");
    }
    onServerStartFire() {}
    onServerEndFire() {}
    onServerStartReload() {}
    onServerEndReload() {}
    onServerStartLoad() {}
    onServerEndLoad() {}
    onServerStartAim() {}
    onServerEndAim() {}
    onServerStartRecoil() {}
    clientInit() {
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        Player.asyncGetLocalPlayer().then((player => {
            this.player = player;
            this.chara = this.player.character;
            this.camera = Camera.currentCamera;
            this.clientInitWeaponEntityRoot();
            this.clientInitPickUpTrigger();
            this.clientInitAmmoEntityRoot();
            this.clientInitCasingEntity();
            this.clientInitHitCharaEffect();
            this.clientInitHitEffect();
            this.clientInitFireEffect();
            this.clientInitFireSound();
            this.clientInitReloadSound();
            this.clientInitLoadSound();
            this.clientInitAimSound();
            this.clientInitHitCharaSound();
            this.clientInitHitSound();
            this.clientInitDelegate();
        }));
        Event.addLocalListener("IsOpenUI", (isOpenUI => {
            if (!this.weaponUI) return;
            try {
                if (!this.weaponUI.rootCanvas) return;
                this.weaponUI.rootCanvas.visibility = isOpenUI ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
            } catch (error) {
                Console.error("addLocalListener-IsOpenUI-[error]" + error);
            }
        }));
    }
    clientInitWeaponEntityRoot() {
        try {
            this.weaponEntityRoot = this.weaponObj.getChildByName("weaponEntityRoot");
        } catch (error) {
            Console.error("clientInitWeaponEntityRoot:" + error);
        }
    }
    clientInitPickUpTrigger() {
        this.pickUpTrigger = this.weaponObj.getChildByName("pickUpTrigger");
        if (this.pickUpTrigger) {
            if (this.pickUpTrigger.checkInArea(this.chara)) {
                this.serverEquip(this.player.playerId);
                Console.error("B");
            }
            this.pickUpTrigger.onEnter.add((char => {
                if (char.gameObjectId == this.chara.gameObjectId) {
                    this.serverEquip(this.player.playerId);
                    console.error("A");
                }
            }));
        }
    }
    serverEquip(playerID) {
        let player = Player.getPlayer(playerID);
        if (player == null || !this.weaponObj) return;
        this.weaponObj.equip(player.character, this.equipmentSlot);
        this.isEquiped = true;
        PrefabEvent.PrefabEvtEquip.equip(player.character.gameObjectId, PrefabEvent.EquipSlot.Weapon, this.weaponObj.gameObjectId);
    }
    changeWeaponAction(sex) {
        Console.error("changeWeaponAction " + sex);
        sex == 0 ? this.weaponAction = this.femaleAction : this.weaponAction = this.maleAction;
        if (this.weaponObj) {
            this.weaponObj.fireComponent.animationAssetId = this.weaponAction.shootAnimation;
            if (this.weaponObj.reloadEnabled) {
                this.weaponObj.reloadComponent.animationAssetId = this.weaponAction.reloadAnimation;
            }
            if (this.weaponObj.loadEnabled) {
                this.weaponObj.loadComponent.animationAssetId = this.weaponAction.loadAnimation;
            }
        }
    }
    clientEquip(pickPlayer, gender) {
        if (!this.camera) {
            this.camera = Camera.currentCamera;
        }
        if (!this.weaponObj) {
            this.weaponObj = this.gameObject;
        }
        this.weaponObj.equip(this.chara, this.equipmentSlot);
        this.changeWeaponAction(gender);
        this.tempMoveFacingDirection = this.chara.moveFacingDirection;
        this.tempanimationStance = this.chara.currentStance;
        this.temptargetArmLength = this.camera.springArm.length;
        this.temptargetArmOffset = this.camera.springArm.localTransform.clone().position;
        this.tempcameraFOV = this.camera.fov;
        this.tempcameraOffset = this.camera.localTransform.clone().position;
        PlayerManagerExtesion.changeStanceExtesion(this.chara, this.weaponAction.holdStance);
        PlayerManagerExtesion.rpcPlayAnimation(this.chara, this.weaponAction.equipAnimation);
        this.chara.moveFacingDirection = mw.MoveFacingDirection.ControllerDirection;
        this.camera.springArm.length = 400;
        this.camera.fov = this.equipmentCameraFov;
        this.camera.localTransform = new mw.Transform(this.equipmentCameraOffset, this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
        this.camera.springArm.localTransform = new mw.Transform(new mw.Vector(0, 0, 60), this.camera.localTransform.clone().rotation, this.camera.localTransform.clone().scale);
        this.weaponUI = mw.UIService.show(WeaponUI, this, this.weaponObj.accuracyOfFireEnabled ? this.weaponObj.accuracyOfFireComponent.defaultDispersionHalfAngle : 0, this.WaponIcon, this.weaponName);
        this.weaponUI.setTimeText(this.keepTime, this.keepTime);
        this.weaponUI.setReloadBtn(!this.isSupportRepAmmo);
        if (this.isSupportRepAmmo) {
            this.weaponObj.reloadComponent.animationAssetId = this.weaponAction.aimShootAnimation;
            this.weaponObj.loadComponent.animationAssetId = this.weaponAction.aimShootAnimation;
        }
        this._restTime = this.keepTime;
    }
    changeFov(value) {
        this.camera.fov = value;
    }
    clientInitAmmoEntityRoot() {
        this.ammoEntityRoot = this.weaponObj.getChildByName("ammoEntityRoot");
        this.ammoPool = new SimpleObjectPool(this.instanceAmmo.bind(this), (obj => {
            obj.destroy();
        }), (obj => {
            obj.setVisibility(mw.PropertyStatus.Off);
        }));
    }
    clientInitCasingEntity() {
        this.casingEntity = this.weaponObj.getChildByName("casingEntity");
        this.casingPool = new SimpleObjectPool(this.instanceCasing.bind(this), (obj => {
            obj.destroy();
        }), (obj => {
            obj.setVisibility(mw.PropertyStatus.Off);
        }));
    }
    clientInitHitCharaEffect() {
        this.hitCharaEffect = this.weaponObj.getChildByName("hitCharaEffect");
        this.hitCharaEffectPool = new SimpleObjectPool(this.instanceHitCharaEffect.bind(this), (particle => {
            particle.destroy();
        }), (particle => {
            particle.parent = null;
            particle.stop();
        }));
    }
    clientInitHitEffect() {
        this.hitEffect = this.weaponObj.getChildByName("hitEffect");
        this.hitEffectPool = new SimpleObjectPool(this.instanceHitEffect.bind(this), (particle => {
            particle.destroy();
        }), (particle => {
            particle.parent = null;
            particle.stop();
        }));
    }
    clientInitFireEffect() {
        this.fireEffect = this.weaponObj.getChildByName("fireEffect");
        this.fireEffect.loopCount = 1;
    }
    clientInitFireSound() {
        this.fireSound = this.weaponObj.getChildByName("fireSound");
    }
    clientInitReloadSound() {
        this.reloadSound = this.weaponObj.getChildByName("reloadSound");
    }
    clientInitLoadSound() {
        this.loadSound = this.weaponObj.getChildByName("loadSound");
    }
    clientInitAimSound() {
        this.aimSound = this.weaponObj.getChildByName("aimSound");
    }
    clientInitHitCharaSound() {
        this.hitCharaSound = this.weaponObj.getChildByName("hitCharaSound");
        this.hitCharaSoundPool = new SimpleObjectPool(this.instanceHitCharaSound.bind(this), (sound => {
            sound.destroy();
        }), (sound => {
            sound.stop();
        }));
    }
    clientInitHitSound() {
        this.hitSound = this.weaponObj.getChildByName("hitSound");
        this.hitSoundPool = new SimpleObjectPool(this.instanceHitSound.bind(this), (sound => {
            sound.destroy();
        }), (sound => {
            sound.stop();
        }));
    }
    instanceAmmo() {
        let ammo = this.ammoEntityRoot.clone();
        ammo.parent = null;
        ammo.setVisibility(mw.PropertyStatus.On);
        return ammo;
    }
    instanceCasing() {
        let casing = this.casingEntity.clone();
        casing.parent = null;
        casing.setVisibility(mw.PropertyStatus.On);
        return casing;
    }
    instanceHitCharaEffect() {
        let hitChara = this.hitCharaEffect.clone();
        hitChara.parent = null;
        return hitChara;
    }
    instanceHitEffect() {
        let hit = this.hitEffect.clone();
        hit.parent = null;
        return hit;
    }
    instanceHitCharaSound() {
        let hitChara = this.hitCharaSound.clone();
        hitChara.parent = null;
        return hitChara;
    }
    instanceHitSound() {
        let hit = this.hitSound.clone();
        hit.parent = null;
        return hit;
    }
    clientInitDelegate() {
        this.weaponObj.onEquip.add(this.onClientEquip.bind(this));
        this.weaponObj.onUnequip.add(this.onClientUnequip.bind(this));
        this.weaponObj.fireComponent.onStartFire.add(this.onClientStartFire.bind(this));
        this.weaponObj.fireComponent.onEndFire.add(this.onClientEndFire.bind(this));
        if (this.weaponObj.reloadEnabled) {
            this.weaponObj.reloadComponent.onStartReload.add(this.onClientStartReload.bind(this));
            this.weaponObj.reloadComponent.onEndReload.add(this.onClientEndReload.bind(this));
        }
        if (this.weaponObj.loadEnabled) {
            this.weaponObj.loadComponent.onStartLoad.add(this.onClientStartLoad.bind(this));
            this.weaponObj.loadComponent.onEndLoad.add(this.onClientEndLoad.bind(this));
        }
        if (this.weaponObj.aimEnabled) {
            this.weaponObj.aimComponent.onStartAim.add(this.onClientStartAim.bind(this));
            this.weaponObj.aimComponent.onEndAim.add(this.onClientEndAim.bind(this));
        }
        if (this.weaponObj.recoilForceEnabled) {
            this.weaponObj.recoilForceComponent.onStartRecoil.add(this.onClientStartRecoil.bind(this));
        }
        if (this.weaponObj.accuracyOfFireEnabled) {
            this.weaponObj.accuracyOfFireComponent.onCurrentDispersionChange.add(this.onClientCurrentDispersionChanged.bind(this));
        }
        this.clientOnBlockChange = isBlock => {
            Console.error("isBlock " + isBlock);
        };
    }
    onClientEquip() {
        Console.error("ClientEquip");
        try {
            if (this.pickUpTrigger) {
                this.pickUpTrigger.enabled = false;
            }
        } catch (error) {
            Console.error("onClientEquip:" + error);
        }
        if (!this.weaponEntityRoot) {
            this.weaponEntityRoot.setVisibility(mw.PropertyStatus.On);
        }
    }
    onClientUnequip() {
        Console.error("onClientUnequip");
        if (!this.weaponObj) return;
        if (this.isAutoDestroy) {
            this.weaponObj.setVisibility(mw.PropertyStatus.Off);
            this.weaponObj = null;
        } else {
            if (this.pickUpTrigger) {
                this.weaponObj.worldTransform.rotation = new mw.Rotation(0, 0, 1);
                this.weaponObj.worldTransform.position = mw.Vector.add(this.weaponObj.worldTransform.getRightVector().multiply(100), this.weaponObj.worldTransform.position, this.weaponObj.worldTransform.position);
                this.pickUpTrigger.enabled = true;
            }
        }
    }
    onClientStartFire() {
        try {
            if (!this.weaponObj) {
                return;
            }
            this.isCanFire = this.weaponObj.fireComponent.fireInterval;
            if (this.fireEffect) {
                if (!this.fireEffect.loop) {
                    this.fireEffect.stop();
                }
                this.fireEffect.play();
            }
            if (this.fireSound) {
                if (!this.fireSound.isLoop) {
                    this.fireSound.stop();
                }
                this.fireSound.play();
            }
            if (this.weaponObj.getCurrentOwner() == this.chara) {
                if (this.ammoEntityRoot.getChildren().length > 0) {
                    for (let i = 0; i < this.weaponObj.fireComponent.multipleShot; i++) {
                        let cameraShootDir = this.camera.worldTransform.clone().getForwardVector().clone();
                        if (this.weaponObj.accuracyOfFireEnabled) {
                            cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone();
                        }
                        let endLoc = cameraShootDir.multiply(SHOOT_RANGE).add(this.camera.worldTransform.clone().position);
                        let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldTransform.position);
                        let hitRes = QueryUtil.lineTrace(this.camera.worldTransform.clone().position, endLoc, true, DEBUG_FLAG);
                        hitRes = hitRes.filter((e => !(e.gameObject instanceof mw.Trigger)));
                        if (hitRes && hitRes.length > 0 && mw.Vector.dot(hitRes[0].gameObject.worldTransform.position.clone().subtract(this.ammoEntityRoot.worldTransform.position), shootDir) > 0) {
                            shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldTransform.position);
                        }
                        let ammoDirection = shootDir.normalized;
                        if (this.ammoSpeed < MAX_SHOOTSPEED || this.isBlock) {
                            this.serverFire(this.ammoEntityRoot.worldTransform.position.clone(), ammoDirection);
                            if (this.ammoArray.length > this.weaponObj.fireComponent.clipSize) {
                                let discardAmmo = this.ammoArray.shift();
                                discardAmmo.destroy();
                            }
                            this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldTransform.position, ammoDirection, this.shootRange, this.ammoSpeed, this.gravityScale, this.detectRadius));
                        } else {
                            this.serverFire(this.ammoEntityRoot.worldTransform.position.clone(), ammoDirection);
                            if (this.ammoArray.length > this.weaponObj.fireComponent.clipSize) {
                                let discardAmmo = this.ammoArray.shift();
                                discardAmmo.destroy();
                            }
                            if (hitRes.length > 0) {
                                this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldTransform.position, ammoDirection, shootDir.length, this.ammoSpeed, this.gravityScale, 0, hitRes));
                            } else {
                                this.ammoArray.push(new Ammo(this.chara, this.ammoPool, this.ammoEntityRoot.worldTransform.position, ammoDirection, shootDir.length, this.ammoSpeed, this.gravityScale, 0));
                            }
                        }
                    }
                    if (this.isWeaponHaveCasing) {
                        this.casingArray.push(new Casing(this.casingPool, this.casingEntity, this.weaponEntityRoot.worldTransform.getRightVector().clone()));
                    }
                } else {
                    let cameraShootDir = this.camera.worldTransform.clone().getForwardVector().clone();
                    if (this.weaponObj.accuracyOfFireEnabled) {
                        cameraShootDir = this.weaponObj.accuracyOfFireComponent.getRandomShootDir(cameraShootDir).clone();
                    }
                    let endLoc = cameraShootDir.multiply(SHOOT_RANGE).add(this.camera.worldTransform.clone().position);
                    let shootDir = endLoc.clone().subtract(this.ammoEntityRoot.worldTransform.position);
                    let hitRes = QueryUtil.lineTrace(this.camera.worldTransform.clone().position, endLoc, true, DEBUG_FLAG);
                    hitRes = hitRes.filter((e => !(e.gameObject instanceof mw.Trigger)));
                    if (hitRes && hitRes.length > 0 && mw.Vector.dot(hitRes[0].gameObject.worldTransform.position.clone().subtract(this.ammoEntityRoot.worldTransform.position), shootDir) > 0) {
                        shootDir = hitRes[0].impactPoint.clone().subtract(this.ammoEntityRoot.worldTransform.position);
                    }
                    let ammoDirection = shootDir.normalized;
                    this.weaponObj.worldTransform.rotation = ammoDirection.toRotation();
                    let end = ammoDirection.clone().multiply(this.shootRange).add(this.ammoEntityRoot.worldTransform.position);
                    if (this.detectRadius < 10) {
                        let lineResult = QueryUtil.lineTrace(this.ammoEntityRoot.worldTransform.position, end, true, DEBUG_FLAG);
                        lineResult = lineResult.filter((e => !(e.gameObject instanceof mw.Trigger)));
                        this.hit(lineResult);
                    } else {
                        let boxResult = GeneralManager.modifyboxOverlapInLevel(this.ammoEntityRoot.worldTransform.position, end, this.detectRadius, this.detectRadius, DEBUG_FLAG);
                        this.hit(boxResult);
                    }
                }
            }
        } catch (error) {
            Console.error("onClientStartFire:" + error);
        }
    }
    updateBlockFire() {
        let flag = this.isBlock;
        if (this.ammoEntityRoot == undefined || this.ammoEntityRoot.worldTransform == undefined || this.ammoEntityRoot.worldTransform.position == undefined || this.ammoEntityRoot.worldTransform.getForwardVector() == undefined) return flag;
        let lineResultMuzzle = QueryUtil.lineTrace(this.ammoEntityRoot.worldTransform.position, this.ammoEntityRoot.worldTransform.getForwardVector().multiply(this.fireBlockDistance).add(this.ammoEntityRoot.worldTransform.position), true, DEBUG_FLAG);
        lineResultMuzzle = lineResultMuzzle.filter((e => !(e.gameObject instanceof mw.Trigger)));
        if (lineResultMuzzle.length > 0) {
            this.isBlock = true;
        } else {
            this.isBlock = false;
        }
        return this.isBlock == flag;
    }
    updatebFiring() {
        let flag = this.bFiring;
        this.bFiring = this.weaponObj.fireComponent.isFiring();
        return this.bFiring == flag;
    }
    serverFire(startLoc, direction) {
        this.clientMulticastLaunch(startLoc, direction);
    }
    clientMulticastLaunch(startLoc, direction) {
        if (!this.weaponObj) return;
        if (this.weaponObj.getCurrentOwner() == this.chara) {
            return;
        } else {
            if (this.ammoArray.length > this.weaponObj.fireComponent.clipSize) {
                try {
                    let discardAmmo = this.ammoArray.shift();
                    discardAmmo.destroy();
                } catch (error) {
                    Console.error("clientMulticastLaunch:" + error);
                }
            }
            this.ammoArray.push(new Ammo(null, this.ammoPool, startLoc, direction, this.shootRange, this.ammoSpeed, this.gravityScale, 0));
        }
    }
    onClientEndFire() {}
    onClientStartReload() {
        try {
            this.reloadSound?.play();
        } catch (error) {
            Console.error("onClientStartReload:" + error);
        }
    }
    onClientEndReload() {
        try {
            this.reloadSound?.stop();
        } catch (error) {
            Console.error("onClientEndReload:" + error);
        }
    }
    onClientStartLoad() {
        try {
            this.loadSound?.play();
        } catch (error) {
            Console.error("onClientStartLoad:" + error);
        }
    }
    onClientEndLoad() {
        try {
            this.loadSound?.stop();
        } catch (error) {
            Console.error("onClientEndLoad:" + error);
        }
    }
    onClientStartAim() {}
    onClientEndAim() {}
    onClientStartRecoil() {}
    onClientCurrentDispersionChanged() {
        if (this.weaponUI) {
            this.weaponUI.changeCross(this.weaponObj.accuracyOfFireComponent.getCurrentDispersionHalfAngle() * 10);
        }
    }
    zoomIn() {
        if (this.camera == null) return;
        Console.error("zoomin");
        this.isAimming = true;
    }
    zoomOut() {
        if (this.camera == null) return;
        Console.error("zoomOut");
        this.isAimming = false;
    }
    cameraUpdate(dt) {
        if (!this.isZooming) return;
        if (this.isAimming) {
            this.camera.fov -= dt * this.aimSpeed;
            if (this.camera.fov < this.aimCameraFov) {
                this.camera.fov = this.aimCameraFov;
                this.isZooming = false;
            }
        } else {
            this.camera.fov += dt * this.aimSpeed;
            if (this.camera.fov > this.equipmentCameraFov) {
                this.camera.fov = this.equipmentCameraFov;
                this.isZooming = false;
            }
        }
    }
    resolveString(assetIds) {
        let assetIdArray = new Array;
        let assetId = "";
        let s = assetIds.split("");
        for (let a of s) {
            if (a == ",") {
                assetIdArray.push(assetId);
                assetId = "";
            } else {
                assetId += a;
            }
        }
        if (assetId) {
            assetIdArray.push(assetId);
        }
        return assetIdArray;
    }
};

WeaponDriver.soundVolume = 1;

__decorate([ mw.Property({
    displayName: "男性动作",
    group: "动作资源",
    tooltip: "男性角色操作武器的各种动作资源"
}) ], WeaponDriver.prototype, "maleAction", void 0);

__decorate([ mw.Property({
    displayName: "女性动作",
    group: "动作资源",
    tooltip: "女性角色操作武器的各种动作资源"
}) ], WeaponDriver.prototype, "femaleAction", void 0);

__decorate([ mw.Property({
    displayName: "武器icon",
    group: "武器属性",
    tooltip: "武器图标"
}) ], WeaponDriver.prototype, "WaponIcon", void 0);

__decorate([ mw.Property({
    displayName: "武器名称",
    group: "武器属性",
    tooltip: "武器命名"
}) ], WeaponDriver.prototype, "weaponName", void 0);

__decorate([ mw.Property({
    displayName: "装备插槽",
    group: "武器属性",
    tooltip: "角色装备武器的插槽"
}) ], WeaponDriver.prototype, "equipmentSlot", void 0);

__decorate([ mw.Property({
    displayName: "装备视角偏移",
    group: "武器属性",
    tooltip: "角色装备武器后摄像机视角偏移"
}) ], WeaponDriver.prototype, "equipmentCameraOffset", void 0);

__decorate([ mw.Property({
    displayName: "装备FOV",
    group: "武器属性",
    tooltip: "角色装备武器后视场",
    range: {
        max: 170,
        min: 5
    }
}) ], WeaponDriver.prototype, "equipmentCameraFov", void 0);

__decorate([ mw.Property({
    displayName: "瞄准视角偏移",
    group: "武器属性",
    tooltip: "角色瞄准时摄像机视角偏移"
}) ], WeaponDriver.prototype, "aimCameraOffset", void 0);

__decorate([ mw.Property({
    displayName: "瞄准FOV",
    group: "武器属性",
    tooltip: "角色装备武器后视场",
    range: {
        max: 170,
        min: 5
    }
}) ], WeaponDriver.prototype, "aimCameraFov", void 0);

__decorate([ mw.Property({
    displayName: "瞄准聚焦速度",
    group: "武器属性",
    tooltip: "瞄准时视场移动速度",
    range: {
        max: 170,
        min: 5
    }
}) ], WeaponDriver.prototype, "aimSpeed", void 0);

__decorate([ mw.Property({
    displayName: "武器基础伤害",
    group: "武器属性",
    tooltip: "武器基础伤害数值"
}) ], WeaponDriver.prototype, "damage", void 0);

__decorate([ mw.Property({
    displayName: "最大射程",
    group: "弹药属性",
    tooltip: "弹药最大射程，超出自动销毁",
    range: {
        max: 1e5,
        min: 1
    }
}) ], WeaponDriver.prototype, "shootRange", void 0);

__decorate([ mw.Property({
    displayName: "弹药速度",
    group: "弹药属性",
    tooltip: "弹药飞行速度，单位距离/秒",
    range: {
        max: 1e5,
        min: 1
    }
}) ], WeaponDriver.prototype, "ammoSpeed", void 0);

__decorate([ mw.Property({
    displayName: "碰撞半径",
    group: "弹药属性",
    tooltip: "弹药碰撞检测半径，大于10矩形检测，小于等于10射线检测",
    range: {
        max: 500,
        min: 1
    }
}) ], WeaponDriver.prototype, "detectRadius", void 0);

__decorate([ mw.Property({
    displayName: "重力系数",
    group: "弹药属性",
    tooltip: "弹药是否受重力影响，重力系数可正可负",
    range: {
        max: -10,
        min: 10
    }
}) ], WeaponDriver.prototype, "gravityScale", void 0);

__decorate([ mw.Property({
    displayName: "伤害范围",
    group: "弹药属性",
    tooltip: "弹药爆炸范围，小于等于10为不爆炸",
    range: {
        max: 2e3,
        min: 1
    }
}) ], WeaponDriver.prototype, "hurtRadius", void 0);

__decorate([ mw.Property({
    displayName: "自动换弹",
    group: "辅助功能",
    tooltip: "勾选后子弹为0时自动换弹"
}) ], WeaponDriver.prototype, "isAutoReload", void 0);

__decorate([ mw.Property({
    displayName: "辅助瞄准",
    group: "辅助功能",
    tooltip: "勾选后开启自动锁定"
}) ], WeaponDriver.prototype, "isAutoLock", void 0);

__decorate([ mw.Property({
    displayName: "默认UI",
    group: "辅助功能",
    tooltip: "勾选后装备武器显示默认UI"
}) ], WeaponDriver.prototype, "isDefaultUI", void 0);

__decorate([ mw.Property({
    displayName: "弹壳弹出",
    group: "辅助功能",
    tooltip: "勾选提供弹壳弹出效果，适用枪械类武器"
}) ], WeaponDriver.prototype, "isWeaponHaveCasing", void 0);

__decorate([ mw.Property({
    displayName: "开火阻挡距离",
    group: "辅助功能",
    tooltip: "距离内如果有障碍物阻挡，弹药是真实弹道"
}) ], WeaponDriver.prototype, "fireBlockDistance", void 0);

__decorate([ mw.Property({
    displayName: "弹药数量(-1为无限)",
    group: "辅助功能",
    tooltip: "武器总子弹数",
    range: {
        max: 1e4,
        min: -1
    }
}) ], WeaponDriver.prototype, "totalAmmo", void 0);

__decorate([ mw.Property({
    displayName: "弹夹为空是否销毁武器",
    group: "辅助功能",
    tooltip: "勾选后没有子弹了会自动卸载"
}) ], WeaponDriver.prototype, "isEmptyToDestroy", void 0);

__decorate([ mw.Property({
    displayName: "支持替换弹夹",
    group: "辅助功能"
}) ], WeaponDriver.prototype, "isSupportRepAmmo", void 0);

__decorate([ mw.Property({
    displayName: "模型旋转速度",
    group: "辅助功能"
}) ], WeaponDriver.prototype, "rotateSpeed", void 0);

__decorate([ mw.Property({
    displayName: "持有时限（s）（-1为永久持有）",
    group: "辅助功能"
}) ], WeaponDriver.prototype, "keepTime", void 0);

__decorate([ mw.Property({
    hideInEditor: true,
    replicated: true,
    onChanged: "onEquipdChanged"
}) ], WeaponDriver.prototype, "isEquiped", void 0);

__decorate([ mw.Property({
    displayName: "瞄准镜",
    group: "辅助功能",
    tooltip: "勾选后瞄准时显示至第一人称瞄准镜"
}) ], WeaponDriver.prototype, "isWeaponHaveScope", void 0);

__decorate([ mw.Property({
    displayName: "自动销毁",
    group: "辅助功能",
    tooltip: "勾选后卸载武器时武器会自动销毁"
}) ], WeaponDriver.prototype, "isAutoDestroy", void 0);

__decorate([ mw.Property({
    displayName: "优先加载",
    group: "资源",
    tooltip: "需要优先加载的资源ID"
}) ], WeaponDriver.prototype, "assets", void 0);

__decorate([ PrefabReport(23) ], WeaponDriver.prototype, "onStart", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "hitCharacterMulticast", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "hitObjectMulticast", null);

__decorate([ RemoteFunction(mw.Client, mw.Multicast) ], WeaponDriver.prototype, "hitCharaPerformance", null);

__decorate([ RemoteFunction(mw.Client, mw.Multicast) ], WeaponDriver.prototype, "hitObjectPerformance", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "serverDestroyAmmo", null);

__decorate([ RemoteFunction(mw.Client, mw.Multicast) ], WeaponDriver.prototype, "clientDestroyAmmo", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "serverHideWeaponEntity", null);

__decorate([ RemoteFunction(mw.Client, mw.Multicast) ], WeaponDriver.prototype, "hideWeaponEntity", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "serverDestroy", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "serverEquip", null);

__decorate([ RemoteFunction(mw.Client) ], WeaponDriver.prototype, "clientEquip", null);

__decorate([ RemoteFunction(mw.Server) ], WeaponDriver.prototype, "serverFire", null);

__decorate([ RemoteFunction(mw.Client, mw.Multicast) ], WeaponDriver.prototype, "clientMulticastLaunch", null);

WeaponDriver = WeaponDriver_1 = __decorate([ Component ], WeaponDriver);

var WeaponDriver$1 = WeaponDriver;

var foreign64 = Object.freeze({
    __proto__: null,
    default: WeaponDriver$1
});

let SecondNoticeItem_Generate = class SecondNoticeItem_Generate extends UIScript {
    get txt_context() {
        if (!this.txt_context_Internal && this.uiWidgetBase) {
            this.txt_context_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/txt_context");
        }
        return this.txt_context_Internal;
    }
    get icon() {
        if (!this.icon_Internal && this.uiWidgetBase) {
            this.icon_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/icon");
        }
        return this.icon_Internal;
    }
    get effect() {
        if (!this.effect_Internal && this.uiWidgetBase) {
            this.effect_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/effect");
        }
        return this.effect_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.txt_context);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

SecondNoticeItem_Generate = __decorate([ UIBind("UI/notice/SecondNoticeItem.ui") ], SecondNoticeItem_Generate);

var SecondNoticeItem_Generate$1 = SecondNoticeItem_Generate;

var foreign85 = Object.freeze({
    __proto__: null,
    default: SecondNoticeItem_Generate$1
});

let Portal_Generate = class Portal_Generate extends UIScript {
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

Portal_Generate = __decorate([ UIBind("UI/Portal.ui") ], Portal_Generate);

var Portal_Generate$1 = Portal_Generate;

var foreign88 = Object.freeze({
    __proto__: null,
    default: Portal_Generate$1
});

let TaskItem_Generate = class TaskItem_Generate extends UIScript {
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mCoinCanvas() {
        if (!this.mCoinCanvas_Internal && this.uiWidgetBase) {
            this.mCoinCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCoinCanvas");
        }
        return this.mCoinCanvas_Internal;
    }
    get mCoinTextBlock() {
        if (!this.mCoinTextBlock_Internal && this.uiWidgetBase) {
            this.mCoinTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mCoinCanvas/mCoinTextBlock");
        }
        return this.mCoinTextBlock_Internal;
    }
    get mExpCanvas() {
        if (!this.mExpCanvas_Internal && this.uiWidgetBase) {
            this.mExpCanvas_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mExpCanvas");
        }
        return this.mExpCanvas_Internal;
    }
    get mExpTextBlock() {
        if (!this.mExpTextBlock_Internal && this.uiWidgetBase) {
            this.mExpTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mExpCanvas/mExpTextBlock");
        }
        return this.mExpTextBlock_Internal;
    }
    get mFinishButton() {
        if (!this.mFinishButton_Internal && this.uiWidgetBase) {
            this.mFinishButton_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mFinishButton");
        }
        return this.mFinishButton_Internal;
    }
    get mUnfinishTextBlock() {
        if (!this.mUnfinishTextBlock_Internal && this.uiWidgetBase) {
            this.mUnfinishTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/mUnfinishTextBlock");
        }
        return this.mUnfinishTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.mFinishButton.onClicked.add((() => {
            Event.dispatchToLocal("PlayButtonClick", "mFinishButton");
        }));
        this.mFinishButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mCoinTextBlock);
        this.initLanguage(this.mExpTextBlock);
        this.initLanguage(this.mUnfinishTextBlock);
        this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mFinishButton/TextBlock"));
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

TaskItem_Generate = __decorate([ UIBind("UI/Task/TaskItem.ui") ], TaskItem_Generate);

var TaskItem_Generate$1 = TaskItem_Generate;

var foreign90 = Object.freeze({
    __proto__: null,
    default: TaskItem_Generate$1
});

let RankItem_Generate = class RankItem_Generate extends UIScript {
    get mRankTextBlock() {
        if (!this.mRankTextBlock_Internal && this.uiWidgetBase) {
            this.mRankTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mRankTextBlock");
        }
        return this.mRankTextBlock_Internal;
    }
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mLvTextBlock() {
        if (!this.mLvTextBlock_Internal && this.uiWidgetBase) {
            this.mLvTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mLvTextBlock");
        }
        return this.mLvTextBlock_Internal;
    }
    get mKillTextBlock() {
        if (!this.mKillTextBlock_Internal && this.uiWidgetBase) {
            this.mKillTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mKillTextBlock");
        }
        return this.mKillTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.mRankTextBlock);
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mLvTextBlock);
        this.initLanguage(this.mKillTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

RankItem_Generate = __decorate([ UIBind("UI/WorldRank/RankItem.ui") ], RankItem_Generate);

var RankItem_Generate$1 = RankItem_Generate;

var foreign94 = Object.freeze({
    __proto__: null,
    default: RankItem_Generate$1
});

let WorldRankItem_Generate = class WorldRankItem_Generate extends UIScript {
    get mRankTextBlock() {
        if (!this.mRankTextBlock_Internal && this.uiWidgetBase) {
            this.mRankTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mRankTextBlock");
        }
        return this.mRankTextBlock_Internal;
    }
    get mNameTextBlock() {
        if (!this.mNameTextBlock_Internal && this.uiWidgetBase) {
            this.mNameTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mNameTextBlock");
        }
        return this.mNameTextBlock_Internal;
    }
    get mLvTextBlock() {
        if (!this.mLvTextBlock_Internal && this.uiWidgetBase) {
            this.mLvTextBlock_Internal = this.uiWidgetBase.findChildByPath("RootCanvas/Canvas/mLvTextBlock");
        }
        return this.mLvTextBlock_Internal;
    }
    onAwake() {
        this.canUpdate = false;
        this.layer = mw.UILayerBottom;
        this.initButtons();
    }
    initButtons() {
        this.initLanguage(this.mRankTextBlock);
        this.initLanguage(this.mNameTextBlock);
        this.initLanguage(this.mLvTextBlock);
    }
    initLanguage(ui) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
    onShow(...params) {}
    show(...param) {
        mw.UIService.showUI(this, this.layer, ...param);
    }
    hide() {
        mw.UIService.hideUI(this);
    }
};

WorldRankItem_Generate = __decorate([ UIBind("UI/WorldRank/WorldRankItem.ui") ], WorldRankItem_Generate);

var WorldRankItem_Generate$1 = WorldRankItem_Generate;

var foreign95 = Object.freeze({
    __proto__: null,
    default: WorldRankItem_Generate$1
});

const MWModuleMap = {
    "9462B9134AB0682DC540FBA67C5A6833": foreign1,
    "340700564B0DC4DABBE0AEAD023C1E1C": foreign2,
    "8E64C4B7455BF6DD12A8C48659E93A62": foreign3,
    "270556244439107F7C1C129B130B4C47": foreign4,
    B6E614EE4CFBEB1B622980B130DC3F41: foreign5,
    "34FB71B54A1B9B1C1F7CCE98D36B76F9": foreign6,
    "94FD08FD4489B96A203DD4875A6DAE3D": foreign7,
    FF0A9783402CC537EC76879C200F700E: foreign8,
    "2A49C0B64BE40027D565E38F97DB58C6": foreign9,
    "2E753F4E4DB8457EC6D4AFADE57BCE38": foreign10,
    "0A7431964B5B11F416CF938AF7E17FD9": foreign11,
    "3D86827E46DFE062C6299D96A2D6159B": foreign12,
    ECBDD5AC4AC2122033EF8798B58D37AA: foreign13,
    A01A239F4234C4386C3758B2FE029212: foreign14,
    DAC730EE4664C3CD0248308ED4995DDD: foreign15,
    "9C4B18264F2664B87A869FAE5546254D": foreign16,
    "8E80166743E390C7FDF453B210CF5DB0": foreign17,
    "290F1F4D42ECBF13317BD8BC212FA75A": foreign18,
    "812417FA4256B479A37C4FA826EEC241": foreign19,
    DBE391E64014FDD145AE40820C98022A: foreign20,
    "326FE3F34446C446C83B2AB1D6E64F2D": foreign21,
    D052578E42FD39068783C5AD26441B43: foreign22,
    "7D2B9DE34150661CF74653B40E1931B9": foreign23,
    ED23BBF34B5F0FD622DB9E8B204BB63A: foreign24,
    "6C7F83344D08B83F8B1C4998A4C54AE8": foreign25,
    "7FA339B44DB59B14F8FA579AFC4E95F1": foreign26,
    "45EAABE74863AF95B3BD629854DFE37B": foreign27,
    "403A520C4D7EB9516367C2AF87D9205A": foreign28,
    AD38B0D8452735426A0FF3AB9CE92FD9: foreign29,
    DA6104174A409793D13472AB988E276C: foreign30,
    "1C7A828E409F5DC78D8584A4987875C9": foreign31,
    "1559C3B943B2EFB7F60F04A1017C0825": foreign32,
    F6ACF34E4F87C4C28405B086D0F15C0E: foreign33,
    BE0EF4A24F46812C82DE77A934AD5B25: foreign34,
    BC35F81340805F40F97D259B1D1DBFFE: foreign35,
    ACB75369483F4EC59B381A92DFD15B4F: foreign36,
    C3BACD1147BC0F55646BC28613F362EE: foreign37,
    "1B0D5B254A629B1873FD69A0A08FCE3D": foreign38,
    "0FD5AF8844E4E0B2BA7DFC87D496B8B5": foreign39,
    DF1621DF46A167FFF7637CA5AF507E16: foreign40,
    "1455122E4A3DDA9173506CB55EE2D2BC": foreign41,
    D67EB04D4D772291545F35A028BF48E5: foreign42,
    "0FDD1C8244405CF38A7A2FB6102CFA8A": foreign43,
    "1FF1215C4BDB8CB0C5D5959EF8A7FD76": foreign44,
    "627901F347F51FD6CD75E9AA263935DE": foreign45,
    "98F26C2442DD5D577DFB1DB5FBD56877": foreign46,
    FBBADB1944458AEC8B55698516238D28: foreign47,
    D4AF7A0E43A76B4F0B545E90FF9F2D04: foreign48,
    B76CDA38487C7CCF2EA99F9AA44C018E: foreign49,
    E19F1E3B4C17AEC5722B679CF29856DC: foreign50,
    "0CB3D8634B5CA3ADADE461A07177EECC": foreign51,
    "434C95CB47F35817C482E08221863887": foreign52,
    "0C0A0F644B8CC9C4DE73C4A8B863E422": foreign53,
    "83186D5F463D7E4B6A43A99183A07038": foreign54,
    "72208CC0492B19F0626DE8A7140CAF32": foreign55,
    "357E9DA2462F9CE7CF4B43B0AA9DC354": foreign56,
    CB72CBA34C116C9F7B0FF5B5541B59EE: foreign57,
    "2909A3E141653B96AD1695BB3D9FD3E7": foreign58,
    "459EAC1C45A11267216B289C90BC7AC5": foreign59,
    "5F4167AC4B1A67501A0DD4A98DCCE793": foreign60,
    C2A63B424C2C17C9DE3395B59BA9444C: foreign61,
    "4CA21C094DAD2346E120EFBEA3D7736C": foreign62,
    E8535D714F5BFEC20EF595B175FA24BD: foreign63,
    "7F2CCB354EB99D9A0A5B778B29710155": foreign64,
    "5412430B4D7A4F6AD130678D4BC159E0": foreign65,
    CD82A2E448FA71DD00529A8B5261ED6C: foreign66,
    A80AA1E445AC0F89C299789501FC1817: foreign67,
    B73909BE4325D9DD1CDD53BB979330F7: foreign68,
    "141437E3436A6DD6EE9FFA8856006A8E": foreign69,
    "6F92130F4E442D6B7C313BB5E7504178": foreign70,
    B13319D84148A2A132789D9A3518EB41: foreign71,
    "152025324C8368BA266FD28BA6756542": foreign72,
    "54A45B784C616AFD705A84931554C089": foreign73,
    "1E43E801490C0291FB1E53A280BE78F4": foreign74,
    CB027CAE4C23E272B23B45BA5A059C66: foreign75,
    FC11EBE4461B9787A3DE34B097DCF713: foreign76,
    D15ABC2F4AF3CB8DB6FFEFA0A1E51862: foreign77,
    "3C344099431D9CE2CF5B4FB7754E7AAA": foreign78,
    "3E680A60465624995F41C9A7CE14471E": foreign79,
    C4FF91384839B61D868ECAA054B245F6: foreign80,
    "35F0EA3E46C9648F8E9C0982A296A729": foreign81,
    "644A2C3A47AE2728D6073CBF91E9BF4D": foreign82,
    D775750F43BC49C745131B858E8BCA4C: foreign83,
    "9BCFA0B1446C378BE58FE1AE4584721B": foreign84,
    "5DF0F63B468B8C999DC539AEF96DC676": foreign85,
    "454550AA4912924126C3718C9109A62E": foreign86,
    A6B37CB748A5F1F654339F874E8B362D: foreign87,
    "9B5EE307470EEBCA80694D8AA33EB9D7": foreign88,
    DF1CED73475287E358018DA9E73526AE: foreign89,
    "58F1EF114B82B13400AF2392C6AA7DB7": foreign90,
    D8C25CB445983963C8F053AA67E60436: foreign91,
    "47D5343A44EFFDDCAAE020A3F4D8813E": foreign92,
    "2FBBB9184B61008D4260EC9328716B76": foreign93,
    "611A74D041E23B9FB4A0E399D15F3B72": foreign94,
    "5464EAE94B1B72EDBDC6ED84C664149A": foreign95,
    "9D153436421F8C4C31A217941F867F7F": foreign96
};

const MWFileMapping = new WeakMap([ [ foreign1 || {}, "JavaScripts/common/Dance" ], [ foreign2 || {}, "JavaScripts/common/FlyText" ], [ foreign3 || {}, "JavaScripts/common/Guide" ], [ foreign4 || {}, "JavaScripts/common/notice/Notice" ], [ foreign5 || {}, "JavaScripts/common/notice/Tween" ], [ foreign6 || {}, "JavaScripts/common/notice/UIPool" ], [ foreign7 || {}, "JavaScripts/common/notice/Updater" ], [ foreign8 || {}, "JavaScripts/config/ConfigBase" ], [ foreign9 || {}, "JavaScripts/config/GameConfig" ], [ foreign10 || {}, "JavaScripts/config/Gun" ], [ foreign11 || {}, "JavaScripts/config/PickUpGun" ], [ foreign12 || {}, "JavaScripts/config/Role" ], [ foreign13 || {}, "JavaScripts/config/Skill" ], [ foreign14 || {}, "JavaScripts/config/Task" ], [ foreign15 || {}, "JavaScripts/const/Enum" ], [ foreign16 || {}, "JavaScripts/const/Globaldata" ], [ foreign17 || {}, "JavaScripts/const/Helper" ], [ foreign18 || {}, "JavaScripts/GameLauncher" ], [ foreign19 || {}, "JavaScripts/Interaction/SP_SoundMoveBoard" ], [ foreign20 || {}, "JavaScripts/Modified027Editor/ModifiedCamera" ], [ foreign21 || {}, "JavaScripts/Modified027Editor/ModifiedPlayer" ], [ foreign22 || {}, "JavaScripts/Modified027Editor/ModifiedSpawn" ], [ foreign23 || {}, "JavaScripts/Modified027Editor/ModifiedStaticAPI" ], [ foreign24 || {}, "JavaScripts/module/AdsModule/AdsModuleC" ], [ foreign25 || {}, "JavaScripts/module/AdsModule/AdsModuleS" ], [ foreign26 || {}, "JavaScripts/module/AdsModule/ui/AdTipsPanel" ], [ foreign27 || {}, "JavaScripts/module/Enemy/Boss" ], [ foreign28 || {}, "JavaScripts/module/Enemy/Enemy" ], [ foreign29 || {}, "JavaScripts/module/Enemy/EnemyBullet" ], [ foreign30 || {}, "JavaScripts/module/Enemy/EnemyModule" ], [ foreign31 || {}, "JavaScripts/module/GuideModule/GuideModule" ], [ foreign32 || {}, "JavaScripts/module/GunModule/GunData" ], [ foreign33 || {}, "JavaScripts/module/GunModule/GunModuleC" ], [ foreign34 || {}, "JavaScripts/module/GunModule/GunModuleS" ], [ foreign35 || {}, "JavaScripts/module/GunModule/LoginModule" ], [ foreign36 || {}, "JavaScripts/module/GunModule/PickUpGunModule" ], [ foreign37 || {}, "JavaScripts/module/GunModule/ui/BuyGunPanel" ], [ foreign38 || {}, "JavaScripts/module/GunModule/ui/GunPanel" ], [ foreign39 || {}, "JavaScripts/module/HUDModule/ATKModule" ], [ foreign40 || {}, "JavaScripts/module/HUDModule/HUDData" ], [ foreign41 || {}, "JavaScripts/module/HUDModule/HUDModuleC" ], [ foreign42 || {}, "JavaScripts/module/HUDModule/HUDModuleS" ], [ foreign43 || {}, "JavaScripts/module/HUDModule/ui/HUDPanel" ], [ foreign44 || {}, "JavaScripts/module/HUDModule/ui/KillTipItem" ], [ foreign45 || {}, "JavaScripts/module/LotteryModule/LotteryModule" ], [ foreign46 || {}, "JavaScripts/module/PickUpRoleModule/PickUpRoleModule" ], [ foreign47 || {}, "JavaScripts/module/PlayerModule/MyClearAct" ], [ foreign48 || {}, "JavaScripts/module/PlayerModule/PlayerData" ], [ foreign49 || {}, "JavaScripts/module/PlayerModule/PlayerModuleC" ], [ foreign50 || {}, "JavaScripts/module/PlayerModule/PlayerModuleS" ], [ foreign51 || {}, "JavaScripts/module/PlayerModule/ui/InputPanel" ], [ foreign52 || {}, "JavaScripts/module/PlayerModule/ui/TeamPanel" ], [ foreign53 || {}, "JavaScripts/module/RadarModule/RadarModuleC" ], [ foreign54 || {}, "JavaScripts/module/RadarModule/RadarModuleS" ], [ foreign55 || {}, "JavaScripts/module/RadarModule/ui/RadarUI" ], [ foreign56 || {}, "JavaScripts/module/RankModule/PlayerPropData" ], [ foreign57 || {}, "JavaScripts/module/RankModule/ui/WorldRankPanel" ], [ foreign58 || {}, "JavaScripts/module/RankModule/WorldRankModuleC" ], [ foreign59 || {}, "JavaScripts/module/RankModule/WorldRankModuleS" ], [ foreign60 || {}, "JavaScripts/module/TaskModule/TaskData" ], [ foreign61 || {}, "JavaScripts/module/TaskModule/TaskModuleC" ], [ foreign62 || {}, "JavaScripts/module/TaskModule/TaskModuleS" ], [ foreign63 || {}, "JavaScripts/module/TaskModule/ui/TaskPanel" ], [ foreign64 || {}, "JavaScripts/Prefabs/步枪/Script/WeaponDriver" ], [ foreign65 || {}, "JavaScripts/Prefabs/步枪/Script/WeaponUI" ], [ foreign66 || {}, "JavaScripts/Prefabs/PrefabEvent" ], [ foreign67 || {}, "JavaScripts/tools/Console" ], [ foreign68 || {}, "JavaScripts/tools/MapEx" ], [ foreign69 || {}, "JavaScripts/tools/ObjectPool" ], [ foreign70 || {}, "JavaScripts/tools/TouchScript" ], [ foreign71 || {}, "JavaScripts/tools/utils" ], [ foreign72 || {}, "JavaScripts/ui-generate/Ads/AdsTipsPanel_generate" ], [ foreign73 || {}, "JavaScripts/ui-generate/BuyRole/BuyRolePanel_generate" ], [ foreign74 || {}, "JavaScripts/ui-generate/BuyRole/RolePanel_generate" ], [ foreign75 || {}, "JavaScripts/ui-generate/Enemy/CubeLifebar_generate" ], [ foreign76 || {}, "JavaScripts/ui-generate/Gun/BuyGunPanel_generate" ], [ foreign77 || {}, "JavaScripts/ui-generate/Gun/GunItem_generate" ], [ foreign78 || {}, "JavaScripts/ui-generate/Gun/GunPanel_generate" ], [ foreign79 || {}, "JavaScripts/ui-generate/Gun/LoginPanel_generate" ], [ foreign80 || {}, "JavaScripts/ui-generate/HUD/HUDPanel_generate" ], [ foreign81 || {}, "JavaScripts/ui-generate/HUD/KillTipItem_generate" ], [ foreign82 || {}, "JavaScripts/ui-generate/Lottery/LotteryItem_generate" ], [ foreign83 || {}, "JavaScripts/ui-generate/Lottery/LotteryPanel_generate" ], [ foreign84 || {}, "JavaScripts/ui-generate/notice/NoticeView_generate" ], [ foreign85 || {}, "JavaScripts/ui-generate/notice/SecondNoticeItem_generate" ], [ foreign86 || {}, "JavaScripts/ui-generate/notice/TopNoticeItem_generate" ], [ foreign87 || {}, "JavaScripts/ui-generate/Player/InputPanel_generate" ], [ foreign88 || {}, "JavaScripts/ui-generate/Portal_generate" ], [ foreign89 || {}, "JavaScripts/ui-generate/Prefabs/步枪/UI/WeaponUI_generate" ], [ foreign90 || {}, "JavaScripts/ui-generate/Task/TaskItem_generate" ], [ foreign91 || {}, "JavaScripts/ui-generate/Task/TaskPanel_generate" ], [ foreign92 || {}, "JavaScripts/ui-generate/Team/TeamItem_generate" ], [ foreign93 || {}, "JavaScripts/ui-generate/Team/TeamPanel_generate" ], [ foreign94 || {}, "JavaScripts/ui-generate/WorldRank/RankItem_generate" ], [ foreign95 || {}, "JavaScripts/ui-generate/WorldRank/WorldRankItem_generate" ], [ foreign96 || {}, "JavaScripts/ui-generate/WorldRank/WorldRankPanel_generate" ] ]);

exports.MWFileMapping = MWFileMapping;

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=game.js.map
