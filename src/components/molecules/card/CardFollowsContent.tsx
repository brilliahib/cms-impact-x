import { useState, useMemo, useRef } from "react";
import AtomFollowers from "@/components/atoms/followers/AtomFollowers";
import AtomFollowings from "@/components/atoms/followers/AtomFollowings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FollowUser } from "@/types/follow/follow";

interface CardFollowsByUsernameContentProps {
  followers: FollowUser[];
  followings: FollowUser[];
  currentUserUsername?: string;
  profileUsername: string;
}

export default function CardFollowsContent({
  followers,
  followings,
  currentUserUsername,
  profileUsername,
}: CardFollowsByUsernameContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const followersSearchRef = useRef<HTMLInputElement>(null);
  const followingsSearchRef = useRef<HTMLInputElement>(null);

  const filteredFollowers = useMemo(() => {
    if (!searchQuery.trim()) return followers;

    return followers.filter(
      (follower) =>
        follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (follower.university &&
          follower.university
            .toLowerCase()
            .includes(searchQuery.toLowerCase())),
    );
  }, [followers, searchQuery]);

  const filteredFollowings = useMemo(() => {
    if (!searchQuery.trim()) return followings;

    return followings.filter(
      (following) =>
        following.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        following.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (following.university &&
          following.university
            .toLowerCase()
            .includes(searchQuery.toLowerCase())),
    );
  }, [followings, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleTabChange = (value: string) => {
    setSearchQuery("");
    // Clear input values
    if (followersSearchRef.current) followersSearchRef.current.value = "";
    if (followingsSearchRef.current) followingsSearchRef.current.value = "";
  };

  return (
    <>
      <Tabs
        defaultValue="followers"
        className="mb-4"
        onValueChange={handleTabChange}
      >
        <TabsList className="flex gap-4">
          <TabsTrigger value="followers" className="rounded-4xl">
            Followers
          </TabsTrigger>
          <TabsTrigger value="followings" className="rounded-4xl">
            Followings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="followers">
          <Card className="min-h-96">
            <CardHeader>
              <div className="relative">
                <input
                  ref={followersSearchRef}
                  type="text"
                  placeholder="Search followers..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={handleSearch}
                />
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFollowers?.length > 0 ? (
                filteredFollowers.map((follower) => (
                  <AtomFollowers
                    key={follower.id}
                    name={follower.name}
                    username={follower.username}
                    isFollowed={follower.is_followed}
                    profileImage={follower.profile_images}
                    role={follower.role}
                    university={follower.university}
                    isCurrentUser={follower.username === currentUserUsername}
                    profileUsername={profileUsername}
                  />
                ))
              ) : (
                <div className="col-span-full py-8 text-center">
                  <p className="text-sm text-gray-500">
                    {searchQuery.trim()
                      ? `Tidak ada followers yang ditemukan untuk "${searchQuery}"`
                      : "Belum ada followers"}
                  </p>
                  {searchQuery.trim() && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        if (followersSearchRef.current)
                          followersSearchRef.current.value = "";
                      }}
                      className="mt-2 text-sm text-blue-500 hover:underline"
                    >
                      Hapus pencarian
                    </button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followings">
          <Card className="min-h-96">
            <CardHeader>
              <div className="relative">
                <input
                  ref={followingsSearchRef}
                  type="text"
                  placeholder="Search followings..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onChange={handleSearch}
                />
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFollowings?.length > 0 ? (
                filteredFollowings.map((following) => (
                  <AtomFollowings
                    key={following.id}
                    name={following.name}
                    username={following.username}
                    isFollowed={following.is_followed}
                    profileImage={following.profile_images}
                    role={following.role}
                    university={following.university}
                    isCurrentUser={following.username === currentUserUsername}
                    profileUsername={profileUsername}
                  />
                ))
              ) : (
                <div className="col-span-full py-8 text-center">
                  <p className="text-sm text-gray-500">
                    {searchQuery.trim()
                      ? `Tidak ada followings yang ditemukan untuk "${searchQuery}"`
                      : "Belum mengikuti siapapun"}
                  </p>
                  {searchQuery.trim() && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        if (followingsSearchRef.current)
                          followingsSearchRef.current.value = "";
                      }}
                      className="mt-2 text-sm text-blue-500 hover:underline"
                    >
                      Hapus pencarian
                    </button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
