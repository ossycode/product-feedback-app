import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface Params {
  username: string;
}
interface EditParams {
  username: string;
  avatar?: string;
  name?: string;
  path: string;
}

export async function GetSingleUserByUsername() {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const currentUsername = session?.user.username;

    const user = await User.find({ username: currentUsername });

    return user;
  } catch (err) {
    console.error("Error while fetching user:", err);
    throw new Error("Unable to fetch user");
  }
}

export async function UpdateSingleUser({
  username,
  avatar,
  name,
  path,
}: EditParams) {
  await connectToDB();
  try {
    const res = await User.find({ username: username });

    if (!res) {
      throw new Error("User not found");
    }
    const user = res[0];

    if (avatar !== undefined) {
      user.avatar = avatar;
      await user.save();
    }

    if (name !== undefined) {
      user.name = name;
      await user.save();
    }

    revalidatePath(path);
  } catch (err) {
    console.error("Error while updating user:", err);
    throw new Error("Unable to update user");
  }
}
