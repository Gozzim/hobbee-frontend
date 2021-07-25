import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { CreateGroup } from "./CreateGroup";
import { CustomizeGroup } from "./CustomizeGroup";
import { createRequest } from "../../services/GroupService";
import { RequireLoggedIn } from "../../components/RequireLoggedIn";
import { isValidGroupname } from "../../validators/GroupDataValidator";
import { BUTTON_BLUE, BUTTON_BLUE_HOVER } from "../../shared/Constants";

const useStyles = makeStyles(() => ({
  continueButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: "30px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  button: {
    padding: "8px 10px",
    backgroundColor: BUTTON_BLUE,
    width: "100px",
    color: "black",
    "&:hover": {
      backgroundColor: BUTTON_BLUE_HOVER,
    },
  },
}));

const initialGroupFormState = {
  groupName: "",
  city: "",
  onOffline: "both",
  tags: [],
  pic: "",
  maxMembers: "",
  date: null,
  location: "",
  description: "",
};

const initialTouchedState = {
  groupName: false,
  city: false,
  tags: false,
  pic: false,
  date: false,
};

export function CreateGroupView(props) {
  const classes = useStyles();
  const [groupForm, setGroupForm] = React.useState(initialGroupFormState);
  const [touched, setTouched] = React.useState(initialTouchedState);
  const [formStep, setFormStep] = React.useState(0);

  return (
    <div>
      {renderForm()}
      {renderButtons()}
    </div>
  );

  function renderForm() {
    const childrenProps = {
      groupForm,
      setGroupForm,
      touched,
      setTouched,
    };
    if (formStep === 0) {
      return <CreateGroup {...childrenProps} />;
    } else if (formStep === 1) {
      return <CustomizeGroup {...childrenProps} />;
    }
  }

  function renderButtons() {
    if (formStep === 0) {
      return (
        <div className={classes.continueButtonContainer}>
          <Button
            className={classes.button}
            onClick={() => {
              if (
                isValidGroupname(groupForm.groupName) &&
                groupForm.city !== "" &&
                groupForm.tags.length > 0
              ) {
                setFormStep(1);
              } else {
                setTouched((touched) => {
                  return {
                    ...touched,
                    groupName: true,
                    city: true,
                    tags: true,
                  };
                });
              }
            }}
          >
            CONTINUE
          </Button>
        </div>
      );
    } else if (formStep === 1) {
      return (
        <div className={classes.buttonsContainer}>
          <Button
            onClick={() => {
              setFormStep(0);
            }}
            className={classes.button}
          >
            BACK
          </Button>

          <Button
            className={classes.button}
            onClick={async () => {
              if (
                groupForm.pic !== "" &&
                (!groupForm.date || groupForm.date >= new Date().toISOString())
              ) {
                const response = await createRequest(groupForm);
                props.history.push("/my-groups/" + response.data.id + "#new");
              } else {
                setTouched((touched) => {
                  return {
                    ...touched,
                    pic: true,
                    date: true,
                  };
                });
              }
            }}
          >
            Create
          </Button>
        </div>
      );
    }
  }
}
