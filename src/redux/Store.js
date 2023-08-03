import { createStore, applyMiddleware } from "redux";
import rootReducer from "./RootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];

const Store = createStore(rootReducer, applyMiddleware(...middleware));

export default Store; 
