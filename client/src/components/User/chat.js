import "./../../css/chat.css";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';


const socket = io.connect("http://localhost:5000");


const Chat = () => {
  const [username, setUsername] = useState("feres");
  const [room, setRoom] = useState("1212");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const sound = new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3');
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((list) => [...list, data]);
      sound.play()
    });
  }, [socket]);




  return (
    <div className="container-lg mt-5 mb-5 max-width-1000 bg-white shadow">
      <button onClick={joinRoom}>here</button>
      <div className="row">
        <div className="col-4 chatLeft">
          <div className="chatLeftTitle">Chat</div>
          <ul>
            <li className="d-flex">
              <div
                className="chatLeftPicture d-felx"
                style={{
                  backgroundImage:
                    "url(" + "https://picsum.photos/id/237/200/300" + ")",
                }}
              ></div>
              <div className="chatLeftNameUser d-flex">Ahmed salhi</div>
            </li>
            <li className="d-flex">
              <div
                className="chatLeftPicture d-felx"
                style={{
                  backgroundImage:
                    "url(" + "https://picsum.photos/id/237/200/300" + ")",
                }}
              ></div>
              <div className="chatLeftNameUser d-flex">Ahmed salhi</div>
            </li>
            <li className="d-flex">
              <div
                className="chatLeftPicture d-felx"
                style={{
                  backgroundImage:
                    "url(" + "https://picsum.photos/id/237/200/300" + ")",
                }}
              ></div>
              <div className="chatLeftNameUser d-flex">Ahmed salhi</div>
            </li>
            <li className="d-flex">
              <div
                className="chatLeftPicture d-felx"
                style={{
                  backgroundImage:
                    "url(" + "https://picsum.photos/id/237/200/300" + ")",
                }}
              ></div>
              <div className="chatLeftNameUser d-flex">Ahmed salhi</div>
            </li>
          </ul>
        </div>
        <div className="col-8 chatRight">
          <div className="chatRightTitle">
            <div className="d-flex">
              <div
                className="chatRightPicture d-felx"
                style={{
                  backgroundImage:
                    "url(" + "https://picsum.photos/id/237/200/300" + ")",
                }}
              ></div>
              <div className="chatRightNameUser d-flex">Ahmed salhi</div>
            </div>
          </div>
          <ScrollToBottom className="chatBox">
          {messageList.map((messageContent) => {
            return (
              
              username === messageContent.author ? (
                <div className="sendMessage mb-3">
                <div className="">
                  <div className="d-flex MessageDisplay w-100">
                    <div className="MessageContent messageSendColor m-auto me-0">
                      {messageContent.message}
                    </div>
                  </div>
                  <p className="text-end dateOfMessahe">{messageContent.time}</p>
                </div>
              </div>
              ):(
                <div className="receiveMessage mb-3">
                <div className="d-flex">
                  <div
                    className="chatboxPicture d-felx"
                    style={{
                      backgroundImage:
                        "url(" + "https://picsum.photos/id/237/200/300" + ")",
                    }}
                  ></div>
                  <div className="d-flex MessageDisplay">
                    <div className="MessageContent messageReceiveColor">
                      {messageContent.message}
                    </div>
                  </div>
                </div>
                <p className="dateOfMessahe px-4">{messageContent.time}</p>
              </div>
              )
              
            )}
          )}
          </ScrollToBottom>
          <div className="messageBox">
            <form onSubmit={sendMessage}>
              <input
                className="sendMessageInput"
                type="text"
                placeholder="Enter message ..."
                name="message"
                autocomplete="off"
                value={currentMessage}
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
              />
              <button className="btn btn-orange sendMessageBtn" type="submit">
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
