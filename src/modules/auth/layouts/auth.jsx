import { Outlet } from "react-router-dom";
import { Logo } from "../../../components/layout";
import { ICON } from "../../../utils/constants";

const AuthLayout = () => {
  return (
    <main>
      <section className="min-h-screen w-full grid lg:grid-cols-2">
        <div className="hidden px-[25px] lg:px-[40px] py-[25px] lg:py-[30px] bg-secondary lg:grid grid-rows-[auto_1fr]">
          <Logo />
          <div className="flex items-center justify-center">
            <div className="h-96">
              <img
                className="w-full h-full"
                src={ICON.illustration.cover}
                alt="auth cover"
              />
            </div>
          </div>
        </div>
        <div className="px-[25px] lg:px-[40px] py-[25px] lg:py-[30px]">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
