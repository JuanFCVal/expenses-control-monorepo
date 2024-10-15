export interface IMovement {
  id: number
  amount: string
  description: string
  date: Date
  worthIt: string
  createdAt: Date
  category: ICategory
}

export interface ICategory {
  id: number
  name: string
  active: boolean
  type: string
  created_at: Date
  updated_at: Date
}
