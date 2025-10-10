"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useGetUsers } from "@/http/user/get-users";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import SearchInput from "@/components/atoms/search/SearchInput";
import Image from "next/image";
import Link from "next/link";
import { buildFromAppURL } from "@/utils/misc";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user/user";

export default function SearchCommand() {
  const { data: session } = useSession();
  const token = session?.access_token as string;

  const { data, isPending, isError } = useGetUsers(token ?? "");
  const users: User[] = data?.data ?? [];

  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // buka dialog saat pertama kali user mulai mengetik
  React.useEffect(() => {
    if (query.trim() !== "" && !open) {
      setOpen(true);
    }
  }, [query, open]);

  // filter hasil user sesuai input
  const filteredUsers = React.useMemo(() => {
    const term = query.toLowerCase();
    if (!Array.isArray(users)) return [];
    return users.filter(
      (user) =>
        user.first_name?.toLowerCase().includes(term) ||
        user.last_name?.toLowerCase().includes(term) ||
        user.username?.toLowerCase().includes(term),
    );
  }, [query, users]);

  if (isPending) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  return (
    <div className="relative w-full">
      {/* Input utama */}
      <SearchInput
        placeholder="Search friends..."
        value={query}
        onChange={(val) => {
          setQuery(val);
          if (!open && val.trim() !== "") setOpen(true);
        }}
        fullWidth
      />

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Type a username to search..."
        />
        <CommandList>
          <CommandEmpty>
            {query ? "No users found." : "Start typing to search."}
          </CommandEmpty>

          <CommandGroup heading="Users">
            {filteredUsers.map((user) => (
              <CommandItem
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
                    width={40}
                    height={40}
                    className="min-h-[40px] min-w-[40px] rounded-full border object-cover"
                  />
                  <div>
                    <Link
                      href={`/profile/${user.username}`}
                      className="hover:underline"
                    >
                      <p className="text-sm font-medium">
                        {user.first_name} {user.last_name}
                      </p>
                    </Link>
                    {user.profile?.university && (
                      <span className="text-muted-foreground text-xs">
                        {user.profile.university}
                      </span>
                    )}
                  </div>
                </div>
                {/* <Button variant="outline" size="sm">
                  Follow
                </Button> */}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
