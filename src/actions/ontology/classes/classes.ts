import axios from "axios";
import { Dispatch } from "react";
import { SERVER_URL } from "../../../utils";

import { GET_CLASSES, GET_CLASS_OBJECTS, GET_SUBCLASSES, TClassDispatchTypes, TClass, UPDATE_CLASS, GET_CLASS_OBJECT } from "./types";

export const getClasses = () => (dispatch: Dispatch<TClassDispatchTypes>) => {
    axios.get(SERVER_URL + 'getClasses').then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        })
    })
}

export const getSubClasses = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    axios.get(SERVER_URL + `getSubClasses?id=${id}`).then(res => {
        dispatch({
            type: GET_SUBCLASSES,
            payload: { id: id, classes: res.data }
        })
    })
}

export const getClassObjects = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    axios.get(SERVER_URL + `getClassObjects?id=${id}`).then(res => {
        dispatch({
            type: GET_CLASS_OBJECTS,
            payload: { id: id, objects: res.data }
        })
    })
}
export const getClassObject = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    axios.get(SERVER_URL + `getClassObject?id=${id}`).then(res => {
        dispatch({
            type: GET_CLASS_OBJECT,
            payload: res.data
        })
    })
}


export const updateClass = (new_class: TClass) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    axios.post(SERVER_URL + 'updateEntity', JSON.stringify(new_class)).then(res => {
        dispatch({
            type: UPDATE_CLASS,
            payload: res.data
        })
    })
}