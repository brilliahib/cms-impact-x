"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CloudUpload,
  Plus,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  activitySchema,
  ActivityType,
} from "@/validators/activity/activity-validator";
import { useCreateActivity } from "@/http/activity/create-activity";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";

interface FormCreateActivityProps {
  setOpen: (open: boolean) => void;
}

export default function FormCreateActivity({
  setOpen,
}: FormCreateActivityProps) {
  const form = useForm<ActivityType>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      activity_type: "",
      activity_category: [],
      location: "",
      start_date: "",
      end_date: "",
      max_participants: undefined,
      description: "",
      requirements: "",
      benefits: "",
      images: undefined,
    },
    mode: "onChange",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        form.setValue("images", file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    [form],
  );

  const removeImagesHandler = () => {
    setImagePreview(null);
    form.setValue("images", null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const { mutate: createActivityHandlers, isPending } = useCreateActivity({
    onError: () => {
      toast.error("Failed to create activity. Please try again.");
    },
    onSuccess: () => {
      toast.success("Successfully created a new activity!");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["activity-user"] });
    },
  });

  const onSubmit = (body: ActivityType) => {
    createActivityHandlers(body);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g., Website Redesign, Innovation Challenge, Community Service"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="activity_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Activity Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) =>
                        form.setValue("activity_type", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select activity type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="competition">Competition</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activity_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { value: "science", label: "Science & Research" },
                        { value: "math", label: "Mathematics" },
                        {
                          value: "technology",
                          label: "Technology & Innovation",
                        },
                        { value: "engineering", label: "Engineering" },
                        {
                          value: "business",
                          label: "Business & Entrepreneurship",
                        },
                        { value: "economics", label: "Economics" },
                        { value: "law", label: "Law & Debate" },
                        { value: "medicine", label: "Medical & Health" },
                        { value: "social", label: "Social & Humanities" },
                        { value: "arts", label: "Arts & Design" },
                        { value: "music", label: "Music & Performance" },
                        { value: "literature", label: "Literature & Writing" },
                        { value: "sports", label: "Sports & E-Sports" },
                        {
                          value: "environment",
                          label: "Environment & Sustainability",
                        },
                        {
                          value: "volunteer",
                          label: "Volunteer / Community Service",
                        },
                        { value: "competition", label: "General Competition" },
                      ]}
                      value={field.value}
                      onValueChange={(values) => field.onChange(values)}
                      placeholder="Select activity category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>
                  Images <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div>
                    <div
                      {...getRootProps()}
                      className={`border-primary bg-primary/10 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed py-8 ${
                        isDragActive ? "border-gray-300" : "border-gray-300"
                      }`}
                    >
                      <Input {...getInputProps()} />
                      {imagePreview ? (
                        <div className="relative flex w-full justify-center">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-[200px] w-fit rounded-lg object-cover"
                            width={1000}
                            height={1000}
                          />
                          <Button
                            className="absolute top-2 right-2 px-3 shadow-lg"
                            variant="destructive"
                            onClick={removeImagesHandler}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : isDragActive ? (
                        <p className="text-blue-500">Drop images here ...</p>
                      ) : (
                        <div className="space-y-4 py-4 text-center">
                          <CloudUpload className="text-primary mx-auto h-10 w-10" />
                          <div>
                            <p className="text-sm">
                              Drag & drop images here, or click to select
                            </p>
                            <p className="text-sm">(maximum image size 2 MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Location <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter the activity location (or Remote)."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="start_date"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Date Range <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !(
                              form.watch("start_date") && form.watch("end_date")
                            ) && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                          {form.watch("start_date") &&
                          form.watch("end_date") ? (
                            <>
                              {format(
                                new Date(form.watch("start_date")),
                                "PPP",
                              )}{" "}
                              -{" "}
                              {format(new Date(form.watch("end_date")), "PPP")}
                            </>
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        numberOfMonths={2}
                        selected={{
                          from: form.watch("start_date")
                            ? new Date(form.watch("start_date"))
                            : undefined,
                          to: form.watch("end_date")
                            ? new Date(form.watch("end_date"))
                            : undefined,
                        }}
                        onSelect={(range) => {
                          form.setValue(
                            "start_date",
                            range?.from ? format(range.from, "yyyy-MM-dd") : "",
                          );
                          form.setValue(
                            "end_date",
                            range?.to ? format(range.to, "yyyy-MM-dd") : "",
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max_participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Max Participants <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Limit the number of participants"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value),
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a brief description…"
                    {...field}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Requirements <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Certificate, Networking, New Skills"
                    {...field}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benefits (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Certificate, Networking, New Skills"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    value={field.value ?? ""}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Share"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
