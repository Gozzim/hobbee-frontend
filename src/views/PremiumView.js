import React, { useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MUILink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginTop: "20px",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  pageContent: {
    marginTop: "50px",
    maxWidth: "500px",
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
    backgroundColor: "#FFCC00",
    fontSize: 15,
    padding: "20px",
    "&:hover": {
      backgroundColor: "#1CE9E3",
      color: "#32210B",
    },
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function PremiumView(props) {
  const classes = useStyles();
  const [overview, setOverview] = useState(false);

  return (
    <div>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <MUILink color="inherit" href="/" onClick={handleClick}>
            Home
          </MUILink>
          <Typography color="textPrimary">PREMIUM</Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.pageContent}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          Hobb.ee PREMIUM
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "25px",
          }}
        >
          <div className={classes.perkBox}>
            <ExitIcon
              style={{ margin: "30px", marginBottom: "15px", fontSize: "5rem" }}
            />
            <Typography variant="h6">Zero Ads</Typography>
          </div>
          <div className={classes.perkBox}>
            <ExitIcon
              style={{ margin: "30px", marginBottom: "15px", fontSize: "5rem" }}
            />
            <Typography variant="h6">Zero Ads</Typography>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className={classes.perkBox}>
            <ExitIcon
              style={{ margin: "30px", marginBottom: "15px", fontSize: "5rem" }}
            />
            <Typography variant="h6">Zero Ads</Typography>
          </div>
          <div className={classes.perkBox}>
            <ExitIcon
              style={{ margin: "30px", marginBottom: "15px", fontSize: "5rem" }}
            />
            <Typography variant="h6">Zero Ads</Typography>
          </div>
        </div>
        <Button
          className={classes.choosePlanButton}
          type="button"
          onClick={() => setOverview(true)}
        >
          JOIN GROUP
        </Button>
      </div>
    </div>
  );
}