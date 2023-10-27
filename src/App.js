import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Mailbox from "./pages/Mailbox";
import Signup from "./pages/Signup";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/Auth";
import Inbox from "./pages/Inbox";
import Sidebar from "./components/Sidebar";
import Sent from "./pages/Sent";
import Trash from "./pages/Trash";
import Draft from "./pages/Draft";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./App.module.css";

let initialRendering = true;

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin, "is login");
  const mail = useSelector((state) => state.mail.mails);
  console.log(mail, "inside app");

  const history = useHistory();
  const location = useLocation();

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

  // Conditionally render the Sidebar based on the current location
  const shouldRenderSidebar = location.pathname !== "/mail";
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/user");
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.appCard}>
        {!isLogin && (
          <Route path="/user">
            <Signup />
          </Route>
        )}

        {isLogin && (
          <Route path="/user">
            <Redirect to="/" /> {/* Redirect to the root when logged in */}
          </Route>
        )}

        {!isLogin && <Redirect from="/" to="/user" />}

        {isLogin && (
          <Route exact path="/mail">
            <Mailbox />
          </Route>
        )}
        {isLogin && (
          <div className="container">
            <div className="row">
              {shouldRenderSidebar && (
                <div className={`col-md-3 ${styles.sidebar}`}>
                  <Sidebar />
                </div>
              )}
              <div className={shouldRenderSidebar ? "col-md-9" : "col-md-12"}>
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
        )}
        {isLogin && (
          <button className={styles.appBtn} onClick={logoutHandler}>
            Logout
          </button>
        )}
        {isLogin && (
          <button className={styles.appBtn} onClick={buttonHandler}>
            Compose
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
