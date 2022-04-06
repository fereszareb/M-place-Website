import { Link } from "react-router-dom";
import Chat from "./chat";
const Messages = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Messages
          </li>
        </ol>
      </nav>
      <Chat />
    </div>
  );
};

export default Messages;
