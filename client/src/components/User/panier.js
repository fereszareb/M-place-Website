import "./../../css/panier.css";
import { MdDelete } from "react-icons/md";
const Panier = () => {
  const deleteProduct = (e) => {
    console.log(e.target.getAttribute("data"));
  };
  const productPlus = (e) => {
    console.log(e.target.getAttribute("data"));
  };
  const productMinus = (e) => {
    console.log(e.target.getAttribute("data"));
  };
  const productFromLocalStorage = [
    {
      id: "1254",
      name: "productName number one ",
      img: "https://picsum.photos/200",
      sku: "prod-25AB",
      price: "125",
      reduction: "10",
      nbrProduct: 4,
    },
    {
      id: "1222",
      name: "productName number two ",
      img: "https://picsum.photos/202",
      sku: "prod-97ZB",
      price: "2785.26",
      reduction: "0",
      nbrProduct: 1,
    },
  ];
  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-md-11 col-lg-10">
        <div className="text-center titleCarousel">
          <b>Checkout</b>
        </div>
        <div className="card mt-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card m-3">
                <div className="card-header">
                  {"Panier ( " + productFromLocalStorage.length + " )"}
                </div>
                <div className="card-body">
                  {productFromLocalStorage.map((product, key) => {
                    return (
                      <div className="Item-product-card m-2" key={key}>
                        <div className="row">
                          <div className="col-6 col-md-3">
                            <div
                              className="product-img"
                              style={{
                                backgroundImage: "url(" + product.img + ")",
                              }}
                            ></div>
                          </div>
                          <div className="col-6 col-md-5 pt-3 size0-5em">
                            <h6>{product.name}</h6>
                            <small>{"[" + product.sku + "]"}</small>
                          </div>
                          <div className="col-6 col-md-4 text-end">
                            {product.reduction === "0" ? (
                              <div className="row pt-3">
                                <h5>{product.price} TND</h5>
                              </div>
                            ) : (
                              <div className="row">
                                <h5>
                                  {(product.price * (100 - product.reduction)) /
                                    100 +
                                    " "}
                                  TND
                                </h5>
                                <div>
                                  <del>
                                    {product.price + " "}
                                    TND
                                  </del>
                                  <span class="badge bg-warning m-0 ms-2">
                                    {product.reduction}%
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-6">
                            <button
                              data={product.id}
                              className="btn deleteBTN"
                              onClick={deleteProduct}
                            >
                              <MdDelete /> <span>Delete</span>
                            </button>
                          </div>
                          <div className="col-6 text-end">
                            <div className="d-flex justify-content-end">
                              <button
                                data={product.id}
                                className="btn add-minus"
                                onClick={productPlus}
                              >
                                -
                              </button>
                              <p className="ms-3 me-3">1</p>
                              <button
                                data={product.id}
                                className="btn add-minus"
                                onClick={productMinus}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
