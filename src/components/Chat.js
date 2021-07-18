import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { ChatMessage } from "./ChatMessage";
import { useSelector } from "react-redux";
import { fetchProcessedGroupChat } from "../services/GroupService";
import { io } from "../services/SocketService";

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

  const user = useSelector((state) => {
    return state.user;
  });
  const groupID = props.groupID;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //get initial chat
  useEffect(async () => {
    const thisGroupChat = await fetchProcessedGroupChat(groupID);
    setMessages(thisGroupChat.data);
  }, []);

  //connect socket
  useEffect(() => {
    //reconnect chat sockets if db disconnects for a short time
    io.on("disconnect", async () => {
      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        io.emit("room", groupID);
      }
    });
    io.on("return message", (data) => {
      setMessages(data);
    });
    io.emit("room", groupID);
  }, []);

  const sendMessage = () => {
    io.emit("new user message", {
      sender: user.user._id,
      message: input,
      timestamp: Date.now(),
      isSystemMessage: false,
      groupId: groupID,
    });
    setInput("");
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div>
      <div className={classes.chat}>
        <div className="scroller">
          {messages.map((x) => {
            const currentUser = x.sender === user.user._id;
            return (
              <ChatMessage
                isSystemMessage={x.isSystemMessage}
                name={x.senderName || null}
                message={x.message}
                time={x.timestamp}
                key={x._id}
                isCurrentUser={currentUser}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <form
          className={classes.inputField}
          noValidate
          autoComplete="off"
          style={{ flex: 3 }}
          onSubmit={handleSubmit}
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
