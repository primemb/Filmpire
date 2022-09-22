import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: null | string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  sessionId: string;
}

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id") as string;

      localStorage.setItem("accountId", action.payload.id.toString());
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.sessionId = "";
      localStorage.clear();
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
