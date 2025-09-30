import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import DialogCreateFeed from "../dialog/feeds/DialogCreateFeed";

export default function MessageInput() {
  const [isDialogCreateFeedOpen, setIsDialogCreateFeedOpen] = useState(false);

  const handleDialogCreateFeedOpen = () => {
    setIsDialogCreateFeedOpen(true);
  };

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
              onClick={handleDialogCreateFeedOpen}
            />
          </div>
        </CardContent>
      </Card>

      <DialogCreateFeed
        open={isDialogCreateFeedOpen}
        setOpen={setIsDialogCreateFeedOpen}
      />
    </>
  );
}
