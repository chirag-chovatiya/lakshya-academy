const StatusButton = () => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="hidden peer" />
        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-al peer-checked:bg-custom-blue"></div>
      </label>
    </div>
  );
};

export default StatusButton;
