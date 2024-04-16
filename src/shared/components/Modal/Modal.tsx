import { Dialog } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { Button } from "../../elements";

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
          <div className="flex gap-3 absolute bottom-10">
            <Button variant="secondary" onClick={onSubmit}>
              Crop
            </Button>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
