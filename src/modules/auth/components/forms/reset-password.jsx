import {
  Card,
  CardContent,
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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import { Separator } from "@/components/ui/separator";
import { resetPasswordSchema } from "../../../../schema";
import { Logo } from "../../../../components/layout";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResetPasswordMutation } from "../../../../features/auth/auth-api-slice";
import { ReloadIcon } from "@radix-ui/react-icons";
import { omitEmptyKeys, successToast } from "../../../../utils/helper";
import { PasswordInput } from "../../../../components/ui/password-input";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [
    resetPassword,
    { isLoading: resetPasswordIsLoading, isSuccess: resetPasswordIsSuccess },
  ] = useResetPasswordMutation();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      code: "",
      password: "",
    },
  });

  function onSubmit(values) {
    resetPassword(omitEmptyKeys(values))
      .unwrap()
      .then(() => {
        form.reset();
        successToast("Password reset successfully");
        navigate(`${ROUTES.login}?email=${values.email}`, {
          replace: true,
        });
      });
  }

  const enablePassword = form.watch("code").length === 6;

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
        <Card className="w-full md:w-[450px] border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl lg:text-3xl">
              Reset your password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
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
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup className="grow">
                          <InputOTPSlot className="grow" index={0} />
                          <InputOTPSlot className="grow" index={1} />
                          <InputOTPSlot className="grow" index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="grow">
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
              {enablePassword && (
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
              )}
            </Form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={resetPasswordIsLoading || resetPasswordIsSuccess}
              className="w-full"
              type="submit"
            >
              {resetPasswordIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </CardFooter>
          <Separator className="mb-2" />
          <div className="flex flex-col items-center gap-2 text-[14px] md:text-[16px]">
            <Button asChild variant="link" className="">
              <Link to={ROUTES.forgotPassword}>{`Don't have code?`}</Link>
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
