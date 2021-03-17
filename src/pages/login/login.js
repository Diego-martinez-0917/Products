import React, { useState } from "react";
import { Card, Container, Typography, Link } from "@material-ui/core";
import firebase from "../../utils/firebaseConfig";
import { useHistory } from "react-router-dom";
import LoginContent from "../../components/loginContent";
import RegisterContent from "../../components/registerContent";

export default function Login() {
  const history = useHistory();
  const [regis, setRegis] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMenssage, setErrorMenssage] = useState("");

  const onSubmitLoginGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem("userID", result.user.uid);
        history.push("/");
      })
      .catch((error) => {
        setErrorMenssage(error.message);
      });
  };

  const onSubmitLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("userID", user.user.uid);
        history.push("/");
      })
      .catch((error) => {
        setErrorMenssage(error.message);
      });
  };

  const onSubmitRegister = () => {
    if (password !== passwordConfirm) {
      setErrorMenssage("fields do not match do not match");
    }
    else{
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          onSubmitLogin();
        })
        .catch((error) => {
          setErrorMenssage(error.message);
        });
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePass = (event) => {
    setPassword(event.target.value);
  };

  const onChangePassConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const changeView = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setRegis(!regis);
  };

  return (
    <Container className="login-content">
      <Card className="card">
        <Typography variant="h4" gutterBottom>
          {!regis ? "Log in" : "Sing up"}
        </Typography>
        {!regis ? (
          <LoginContent
            onChangeEmail={onChangeEmail}
            onChangePass={onChangePass}
            onSubmitLogin={onSubmitLogin}
            onSubmitLoginGoogle={onSubmitLoginGoogle}
            email={email}
            password={password}
            errorMenssage={errorMenssage}
          />
        ) : (
          <RegisterContent
            onChangeEmail={onChangeEmail}
            onChangePass={onChangePass}
            onChangePassConfirm={onChangePassConfirm}
            onSubmitRegister={onSubmitRegister}
            email={email}
            password={password}
            passwordConfirm={passwordConfirm}
            errorMenssage={errorMenssage}
          />
        )}
      </Card>
      {!regis && (
        <Typography>
          Need a account
          <Link onClick={changeView}> Sign up with email</Link>
        </Typography>
      )}
      {regis && (
        <Typography>
          Already have an count?
          <Link onClick={changeView}> Log in</Link>
        </Typography>
      )}
    </Container>
  );
}
