import AlertDialogCreateRegistration from "@/components/atoms/alert-dialog/activity/registration/AlertDialogCreateRegistration";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateRegistration } from "@/http/activity/registrations/create-registration";
import { useGetCheckApplyRegistration } from "@/http/activity/registrations/get-check-apply-registration";
import { useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface CardApplyActivityDetailProps {
  id: number;
}

export default function CardApplyActivityDetail({
  id,
}: CardApplyActivityDetailProps) {
  const { data: session } = useSession();

  const { data: check } = useGetCheckApplyRegistration(
    id ?? 0,
    (session?.access_token as string) ?? "",
    {
      enabled: !!id && !!session?.access_token,
    },
  );

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const createRegistration = useCreateRegistration({
    onSuccess: () => {
      toast.success("Successfully applied this activity!");
      setOpen(false);
      if (id) {
        queryClient.invalidateQueries({
          queryKey: ["get-check-apply-registration", id],
        });
      }
    },
    onError: () => {
      toast.error("Failed to apply this activity!");
    },
  });

  const handleApply = () => {
    setOpen(true);
  };

  const confirmApply = () => {
    if (!id) return;
    createRegistration.mutate({
      activity_id: id,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Apply this Activity</CardTitle>
          <CardDescription>
            Make sure you have reviewed the requirements and details before
            submitting your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleApply}
            disabled={check?.data.applied}
            className="w-full"
          >
            {check?.data.applied ? "Applied" : "Apply Now"} <Send />
          </Button>
        </CardContent>
      </Card>

      <AlertDialogCreateRegistration
        open={open}
        setOpen={setOpen}
        confirmRegistration={confirmApply}
        isPending={createRegistration.isPending}
      />
    </>
  );
}
