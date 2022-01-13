import axios from "axios";
import { Dispatch } from "react";
import { SERVER_URL } from "../../../utils";
import { withToken } from "../../auth/auth";
import { TFile } from "../classes/types";
import { GET_ALL_CORPUS_RESOURCES, GET_ALL_RESOURCES, IS_RESOURCES_LOADING, TResourceDispatchTypes } from "./types";

export const getAllResources = () => (dispatch: Dispatch<TResourceDispatchTypes>) => {
    axios.get(SERVER_URL + 'getAllResources').then(res => {
        dispatch({
            type: GET_ALL_RESOURCES,
            payload: res.data
        })
    }).catch(err => console.log(err))
}

export const getCorpusResources = (corpus_uri) => (dispatch: Dispatch<TResourceDispatchTypes>) => {
    const params = withToken({ corpus_uri })
    dispatch({
        type: IS_RESOURCES_LOADING,
        payload: true
    })
    axios.get(SERVER_URL + 'getCorpusResources', params).then(res => {
        dispatch({
            type: GET_ALL_CORPUS_RESOURCES,
            payload: res.data
        })
        dispatch({
            type: IS_RESOURCES_LOADING,
            payload: false
        })
    }).catch(err => console.log(err))
}

export const connectFileToResource = (name: string, file_type: string, object_id: number, file: File, note: string, res_type = null) => (dispatch: Dispatch<TResourceDispatchTypes>) => {
    var params = withToken({ name, file_type, object_id, note, res_type })
    params['headers'] = { ...params['headers'], ['Content-Type']: 'multipart/form-data' }
    var formData = new FormData();
    formData.append("file", file);

    axios.post(SERVER_URL + 'uploadFile', formData, params).then(res => {
        // dispatch({
        //     type: GET_FILE,
        //     payload: res.data
        // })
    }).catch(err => {
        console.log(err)
    })
}