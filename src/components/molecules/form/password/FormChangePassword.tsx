import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormChangePassword() {
  return (
    <form className="mt-4">
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Current Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-3">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Confirm New Password</Label>
            <Input id="password" type="password" required />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Change Password</Button>
        </div>
      </div>
    </form>
  );
}
