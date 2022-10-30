export const roleTypeDef = `#graphql
  type Role {
    id: ID!
    name: String!
  }

  extend type Query {
    roles: [Role]!
    role(roleId: ID!): Role
  }
`;
