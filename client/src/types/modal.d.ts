export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateModalProps extends ModalProps {
  onCreate: () => void;
}

export interface DeleteModalProps extends ModalProps {
  onDelete: () => void;
}

export interface UpdateModalProps extends ModalProps, Task {
  onUpdate: () => void;
}