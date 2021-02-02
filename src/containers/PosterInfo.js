import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core/";
import axios from "axios";
import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";
import Star from "@material-ui/icons/Star";
import ArrowRight from "@material-ui/icons/ArrowRight";
import t from "typy";

const useStyles = makeStyles({
  wrap: {
    marginTop: 110,
    height: 570,
    position: "relative",
  },
  media: {
    width: "100%",
    height: 570,
  },
  backgroundImage: {
    background:
      "linear-gradient(to left, rgba(0, 0, 0, 0.4) , rgba(0, 0, 0, 1) 90%)",
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
    marginLeft: 520,
    top: "15%",
    left: 80,
  },
  text1: {
    fontWeight: 100,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  image: {
    marginTop: 30,
    marginLeft: 264,
    width: 300,
    height: 510,
  },
  starWrap: {
    marginTop: 12,
    marginBottom: 12,
    position: "relative",
  },
  star: {},
  score: {
    position: "absolute",
    bottom: 8,
  },
  userScore: {
    position: "absolute",
    marginLeft: 50,
    bottom: 6,
  },
  arrowRight: {
    position: "absolute",
    marginLeft: 150,
    bottom: 7,
  },
  playTrailer: {
    position: "absolute",
    marginLeft: 180,
    bottom: 9,
  },
  tageLine: {
    fontSize: 18,
  },
  overView: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 21,
    fontWeight: "bold",
  },
  position: {
    marginTop: 20,
    color: "white",
  },
  crewName: {
    fontWeight: "bold",
  },
  contentWrap: {
    marginTop: 20
  },
  topBilledCast: {
    fontWeight: 'bold',
    marginLeft: 264
  }
});

export default function PosterInfo() {
  const classes = useStyles();
  const { movieId } = useParams();
  const [info, setInfo] = useState("");
  const genres = () => {
    if (info.genres) {
      let x = "";
      for (let i = 0; i < info.genres.length; i++) {
        if (i !== info.genres.length - 1) {
          x += info.genres[i].name + "," + " ";
        } else {
          x += info.genres[i].name;
        }
      }
      return <Typography display="inline">&nbsp;&nbsp;- {x}</Typography>;
    }
  };
  const crews = () => {
    const obj = t(info, "credits.crew").safeObject;
    if (obj) {
      return obj.map((element, index) => {
        if (
          element.job === "Writer" ||
          element.job === "Director" ||
          element.job === "Creator"
        ) {
          return (
            <Grid className={classes.position} key={index} item xs={4}>
              <Typography className={classes.crewName}>
                {element.name}
              </Typography>
              <Typography>{element.job}</Typography>
            </Grid>
          );
        }
      });
    }
  };
  // const topCast = () => {
  //   const objCast = t(info, "credits.cast").safeObject
  //   if (objCast) {
  //     return obj.map(())
  //   }
  // }

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=84740a476602b16276f7d9e1093ff572&append_to_response=videos,credits`
      )
      .then((res) => {
        setInfo(res.data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Box className={classes.wrap}>
        <img
          className={classes.media}
          src={"https://image.tmdb.org/t/p/original" + info.backdrop_path}
          alt={info.title}
        />
        <Box className={classes.backgroundImage}>
          <img
            className={classes.image}
            src={"https://image.tmdb.org/t/p/original" + info.poster_path}
            alt={info.title}
          />
          <Box className={classes.description}>
            <Typography className={classes.title}>{info.title}</Typography>
            <Typography display="inline">{info.release_date} (US)</Typography>
            {genres()}
            <Typography display="inline">
              &nbsp;&nbsp;- {info.runtime} mins
            </Typography>
            <Box className={classes.starWrap}>
              <Star
                className={classes.star}
                color="secondary"
                style={{ fontSize: 50 }}
              />
              <Typography
                className={classes.score}
                component="span"
                variant="h5"
              >
                &nbsp;{info.vote_average}
              </Typography>
              <Typography
                className={classes.userScore}
                component="span"
                variant="h6"
              >
                User Score
              </Typography>
              <ArrowRight
                className={classes.arrowRight}
                style={{ fontSize: 30 }}
              />
              <Typography className={classes.playTrailer} component="span">
                {" "}
                Play Trailer
              </Typography>
            </Box>
            <Typography className={classes.tageLine}>{info.tagline}</Typography>
            <Typography className={classes.overView}>Overview</Typography>
            <Typography>{info.overview}</Typography>
            <Grid container>{crews()}</Grid>
          </Box>
        </Box>
        <Box className={classes.contentWrap}>
          <Typography className={classes.topBilledCast} variant='h6'>Top Billed Cast</Typography>
          <Box>

          </Box>
          <Box>

          </Box>
        </Box>
      </Box>
    </div>
  );
}
