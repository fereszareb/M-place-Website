import Navbar from "./components/Navbar";
import Presentation from "./components/Presentation";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import Erreur404 from "./components/404";
import Product from "./components/product";
import Category from "./components/category";
import RegisterPO from "./components/registerPO/registerPO";
import ForgetPassword from "./components/forgetPassword";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ResetPassword from "./components/resetPassword";
import Search from "./components/search";
import Myaccount from "./components/User/myaccount";
import LoginAdmin from "./components/loginAdmin";
import Chat from "./components/User/chat";
import Test from "./components/User/test";
import LoginPO from "./components/loginPO";
import Panier from "./components/User/panier";
import PrivacyPolicy from "./components/privacy-policy";
import TermsAndConditions from "./components/terms-and-conditions";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_oKhSR5nslBRnBZpjO6KuzZeX");
function App() {
  const [numberOfProduct, setnumberOfProduct] = useState(0);
  const CalcnumberOfProduct = (number) => {
    if (!number) {
      let productFromLocalStorage =
        JSON.parse(localStorage.getItem("products")) || [];
      let nbrOfItem = 0;
      for (var i = 0; i < productFromLocalStorage.length; i++) {
        nbrOfItem += parseInt(productFromLocalStorage[i].nbrProduct);
      }
      setnumberOfProduct(nbrOfItem);
    } else {
      setnumberOfProduct(number);
    }
  };

  useEffect(() => {
    CalcnumberOfProduct();
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/registerPO">
          <RegisterPO />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/loginAdmin">
          <LoginAdmin />
        </Route>
        <Route exact path="/loginPO">
          <LoginPO />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/forgetPassword">
          <ForgetPassword />
        </Route>
        <Route exact path="/resetPassword/:token">
          <ResetPassword />
        </Route>
        <Route exact path="/myaccount">
          <Navbar numberOfProduct={numberOfProduct} />
          <Myaccount />
          <Footer />
        </Route>
        <Route exact path="/chat">
          <Navbar numberOfProduct={numberOfProduct} />
          <Chat />
          <Footer />
        </Route>
        <Route exact path="/panier">
          <Navbar numberOfProduct={numberOfProduct} />
          <Panier CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="/search">
          <Navbar numberOfProduct={numberOfProduct} />
          <Search CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="/">
          <Navbar numberOfProduct={numberOfProduct} />
          <Presentation CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="/about">
          <Navbar numberOfProduct={numberOfProduct} />
          <About />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Navbar numberOfProduct={numberOfProduct} />
          <Contact />
          <Footer />
        </Route>
        <Route exact path="/PrivacyPolicy">
          <Navbar numberOfProduct={numberOfProduct} />
          <PrivacyPolicy />
          <Footer />
        </Route>
        <Route exact path="/TermsAndConditions">
          <Navbar numberOfProduct={numberOfProduct} />
          <TermsAndConditions />
          <Footer />
        </Route>
        <Route exact path="/Product/:product">
          <Navbar numberOfProduct={numberOfProduct} />
          <Product CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="/404">
          <Erreur404 />
        </Route>
        <Route exact path="/:categorie">
          <Navbar numberOfProduct={numberOfProduct} />
          <Category CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg">
          <Navbar numberOfProduct={numberOfProduct} />
          <Category CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg/:sousSousCateg">
          <Navbar numberOfProduct={numberOfProduct} />
          <Category CalcnumberOfProduct={CalcnumberOfProduct} />
          <Footer />
        </Route>
        <Route exact path="*">
          <Erreur404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
