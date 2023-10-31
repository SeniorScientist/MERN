import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
};

type AuthActions = {
  setIsAuthenticated: (isAuth: AuthState["isAuthenticated"]) => void;
};

export const useAuth = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
}));