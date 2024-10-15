import { IMovement } from '@/src/domain/entities/Movement'

export interface MovementState {
  movements: IMovement[]
  setMovements: (movements: IMovement[]) => void
}
