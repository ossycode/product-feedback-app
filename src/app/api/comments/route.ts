import Comment from "@/lib/models/comment.model";
import Feedback from "@/lib/models/feedback.model";
import Reply from "@/lib/models/reply.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { content, author, path, parentId } = await request.json();
  await connectToDB();

  try {
    const originalFeedback = await Feedback.findById(parentId);

    if (!originalFeedback) {
      throw new Error("Feedback not found");
    }

    // Create the new comment feedback
    const commentFeedback = new Comment({
      content,
      author,
      parentId,
    });

    const savedCommentFeedback = await commentFeedback.save();

    await User.findByIdAndUpdate(author, {
      $push: { comments: savedCommentFeedback._id },
    });

    originalFeedback.comments.push(savedCommentFeedback._id);
    originalFeedback.thread.push(savedCommentFeedback._id);

    await originalFeedback.save();

    revalidatePath(path);
    return NextResponse.json(
      { message: "Comment has been created" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while creating comment" },
      { status: 500 }
    );
  }
};
