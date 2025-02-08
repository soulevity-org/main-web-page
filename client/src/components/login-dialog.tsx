import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifyCodeSchema = z.object({
  code: z.string().min(6, "Please enter the 6-digit code"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginView = "login" | "reset" | "verify";

export default function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [view, setView] = useState<LoginView>("login");
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
  });

  const verifyForm = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    // TODO: Implement login logic
    console.log("Login:", values);
    toast({
      title: "Success",
      description: "You have been logged in successfully.",
    });
    onOpenChange(false);
  }

  function onRequestReset(values: z.infer<typeof resetSchema>) {
    // TODO: Implement reset code sending logic
    console.log("Reset requested for:", values);
    toast({
      title: "Reset Code Sent",
      description: "Please check your email for the reset code.",
    });
    setView("verify");
  }

  function onVerifyReset(values: z.infer<typeof verifyCodeSchema>) {
    // TODO: Implement verification logic
    console.log("Verify reset:", values);
    toast({
      title: "Password Reset",
      description: "Your password has been reset successfully.",
    });
    setView("login");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {view === "login"
              ? "Login to Soulevity"
              : view === "reset"
              ? "Reset Password"
              : "Verify Reset Code"}
          </DialogTitle>
        </DialogHeader>

        {view === "login" && (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="link"
                className="px-0"
                onClick={() => setView("reset")}
              >
                Forgot password?
              </Button>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        )}

        {view === "reset" && (
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(onRequestReset)}
              className="space-y-4"
            >
              <FormField
                control={resetForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setView("login")}
                >
                  Back
                </Button>
                <Button type="submit" className="w-full">
                  Send Reset Code
                </Button>
              </div>
            </form>
          </Form>
        )}

        {view === "verify" && (
          <Form {...verifyForm}>
            <form
              onSubmit={verifyForm.handleSubmit(onVerifyReset)}
              className="space-y-4"
            >
              <FormField
                control={verifyForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter 6-digit code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={verifyForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setView("reset")}
                >
                  Back
                </Button>
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
