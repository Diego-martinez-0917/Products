import React from "react";
import { Button, CardContent, TextField } from "@material-ui/core";

export default function RegisterContent({
  onChangeEmail,
  onChangePass,
  onChangePassConfirm,
  onSubmitRegister,
  email,
  password,
  passwordConfirm,
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
      />
      <TextField
        required
        className="input"
        id="password"
        label="Password"
        type="password"
        onChange={onChangePass}
        value={password}
      />
      <TextField
        required
        className="input"
        id="password Confirmation"
        label="Password Confirmation"
        type="password"
        onChange={onChangePassConfirm}
        value={passwordConfirm}
      />
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
