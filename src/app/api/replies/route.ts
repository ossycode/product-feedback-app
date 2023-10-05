import Comment from "@/lib/models/comment.model";
import Feedback from "@/lib/models/feedback.model";
import Reply from "@/lib/models/reply.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { content, author, path, parentId, replyingTo } = await request.json();
  await connectToDB();
  try {
    const originalComment = await Comment.findById(parentId);

    if (!originalComment) {
      console.log("Comment not found");
      throw new Error("Comment not found");
    }

    // Create the new reply comment
    const replyToComment = new Reply({
      content,
      author,
      parentId,
      replyingTo,
    });

    const savedReplyToComment = await replyToComment.save();

    await User.findByIdAndUpdate(author, {
      $push: { comments: savedReplyToComment._id },
    });

    originalComment.replies.push(savedReplyToComment._id);
    await originalComment.save();

    const originalFeedback = await Feedback.findById(originalComment.parentId);

    originalFeedback.thread.push(savedReplyToComment._id);
    await originalFeedback.save();

    revalidatePath(path);
    return NextResponse.json(
      { message: "Reply has been created" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while creating Reply" },
      { status: 500 }
    );
  }
};
