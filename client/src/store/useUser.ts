import { create } from "zustand";

type UserState = {
  isFetching: boolean;
  user: any;
};

type UserActions = {
  setUser: (user: UserState["user"]) => void;
  setIsFetching: (isFetching: UserState["isFetching"]) => void;
};

export const useUser = create<UserState & UserActions>((set) => ({
  user: null,
  isFetching: false,
  setUser: (user) => set(() => ({ user })),
  setIsFetching: (isFetching) => set(() => ({ isFetching })),
}));