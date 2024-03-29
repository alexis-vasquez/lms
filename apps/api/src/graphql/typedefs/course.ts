export const courseTypeDef = `#graphql
  type Course implements Timestamps {
    id: ID!
    name: String!
    description: String
    categoryId: ID
    level: String
    rate: Float!
    courseStatusId: ID!
    ownerId: ID!
    owner: User!
    enable: Boolean!
    scheduleId: ID!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    courses: [Course]!
    mycourses: [Course]!
    course(courseId: ID!): Course
  }
`;
