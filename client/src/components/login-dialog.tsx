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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
  contactMethod: z.enum(["email", "phone"]),
  phoneNumber: z.string().optional().refine((val) => {
    if (!val) return true;
    return val.length >= 10;
  }, "Phone number must be at least 10 digits"),
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
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      contactMethod: "email",
    },
  });

  const verifyForm = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    console.log("Login:", values);
    toast({
      title: "Success",
      description: "You have been logged in successfully.",
    });
    onOpenChange(false);
  }

  function onRequestReset(values: z.infer<typeof resetSchema>) {
    console.log("Reset requested for:", values);
    toast({
      title: "Reset Code Sent",
      description: `Please check your ${values.contactMethod} for the reset code.`,
    });
    setView("verify");
  }

  function onVerifyReset(values: z.infer<typeof verifyCodeSchema>) {
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

              <FormField
                control={resetForm.control}
                name="contactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code Contact Method</FormLabel>
                    <RadioGroup
                      onValueChange={(value: "email" | "phone") => {
                        field.onChange(value);
                        setContactMethod(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Send code to email
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="phone" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Send code to phone
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {contactMethod === "phone" && (
                <FormField
                  control={resetForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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