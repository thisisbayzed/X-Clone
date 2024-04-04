"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCurrentUser from "../../hooks/useCurrentUser";
import useSingalUsers from "../../hooks/useSingalUsers";
import toast from "react-hot-toast";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";
import ImagesUploads from "../imageuploads/ImagesUploads";

function EditeProfiles() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: Mutatedfetchusers } = useSingalUsers(currentUser?.id);

  const [profileImage, setProfileImage] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setImage(currentUser?.image);
    setUsername(currentUser?.username);
    setName(currentUser?.name);
    setBio(currentUser?.bio);
  }, [
    currentUser?.profileImage,
    currentUser?.image,
    currentUser?.username,
    currentUser?.name,
    currentUser?.bio,
  ]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile/edite`,
        {
          name,
          username,
          bio,
          profileImage,
          image,
        }
      );
      setLoading(false);
      Mutatedfetchusers();
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [bio, image, name, profileImage, username, Mutatedfetchusers]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-center">
            Edite
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Edites Your X-Profile</DialogTitle>
          <ImagesUploads
            value={image}
            onChange={(image) => setImage(image)}
            label="Upload Cover Image"
          />
          <ImagesUploads
            value={profileImage}
            onChange={(image) => setProfileImage(image)}
            label="Upload Profile Image"
          />
          <Input
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            className="mt-[2px]"
            placeholder="Enter your name"
          />
          <Input
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-[2px]"
            placeholder="Enter your username"
          />
          <Input
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            className="mt-[2px]"
            placeholder="Enter your bio"
          />
          <Button type="button" onClick={handleSubmit} className="mt-3">
            {loading ? "updating..." : "save"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditeProfiles;
