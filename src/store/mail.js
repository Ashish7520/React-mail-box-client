import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mails: [],
};

const mail = createSlice({
  name: "mail",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      console.log(action.payload, "inside reducer");
      state.mails.push(action.payload);
    },
  },
});

export const mailAction = mail.actions;

export default mail.reducer;
