import React from 'react'
import { TextField,Button,Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams,useNavigate } from 'react-router-dom'
import useGetPostById from '../Hooks/useGetPostById'
import { useAppDispatch } from '../Hooks/reduxhooks'
import { UpdatePost as updateAction } from '../Redux/reducers'


const UpdatePost:React.FC = () => {
    const {id} = useParams()
    const post = useGetPostById(Number(id))
    let navigate = useNavigate()
    const {register,reset,formState:{errors},handleSubmit} = useForm({
        defaultValues:{
            title:post?.title,
            body:post?.body,
        }
    })
    let dispatch = useAppDispatch()
    const PatchData:(title:string,body:string)=>void = (title:string,body:string)=>{
        try {
            dispatch(updateAction({title,body,userId:post.userId,id:post.id})).unwrap()
            reset()
            navigate('/dashboard')
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='AddPost'>
        <Paper elevation={8}>
        <h1>Update Post</h1>
      <form onSubmit={handleSubmit((data)=>{
          PatchData(data.title,data.body)
      })} className='addpost-form'>
          <TextField {...register("title",{required:"Title is Required",minLength:{value:3,message:"Minimum characters to be required are 3"}})} id="outlined-basic-title" label="Title" variant="outlined" helperText={errors.title?.message} />
          <TextField multiline rows={3} {...register("body",{required:"Body is Required",minLength:{value:5,message:"Minimum characters to be required are 5"}})} id="outlined-basic-body" label="Body" variant="outlined" helperText={errors.body?.message} />
          
          <Button type="submit" variant="contained">Update</Button>
          
      </form>
        </Paper>
        </div>
  )
}

export default UpdatePost