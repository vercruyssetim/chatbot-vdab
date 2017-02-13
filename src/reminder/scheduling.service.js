import schedule from 'node-schedule';

export default class SchedulingService{
    constructor(){
        this.schedules = {};
    }

    schedule(sessionId, callBack){
        this.stop(sessionId);
        this.schedules[sessionId] = schedule.scheduleJob(new schedule.RecurrenceRule(), callBack);
    }

    stop(sessionId){
        if(this.schedules[sessionId]){
            this.schedules[sessionId].cancel();
        }
    }
}