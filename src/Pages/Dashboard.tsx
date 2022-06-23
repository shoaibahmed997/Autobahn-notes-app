import { CircularProgress, Grid } from '@mui/material'
import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PostItem from '../Components/PostItem'
import { PostsType } from '../Helper/interfaces'
import { useAppDispatch, useAppSelector } from '../Hooks/reduxhooks'
import useGetError from '../Hooks/useGetError'
import useGetPosts from '../Hooks/useGetPosts'
import useGetStatus from '../Hooks/useGetStatus'
import { FetchPosts } from '../Redux/reducers'

const Dashboard: React.FC = () => {
  let dispatch = useAppDispatch()
  let navigate = useNavigate()
  const posts = useGetPosts()
  const status = useGetStatus()
  const error = useGetError()

  const handleNavigation:(id:number)=>void = (id)=>{
      navigate(`/posts/${id}`)
  }
  useEffect(()=>{
    if (status === 'idle'){
      dispatch(FetchPosts())
    }
    
  },[])

  if(status === 'loading'){
    return <CircularProgress color='success' />
  }

  if (status === 'failed'){
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      
<Grid sx={{padding:2}}  container spacing={4}>
    {posts.map(item=>(
  <Grid item xs={12} md={8} lg={4} xl={2} key={item.id}  >
    <div className='postitems' onClick={()=>handleNavigation(item.id)} >
      <PostItem title={item.title}  />
    </div>
  </Grid>
    ))}
</Grid>
    </div>
  )
}

export default Dashboard