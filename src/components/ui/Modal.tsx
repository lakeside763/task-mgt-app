import { XMarkIcon } from "@heroicons/react/24/outline";


const Modal = ({ children, title, isOpen, onClose }: any) => {
  return (
    isOpen && (
      <div className="center-modal-wrapper">
        <div className="center-modal-content">
          <div className="modal-header">
            <h2 className="text-2xl font-light">{title}</h2>
            <button className="close-button" onClick={onClose}>
              <XMarkIcon className="size-7" />
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {/* <div className="modal-footer">
            <button onClick={onClose}>Close</button>
          </div> */}
        </div>
      </div>
    )
  );
};

export default Modal;
