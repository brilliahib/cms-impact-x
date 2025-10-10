import FormCreateActivityChat from "@/components/molecules/form/activity/chats/FormCreateActivityChat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogCreateActivityChatProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export default function DialogCreateActivityChat({
  open,
  setOpen,
  id,
}: DialogCreateActivityChatProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Send Message on This Activity</DialogTitle>
        </DialogHeader>
        <FormCreateActivityChat setOpen={setOpen} id={id} />
      </DialogContent>
    </Dialog>
  );
}
