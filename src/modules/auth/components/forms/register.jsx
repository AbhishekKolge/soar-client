import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import { registerSchema } from "../../../../schema";
import { Logo } from "../../../../components/layout";
import { useRegisterMutation } from "../../../../features/auth/auth-api-slice";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  getEighteenYearsAgo,
  omitEmptyKeys,
  successToast,
} from "../../../../utils/helper";
import { ContactInput } from "../../../../components/ui/contact-input";
import { PasswordInput } from "../../../../components/ui/password-input";
import { DatePicker } from "../../../../components/ui/date-picker";
import { cn } from "@/lib/utils";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [
    register,
    { isLoading: registerIsLoading, isSuccess: registerIsSuccess },
  ] = useRegisterMutation();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      dob: null,
      contactNumber: "",
      contactCountryId: "",
    },
  });

  function onSubmit(values) {
    register(omitEmptyKeys(values))
      .unwrap()
      .then(() => {
        form.reset();
        successToast("Registered successfully");
        navigate(`${ROUTES.verify}?email=${values.email}`);
      });
  }

  const dobHandler = (value) => {
    form.setValue("dob", value);
  };

  const contactCountryCodeHandler = (value) => {
    form.setValue("contactCountryId", value);
  };

  const minDateYear = getEighteenYearsAgo();

  const contactCountryCodeError = form.formState.errors.contactCountryId;

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <div className="flex items-center justify-between">
        <Logo className="lg:hidden" />
        <Button
          variant="secondary"
          className="ml-auto justify-self-end"
          asChild
        >
          <Link to={ROUTES.login}>Login</Link>
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center"
      >
        <Card className="w-full border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl lg:text-3xl">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
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
                      <Input placeholder="Eg: user@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="password" {...field} />
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
            </Form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={registerIsLoading || registerIsSuccess}
              className="w-full"
              type="submit"
            >
              {registerIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
