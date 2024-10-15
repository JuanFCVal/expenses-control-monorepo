export interface ICategory {
  id: number
  name: string
  active: boolean
  type: CategoryType
  created_at: Date
  updated_at: Date
  children?: ICategory[]
}

export enum CategoryType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  SAVINGS = 'SAVINGS',
  INVESTMENT = 'INVESTMENT',
}
