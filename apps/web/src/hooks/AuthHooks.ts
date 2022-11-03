import { gql, QueryHookOptions, useMutation, useQuery } from "@apollo/client";

type TokenResponse = {
  auth: {
    token: string;
  };
};

export const useRegisterMutation = () => {
  return useMutation<TokenResponse>(gql`
    mutation UserRegister($input: LoginFormValues!) {
      auth(input: $input)
        @rest(path: "/auth/register", method: "POST", type: "Token") {
        token
      }
    }
  `);
};

export const useLoginMutation = () => {
  return useMutation<TokenResponse>(gql`
    mutation UserLogin($input: LoginInput!) {
      auth(input: $input)
        @rest(path: "/auth/login", method: "POST", type: "Token") {
        token
      }
    }
  `);
};

export const useTokenValidation = (options?: QueryHookOptions) => {
  return useQuery<TokenResponse>(
    gql`
      query UserTokenValidation {
        auth @rest(type: "Token", path: "/auth", method: "GET") {
          token
        }
      }
    `,
    options
  );
};
