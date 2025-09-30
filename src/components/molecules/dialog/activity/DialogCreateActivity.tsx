import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormCreateActivity from "../../form/activity/FormCreateActivity";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DialogCreateActivityProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateActivity({
  open,
  setOpen,
}: DialogCreateActivityProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-4xl!">
        <DialogHeader>
          <DialogTitle>Create Activity</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] w-full">
          <FormCreateActivity setOpen={setOpen} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
