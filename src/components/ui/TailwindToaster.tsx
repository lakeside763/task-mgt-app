import { Transition } from "@headlessui/react";
import { Toaster, ToastBar } from "react-hot-toast";

const TailwindToaster = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          enter="transform transition duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transform transition duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className="flex items-center p-4 bg-white rounded shadow-lg">
                {icon}
                <p className="px-2">{message}</p>
              </div>
            )}
          </ToastBar>
        </Transition>
      )}
    </Toaster>
  );
};

export default TailwindToaster;

