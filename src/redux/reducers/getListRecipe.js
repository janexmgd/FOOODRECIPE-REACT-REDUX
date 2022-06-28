const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

// pending,fullfilled,rejected
const listRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_RECIPE_PENDING":
      return { ...state, isLoading: true };
    case "GET_LIST_RECIPE_FULFILLED":
      console.log(action.payload.data);
      return { ...state, isLoading: false, data: action.payload.data.data };
    case "GET_LIST_RECIPE_REJECTED":
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export default listRecipeReducer;
