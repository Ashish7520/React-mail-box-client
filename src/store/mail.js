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

    isViewed: (state, action) => {
      const id = action.payload;
      console.log(id, "inside reducer");
      const mailToView = state.mails.find((item) => item.id == id);
      if (mailToView) {
        mailToView.isViewed = true;
      }
    },
  },
});

export const mailAction = mail.actions;

export default mail.reducer;
