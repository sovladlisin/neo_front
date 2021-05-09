import { TClass } from "./actions/ontology/classes/types"

export const SERVER_URL = window.location.host.includes('local') ? 'http://127.0.0.1:8000/api/' : 'https://neoback.herokuapp.com/api/'
export const LABEL = "http://www.w3.org/2000/01/rdf-schema#label"
export const OBJECT_PROPERTY = "http://www.w3.org/2002/07/owl#ObjectProperty"
export const NAMED_IND = "http://www.w3.org/2002/07/owl#NamedIndividual"

export const PERSON_URI = "http://erlangen-crm.org/current/E21_Person"
export const PLACE_URI = "http://erlangen-crm.org/current/E53_Place"

export type TDataType = { type: string, name: string, uri: string }
export const DATA_TYPES: TDataType[] = [
    {
        type: 'string',
        name: 'Cтрока',
        uri: 'http://www.w3.org/2000/01/rdf-schema#Literal'
    },
    {
        type: 'langString',
        name: 'Языковая строка',
        uri: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'
    },
]

export const getName = (node: TClass, lang = 1) => {


    const lang_list = { 0: 'en', 1: 'ru' }
    const language = lang_list[lang]

    const params = node.params
    if (!params.includes(LABEL)) return node['uri'].split('/').pop()
    const label: String[] = node[LABEL]

    var result = ''
    label.map(s => {
        if (s.includes(language))
            result = s.split('@')[0]
    })
    if (result.length === 0) return label[0].split('@')[0]
    return result
}