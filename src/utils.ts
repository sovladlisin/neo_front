import { useEffect, useState } from "react"
import { TAlert } from "./actions/alerts/types"
import { TClass } from "./actions/ontology/classes/types"
export const HOST = window.location.host.includes('local') ? "http://" + window.location.host + '/' : "https://" + window.location.host + '/'

// export const SERVER_DOMAIN = window.location.host.includes('local') ? 'http://127.0.0.1:8000/' : 'https://neoback.herokuapp.com/'
// export const SERVER_URL = window.location.host.includes('local') ? 'http://127.0.0.1:8000/api/' : 'https://neoback.herokuapp.com/api/'
// export const SERVER_URL_AUTH = window.location.host.includes('local') ? 'http://127.0.0.1:8000/auth/' : 'https://neoback.herokuapp.com/auth/'

export const SERVER_DOMAIN = 'https://neoback.herokuapp.com/'
export const SERVER_URL = 'https://neoback.herokuapp.com/api/'
export const SERVER_URL_AUTH = 'https://neoback.herokuapp.com/auth/'


export const LABEL = "http://www.w3.org/2000/01/rdf-schema#label"
export const OBJECT_PROPERTY = "http://www.w3.org/2002/07/owl#ObjectProperty"
export const NAMED_IND = "http://www.w3.org/2002/07/owl#NamedIndividual"

export const PERSON_URI = "http://erlangen-crm.org/current/E21_Person"
export const PLACE_URI = "http://erlangen-crm.org/current/E53_Place"
export const CORPUS_URI = "http://erlangen-crm.org/current/F74_Corpus"
export const LING_OBJECT_URI = "http://erlangen-crm.org/current/E33_Linguistic_Object"
export const VISUAL_ITEM_URI = "http://erlangen-crm.org/current/E36_Visual_Item"


export const TEXT_TYPE = "http://erlangen-crm.org/current/F60_Text_Type"
export const IMAGE_TYPE = "http://erlangen-crm.org/current/F61_Image_Type"
export const VIDEO_TYPE = "http://erlangen-crm.org/current/F58_Video_Type"

export const DIGITAL_CARRIER_URI = "http://erlangen-crm.org/current/F23_Digital_Carrier"

export const NOTE_URI = "http://erlangen-crm.org/current/P3_has_note"

export const CLASS = "http://www.w3.org/2002/07/owl#Class"
export const SUB_CLASS_OF = "http://www.w3.org/2000/01/rdf-schema#subClassOf"

export const DOMAIN_ONTOLOGY = "DomainOntology"

export const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

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
    if (!params.includes(LABEL)) {
        if (node['uri']) {
            if (node['uri'].includes('#')) return node['uri'].split('#').pop()
            if (node['uri'].includes('/')) return node['uri'].split('/').pop()
        }
        return 'TTT'
    }
    const label: String[] = node[LABEL]

    var result = ''
    label.map(s => {
        if (s.includes(language))
            result = s.split('@')[0]
    })
    if (result.length === 0) return label[0].split('@')[0]
    return result
}

export const useKeyPress = (targetKey) => {

    // State for keeping track of whether key is pressed

    const [keyPressed, setKeyPressed] = useState(false);



    // If pressed key is our target key then set to true

    function downHandler({ key }) {
        console.log(key)

        if (key === targetKey) {
            setKeyPressed(true);

        }

    }



    // If released key is our target key then set to false

    const upHandler = ({ key }) => {

        if (key === targetKey) {

            setKeyPressed(false);

        }

    };



    // Add event listeners

    useEffect(() => {

        window.addEventListener('keydown', downHandler);

        window.addEventListener('keyup', upHandler);

        // Remove event listeners on cleanup

        return () => {

            window.removeEventListener('keydown', downHandler);

            window.removeEventListener('keyup', upHandler);

        };

    }, []); // Empty array ensures that effect is only run on mount and unmount



    return keyPressed;

}

export const nodeFilter = (subString: string, node) => {
    const search = subString.toLowerCase()
    const checkArray = (subString: string, array) => {
        return array.find(el => {
            const val: string = el + ""
            if (val.toLowerCase().includes(subString)) return true
            return false
        })
    }

    if (!node) return false;
    const params = Object.keys(node)
    return params.find(param => {
        const value = node[param]
        if (Array.isArray(value)) return checkArray(search, value)
        if (typeof value === 'object') return nodeFilter(search, value)
        const val = value + ""
        if (val.toLowerCase().includes(search)) return true
        return false
    })
}

export const handleError = (err): TAlert => {
    var message = ''
    if (err.response) {
        switch (err.response.status) {
            case 401:
                message = 'Ошибка авторизации. Пожалуйста, войдите в систему'
                break;

            case 500:
                message = 'Ошибка сервера, обновите страницу и попробуйте операцию снова'
                break;

            default:
                message = err.response.data.detail
                break;
        }
    }
    return { type: err.response.status, message }
}