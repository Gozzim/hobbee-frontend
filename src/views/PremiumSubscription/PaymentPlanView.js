import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import PayPalCheckout from "../../components/PayPalCheckout";
import { HOBBEE_ORANGE, SUBSCRIPTION_PLAN } from "../../shared/Constants";
import HobbeePremiumLogo from "../../assets/hobbee_premium.svg";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    width: "60%",
    margin: "auto",
  },
  planBox: {
    margin: "auto",
    marginBottom: "50px",
    height: "70px",
    width: "97%",
    borderColor: "black",
    borderWidth: "5px",
    borderStyle: "solid",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  },
  optionDescriptor: {
    position: "absolute",
    right: 35,
  },
}));

const BlueRadio = withStyles({
  root: {
    color: "grey",
    "&$checked": {
      color: "#17C2BC",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export function PaymentPlanView(props) {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState(SUBSCRIPTION_PLAN.advanced);
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
        <div style={{ textAlign: "center" }}>
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
            label="1 Month"
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
            label="3 Months"
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
            label="12 Months"
            className={classes.planBox}
          />
          <div
            style={{
              position: "absolute",
              top: "255px",
              left: "50%",
              backgroundColor: HOBBEE_ORANGE,
              padding: "10px",
              transform: "translate(-50%, 0)",
              borderRadius: "5px",
            }}
          >
            Recommended
          </div>
          <div className={classes.optionDescriptor} style={{ top: "265px" }}>
            1.50€/Month
          </div>
        </RadioGroup>
        <PayPalCheckout planId={selectedValue} onSuccess={setReceipt} />
      </div>
  );
}
