import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducers from "./reducers";

// redux persist config
const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const middleware = applyMiddleware(promiseMiddleware);
const store = createStore(persistedReducer, middleware);

// export default store

const persistor = persistStore(store);
export { store, persistor };
