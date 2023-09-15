import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { name, username, email, password, avatar } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 5);

    await connectToDB();

    await User.create({
      name,
      email,
      username,
      avatar,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User has been created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
};
