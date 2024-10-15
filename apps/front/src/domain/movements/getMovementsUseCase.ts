import { movementService } from '../../data/services/movements'
class GetMovementsUseCase {
  async execute() {
    const { data } = await movementService.getMovements()
    return data
  }
}

export const getMovementsUseCase = new GetMovementsUseCase()
