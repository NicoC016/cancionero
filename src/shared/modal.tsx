import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ModalProps } from "@/models/modal.dto";



export function Modal({ children,title , isOpen, onClose }: ModalProps) {
    const closeModal = () =>{
        onClose();
    }
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {!open && closeModal()}}>
      	<DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        	<DialogHeader className="shrink-0 border-b border-border pb-4">
            	<DialogTitle className="capitalize font-serif text-2xl text-foreground mb-2">
              		{title}
            	</DialogTitle>
        	</DialogHeader>
			{children}
      	</DialogContent>
    </Dialog>
  )
}
