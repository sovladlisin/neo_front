import { TClass } from "../classes/types";

export const GET_ALL_RESOURCES = 'GET_ALL_RESOURCES'

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

interface IGetAllResources {
    type: typeof GET_ALL_RESOURCES,
    payload: TResourcesMeta
}

export type TResourceDispatchTypes = IGetAllResources