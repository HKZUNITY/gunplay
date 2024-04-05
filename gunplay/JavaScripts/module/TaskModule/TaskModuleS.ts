import Globaldata from "../../const/Globaldata";
import { Utils } from "../../tools/utils";
import { TaskData, TaskItemType } from "./TaskData";
import TaskModuleC from "./TaskModuleC";

export default class TaskModuleS extends ModuleS<TaskModuleC, TaskData> {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
    }

    private playerTaskMap: Map<number, mw.Player> = new Map<number, mw.Player>();
    protected onPlayerEnterGame(player: mw.Player): void {
        this.playerTaskMap.set(player.playerId, player);
        this.checkResetTask_onEnterGame(player, 0);
        this.getClient(player).net_getServerTaskData(new Date().getTime());
    }

    protected onPlayerLeft(player: mw.Player): void {
        let playerID = player.playerId;
        if (!this.playerTaskMap.has(playerID)) return;
        this.playerTaskMap.delete(playerID);
        DataCenterS.getData(player, TaskData).saveLastDayNow(Date.now(), Number(Utils.getWhatDay()));
    }

    protected onUpdate(dt: number): void {
        this.checkResetTask_onLine(dt);
    }

    private taskCheckTime: number = 60;
    private taskCheckTimer: number = 0;
    /**
     * 检查重置任务（每日&每周）(玩家一直在线状态下的检查)
     * @param dt 
     */
    private checkResetTask_onLine(dt: number): void {
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

    /**重置当前房间内所有玩家的每日任务 */
    public resetAllPlayersDailyTask(): void {
        this.playerTaskMap.forEach((player: mw.Player) => {
            DataCenterS.getData(player, TaskData).resetDailyTask();
        });
        this.getAllClient().net_resetDailyTask();
    }

    /**重置当前房间内所有玩家的每周任务 */
    public resetAllPlayersWeeklyTask(): void {
        this.playerTaskMap.forEach((player: mw.Player) => {
            DataCenterS.getData(player, TaskData).resetWeeklyTask();
        });
        this.getAllClient().net_resetWeeklyTask();
    }

    /**
     * 保存成就数据
     * @param achievementType 成就类型 
     * @param progress 进度
     * @param isOnComplete 是否完成
     */
    @Decorator.noReply()
    public net_saveTaskProgress(dailyTaskIds: number[], dailyTaskTypes: TaskItemType[], dailyProgresss: number[],
        weeklyTaskIds: number[], weeklyTaskTypes: TaskItemType[], weeklyProgresss: number[]): void {
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

    @Decorator.noReply()
    public net_updateTaskConpleteData(vipTaskType: TaskItemType): void {
        this.currentData.updateTaskCompleteData(vipTaskType);
    }

    public checkResetTask_onEnterGame_GM(player: mw.Player, day: number): void {
        this.checkResetTask_onEnterGame(player, day * 86400 * 1000);
        this.getClient(player).net_getServerTaskData(new Date().getTime());
    }

    /**
     * 检查重置任务（每日&每周）(玩家进入游戏时的检查)
     */
    private checkResetTask_onEnterGame(player: mw.Player, day: number): void {
        let dailyRefreshTime: number = 0;
        let dailyRefreshTimeNums = Globaldata.dailyRefreshTime.split(":");
        dailyRefreshTime = Number(dailyRefreshTimeNums[0]) + Number((Number(dailyRefreshTimeNums[1]) / 60).toFixed(2));

        let weeklyRefreshTime: number = 0;
        let weeklyRefreshTimeNums = Globaldata.weeklyRefreshTime.split(":");
        weeklyRefreshTime = Number(weeklyRefreshTimeNums[0]) + Number((Number(weeklyRefreshTimeNums[1]) / 60).toFixed(2));

        let currentDayNow: number = Date.now() + day;
        let lastDayNow = DataCenterS.getData(player, TaskData).lastDayNow;

        //计算两个时间戳相差的秒数
        let seconds = Math.floor((currentDayNow - lastDayNow) / 1000);

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

        //检查每日任务
        if (seconds >= 86400) {
            //超过一天
            DataCenterS.getData(player, TaskData).resetDailyTask();
        } else {
            //不超过一天
            if (lastDay == currentDay) {
                //同一天
                if (lastSecondss < dailyRefreshTime * 3600 && currentSecondss >= dailyRefreshTime * 3600) {
                    DataCenterS.getData(player, TaskData).resetDailyTask();
                }
            } else {
                //不同一天
                if ((lastSecondss >= 0 && lastSecondss < dailyRefreshTime * 3600 && currentSecondss >= 0 && currentSecondss < dailyRefreshTime * 3600) ||
                    (lastSecondss >= dailyRefreshTime * 3600 && lastSecondss < 24 * 3600 && currentSecondss >= dailyRefreshTime * 3600 && currentSecondss < 24 * 3600)) {
                    DataCenterS.getData(player, TaskData).resetDailyTask();
                }
            }
        }

        //检查每周任务
        if (seconds >= 86400 * 7) {
            //超过一周
            DataCenterS.getData(player, TaskData).resetWeeklyTask();
        } else {
            //不超过一周
            //判断两个时间戳是否在同一周
            let latWhatDay = Utils.getLastDay(lastDay);
            let currentWhatDay = Utils.getWhatDay();
            if (Utils.iSameWeek(lastDayNow, currentDayNow)) {
                //同一周
                if (latWhatDay == "1" && lastSecondss < weeklyRefreshTime * 3600) {
                    if ((currentWhatDay == "1" && currentSecondss >= weeklyRefreshTime * 3600) || currentWhatDay != "1") {
                        DataCenterS.getData(player, TaskData).resetWeeklyTask();
                    }
                }
            } else {
                //不同一周
                if (latWhatDay == "1" && lastSecondss >= 0 && lastSecondss < weeklyRefreshTime * 3600 && currentWhatDay == "1" && currentSecondss >= 0 && currentSecondss < weeklyRefreshTime * 3600) {
                    DataCenterS.getData(player, TaskData).resetWeeklyTask();
                }
                if (((latWhatDay == "1" && lastSecondss >= weeklyRefreshTime * 3600 && lastSecondss < 24 * 3600) || (latWhatDay != "1"))
                    && ((currentWhatDay == "1" && currentSecondss >= weeklyRefreshTime * 3600 && currentSecondss < 24 * 3600) || (currentWhatDay != "1"))) {
                    DataCenterS.getData(player, TaskData).resetWeeklyTask();
                }
            }
        }
    }

    /**
     * 重置每日任务
     */
    public net_resetDailyTask(): void {
        this.currentData.resetDailyTask();
    }

    /**
     * 重置每周任务
     */
    public net_resetWeeklyTask(): void {
        this.currentData.resetWeeklyTask();
    }

    public killPlayer(player: mw.Player, isBoss: boolean): void {
        this.getClient(player).net_killPlayer(isBoss);
    }
}