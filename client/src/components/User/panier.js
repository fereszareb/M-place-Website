import "./../../css/panier.css";
import api from "./../../config.service";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
const Panier = () => {
  const deleteProduct = (e) => {
    const newusersList = productFromLocalStorage.filter((product) => {
      return product.id !== e.target.getAttribute("data");
    });
    console.log(newusersList);
    setproductFromLocalStorage([...newusersList]);
  };
  const productPlus = (e) => {
    const indexProductToDelete = productFromLocalStorage.findIndex(
      (product) => product.id === e.target.getAttribute("data")
    );
    console.log(e.target.getAttribute("data"));
    if (indexProductToDelete >= 0) {
      let newListProduct = productFromLocalStorage;
      newListProduct[indexProductToDelete].nbrProduct++;
      setproductFromLocalStorage([...newListProduct]);
    }
  };
  const productMinus = (e) => {
    const indexProductToDelete = productFromLocalStorage.findIndex(
      (product) => product.id === e.target.getAttribute("data")
    );
    if (
      indexProductToDelete >= 0 &&
      productFromLocalStorage[indexProductToDelete].nbrProduct > 1
    ) {
      let newListProduct = productFromLocalStorage;
      newListProduct[indexProductToDelete].nbrProduct--;
      setproductFromLocalStorage([...newListProduct]);
    }
  };
  const [productFromLocalStorage, setproductFromLocalStorage] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [payDetails, setPayDetails] = useState({
    subtotal: 0,
    discount: 0,
    coupon: 0,
    total: 0,
  });

  const [coupon, setCoupon] = useState("");
  const [couponValue, setcouponValue] = useState(0);
  const [couponErreur, setCouponErreur] = useState("");
  const [loadingCoupon, setloadingCoupon] = useState(false);
  const couponChangeHandler = (e) => {
    setCoupon(e.target.value);
  };
  const verifyCoupon = () => {
    if (coupon) {
      setCouponErreur("");
      setloadingCoupon(true);
      let data = {
        coupon: coupon,
        products: productFromLocalStorage,
      };
      setcouponValue(12);
      api
        .post("/coupon/verify", data)
        .then((res) => {
          //receive the value of coupon by the product
          setcouponValue(res.data.value);
          setloadingCoupon(false);
        })
        .catch((error) => {
          if (error.response) {
            setCouponErreur(error.response.data.msg);
          }
          setloadingCoupon(false);
        });
    }
  };

  const [numberOfProduct, setNumberOfProduct] = useState(0);
  useEffect(() => {
    const getNumberOfItem = () => {
      let nbrOfItem = 0;
      for (var i = 0; i < productFromLocalStorage.length; i++) {
        nbrOfItem += parseInt(productFromLocalStorage[i].nbrProduct);
      }
      return nbrOfItem;
    };
    setNumberOfProduct(getNumberOfItem());
    localStorage.setItem("products", JSON.stringify(productFromLocalStorage));
  }, [productFromLocalStorage]);

  useEffect(() => {
    if (productFromLocalStorage) {
      let subtotal = 0;
      let discount = 0;

      for (const index in productFromLocalStorage) {
        subtotal +=
          parseFloat(productFromLocalStorage[index].price) *
          parseInt(productFromLocalStorage[index].nbrProduct);
        discount +=
          ((parseInt(productFromLocalStorage[index].reduction) *
            parseFloat(productFromLocalStorage[index].price)) /
            100) *
          productFromLocalStorage[index].nbrProduct;
      }
      setPayDetails({
        subtotal: subtotal,
        discount: discount,
        coupon: couponValue,
        total: subtotal - discount - couponValue,
      });
    }
  }, [couponValue, productFromLocalStorage]);
  return (
    <div className="row justify-content-center mb-5 w-100 mx-0">
      <div className="col-12 col-xl-10">
        <div className="text-center titleCarousel">
          <b>Checkout</b>
        </div>
        <div className="card mt-5">
          {numberOfProduct > 0 ? (
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="card m-3 me-lg-0">
                  <div className="card-header">
                    {"Panier ( " + numberOfProduct + " )"}
                  </div>
                  <div className="card-body">
                    {productFromLocalStorage.map((product, key) => {
                      return (
                        <div
                          className="Item-product-card m-2 pt-2 pb-2 bb-1"
                          key={key}
                        >
                          <div className="row">
                            <div className="col-12 col-sm-6 col-md-3 text-center">
                              <div
                                className="product-img m-auto ms-md-0"
                                style={{
                                  backgroundImage: "url(" + product.img + ")",
                                }}
                              ></div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-5 pt-3 size0-5em text-center">
                              <h6>{product.name}</h6>
                              <small>{"[" + product.sku + "]"}</small>
                            </div>
                            <div className="col-12 col-6 col-md-4 text-center text-md-end">
                              {product.reduction === "0" ? (
                                <div className="row pt-4 mb-3">
                                  <h5>{product.price} TND</h5>
                                </div>
                              ) : (
                                <div className="row mb-3">
                                  <h5>
                                    {(product.price *
                                      (100 - product.reduction)) /
                                      100}
                                    TND
                                  </h5>
                                  <div>
                                    <del>
                                      {product.price + " "}
                                      TND
                                    </del>
                                    <span className="badge bg-warning m-0 ms-2">
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
                                <MdDelete /> Delete
                              </button>
                            </div>
                            <div className="col-6 text-end">
                              <div className="d-flex justify-content-end">
                                <button
                                  data={product.id}
                                  className="btn add-minus"
                                  onClick={productMinus}
                                  disabled={product.nbrProduct === 1}
                                >
                                  -
                                </button>
                                <p className="ms-3 me-3">
                                  {product.nbrProduct}{" "}
                                </p>
                                <button
                                  data={product.id}
                                  className="btn add-minus"
                                  onClick={productPlus}
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
              <div className="col-12 col-lg-4">
                <div className="card m-3 ms-lg-0">
                  <div className="card-header">Total</div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p>{payDetails.subtotal} TND</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Discout</p>
                      <p>{payDetails.discount} TND</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Coupon</p>
                      <p>{payDetails.coupon} TND</p>
                    </div>
                    <div className="d-flex justify-content-between fw-bold">
                      <p>Total</p>
                      <p>{payDetails.total} TND</p>
                    </div>
                    <div className="text-center d-flex couponGroupe">
                      <input
                        type="text"
                        placeholder="Coupon"
                        onChange={couponChangeHandler}
                      />
                      <button
                        className="btn btn-orange"
                        onClick={verifyCoupon}
                        disabled={loadingCoupon}
                      >
                        {loadingCoupon ? (
                          <div
                            className="spinner-border text-secondary spinner-small m-auto"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                    <div className="text-canter">
                      <small className="text-danger">{couponErreur}</small>
                    </div>

                    <div className="text-center">
                      <button className="btn btn-checkout">Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <p className="text-center p-5 fs-4 color-grey">
                Liste of Product is Empty
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panier;
