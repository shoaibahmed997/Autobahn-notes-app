// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

//  mock fetch specific-->

// handler setup
const getposts = rest.get("https://jsonplaceholder.typicode.com/posts",(req,res,ctx)=>{
    return res(
        ctx.status(200),
        ctx.json([{id:1,userId:1,title:"hello world",body:"hola hola"}])
        )
    })
const AddnewPost = rest.post("https://jsonplaceholder.typicode.com/posts",(req,res,ctx)=>{
    return res(
        ctx.status(200),
        ctx.json([{id:1,userId:1,title:"Hello",body:"Hello World"}])
    )
})

// const UpdatePost = rest.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,(req,res,ctx)=>{
const UpdatePost = rest.put(`https://jsonplaceholder.typicode.com/posts/1`,(req,res,ctx)=>{
    return res(
        ctx.status(200),
        ctx.json([{id:1,userId:1,title:"Hello",body:"Hello World"}])
    )
})
    
const handler = [getposts,AddnewPost,UpdatePost]
// server setup
const server = setupServer(...handler)


beforeAll(()=>server.listen())
afterEach(()=>server.resetHandlers())
afterAll(()=>server.close())

