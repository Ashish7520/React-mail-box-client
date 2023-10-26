import { Form, Button, Card } from "react-bootstrap";
import { authActions } from "../store/Auth";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import classes from "./Signup.module.css";

const Signup = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();

  const loginHandler = () => {
    const data = !isLogin;
    setIsLogin(data);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (enteredEmail.length == 0 || enteredPassword.length == 0) {
      return;
    }

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAowzgsbBmyT4bXfZpL5bwXG2Orrl64r7Y";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAowzgsbBmyT4bXfZpL5bwXG2Orrl64r7Y";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        console.log(err);
        alert(err.error.message);
        throw new Error(err.message);
      }

      const data = await response.json();
      console.log(data.idToken);
      dispatch(authActions.login(data.idToken));
      localStorage.setItem("email", enteredEmail);
      history.replace("/mail");
    } catch (error) {
      console.log(error);
    }

    console.log(enteredEmail, enteredPassword);
  };

  return (
    <div className={classes.outerDiv}>
      <Card>
        <Card.Body>
          <Form onSubmit={formHandler}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={inputEmailRef}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={inputPasswordRef}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isLogin ? "Login" : "Sign-Up"}
            </Button>
          </Form>
          <Card.Text onClick={loginHandler}>
            {isLogin ? "New User - Sign Up" : "Already User - Login"}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
