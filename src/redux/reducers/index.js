import { combineReducers } from "redux";

import countReducer from "./count";
import userReducer from "./users";
import latestRecipeReducer from "./latestRecipe";
import myRecipeReducer from "./latestRecipe";
import listRecipeReducer from "./getListRecipe";
import detailRecipeReducer from "./detailRecipe";

const rootReducers = combineReducers({
  count: countReducer,
  user: userReducer,
  latestRecipe: latestRecipeReducer,
  myRecipe: myRecipeReducer,
  listRecipe: listRecipeReducer,
  detailRecipe: detailRecipeReducer,
});

export default rootReducers;
