import Navbar from "./components/Navbar";
import Presentation from "./components/Presentation";
import About from "./components/About";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Events from "./components/Events";
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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/test">
          <RegisterPO />
        </Route>
        <Route exact path="/login">
          <Login />
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
        <Route exact path="/">
          <Navbar />
          <Presentation />
          <Footer />
        </Route>
        <Route exact path="/events">
          <Navbar />
          <Events />
          <Footer />
        </Route>
        <Route exact path="/about">
          <Navbar />
          <About />
          <Footer />
        </Route>
        <Route exact path="/blogs">
          <Navbar />
          <Blogs />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Navbar />
          <Contact />
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
