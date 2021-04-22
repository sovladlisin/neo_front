
export const GET_CLASSES = 'GET_CLASSES'
export const GET_SUBCLASSES = 'GET_SUBCLASSES'
export const GET_CLASS_OBJECTS = 'GET_CLASS_OBJECTS'




export type TClass = {
    id?: number,
    labels: string[],
    params: string[]
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

export type TClassDispatchTypes = IGetClasses | IGetSubClasses | IGetClassObjects