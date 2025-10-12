import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormUpdateFeed from "../../form/feeds/FormUpdateFeed";

interface DialogEditFeedProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export default function DialogEditFeed({
  open,
  setOpen,
  id,
}: DialogEditFeedProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Feed</DialogTitle>
        </DialogHeader>
        <FormUpdateFeed id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
