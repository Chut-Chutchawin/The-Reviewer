import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core/";
import Footer from "../components/Footer";
import axios from "axios";
import NavBar from "../components/NavBar";
import Star from "@material-ui/icons/Star";
import ArrowRight from "@material-ui/icons/ArrowRight";
import t from "typy";
import firebase from "../firebase";

const useStyles = makeStyles((theme) => ({
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
    marginTop: 20,
    marginBottom: 40,
    paddingLeft: 264,
    paddingRight: 264,
  },
  topBilledCast: {
    fontWeight: "bold",
  },
  movieInfo: {
    marginLeft: 45,
    marginTop: 60,
  },
  gallery: {
    marginTop: 5,
    overflowX: "scroll",
  },
  castCard: {
    width: 138,
    height: "100%",
  },
  castPic: {
    width: "100%",
    height: 175,
  },
  castName: {
    fontSize: "15.5px",
    fontWeight: "bold",
  },
  castCha: {
    fontSize: "13px",
  },
  fullCast: {
    marginTop: 35,
  },
  contentHeader: {
    fontWeight: "bold",
    marginTop: 35,
  },
  statusTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  keywords: {
    marginTop: 10,
    marginRight: 10,
  },
  recMedia: {
    width: 250,
    height: 141,
  },
  recCard: {
    width: 250,
    height: "100%",
    border: "none",
    boxShadow: "none",
  },
  recTitle: {
    fontSize: "14",
  },
  link: {
    textDecoration: "none",
  },
  reviewTitle: {
    fontWeight: "bold",
    fontSize: "19px",
  },
  reviewDate: {
    marginTop: 5,
    color: "#00000099",
  },
  reviewOverview: {
    marginTop: 15,
  },
  reviewCard: {
    marginTop: 35,
  },
  reviewPic: {
    width: 60,
    height: 60,
  },
  formControl: {
    marginLeft: 20,
    minWidth: 120,
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  low: {
    marginTop: 15,
  },
  positive: {
    marginLeft: 20,
    backgroundColor: 'green'
  },
  negative: {
    marginLeft: 20,
    backgroundColor: 'red'
  },
  neutral: {
    marginLeft: 20,
  }
}));

export default function PosterInfo() {
  const classes = useStyles();
  const { movieId } = useParams();
  const [info, setInfo] = useState("");
  const [reviews, setReviews] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [sentiment, setSentiment] = useState('pos')
  // const [type, setType] = useState('')

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

  const cast = () => {
    const castObj = t(info, "credits.cast").safeObject;
    if (castObj) {
      return castObj.map((element, index) => {
        if (index < 10) {
          return (
            <Grid item key={index}>
              <Card className={classes.castCard}>
                <CardActionArea>
                  <img
                    className={classes.castPic}
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      element.profile_path
                    }
                    alt={element.profile_path}
                  ></img>
                  <CardContent>
                    <Typography className={classes.castName}>
                      {element.name}
                    </Typography>
                    <Typography className={classes.castCha}>
                      {element.character}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        }
      });
    }
  };

  const keywordsList = () => {
    const keywordsObj = t(info, "keywords.keywords").safeObject;
    if (keywordsObj) {
      return keywordsObj.map((element, index) => {
        if (index < 5) {
          return (
            <Button
              className={classes.keywords}
              variant="contained"
              key={index}
            >
              {element.name}
            </Button>
          );
        }
      });
    }
  };

  const handleClick = () => {
    setToggle(!toggle);
  };

  const recommendations = () => {
    const recObj = t(info, "recommendations.results").safeObject;
    if (recObj) {
      return recObj.map((element, index) => {
        if (index < 10) {
          return (
            <Grid item key={element.id}>
              <Link
                className={classes.link}
                to={{
                  pathname: `/movie/${element.id}`,
                }}
                onClick={() => handleClick()}
              >
                <Card className={classes.recCard}>
                  <CardActionArea>
                    <img
                      className={classes.recMedia}
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        element.backdrop_path
                      }
                      alt={element.poster_path}
                    ></img>
                    <CardContent>
                      <Typography className={classes.recTitle} noWrap="true">
                        {element.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        }
      });
    }
  };

  const ref = firebase.firestore().collection(`${info.title}`);
  const getReview = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setReviews(items);
      console.log(items)
    });
  };

  const showReview = () => {
    if (reviews) {
      return reviews.map((obj) => (
        <Grid key={obj._id} xs={12}>
          <Card className={classes.reviewCard}>
            <CardActionArea className={classes.reviewAction}>
              <img className={classes.reviewPic} src={obj.avatar}></img>
              <Box className={classes.reviewDescription}>
                <Typography className={classes.reviewTitle}>
                  A review by {obj.nickname}
                </Typography>
                <Typography className={classes.reviewDate}>
                  Written by {obj.nickname} on {obj.date}
                </Typography>
                <Typography className={classes.reviewOverview}>
                  {obj.desc}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ));
    }
  };

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   getReview()
  // }, [])

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=84740a476602b16276f7d9e1093ff572&append_to_response=videos,credits,keywords,recommendations`
      )
      .then((res) => {
        setInfo(res.data);
      });
    return () => {
      window.location.reload();
    };
  }, [toggle]);

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
          <Grid container>
            <Grid item container xs={9}>
              <Typography className={classes.topBilledCast} variant="h6">
                Top Billed Cast
              </Typography>
              <Grid
                item
                container
                spacing={4}
                className={classes.gallery}
                wrap="nowrap"
              >
                {cast()}
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.movieInfo}>
                <Typography className={classes.statusTitle}>Status</Typography>
                <Typography>{info.status}</Typography>
                <Typography className={classes.statusTitle}>
                  Original Language
                </Typography>
                <Typography>{info.original_language}</Typography>
                <Typography className={classes.statusTitle}>
                  Keywords
                </Typography>
                {keywordsList()}
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.fullCast}>Full Cast</Typography>
              <br />
              <Divider />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <Typography
                className={classes.contentHeader}
                variant="h6"
                display="inline"
              >
                Reviews
                {getReview()}
              </Typography>
              <Button variant="contained" className={classes.positive} onClick={() => setSentiment('pos')}>
                Positive
              </Button>
              <Button variant="contained" className={classes.negative} onClick={() => setSentiment('neg')}>
                Negative
              </Button>
              <Button variant="contained" className={classes.neutral} onClick={() => setSentiment('neu')}>
                Neutral
              </Button>
              {/* <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Sentiment</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  // onChange={handleChange}
                >
                  <MenuItem value='pos'>Positive</MenuItem>
                  <MenuItem value='neg'>Negative</MenuItem>
                  <MenuItem value='neu'>Neutral</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item container xs={9}>
              {showReview()}
              <br />
              <Divider />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} className={classes.low}>
              <br />
              <Divider />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <Typography className={classes.contentHeader} variant="h6">
                Recommendations
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid
              item
              container
              spacing={3}
              className={classes.gallery}
              wrap="nowrap"
              xs={9}
            >
              {recommendations()}
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </div>
  );
}
