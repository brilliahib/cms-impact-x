import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormEditProfile from "../form/profile/FormEditProfile";

export default function CardEditProfile() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Your profile information will appear when interacting with others.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-3xl">
        <FormEditProfile />
      </CardContent>
    </Card>
  );
}
