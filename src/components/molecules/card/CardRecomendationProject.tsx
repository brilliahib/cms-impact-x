import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardRecomendationProject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendation Project</CardTitle>
        <CardDescription>
          Build your portfolio by working on projects.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Card className="p-2">
            <CardContent className="space-y-2 p-2">
              <div className="flex justify-between">
                <h1 className="text-sm font-medium">Nama Project</h1>
                <Badge className="rounded-full bg-green-500/20 text-green-500">
                  1/4
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="text-muted-foreground">
                  Category 1
                </Badge>
                <Badge variant={"secondary"} className="text-muted-foreground">
                  Category 1
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="p-2">
            <CardContent className="space-y-2 p-2">
              <div className="flex justify-between">
                <h1 className="text-sm font-medium">Nama Project</h1>
                <Badge className="rounded-full bg-green-500/20 text-green-500">
                  1/4
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="text-muted-foreground">
                  Category 1
                </Badge>
                <Badge variant={"secondary"} className="text-muted-foreground">
                  Category 1
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="p-2">
            <CardContent className="space-y-2 p-2">
              <div className="flex justify-between">
                <h1 className="text-sm font-medium">Nama Project</h1>
                <Badge className="rounded-full bg-green-500/20 text-green-500">
                  1/4
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={"secondary"} className="text-muted-foreground">
                  Category 1
                </Badge>
                <Badge variant={"secondary"} className="text-muted-foreground">
                  Category 1
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
