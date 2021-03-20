import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Grid,
  CardContent,
} from "@material-ui/core";
import NavBar from "../components/NavBar";

const useStyles = makeStyles({
  wrap: {
    marginTop: 110,
  },
  card: {
    width: 1000,
    height: "100%",
  },
  action: {
    position: "relative",
  },
  pic: {
    width: 138,
    height: 175,
  },
  description: {
    position: "absolute",
    left: 160,
    top: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: "19px",
  },
  date: {
    marginTop: 5,
    color: "#00000099",
  },
  overview: {
    marginTop: 15,
  },
});

export default function Results() {
  const location = useLocation();
  const [info, setInfo] = useState("");
  const classes = useStyles();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=84740a476602b16276f7d9e1093ff572&query=${location.state.search}`
      )
      .then((res) => {
        setInfo(res.data.results);
      });
  }, []);

  const showMovies = () => {
    if (info) {
      return info.map((movie) => (
        <Grid key={movie.id} item xs={12}>
          <Link
            className={classes.link}
            to={{
              pathname: `/movie/${movie.id}`,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea className={classes.action}>
                <img
                  className={classes.pic}
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                  alt={movie.poster_path}
                ></img>
                <Box className={classes.description}>
                  <Typography className={classes.title}>
                    {movie.title}
                  </Typography>
                  <Typography className={classes.date}>
                    {movie.release_date}
                  </Typography>
                  <Typography className={classes.overview}>
                    {movie.overview}
                  </Typography>
                </Box>
                {/* <Box className={classes.description}>
                  <CardContent className={classes.cardContent}>
                    <Typography className={classes.castName}>
                      dfwaelifj;lwaekfjkl;afjalk;dsdfwaelifj;lwaekfjkl;af
                    </Typography>
                  </CardContent>
                </Box> */}
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ));
    }
  };
  return (
    <div>
      <NavBar />
      <Box className={classes.wrap}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          {showMovies()}
        </Grid>
      </Box>
    </div>
  );
}
