import InputPassword from "../../components/inputPassword";

export default function LoginForm() {
  return (
    <form>
      <div>
        <h3 className="font-semibold text-[30px] py-4">
          Welcome to <span className="text-custom-blue">Academy</span>
        </h3>
      </div>
      <label
        htmlFor="email"
        className="text-sm font-medium leading-6 text-gray-900"
      >
        Email
      </label>
      <div className="mt-2 mb-3 rounded-md shadow-sm">
        <input
          type="text"
          name="email"
          id="email"
          required
          className="w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
          placeholder="john@doe.com"
        />
      </div>
      <InputPassword></InputPassword>
      <div className="text-xs text-end leading-[1.5rem] text-gray-500 cursor-pointer">
        <span>Forgot Password ?</span>
      </div>
      <div className="my-5">
        <button className="w-full py-2 bg-custom-blue text-white font-semibold rounded-md focus:ring-2 focus:outline-none disabled:opacity-75">
          Log In
        </button>
      </div>
    </form>
  );
}
