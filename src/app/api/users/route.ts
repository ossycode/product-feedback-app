import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);

  const username = url.searchParams.get("username");

  try {
    await connectToDB();

    const user = await User.find({ username: username });

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
