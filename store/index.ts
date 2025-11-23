import { create } from "zustand";
import { getUserSessionData } from "@/lib/utils/user";

type UserData = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type SessionData = {
  user: UserData;
  session: {
    token: string;
    expiresAt: Date;
  };
} | null;

type UserStore = {
  userSessionData: SessionData;
  isLoading: boolean;
  setUserSessionData: (data: SessionData) => void;
  fetchUserSession: () => Promise<void>;
  clearUserSession: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userSessionData: null,
  isLoading: false,

  setUserSessionData: (data: SessionData) => set({ userSessionData: data }),

  fetchUserSession: async () => {
    set({ isLoading: true });
    try {
      const session = await getUserSessionData();
      if (session?.data) {
        set({ userSessionData: session.data, isLoading: false });
      } else {
        set({ userSessionData: null, isLoading: false });
      }
    } catch (error) {
      set({ userSessionData: null, isLoading: false });
    }
  },

  clearUserSession: () => set({ userSessionData: null }),
}));
