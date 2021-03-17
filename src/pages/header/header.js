import React from "react";
import { Typography,Button } from "@material-ui/core";


export default function Header({onsubmit}) {
  return (
    <header className="header">
      <Typography variant="h1">Products</Typography>
      <Button className='button' variant="contained" color="primary" onClick={onsubmit}>
        logout
      </Button>
    </header>
  );
}
