export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export type AppContextType = {
  user: null | User;
  setToken: (token: string | undefined) => void;
};