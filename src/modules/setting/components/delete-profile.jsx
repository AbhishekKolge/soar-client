import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteAccountMutation } from "../../../features/user/user-api-slice";
import { useSelector } from "react-redux";
import { deleteProfileSchema } from "../../../schema/user";
import { defaultDeleteProfileValues } from "../utils";
import { errorToast, warningToast } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../../features/auth/auth-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";

const DeleteProfile = (props) => {
  const { open, setOpen } = props;

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [deleteAccount, { isLoading: deleteAccountIsLoading }] =
    useDeleteAccountMutation();

  const form = useForm({
    resolver: zodResolver(deleteProfileSchema),
    defaultValues: defaultDeleteProfileValues,
  });

  function onSubmit(values) {
    if (values.email !== auth.email) {
      errorToast("Email does not match");
      return;
    }
    deleteAccount()
      .unwrap()
      .then(() => {
        dispatch(logoutHandler({ isSession: true }));
        warningToast("Account deleted successfully");
        setOpen(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} keepMounted>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete your entire account permanently?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            entire account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="my-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please type in your email to confirm.</FormLabel>
                    <FormControl>
                      <Input placeholder={auth.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={deleteAccountIsLoading}
              variant="destructive"
              type="submit"
              className="w-full"
            >
              {deleteAccountIsLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Permanently delete account
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfile;
