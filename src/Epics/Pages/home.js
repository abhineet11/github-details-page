import React, { Component } from "react";
import './home.css'
import UserInfo from "./Components/UserInfo";
import UserRepoList from "./Components/UserRepoList";

class Home extends Component {
  render() {
    return (
      <div className="mt30 flex-container pl15 pr15">
        <UserInfo />
        <UserRepoList />
      </div>
    );
  }
}

export default Home;
