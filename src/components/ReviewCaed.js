import React, { useEffect, useState } from "react";
import firebase from "../firebase";
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

const useStyles = makeStyles({
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
});

export default function ReviewCaed(props) {
  const [reviews, setReviews] = useState([]);
  const classes = useStyles();
  const ref = firebase.firestore().collection(`${props.title}`).where("sentiment", "==", `${props.sentiment}`);
  const getReview = () => {
    // ref
    //   .where("sentiment", "==", `${props.sentiment}`)
    //   .onSnapshot((querySnapshot) => {
    //     const items = [];
    //     querySnapshot.forEach((doc) => {
    //       items.push(doc.data());
    //     });
    //     setReviews(items);
    //   });
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data())
      setReviews(items)
    })
  };
  console.log(props.sentiment);
  useEffect(() => {
    getReview();
  }, [props.toggle]);

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
  return (
    <div>
      {getReview()}
      {showReview()}
    </div>
  );
}
