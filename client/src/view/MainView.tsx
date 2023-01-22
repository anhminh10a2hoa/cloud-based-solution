import React, { useEffect, useState } from 'react';
import './MainView.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProjects, getProjectOrAssetDetail } from '../api';
import AddTag from '../components/AddTag'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { ActionType, AlertType, Project } from '../interface';
import Loading from '../components/Loading';
import UtilsBar from '../components/UtilsBar';
import SearchBar from '../components/SearchBar';
import SubProjects from '../components/SubProjects';
import { Divider } from '@mui/material';
import Title from '../components/Title';
import Assets from '../components/Assets';
import CreateDialog from '../components/CreateDialog';
import CustomizedSnackbar from '../components/CustomizedSnackbar';

const MainView = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [currentProject, setCurrentProject] = useState<Project>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [openCreateDialog, setOpenCreateDialog] = React.useState<{open: boolean, type: ActionType}>({open: false, type: "subproject" });
  const [openAlert, setOpenAlert] = React.useState<{open: boolean, type: AlertType, msg: string}>({open: false, type: "success", msg: "" });

  useEffect(() => {
    const fetchProject = async() => {
      setIsLoading(true)
      let id = params.projectId || params.assetId;
      if(!id) {
        const projects = await getUserProjects()
        navigate(`/${projects[0]}`)
      }
      if(id) {
        const project = await getProjectOrAssetDetail(id, params.assetId ? "asset" : "project")
        setCurrentProject(project)
        setIsLoading(false)
      }
    }
    fetchProject().catch((_) => {
      setIsError(true)
      setIsLoading(false)
    })
  }, [navigate, params.assetId, params.projectId])

  const handleOpen = (type: ActionType) => {
    setOpenCreateDialog({open: true, type: type});
  };

  const handleClose = () => {
    setOpenCreateDialog({open: false, type: "subproject"});
  };

  const handleAlert = (open: boolean, type: AlertType, msg: string) => {
    setOpenAlert({open: open, type: type, msg: msg})
  }

  if(isError) {
    return (
      <div className="mainViewErrorFetching">
        <div className="mainViewErrorIcon">
          <ReportProblemIcon />
        </div>
        <div className="mainViewErrorText">  
          Failed to fetch the project with id {params.projectId}!
        </div>
      </div>
    )
  }

  return (
    <div className="mainView">
      <AddTag tags={currentProject?.tags || []} handleAlert={handleAlert}/>
      {isLoading ? <Loading size={40}/> : <Title currentProjectTitle={currentProject?.title || ""} parentProjectId={currentProject?.projectId || null}/>}
      {params.projectId ?
        <>
          <UtilsBar handleOpen={handleOpen} handleAlert={handleAlert}/>
          <SubProjects />
          <Divider className="mainViewDivider"/>
          <SearchBar />
          <Assets />
          <CreateDialog open={openCreateDialog.open} type={openCreateDialog.type} handleClose={handleClose} handleAlert={handleAlert}/>
        </> : <div className="mainViewAssetView">This is an asset view! Not implemented yet</div>
      }
      <CustomizedSnackbar handleAlert={handleAlert} openAlert={openAlert} />
    </div>
  );
}

export default MainView;
