import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAddCreditCardMutation } from "../../../features/credit-card/credit-card-api-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addCreditCardSchema } from "../../../schema";
import { defaultCreditCardValues } from "../utils";
import { omitEmptyKeys, successToast } from "../../../utils/helper";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "../../../components/ui/date-picker";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons";

const AddCard = (props) => {
  const { open, setOpen } = props;

  const [addCreditCard, { isLoading: addCreditCardIsLoading }] =
    useAddCreditCardMutation();

  const form = useForm({
    resolver: zodResolver(addCreditCardSchema),
    defaultValues: defaultCreditCardValues,
  });

  function onSubmit(values) {
    const finalValues = omitEmptyKeys(values);
    addCreditCard(finalValues)
      .unwrap()
      .then(() => {
        successToast("Credit card added successfully");
        setOpen(false);
        form.reset();
      });
  }

  const validityHandler = (value) => {
    form.setValue("validity", value || undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const toggleSheetHandler = (value) => {
    setOpen(value);
    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={toggleSheetHandler}>
      <SheetContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl">Add card details</SheetTitle>
            <SheetDescription>
              Effortlessly manage your credit card activities
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: 3778 4564 5432 5422" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Abhishek" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSelected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Default{" "}
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoCircledIcon className="w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Make this card as current active
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid Till</FormLabel>
                    <FormControl>
                      <DatePicker
                        placeholder="eg: 14/04/2028"
                        onSelect={validityHandler}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin</FormLabel>
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
            </Form>
          </div>
          <SheetFooter className="mt-auto">
            <Button
              disabled={addCreditCardIsLoading}
              className="bg-foreground ml-auto w-full lg:w-[190px]"
              type="submit"
            >
              {addCreditCardIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddCard;
