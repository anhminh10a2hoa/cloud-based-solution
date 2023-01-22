import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './Assets.css'
import { Grid } from '@mui/material'
import { SubProjectOrAsset } from '../interface'
import { getSubProjectOrAssetOrAssetByParentProjectId } from '../api'
import Loading from './Loading';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import NotesIcon from '@mui/icons-material/Notes';

const Assets = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [assets, setAssets] = useState<SubProjectOrAsset[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchSubProjectOrAssets = async() => {
      if(params.projectId) {
        setIsLoading(true)
        const assets = await getSubProjectOrAssetOrAssetByParentProjectId(params.projectId, 'asset')
        setAssets(assets)
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
      <div className="assetsErrorFetching">  
        Failed to fetch the assets!
      </div>
    )
  }

  if(isLoading) {
    return <Loading size={30}/>
  }

  if(assets.length === 0) {
    return <div className="assetsEmpty">There are no assets created</div>
  }

  return (
    <div className="asset">
      <div className="assetTitle">{assets.length} RESULTS</div>
      <div className="assetList">
        <Grid container spacing={2}>
          {assets.map((sp) => {
            return (
              <Grid item xs={6} sm={4} lg={3} key={sp.id}>
                <div className="assetItem" onClick={() => navigate(`/assets/${sp.id}`)}>
                  <div className="assetFolderIcon">
                    {sp.mediaType === 'document' ? 
                      <DescriptionIcon sx={{fontSize: 14}}/> : sp.mediaType === 'placeholder' ? 
                      <ContentCopyIcon sx={{fontSize: 14}}/> : sp.mediaType === 'article' ?
                      <ArticleIcon sx={{fontSize: 14}}/> : <NotesIcon sx={{fontSize: 14}}/>
                    }
                  </div>
                  <div className="assetTextContainer">
                    <p className="assetText">{sp.mediaType}</p>
                  </div>
                </div>
                <div className="assetItemTitle">{sp.title}</div>
                <div className="assetItemType">{sp.mediaType}</div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default Assets