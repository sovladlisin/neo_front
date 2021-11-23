import { combineReducers } from "redux";
import alertReducer from "./alerts/alerts";
import authReducer from "./auth/auth";
import classReducer from "./ontology/classes/classes";
import corpusReducer from "./ontology/corpuses/corpuses";
import fileReducer from "./ontology/files/files";
import resourceReducer from "./resources/resources";
import workspaceReducer from "./workspace/workspace";


const RootReducer = combineReducers({
    alerts: alertReducer,
    classes: classReducer,
    corpuses: corpusReducer,
    auth: authReducer,
    files: fileReducer,
    workspace: workspaceReducer,
    resources: resourceReducer
});

export default RootReducer