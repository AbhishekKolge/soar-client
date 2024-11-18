import {
  Card,
  CardDescription,
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
import { verifySchema } from "../../../../schema";
import { Logo } from "../../../../components/layout";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyMutation } from "../../../../features/auth/auth-api-slice";
import { ReloadIcon } from "@radix-ui/react-icons";
import { omitEmptyKeys, successToast } from "../../../../utils/helper";

const VerifyForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verify, { isLoading: verifyIsLoading, isSuccess: verifyIsSuccess }] =
    useVerifyMutation();
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      code: "",
    },
  });

  function onSubmit(values) {
    verify(omitEmptyKeys(values))
      .unwrap()
      .then(() => {
        form.reset();
        successToast("Email verified successfully");
        navigate(`${ROUTES.login}?email=${values.email}`, {
          replace: true,
        });
      })
      .catch((error) => {
        if (error.status === 409) {
          form.reset();
          navigate(`${ROUTES.login}?email=${values.email}`, {
            replace: true,
          });
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
              Verify Your Email
            </CardTitle>
            <CardDescription>
              Enter your email and verification code
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
            </Form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={verifyIsLoading || verifyIsSuccess}
              className="w-full"
              type="submit"
            >
              {verifyIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Verify
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default VerifyForm;
