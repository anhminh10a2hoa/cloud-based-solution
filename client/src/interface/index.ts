export interface Project {
  id: string,
  title: string,
  description: string,
  tags: string[],
  mediaType: string,
  isPublic: boolean,
  projectId: string | null,
}

export interface SubProjectOrAsset extends Project {}

export type ActionType = "placeholder" | "subproject" | "article"

export type AlertType = "success" | "error" | "warning" | "info"