import React from "react";
import { Route } from "react-router-dom";
import Mailbox from "./pages/Mailbox";

import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Route path="/user">
        <Signup />
      </Route>
      <Route path="/mail">
        <Mailbox />
      </Route>
    </div>
  );
}

export default App;
