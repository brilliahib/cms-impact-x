"use client";

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
import { User } from "@/types/user/user";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchCommand() {
  const { data: session } = useSession();
  const token = session?.access_token as string;

  const { data, isPending, isError } = useGetUsers(token ?? "");
  const users: User[] = data?.data ?? [];

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (query.trim() !== "" && !open) {
      setOpen(true);
    }
  }, [query, open]);

  const filteredUsers = useMemo(() => {
    const term = query.toLowerCase();
    if (!Array.isArray(users)) return [];
    return users.filter(
      (user) =>
        user.first_name?.toLowerCase().includes(term) ||
        user.last_name?.toLowerCase().includes(term) ||
        user.username?.toLowerCase().includes(term),
    );
  }, [query, users]);

  if (isError) return <p>Failed to load users.</p>;

  return (
    <div className="relative w-full">
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
          {isPending ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-2 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
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
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}
