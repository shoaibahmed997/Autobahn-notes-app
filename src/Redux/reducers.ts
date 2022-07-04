import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ActionType, PostStateType, PostsType, PostType } from '../Helper/interfaces'


const APIURL = "https://jsonplaceholder.typicode.com/posts"


type Post = {
    userId :number,
    id:number,
    title:string,
    body:string
}
type initialState ={
    posts :Post[]
    status:string,
    error : string
}
type postingState = {
    error :string
    status:string
}

export const initialPostState :initialState= {
    posts :[],
    status:"idle",
    error:""
}

export const FetchPosts = createAsyncThunk('/posts/fetchposts',async()=>{
    const res = await fetch(APIURL)
    return res.json()
})

export const AddnewPost = createAsyncThunk("/POST/post",async(postdata:{title:string,body:string})=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/posts",{
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify({title:postdata.title,body:postdata.body,userId:1})
      })
      return res.json()
})

export const UpdatePost = createAsyncThunk('/update/post',async(post:PostType)=>{
    const res  = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`,{
        headers:{"Content-Type":"application/json"},
        method:"PUT",
        body:JSON.stringify({id:post.id,title:post.title,body:post.body,userId:post.userId})
    })
    return res.json()
})
export const DeletePost = createAsyncThunk('/delete/post',async(id:number)=>{
    const res  = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        headers:{"Content-Type":"application/json"},
        method:"DELETE"
    })
    return res.json()
})

export const PostsSlice = createSlice({
    name:"Posts",
    initialState:initialPostState,
    reducers:{
        addpost:(state:initialState,action:PayloadAction<Post>)=>{
            // this is not required because we are using the thunk to make the actual request to the mock backend
            state.posts = [...state.posts,action.payload]
        },
        deletePost :(state:initialState,action:PayloadAction<number>)=>{
            state.posts = state.posts.filter(item=>item.id !== action.payload)
        }
    },
    extraReducers:builder=>{
        builder.addCase(FetchPosts.pending,(state:initialState)=>{
            state.status = "loading"
        })
        .addCase(FetchPosts.rejected,(state:initialState,action)=>{
            state.status  = "failed"
            state.error = action.error.message || "Something went wrong"
        })
        .addCase(FetchPosts.fulfilled,(state:initialState,action:PayloadAction<Post[]>)=>{
            state.status = 'Success'
            state.posts = action.payload
        })
        .addCase(AddnewPost.fulfilled,(state:initialState,action:PayloadAction<Post>)=>{
            //  since this is a mock backend so create-async-thunk may not be required to post data but if we were using real database the ideal way would be this one where we are using thunk to perform async actions
            state.posts.unshift(action.payload)
        })
        .addCase(DeletePost.fulfilled,(state:initialState,action:PayloadAction<number>)=>{
            //  We are using a mock api so there will be nothing in response. ideally we can refetch posts on dashboard page so the ui is consistent with backend. but here delete from the state is triggered in reducer => deletePost
        })
        .addCase(UpdatePost.fulfilled,(state:initialState,action:PayloadAction<Post>)=>{
           state.posts =  state.posts.map(item=>{
                    if (item.id === action.payload.id){
                        item = action.payload
                        return item
                    }
                    return item
            })

        })
        
    }
})

export const {deletePost} = PostsSlice.actions