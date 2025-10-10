"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DialogCreateActivityChat from "../dialog/activity/chats/DialogCreateActivityChat";

interface MessageChatRoomProps {
  id: number;
}

export default function MessageChatRoom({ id }: MessageChatRoomProps) {
  const [isDialogCreateActivityChatOpen, setIsDialogCreateActivityChatOpen] =
    useState(false);

  const { data: session, status } = useSession();

  const handleDialogCreateActivityChatOpen = () => {
    setIsDialogCreateActivityChatOpen(true);
  };

  if (!session && status !== "loading") {
    return null;
  }

  return (
    <>
      <Card>
        <CardContent>
          <div className="flex items-center gap-3">
            <Image
              src={"/images/profile/profile-2d.png"}
              alt="Profile Dummy"
              className="rounded-full"
              width={50}
              height={50}
            />
            <Textarea
              placeholder="Write something to share with others..."
              onClick={handleDialogCreateActivityChatOpen}
            />
          </div>
        </CardContent>
      </Card>

      <DialogCreateActivityChat
        open={isDialogCreateActivityChatOpen}
        setOpen={setIsDialogCreateActivityChatOpen}
        id={id}
      />
    </>
  );
}
