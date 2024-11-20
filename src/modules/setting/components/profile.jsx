import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  getEighteenYearsAgo,
  successToast,
  updateEmptyToNull,
} from "../../../utils/helper";
import { ContactInput } from "../../../components/ui/contact-input";
import { DatePicker } from "../../../components/ui/date-picker";
import { cn } from "@/lib/utils";
import {
  useRemoveProfileImageMutation,
  useShowMeQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} from "../../../features/user/user-api-slice";
import { useDispatch } from "react-redux";
import { updateUserSchema } from "../../../schema/user";
import { updateUserInfoHandler } from "../../../features/auth/auth-action";
import { CountrySelect } from "../../../components/ui/country-select";
import { useEffect } from "react";
import { defaultProfileValues, getProfileInitialValues } from "../utils";
import ProfileImage from "../../../components/ui/profile-image";
import ProfileLoading from "./profile-loading";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { data: showMeData, isLoading: showMeIsLoading } = useShowMeQuery({});
  const [updateProfile, { isLoading: updateProfileIsLoading }] =
    useUpdateProfileMutation();
  const [removeProfileImage, { isLoading: removeProfileImageIsLoading }] =
    useRemoveProfileImageMutation();
  const [uploadProfileImage, { isLoading: uploadProfileImageIsLoading }] =
    useUploadProfileImageMutation();

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: defaultProfileValues,
  });

  useEffect(() => {
    if (showMeData?.user) {
      form.reset(getProfileInitialValues(showMeData.user));
    }
  }, [showMeData, form]);

  function onSubmit(values) {
    const finalValues = updateEmptyToNull(values);
    updateProfile(finalValues)
      .unwrap()
      .then(() => {
        dispatch(updateUserInfoHandler(finalValues));
        successToast("Profile updated successfully");
      });
  }

  const dobHandler = (value) => {
    form.setValue("dob", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const contactCountryCodeHandler = (value) => {
    form.setValue("contactCountryId", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const countryHandler = (value) => {
    form.setValue("countryId", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const minDateYear = getEighteenYearsAgo();

  const contactCountryCodeError = form.formState.errors.contactCountryId;

  return (
    <div className="flex gap-[57px] items-start pl-[30px]">
      <ProfileImage
        isLoading={
          showMeIsLoading ||
          removeProfileImageIsLoading ||
          uploadProfileImageIsLoading
        }
        onUpload={uploadProfileImage}
        onCancel={removeProfileImage}
        showMeData={showMeData}
        profileImageId={showMeData?.user?.profileImageId}
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[41px] flex-1"
      >
        <div className="grid grid-cols-2 gap-x-[29px] gap-y-[22px]">
          {showMeIsLoading ? (
            <ProfileLoading />
          ) : (
            <Form {...form}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: User" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Eg: user@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <DatePicker
                        placeholder="eg: 01/03/1996"
                        onSelect={dobHandler}
                        value={field.value}
                        disabled={{
                          after: minDateYear,
                        }}
                        defaultMonth={minDateYear}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <ContactInput
                        codeProps={{
                          onSelect: contactCountryCodeHandler,
                          value: form.watch("contactCountryId"),
                        }}
                        contactProps={field}
                      />
                    </FormControl>
                    {contactCountryCodeError ? (
                      <p
                        className={cn(
                          "text-[0.8rem] font-medium text-destructive"
                        )}
                      >
                        {contactCountryCodeError?.message}
                      </p>
                    ) : (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="present"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Present Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: San Jos, California" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="permanent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permanent Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg: 13 street Cooper Square"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: 10010" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <CountrySelect
                        {...field}
                        onSelect={countryHandler}
                        value={form.watch("countryId")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          )}
        </div>

        <Button
          disabled={updateProfileIsLoading || showMeIsLoading}
          className="bg-foreground ml-auto w-full lg:w-[190px]"
          type="submit"
        >
          {updateProfileIsLoading && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
