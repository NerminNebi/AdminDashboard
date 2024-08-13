import { IUsers } from "@/pages/Users/userList/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { revertAll } from "../constant";

let initialState: IUsers = {
  data: [
    {
      email: "",
      firstName: "",
      id: 0,
      isActive: true,
      lastName: "",
      phone: "",
    },
  ],
  totalCount: 0,
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state: IUsers, action: PayloadAction<IUsers>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
});

export const { getUsers } = UserSlice.actions;

export default UserSlice.reducer;
