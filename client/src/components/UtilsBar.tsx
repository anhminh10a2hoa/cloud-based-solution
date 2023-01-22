import React from 'react'
import "./UtilsBar.css"
import { Button, Divider, Menu, MenuItem } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArticleIcon from '@mui/icons-material/Article';
import { ActionType, AlertType } from '../interface';

type UtilsBarProps = {
  handleOpen: (type: ActionType) => void,
  handleAlert: (open: boolean, type: AlertType, msg: string) => void
}

const UtilsBar = ({ handleOpen, handleAlert }: UtilsBarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="utilsBar">
        <Button 
          variant="contained" 
          className="utilsBarButton utilsBarUploadButton" 
          startIcon={<UploadIcon />}
          onClick={() => handleAlert(true, "warning", "Uploading file is currently not supported!")}
        >
          Upload
        </Button>
        <Button 
          className="utilsBarButton utilsBarCreatButton" 
          startIcon={<AddIcon />}
          onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          Create
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem className="utilsBarMenuItem" onClick={() => {
            handleOpen("placeholder") 
            handleClose()
          }}>
            <ContentCopyIcon sx={{fontSize: 14, marginRight: 1}}/>Create a placeholder
          </MenuItem>
          <MenuItem className="utilsBarMenuItem" onClick={() => {
            handleOpen("subproject") 
            handleClose()
          }}>
            <FolderIcon sx={{fontSize: 14, marginRight: 1}}/>Create a subproject
          </MenuItem>
          <MenuItem className="utilsBarMenuItem" onClick={() => {
            handleOpen("article") 
            handleClose()
          }}>
            <ArticleIcon sx={{fontSize: 14, marginRight: 1}}/>Create an article
          </MenuItem>
        </Menu>
      </div>
      <Divider className="utilsBarDivider"/>
    </>
  )
}

export default UtilsBar