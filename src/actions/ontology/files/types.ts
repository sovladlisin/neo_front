export const GET_FILES = 'GET_FILES'
export const GET_FILE = 'GET_FILE'
export const DELETE_FILE = 'DELETE_FILE'

export type TFile = {
    id?: number,
    source: string,
    name: string
}

interface IGetFiles {
    type: typeof GET_FILES,
    payload: TFile[]
}
interface IGetFile {
    type: typeof GET_FILE,
    payload: TFile
}
interface IDeleteFile {
    type: typeof DELETE_FILE,
    payload: number
}

export type TFileDispatchTypes = IGetFile | IGetFiles | IDeleteFile