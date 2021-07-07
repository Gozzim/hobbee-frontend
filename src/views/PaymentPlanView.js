import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MUILink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import {Link} from "react-router-dom";

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
  planBox: {
    margin: "auto",
    marginBottom: "50px",
    textAlign: "center",
    height: "70px",
    width: "97%",
    borderColor: "black",
    borderWidth: "5px",
    borderStyle: "solid",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
  },
  choosePlanButton: {
    marginTop: "20px",
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
  optionDescriptor: {
    position: "absolute",
    right: 35,
  },
}));

const BlueRadio = withStyles({
  root: {
    color: "grey",
    '&$checked': {
      color: "#17C2BC",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function PaymentPlanView(props) {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("target value: "+event.target.value);
    console.log("state: "+selectedValue);
  };

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
          <MUILink color="inherit" href="/" onClick={handleClick}>
            Premium
          </MUILink>
          <Typography color="textPrimary">PAYMENT PLAN</Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.pageContent}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          Hobb.ee PREMIUM
        </Typography>
        <RadioGroup className={"creategroup-radios"} style={{ position: "relative" }}>
          <FormControlLabel
            value="1-month"
            control={<BlueRadio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
            />}
            label="1 Month"
            className={classes.planBox}
          />
          <div className={classes.optionDescriptor} style={{top: "25px"}}>2€/Month</div>
          <FormControlLabel
            value="3-months"
            control={<BlueRadio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
            />}
            label="3 Months"
            className={classes.planBox}
          />
          <div className={classes.optionDescriptor} style={{top: "145px"}}>1.75€/Month</div>
          <FormControlLabel
            value="12-months"
            control={<BlueRadio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                name="radio-button-demo"
            />}
            label="12 Months"
            className={classes.planBox}
          />
          <div
              style={{
                position: "absolute",
                top: "255px",
                left: "50%",
                backgroundColor: "#E98F1C",
                width: "auto",
                textAlign: "center",
                padding: "10px",
                transform: "translate(-50%, 0)",
                borderRadius: "5px",
              }}
          >
            Recommended
          </div>
          <div className={classes.optionDescriptor} style={{top: "265px"}}>1.50€/Month</div>
        </RadioGroup>

        <Link className={"linkDefault"} to={"/premium/payment-confirmation"}>
          <Button className={classes.choosePlanButton} type="button">
            PROCEED TO CHECKOUT
          </Button>
        </Link>

      </div>
    </div>
  );
}
