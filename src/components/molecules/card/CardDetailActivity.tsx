import SearchInput from "@/components/atoms/search/SearchInput";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardDetailActivity() {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
          <div className="space-y-2">
            <CardTitle>Activity Detail</CardTitle>
            <CardDescription>People involved in this activity</CardDescription>
          </div>
          <SearchInput placeholder="Search People..." />
        </div>
      </CardHeader>
    </Card>
  );
}
