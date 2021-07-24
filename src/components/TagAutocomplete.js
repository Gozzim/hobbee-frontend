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
        clearOnEscape
        autoComplete
        selectOnFocus
        getOptionLabel={(option) => option.title}
        onChange={props.onChange}
        value={props.value}
        inputValue={props.inputValue}
        onInputChange={props.onInputChange}
        fullWidth
        filterOptions={props.filterOptions}
        renderInput={(params) => (
          <TextField
            placeholder={"Hobbies"}
            {...params}
            variant="outlined"
            error={props.error}
            helperText={props.helperText}
          />
        )}
      />
    </div>
  );
}
