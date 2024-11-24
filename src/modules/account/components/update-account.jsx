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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateAccountSchema } from "../../../schema";
import { defaultAccountValues, getAccountInitialValues } from "../utils";
import { successToast, updateEmptyToNull } from "../../../utils/helper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateAccountMutation } from "../../../features/account/account-api-slice";
import { ReloadIcon } from "@radix-ui/react-icons";
import { BankSelect } from "../../../components/ui/bank-select";
import { cn } from "@/lib/utils";
import { AccountImage } from "../../../components/ui/account-image";
import { useEffect } from "react";

const UpdateAccount = (props) => {
  const { selectedAccount, open, setOpen } = props;

  const [updateAccount, { isLoading: updateAccountIsLoading }] =
    useUpdateAccountMutation();

  const form = useForm({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: defaultAccountValues,
  });

  useEffect(() => {
    if (selectedAccount) {
      form.reset(getAccountInitialValues(selectedAccount));
    }
  }, [selectedAccount, form]);

  function onSubmit(values) {
    const { imageUrl, bank, ...restValues } = values;
    const sanitizedValues = updateEmptyToNull({
      ...restValues,
      bankId: bank?.id,
    });

    if (imageUrl && typeof imageUrl === "object") {
      const formData = new FormData();
      formData.append("image", imageUrl);
      Object.keys(sanitizedValues).forEach((key) => {
        formData.append(key, sanitizedValues[key]);
      });
      updateAccount({ details: formData, id: selectedAccount.id })
        .unwrap()
        .then(() => {
          successToast("Payee updated successfully");
          setOpen(false);
          form.reset();
        });
    } else {
      updateAccount({
        details: { ...sanitizedValues, imageUrl: imageUrl || null },
        id: selectedAccount.id,
      })
        .unwrap()
        .then(() => {
          successToast("Payee updated successfully");
          setOpen(false);
          form.reset();
        });
    }
  }

  const toggleSheetHandler = (value) => {
    setOpen(value);
    form.reset();
  };

  const bankHandler = (value) => {
    form.setValue("bank", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const addImageHandler = (imageData) => {
    form.setValue("imageUrl", imageData, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeImageHandler = () => {
    form.setValue("imageUrl", null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const bankError = form.formState.errors.bank?.id;

  return (
    <Sheet open={open} onOpenChange={toggleSheetHandler}>
      <SheetContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 h-full"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl">Update account details</SheetTitle>
            <SheetDescription>
              Effortlessly manage your payee accounts
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-center">
                    <AccountImage
                      isLoading={updateAccountIsLoading}
                      onUpload={addImageHandler}
                      onCancel={removeImageHandler}
                      imageUrl={field.value}
                    />
                  </div>
                </FormItem>
              )}
            />

            <Form {...form}>
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
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
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Abhishek" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identity</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Friend" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <BankSelect
                        {...field}
                        onSelect={bankHandler}
                        bank={form.watch("bank")}
                      />
                    </FormControl>
                    {bankError ? (
                      <p
                        className={cn(
                          "text-[0.8rem] font-medium text-destructive"
                        )}
                      >
                        {bankError?.message}
                      </p>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
            </Form>
          </div>
          <SheetFooter className="mt-auto">
            <Button
              disabled={updateAccountIsLoading}
              className="bg-foreground ml-auto w-full lg:w-[190px]"
              type="submit"
            >
              {updateAccountIsLoading && (
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

export default UpdateAccount;
