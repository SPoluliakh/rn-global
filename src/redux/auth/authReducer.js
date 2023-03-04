import { createSlice } from "@reduxjs/toolkit";
import { register, authCurrent, authLogout, authLogin } from "./authOperations";

const initialState = {
  userId: null,
  name: null,
  email: null,
  avatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state, _) => state)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.name = payload.displayName;
        state.email = payload.email;
        state.avatar = payload.photoURL;
        state.stateChange = true;
      })
      .addCase(register.rejected, (state, _) => {
        state = initialState;
      })
      .addCase(authCurrent.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.name = payload.displayName;
        state.email = payload.email;
        state.avatar = payload.photoURL;
        state.stateChange = payload.stateChange;
      })
      .addCase(authCurrent.rejected, (state, _) => {
        state = initialState;
      })
      .addCase(authLogin.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.name = payload.displayName;
        state.email = payload.email;
        state.avatar = payload.photoURL;
        state.stateChange = true;
      })
      .addCase(authLogout.fulfilled, (state, _) => {
        state.userId = null;
        state.name = null;
        state.email = null;
        state.avatar = null;
        state.stateChange = false;
      }),
});
