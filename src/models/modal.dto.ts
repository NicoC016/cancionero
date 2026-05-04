export interface ModalProps {
    children: any;
    isOpen: boolean;
    title:string;
    onClose: () => void;
}