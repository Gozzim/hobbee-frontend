import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LandingPageImage from "../assets/landing_page_image.jpg";
import { Button, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import TocIcon from "@material-ui/icons/Toc";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/Search/SearchBar";
import { SearchResults } from "../components/Search/SearchResults";
import { useSearch } from "../hooks/useSearch";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../redux/reducers/groupsReducer";
import {
  BUTTON_BLUE_HOVER,
  BUTTON_YELLOW,
  BUTTON_YELLOW_HOVER,
  HOBBEE_BROWN,
  HOBBEE_ORANGE,
} from "../shared/Constants";

const useStyles = makeStyles(() => ({
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
    color: HOBBEE_BROWN,
    backgroundColor: BUTTON_YELLOW,
    "&:hover": {
      backgroundColor: BUTTON_YELLOW_HOVER,
      color: HOBBEE_BROWN,
    },
    marginTop: "10px",
  },
  bottomContent: {
    color: HOBBEE_BROWN,
    borderColor: BUTTON_BLUE_HOVER,
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: "17px",
    borderRadius: "25px",
    paddingTop: "10px",
  },
  stepsContainer: {
    color: HOBBEE_BROWN,
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
  stepIcon: {
    color: "#13a09b",
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
    color: HOBBEE_ORANGE,
  },
  searchBar: {
    marginTop: "40px",
  },
}));

export function HomeView(props) {
  const classes = useStyles();
  const groups = useSelector((state) => {
    return state.groups.all.map((id) => state.groups.data[id]);
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (groups.length === 0) {
      dispatch(getGroups());
    }
  }, []);
  const search = useSearch({ groups, initialGroupsOnPage: 9 });

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

      <div className={classes.searchBar}>
        <SearchBar search={search} />
      </div>

      {search.searchValue || search.hasFilters ? (
        <SearchResults search={search} title="Search results" />
      ) : (
        <div className={classes.bottomContent}>
          <Typography
            variant="h4"
            align="center"
            style={{ fontWeight: "bold", marginTop: "20px" }}
          >
            MEETING MUTUALS - MADE EASY
          </Typography>
          <div className={classes.stepsContainer}>
            <div className={classes.stepContent}>
              <AssignmentIndIcon className={classes.stepIcon} />
              <Typography>Create an Account</Typography>
              <Typography>Input Your Interests</Typography>
            </div>
            <div style={{ position: "relative" }}>
              <ArrowForwardIosIcon className={classes.arrowIcon} />
            </div>
            <div className={classes.stepContent}>
              <TocIcon className={classes.stepIcon} />
              <Typography>Receive Recommendations</Typography>
              <Typography>or Search on Your Own</Typography>
            </div>
            <div style={{ position: "relative" }}>
              <ArrowForwardIosIcon className={classes.arrowIcon} />
            </div>
            <div className={classes.stepContent}>
              <GroupAddIcon className={classes.stepIcon} />
              <Typography>Join an Activity Group</Typography>
              <Typography>Arrange Your Hangout</Typography>
            </div>
            <div style={{ position: "relative" }}>
              <ArrowForwardIosIcon className={classes.arrowIcon} />
            </div>
            <div className={classes.stepContent}>
              <EmojiEmotionsIcon className={classes.stepIcon} />
              <Typography variant="h6">Meet Up!</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
