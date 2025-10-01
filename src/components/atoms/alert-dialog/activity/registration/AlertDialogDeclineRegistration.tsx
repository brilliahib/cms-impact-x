import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogDeclineRegistrationProps {
  confirmDecline: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const AlertDialogDeclineRegistration = ({
  open,
  setOpen,
  confirmDecline,
  isPending,
}: AlertDialogDeclineRegistrationProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rejected this participant?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject this participant? This action will
            remove the participant from your activity.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={confirmDecline}
            className="bg-red-600 text-white hover:bg-red-400"
          >
            Decline
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDeclineRegistration;
