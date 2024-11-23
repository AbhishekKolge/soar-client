import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Error404, Error } from "../components";

const ErrorBoundary = () => {
  const error = useRouteError();

  const isNotFoundError = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main>
      <section className="min-h-screen p-[20px] lg:p-[25px] flex items-center justify-center flex-col gap-6">
        {isNotFoundError ? <Error404 /> : <Error message={error.message} />}
      </section>
    </main>
  );
};

export default ErrorBoundary;
