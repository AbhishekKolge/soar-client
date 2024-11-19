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
import { useUpdateCreditCardMutation } from "../../../features/credit-card/credit-card-api-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateCreditCardSchema } from "../../../schema";
import {
  defaultUpdateCreditCardValues,
  getCreditCardInitialValues,
} from "../utils";
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
import { useEffect } from "react";

const UpdateCard = (props) => {
  const { selectedCard, open, setOpen } = props;

  const [updateCreditCard, { isLoading: updateCreditCardIsLoading }] =
    useUpdateCreditCardMutation();

  const form = useForm({
    resolver: zodResolver(updateCreditCardSchema),
    defaultValues: defaultUpdateCreditCardValues,
  });

  useEffect(() => {
    if (selectedCard) {
      form.reset(getCreditCardInitialValues(selectedCard));
    }
  }, [selectedCard, form]);

  function onSubmit(values) {
    const finalValues = omitEmptyKeys(values);
    updateCreditCard({ details: finalValues, id: selectedCard.id })
      .unwrap()
      .then(() => {
        successToast("Credit card updated successfully");
        setOpen(false);
        form.reset();
      });
  }

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
            <SheetTitle className="text-2xl">Update card details</SheetTitle>
            <SheetDescription>
              Effortlessly manage your credit card activities
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
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
              disabled={updateCreditCardIsLoading}
              className="bg-foreground ml-auto w-full lg:w-[190px]"
              type="submit"
            >
              {updateCreditCardIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateCard;
