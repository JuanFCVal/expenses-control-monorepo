

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";


interface DataTableProps<TData, TValue> {
  isLoading?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fileName?: string;
  sheetName?: string;
  showPrintButton?: boolean;
  filterConfig?: {
    accessor: string;
    filterValue: string;
  };
  setTableData?: (data: any) => void;
}

export const DataTable = <TData, TValue>({
  columns,
  isLoading,
  data,
  filterConfig,
  setTableData,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const [numbersForPagination, setnumbersForPagination] = useState<number[]>([
    10, 20,
  ]);
  const keysPressedRef = useRef({ up: 0, down: 0 });

  useEffect(() => {
    const numbersForPagination = [10, 20, 30, 40, 50];
    const totalElements = data.length;
    const filteredNumbers = numbersForPagination.filter(
      (number) => number <= totalElements,
    );
    if (filteredNumbers.length === 0) filteredNumbers.push(10);
    if (!filteredNumbers.includes(totalElements))
      filteredNumbers.push(totalElements);
    setnumbersForPagination(filteredNumbers);
  }, [data]);

  const scrollIfNeeded = () => {
    const { up, down } = keysPressedRef.current;
    const table = tableRef.current;
    table?.scrollIntoView({ behavior: "smooth" });
    if (up >= 5) {
      table!.scrollTop -= 250;
      keysPressedRef.current.up = 0;
    } else if (down >= 5) {
      keysPressedRef.current.down = 0;
      table!.scrollTop += 250;
    }
  };

  const handleArrowKeys = (event: any) => {
    const currentIndex = table
      ?.getRowModel()
      .rows.findIndex((row) => row.getIsSelected());
    if (event.key === "ArrowUp") {
      keysPressedRef.current.up++;
      const previousRow = table?.getRowModel().rows[currentIndex - 1];
      if (previousRow) {
        table?.setRowSelection({
          [previousRow.id]: true,
        });
      }
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      const nextRow = table?.getRowModel().rows[currentIndex + 1];
      if (nextRow) {
        table?.setRowSelection({
          [nextRow.id]: true,
        });
      }
      keysPressedRef.current.down++;
      event.preventDefault();
    }
    scrollIfNeeded();
  };

  const getCurrentData = () => {
    const sortedData = table
      .getSortedRowModel()
      .rows.map((row) => row.original);
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);

    // Intersection of sorted and filtered data
    const filteredAndSortedData = sortedData.filter((row) =>
      filteredData.includes(row),
    );

    return filteredAndSortedData;
  };

  useEffect(() => {
    const currentData = getCurrentData();
    if (setTableData) setTableData(currentData);
  }, [
    table.getState().sorting,
    table.getState().columnFilters,
    table.getState().pagination,
  ]);

  useEffect(() => {
    const tableCurrentRef = tableRef.current;
    if (tableCurrentRef) {
      tableCurrentRef.addEventListener("keydown", handleArrowKeys);
    }
    return () => {
      if (tableCurrentRef) {
        tableCurrentRef.removeEventListener("keydown", handleArrowKeys);
      }
    };
  }, []);
  return isLoading ? (
    <div>
      <div className="flex h-64 flex-col items-center justify-center">
        <p>Cargando...</p>

      </div>
    </div>
  ) : (
    <div className="">
      <div className="mb-8 flex justify-between">
        {filterConfig && (
          <Input
            placeholder={`Filtrar por ${filterConfig.accessor.toLocaleLowerCase()}`}
            value={
              (table
                .getColumn(filterConfig.filterValue)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(filterConfig.filterValue)
                ?.setFilterValue(event.target.value)
            }
            className="h-12 max-w-sm"
          />
        )}
      </div>
      <div>
        <Table tabIndex={0} ref={tableRef as any}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    if (Object.keys(table.getState().rowSelection).length > 0) {
                      table.setRowSelection({});
                    }
                    row.toggleSelected();
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No existen resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: any) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {numbersForPagination.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <span className="text-sm font-medium">
            Nº de filas: {data.length}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Página anterior
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Página siguiente
        </Button>
      </div>
    </div>
  );
};
