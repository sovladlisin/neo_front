import { TClass } from "../classes/types";

export const GET_CORPUSES = 'GET_CORPUSES'
export const GET_SUB_CORPUSES = 'GET_SUB_CORPUSES'

interface IGetCorpuses {
    type: typeof GET_CORPUSES,
    payload: TClass[]
}

interface IGetSubCorpusesClasses {
    type: typeof GET_SUB_CORPUSES,
    payload: { corpus_id: number, corpuses: TClass[] }
}

export type TCorpusDispatchTypes = IGetCorpuses | IGetSubCorpusesClasses