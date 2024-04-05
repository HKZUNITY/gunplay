import { LogType } from "../tools/Console";


export default class Globaldata {
    /**log级别 */
    public static logLevel: LogType = 0;

    /**是否隐藏头顶UI */
    public static isHideHeadUI: boolean = false;

    /**是否开启IAA */
    public static isOpenIAA: boolean = false;

    /**组队ICON */
    public static TeamIcon: string[] = [
        "165111",
        "165109",
        "165108",
        "165107",
        "165106",
        "184518",
        "159775",
        "184516",
        "184927",
        "170391",
        "169718",
        "54193",
        "168056",
        "168058"
    ];

    /**组队ICON尺寸 */
    public static TeamIconSize: mw.Vector2[] = [
        new mw.Vector2(460.8, 691.2),
        new mw.Vector2(460.8, 691.2),
        new mw.Vector2(460.8, 691.2),
        new mw.Vector2(460.8, 691.2),
        new mw.Vector2(460.8, 691.2),
        new mw.Vector2(617.5, 572),
        new mw.Vector2(600, 600),
        new mw.Vector2(460.8, 691.2),
        new mw.Vector2(563.2, 601.6),
        new mw.Vector2(876, 614.4),
        new mw.Vector2(672.77, 721.92),
        new mw.Vector2(650, 650),
        new mw.Vector2(672.77, 721.92),
        new mw.Vector2(672.77, 721.92)
    ]

    /**组队ICON位置 */
    public static TeamIconPos: mw.Vector2[] = [
        new mw.Vector2(20, 70),
        new mw.Vector2(20, 70),
        new mw.Vector2(20, 70),
        new mw.Vector2(20, 70),
        new mw.Vector2(20, 70),
        new mw.Vector2(-58.75, 121.28),
        new mw.Vector2(-50, 164.36),
        new mw.Vector2(20, 70),
        new mw.Vector2(-63.2, 156.36),
        new mw.Vector2(-188, 161.88),
        new mw.Vector2(-86.92, 76.32),
        new mw.Vector2(-75, 124),
        new mw.Vector2(-86.92, 76.32),
        new mw.Vector2(-86.92, 76.32)
    ]

    /**每日刷新时间（目前是凌晨4点，格式为4:0） */
    public static dailyRefreshTime: string = "4:0";
    /**每周刷新时间（目前是每周一凌晨4点，格式为4:0） */
    public static weeklyRefreshTime: string = "4:0";

    public static rankNpcAnimations: string[] = [
        "14625",
        "123720",
        "123722",
        "148733",
        "123296"
    ];
    public static teamCount: number = 10;
}