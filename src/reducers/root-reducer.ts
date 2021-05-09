import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import classReducer from "./ontology/classes/classes";
import corpusReducer from "./ontology/corpuses/corpuses";


const RootReducer = combineReducers({
    alerts: alertReducer,
    classes: classReducer,
    corpuses: corpusReducer
});

export default RootReducer