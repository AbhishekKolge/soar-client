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
import AccountTablePagination from "./account-table-pagination";
import AccountTableToolbar from "./account-table-toolbar";
import { accountHeaders } from "../utils";
import AccountHeader from "./account-header";
import { useState } from "react";

const AccountDataTable = ({
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
  clearBank,
  addBank,
  clearAllFilters,
  bankId,
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
      <AccountTableToolbar
        onSearch={onSearch}
        searchValue={searchValue}
        clearBank={clearBank}
        addBank={addBank}
        clearAllFilters={clearAllFilters}
        bankId={bankId}
      />
      <div className="rounded-[15px] overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              {accountHeaders.map((head) => {
                return (
                  <TableHead className="p-3" key={head.key}>
                    <AccountHeader
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
                      className="h-24 text-center text-sm p-2"
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
      <AccountTablePagination
        onNext={onNext}
        onPrev={onPrev}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AccountDataTable;
