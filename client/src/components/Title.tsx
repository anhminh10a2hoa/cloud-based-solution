import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Title.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { getProjectOrAssetDetail } from '../api';
import { Project } from '../interface';
import { CircularProgress } from '@mui/material';

type TitleProps = {
  currentProjectTitle: string,
  parentProjectId: string | null,
}

const Title = ({ currentProjectTitle, parentProjectId }: TitleProps) => {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parentProjectIdList, setParentProjectIdList] = useState<{id: string, title: string}[]>([])

  useEffect(() => {
    const fetchParentProjectId = async() => {
      if(parentProjectId) {
        setIsLoading(true)
        let pProjectId: string | null = parentProjectId
        let pProjectListId: {id: string, title: string}[] = []
        while(pProjectId) {
          const project = await getProjectOrAssetDetail(pProjectId, "project") as Project
          pProjectListId.push({id: pProjectId, title: project.title})
          if(project.projectId) {
            pProjectId = project.projectId
          } else {
            pProjectId = null
          }
        }
        setParentProjectIdList(pProjectListId)
        setIsLoading(false)
      }
    }
    fetchParentProjectId()
  }, [params.assetId, parentProjectId])

  if(isLoading) {
    return <CircularProgress size={25}/>
  }

  return (
    <div className="titleContainer">
      {parentProjectIdList.reverse().map((prj) => {
        return (
          <React.Fragment key={prj.id}>
            <div className="title" onClick={() => navigate(`/${prj.id}`)}>{prj.title}</div>
            <div className="titleDivider">/</div>
          </React.Fragment>
        )
      })}
      <div className="title">{currentProjectTitle}</div>
      <StarOutlineIcon className="titleIcon"/>
    </div>
  )
}

export default Title;