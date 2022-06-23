
export interface PostType {
    userId :number,
    id:number,
    title:string,
    body:string
}

export interface PostsType {
    posts : PostType[]
}

export interface PostStateType {
    posts:PostType[]
    status:string,
    error? : string | undefined
}


export interface ActionType {
    type : string,
    payload : PostType
}