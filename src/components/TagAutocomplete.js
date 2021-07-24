import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import React from "react";
import { useTags } from "../hooks/useTags";

export function TagAutocomplete(props) {
  const hobbies = useTags();

  return (
    <div className={"creategroup-tags"} style={props.style}>
      <Autocomplete
        options={hobbies}
        getOptionLabel={(option) => option.title}
        onChange={props.onChange}
        value={props.value}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            value={props.value}
            variant="outlined"
            error={props.error}
            helperText={props.helperText}
          />
        )}
      />
    </div>
  );
}
