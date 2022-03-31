import "./../../css/chat.css";

const Chat = () => {
  return (
    <div className="container bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-4 col-xl-3 chatLeft">
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
        <div className="col-8 col-xl-9 chatRight">
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
          <div className="chatBox">
            <div className="sendMessage mb-3">
              <div className="d-flex">
                <div
                  className="chatboxPicture d-felx"
                  style={{
                    backgroundImage:
                      "url(" + "https://picsum.photos/id/237/200/300" + ")",
                  }}
                ></div>
                <div className="d-flex MessageDisplay">
                  <div className="MessageContent">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptatibus ab laboriosam quia expedita, nam aut deleniti
                    quae sequi quas incidunt fugit labore vero nisi impedit
                    repellat nostrum architecto a deserunt?
                  </div>
                </div>
              </div>
            </div>
            <div className="sendMessage mb-3">
              <div className="d-flex">
                <div
                  className="chatboxPicture d-felx"
                  style={{
                    backgroundImage:
                      "url(" + "https://picsum.photos/id/237/200/300" + ")",
                  }}
                ></div>
                <div className="d-flex MessageDisplay">
                  <div className="MessageContent">Lorem ipsum</div>
                </div>
              </div>
            </div>
            <div className="receiveMessage mb-3">
              <div className="d-flex flex-row-reverse justify-content-end">
                <div
                  className="chatboxPicture d-felx"
                  style={{
                    backgroundImage:
                      "url(" + "https://picsum.photos/id/237/200/300" + ")",
                  }}
                ></div>
                <div className="d-flex MessageDisplay">
                  <div className="MessageContent">Lorem ipsum</div>
                </div>
              </div>
            </div>
          </div>
          <div className="messageBox">
            <form>
              <input
                type="text"
                placeholder="Enter message ..."
                name="message"
              />
              <button type="submit" value={">"}>
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
