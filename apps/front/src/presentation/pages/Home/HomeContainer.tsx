import { useEffect } from 'react';
import { getMovementsUseCase } from '../../../domain/movements/getMovementsUseCase';
import useMovementStore from '../../state/movements/movementStore';
import { Home } from './Home';

const HomeContainer = () => {
    const { setMovements } = useMovementStore()
    const fetchMovements = async () => {
        const currentMovements = await getMovementsUseCase.execute()
        console.log(currentMovements)
        setMovements(currentMovements)
    }

    useEffect(() => {
        fetchMovements()
    }, [])

    return (
        <Home />
    )
}

export default HomeContainer