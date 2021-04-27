
export const GET_CLASSES = 'GET_CLASSES'
export const UPDATE_CLASS = 'UPDATE_CLASS'
export const GET_SUBCLASSES = 'GET_SUBCLASSES'

export const GET_CLASS_OBJECTS = 'GET_CLASS_OBJECTS'
export const GET_CLASS_OBJECT = 'GET_CLASS_OBJECT'




export type TClass = {
    id?: number
    labels: string[]
    params: string[]
    signature: string
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
interface IGetClassObject {
    type: typeof GET_CLASS_OBJECT,
    payload: TClass
}
interface IUpdateClass {
    type: typeof UPDATE_CLASS,
    payload: TClass
}

export type TClassDispatchTypes = IGetClasses | IGetSubClasses | IGetClassObjects | IUpdateClass | IGetClassObject