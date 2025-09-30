import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormCreateFeed from "../../form/feeds/FormCreateFeed";

interface DialogCreateFeedProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateFeed({
  open,
  setOpen,
}: DialogCreateFeedProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Feed</DialogTitle>
        </DialogHeader>
        <FormCreateFeed setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
