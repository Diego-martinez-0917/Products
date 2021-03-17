import React from "react";
import { Button, CardContent, TextField, Typography } from "@material-ui/core";

export default function LoginContent({
  onChangeEmail,
  onChangePass,
  onSubmitLogin,
  onSubmitLoginGoogle,
  email,
  password,
  errorMenssage
}) {
  return (
    <CardContent className="login-content">
      <TextField
        required
        className="input"
        id="email"
        label="email"
        onChange={onChangeEmail}
        value={email}
        error={errorMenssage!==''}
      />
      <TextField
        required
        className="input"
        id="password"
        label="Password"
        type="password"
        onChange={onChangePass}
        value={password}
        error={errorMenssage!==''}
      />
      <Typography>{errorMenssage}</Typography>
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={onSubmitLogin}
      >
        Login
      </Button>
      <Typography>O</Typography>
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={onSubmitLoginGoogle}
      >
        Login with Google
      </Button>
    </CardContent>
  );
}
