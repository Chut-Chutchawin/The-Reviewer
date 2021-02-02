import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../images/TMDB.svg";
import { Box } from "@material-ui/core";
const useStyles = makeStyles({
  background: {
    height: 326,
    backgroundColor: "#0d253f",
  },
  wrapper: {},
  image: {
    marginTop: 50,
    width: 160,
    height: 124,
  },
});

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.background}>
      <Box className={classes.wrapper} paddingX={70}>
        <img className={classes.image} src={logo} alt='TMDB logo' />
      </Box>
    </div>
  );
}
