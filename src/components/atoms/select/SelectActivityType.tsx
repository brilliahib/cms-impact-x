import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectActivityType() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select activity type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type Activity</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="project">Project</SelectItem>
          <SelectItem value="competition">Competition</SelectItem>
          <SelectItem value="volunteer">Volunteer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
