"use client";
import Image from "next/image";

import { PenLine, Upload, LoaderCircle, Check, ShieldX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import TextEditor from "../../_components/dashboard/text-editor";
import { useState } from "react";
import { api } from "@/trpc/react";

type formDataType = z.infer<typeof formSchema>;

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(300),
  // category: z.string(),
  status: z.enum(["ARCHIVE", "PUBLISHED", "UNPUBLISHED"]),
  // content: z.string().min(1),
});

export default function Write() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "ARCHIVE",
      // content: "",
    },
  });
  const [articleContent, setArticleContent] = useState("");

  const onChangeContents = (data: string) => {
    setArticleContent(data);
  };
  const [submitStatus, setSubmitStatus] = useState(false);
  const createArticle = api.article.create.useMutation({
    onSuccess: () => {
      setSubmitStatus(false);
      form.reset();
      setArticleContent("");
      toast({
        description: (
          <div className="flex space-x-2">
            <Check className="h-6 w-6 text-green-600" />
            <span>create article is sucess!</span>
          </div>
        ),
      });
    },
    onError: (err) => {
      setSubmitStatus(false);
      console.log(err);
      toast({
        description: (
          <div className="flex space-x-2">
            <ShieldX className="h-6 w-6 text-red-600" />
            <span>create article is failed! Please check your input</span>
          </div>
        ),
      });
    },
  });

  const onSubmit = (data: formDataType) => {
    setSubmitStatus(true);
    const { title, status } = data;
    createArticle.mutate({ title, content: articleContent, status });
  };
  return (
    <main className="grid flex-1 items-start gap-4  md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto grid flex-1  gap-4">
            <div className="flex items-center justify-center gap-4">
              <PenLine className="h-5 w-5" />
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Create New Article
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                Editing
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" disabled={submitStatus}>
                  {submitStatus && (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  )}
                  Save Article
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-8 lg:gap-8">
              <div className="md:col-span-4 lg:col-span-6 ">
                {/* <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextEditor
                          changeContent={onChangeContents}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <TextEditor changeContent={onChangeContents} />
              </div>
              <div className="col-span-1 grid items-start gap-4 md:col-span-2  lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Article Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="The article's title"
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="The article's description"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Article Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Article Tag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Tags</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Article Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ARCHIVE">
                                    Archive
                                  </SelectItem>
                                  <SelectItem value="PUBLISHED">
                                    Published
                                  </SelectItem>
                                  <SelectItem value="UNPUBLISHED">
                                    Unpublished
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Article Images</CardTitle>{" "}
                      <button className="flex aspect-square h-6 w-6 items-center justify-center rounded-md bg-primary  hover:bg-primary/90">
                        <Upload className="h-4 w-4 text-primary-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                    <CardDescription>
                      Display images used to attract users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Article image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/logo.svg"
                        width="300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm" disabled={submitStatus}>
                Save Article
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
