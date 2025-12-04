import React from "react";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-950 border border-neutral-800 p-4 sm:p-6 rounded-xl w-full max-w-sm">
        <h2 className="text-base sm:text-lg font-semibold mb-2 text-white">{title}</h2>
        <p className="text-sm text-neutral-400 mb-6">
          {message}
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 sm:px-3 sm:py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors touch-manipulation text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2.5 sm:px-3 sm:py-1 rounded-md bg-white text-black hover:bg-neutral-200 transition-colors touch-manipulation text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDialog;
