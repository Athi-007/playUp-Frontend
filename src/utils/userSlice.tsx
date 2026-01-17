import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null as any,
  reducers: {
    addUser: (_state, action) => action.payload,
    removeUser: () => null,

    updateProfileImage: (state, action) => {
      if (!state) return;
      state.profileImage = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  updateProfileImage,
} = userSlice.actions;

export default userSlice.reducer;
