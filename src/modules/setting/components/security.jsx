import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  useGetSecurityQuery,
  useUpdateSecurityMutation,
} from "../../../features/user/user-api-slice";
import { updateSecuritySchema } from "../../../schema/user";
import { defaultSecurityValues, getSecurityInitialValues } from "../utils";
import { useEffect } from "react";
import { successToast } from "../../../utils/helper";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import DeleteProfile from "./delete-profile";
import { useDisclosure } from "../../../utils/hooks";

const SecurityForm = () => {
  const { isOpen: open, setOpen: setOpen } = useDisclosure("delete-profile");
  const { data: securityData, isLoading: securityIsLoading } =
    useGetSecurityQuery();
  const [updateSecurity, { isLoading: updateSecurityIsLoading }] =
    useUpdateSecurityMutation();

  const form = useForm({
    resolver: zodResolver(updateSecuritySchema),
    defaultValues: defaultSecurityValues,
  });

  useEffect(() => {
    if (securityData?.security) {
      form.reset(getSecurityInitialValues(securityData.security));
    }
  }, [securityData, form]);

  function onSubmit(values) {
    updateSecurity(values)
      .unwrap()
      .then(() => {
        successToast("security updated successfully");
      });
  }

  const openDeleteProfileHandler = () => {
    setOpen(true);
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[41px]"
      >
        <div>
          <h3 className="mb-4 text-lg font-medium">Account Security</h3>
          <div className="grid gap-y-[22px]">
            <Form {...form}>
              <FormField
                control={form.control}
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Enable 2FA (we will enable this soon)
                      </FormLabel>
                      <FormDescription>
                        Add an extra layer of security to your account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        className="!mt-0"
                        // disabled={updateSecurityIsLoading || securityIsLoading}
                        disabled={true}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div
                onClick={openDeleteProfileHandler}
                className="cursor-pointer flex flex-row items-center justify-between rounded-lg border border-destructive p-4"
              >
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive font-medium">
                    Delete my account
                  </Label>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Permanently delete the account and remove access.
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <Button
          disabled={updateSecurityIsLoading || securityIsLoading}
          className="bg-foreground ml-auto w-full lg:w-[190px]"
          type="submit"
        >
          {updateSecurityIsLoading && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
      <DeleteProfile open={open} setOpen={setOpen} />
    </>
  );
};

export default SecurityForm;
