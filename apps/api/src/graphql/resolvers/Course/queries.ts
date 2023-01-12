import { CourseService } from "../../../services/CourseService";

export const courseQueryResolver = {
  courses: () => CourseService.getAllCourses(),
  course: (_: any, args: { courseId: number }) =>
    CourseService.getCourseById(args.courseId),
  mycourses: (_: any, args: { userId: number }) => [],
};
