import React, { useRef } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PrintIcon from "@material-ui/icons/Print";
import { Divider, Grid } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import HobbeePremiumLogo from "../../assets/hobbee_premium.svg";
import { HOBBEE_ORANGE } from "../../shared/Constants";

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
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <img src={HobbeePremiumLogo} width={"90%"} alt={"logo"} />
      </div>
      <Grid container direction="column" spacing={1}>
        <Grid item container spacing={7} alignItems={"center"}>
          <Grid item xs={2}>
            <CheckCircleIcon
              style={{ fontSize: "5.5rem", fill: HOBBEE_ORANGE }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              SUCCESS!
            </Typography>
            <Typography>Thank you for purchasing HOBB.EE Premium.</Typography>
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
        {Object.entries(receipt).map(([k, v], i) => (
          <Grid container key={i}>
            <Grid item xs={4}>
              <Typography
                variant="body1"
                color="textPrimary"
                style={{ fontWeight: "bold" }}
              >
                {k}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" color="textPrimary">
                {v}
              </Typography>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
        </Grid>
      </Grid>
    </div>
  );
}
