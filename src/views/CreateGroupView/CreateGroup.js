import React from "react";
import { TagComponent } from "../../components/TagComponent";
import {
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  IconButton,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import { useTags } from "../../hooks/useTags";

export function CreateGroup(props) {
  const [autocompleteValue, setAutocompleteValue] = React.useState(null);

  const hobbies = useTags();

  return (
    <>
      <Typography variant="h3" component={"h1"} align={"center"} className={""}>
        {/* component (the semantic): how the heading is rendered; variant: how the heading looks */}
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

      <div className={"creategroup-tags"}>
        <Autocomplete
          id="combo-box-demo"
          options={hobbies.map((x) => {
            return x.title;
          })}
          onChange={(event, autoValue) => setAutocompleteValue(autoValue)}
          value={autocompleteValue}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
        <IconButton
          onClick={() => {
            if (
              props.state.tags.includes(autocompleteValue) ||
              autocompleteValue === null
            ) {
            } else {
              props.dispatch({
                type: "TAGS",
                tags: [...props.state.tags, autocompleteValue],
              });
            }
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div className={"creategroup-tags"}>
        {props.state.tags.map((x) => {
          return <TagComponent title={x} key={x} />;
        })}
      </div>
    </>
  );
}
