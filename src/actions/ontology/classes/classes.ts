import axios from "axios";
import { Dispatch } from "react";
import { getRandomInt, handleError, SERVER_URL } from "../../../utils";
import { alertDispatchTypes, CREATE_ALERT } from "../../alerts/types";
import { withToken } from "../../auth/auth";
import { DISCONNECT_FILE_FROM_TEXT, TWorkspaceDispatchTypes } from "../../workspace/types";
import { DELETE_RESOURCE_FROM_LIST, TResourceDispatchTypes } from "../resources/types";

import { GET_CLASSES, GET_CLASS_OBJECTS, GET_SUBCLASSES, TClassDispatchTypes, TClass, UPDATE_CLASS, GET_CLASS_OBJECT, GET_CLASS, GET_CLASSES_WITH_SIGNATURE, GET_OBJECTS_BY_URI, CREATE_ENTITY, GET_ALL_CLASSES, GET_DOMAIN_ONTOLOGIES, CLASS_LOADING, LOADING_OBJECTS_BY_URI, GET_CLASS_FULL_SIGNATURE, CLASS_FULL_SIGNATURE_LOADING, IS_SEARCHING, GET_SEARCH, DELETE_DOMAIN_ONTOLOGY, OBJECT_IS_LOADING, EVENT_CREATED_TO, EVENT_DELETED_FROM } from "./types";

