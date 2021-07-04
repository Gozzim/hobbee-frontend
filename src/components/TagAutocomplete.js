import { Autocomplete } from "@material-ui/lab";
import { IconButton, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useTags } from "../hooks/useTags";

export function TagAutocomplete(props) {
  const hobbies = useTags();
  const [autocompleteValue, setAutocompleteValue] = React.useState(null);
  return (
    <div className={"creategroup-tags"}>
      <Autocomplete
        options={hobbies}
        getOptionLabel={(option) => option.title}
        onChange={(event, autoValue) => {
          setAutocompleteValue(autoValue);
        }}
        value={autocompleteValue}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
      <IconButton
        onClick={() => {
          if (
            autocompleteValue === null ||
            props.value.includes(autocompleteValue._id)
          ) {
          } else {
            props.onChange([...props.value, autocompleteValue._id]);
          }
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}
