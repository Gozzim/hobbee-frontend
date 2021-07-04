import React from "react";
import { TagComponent } from "../../components/TagComponent";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { TagAutocomplete } from "../../components/TagAutocomplete";

export function CreateGroup(props) {
  return (
    <>
      <Typography variant="h3" component={"h1"} align={"center"} className={""}>
        Create Group
      </Typography>
      <Typography className={"creategroup-padding"}>
        What do you want to call your group?
      </Typography>
      <TextField
        label="e.g. Table Tennis at TUM"
        required={true}
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) => {
          props.dispatch({
            type: "SET_GROUP_NAME",
            groupName: event.target.value,
          });
        }}
        value={props.state.groupName}
      />

      <Typography className={"creategroup-padding"}>
        In what city will your activity take place?
      </Typography>

      <TextField
        label="e.g. Munich, Germany"
        className=""
        required={true}
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) => {
          props.dispatch({
            type: "SET_CITY",
            city: event.target.value,
          });
        }}
        value={props.state.city}
      />

      <Typography className={"creategroup-padding"}>
        Do you want to meet online or in real life?
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          className={"creategroup-radios"}
          onChange={(event) => {
            props.dispatch({
              type: "ONLINE_OFFLINE_BOTH",
              how: event.target.value,
            });
          }}
        >
          <FormControlLabel value="online" control={<Radio />} label="Online" />
          <FormControlLabel
            value="offline"
            control={<Radio />}
            label="Offline"
          />
          <FormControlLabel
            value="both"
            control={<Radio />}
            label="Both work for me"
          />
        </RadioGroup>
      </FormControl>

      <Typography className={"creategroup-padding"}>
        Choose some tags, so that other users can find your group:
      </Typography>

      <TagAutocomplete
        onChange={(tags) => {
          props.dispatch({
            type: "TAGS",
            tags: tags,
          });
        }}
        value={props.state.tags}
      />

      <div className={"creategroup-tags"}>
        {props.state.tags.map((x) => {
          return <TagComponent id={x} key={x} />;
        })}
      </div>
    </>
  );
}
