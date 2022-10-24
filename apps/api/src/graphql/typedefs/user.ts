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
    active: Boolean!
  }

  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    users: [User]!
  }
`;
