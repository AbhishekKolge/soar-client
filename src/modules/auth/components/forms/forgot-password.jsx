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
import { forgotPasswordSchema } from "../../../../schema";
import { Logo } from "../../../../components/layout";
import { useForgotPasswordMutation } from "../../../../features/auth/auth-api-slice";
import { ReloadIcon } from "@radix-ui/react-icons";
import { omitEmptyKeys, successToast } from "../../../../utils/helper";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [
    forgotPassword,
    { isLoading: forgotPasswordIsLoading, isSuccess: forgotPasswordIsSuccess },
  ] = useForgotPasswordMutation();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values) {
    forgotPassword(omitEmptyKeys(values))
      .unwrap()
      .then(() => {
        form.reset();
        successToast(`Reset code sent to ${values.email} successfully`);
        navigate(`${ROUTES.resetPassword}?email=${values.email}`);
      })
      .catch((error) => {
        if (error.status === 409) {
          form.reset();
          navigate(`${ROUTES.resetPassword}?email=${values.email}`);
        }
      });
  }
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
              Forgot your password?
            </CardTitle>
            <CardDescription>
              Enter your email and we will send you a verification code
            </CardDescription>
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
            </Form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={forgotPasswordIsLoading || forgotPasswordIsSuccess}
              className="w-full"
              type="submit"
            >
              {forgotPasswordIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Verification Code
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
