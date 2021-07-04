import React from "react";
import { Button, Grid } from "@material-ui/core";
import { CreateGroup } from "./CreateGroup";
import { CustomizeGroup } from "./CustomizeGroup";
import { createRequest } from "../../services/GroupService";

const initialState = {
  formStep: 0,
  groupName: "",
  city: "",
  how: "",
  tags: [],
  pic: "",
  participants: "",
  date: new Date().toISOString(),
  location: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CONTINUE":
      return {
        ...state,
        formStep: state.formStep + 1,
      };
    case "BACK":
      return {
        ...state,
        formStep: state.formStep - 1,
      };
    case "SET_GROUP_NAME":
      return {
        ...state,
        groupName: action.groupName,
      };
    case "SET_CITY":
      return {
        ...state,
        city: action.city,
      };
    case "ONLINE_OFFLINE_BOTH":
      return {
        ...state,
        how: action.how,
      };
    case "TAGS":
      return {
        ...state,
        tags: action.tags,
      };
    case "PIC":
      return {
        ...state,
        pic: action.pic,
      };
    case "NUMBER_OF_PARTICIPANTS":
      return {
        ...state,
        participants: action.participants,
      };
    case "DATE":
      return {
        ...state,
        date: action.date,
      };
    case "LOCATION":
      return {
        ...state,
        location: action.location,
      };
    case "DESCRIPTION":
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}

export function CreateGroupView() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      {renderForm()}
      {renderButtons()}
    </>
  );

  function renderForm() {
    if (state.formStep === 0) {
      return <CreateGroup state={state} dispatch={dispatch} />;
    } else if (state.formStep === 1) {
      return <CustomizeGroup state={state} dispatch={dispatch} />;
    }
  }

  function renderButtons() {
    if (state.formStep === 0) {
      return (
        <div className="creategroup-continuebutton">
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch({ type: "CONTINUE" });
            }}
          >
            CONTINUE
          </Button>
        </div>
      );
    } else if (state.formStep === 1) {
      return (
        <div className="customizegroup-bottombuttons">
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch({ type: "BACK" });
            }}
          >
            Back
          </Button>

          <Button
            type="button"
            variant="contained"
            onClick={() => {
              const exec = async () => {
                await createRequest(state);
              };
              exec();
            }}
          >
            Create
          </Button>
        </div>
      );
    }
  }
}
