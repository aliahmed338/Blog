"use client";

interface ErrorPageProps {
  reset: () => void;
  error: Error;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div>
      <h1>{error.message}</h1>
      <p onClick={() => reset()}>Reset</p>
    </div>
  );
};

export default ErrorPage;
