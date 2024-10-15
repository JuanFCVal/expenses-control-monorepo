import { IMovement } from '../../domain/entities/Movement'
import { api } from '../config/axiosClient'

class MovementService {
  async getMovements() {
    return api.get<IMovement[]>('api/movements')
  }
}

export const movementService = new MovementService()
