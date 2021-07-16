import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { ChatMessage } from "./ChatMessage";
import socketIOClient from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  inputField: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
    display: "inline-block",
  },
  chat: {
    backgroundColor: "#FFF3C2",
    width: "100%",
    borderRadius: "10px",
  },
  messageButtonDiv: {
    //flex: 1,
    width: "100px",
    position: "relative",
  },
  messageButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

/**
 * For having an internal scroll container
 * @param {props} props
 */

export function Chat(props) {
  const classes = useStyles();
  const items = [...Array(10 + 1).keys()].slice(1);
  //console.log(items);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [socket, setSocket] = useState(undefined);


  //connect socket
  useEffect(() => {
    const io = socketIOClient("http://localhost:4000/");
    console.log("step 1")
    io.on("return user message", (data) => {
      console.log(messages)
      console.log(data);
      console.log("step 3")
      setMessages(messages => [...messages, data]);
    });
    setSocket(io);
  }, []);


  const sendMessage = () => {
    console.log(input);
    socket.emit("new user message", input);
    setInput("");
  };

  return (
    <div>
      <div className={classes.chat}>
        <div className="scroller">
          {messages.map((x) => {
            return <div>{x}</div>;
          })}
          <ChatMessage
            isSystemMessage={true}
            message="Kempec Halk created Table Tennis at TUM"
          />
          <ChatMessage
            isSystemMessage={false}
            name="Maja Schuknecht"
            message="Howdy, I like big butts and I cannot lie. This much no I can't denyyyy."
            time="08/07/2021 12:20"
            isCurrentUser={true}
          />
          <ChatMessage
            isSystemMessage={false}
            name="Vanessa Krohn"
            message="I like big butts too lol"
            time="08/07/2021 12:21"
            isCurrentUser={false}
          />
          <ChatMessage
            isSystemMessage={true}
            message="Ilias Asimakoupolos joined the chat. Say Hi!"
          />
          <ChatMessage
            isSystemMessage={true}
            message="Zaim Sari left the chat. Goodbye!"
          />
          <ChatMessage
            isSystemMessage={false}
            name="Ilias Asimakoupolos"
            message="did I hear butts? butts are amaaaaze"
            time="08/07/2021 12:25"
            isCurrentUser={false}
          />
          <ChatMessage
            isSystemMessage={false}
            name="Maja Schuknecht"
            message="bing bong butts"
            time="08/07/2021 12:25"
            isCurrentUser={true}
          />
          <ChatMessage
            isSystemMessage={false}
            name="Ilias Asimakoupolos"
            message="I love butts"
            time="08/07/2021 12:26"
            isCurrentUser={false}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <form
          className={classes.inputField}
          noValidate
          autoComplete="off"
          style={{ flex: 3 }}
        >
          <TextField
            id="outlined-basic"
            label="Send a message"
            variant="outlined"
            value={input}
            onInput={(e) => setInput(e.target.value)}
          />
        </form>
        <div className={classes.messageButtonDiv}>
          <Button
            type="button"
            className={classes.messageButton}
            onClick={() => sendMessage()}
          >
            SEND
          </Button>
        </div>
      </div>
    </div>
  );
}
