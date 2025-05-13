import { SignupForm } from "@/features/auth";
const Signup = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header with logo and page title */}
      <div className="bg-primary/10 p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-8 sm:size-10 text-primary"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <path d="M3.29 7 12 12l8.71-5" />
            <path d="M12 22V12" />
          </svg>
        </div>
        <h2 className="text-center text-lg sm:text-xl font-bold text-gray-800">
          Device Management Tool
        </h2>
      </div>

      <div className="p-4 sm:p-6">
        <SignupForm />
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 text-center text-xs text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} Device Management System • All rights
        reserved
      </div>
    </div>
  );
};

export default Signup;
