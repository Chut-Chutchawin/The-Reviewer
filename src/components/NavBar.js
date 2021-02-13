import {
  AppBar,
  Button,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
  Box,
  fade,
} from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  brand: {
    display: "inline",
    fontWeight: 900,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  moviesButton: {
    marginLeft: 20,
    fontWeight: 900,
  },
  tvShowsButton: {
    marginLeft: 20,
    fontWeight: 900,
  },
  loginButton: {
    marginLeft: 20,
    fontWeight: 900,
  },
  joinUsButton: {
    marginLeft: 20,
    fontWeight: 900,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function NavBar() {
  const classes = useStyles();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
    
    }
  };
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Box flex={1} paddingX={30}>
            <Link
              className={classes.link}
              to={{
                pathname: `/`,
              }}
            >
              <Typography className={classes.brand} variant="h5">
                The Reviewer
              </Typography>
            </Link>
            <Button className={classes.moviesButton} color="inherit">
              Movies
            </Button>
            <Button className={classes.tvShowsButton} color="inherit">
              TV Shows
            </Button>
            <Box component="span" position="absolute" right={446.78}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon color="secondary" />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </Box>
            <Box component="span" position="absolute" right={264}>
              <Button className={classes.loginButton} color="inherit">
                Login
              </Button>
              <Button className={classes.joinUsButton} color="inherit">
                Join us
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar)
