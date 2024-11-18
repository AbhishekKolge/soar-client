import { Outlet } from "react-router-dom";

const PrimaryLayout = () => {
  return (
    <>
      <header>
        <h1>I am layout</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default PrimaryLayout;
