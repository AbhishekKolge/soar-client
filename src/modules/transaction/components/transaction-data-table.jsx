import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { XOctagon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionTablePagination from "./transaction-table-pagination";
import TransactionTableToolbar from "./transaction-table-toolbar";
import { transactionHeaders } from "../utils";
import TransactionHeader from "./transaction-header";
import { useState } from "react";

const TransactionDataTable = ({
  isLoading,
  onNext,
  onPrev,
  totalPages,
  currentPage,
  columns,
  data,
  onSort,
  sortKey,
  sortType,
  onSearch,
  searchValue,
  clearCategory,
  clearMethod,
  addCategory,
  addMethod,
  clearAllFilters,
  category,
  method,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    enableRowSelection: false,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4 p-1">
      <TransactionTableToolbar
        onSearch={onSearch}
        searchValue={searchValue}
        clearCategory={clearCategory}
        clearMethod={clearMethod}
        addCategory={addCategory}
        addMethod={addMethod}
        clearAllFilters={clearAllFilters}
        category={category}
        method={method}
      />
      <div className="rounded-[15px] overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              {transactionHeaders.map((head) => {
                return (
                  <TableHead className="p-3" key={head.key}>
                    <TransactionHeader
                      onSort={onSort}
                      sortKey={sortKey}
                      sortType={sortType}
                      data={head}
                    />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              new Array(10).fill(0).map((_, key) => {
                return (
                  <TableRow className="hover:bg-transparent" key={key}>
                    <TableCell
                      colSpan={columns.length}
                      className="h-[47px] text-center text-sm p-2"
                    >
                      <Skeleton className="h-full w-full" />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-sm p-3" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm p-3"
                >
                  <div className="flex flex-col gap-2 items-center">
                    <XOctagon strokeWidth={0.5} size={30} />
                    No records found.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TransactionTablePagination
        onNext={onNext}
        onPrev={onPrev}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default TransactionDataTable;
