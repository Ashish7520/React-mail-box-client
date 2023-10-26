import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Mailbox from "./pages/Mailbox";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

let initialRendering = true;

function App() {
  const mail = useSelector((state) => state.mail.mails);
  console.log(mail, "inside app");

  useEffect(() => {
    if (initialRendering) {
      initialRendering = false;
      return;
    }
    async function fetchData() {
      try {
        const response = await fetch(
          "https://mailbox-3601b-default-rtdb.firebaseio.com/mail.json",
          {
            method: "PUT",
            body: JSON.stringify(mail),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const err = await response.json();
          console.log(err);
          throw new Error(err.error.message);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [mail]);

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
