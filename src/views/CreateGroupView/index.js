import React from "react";
import { Button } from "@material-ui/core";
import { CreateGroup } from "./CreateGroup";
import { CustomizeGroup } from "./CustomizeGroup";
import { createRequest } from "../../services/GroupService";

const initialState = {
  formStep: 0,
  groupName: {
    touched: false,
    value: "",
  },
  city: {
    touched: false,
    value: "",
  },
  how: "both",
  tags: {
    touched: false,
    value: [],
  },
  pic: "",
  participants: "",
  date: null,
  location: "",
  description: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CONTINUE":
      if (
        state.groupName.value !== "" &&
        state.city.value !== "" &&
        state.tags.value.length > 0
      ) {
        return {
          ...state,
          formStep: state.formStep + 1,
        };
      } else {
        return {
          ...state,
          groupName: {
            value: state.groupName.value,
            touched: true,
          },
          city: {
            value: state.city.value,
            touched: true,
          },
          tags: {
            value: state.tags.value,
            touched: true,
          },
        };
      }
    case "BACK":
      return {
        ...state,
        formStep: state.formStep - 1,
      };
    case "SET_GROUP_NAME":
      return {
        ...state,
        groupName: {
          touched: state.groupName.touched || action.groupName !== "",
          value: action.groupName,
        },
      };
    case "SET_CITY":
      return {
        ...state,
        city: {
          touched: state.city.touched || action.city !== "",
          value: action.city,
        },
      };
    case "ONLINE_OFFLINE_BOTH":
      return {
        ...state,
        how: action.how,
      };
    case "TAGS":
      return {
        ...state,
        tags: {
          touched: state.tags.touched || action.tags.length > 0,
          value: action.tags,
        },
      };
    case "DELETE_TAG":
      return {
        ...state,
        tags: {
          touched: state.tags.touched,
          value: state.tags.value.filter((tag) => {
            return action.tagId !== tag;
          }),
        },
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
