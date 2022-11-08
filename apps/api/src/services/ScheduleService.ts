import { Schedule } from "@romalms/database/models";

export class ScheduleService {
  static getScheduleById(scheduleId: number) {
    return Schedule.findByPk(scheduleId);
  }
}
