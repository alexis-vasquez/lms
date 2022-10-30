export const userTypeDef = `#graphql
  type User implements Timestamps {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    roleId: ID!
    createdAt: String!
    updatedAt: String!
    role: Role!
    privileges: [Privilege]!
    active: Boolean!
  }

  extend type Query {
    users: [User]!
    user(userId: ID!): User
    me: User!
  }

  extend type Mutation {
    users: [User]!
  }
`;
