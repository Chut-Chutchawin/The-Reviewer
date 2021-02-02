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
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: 40,
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

export default function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=84740a476602b16276f7d9e1093ff572&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&vote_count.gte=10000&page=1"
      )
      .then((res) => {
        setTopRatedMovies(res.data.results);
      });
  }, []);

  const showMovies = () => {
    if (topRatedMovies) {
      return topRatedMovies.map((movie) => (
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
        Top Rated Movies
      </Typography>
      <Grid container spacing={3} className={classes.gallery} wrap="nowrap">
        {showMovies()}
      </Grid>
    </Box>
  );
}
