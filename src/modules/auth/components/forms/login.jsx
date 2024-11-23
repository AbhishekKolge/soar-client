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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ICON, ROUTES } from "../../../../utils/constants";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "../../../../schema";
import { Logo } from "../../../../components/layout";
import { useLoginMutation } from "../../../../features/auth/auth-api-slice";
import { useDispatch } from "react-redux";
import { loginHandler } from "../../../../features/auth/auth-action";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PasswordInput } from "../../../../components/ui/password-input";
import { omitEmptyKeys } from "../../../../utils/helper";

const LoginForm = () => {
  const [isGoogleLogging, setIsGoogleLogging] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [login, { isLoading: loginIsLoading, isSuccess: loginIsSuccess }] =
    useLoginMutation();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get("email") || import.meta.env.VITE_EMAIL,
      password: searchParams.get("email") ? "" : import.meta.env.VITE_PASSWORD,
    },
  });

  function onSubmit(values) {
    login(omitEmptyKeys(values))
      .unwrap()
      .then((data) => {
        form.reset();
        dispatch(loginHandler(data));
        navigate(ROUTES.dashboard, { replace: true });
      })
      .catch((error) => {
        if (error.status === 403) {
          form.reset();
          navigate(`${ROUTES.verify}?email=${values.email}`);
        }
      });
  }

  const googleLoginHandler = () => {
    if (isGoogleLogging) {
      return;
    }
    setIsGoogleLogging(true);
    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <div className="flex items-center justify-between">
        <Logo className="lg:hidden" />
        <Button
          variant="secondary"
          className="ml-auto justify-self-end"
          asChild
        >
          <Link to={ROUTES.register}>Register</Link>
        </Button>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center"
      >
        <Card className="w-full md:w-[450px] border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl lg:text-3xl">Login</CardTitle>
            <CardDescription>Enter your login details below</CardDescription>
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
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              disabled={isGoogleLogging || loginIsLoading || loginIsSuccess}
              className="w-full"
              type="submit"
            >
              {loginIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
            <Button
              disabled={isGoogleLogging || loginIsLoading || loginIsSuccess}
              className="w-full"
              type="button"
              variant="outline"
              onClick={googleLoginHandler}
            >
              <img
                className="w-8 h-8"
                src={ICON.icons.google}
                alt="google logo"
              />
              Continue with Google
            </Button>
          </CardFooter>
          <Separator className="mb-2" />
          <div className="flex flex-col text-[14px] md:text-[16px] items-center gap-2">
            <Button asChild variant="link">
              <Link to={ROUTES.forgotPassword}>Forgot Password</Link>
            </Button>
            <p className="text-xs md:text-sm text-center w-full md:w-[350px]">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
