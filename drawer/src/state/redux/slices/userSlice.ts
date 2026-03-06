import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: "Usuario Demo",
    email: "demo@correo.com",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
