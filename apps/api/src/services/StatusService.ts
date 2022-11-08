import { CourseStatus } from "@romalms/database/models";

export class StatusService {
  static getStatusById(statusId: number) {
    return CourseStatus.findByPk(statusId);
  }
}
