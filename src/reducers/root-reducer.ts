import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import classReducer from "./ontology/classes/classes";


const RootReducer = combineReducers({
    alerts: alertReducer,
    classes: classReducer,
});

export default RootReducer