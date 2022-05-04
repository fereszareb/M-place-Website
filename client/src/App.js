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
function App() {
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
          <Navbar />
          <Myaccount />
          <Footer />
        </Route>
        <Route exact path="/chat">
          <Navbar />
          <Chat />
          <Footer />
        </Route>
        <Route exact path="/panier">
          <Navbar />
          <Panier />
          <Footer />
        </Route>
        <Route exact path="/search">
          <Navbar />
          <Search />
          <Footer />
        </Route>
        <Route exact path="/">
          <Navbar />
          <Presentation />
          <Footer />
        </Route>
        <Route exact path="/about">
          <Navbar />
          <About />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Navbar />
          <Contact />
          <Footer />
        </Route>
        <Route exact path="/PrivacyPolicy">
          <Navbar />
          <PrivacyPolicy />
          <Footer />
        </Route>
        <Route exact path="/TermsAndConditions">
          <Navbar />
          <TermsAndConditions />
          <Footer />
        </Route>
        <Route exact path="/Product/:product">
          <Navbar />
          <Product />
          <Footer />
        </Route>
        <Route exact path="/:categ">
          <Navbar />
          <Category />
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg">
          <Navbar />
          <Category />
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg/:sousSousCateg">
          <Navbar />
          <Category />
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
