import authReducer from "./Auth";
import mailReducer from "./mail";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { auth: authReducer, mail: mailReducer },
});

export default store;
