// src/app/error/page.tsx
export default function ErrorPage() {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
        <p className="mt-4">Something went wrong during authentication. Please try again.</p>
        <a href="/signIn" className="bg-blue-500 text-white p-2 mt-4">
          Go to Sign-In
        </a>
      </div>
    );
  }
  