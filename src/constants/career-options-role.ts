export type CareerRoleCategory =
  | "Role 1"
  | "Role 2"
  | "Role 3"
  | "Role 4"
  | "Other";

export interface CareerRoleOption {
  label: string;
  value: Exclude<CareerRoleCategory, "Other">;
}

export const CareerOptionsRole: CareerRoleOption[] = [
  { label: "Role 1", value: "Role 1" },
  { label: "Role 2", value: "Role 2" },
  { label: "Role 3", value: "Role 3" },
  { label: "Role 4", value: "Role 4" },
];
