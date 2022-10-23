export const privilegesTypeDef = `#graphql
  type Privilege {
    id: ID!
    name: String!
    roles: [Role]!
  }
  
  extend type Query {
    privileges: [Privilege]!
  }
`;
