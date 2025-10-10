"use client";

import { useState, useMemo } from "react";
import SearchInput from "@/components/atoms/search/SearchInput";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user/user";
import { buildFromAppURL } from "@/utils/misc";

interface CardSearchHomeProps {
  data?: User[];
}

export default function CardSearchHome({ data = [] }: CardSearchHomeProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!Array.isArray(data)) return [];
    return data.filter(
      (user) =>
        user.first_name?.toLowerCase().includes(term) ||
        user.last_name?.toLowerCase().includes(term) ||
        user.username?.toLowerCase().includes(term),
    );
  }, [searchTerm, data]);

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-4 p-4">
        <SearchInput
          placeholder="Search Friends..."
          fullWidth
          value={searchTerm}
          onChange={(value) => setSearchTerm(value)}
        />

        <div className="flex flex-col gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      user?.profile?.profile_images
                        ? buildFromAppURL(user.profile.profile_images)
                        : "/images/profile/profile-2d.png"
                    }
                    alt={`${user.first_name} ${user.last_name}`}
                    width={50}
                    height={50}
                    className="min-h-[50px] min-w-[50px] rounded-full border object-cover"
                  />
                  <div>
                    <Link
                      href={`/profile/${user.username}`}
                      className="hover:underline"
                    >
                      <h1 className="text-sm font-medium">
                        {user.first_name} {user.last_name}
                      </h1>
                    </Link>
                    {user.profile?.university && (
                      <span className="text-muted-foreground text-sm">
                        {user.profile.university}
                      </span>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              {searchTerm
                ? "No users found for your search."
                : "Start typing to search for friends."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
