export const privilegesTypeDef = `#graphql
  type Privilege {
    id: ID!
    name: String!
  }
  
  extend type Query {
    privileges: [Privilege]!
  }
`;
