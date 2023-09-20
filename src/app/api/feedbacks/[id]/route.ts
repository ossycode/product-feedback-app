import Feedback from "@/lib/models/feedback.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await connectToDB();

  try {
    const { id } = params;
    const feedback = await Feedback.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id  id name avatar username",
      })
      .populate({
        path: "comments.author",
        model: User,
        select: "_id name parentId avatar username",
        populate: [
          //   {
          //     path: "author",
          //     model: User,
          //     select: "_id name parentId avatar username",
          //   },
          {
            path: "comments",
            model: Feedback,
            populate: {
              path: "author",
              model: User,
              select: "_id name parentId avatar username",
            },
          },
        ],
      })
      .exec();

    //   path: "comments.author",
    //   model: User,
    //   select: "_id name parentId avatar username",

    return new NextResponse(JSON.stringify(feedback), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching feedback" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await connectToDB();
  const { id } = params;
  try {
    const { title, description, status, category, upvotes, path } =
      await request.json();

    const updatedFeedback = await Feedback.findById(id);

    if (!updatedFeedback) {
      return new Response("Feedback not found", { status: 404 });
    }

    if (upvotes === undefined) {
      (updatedFeedback.title = title),
        (updatedFeedback.description = description),
        (updatedFeedback.status = status),
        (updatedFeedback.category = category);
      await updatedFeedback.save();
      revalidatePath(path);
    } else {
      updatedFeedback.upvotes = upvotes;
      await updatedFeedback.save();
      revalidatePath(path);
    }

    return NextResponse.json(
      { message: "Feedback updated successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while updating feedback" },
      { status: 500 }
    );
  }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    connectToDB();

    // find main feedback to delete
    const mainFeedback = await Feedback.findById(id).populate("author");

    if (!mainFeedback) {
      throw new Error("Feedback not found");
    }

    // fetch all comments/replies and their descendands recursively

    return NextResponse.json(
      { message: "Feedback deleted successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while deleting feedback" },
      { status: 500 }
    );
  }
};
