import Feedback from "@/lib/models/feedback.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { title, description, upvotes, category, status, author, path } =
    await request.json();
  // const body = await request.json();

  // const newFeedback = new Feedback(body);

  try {
    await connectToDB();

    // await newFeedback.save();
    const newFeedback = await Feedback.create({
      title,
      description,
      upvotes,
      category,
      status,
      author,
    });

    await User.findByIdAndUpdate(author, {
      $push: { feedbacks: newFeedback._id },
    });

    revalidatePath(path);
    return NextResponse.json(
      { message: "Feedback has been created" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while creating feedback" },
      { status: 500 }
    );
  }
};
