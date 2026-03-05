export interface Project {
  id: string
  name: string
  description?: string

  status: 'active' | 'archived'
  ownerId: string

  createdAt: Date
  updatedAt: Date
}