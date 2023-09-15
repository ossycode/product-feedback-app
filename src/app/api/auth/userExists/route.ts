import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { email, username } = await request.json();

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    }).select("_id");

    console.log("User:", user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
