import React from "react";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1  rounded-md bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDialog;
