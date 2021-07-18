import React from "react";
import { Button } from "@material-ui/core";
import { CreateGroup } from "./CreateGroup";
import { CustomizeGroup } from "./CustomizeGroup";
import { createRequest } from "../../services/GroupService";
import { RequireLoggedIn } from "../../components/RequireLoggedIn";

const initialGroupFormState = {
  groupName: "",
  city: "",
  onOffline: "both",
  tags: [],
  pic: "",
  participants: "",
  date: null,
  location: "",
  description: "",
};
const initialTouchedState = {
  groupName: false,
  city: false,
  tags: false,
  pic: false,
};

export function CreateGroupView() {
  const [groupForm, setGroupForm] = React.useState(initialGroupFormState);
  const [touched, setTouched] = React.useState(initialTouchedState);
  const [formStep, setFormStep] = React.useState(1);

  return (
    <RequireLoggedIn>
      {renderForm()}
      {renderButtons()}
    </RequireLoggedIn>
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
        <div className="creategroup-continuebutton">
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              if (
                groupForm.groupName !== "" &&
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
        <div className="customizegroup-bottombuttons">
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              setFormStep(0);
            }}
          >
            Back
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={async () => {
              if (groupForm.pic !== "") {
                await createRequest(groupForm);
              } else {
                setTouched((touched) => {
                  return {
                    ...touched,
                    pic: true,
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
