import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
function Modal({
  modalProps,
  children,
  ...props
}: {
  modalProps: ModalProps;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Dialog
        open={modalProps.isOpen}
        onClose={() => modalProps.setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 rou">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-xl">
            <DialogTitle className="font-bold">{modalProps.title}</DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;
