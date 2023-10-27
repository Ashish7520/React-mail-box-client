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
    <div className={classes.background}>
      <div className={classes.formContainer}>
        <div>
          <label>Email address</label>
          <input type="email" placeholder="Enter email" ref={inputEmailRef} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
          />
        </div>

        <button className={classes.btn} type="submit" onClick={formHandler}>
          {isLogin ? "Login" : "Sign-Up"}
        </button>

        <p onClick={loginHandler}>
          {isLogin ? "New User - Sign Up" : "Already User - Login"}
        </p>
      </div>
    </div>
  );
};

export default Signup;
