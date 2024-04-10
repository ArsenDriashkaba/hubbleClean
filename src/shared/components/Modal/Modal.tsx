import { Dialog } from "@headlessui/react";
import { FC, ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children?: ReactNode;
};

export const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-white">
        <Dialog.Panel className="flex items-center justify-center">
          <Dialog.Title>Image crop demo</Dialog.Title>
          <div className="m-auto">{children}</div>
          <button
            className="absolute bottom-10"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
