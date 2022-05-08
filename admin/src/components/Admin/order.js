import { Link } from "react-router-dom";

const Order = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Orders
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Order;
