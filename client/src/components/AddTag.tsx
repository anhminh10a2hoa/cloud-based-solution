import React from 'react';
import './AddTag.css'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AlertType } from '../interface';

type AddTagProps = {
  tags: string[],
  handleAlert: (open: boolean, type: AlertType, msg: string) => void
}

const AddTag: React.FC<AddTagProps> = ({ tags, handleAlert }: AddTagProps) => {
  return (
    <div className="addTag">
      {tags.map((tag) => 
        <Button variant="contained" className="addTagButton" key={tag}>{tag}</Button>
      )}
      <Button 
        variant="contained" 
        className="addTagButton" 
        startIcon={<AddIcon />} 
        onClick={() => handleAlert(true, "warning", "Adding a new card is currently not supported!")}
      >
        Add Tag
      </Button>
    </div>
  )
}

export default AddTag;