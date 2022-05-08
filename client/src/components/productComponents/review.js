import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function showStars(stars) {
  const nbr = Math.trunc(stars);
  var rows = [];
  for (var i = 0; i < nbr; i++) {
    rows.push(
      <li className="list-inline-item">
        <BsStarFill />
      </li>
    );
  }
  if (stars !== nbr) {
    rows.push(
      <li className="list-inline-item">
        <BsStarHalf />
      </li>
    );
    for (i = 0; i < 4 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  } else {
    for (i = 0; i < 5 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  }
  return rows;
}
var data = JSON.parse("[{},{},{}]");
const Review = ({ data }) => {
  return (
    <div>
      {data.map((item, key) => {
        return (
          <div className="itemReview" key={key}>
            <div className="row">
              <div className="w-120">
                <div className="vectorUser">
                  <img src={item.pictture} alt="" />
                </div>
              </div>
              <div className="col">
                <div className="UserName">{item.client} </div>
                <div className="star-rating px-3">
                  <ul className="list-inline">
                    {showStars(item.stars)}
                    <li className="list-inline-item review"> 12 April 2021</li>
                  </ul>
                </div>
                <div className="commante">{item.comment}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
