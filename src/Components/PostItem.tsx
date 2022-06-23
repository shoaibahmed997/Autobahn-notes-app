import { Paper } from '@mui/material'
import React from 'react'
import { PostType } from '../Helper/interfaces'

type Props ={
    title :string
}

const PostItem:React.FC<Props> = ({title}) => {
  return (<>
    <Paper sx={{height:50,textAlign:'center',padding:5,overflow:'hidden'}} elevation={8}>{title}</Paper>
  </>
  )
}

export default PostItem