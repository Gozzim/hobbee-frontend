import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HOBBEE_BLUE, HOBBEE_ORANGE } from "../../shared/Constants";
import HobbeePremiumLogo from "../../assets/hobbee_premium.svg";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: "60%",
    margin: "auto",
  },
  perkBox: {
    margin: "10px",
    textAlign: "center",
    height: "200px",
    width: "200px",
    borderColor: "black",
    borderWidth: "5px",
    borderStyle: "solid",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  },
  choosePlanButton: {
    marginTop: "40px",
    marginBottom: "40px",
    width: "100%",
    backgroundColor: HOBBEE_ORANGE,
    fontSize: 15,
    padding: "20px",
    "&:hover": {
      backgroundColor: HOBBEE_BLUE,
    },
  },
}));

export function PremiumView(props) {
  const classes = useStyles();

  return (
    <div className={classes.pageContent}>
      <div style={{ textAlign: "center" }}>
        <img src={HobbeePremiumLogo} width={"90%"} alt={"logo"} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "25px",
        }}
      >
        <div className={classes.perkBox}>
          <NotInterestedIcon
            style={{ margin: "30px", marginBottom: "15px", fontSize: "5rem" }}
          />
          <Typography variant="h6">Zero Ads</Typography>
        </div>
        <div className={classes.perkBox}>
          <AllInclusiveIcon
            style={{ margin: "30px", marginBottom: "0px", fontSize: "5rem" }}
          />
          <Typography variant="h6">Unlimited</Typography>
          <Typography variant="h6">Groups</Typography>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div className={classes.perkBox}>
          <TrendingUpIcon
            style={{ margin: "30px", marginBottom: "0px", fontSize: "5rem" }}
          />
          <Typography variant="h6">Boost</Typography>
          <Typography variant="h6">Your Groups</Typography>
        </div>
        <div className={classes.perkBox}>
          <FavoriteIcon
            style={{ margin: "30px", marginBottom: "15px", fontSize: "5rem" }}
          />
          <Typography variant="h6">Support Us</Typography>
        </div>
      </div>
      <Link className={"linkDefault"} to={"/premium/payment-plan"}>
        <Button className={classes.choosePlanButton} type="button">
          CHOOSE YOUR PAYMENT PLAN
        </Button>
      </Link>
    </div>
  );
}