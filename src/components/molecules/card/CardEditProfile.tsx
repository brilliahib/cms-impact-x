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
          Informasi profilmu akan muncul saat berinteraksi dengan orang lain.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-w-3xl">
        <FormEditProfile />
      </CardContent>
    </Card>
  );
}
