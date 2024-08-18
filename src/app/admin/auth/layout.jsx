export default function AuthLayout({ children }) {
    return (
      <>
        <meta name="robots" content="index, follow" />
  
        <div className="h-full bg-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              src="/assets/logo/logo-11.png"
              height={75}
              width={100}
              alt="Logo"
              className="h-32 w-40 mt-10"
            />
            {children}
          </div>
        </div>
      </>
    );
  }
  