export const DEFAULT_MODAL_CONFIG = {
  visible: false,
  displayHeader: false,
  title: "Default Title",
  displayDefualtBtn: false,
  cancelBtnText: "Decline",
  okBtnText: "Continue",
};

export default function HomeModal({
  config = DEFAULT_MODAL_CONFIG,
  onOkBtnClick = () => {
    onCloseModal();
  },
  onCancelBtnClick = () => {
    onCloseModal();
  },
  onCloseModal = () => {},
  component = null,
  isModal = true,
}) {
  if (!isModal) return component;

  return (
    <>
      {config?.visible && (
        <>
          <div
            key="main-div"
            className={
              isModal
                ? "block overflow-auto fixed top-0 right-0 left-0 z-999 justify-center items-center w-auto md:w-full h-auto md:h-full"
                : ""
            }
          >
            <div className="flex items-center md:items-end justify-center h-auto md:h-full">
              <div className="m-3 relative w-auto md:w-full bg-white shadow-md rounded-lg">
                <div
                  className={`relative ${
                    isModal ? "shadow md:rounded-lg" : "border-t"
                  }`}
                >
                  {config.displayHeader && (
                    <div className="flex justify-end">
                      <div className="absolute z-9  rounded-t">
                        <button
                          onClick={() => onCancelBtnClick()}
                          type="button"
                          className="bg-gray-300 text-gray-900 rounded-lg text-sm w-8 h-8 m-4 flex items-center justify-center"
                        >
                          <i className="las la-times"></i>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4 h-full overflow-y-auto rounded-lg">
                    {component}
                  </div>
                  {config.displayDefualtBtn && (
                    <div className="flex items-center p-4 border-t border-gray-200 rounded-b bg-gray-100">
                      <button
                        onClick={() => onOkBtnClick()}
                        type="button"
                        className="text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        {config.okBtnText}
                      </button>
                      <button
                        onClick={() => onCancelBtnClick()}
                        type="button"
                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                      >
                        {config.cancelBtnText}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isModal && <div className="bg-gray-900/50 fixed inset-0 z-40"></div>}
        </>
      )}
    </>
  );
}
