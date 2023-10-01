import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    await connectToDB();

    const user = await User.find({ username: params.slug });

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  await connectToDB();
  try {
    const { avatar, name, path } = await request.json();

    const res = await User.find({ username: params.slug });

    if (!res) {
      return new Response("User not found", { status: 404 });
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

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while updating user" },
      { status: 500 }
    );
  }
};
