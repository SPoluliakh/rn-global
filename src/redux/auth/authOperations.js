import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

export const register = createAsyncThunk(
  "auth/register",
  async (state, thunkAPI) => {
    try {
      const { email, password, login } = state;
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });
      const { uid, displayName, photoURL } = await auth.currentUser;

      return {
        uid,
        displayName,
        email,
        photoURL,
      };
    } catch (error) {
      console.log("error.message", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (state, thunkAPI) => {
    try {
      const { email, password } = state;
      const {
        user: { uid, displayName, photoURL },
      } = await signInWithEmailAndPassword(auth, email, password);

      return {
        uid,
        displayName,
        email,
        photoURL,
      };
    } catch (error) {
      console.log("error.message", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authLogout = createAsyncThunk(
  "auth/Logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.log("error.message", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authCurrent = createAsyncThunk(
  "auth/current",
  async (_, thunkAPI) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          return thunkAPI.fulfillWithValue({
            uid,
            email,
            displayName,
            photoURL,
            stateChange: true,
          });
        }
      });
    } catch (error) {
      console.log("error.message", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
