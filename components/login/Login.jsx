import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

function Login({children}) {
  const { register, handleSubmit } = useForm();

  const Handlelogin = async (data) => {
    console.log(data);
    if (data.email === "") {
      toast.error("Please enter your email");
    } else if (data.hashedPassword === "") {
      toast.error("Please enter your password");
    } else {
      signIn("credentials", {
        email: data.email,
        password: data.hashedPassword,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Login Successful");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" size={"lg"}>
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <h1 className="text-center">Enjoy your time with X-Clone</h1>
          <Label className="mt-3">Email</Label>
          <Input
            {...register("email")}
            className="mt-[2px]"
            placeholder="Enter your email"
          />
          <Label className="mt-[3px]">Password</Label>
          <Input
            {...register("hashedPassword")}
            className="mt-[2px]"
            placeholder="Enter your password"
          />
          <Button onClick={handleSubmit(Handlelogin)} className="mt-3">
            Login
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Login;
