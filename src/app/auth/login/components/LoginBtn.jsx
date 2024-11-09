import { useFormStatus } from "react-dom";

export default function LoginBtn() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        className="w-full py-2 bg-custom-blue text-white font-semibold rounded-md focus:ring-2 focus:outline-none disabled:opacity-75"
        disabled={pending}
      >
        {pending ? "Loading..." : "Log In"}
      </button>
    </>
  );
}
