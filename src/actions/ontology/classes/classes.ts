import axios from "axios";
import { Dispatch } from "react";
import { SERVER_URL } from "../../../utils";
import { withToken } from "../../auth/auth";

import { GET_CLASSES, GET_CLASS_OBJECTS, GET_SUBCLASSES, TClassDispatchTypes, TClass, UPDATE_CLASS, GET_CLASS_OBJECT, GET_CLASS, GET_CLASSES_WITH_SIGNATURE, GET_OBJECTS_BY_URI, CREATE_ENTITY } from "./types";



export const getClasses = () => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken()
    axios.get(SERVER_URL + 'getClasses', params).then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        })
    })
}

export const getSubClasses = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken({ id: id })
    axios.get(SERVER_URL + `getSubClasses`, params).then(res => {
        dispatch({
            type: GET_SUBCLASSES,
            payload: { id: id, classes: res.data }
        })
    })
}

export const getClassObjects = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken({ id: id })

    axios.get(SERVER_URL + `getClassObjects`, params).then(res => {
        dispatch({
            type: GET_CLASS_OBJECTS,
            payload: { id: id, objects: res.data }
        })
    })
}
export const getClassObject = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken({ id: id })

    axios.get(SERVER_URL + `getClassObject`, params).then(res => {
        dispatch({
            type: GET_CLASS_OBJECT,
            payload: { ...res.data, id: id }
        })
    })
}


export const updateClass = (new_class: TClass) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + 'updateEntity', JSON.stringify(new_class), params).then(res => {
        dispatch({
            type: UPDATE_CLASS,
            payload: res.data
        })
    })
}

export const addClassAttr = () => (dispatch: Dispatch<TClassDispatchTypes>) => {
    // axios.get(SERVER_URL + 'addClassAttribute').then(res => {

    // })
}
export const getClass = (id: number) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken({ id: id })

    axios.get(SERVER_URL + `getClass`, params).then(res => {
        console.log(res)
        dispatch({
            type: GET_CLASS,
            payload: { ...res.data, id: id }
        })
    })
}

export const getClassesWithSignatures = () => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken()


    axios.get(SERVER_URL + `getClassesWithSignatures`, params).then(res => {
        dispatch({
            type: GET_CLASSES_WITH_SIGNATURE,
            payload: res.data
        })
    })
}

export const getObjectsByClassUri = (uri) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken({ uri: uri })

    axios.get(SERVER_URL + `getObjectsByClassUri`, params).then(res => {
        dispatch({
            type: GET_OBJECTS_BY_URI,
            payload: { uri: uri, objects: res.data }
        })
    })
}

export const createEntity = (labels: string[], node) => (dispatch: Dispatch<TClassDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + `addEntity`, JSON.stringify({ labels, node }), params).then(res => {
        dispatch({
            type: CREATE_ENTITY,
            payload: res.data
        })
    })
}
