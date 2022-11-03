import { User } from "@/context/AuthContext/types";
import { gql, QueryHookOptions, useQuery } from "@apollo/client";

export const useProfileQuery = (options?: QueryHookOptions) => {
  return useQuery<{ me: User }>(
    gql`
      query Query {
        me {
          id
          firstName
          lastName
          email
        }
      }
    `,
    options
  );
};
