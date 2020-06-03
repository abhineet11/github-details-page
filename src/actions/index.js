import api from "../service";
import {PROFILE_DATA_LOADING, PROFILE_DATA_SUCCESS, USER_REPO_DATA_LOADING, USER_REPO_DATA_SUCCESS} from './constant'
const baseURL = "https://api.github.com"

export const getProfileData = () => dispatch => {
  dispatch({ type: PROFILE_DATA_LOADING });
  return api
    .getData(`${baseURL}/users/supreetsingh247`)
    .then(res => {
        return dispatch({
          type: PROFILE_DATA_SUCCESS,
          value: res.data
        });
    })
    .catch(err => {
     
    });
};

export const getUserRepoDetails = () => dispatch => {
  dispatch({ type: USER_REPO_DATA_LOADING });
  return api
    .getData(`${baseURL}/users/supreetsingh247/repos`)
    .then(res => {
        return dispatch({
          type: USER_REPO_DATA_SUCCESS,
          value: res.data
        });
    })
    .catch(err => {
     
    });
};