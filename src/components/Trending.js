import React, { useEffect, useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: 64,
    width: 1344,
    height: 500,
    marginLeft: 224,
    position: "relative",
  },
  media: {
    width: '100%',
    height: 500,
  },
  backgroundImage: {
    background:
      "linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))",
    zIndex: 85,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  description: {
    color: "white",
    position: "absolute",
    bottom: "18%",
    left: 80,
  },
  text1: {
    fontWeight: 100,
  },
  title: {
    fontWeight: "bold",
  },
});
export default function Trending() {
  const [movie, setMovie] = useState("");
  const classes = useStyles();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/464052?api_key=84740a476602b16276f7d9e1093ff572`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, []);
  return (
    <Link
      className={classes.link}
      to={{
        pathname: `/movie/${movie.id}`,
        state: {},
      }}
    >
      <Box className={classes.root}>
        {/* <img className={classes.media} src={"https://image.tmdb.org/t/p/w500//lOSdUkGQmbAl5JQ3QoHqBZUbZhC.jpg" }></img> */}
        <img
          className={classes.media}
          src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
          alt={movie.title}
        />
        <Box className={classes.backgroundImage}>
          <Box className={classes.description}>
            <Typography className={classes.text1} variant="h3">
              Trending Today
            </Typography>
            <Typography className={classes.title} variant="h3">
              {movie.title}
            </Typography>
            <Typography className={classes.text1} variant="h3" display="inline">
              {movie.vote_average}
            </Typography>
            <Typography variant="h6" display="inline">
              &nbsp;&nbsp;TMDB
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
