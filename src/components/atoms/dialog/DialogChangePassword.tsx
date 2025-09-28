import FormChangePassword from "@/components/molecules/form/password/FormChangePassword";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogChangePasswordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogChangePassword({
  open,
  setOpen,
}: DialogChangePasswordProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <FormChangePassword />
      </DialogContent>
    </Dialog>
  );
}
