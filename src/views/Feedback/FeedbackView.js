import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Divider, TextField, Typography } from "@material-ui/core";
import { HobbeeRating } from "../../components/HobbeeRating";
import { makeStyles } from "@material-ui/core/styles";
import {BUTTON_YELLOW, BUTTON_YELLOW_HOVER, HOBBEE_ORANGE, HOBBEE_YELLOW} from "../../shared/Constants";
import {
  feedbackFormRequest,
  submitFeedbackRequest,
} from "../../services/FeedbackService";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  feedbackRoot: {
    margin: "auto",
    width: "80%",
  },
  submitButton: {
    backgroundColor: BUTTON_YELLOW,
    "&:hover": {
      backgroundColor: BUTTON_YELLOW_HOVER,
    },
  },
}));

const initialData = {
  ratings: ["0", "0", "0", "0"],
  comment: "",
  submitted: false,
};

const initialFormStatus = {
  status: 0,
  groupName: "Custom Feedback",
};

export function FeedbackView(props) {
  const classes = useStyles();

  const user = useSelector((state) => {
    return state.user;
  });

  const [feedbackData, setFeedbackData] = useState(initialData);
  const [error, setError] = useState("");
  const [formStatus, setFormStatus] = useState(initialFormStatus);

  useEffect(async () => {
    if (user.isLoggedIn) {
      try {
        const resp = await feedbackFormRequest(props.match.params.id);
        setFormStatus({
          ...formStatus,
          status: resp.status,
          groupName: resp.data.groupName,
        });
      } catch (e) {
        if (e.response) {
          setFormStatus({
            ...formStatus,
            status: e.response.status,
            groupName: e.response.statusText,
          });
        } else {
          setFormStatus({
            ...formStatus,
            status: 400,
            groupName: e.message,
          });
        }
      }
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (feedbackData.ratings.some((rating) => rating === "0")) {
      setError("Please give a rating for every question.");
    } else {
      try {
        await submitFeedbackRequest(props.match.params.id, feedbackData);
        setFeedbackData({ ...feedbackData, submitted: true });
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (formStatus.status === 200) {
    return (
      <div className={classes.feedbackRoot}>
        <div style={{ marginBottom: "2rem" }}>
          <Typography
            variant={"h3"}
            align="center"
            style={{ fontWeight: "bold" }}
          >
            FEEDBACK FORM
          </Typography>
          <Typography variant={"h4"} align="center" >
            {formStatus.groupName}
          </Typography>
        </div>
        {feedbackData.submitted ? (
          <div>
            <Typography align={"center"} variant={"h3"}>
              Feedback submitted!
            </Typography>
            <Typography align={"center"} variant={"h5"}>
              Thank you for helping us make Hobb.ee a better place!
            </Typography>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <Grid container direction="column" spacing={3}>
              <Grid item container direction={"column"} spacing={1}>
                <Grid item>
                  <Typography variant={"body1"} color="textPrimary">
                    Thank you for using Hobb.ee - we hope you enjoyed your
                    event!
                  </Typography>
                  <Typography variant={"body1"} color="textPrimary">
                    In order to improve our services and your experience, we
                    would like to ask you a couple of questions.
                  </Typography>
                </Grid>
                <Grid item>
                  <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
                </Grid>
                {error ? (
                  <Grid item>
                    <Typography variant={"body2"} color="error">
                      {error}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item container>
                <Grid item xs={9}>
                  <Typography variant={"body1"} color="textPrimary">
                    How did you enjoy the activity?
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "inline-flex", justifyContent: "flex-end" }}
                >
                  <HobbeeRating
                    name={"rating-0"}
                    value={feedbackData.ratings[0]}
                    onChange={(e) => {
                      let ratings = feedbackData.ratings;
                      ratings[0] = e.target.value;
                      setFeedbackData({ ...feedbackData, ratings: ratings });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={9}>
                  <Typography variant={"body1"} color="textPrimary">
                    How well did you get along with the other participants?
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "inline-flex", justifyContent: "flex-end" }}
                >
                  <HobbeeRating
                    name={"rating-1"}
                    value={feedbackData.ratings[1]}
                    onChange={(e) => {
                      let ratings = feedbackData.ratings;
                      ratings[1] = e.target.value;
                      setFeedbackData({ ...feedbackData, ratings: ratings });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={9}>
                  <Typography variant={"body1"} color="textPrimary">
                    How smoothly did the organization of the activity go?
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "inline-flex", justifyContent: "flex-end" }}
                >
                  <HobbeeRating
                    name={"rating-2"}
                    value={feedbackData.ratings[2]}
                    onChange={(e) => {
                      let ratings = feedbackData.ratings;
                      ratings[2] = e.target.value;
                      setFeedbackData({ ...feedbackData, ratings: ratings });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={9}>
                  <Typography variant={"body1"} color="textPrimary">
                    How would you rate your overall experience with Hobb.ee?
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{ display: "inline-flex", justifyContent: "flex-end" }}
                >
                  <HobbeeRating
                    name={"rating-3"}
                    value={feedbackData.ratings[3]}
                    onChange={(e) => {
                      let ratings = feedbackData.ratings;
                      ratings[3] = e.target.value;
                      setFeedbackData({ ...feedbackData, ratings: ratings });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant={"body1"} color="textPrimary" style={{marginBottom: "10px", marginTop: "10px"}}>
                  Would you like to add anything else?{" "}
                  {
                    <Typography
                      variant={"caption"}
                      style={{ verticalAlign: "middle" }}
                    >
                      (Optional)
                    </Typography>
                  }
                </Typography>
                <TextField
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                  value={feedbackData.comment}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      comment: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item style={{ textAlign: "center" }}>
                <Button
                  className={classes.submitButton}
                  size={"large"}
                  style={{ width: "25%" }}
                  //variant="contained"
                  type={"submit"}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div className={classes.feedbackRoot}>
        <Typography align={"center"} variant={"h2"}>
          {formStatus.groupName}
        </Typography>
        {formStatus.status === 404 ? (
          <Typography align={"center"} variant={"h4"}>
            Feedback already submitted or link invalid
          </Typography>
        ) : (
          <Typography align={"center"} variant={"h4"}>
            Invalid feedback link
          </Typography>
        )}
      </div>
    );
  }
}
