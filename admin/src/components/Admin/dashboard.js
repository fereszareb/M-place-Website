import { Link } from "react-router-dom";
import { FaUserAlt, FaBox, FaShoppingCart } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const DashboardAdmin = () => {
  const data = [
    { name: "Facebook", users: 2000000000 },
    { name: "Instagram", users: 1500000000 },
    { name: "Twiter", users: 1000000000 },
    { name: "Telegram", users: 500000000 },
  ];

  const dataOrdersByMonth = [
    { date: "January", value: 0 },
    { date: "February", value: 0 },
    { date: "March", value: 0 },
    { date: "April", value: 1 },
    { date: "May", value: 3 },
    { date: "June", value: 0 },
    { date: "July", value: 0 },
    { date: "August", value: 0 },
    { date: "September", value: 0 },
    { date: "October", value: 0 },
    { date: "November", value: 0 },
    { date: "December", value: 0 },
  ];
  const dataUsersByMonth = [
    { date: "January", value: 0 },
    { date: "February", value: 0 },
    { date: "March", value: 2 },
    { date: "April", value: 1 },
    { date: "May", value: 4 },
    { date: "June", value: 0 },
    { date: "July", value: 0 },
    { date: "August", value: 0 },
    { date: "September", value: 0 },
    { date: "October", value: 0 },
    { date: "November", value: 0 },
    { date: "December", value: 0 },
  ];
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Dashboard
          </li>
        </ol>
      </nav>
      <div className="row sizeX125">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1 className="text-center">Nombre of ProductOwners</h1>
            </div>
            <div className="content-cardTemplate">
              <div className="row">
                <div className="col-6 text-orange">
                  <FaUserAlt />
                </div>
                <div className="col-6 text-end-number">3</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1 className="text-center">Nombre of Clients</h1>
            </div>
            <div className="content-cardTemplate">
              <div className="row">
                <div className="col-6 text-orange">
                  <FaUserAlt />
                </div>
                <div className="col-6 text-end-number">6</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1 className="text-center">Products available</h1>
            </div>
            <div className="content-cardTemplate">
              <div className="row">
                <div className="col-6 text-orange">
                  <FaShoppingCart />
                </div>
                <div className="col-6 text-end-number">4</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1 className="text-center">Ordars Today</h1>
            </div>
            <div className="content-cardTemplate">
              <div className="row">
                <div className="col-6 text-orange">
                  <FaBox />
                </div>
                <div className="col-6 text-end-number">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>Orders by month</h1>
            </div>
            <div className="content-cardTemplate">
              <BarChart
                width={550}
                height={300}
                data={dataOrdersByMonth}
                margin={{
                  top: 5,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="date"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />

                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>Clients by month</h1>
            </div>
            <div className="content-cardTemplate">
              <BarChart
                width={550}
                height={300}
                data={dataUsersByMonth}
                margin={{
                  top: 5,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="date"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="cardTemplate shadow-sm">
            <div className="title-cardTemplate">
              <h1>Orders By day</h1>
            </div>
            <div className="content-cardTemplate">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="users"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
