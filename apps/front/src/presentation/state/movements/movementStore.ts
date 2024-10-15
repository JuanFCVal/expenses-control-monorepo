import { create } from 'zustand'
import { MovementState } from './movementStoreConfig'
import { IMovement } from '@/src/domain/entities/Movement'

const useMovementStore = create<MovementState>((set) => ({
  movements: [],
  setMovements: (movements: IMovement[]) =>
    set((state) => ({ movements: [...state.movements, ...movements] })),
}))

export default useMovementStore
