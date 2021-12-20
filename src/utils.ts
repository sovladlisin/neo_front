import { useEffect, useState } from "react"
import { TAlert } from "./actions/alerts/types"
import { TClass, TConnectedVisualItem, TObjectExtended } from "./actions/ontology/classes/types"
export const HOST = window.location.host.includes('local') ? "http://" + window.location.host + '/' : "https://" + window.location.host + '/'

export const SERVER_DOMAIN = window.location.host.includes('local') ? 'http://127.0.0.1:8000/' : 'https://neoback.herokuapp.com/'
export const SERVER_URL = window.location.host.includes('local') ? 'http://127.0.0.1:8000/api/' : 'https://neoback.herokuapp.com/api/'
export const SERVER_URL_AUTH = window.location.host.includes('local') ? 'http://127.0.0.1:8000/auth/' : 'https://neoback.herokuapp.com/auth/'

// export const SERVER_DOMAIN = 'https://neoback.herokuapp.com/'
// export const SERVER_URL = 'https://neoback.herokuapp.com/api/'
// export const SERVER_URL_AUTH = 'https://neoback.herokuapp.com/auth/'


export const LABEL = "http://www.w3.org/2000/01/rdf-schema#label"
export const OBJECT_PROPERTY = "http://www.w3.org/2002/07/owl#ObjectProperty"
export const NAMED_IND = "http://www.w3.org/2002/07/owl#NamedIndividual"

export const PERSON_URI = "http://erlangen-crm.org/current/E21_Person"
export const PLACE_URI = "http://erlangen-crm.org/current/E53_Place"
export const CORPUS_URI = "http://erlangen-crm.org/current/F74_Corpus"
export const LING_OBJECT_URI = "http://erlangen-crm.org/current/E33_Linguistic_Object"
export const VISUAL_ITEM_URI = "http://erlangen-crm.org/current/E36_Visual_Item"
export const LANGUAGE_URI = 'http://erlangen-crm.org/current/E56_Language'
export const GENRE_URI = 'http://erlangen-crm.org/current/F62_Genre'

export const ACTOR_URI = 'http://erlangen-crm.org/current/E21_Person'

export const TEXT_TYPE = "http://erlangen-crm.org/current/F60_Text_Type"
export const IMAGE_TYPE = "http://erlangen-crm.org/current/F61_Image_Type"
export const VIDEO_TYPE = "http://erlangen-crm.org/current/F58_Video_Type"

export const DIGITAL_CARRIER_URI = "http://erlangen-crm.org/current/F23_Digital_Carrier"

export const NOTE_URI = "http://erlangen-crm.org/current/P3_has_note"

export const CLASS = "http://www.w3.org/2002/07/owl#Class"
export const SUB_CLASS_OF = "http://www.w3.org/2000/01/rdf-schema#subClassOf"

export const DOMAIN_ONTOLOGY = "DomainOntology"

export const RDF_TYPE = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"


export const FIRST_NAME = 'http://xmlns.com/foaf/0.1/firstName'
export const LAST_NAME = 'http://xmlns.com/foaf/0.1/lastName'
export const MID_NAME = 'http://erlangen-crm.org/current/midName'
export const INITIALS = 'http://erlangen-crm.org/current/initials'

export const TITLE_URI = 'http://dbpedia.org/ontology/title'
export const ORIGINAL_TITLE_URI = 'http://dbpedia.org/ontology/originalTitle'
export const TEXT_TRANSATED_URI = 'http://erlangen-crm.org/current/R20_translated'
export const TEXT_PERFORMED_URI = 'http://erlangen-crm.org/current/R18_performed'
export const TEXT_SPEECH_URI = 'http://erlangen-crm.org/current/R74_has_speech'
export const TEXT_IDK_URI = 'http://erlangen-crm.org/current/R22_translation_redacted'
export const TEXT_DECRYPTED_URI = 'http://erlangen-crm.org/current/R19_decrypted'
export const TEXT_REDACTED_URI = 'http://erlangen-crm.org/current/R23_redacted'
export const TEXT_COLLECTED_URI = 'http://erlangen-crm.org/current/R17_collected'
export const TEXT_LANGUAGE_URI = 'http://erlangen-crm.org/current/P72_has_language'
export const TEXT_NOTATED_URI = 'http://erlangen-crm.org/current/R24_notated'
export const TEXT_COMMENTED_URI = 'http://erlangen-crm.org/current/R21_commented'
export const TEXT_DIALECT_URI = 'http://erlangen-crm.org/current/R73_has_dialect'
export const TEXT_TYPE_URI = 'http://erlangen-crm.org/current/P2_has_type'
export const TEXT_I_URI = 'http://erlangen-crm.org/current/P73_has_translation'
export const TEXT_D_URI = 'http://erlangen-crm.org/current/R_131_has_extra_materials'
export const TEXT_COPRUS_URI = 'http://erlangen-crm.org/current/P165_incorporates'


export const EVENT_URI = 'http://erlangen-crm.org/current/F8_Preparing_to_publish'
// images
import logo from './static/images/f-logo.jpg'
export const LOGO = logo
import logo2 from './static/images/f-logo-2.jpg'
export const LOGO2 = logo2
import home1 from './static/images/home-1.png'
export const HOME_1 = home1
import corpus1 from './static/images/corpus-1.png'
export const CORPUS_1 = corpus1
import news1 from './static/images/news-placeholder.png'
export const NEWS_1 = news1
import account1 from './static/images/account.png'
export const ACCOUNT_1 = account1

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

export const makeId = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const getImage = (node: TObjectExtended): string => {
    if (node === null) return ACCOUNT_1
    if (node.resources.length > 0) {
        const found = node.resources.filter(r => ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type))
        if (found.length > 0) return SERVER_DOMAIN.slice(0, -1) + found.pop().file.source
    }
    return ACCOUNT_1
}
export const getNote = (node: TClass): string => {
    if (node[NOTE_URI]) return node[NOTE_URI]
    return 'Описание отсутствует...'
}
export const getImageFile = (node: TObjectExtended): TConnectedVisualItem => {
    if (node.resources.length > 0) {
        const found = node.resources.filter(r => ['png', 'jpg', 'jpeg', 'pdf'].includes(r.file.type))
        if (found.length > 0) return found.pop()
    }
    return null
}

export const removeDuplFromNodeList = (list: TClass[]) => {

    var l = {}
    list.filter(i => i).map(i => {
        l[i.id] = i
    })
    return Object.keys(l).map(i => l[i])

}

export const getActorName = (node: TClass, short = false) => {
    if (short) return node[INITIALS] + ' ' + node[LAST_NAME]
    return node[INITIALS] + ' ' + node[LAST_NAME] + ' ' + node[FIRST_NAME] + ' ' + node[MID_NAME]
}

export const getName = (node: TClass, lang = 1) => {
    if (node === null) return 'Не указано'
    if (node['uri'] === NOTE_URI) return 'Описание'

    if (node.labels.includes(ACTOR_URI)) {
        return node[INITIALS] + ' ' + node[LAST_NAME]
    }
    const lang_list = { 0: 'en', 1: 'ru' }
    const language = lang_list[lang]

    const params = node.params
    if (params.includes('http://dbpedia.org/ontology/title')) return node['http://dbpedia.org/ontology/title']
    if (params.includes('name')) return node['name']
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
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const removeDuplFromStringList = (a: string[]) => {
    var t = {}
    a.map(i => {
        t[i] = 1
    })
    return Object.keys(t)
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