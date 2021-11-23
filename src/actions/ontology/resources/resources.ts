import axios from "axios";
import { Dispatch } from "react";
import { SERVER_URL } from "../../../utils";
import { GET_ALL_RESOURCES, TResourceDispatchTypes } from "./types";

export const getAllResources = () => (dispatch: Dispatch<TResourceDispatchTypes>) => {
    axios.get(SERVER_URL + 'getAllResources').then(res => {
        dispatch({
            type: GET_ALL_RESOURCES,
            payload: res.data
        })
    }).catch(err => console.log(err))
}