const BottomModal = ({ show, onClose, children }: any) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
