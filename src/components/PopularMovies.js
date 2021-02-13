import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Grid,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  link: {
    textDecoration: "none",
  },
  card: {
    border: "none",
    boxShadow: "none",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  media: {
    height: 225,
  },
  gallery: {
    overflowX: "scroll",
  },
  title: {
    fontWeight: "bold",
  },
  releaseDate: {
    color: "#00000099",
  },
});

export default function PopularMovies() {
  const [popularMovies, setPopularMovie] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=84740a476602b16276f7d9e1093ff572&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      )
      .then((res) => {
        setPopularMovie(res.data.results);
      });
    return () => {
      window.location.reload();
    };
  }, []);

  const showMovies = () => {
    if (popularMovies) {
      return popularMovies.map((movie) => (
        <Grid key={movie.id} item>
          <Link
            className={classes.link}
            to={{
              pathname: `/movie/${movie.id}`,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <img
                  className={classes.media}
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                  alt={movie.title}
                ></img>
                <CardContent>
                  <Typography className={classes.title}>
                    {movie.title}
                  </Typography>
                  <Typography className={classes.releaseDate}>
                    {movie.release_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ));
    }
  };

  return (
    <Box className={classes.root} paddingX={33}>
      <Typography className={classes.heading} variant="h5">
        What's Popular
      </Typography>
      <Grid container spacing={3} className={classes.gallery} wrap="nowrap">
        {showMovies()}
      </Grid>
    </Box>
  );
}
