"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Link } from "react-router-dom";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "@/context/auth-context";

const loginFormSchema = z.object({
  badge_id: z.string().min(1, { message: "Badge ID is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      badge_id: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await loginUser(values.badge_id, values.password);
    if (response.ok) {
      navigate("/hub");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="badge_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge ID</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormDescription>This is your badge number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormDescription>
                This is password associated with your badge number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {/* LINK FOR TESTING PURPOSE :^) */}
        <Link to="/form">Go to form</Link> 
        <Link to="/patient-data">Go to patient data</Link>
      </form>
    </Form>
  );
}
export default Login;
