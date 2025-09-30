"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CardSecurityProfile() {
  const [isDialogChangePasswordOpen, setIsDialogChangePasswordOpen] =
    useState(false);

  const handleDialogChangePasswordOpen = () => {
    setIsDialogChangePasswordOpen(true);
  };
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Security & Privacy</CardTitle>
          <CardDescription>
            Manage your account settings to keep your profile safe.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-3xl">
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bbagustrm@gmail.com"
                  required
                  disabled
                />
                <p className="text-muted-foreground text-sm">
                  Your email will be used as your username when posting comments
                  and reviews.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  disabled
                />
                <p className="text-muted-foreground text-sm">
                  Regularly update your password to keep your account secure.{" "}
                  {""}
                  <span
                    className="cursor-pointer font-medium text-[#0EA5E9]"
                    onClick={handleDialogChangePasswordOpen}
                  >
                    Change Password
                  </span>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* {isDialogChangePasswordOpen && (
        <DialogChangePassword
          open={isDialogChangePasswordOpen}
          setOpen={setIsDialogChangePasswordOpen}
        />
      )} */}
    </>
  );
}
