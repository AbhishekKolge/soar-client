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
  useGetPreferenceQuery,
  useUpdatePreferenceMutation,
} from "../../../features/user/user-api-slice";
import { updatePreferenceSchema } from "../../../schema/user";
import { defaultPreferenceValues, getPreferenceInitialValues } from "../utils";
import { useEffect } from "react";
import { successToast } from "../../../utils/helper";
import { ReloadIcon } from "@radix-ui/react-icons";

const PreferenceForm = () => {
  const { data: preferenceData, isLoading: preferenceIsLoading } =
    useGetPreferenceQuery();
  const [updatePreference, { isLoading: updatePreferenceIsLoading }] =
    useUpdatePreferenceMutation();

  const form = useForm({
    resolver: zodResolver(updatePreferenceSchema),
    defaultValues: defaultPreferenceValues,
  });

  useEffect(() => {
    if (preferenceData?.preference) {
      form.reset(getPreferenceInitialValues(preferenceData.preference));
    }
  }, [preferenceData, form]);

  function onSubmit(values) {
    updatePreference(values)
      .unwrap()
      .then(() => {
        successToast("preferences updated successfully");
      });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-[16px] md:gap-[41px]"
    >
      <div>
        <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
        <div className="grid gap-y-[22px]">
          <Form {...form}>
            <FormField
              control={form.control}
              name="transactionAlert"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4 justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Transaction emails
                    </FormLabel>
                    <FormDescription>
                      Receive email notifications for every transaction on your
                      account.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={
                        updatePreferenceIsLoading || preferenceIsLoading
                      }
                      className="!mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loginAlert"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4 justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Login alert emails
                    </FormLabel>
                    <FormDescription>
                      Get instant alerts whenever someone logs into your
                      account.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={
                        updatePreferenceIsLoading || preferenceIsLoading
                      }
                      className="!mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </div>
      </div>
      <Button
        disabled={updatePreferenceIsLoading || preferenceIsLoading}
        className="bg-foreground ml-auto w-full lg:w-[190px]"
        type="submit"
      >
        {updatePreferenceIsLoading && (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        Save
      </Button>
    </form>
  );
};

export default PreferenceForm;
