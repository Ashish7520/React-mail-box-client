import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Mailbox from "./pages/Mailbox";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Inbox from "./pages/Inbox";
import Sidebar from "./components/Sidebar";
import Sent from "./pages/Sent";
import Trash from "./pages/Trash";
import Draft from "./pages/Draft";
import { Button } from "react-bootstrap";

let initialRendering = true;

function App() {
  const mail = useSelector((state) => state.mail.mails);
  console.log(mail, "inside app");

  const history = useHistory();

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

  const buttonHandler = () => {
    history.replace("/mail");
  };

  return (
    <div>
      <Route path="/user">
        <Signup />
      </Route>
      <Route exact path="/mail">
        <Mailbox />
      </Route>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Switch>
              <Route exact path="/inbox">
                <Inbox />
              </Route>
              <Route exact path="/sent">
                <Sent />
              </Route>
              <Route exact path="/draft">
                <Draft />
              </Route>
              <Route exact path="/trash">
                <Trash />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <Button variant="primary" onClick={buttonHandler}>
        Compose
      </Button>
    </div>
  );
}

export default App;
