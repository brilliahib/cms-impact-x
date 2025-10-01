import AlertDialogApproveRegistration from "@/components/atoms/alert-dialog/activity/registration/AlertDialogApproveRegistration";
import AlertDialogDeclineRegistration from "@/components/atoms/alert-dialog/activity/registration/AlertDialogDeclineRegistration";
import SearchInput from "@/components/atoms/search/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllActivityRegistration } from "@/http/activity/registrations/get-all-activity-registration";
import { useUpdateActivityRegistration } from "@/http/activity/registrations/update-activity-registration";
import { buildFromAppURL } from "@/utils/misc";
import { useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface CardListDetailActivityProps {
  id: number;
}

export default function CardListDetailActivity({
  id,
}: CardListDetailActivityProps) {
  const { data: session } = useSession();

  const { data, isPending } = useGetAllActivityRegistration(
    id,
    session?.access_token as string,
    {
      enabled: session?.access_token ? true : false,
    },
  );

  const [open, setOpen] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const updateRegistration = useUpdateActivityRegistration(selectedId ?? 0, {
    onSuccess: (_, variables) => {
      if (variables.status === "accepted") {
        toast.success("Successfully approved this participant!");
      } else if (variables.status === "rejected") {
        toast.success("Successfully rejected this participant!");
      }

      setOpen(false);
      setOpenDecline(false);

      queryClient.invalidateQueries({
        queryKey: ["get-detail-activity", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-all-activity-registration", id],
      });
    },
    onError: (_, variables) => {
      if (variables?.status === "accepted") {
        toast.error("Failed to approve this participant!");
      } else if (variables?.status === "rejected") {
        toast.error("Failed to reject this participant!");
      }
    },
  });

  const handleApprove = (registrationId: number) => {
    setSelectedId(registrationId);
    setOpen(true);
  };

  const handleDecline = (registrationId: number) => {
    setSelectedId(registrationId);
    setOpenDecline(true);
  };

  const confirmApprove = () => {
    if (!selectedId) return;
    updateRegistration.mutate({
      status: "accepted",
    });
  };

  const confirmDecline = () => {
    if (!selectedId) return;
    updateRegistration.mutate({
      status: "rejected",
    });
  };

  return (
    <>
      <Card>
        <CardContent className="space-y-6">
          <SearchInput placeholder="Search People..." fullWidth />
          <div className="space-y-0">
            {isPending
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Card
                    key={idx}
                    className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none"
                  >
                    <CardContent className="flex justify-between gap-4 px-2">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                          <Skeleton className="h-[50px] w-[50px] rounded-full" />
                          <div className="flex flex-col gap-2 text-sm">
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="h-3 w-[180px]" />
                          </div>
                        </div>
                        <div className="ml-14 flex flex-row gap-2">
                          <Skeleton className="h-8 w-[90px] rounded-md" />
                          <Skeleton className="h-8 w-[90px] rounded-md" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : data?.data.map((registration) => (
                  <Card
                    className="hover:bg-background rounded-none! border-0 border-t border-b py-4 shadow-none"
                    key={registration.id}
                  >
                    <CardContent className="flex justify-between gap-4 px-2">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src={
                              registration?.user.profile.profile_images
                                ? buildFromAppURL(
                                    registration.user.profile.profile_images,
                                  )
                                : "/images/profile/profile-2d.png"
                            }
                            alt={registration?.user.name ?? "Profile User"}
                            width={50}
                            height={50}
                            className="rounded-full border"
                          />
                          <div className="flex flex-col gap-1 text-sm">
                            <p className="font-medium">
                              {registration.user.name}
                            </p>
                            {registration.user.profile.role &&
                              registration.user.profile.university && (
                                <div className="text-muted-foreground flex flex-row gap-1">
                                  <p>{registration.user.profile.role}</p>
                                  <span className="opacity-30">|</span>
                                  <p>{registration.user.profile.university}</p>
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="ml-14 flex flex-row gap-2">
                          <Button
                            variant={"default"}
                            size={"sm"}
                            onClick={() => handleApprove(registration.id)}
                          >
                            <Check />
                            Approve
                          </Button>
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            className="text-red-600 hover:bg-red-100 hover:text-red-600"
                            onClick={() => handleDecline(registration.id)}
                          >
                            <X color="red" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialogApproveRegistration
        open={open}
        setOpen={setOpen}
        confirmApprove={confirmApprove}
        isPending={updateRegistration.isPending}
      />

      <AlertDialogDeclineRegistration
        open={openDecline}
        setOpen={setOpenDecline}
        confirmDecline={confirmDecline}
        isPending={updateRegistration.isPending}
      />
    </>
  );
}
