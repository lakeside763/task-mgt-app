import { PlusIcon } from "@heroicons/react/24/outline"
import { FC } from "react";

interface ModalButtonProps {
  toggleModal?: () => void;
  handleSubmit?: () => void;
  children: React.ReactNode;
}

const ModalButton: FC<ModalButtonProps> = ({ toggleModal, handleSubmit, children }) => {
  const handleClick = () => {
    if (toggleModal) {
      toggleModal();
    } else if (handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <div className="modal-button-wrapper">
        <button className="modal-button" onClick={handleClick}>
          <span className="flex justify-between px-3">
            <span className="flex">
              <PlusIcon className="size-6 mr-1 mt-0.5" />
              <span className="text-md mt-0.5">{children}</span>
            </span>
            <span className="flex">
              <div className="text-lg circle-icon text-white">N</div>
            </span>
          </span>
        </button>
      </div>
  )
}

export default ModalButton
