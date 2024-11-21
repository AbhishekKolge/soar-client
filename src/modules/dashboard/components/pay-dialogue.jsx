import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTransferAmountMutation } from "../../../features/transaction/transaction-api-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { transferAmountSchema } from "../../../schema";
import {
  defaultTransferAmountValues,
  getTransferAmountInitialValues,
} from "../utils";
import { useEffect } from "react";
import { formatCurrency, successToast } from "../../../utils/helper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const PayDialogue = (props) => {
  const { open, setOpen, amount, id } = props;
  const [transferAmount, { isLoading: transferAmountIsLoading }] =
    useTransferAmountMutation();

  const form = useForm({
    resolver: zodResolver(transferAmountSchema),
    defaultValues: defaultTransferAmountValues,
  });

  useEffect(() => {
    if (amount) {
      form.reset(getTransferAmountInitialValues(amount));
    }
  }, [amount, form]);

  function onSubmit(values) {
    transferAmount({
      details: values,
      id,
    })
      .unwrap()
      .then(() => {
        successToast("Amount transferred successfully");
      })
      .finally(() => {
        form.reset();
        setOpen(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} keepMounted>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please enter your pin</DialogTitle>
          <DialogDescription>{`Transfer ${formatCurrency(
            amount
          )}`}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="my-4">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup className="grow">
                          <InputOTPSlot className="grow" index={0} />
                          <InputOTPSlot className="grow" index={1} />
                          <InputOTPSlot className="grow" index={2} />
                          <InputOTPSlot className="grow" index={3} />
                          <InputOTPSlot className="grow" index={4} />
                          <InputOTPSlot className="grow" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={transferAmountIsLoading}
              type="submit"
              className="w-full bg-foreground"
            >
              {transferAmountIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Transfer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PayDialogue;
