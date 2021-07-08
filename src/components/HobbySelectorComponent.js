import React, { useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import hobbies from "../assets/hobbies.json";
import { TagComponent } from "./TagComponent";
import { TextField } from "@material-ui/core";

export function HobbySelector(props) {
  const [selectedHobby, setSelectedHobby] = React.useState(null);
  const [tags, setTags] = React.useState([]);

  const isValidTag = (hobbyTag) => {
    // dummy
    if (hobbyTag) return true;
    return false;
  };

  const onChangeHobbyInput = (event, hobbyTag) => {
    setSelectedHobby(hobbyTag);
    if (isValidTag(hobbyTag) && !tags.includes(hobbyTag)) {
      try {
        setTags([...tags, hobbyTag]);
        setSelectedHobby(null);
        console.log(event.currentTarget.innerHTML);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const onAddTag = (hobbyTag) => {
    console.log(hobbyTag);
    if (hobbyTag && !tags.includes(hobbyTag)) {
      setSelectedHobby(hobbyTag);
      try {
        setTags([...tags, hobbyTag]);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    // placeholder
  }, []);

  return (
    <div>
      <Autocomplete
        id="hobby-selector"
        options={hobbies.map((hobbyTag) => {
          return hobbyTag.title;
        })}
        onChange={onChangeHobbyInput}
        value={selectedHobby}
        style={{ width: "60%" }}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
      />
      <div className={"hobby-tags"}>
        {tags.map((hobbyTag) => {
          return <TagComponent title={hobbyTag} key={hobbyTag} />;
        })}
      </div>
    </div>
  );
}
