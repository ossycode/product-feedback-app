"use server";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface Params {
  name: string;
  username: string;
  password: string;
  avatar: string | undefined;
}

export async function createUser({ name, username, password, avatar }: Params) {
  try {
    connectToDB();

    const hashedPassword = await bcrypt.hash(password, 5);

    // const newUser = new User({
    //   name,
    //   username,
    //   hashedPassword,
    //   avatar,
    // });

    const newUser = await User.create({
      name,
      username,
      hashedPassword,
      avatar,
    });

    await newUser.save();
    // return new NextResponse("User has been created", { status: 201 });
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}
