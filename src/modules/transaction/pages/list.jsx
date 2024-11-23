import { TransactionTable } from "../components";
import { Card, CardContent } from "@/components/ui/card";

const TransactionList = () => {
  return (
    <Card className="w-full self-start">
      <CardContent className="pt-[20px] lg:pt-[30px] grid">
        <TransactionTable />
      </CardContent>
    </Card>
  );
};

export default TransactionList;
