import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { Button, Tooltip } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import {
  BUTTON_YELLOW,
  BUTTON_YELLOW_HOVER,
  PAPER_CREAM,
} from "../../shared/Constants";
import HobbeePremiumLogo from "../../assets/hobbee_premium.svg";
import { connect, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: "60%",
    margin: "auto",
  },
  perkBox: {
    backgroundColor: PAPER_CREAM,
    paddingTop: "35px",
    margin: "15px",
    textAlign: "center",
    height: "230px",
    width: "230px",
    borderRadius: "5px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
  },
  choosePlanButton: {
    marginTop: "40px",
    marginBottom: "40px",
    width: "100%",
    backgroundColor: BUTTON_YELLOW,
    fontSize: 15,
    padding: "20px",
    "&:hover": {
      backgroundColor: BUTTON_YELLOW_HOVER,
    },
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 13,
    margin: 0,
    width: "260px",
  },
}))(Tooltip);

export function PremiumView(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user && user.user.premium.active) {
      props.history.push("/account-settings/#redirect");
    }
  }, [user, props.history]);

  return (
    <div className={classes.pageContent}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src={HobbeePremiumLogo} width={"90%"} alt={"logo"} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CustomTooltip title="Enjoy a completely advertisement-free experience.">
          <div className={classes.perkBox}>
            <NotInterestedIcon style={{ fontSize: "5rem" }} />
            <Typography variant="h6" style={{ marginTop: "30px", fontWeight: "bold" }}>
              Zero Ads
            </Typography>
          </div>
        </CustomTooltip>
        <CustomTooltip title="Meet infinite people by joining as many groups as you like (instead of 5).">
          <div className={classes.perkBox}>
            <AllInclusiveIcon style={{ fontSize: "5rem" }} />
            <Typography variant="h6" style={{ marginTop: "14px", fontWeight: "bold" }}>
              Unlimited
            </Typography>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>Groups</Typography>
          </div>
        </CustomTooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CustomTooltip title="Position all groups that you are the owner of at the top of our search results.">
          <div className={classes.perkBox}>
            <TrendingUpIcon style={{ fontSize: "5rem" }} />
            <Typography variant="h6" style={{ marginTop: "14px", fontWeight: "bold" }}>
              Boost
            </Typography>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>Your Groups</Typography>
          </div>
        </CustomTooltip>
        <CustomTooltip title="Show Hobb.ee some love and invest in the platform's further development">
          <div className={classes.perkBox}>
            <FavoriteIcon style={{ fontSize: "5rem" }} />
            <Typography variant="h6" style={{ marginTop: "30px", fontWeight: "bold" }}>
              Support Us
            </Typography>
          </div>
        </CustomTooltip>
      </div>
      {user.user && user.isLoggedIn ? (
        <Link className={"linkDefault"} to={"/premium/payment-plan"}>
          <Button className={classes.choosePlanButton} type="button">
            CHOOSE YOUR PAYMENT PLAN
          </Button>
        </Link>
      ) : null}
    </div>
  );
}

export default connect()(withRouter(PremiumView));