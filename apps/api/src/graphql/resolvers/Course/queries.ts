import { CourseService } from "../../../services/CourseService";

export const courseQueryResolver = {
  courses: () => CourseService.getAllCourses(),
  course: (_: void, args: { courseId: number }) =>
    CourseService.getCourseById(args.courseId),
};
