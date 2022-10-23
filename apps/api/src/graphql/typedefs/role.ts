export const roleTypeDef = `#graphql
  type Role {
    id: ID!
    name: String!
    privileges: [Privilege]!
  }

  extend type Query {
    roles: [Role]!
  }
`;
