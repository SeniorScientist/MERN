export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateModalProps extends ModalProps {
  onCreate?: (e) => {};
}

export interface DeleteModalProps extends ModalProps {
  onDelete: () => void;
}

export interface UpdateModalProps extends ModalProps, Task {
  onUpdate: () => void;
}