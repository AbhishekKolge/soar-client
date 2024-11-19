import { Provider } from "react-redux";
import { AuthChecker, SuspenseView } from "../components/layout";
import store from "../state/store";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const StoreProvider = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <SuspenseView>
          <AuthChecker />
        </SuspenseView>
        <Toaster richColors toastOptions={{}} />
      </TooltipProvider>
    </Provider>
  );
};

export default StoreProvider;
