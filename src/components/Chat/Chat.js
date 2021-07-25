import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import { ChatMessage } from "./ChatMessage";
import { useSelector } from "react-redux";
import { fetchProcessedGroupChat } from "../../services/GroupService";
import { io } from "../../services/SocketService";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router";

import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import EmojiMenu from "./EmojiMenu";

const useStyles = makeStyles((theme) => ({
  inputField: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
    display: "inline-block",
  },
  chat: {
    width: "100%",
  },
  messageButtonDiv: {
    //flex: 1,
    width: "60px",
    position: "relative",
    marginLeft: "10px",
  },
  messageButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  emojiButton: {
    marginRight: 5,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export function Chat(props) {
  const classes = useStyles();

  const history = useHistory();
  const user = useSelector((state) => {
    return state.user;
  });
  const groupID = props.groupID;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [emojiMenuAnchor, setEmojiMenuAnchor] = useState(null);

  //get initial chat
  useEffect(() => {
    async function processGroupChat() {
      const thisGroupChat = await fetchProcessedGroupChat(groupID); //TODO never call http request without try catch
      setMessages(thisGroupChat.data);
    }
    processGroupChat();
  }, [groupID]);

  //connect socket
  useEffect(() => {
    //reconnect chat sockets if db disconnects for a short time
    io.on("disconnect", async () => {
      for (let i = 0; i < 10; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        io.emit("room", groupID, user.user._id);
      }
    });
    io.on("return message", (data) => {
      setMessages(data);
    });
    io.emit("room", groupID, user.user._id);
  }, [groupID, user.user._id]);

  useEffect(() => {
    //reconnect chat on back to page without new render
    history.listen(() => {
      io.connect();
    })
  }, [history]);

  const sendMessage = () => {
    if (input.replace(/\s/g, '').length) {
      io.emit("new user message", {
        sender: user.user._id,
        message: input,
        timestamp: Date.now(),
        isSystemMessage: false,
        groupId: groupID,
      });
    }
    setInput("");
  };

  const scrollToBottom = () => {
    const element = document.getElementById("chat-scroller");
    element.scrollTop = element.scrollHeight;
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div style={{backgroundColor: "white", borderRadius: "10px",}}>
        <div className={classes.chat}>
          <div className="scroller" id="chat-scroller">
            {messages.map((x) => {
              if(user.user) {
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
              } else {
                return null;
              }
            })}
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
                InputProps={{
                  startAdornment: (
                      <EmojiEmotionsIcon
                          color={"disabled"}
                          className={classes.emojiButton}
                          onClick={
                            (event) => setEmojiMenuAnchor(event.currentTarget)
                          }
                      />
                  ),
                }}
            />
          </form>
          <div className={classes.messageButtonDiv}>
            <IconButton
                type="button"
                className={classes.messageButton}
                onClick={() => sendMessage()}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      <EmojiMenu
          open={Boolean(emojiMenuAnchor)}
          anchor={emojiMenuAnchor}
          onClose={() => setEmojiMenuAnchor(null)}
          onEmojiClick={(event, emojiObject) => {
            setInput(input + emojiObject.emoji);
            setEmojiMenuAnchor(null)
          }}
      />
    </div>
  );
}
