
export const GET_CLASSES = 'GET_CLASSES'
export const GET_CLASSES_WITH_SIGNATURE = 'GET_CLASSES_WITH_SIGNATURE'
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const GET_SUBCLASSES = 'GET_SUBCLASSES'

export const GET_CLASS_OBJECTS = 'GET_CLASS_OBJECTS'
export const GET_CLASS_OBJECT = 'GET_CLASS_OBJECT'
export const GET_CLASS = 'GET_CLASS'

export const GET_OBJECTS_BY_URI = 'GET_OBJECTS_BY_URI'

export const CREATE_ENTITY = 'CREATE_ENTITY'






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
    attribute_types: TAttributeType
}

export type TRelation = {
    id: number,
    labels: string[],
    params: string[],
    start_node: TClass,
    end_node: TClass,
}

export type TObjectExtended = {
    id?: number,
    object: TClass,
    class_attributes: TClass[],
    class_signature: string,
    relations: TRelation[]
}

export type TAttributeType = { [id: number]: TClass }

interface ICreateEntity {
    type: typeof CREATE_ENTITY,
    payload: TClass
}

interface IGetClasses {
    type: typeof GET_CLASSES,
    payload: TClass[]
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
    IGetClass | IGetClassesWithSignature | IGetObjectsByUri | ICreateEntity