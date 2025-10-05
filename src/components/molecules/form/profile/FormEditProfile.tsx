"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { universities } from "@/constants/university";
import { useGetProfileUser } from "@/http/profile/get-profile-user";
import { useUpdateProfileUser } from "@/http/profile/update-profile-user";
import { cn } from "@/lib/utils";
import { generateFallbackFromName } from "@/utils/generate-name";
import { buildFromAppURL } from "@/utils/misc";
import {
  updateUserAndProfileSchema,
  UpdateUserAndProfileType,
} from "@/validators/profile/update-profile-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FieldArrayPath, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormEditProfile() {
  const { data: session, status } = useSession();
  const { data } = useGetProfileUser(session?.access_token as string, {
    enabled: status === "authenticated" && !!session?.access_token,
  });

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const defaultValues = useMemo<UpdateUserAndProfileType>(() => {
    return {
      first_name: session?.user?.first_name || "",
      last_name: session?.user.last_name || "",
      username: session?.user.username || "",
      about_description: data?.data.about_description || "",
      role: data?.data.role || "",
      university: data?.data.university || "",
      major: data?.data.major || "",
      contact_info: data?.data.contact_info || [],
      skills: data?.data.skills || [],
      profile_images: null,
    };
  }, [data]);

  const form = useForm<UpdateUserAndProfileType>({
    resolver: zodResolver(updateUserAndProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(defaultValues);
      if (data.data.profile_images) {
        setPreview(buildFromAppURL(data.data.profile_images));
      }
    }
  }, [data, defaultValues, form]);

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray<UpdateUserAndProfileType>({
    control: form.control,
    name: "contact_info" as FieldArrayPath<UpdateUserAndProfileType>,
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray<UpdateUserAndProfileType>({
    control: form.control,
    name: "skills" as FieldArrayPath<UpdateUserAndProfileType>,
  });

  const router = useRouter();

  const { mutate: editProfileUserHandler, isPending } = useUpdateProfileUser({
    onError: () => {
      toast.error("Failed to edit profile information!");
    },
    onSuccess: () => {
      toast.success("Successfully edited profile information!");
      router.push("/profile");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleRemovePhoto = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (body: UpdateUserAndProfileType) => {
    editProfileUserHandler({
      ...body,
      profile_images: file ?? null,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Avatar className="h-24 w-24">
              {preview ? (
                <AvatarImage src={preview} alt="Profile preview" />
              ) : (
                <AvatarFallback className="border-0 text-gray-700">
                  {generateFallbackFromName(session?.user.first_name ?? "")}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Photo
              </Button>
              {preview && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemovePhoto}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-4 md:grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <span className="text-muted-foreground text-sm">
              Your name will appear when you post comments and reviews.
            </span>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your role"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? universities.find((uni) => uni === field.value)
                          : "Select University..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search university..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No university found.</CommandEmpty>
                          <CommandGroup>
                            {universities.map((uni) => (
                              <CommandItem
                                key={uni}
                                value={uni}
                                onSelect={(currentValue) => {
                                  field.onChange(currentValue);
                                  setOpen(false);
                                }}
                              >
                                {uni}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    field.value === uni
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your major"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a short description about yourself..."
                    className="resize-none"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_info"
            render={() => (
              <FormItem>
                <FormLabel>Contact Info</FormLabel>
                <div className="space-y-2">
                  {contactFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...form.register(`contact_info.${index}` as const)}
                          placeholder="Enter your contact (email, WhatsApp, or social media link)"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeContact(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendContact("")}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={() => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <div className="space-y-2">
                  {skillFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...form.register(`skills.${index}` as const)}
                          placeholder="Enter a skill (e.g., JavaScript, Python)"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => appendSkill("")}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-start gap-2">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Loading..." : "Save Profile"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
