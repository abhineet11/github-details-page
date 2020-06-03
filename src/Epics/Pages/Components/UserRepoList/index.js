import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserRepoDetails } from "../../../../actions/index";
import moment from "moment";
import "./index.css";

const colorMapping = {
  HTML: "#e34c26",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
};

class UserRepoList extends Component {
  state = {
    repoData: [],
    filterType: "All",
    search: "",
  };
  componentDidMount() {
    this.props.getUserRepoDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userRepoDetails.data !== this.props.userRepoDetails.data) {
      this.setState({ repoData: nextProps.userRepoDetails.data });
    }
  }

  inputSearchHandler = (value, dataArr) => {
    if (value === "") {
      return dataArr;
    } else {
      const filterArr = dataArr.filter((obj, i) =>
        obj.name.toLowerCase().startsWith(value.toLowerCase())
      );
      return filterArr;
    }
  };

  filterSelectedVal = (key, data) => {
    return data.filter((obj, i) => obj[key]);
  };

  typeChange = (val, dataArr) => {
    let filterData;
    switch (val) {
      case "All":
        filterData = dataArr;
        break;
      case "forked":
        filterData = this.filterSelectedVal("fork", dataArr);
        break;
      case "archived":
        filterData = this.filterSelectedVal("archived", dataArr);
        break;
      case "mirror":
        filterData = this.filterSelectedVal("mirror_url", dataArr);
        break;
      default:
        filterData = dataArr;
        break;
    }
    return filterData;
  };

  filterHandler = () => {
    const { data } = this.props.userRepoDetails;
    const { filterType, search } = this.state;
    const selectData = this.typeChange(filterType, data);
    const searchData = this.inputSearchHandler(search, selectData);
    this.setState({
      repoData: searchData,
    });
  };

  //called on change of a search or select filter
  onFilterChange = (e, type) => {
    this.setState(
      {
        [type]: e.target.value,
      },
      () => this.filterHandler()
    );
  };

  // clear filter
  clearFilter = () => {
    this.setState(
      {
        search: '',
        filterType: 'All'
      },
      () => this.filterHandler()
    );
  }

  render() {
    const { repoData, filterType, search } = this.state;
    return (
      <div className="repolist-container">
        {/* tabs component */}
        <div className="tab">
          <button className="tablinks">Overview</button>
          <button className="tablinks active">
            Repositories <span className="counter">12</span>
          </button>
          <button className="tablinks">
            Projects <span className="counter">0</span>
          </button>
          <button className="tablinks">
            Stars <span className="counter">7</span>
          </button>
          <button className="tablinks">
            Followers <span className="counter">6</span>
          </button>
          <button className="tablinks">
            Following <span className="counter">2</span>
          </button>
        </div>
        {/* filter component */}
        <div className="filter-container p15">
          <div className="search-container">
            <input
              type="text"
              placeholder="Find a repository..."
              value={search}
              onChange={(e) => this.onFilterChange(e, "search")}
            />
          </div>
          <div className="select-container">
            <div className="select-section">
              <select
                className="btn btn-primary"
                value={filterType}
                onChange={(e) => this.onFilterChange(e, "filterType")}
              >
                <option value="All">All</option>
                <option value="source">Sources</option>
                <option value="forked">Forks</option>
                <option value="archived">Archived</option>
                <option value="mirror">Mirrors</option>
              </select>
            </div>
            <div>
              <select className="btn btn-primary">
                <option>All</option>
              </select>
            </div>
          </div>
          
        </div>

        {(search !== "" || filterType !== "All") && (
          <div className="filter-result">
            <div className="result-section">
                <strong>{repoData.length}</strong> result
                {filterType !== "All" && <>for <strong>{filterType}</strong></>} repositories
                {search !== "" && <> matching <strong>{search}</strong></>}
            </div>
            <div className="clear-filter" onClick={this.clearFilter}>
                <i class="fa fa-window-close" aria-hidden="true"></i> Clear filter 
            </div>
          </div>
        )}
        {/* Details component */}
        <div className="card-container">
          {repoData.map((obj, i) => (
            <div className="card p25" key={i}>
              <div className="card-left-section">
                <div className="card-name">
                  <h3>
                    <a href={obj.html_url} target="_blank" rel="noopener noreferrer">
                      {obj.name}
                    </a>
                  </h3>
                </div>
                <div className="card-description">
                  <p>{obj.description}</p>
                </div>
                <div className="card-details">
                  {obj.language && (
                    <p className="mr15">
                      <span
                        className="card-language-color"
                        style={{
                          backgroundColor: colorMapping[obj.language],
                        }}
                      ></span>
                      {obj.language}
                    </p>
                  )}
                  {obj.fork && (
                    <p className="mr15">
                      <i className="fa fa-code-fork" aria-hidden="true"></i>
                      {obj.forks}
                    </p>
                  )}
                  {obj.watchers_count > 0 && (
                    <p className="mr15">
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                      {obj.watchers_count}
                    </p>
                  )}
                  <p className="mr15">
                    Updated on {moment(obj.updated_at).format("ll")}
                  </p> 
                </div>
              </div>
              <div>
                <button className="btn btn-primary">
                  <i className="fa fa-star-o" aria-hidden="true"></i> Star
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserRepoDetails: () => dispatch(getUserRepoDetails()),
});

const mapStateToProps = (state) => ({
  userRepoDetails: state.userDetails.userRepoDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRepoList);
