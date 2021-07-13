import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import MUILink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PrintIcon from "@material-ui/icons/Print";

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
  printIcon: {
    left: "30px",
    fontSize: "2rem",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999999",
    "&:hover": {
      color: "#000000",
      cursor: "pointer"
    },
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function PaymentConfirmationView(props) {
  const classes = useStyles();

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
          <Typography color="textPrimary">CONFIRMATION</Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.pageContent}>
        <div style={{ display: "flex" }}>
          <CheckCircleIcon
            style={{ marginRight: "30px", fontSize: "5.5rem" }}
          />
          <div>
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                marginTop: "10px",
                textAlignLast: "left",
              }}
            >
              Success!
            </Typography>
            <p>Thank you for purchasing Hobb.ee PREMIUM.</p>
          </div>
          <div style={{ position: "relative" }}>
            <PrintIcon className={classes.printIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}