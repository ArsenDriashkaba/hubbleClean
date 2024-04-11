import { Dialog } from "@headlessui/react";
import { FC, ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSubmit: () => void;
  children?: ReactNode;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-white">
        <Dialog.Panel className="relative flex items-center justify-center w-full h-full border-gray-500">
          <Dialog.Title>Image crop demo</Dialog.Title>
          {children}
          <div className="absolute bottom-10">
            <button onClick={onSubmit}>Crop</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
