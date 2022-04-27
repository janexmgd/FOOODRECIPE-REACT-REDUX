const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

//pending,fullfilled,rejected
const latestRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_RECIPE_PENDING":
      return { ...state, isLoading: true };
    case "GET_MY_RECIPE_FULFILLED":
      return { ...state, isLoading: false, data: action.payload.data.data };
    case "GET_MY_RECIPE_REJECTED":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default latestRecipeReducer;
