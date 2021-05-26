import { TEntity, TMarkup } from "../../workspace/types"

export const GET_CLASSES = 'GET_CLASSES'
export const GET_ALL_CLASSES = 'GET_ALL_CLASSES'
export const GET_CLASSES_WITH_SIGNATURE = 'GET_CLASSES_WITH_SIGNATURE'
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const GET_SUBCLASSES = 'GET_SUBCLASSES'

export const GET_CLASS_OBJECTS = 'GET_CLASS_OBJECTS'
export const GET_CLASS_OBJECT = 'GET_CLASS_OBJECT'
export const GET_CLASS = 'GET_CLASS'
export const OBJECT_IS_LOADING = 'OBJECT_IS_LOADING'

export const GET_OBJECTS_BY_URI = 'GET_OBJECTS_BY_URI'
export const LOADING_OBJECTS_BY_URI = 'LOADING_OBJECTS_BY_URI'

export const CREATE_ENTITY = 'CREATE_ENTITY'

export const GET_DOMAIN_ONTOLOGIES = 'GET_DOMAIN_ONTOLOGIES'
export const DELETE_DOMAIN_ONTOLOGY = 'DELETE_DOMAIN_ONTOLOGY'

export const CLASS_LOADING = "CLASS_LOADING"
export const CLASS_FULL_SIGNATURE_LOADING = "CLASS_FULL_SIGNATURE_LOADING"

export const GET_CLASS_FULL_SIGNATURE = "GET_CLASS_FULL_SIGNATURE"


export const GET_SEARCH = "GET_SEARCH"
export const IS_SEARCHING = "IS_SEARCHING"




export type TClass = {
    id?: number
    labels: string[]
    params: string[]
    signature: string
}

export type TClassExtended = {
    id: number,
    class: TClass,
    attributes: TClass[],
    objects: TClass[],
    types: TAttributeType,
    attributes_obj: TClass[],
    attribute_types: TAttributeType,
    texts?: TClass[],
    entities?: TEntity[]
}

export type TRelation = {
    id: number,
    labels: string[],
    params: string[],
    start_node: TClass,
    end_node: TClass,
    start_class_uri?: string,
    end_class_uri?: string
}

export type TObjectExtended = {
    id?: number,
    object: TClass,
    class_attributes: TClass[],
    class_signature: string,
    relations: TRelation[],
    fileLink?: string,
    texts?: TClass[],
    entities?: TEntity[],
}

export type TClassFullSignature = {
    uri: string,
    class_node: TClass,
    class_signature: {},
    parents_signature: {}[],
    type_nodes: TClass[]
}

export type TAttributeType = { [id: number]: TClass }

interface ISetObjectIsLoading {
    type: typeof OBJECT_IS_LOADING,
    payload: boolean
}

interface IGetSearch {
    type: typeof GET_SEARCH,
    payload: { domain: string, result: TClass[] }
}
interface IIsSearching {
    type: typeof IS_SEARCHING,
    payload: boolean
}
interface IDeleteDomainOntology {
    type: typeof DELETE_DOMAIN_ONTOLOGY,
    payload: string
}
interface IGetClassFullSignature {
    type: typeof GET_CLASS_FULL_SIGNATURE,
    payload: TClassFullSignature
}
interface IClassFullSignatureLoading {
    type: typeof CLASS_FULL_SIGNATURE_LOADING,
    payload: boolean
}

interface IGetDomainOntologies {
    type: typeof GET_DOMAIN_ONTOLOGIES,
    payload: TClass[]
}
interface ISetClassLoading {
    type: typeof CLASS_LOADING,
    payload: number
}
interface ISetLoadingObjectByUri {
    type: typeof LOADING_OBJECTS_BY_URI,
    payload: boolean
}
interface ICreateEntity {
    type: typeof CREATE_ENTITY,
    payload: TClass
}
interface IGetClasses {
    type: typeof GET_CLASSES,
    payload: TClass[]
}
interface IGetAllClasses {
    type: typeof GET_ALL_CLASSES,
    payload: { domain: string, classes: TClass[] }
}
interface IGetSubClasses {
    type: typeof GET_SUBCLASSES,
    payload: { id: number, classes: TClass[] }
}
interface IGetClassObjects {
    type: typeof GET_CLASS_OBJECTS,
    payload: { id: number, objects: TClass[] }
}
interface IGetClass {
    type: typeof GET_CLASS,
    payload: TClassExtended
}
interface IGetClassObject {
    type: typeof GET_CLASS_OBJECT,
    payload: TObjectExtended
}
interface IUpdateClass {
    type: typeof UPDATE_CLASS,
    payload: TClass
}
interface IGetClassesWithSignature {
    type: typeof GET_CLASSES_WITH_SIGNATURE,
    payload: TClass[]
}
interface IGetObjectsByUri {
    type: typeof GET_OBJECTS_BY_URI,
    payload: { uri: string, objects: TClass[] }
}

export type TClassDispatchTypes = IGetClasses | IGetSubClasses | IGetClassObjects | IUpdateClass | IGetClassObject |
    IGetClass | IGetClassesWithSignature | IGetObjectsByUri | ICreateEntity | IGetAllClasses | IGetDomainOntologies |
    ISetClassLoading | ISetLoadingObjectByUri | IGetClassFullSignature | IClassFullSignatureLoading | IGetSearch | IIsSearching | IDeleteDomainOntology |
    ISetObjectIsLoading