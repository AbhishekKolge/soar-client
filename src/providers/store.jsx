import { Provider } from "react-redux";
import { AuthChecker, SuspenseView } from "../components/layout";
import store from "../state/store";
import { Toaster } from "@/components/ui/sonner";

const StoreProvider = () => {
  return (
    <Provider store={store}>
      <SuspenseView>
        <AuthChecker />
      </SuspenseView>
      <Toaster richColors toastOptions={{}} />
    </Provider>
  );
};

export default StoreProvider;
