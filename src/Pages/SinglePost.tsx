import { Button, CircularProgress, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../Hooks/reduxhooks'
import useGetPostById from '../Hooks/useGetPostById'
import useGetStatus from '../Hooks/useGetStatus'
import { deletePost, FetchPosts } from '../Redux/reducers'

const SinglePost:React.FC = () => {
    const {id} = useParams()
    const postid = Number(id)
    const status = useGetStatus()
    const post = useGetPostById(postid)
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    useEffect(()=>{
        if (status === "idle"){
            dispatch(FetchPosts())
        }
    },[])

    if (status==='loading'|| status === 'idle'){
        return <CircularProgress color="success" />
    }


  return (
    <div className='singlepost'>
        <div className='container'>
                <Paper sx={{height:'80vh',margin:5,padding:2,overflow:"scroll"}} elevation={8}>
                    <Button onClick={()=>navigate('/dashboard')} variant="contained">Back</Button>
                    <Button onClick={()=>navigate(`/update/${post.id}`)} color='secondary' variant="contained">Update</Button>
                    <Button onClick={()=>{dispatch(deletePost(post.id));navigate('/dashboard')}} color='error' variant="contained">Delete</Button>
                    <div style={{padding:5}}>
                        <p>Post-id:{post.id}</p>
                        <p>Posted by:UserId-{post.userId}</p>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                </Paper>
        </div>

    </div>
  )
}

export default SinglePost