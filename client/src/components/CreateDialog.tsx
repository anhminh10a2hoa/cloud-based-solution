import React from 'react'
import './CreateDialog.css'
import { TextField, MenuItem, Select, SelectChangeEvent, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Switch } from '@mui/material'
import { ActionType, AlertType } from '../interface';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import { useParams, useNavigate } from 'react-router-dom';
import { createAssetOrSubproject } from '../api';

type CreateDialogProps = {
  open: boolean,
  handleClose: () => void,
  type: ActionType,
  handleAlert: (open: boolean, type: AlertType, msg: string) => void
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateDialog = ({ open, handleClose, type, handleAlert }: CreateDialogProps) => {
  const tags = ['furniture', 'mediapocket', 'monitor', 'sample', 'test']
  const categories = ["Select category", "sample", "sample asset"]
  const params = useParams()
  const navigate = useNavigate()
  const [categorySelected, setCategorySelected] = React.useState<string>('');
  const [tagSelected, setTagSelected] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [isPublic, setIsPublic] = React.useState<boolean>(true);

  const handleChange = (event: SelectChangeEvent) => {
    setCategorySelected(event.target.value as string);
  };

  const handleTagChange = (tag: string) => {
    if(tagSelected.includes(tag)) {
      const newTags = tagSelected.filter(item => item !== tag)
      setTagSelected(newTags)
    } else {
      setTagSelected([...tagSelected, tag])
    }
  }

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const handleCreate = async() => {
    if(params.projectId && title && description) {
      try {
        if(type === 'subproject') {
          const newSubProjectId = await createAssetOrSubproject(params.projectId, title, description, type, undefined, undefined, isPublic)
          handleAlert(true, "success", `Create ${type} successfully`)
          navigate(`/${newSubProjectId}`)
        } else {
          const newAssetId = await createAssetOrSubproject(params.projectId, title, description, type, tagSelected, categorySelected)
          handleAlert(true, "success", `Create ${type} successfully`)
          navigate(`/assets/${newAssetId}`)
        }
        handleClose()
      } catch (err) {
        handleAlert(true, "error", `Can not create a new ${type}`)
      }
    }
  }

  const handleCloseAndCleanData = () => {
    handleClose()
    setTitle("")
    setDescription("")
    setCategorySelected("")
    setTagSelected([])
    setIsPublic(true)
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseAndCleanData}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ width: 600 }}>CREATE A {type.toUpperCase()}</DialogTitle>
      <DialogContent>
        <div className="inputContainer">
          <TextField
            id="standard-search"
            label={type === 'subproject' ? "Project name" : "Title"}
            type="search"
            variant="standard"
            fullWidth
            value={title || ""}
            onChange={handleTitleInputChange}
            required
          />
        </div>
        <div className="inputContainer">
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            value={description || ""}
            onChange={handleDescriptionInputChange}
            required
          />
        </div>
        {(type === 'article' || type === 'placeholder') && (
          <>
            <div className="inputContainer">
              <div className="createDialogInputLabel">Category</div>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categorySelected || categories[0]}
                onChange={handleChange}
                variant="standard"
                fullWidth
              >
                {categories.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
              </Select>
            </div>
            <div className="inputContainer">
              <div className="createDialogInputLabel">Tags</div>
              <div className="createDialogTagsContainer">
                {tags.map((tag) => <Button 
                    key={tag}
                    className="createDialogTagItem" 
                    variant={tagSelected.includes(tag) ? "contained" : "outlined"}
                    onClick={() => handleTagChange(tag)}
                    startIcon={tagSelected.includes(tag) ? <RemoveIcon /> : <AddIcon />}>
                      {tag}
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
        {type === 'subproject' && (
          <>
            <div className="inputContainer">
              <div className="createDialogInputLabel">Public<Switch checked={isPublic} 
              onChange={(e, c) => setIsPublic(c)}/></div>
            </div>
            <div className="createDialogPublicWarning">
              <InfoIcon color="info"/>
              If project is public then all users can see the project and the assets.
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button className="createDialogActionButton" onClick={handleCloseAndCleanData}>Close</Button>
        <Button className="createDialogActionButton" onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateDialog;