import AtomFollowers from "@/components/atoms/followers/AtomFollowers";
import AtomFollowings from "@/components/atoms/followers/AtomFollowings";
import SearchInput from "@/components/atoms/search/SearchInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CardFollowingByUsernameContent() {
  return (
    <>
      <Tabs defaultValue="followers" className="mb-4">
        <TabsList>
          <TabsTrigger value="followers" className="rounded">
            Followers
          </TabsTrigger>
          <TabsTrigger value="followings" className="rounded">
            Followings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="followers">
          <Card>
            <CardHeader>
              <SearchInput placeholder="Search People..." />
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <AtomFollowings />
              <AtomFollowers />
              <AtomFollowers />
              <AtomFollowers />
            </CardContent>
            <CardFooter className="mx-auto">
              <Button variant={"ghost"}>Load More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="followings">
          <Card>
            <CardHeader>
              <SearchInput placeholder="Search People..." />
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <AtomFollowings />
              <AtomFollowings />
              <AtomFollowers />
              <AtomFollowers />
              <AtomFollowers />
              <AtomFollowers />
            </CardContent>
            <CardFooter className="mx-auto">
              <Button variant={"ghost"}>Load More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
