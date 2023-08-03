import { combineReducers } from "redux";
import AdminReducer from "./Reducers/AdminReducer";
import AuthReducer from "./Reducers/AuthReducer";
import UserReducer from "./Reducers/UserReducer";


export default combineReducers({
    auth: AuthReducer,
    admin: AdminReducer,
    users: UserReducer
});
