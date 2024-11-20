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
          <div className="flex items-center justify-end">
            <Button onClick={openAddAccountHandler} variant="outline">
              <PlusCircledIcon className="!h-5 !w-5" />
              Add account
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AccountTable />
        </CardContent>
      </Card>
      <AddAccount open={openAddAccount} setOpen={setOpenAddAccount} />
    </>
  );
};

export default AccountList;
