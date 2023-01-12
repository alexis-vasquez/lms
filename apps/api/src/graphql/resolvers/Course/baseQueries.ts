import { User } from "@romalms/database/models";
import { CourseModel } from "@romalms/database/models/Course";

export const courseBaseQueryResolver = {
  Course: {
    owner: (course: CourseModel) => User.findByPk(course.ownerId),
  },
};
