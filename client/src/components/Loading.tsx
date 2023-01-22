import React from 'react'
import "./Loading.css"
import { CircularProgress } from '@mui/material'

type LoadingProps = {
  size: number
}

const Loading = ({ size }: LoadingProps) => {
  return (
    <div className='loading'>
      <CircularProgress size={size}/>
    </div>
  )
}

export default Loading