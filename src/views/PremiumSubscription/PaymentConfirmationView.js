import React, { useRef } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PrintIcon from "@material-ui/icons/Print";
import { Divider, Grid } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import HobbeePremiumLogo from "../../assets/hobbee_premium.svg";

const useStyles = makeStyles(() => ({
  pageContent: {
    width: "60%",
    margin: "auto",
  },
  printIcon: {
    fontSize: "2rem",
    color: "#999999",
    "&:hover": {
      color: "black",
      cursor: "pointer",
    },
  },
}));

export function PaymentConfirmationView(props) {
  const classes = useStyles();
  const receipt = props.location.state.receipt;
  const componentRef = useRef();

  return (
      <div className={classes.pageContent} ref={componentRef}>
        <div style={{ textAlign: "center" }}>
          <img src={HobbeePremiumLogo} width={"90%"} alt={"logo"} />
        </div>
        <Grid container direction="column" spacing={1}>
          <Grid item container spacing={7} alignItems={"center"}>
            <Grid item xs={2}>
              <CheckCircleIcon style={{ fontSize: "5.5rem" }} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5">Success!</Typography>
              <Typography variant="caption">
                Thank you for purchasing Hobb.ee PREMIUM.
              </Typography>
            </Grid>
            <Grid item xs>
              <ReactToPrint
                trigger={() => <PrintIcon className={classes.printIcon} />}
                content={() => componentRef.current}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
          </Grid>
          {Object.entries(receipt).map(([k, v]) => (
            <Grid item>
              <Typography variant="body1" color="textPrimary">
                {k + ": " + v}
              </Typography>
            </Grid>
          ))}
          <Grid item>
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
          </Grid>
        </Grid>
      </div>
  );
}
