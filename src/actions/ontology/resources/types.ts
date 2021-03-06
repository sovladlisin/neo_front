import { TClass, TConnectedVisualItem } from "../classes/types";

export const GET_ALL_RESOURCES = 'GET_ALL_RESOURCES'
export const GET_ALL_CORPUS_RESOURCES = 'GET_ALL_CORPUS_RESOURCES'
export const IS_RESOURCES_LOADING = 'IS_RESOURCES_LOADING'


export const DELETE_RESOURCE_FROM_LIST = 'DELETE_RESOURCE_FROM_LIST'
export const ADD_RESOURCE_TO_LIST = 'ADD_RESOURCE_TO_LIST'


export const GET_VISUAL_ITEM_CONNECTIONS = 'GET_VISUAL_ITEM_CONNECTIONS'



export type TResourcesMeta = {
    actors: TClass[],
    places: TClass[],
    texts: TClass[],
    video: TClass[],
    audio: TClass[],
    images: TClass[],

    actors_count: number,
    places_count: number,
    texts_count: number,
    video_count: number,
    audio_count: number,
    images_count: number,
}

export type TEvent = {
    actor: TClass,
    role: TClass,
    place: TClass
}

export type TMainCounter = {
    images: number,
    notes: number,
    audio: number,
    articles: number,
    video: number,
    texts: number,
    places: TClass[],
    actors: TClass[],
    genres: TClass[],
    langs: TClass[],
}

export type TMainResource = {
    resource: TClass,
    media: TClass[],
    genres: TClass[],
    lang: TClass,
    events: TEvent[],
    notations: number,
    media_carrier: TConnectedVisualItem[]
}
interface IGetVisualItemsConnections {
    type: typeof GET_VISUAL_ITEM_CONNECTIONS,
    payload: { id: number, data: TClass[] }
}

interface IAddResourceToList {
    type: typeof ADD_RESOURCE_TO_LIST,
    payload: TMainResource
}
interface IRemoveResourceFromList {
    type: typeof DELETE_RESOURCE_FROM_LIST,
    payload: number
}

interface IGetAllResources {
    type: typeof GET_ALL_RESOURCES,
    payload: TResourcesMeta
}
interface IGetAllCorpusResources {
    type: typeof GET_ALL_CORPUS_RESOURCES,
    payload: { data: TMainResource[], data_size: number, counters: TMainCounter }
}
interface isResLoad {
    type: typeof IS_RESOURCES_LOADING,
    payload: boolean
}

export type TResourceDispatchTypes = IGetAllResources | IGetAllCorpusResources | isResLoad | IAddResourceToList | IRemoveResourceFromList | IGetVisualItemsConnections