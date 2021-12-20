export const GET_FILES = 'GET_FILES'
export const GET_FILE = 'GET_FILE'
export const DELETE_FILE = 'DELETE_FILE'
export const GET_FIRST_TEXT_TABLE = 'GET_FIRST_TEXT_TABLE'
export type TFile = {
    id?: number,
    source: string,
    name: string
}
export type TTextParams = {
    collected_by: string,
    commantator: string,
    decrypted_by: string,
    dialect: string,
    editor: string,
    genre: string,
    lang: string,
    lang_origin: string,
    notation_by: string,
    note: string,
    obr: string,
    permormed_by: string,
    place: string,
    place_storage: string,
    published: string,
    redactor: string,
    speech: string,
    time: string,
    title: string,
    transalted_by: string,
    variants: string,
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
interface IGetFirstTextTable {
    type: typeof GET_FIRST_TEXT_TABLE,
    payload: { request_id: string, params: TTextParams }
}

export type TFileDispatchTypes = IGetFile | IGetFiles | IDeleteFile | IGetFirstTextTable