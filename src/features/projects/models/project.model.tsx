export interface Project {
  id: string
  name: string
  description?: string
  color?: string
  icon?: string
  
  status: 'active' | 'archived'
  ownerId: string

  createdAt: Date
  updatedAt: Date
}