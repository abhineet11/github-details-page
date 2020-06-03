const initialState = {
  userInfo: {
    isLoading: true,
    data: {}
  },
  userRepoDetails: {
    isLoading: false,
    data: []
  }
 
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_DATA_LOADING':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          isLoading: true
        }
        
      }

    case 'PROFILE_DATA_SUCCESS':
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            isLoading: false,
            data: {...action.value}
          }
      }

      case 'USER_REPO_DATA_LOADING':
        return {
          ...state,
          userRepoDetails: {
            ...state.userRepoDetails,
            isLoading: true
          }
          
        }

      case 'USER_REPO_DATA_SUCCESS':
          return {
            ...state,
            userRepoDetails: {
              ...state.userRepoDetails,
              isLoading: false,
              data: [...action.value]
            }
          }
    
    

    default:
      return state
  }
}
