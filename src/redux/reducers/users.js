const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

// pending,fullfilled,rejected
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_USERS_PENDING":
      return { ...state, isLoading: true };
    case "GET_LIST_USERS_FULFILLED":
      return { ...state, isLoading: false, data: action.payload };
    case "GET_LIST_USERS_REJECTED":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default userReducer;
