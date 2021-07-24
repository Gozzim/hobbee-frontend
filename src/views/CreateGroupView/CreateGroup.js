import React, { useState } from "react";
import { TagComponent } from "../../components/TagComponent";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  TagAutocomplete,
} from "../../components/TagAutocomplete";
import { isValidGroupname } from "../../validators/GroupDataValidator";

export function CreateGroup(props) {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const onChangeTagInput = (event, hobbyTag) => {
    props.setTouched((touched) => {
      return { ...touched, tags: true };
    });
    if (hobbyTag && !props.groupForm.tags.includes(hobbyTag)) {
      try {
        props.setGroupForm((groupForm) => {
          return { ...groupForm, tags: [...groupForm.tags, hobbyTag] };
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    setInputValue("");
    setSelectedHobby(null);
  };

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
        required
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) => {
          props.setTouched((touched) => {
            return { ...touched, groupName: true };
          });
          props.setGroupForm((groupForm) => {
            return { ...groupForm, groupName: event.target.value };
          });
        }}
        value={props.groupForm.groupName}
        error={
          props.touched.groupName &&
          !isValidGroupname(props.groupForm.groupName)
        }
        helperText={
          props.touched.groupName &&
          !isValidGroupname(props.groupForm.groupName)
            ? "Invalid entry"
            : ""
        }
      />

      <Typography className={"creategroup-padding"}>
        In what city will your activity take place?
      </Typography>

      <TextField
        label="e.g. Munich, Germany"
        className=""
        required
        fullWidth
        variant="outlined"
        size="small"
        onChange={(event) => {
          props.setTouched((touched) => {
            return { ...touched, city: true };
          });
          props.setGroupForm((groupForm) => {
            return { ...groupForm, city: event.target.value };
          });
        }}
        value={props.groupForm.city}
        error={props.touched.city && props.groupForm.city === ""}
        helperText={
          props.touched.city && props.groupForm.city === "" ? "Empty entry" : ""
        }
      />

      <Typography className={"creategroup-padding"}>
        Do you want to meet online or in real life?
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          className={"creategroup-radios"}
          onChange={(event) => {
            props.setGroupForm((groupForm) => {
              return { ...groupForm, onOffline: event.target.value };
            });
          }}
          value={props.groupForm.onOffline}
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
        inputValue={inputValue}
        onInputChange={(e, v) => {
          setInputValue(v);
        }}
        style={{ width: 300 }}
        filterOptions={(options) => {
            return options.filter((option) =>
                !props.groupForm.tags.includes(option)

            )
        }}
        onChange={onChangeTagInput}
        value={selectedHobby}
        error={props.touched.tags && props.groupForm.tags.length === 0}
        helperText={
          props.touched.tags && props.groupForm.tags.length === 0
            ? "Empty entry"
            : ""
        }
      />

      <div className={"creategroup-tags"}>
        {props.groupForm.tags.map((x) => {
          return (
            <div style={{ marginRight: "10px", marginBottom: "5px" }}>
              <TagComponent
                id={x._id}
                key={x._id}
                onDelete={() => {
                  props.setTouched((touched) => {
                    return { ...touched, tags: true };
                  });
                  props.setGroupForm((groupForm) => {
                    return {
                      ...groupForm,
                      tags: groupForm.tags.filter((tag) => x._id !== tag._id),
                    };
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
