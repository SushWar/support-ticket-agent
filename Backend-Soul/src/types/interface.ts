export interface CreateAgent {
  name: string
  email: string
  phone: string
  description: string
}

export interface CreateTicket {
  topic: string
  description: string
  type: string
  severity: string
}

export interface FilterQuery {
  status?: string
  assigned?: string
  severity?: string
  type?: string
  [key: string]: any // Index signature
}

export interface SortQuery {
  sortType: string
  sortOrder: boolean
}
