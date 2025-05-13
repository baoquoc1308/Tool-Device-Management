import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DataLoginType, loginSchema } from "./model/schema";
import {
  FormField,
  FormItem,
  Label,
  FormControl,
  FormMessage,
  Input,
  Button,
  Form,
  Checkbox,
} from "@/components/ui";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const form = useForm<DataLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: DataLoginType) => {
    console.log("Login Data:", data);
  };
  return (
    <div>
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
          Sign in to your account
        </h1>
        <p className="text-sm text-muted-foreground text-center px-2">
          Manage your devices and assets securely
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label className="text-sm font-medium">Email Address</Label>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      >
                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                      </svg>
                    </div>
                    <Input
                      type="email"
                      placeholder="your.email@company.com"
                      className="h-9 sm:h-10 pl-9 sm:pl-10 text-sm"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Password</Label>
                  <Link to="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-9 sm:h-10 pl-9 sm:pl-10 text-sm"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          <FormField
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center mt-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="ml-2 block text-xs sm:text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-9 sm:h-10 text-sm sm:text-base font-medium bg-primary hover:bg-primary/90 flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                clipRule="evenodd"
              />
            </svg>
            Sign In
          </Button>{" "}
          <div className="text-center text-xs sm:text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Create account
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
