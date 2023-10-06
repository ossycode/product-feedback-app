"use client";

import Link from "next/link";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log(error);

  return (
    <div className="grid h-screen px-4 bg-white place-content-center w-full">
      <div className="text-center w-full">
        <h1 className="font-black text-gray-200 text-[7rem]">404</h1>

        <p className=" tracking-tight text-gray-900 text-heading3 md:text-heading1">
          Uh-oh!
        </p>

        <p className="mt-8 text-gray-500 text-heading3 md:text-heading1">
          Something went wrong!
        </p>

        <div className="mt-10 flex items-center justify-center gap-10 w-full">
          <Link
            href="/dashboard"
            className="inline-block  p-6 text-heading4 md:text-heading3  text-white bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring rounded-2xl"
          >
            Go Back Home
          </Link>

          <button
            className="inline-block p-6 text-heading4 md:text-heading3 text-white bg-dark-grayish-400  hover:bg-dark-grayish-500 focus:outline-none focus:ring rounded-2xl"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
