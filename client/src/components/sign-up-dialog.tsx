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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const stepOneSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const stepTwoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  age: z.string().min(1, "Age is required"),
  pronouns: z.string().min(1, "Pronouns are required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

const stepThreeSchema = z.object({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  foundFrom: z.string().optional(),
  subscribe: z.boolean().optional(),
});

type Step = 1 | 2 | 3;

export default function SignUpDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const { toast } = useToast();

  const stepOneForm = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
  });

  const stepTwoForm = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
  });

  const stepThreeForm = useForm<z.infer<typeof stepThreeSchema>>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      interests: [],
      subscribe: false,
    },
  });

  function onStepOne(values: z.infer<typeof stepOneSchema>) {
    console.log("Step 1:", values);
    setStep(2);
  }

  function onStepTwo(values: z.infer<typeof stepTwoSchema>) {
    console.log("Step 2:", values);
    setStep(3);
  }

  function onStepThree(values: z.infer<typeof stepThreeSchema>) {
    console.log("Step 3:", values);
    toast({
      title: "Success",
      description: "Your account has been created successfully.",
    });
    onOpenChange(false);
    setStep(1);
  }

  const interests = [
    "AI & Machine Learning",
    "Web Development",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Sign Up for Soulevity - Step {step} of 3
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <Form {...stepOneForm}>
            <form onSubmit={stepOneForm.handleSubmit(onStepOne)} className="space-y-4">
              <FormField
                control={stepOneForm.control}
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
                control={stepOneForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Next</Button>
              </div>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...stepTwoForm}>
            <form onSubmit={stepTwoForm.handleSubmit(onStepTwo)} className="space-y-4">
              <FormField
                control={stepTwoForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={stepTwoForm.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={stepTwoForm.control}
                  name="pronouns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pronouns</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={stepTwoForm.control}
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

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...stepThreeForm}>
            <form onSubmit={stepThreeForm.handleSubmit(onStepThree)} className="space-y-4">
              <FormField
                control={stepThreeForm.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <div className="grid grid-cols-1 gap-2">
                      {interests.map((interest) => (
                        <FormField
                          key={interest}
                          control={stepThreeForm.control}
                          name="interests"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    if (checked) {
                                      field.onChange([...currentValue, interest]);
                                    } else {
                                      field.onChange(
                                        currentValue.filter((v) => v !== interest)
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {interest}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={stepThreeForm.control}
                name="foundFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you find about Soulevity?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="social" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Social Media
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="friend" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Friend Recommendation
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="search" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Search Engine
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={stepThreeForm.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Subscribe to our newsletter
                    </FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit">Complete Sign Up</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}