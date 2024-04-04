import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function Register() {
  const { register, handleSubmit } = useForm();

  const Handlesingup = async (data) => {
    if (data.username === "") {
      toast.error("Please enter your username");
    } else if (data.email === "") {
      toast.error("Please enter your email");
    } else if (data.hashedPassword === "") {
      toast.error("Please enter your password");
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        data
      );
      if (response.status === 200) {
        toast.success("User created successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="mt-8">
      <h1 className=" text-white pb-5">New to X-Clone ? 💥</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-center">
            Sign up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <h1 className="text-center">Create an account to get started</h1>
          <Label className="mt-3">Username</Label>
          <Input
            {...register("username")}
            className="mt-[2px]"
            placeholder="Enter your username"
          />
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
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleSubmit(Handlesingup)}
              className="mt-3"
            >
              Singup
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Register;
