import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  accessExpirationTime: null,
  token: null,
  id: null,
  name: null,
  username: null,
  email: null,
  profileImageUrl: null,
  isLoggedIn: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const {
        accessExpirationTime,
        id,
        name,
        username,
        email,
        profileImageUrl,
        token,
      } = action.payload;
      state.accessExpirationTime = accessExpirationTime;
      state.token = token;
      state.id = id;
      state.name = name;
      state.username = username;
      state.email = email;
      state.profileImageUrl = profileImageUrl;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.accessExpirationTime = initialAuthState.accessExpirationTime;
      state.token = initialAuthState.token;
      state.id = initialAuthState.id;
      state.name = initialAuthState.name;
      state.username = initialAuthState.username;
      state.email = initialAuthState.email;
      state.profileImageUrl = initialAuthState.profileImageUrl;
      state.isLoggedIn = false;
    },
    updateUserInfo(state, action) {
      const { name, username, profileImageUrl } = action.payload;
      state.name = name;
      state.username = username;
      state.profileImageUrl = profileImageUrl;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
