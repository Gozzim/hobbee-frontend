import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LandingPageImage from "../assets/landing_page_image.jpg";
import { Typography, Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import TocIcon from "@material-ui/icons/Toc";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  topContent: {
    marginTop: "40px",
    display: "flex",
    color: "#32210B",
  },
  imageContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    marginTop: "10px",
  },
  createGroupButton: {
    color: "#32210B",
    backgroundColor: "#1CE9E3",
    "&:hover": {
      backgroundColor: "#FFCC00",
      color: "#32210B",
    },
    marginTop: "10px",
  },
  bottomContent: {
    borderColor: "#E98F1C",
    borderStyle: "solid",
    borderWidth: "10px",
    borderRadius: "10px",
    marginTop: "50px",
    paddingTop: "10px",
  },
  stepsContainer: {
    color: "#32210B",
    display: "flex",
    justifyContent: "space-around",
    marginLeft: 0,
    marginRight: 0,
  },
  stepContent: {
    textAlign: "center",
    height: "200px",
    width: "200px",
  },
  stepDescription: {
    fontWeight: "normal",
    fontSize: "16px",
  },
  stepIcon: {
    //color: "#E08B1B",
    margin: "30px",
    marginBottom: "15px",
    fontSize: "5rem",
  },
  arrowIcon: {
    position: "absolute",
    fontSize: "2.5rem",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#FFCC00",
  },
}));

export function HomeView(props) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.topContent}>
        <div className={classes.titleContainer}>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            Welcome to
          </Typography>
          <Typography variant="h1" style={{ fontWeight: "bold" }}>
            HOBB.EE
          </Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: "normal", marginRight: "30px" }}
          >
            Join our community today and meet new people that share your
            passions!
          </Typography>
          <Link className={"linkDefault"} to={"/create-group"}>
            <Button className={classes.createGroupButton} type="button">
              CREATE YOUR FIRST GROUP
            </Button>
          </Link>
        </div>
        <div className={classes.imageContainer}>
          <img
            src={LandingPageImage}
            style={{
              borderRadius: "10px",
              maxWidth: "100%",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
            }}
            alt={"HomePic"}
          />
        </div>
      </div>
      <div className={classes.bottomContent}>
        <Typography
          variant="h5"
          style={{ width: "100%", textAlign: "center", marginTop: "15px" }}
        >
          MEETING UP MADE EASY
        </Typography>
        <div className={classes.stepsContainer}>
          <div className={classes.stepContent}>
            <AssignmentIndIcon className={classes.stepIcon} />
            <Typography variant="h6" className={classes.stepDescription}>
              create an account and input your interests
            </Typography>
          </div>
          <div style={{ position: "relative" }}>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
          </div>
          <div className={classes.stepContent}>
            <TocIcon className={classes.stepIcon} />
            <Typography variant="h6" className={classes.stepDescription}>
              receive recommendations or search on your own
            </Typography>
          </div>
          <div style={{ position: "relative" }}>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
          </div>
          <div className={classes.stepContent}>
            <GroupAddIcon className={classes.stepIcon} />
            <Typography variant="h6" className={classes.stepDescription}>
              join an activity group and arrange your hangout
            </Typography>
          </div>
          <div style={{ position: "relative" }}>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
          </div>
          <div className={classes.stepContent}>
            <EmojiEmotionsIcon className={classes.stepIcon} />
            <Typography variant="h6" className={classes.stepDescription}>
              meet up!
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
