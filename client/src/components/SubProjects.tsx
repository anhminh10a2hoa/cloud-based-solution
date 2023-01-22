import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './SubProjects.css'
import { Grid } from '@mui/material'
import { SubProjectOrAsset } from '../interface'
import { getSubProjectOrAssetOrAssetByParentProjectId } from '../api'
import Loading from './Loading';
import FolderIcon from '@mui/icons-material/Folder';

const SubProjectOrAssets = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [subProjects, setSubProjectOrAssets] = useState<SubProjectOrAsset[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchSubProjectOrAssets = async() => {
      if(params.projectId) {
        setIsLoading(true)
        const subProjects = await getSubProjectOrAssetOrAssetByParentProjectId(params.projectId, 'subproject')
        setSubProjectOrAssets(subProjects)
        setIsLoading(false)
      }
    }

    fetchSubProjectOrAssets().catch((_) => {
      setIsError(true)
      setIsLoading(false)
    })
  }, [params.projectId])

  if(isError) {
    return (
      <div className="subProjectsErrorFetching">  
        Failed to fetch the sub projects!
      </div>
    )
  }

  if(isLoading) {
    return <Loading size={30}/>
  }

  if(subProjects.length === 0) {
    return <div className="subProjectsEmpty">There are no sub project created</div>
  }

  return (
    <div className="subProject">
      <div className="subProjectTitle">SUBPROJECTS</div>
      <div className="subProjectList">
        <Grid container spacing={2}>
          {subProjects.map((sp) => {
            return (
              <Grid item xs={6} sm={4} lg={3} key={sp.id}>
                <div className="subProjectItem" onClick={() => navigate(`/${sp.id}`)}>
                  <div className="subProjectFolderIcon"><FolderIcon sx={{fontSize: 14}}/></div>
                  <div className="subProjectTextContainer">
                    <p className="subProjectText">Project</p>
                  </div>
                </div>
                <div className="subProjectItemTitle">{sp.title}</div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default SubProjectOrAssets