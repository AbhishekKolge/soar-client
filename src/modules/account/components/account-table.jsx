import {
  useDeleteAccountMutation,
  useGetAccountQuery,
} from "../../../features/account/account-api-slice";
import { useAccountFilter } from "../../../utils/hooks";
import accountColumn from "./account-column";
import AccountDataTable from "./account-data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { successToast } from "../../../utils/helper";
import { DeleteConfirmation } from "../../../components/ui/delete-confirmation";
import UpdateAccount from "./update-account";

const AccountTable = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEditAccount, setOpenEditAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const {
    queryFilterState,
    helperState,
    methods: {
      nextPageHandler,
      prevPageHandler,
      sortHandler,
      searchHandler,
      clearBank,
      addBank,
      clearAllFilters,
    },
  } = useAccountFilter();
  const {
    data: accountData,
    isLoading: accountIsLoading,
    isFetching: accountIsFetching,
  } = useGetAccountQuery(queryFilterState, {
    skip: helperState.firstRender,
  });

  const [deleteAccount, { isLoading: deleteAccountIsLoading }] =
    useDeleteAccountMutation();

  const deleteAccountHandler = () => {
    if (selectedAccount) {
      deleteAccount(selectedAccount.id)
        .unwrap()
        .then(() => {
          successToast("Payee deleted successfully");
        })
        .finally(() => {
          setOpenDelete(false);
        });
    } else {
      setOpenDelete(false);
    }
  };

  const editSelectHandler = (accountDetails) => {
    setSelectedAccount(accountDetails);
    setOpenEditAccount(true);
  };

  const deleteSelectHandler = (accountDetails) => {
    setSelectedAccount(accountDetails);
    setOpenDelete(true);
  };

  const actionColumns = {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon" className="focus-visible:ring-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={editSelectHandler.bind(null, account)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={deleteSelectHandler.bind(null, account)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const data = accountData?.results || [];
  const totalPages = accountData?.totalPages;

  return (
    <>
      <div className="h-full overflow-x-scroll">
        <AccountDataTable
          isLoading={
            accountIsLoading || accountIsFetching || helperState.firstRender
          }
          onNext={nextPageHandler}
          onPrev={prevPageHandler}
          totalPages={totalPages}
          currentPage={queryFilterState.page}
          data={data}
          columns={[...accountColumn, actionColumns]}
          onSort={sortHandler}
          sortKey={queryFilterState.sortKey}
          sortType={queryFilterState.sortType}
          onSearch={searchHandler}
          searchValue={helperState.search}
          clearBank={clearBank}
          addBank={addBank}
          clearAllFilters={clearAllFilters}
          bankId={queryFilterState.bankId}
        />
      </div>
      <DeleteConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={deleteAccountHandler}
        isLoading={deleteAccountIsLoading}
      />
      <UpdateAccount
        open={openEditAccount}
        setOpen={setOpenEditAccount}
        selectedAccount={selectedAccount}
      />
    </>
  );
};

export default AccountTable;
