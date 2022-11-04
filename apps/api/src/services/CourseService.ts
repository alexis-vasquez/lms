import { Course } from "@romalms/database/models";

export class CourseService {
  static getAllCourses() {
    return Course.findAll({});
  }

  static getCourseById(courseId: number) {
    return Course.findByPk(courseId);
  }
}
