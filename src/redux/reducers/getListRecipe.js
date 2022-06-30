const initialState = {
	data: [],
	isLoading: false,
	isError: false,
};

// pending,fullfilled,rejected
const listRecipeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_LIST_RECIPE_PENDING":
			return { ...state, isLoading: true, isError: false, data: [] };
		case "GET_LIST_RECIPE_FULFILLED":
			return { ...state, isLoading: false, data: action.payload };
		case "GET_LIST_RECIPE_REJECTED":
			return { ...state, isLoading: false, isError: true, data: [] };
		default:
			return state;
	}
};

export default listRecipeReducer;
