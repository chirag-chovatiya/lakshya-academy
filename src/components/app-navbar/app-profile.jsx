export default function ProfileAvtara() {
  return (
    <div>
      <div className="relative group inline-block">
        <button
          type="button"
          className="inline-flex gap-2 m-0 md:border md:border-gray-300 md:bg-gray-100 items-center px-3 py-2 md:rounded-lg cursor-pointertext-gray-700  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          <img
            height={100}
            width={100}
            src="dummy.png"
            alt="Profile"
            className="h-8 w-8 rounded-full shadow"
          />
          <div className="hidden md:block ">
            <p className="">Lax</p>
          </div>
          <i className="las la-angle-down text-[15px]"></i>
        </button>
        <div className="opacity-0 m-0 w-full invisible transition-opacity duration-300 transform scale-95 group-hover:opacity-100 group-hover:visible group-hover:transform group-hover:scale-100 absolute z-[20] right-0  space-y-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  min-w-[100px]">
          <div className="px-1 py-1">
            <button className="flex text-left w-full bg-white hover:bg-gray-200 p-3 rounded-lg">
              Profile
            </button>
            <button
              type="button"
              className="flex text-left w-full bg-white hover:bg-gray-200 p-3 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
