import React from "react";
import { Button, CardContent, TextField, Typography } from "@material-ui/core";

export default function RegisterContent({
  onChangeEmail,
  onChangePass,
  onChangePassConfirm,
  onSubmitRegister,
  email,
  password,
  passwordConfirm,
  errorMenssage
}) {
  return (
    <CardContent className="register-content">
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
      <TextField
        required
        className="input"
        id="password Confirmation"
        label="Password Confirmation"
        type="password"
        onChange={onChangePassConfirm}
        value={passwordConfirm}
        error={errorMenssage!==''}
      />
      <Typography>{errorMenssage}</Typography>
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={onSubmitRegister}
      >
        Sing up
      </Button>
    </CardContent>
  );
}
