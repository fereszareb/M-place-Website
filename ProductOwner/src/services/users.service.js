import api from "./../config.service";
import React from "react";
import axios from "axios";
export default class UserService extends React.Component {
  state = {
    users: [],
  };
  /* getAll() {
    axios
      .get(
        "https://random-data-api.com/api/stripe/random_stripe",
        ConfigToken.config
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
*/
  test() {
    const retrieveContacts = async () => {
      const response = await api.get("/contacts");
      return response.data;
    };
    return retrieveContacts;
  }
}
