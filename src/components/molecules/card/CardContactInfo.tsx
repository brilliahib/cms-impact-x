import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";

export default function CardContactInfo() {
  return (
    <Card className="mb-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Contact Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Link className="h-5 w-5 shrink-0" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sky-600">
            bbagustrm@gmail.com
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link className="h-5 w-5 shrink-0" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sky-600">
            https://www.instagram.com/bagustriatmojo_/
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link className="h-5 w-5 shrink-0" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sky-600">
            https://www.linkedin.com/in/bbagustrm/
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link className="h-5 w-5 shrink-0" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sky-600">
            https://github.com/bbagustrm
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
