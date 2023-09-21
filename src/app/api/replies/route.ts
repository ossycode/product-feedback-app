import Comment from "@/lib/models/comment.model";
import Reply from "@/lib/models/reply.model";
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

    originalComment.replies.push(savedReplyToComment._id);

    await originalComment.save();

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
