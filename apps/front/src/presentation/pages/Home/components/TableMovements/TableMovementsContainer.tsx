import { ColumnDef } from '@tanstack/react-table';
import TableMovements from './TableMovements'
import { IMovementTable } from './TableMovementsConfig';
import useMovementStore from '../../../../state/movements/movementStore';

const TableMovementsContainer = () => {
    const { movements } = useMovementStore()
    const columnsAffiliates: ColumnDef<IMovementTable>[] = [
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        {
            accessorKey: "amount",
            header: "Amount",
        },
        {
            accessorKey: "category",
            header: "Category",
        },

    ];
    return (
        <TableMovements columns={columnsAffiliates} movements={movements} />
    )
}

export default TableMovementsContainer