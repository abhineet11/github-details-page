import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileData } from "../../../../actions/index";
import './index.css'

class UserInfo extends Component {
  componentDidMount() {
    this.props.getProfileData();
  }

  render() {
    const { data, isLoading } = this.props.userInfo;
    if (isLoading) return <>Loading...</>;
    return (
      <>
        {!isLoading && (
          <div className="userinfo-container">
            <div className="user-desc-container">
                <div className="user-image">
                    <img src={data.avatar_url} className="avatar" alt="avatar"/>
                </div>
                <div className="user-name-container p15">
                    <h2>{data.name}</h2>
                    <p>{data.login}</p>
                </div>
            </div>
              <button className="btn btn-primary mb15">Follow</button>
              <div className="user-profile-container"> 
                  <div className="user-bio">
                      <p>{data.bio}</p>
                  </div>
                  <div className="user-details">
                      <p><i className="fa fa-building-o" aria-hidden="true"></i>{data.company}</p>
                      <p><i className="fa fa-map-marker" aria-hidden="true"></i>{data.location}</p>
                      {data.email && <p><i className="fa fa-envelope-o" aria-hidden="true"></i>{data.email }</p>}
                  </div>
              </div>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProfileData: () => dispatch(getProfileData()),
});

const mapStateToProps = (state) => ({
  userInfo: state.userDetails.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
