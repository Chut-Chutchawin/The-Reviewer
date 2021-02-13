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
    marginBottom: 60,
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

export default function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState("");
  const classes = useStyles();
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  if (month < 10) {
    month = "0" + String(month);
  } else {
    month = String(month);
  }
  if (day < 10) {
    day = "0" + String(day + 1);
  } else {
    day = String(day + 1);
  }
  let upcomingDate = String(year) + "-" + month + "-" + day;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=84740a476602b16276f7d9e1093ff572&language=en-US&sort_by=primary_release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2021-01-01&sort_by=popularity.desc`
      )
      .then((res) => {
        setUpcomingMovies(res.data.results);
      });
    return () => {
      window.location.reload();
    };
  }, []);

  const showMovies = () => {
    if (upcomingMovies) {
      return upcomingMovies.map((movie) => (
        <Grid key={movie.id} item>
          <Link
            className={classes.link}
            to={{
              pathname: `/movie/${movie.id}`,
            }}
          >
            <Card className={classes.card}>
              <CardActionArea>
                <Box height={225} width={150}>
                  <img
                    className={classes.media}
                    src={
                      "https://image.tmdb.org/t/p/original" + movie.poster_path
                    }
                    alt={movie.title}
                  ></img>
                </Box>

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
        Upcoming Movies
      </Typography>
      <Grid container spacing={3} className={classes.gallery} wrap="nowrap">
        {showMovies()}
      </Grid>
    </Box>
  );
}
