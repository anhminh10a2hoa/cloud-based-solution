import { ActionType } from './../interface/index';
import axios from "axios"
import { Project, SubProjectOrAsset } from "../interface"

const getUserProjects = async(): Promise<string[]> => {
  const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/projects`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY_VALUE
    }
  })
  const projects: string[] = res.data.projects
  return projects
}

const getProjectOrAssetDetail = async(projectId: string, type: "asset" | "project"): Promise<Project> => {
  const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${type}s/${projectId}`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY_VALUE
    }
  })
  const project: Project = {
    id: res.data[type].id,
    title: res.data[type].title,
    description: res.data[type].description,
    tags: res.data[type].tags,
    mediaType: res.data[type].media_type,
    isPublic: res.data[type].isPublic,
    projectId: res.data[type].project_id
  }
  return project
}

const getSubProjectOrAssetOrAssetByParentProjectId = async(parentProjectId: string, type: 'asset' | 'subproject'): Promise<SubProjectOrAsset[]> => {
  const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/projects/${parentProjectId}/assets`, {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY_VALUE
    }
  })
  if(type === 'subproject') {
    const subProjects: SubProjectOrAsset[] = res.data.subprojects.map((subProject: any) => {
      return {
        id: subProject.id,
        title: subProject.title,
        description: subProject.description,
        tags: subProject.tags,
        mediaType: subProject.media_type,
        isPublic: subProject.isPublic,
        projectId: subProject.project_id
      }
    })
    return subProjects
  }
  const assets: SubProjectOrAsset[] = res.data.assets.map((asset: any) => {
    return {
      id: asset.id,
      title: asset.title,
      description: asset.description,
      tags: asset.tags,
      mediaType: asset.media_type,
      isPublic: asset.isPublic,
      projectId: asset.project_id
    }
  })
  return assets
}

const createAssetOrSubproject = async(parentProjectId: string, title: string, description: string, type: ActionType, tags?: string[], category?: string, isPublic?: boolean): Promise<string> => {
  const typePrefix = type === 'subproject' ? 'projects' : 'assets'
  const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/${typePrefix}`, 
  type === 'subproject' ? {
    title: title,
    description: description,
    isPublic: isPublic
  } : {
    title: title,
    description: description,
    category: category,
    tags: tags,
    media_type: type,
    project_id: parentProjectId
  },
  {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY_VALUE
    }
  })
  const createdSubProjectId = res.data[type === 'subproject' ? 'project' : 'asset'].id
  await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/${typePrefix}/${createdSubProjectId}/assign`, 
  {
    to_project_id: parentProjectId
  },
  {
    headers: {
      'x-api-key': process.env.REACT_APP_API_KEY_VALUE
    }
  })
  return createdSubProjectId
}

export { getUserProjects, getProjectOrAssetDetail, getSubProjectOrAssetOrAssetByParentProjectId, createAssetOrSubproject }