export const deleteOntology = (domain: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ domain })
    axios.delete(SERVER_URL + 'deleteOntology', params).then(res => {
        dispatch({
            type: DELETE_DOMAIN_ONTOLOGY,
            payload: domain
        })
        dispatch({
            type: CREATE_ALERT,
            payload: { type: 200, message: 'Онтология удалена' }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const searchIndex = (domain: string, connector: string, search: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    dispatch({
        type: IS_SEARCHING,
        payload: true
    })
    axios.post(SERVER_URL + 'searchIndex', JSON.stringify({ domain, connector, search }), params).then(res => {
        dispatch({
            type: GET_SEARCH,
            payload: { result: res.data, domain }
        })
        dispatch({
            type: IS_SEARCHING,
            payload: false
        })
    }).catch(err => {
        dispatch({
            type: IS_SEARCHING,
            payload: false
        })
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const updateIndex = (domain: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.post(SERVER_URL + 'updateIndex', JSON.stringify({ domain }), params).then(res => {
        console.log('g')
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getDomainOntologies = () => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    axios.get(SERVER_URL + 'getDomainOntologies', params).then(res => {
        dispatch({
            type: GET_DOMAIN_ONTOLOGIES,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getAllClasses = (domain: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ domain })
    axios.get(SERVER_URL + 'getAllClasses', params).then(res => {
        dispatch({
            type: GET_ALL_CLASSES,
            payload: { classes: res.data, domain }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}


export const getClasses = (domain: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ domain })
    axios.get(SERVER_URL + 'getClasses', params).then(res => {
        dispatch({
            type: GET_CLASSES,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getSubClasses = (id: number) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ id: id })
    axios.get(SERVER_URL + `getSubClasses`, params).then(res => {
        dispatch({
            type: GET_SUBCLASSES,
            payload: { id: id, classes: res.data }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getClassObjects = (id: number) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ id: id })

    axios.get(SERVER_URL + `getClassObjects`, params).then(res => {
        dispatch({
            type: GET_CLASS_OBJECTS,
            payload: { id: id, objects: res.data }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}
export const getClassObject = (id: number) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ id })
    dispatch({
        type: OBJECT_IS_LOADING,
        payload: true
    })
    axios.get(SERVER_URL + `getClassObject`, params).then(res => {
        dispatch({
            type: OBJECT_IS_LOADING,
            payload: false
        })
        dispatch({
            type: GET_CLASS_OBJECT,
            payload: { ...res.data, id: id }
        })
    }).catch(err => {
        dispatch({
            type: OBJECT_IS_LOADING,
            payload: false
        })
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}


export const updateClass = (new_class) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + 'updateEntity', JSON.stringify(new_class), params).then(res => {
        dispatch({
            type: UPDATE_CLASS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const addClassAttr = () => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    // axios.get(SERVER_URL + 'addClassAttribute').then(res => {

    // })
}
export const getClass = (id: number) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ id: id })
    dispatch({
        type: CLASS_LOADING,
        payload: id
    })
    axios.get(SERVER_URL + `getClass`, params).then(res => {
        dispatch({
            type: GET_CLASS,
            payload: { ...res.data, id: id }
        })
        dispatch({
            type: CLASS_LOADING,
            payload: -1
        })
    }).catch(err => {
        dispatch({
            type: CLASS_LOADING,
            payload: -1
        })
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getClassesWithSignatures = () => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()


    axios.get(SERVER_URL + `getClassesWithSignatures`, params).then(res => {
        dispatch({
            type: GET_CLASSES_WITH_SIGNATURE,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getClassFullSignature = (uri: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ uri })
    dispatch({
        type: CLASS_FULL_SIGNATURE_LOADING,
        payload: true
    })
    axios.get(SERVER_URL + `getClassFullSignature`, params).then(res => {
        dispatch({
            type: GET_CLASS_FULL_SIGNATURE,
            payload: { ...res.data, uri }
        })
        dispatch({
            type: CLASS_FULL_SIGNATURE_LOADING,
            payload: false
        })
    }).catch(err => {
        dispatch({
            type: CLASS_FULL_SIGNATURE_LOADING,
            payload: false
        })
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const getObjectsByClassUri = (uri) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken({ uri: uri })
    dispatch({
        type: LOADING_OBJECTS_BY_URI,
        payload: true
    })
    axios.get(SERVER_URL + `getObjectsByClassUri`, params).then(res => {
        dispatch({
            type: GET_OBJECTS_BY_URI,
            payload: { ...res.data, uri }
        })
        dispatch({
            type: LOADING_OBJECTS_BY_URI,
            payload: false
        })
    }).catch(err => {
        dispatch({
            type: LOADING_OBJECTS_BY_URI,
            payload: false
        })
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const createEntity = (labels: string[], node) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + `addEntity`, JSON.stringify({ labels, node }), params).then(res => {
        dispatch({
            type: CREATE_ENTITY,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const createEvent = (actors_id: { actor_id: number, title: string[] }[], place_id: number, time_string: string, resource_id: number, connection_type: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()
    const body = JSON.stringify({ actor_id: actors_id, place_id, time_string, resource_id, connection_type })
    axios.post(SERVER_URL + `createEvent`, body, params).then(res => {
        dispatch({
            type: CREATE_ALERT,
            payload: { message: 'Событие создано', type: 200 }
        })
        const id = getRandomInt(0, 1000)
        dispatch({
            type: EVENT_CREATED_TO,
            payload: { id, resource_id }
        })
    }).catch(err => {
        console.log(err)
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const deleteEvent = (id: number, resource_id: number) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes | TWorkspaceDispatchTypes | TResourceDispatchTypes>) => {
    const params = withToken({ id })

    axios.delete(SERVER_URL + `deleteEntity`, params).then(res => {
        dispatch({
            type: EVENT_DELETED_FROM,
            payload: { id, resource_id }
        })
    }).catch(err => console.log(err))
}

export const updateEntity = (node) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + `updateEntity`, JSON.stringify({ node }), params).then(res => {
        dispatch({
            type: CREATE_ENTITY,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const deleteEntity = (id: number) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes | TWorkspaceDispatchTypes | TResourceDispatchTypes>) => {
    const params = withToken({ id })

    axios.delete(SERVER_URL + `deleteEntity`, params).then(res => {
        dispatch({
            type: DISCONNECT_FILE_FROM_TEXT,
            payload: id
        })
        dispatch({
            type: DELETE_RESOURCE_FROM_LIST,
            payload: id
        })
        dispatch({
            type: CREATE_ALERT,
            payload: { message: 'Сущность удалена', type: 200 }
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const addClassAttribute = (domain: string, class_id: number, label: string[], uri: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + `addClassAttribute`, JSON.stringify({ domain, class_id, label, uri }), params).then(res => {
        console.log(res)
        // dispatch({
        //     type: CREATE_ENTITY,
        //     payload: res.data
        // })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}

export const addClassAttributeObject = (domain: string, class_id: number, attribute_class_id: number, label: string[], uri: string) => (dispatch: Dispatch<TClassDispatchTypes | alertDispatchTypes>) => {
    const params = withToken()

    axios.post(SERVER_URL + `addClassAttributeObject`, JSON.stringify({ domain, class_id, attribute_class_id, label, uri }), params).then(res => {
        console.log(res)
        // dispatch({
        //     type: CREATE_ENTITY,
        //     payload: res.data
        // })
    }).catch(err => {
        dispatch({
            type: CREATE_ALERT,
            payload: handleError(err)
        })
    })
}