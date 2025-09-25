import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function FormEditProfile() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <div className="grid gap-4 md:grid-cols-1 md:grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" type="text" placeholder="Bagus" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                type="text"
                placeholder="Tri Atmojo"
                required
              />
            </div>
          </div>
          <span className="text-muted-foreground text-sm">
            Your name will appear when you post comments and reviews.
          </span>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="bbagustrm" required />
          <span className="text-muted-foreground text-sm">
            Your name will appear when you post comments and reviews.
          </span>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="job-title">Job Title</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your job title" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Job Title</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-muted-foreground text-sm">
            Tell us about your current role
          </span>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="current-education">Current Education</Label>
          <Input
            id="current-education"
            type="text"
            placeholder="e.g., Computer Engineering, Diponegoro University"
            required
          />
          <span className="text-muted-foreground text-sm">
            Show your current education background.
          </span>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="about-description">About Description</Label>
          <Textarea
            id="about-description"
            placeholder="Write a short description about yourself..."
            required
          />
          <span className="text-muted-foreground text-sm">
            Show your current education background.
          </span>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="contact-info">Contact Info</Label>
          <div className="flex items-center gap-2">
            <Input
              id="contact-info"
              type="text"
              placeholder="Enter your contact (email, WhatsApp, or social media link)"
              required
            />
            <Button variant={"outline"}>
              <Plus />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="contact-info"
              type="text"
              placeholder="Enter your contact (email, WhatsApp, or social media link)"
              required
            />
            <Button variant={"outline"}>
              <Plus />
            </Button>
          </div>
          <span className="text-muted-foreground text-sm">
            Your contact will help others connect with you.
          </span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <Button>Save Profile</Button>
        </div>
      </div>
    </form>
  );
}
