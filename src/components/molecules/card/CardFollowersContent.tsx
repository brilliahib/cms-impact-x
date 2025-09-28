import AtomFollowers from "@/components/atoms/followers/AtomFollowers";
import SearchInput from "@/components/atoms/search/SearchInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardFollowersContent() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bagus Tri Atmojo&apos; Followers</CardTitle>
          <CardDescription>People You May Know</CardDescription>
          <CardAction>
            <SearchInput placeholder="Search People..." />
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-10">
          <AtomFollowers />
          <AtomFollowers />
          <AtomFollowers />
          <AtomFollowers />
          <AtomFollowers />
          <AtomFollowers />
          <AtomFollowers />
          <AtomFollowers />
        </CardContent>
        <CardFooter className="mx-auto">
          <Button variant={"ghost"}>Load More</Button>
        </CardFooter>
      </Card>
    </>
  );
}
