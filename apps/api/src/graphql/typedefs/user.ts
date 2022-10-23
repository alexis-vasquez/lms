export const userTypeDef = `#graphql
  type User implements Timestamps {
    id: ID!
    name: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    users: [User]!
  }

  extend type Mutation {
    users: [User]!
  }
`;
