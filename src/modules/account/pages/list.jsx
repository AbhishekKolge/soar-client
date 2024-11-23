import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import AddAccount from "../components/add-account";
import { AccountTable } from "../components";
import { useDisclosure } from "../../../utils/hooks";

const AccountList = () => {
  const { isOpen: openAddAccount, setOpen: setOpenAddAccount } =
    useDisclosure("add-account");

  const openAddAccountHandler = () => {
    setOpenAddAccount(true);
  };

  return (
    <>
      <Card className="w-full self-start">
        <CardHeader className="lg:pb-[41px]">
          <div className="flex items-center justify-end sm:justify-between">
            <h3 className="text-primary text-[16px] lg:text-[22px] font-semibold hidden sm:block">
              Manage your payee accounts
            </h3>
            <Button onClick={openAddAccountHandler} variant="outline">
              <PlusCircledIcon className="!h-5 !w-5" />
              Add account
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid">
          <AccountTable />
        </CardContent>
      </Card>
      <AddAccount open={openAddAccount} setOpen={setOpenAddAccount} />
    </>
  );
};

export default AccountList;
