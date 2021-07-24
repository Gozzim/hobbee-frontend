import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import PayPalCheckout from "../../components/PayPalCheckout";
import {
  BUTTON_YELLOW,
  PAPER_CREAM,
  RADIO_BUTTON_BLUE,
  SUBSCRIPTION_PLAN,
} from "../../shared/Constants";
import HobbeePremiumLogo from "../../assets/hobbee_premium.svg";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: "60%",
    margin: "auto",
  },
  planBox: {
    backgroundColor: PAPER_CREAM,
    margin: "auto",
    marginBottom: "50px",
    height: "70px",
    width: "97%",
    borderRadius: "5px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.3)",
  },
  optionDescriptor: {
    position: "absolute",
    right: 35,
    fontWeight: "bold",
  },
  buttonLabel: {
    fontSize: 15,
  },
  recommendedTag: {
    position: "absolute",
    top: "255px",
    left: "260px",
    backgroundColor: BUTTON_YELLOW,
    padding: "10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
}));

const BlueRadio = withStyles({
  root: {
    color: "grey",
    "&$checked": {
      color: RADIO_BUTTON_BLUE,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export function PaymentPlanView(props) {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState(
    SUBSCRIPTION_PLAN.advanced
  );
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (receipt) {
      props.history.push({
        pathname: "/premium/payment-confirmation",
        state: { receipt: receipt },
      });
    }
  }, [receipt]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={classes.pageContent}>
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <img src={HobbeePremiumLogo} width={"90%"} alt={"logo"} />
      </div>
      <RadioGroup style={{ position: "relative" }}>
        <FormControlLabel
          value="1-month"
          control={
            <BlueRadio
              checked={selectedValue === SUBSCRIPTION_PLAN.standard}
              onChange={handleChange}
              value={SUBSCRIPTION_PLAN.standard}
            />
          }
          label={<Typography variant="h6">STANDARD - 1 Month</Typography>}
          className={classes.planBox}
        />
        <div className={classes.optionDescriptor} style={{ top: "25px" }}>
          2€/Month
        </div>
        <FormControlLabel
          value="3-months"
          control={
            <BlueRadio
              checked={selectedValue === SUBSCRIPTION_PLAN.advanced}
              onChange={handleChange}
              value={SUBSCRIPTION_PLAN.advanced}
            />
          }
          label={<Typography variant="h6">ADVANCED - 3 Months </Typography>}
          className={classes.planBox}
        />
        <div className={classes.optionDescriptor} style={{ top: "145px" }}>
          1.75€/Month
        </div>
        <FormControlLabel
          value="12-months"
          control={
            <BlueRadio
              checked={selectedValue === SUBSCRIPTION_PLAN.elite}
              onChange={handleChange}
              value={SUBSCRIPTION_PLAN.elite}
            />
          }
          label={<Typography variant="h6">ELITE - 12 Months</Typography>}
          className={classes.planBox}
        />
        <div className={classes.recommendedTag}>RECOMMENDED</div>
        <div className={classes.optionDescriptor} style={{ top: "265px" }}>
          1.50€/Month
        </div>
      </RadioGroup>
      <PayPalCheckout planId={selectedValue} onSuccess={setReceipt} />
    </div>
  );
}
