const initialState = {
	data: [],
	isLoading: false,
	isError: false,
};

// pending,fullfilled,rejected
const detailRecipeReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_DETAIL_RECIPE_PENDING":
			return { ...state, isLoading: true, isError: false, data: [] };
		case "GET_DETAIL_RECIPE_FULFILLED":
			return { ...state, isLoading: false, data: action.payload.data.data };
		case "GET_DETAIL_RECIPE_REJECTED":
			return { ...state, isLoading: false, isError: true, data: [] };
		default:
			return state;
	}
};

export default detailRecipeReducer;
