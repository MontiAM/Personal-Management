import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

function SideDrawer({ isVisible, onClose, title, children, onCLick }) {
  return (
    <>
      <button
        className="fixed top-1/3 right-0 z-20 bg-blue-500 text-white p-2 rounded-l-lg shadow-lg hover:bg-blue-600"
        onClick={onCLick}
      >
        <MenuOutlined />
      </button>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-950 bg-opacity-90 shadow-lg z-10 transition-transform duration-300 ease-in-out ${
          isVisible ? "transform translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 pt-16 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-lg font-semibold uppercase">
              {title}
            </h2>
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <CloseOutlined />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
