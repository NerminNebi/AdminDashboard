import AuthReducer from "@/redux/features/auth/authSlice";
import UserReducer from "@/redux/features/users/userSlice";

import { authApi } from "@/redux/api/authApi";
import { usersApi } from "@/redux/api/usersApi";

export const reducer = {
  auth: AuthReducer,
  users: UserReducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
};

export const middlewares = [authApi.middleware, usersApi.middleware];
