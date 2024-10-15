import { IMovement } from "@/src/domain/entities/Movement";
import { DataTable } from "../../../../components/GenericTable";
import { IMovementTable } from "./TableMovementsConfig";

const TableMovements = ({ columns, movements }: { columns: IMovementTable, movements: IMovement[] }) => {

    return (
        <div className="w-full">
            <DataTable
                filterConfig={{
                    accessor: "cédula",
                    filterValue: "dni",
                }}
                showPrintButton
                fileName={`Afiliados_${new Date().toLocaleDateString()}`}
                columns={columns}
                data={movements.map(
                    (movement) => {
                        return {

                            amount: movement.amount,
                            description: movement.description,
                            date: movement.date,
                            category: movement.category.name
                        }
                    }
                )}
            ></DataTable>
        </div>
    )
}

export default TableMovements