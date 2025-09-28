import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function MessageInput() {
  return (
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
          <Textarea placeholder="Write something to share with others..." />
        </div>
      </CardContent>
    </Card>
  );
}
