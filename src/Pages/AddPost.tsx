import React, { useState } from 'react'
import { Button, CircularProgress, Paper, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../Hooks/reduxhooks'
import { AddnewPost } from '../Redux/reducers'
import { Alert,Snackbar} from '@mui/material'



const AddPost = () => {
  let [addStatus,setAddstatus] = useState<string>("idle")
  const {reset,register,handleSubmit,formState:{errors}} = useForm()
  let dispatch = useAppDispatch()

  //  state for the snackbar
  const [open, setOpen] = useState<boolean>(false);

// close function for the snackbar
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  

  const postdata:(title:string,body:string)=>void = (title:string,body:string)=>{
      try {
        dispatch(AddnewPost({title,body})).unwrap()
        reset()
        setAddstatus(("success"))
      } catch (error) {
        console.log(error)
        setAddstatus(("error"))
      }
        setOpen((true))
    
  }

  return (
    <div className='AddPost'>
        <Paper elevation={8}>
      <h1>Add a New Post</h1>
      <form onSubmit={handleSubmit((data)=>{
          postdata(data.title,data.body)
      })} className='addpost-form'>
          <TextField {...register("title",{required:"Title is Required",minLength:{value:3,message:"Minimum characters to be required are 3"}})} id="outlined-basic" label="Title" variant="outlined" helperText={errors.title?.message} />
          <TextField multiline rows={3} {...register("body",{required:"Body is Required",minLength:{value:5,message:"Minimum characters to be required are 5"}})} id="outlined-basic" label="Body" variant="outlined" helperText={errors.body?.message} />
          
          {addStatus === 'loading' ? <CircularProgress /> :
          <Button type="submit" variant="contained">Add Post</Button>
          }
      </form>
        </Paper>
        {
          addStatus === 'success' && 
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Post Added Successfully
          </Alert>
        </Snackbar> }
        { addStatus === 'error' && 
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Failed to add Post
          </Alert>
        </Snackbar>
        }
    </div>
  )
}

export default AddPost