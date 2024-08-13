import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IUser } from "./type";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { revertAll } from "../constant";

let initialState: ILogin = {
  user: {
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    userName: "",
  },
  token: "",
  refreshToken: "",
  expiresAt: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<
        Pick<ILogin, "expiresAt" | "refreshToken" | "token">
      >
    ) => {
      const { expiresAt, refreshToken, token } = action.payload;
      state.expiresAt = expiresAt;
      state.refreshToken = refreshToken;
      state.token = token;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },
});

export const { setToken, setUser } = authSlice.actions;

const authReducer = persistReducer(
  {
    key: "Auth",
    storage: storage,
    whitelist: ["user", "token", "refreshToken", "expiresAt"],
  },
  authSlice.reducer
);

export default authReducer;
