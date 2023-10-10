"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Feedback from "../models/feedback.model";
import Comment from "../models/comment.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Reply from "../models/reply.model";

interface Params {
  content: string;
  path: string;
  parentId: string;
}

interface ReplyParams {
  content: string;
  path: string;
  parentId: string;
  replyingTo: string;
}

export async function PostCommentToFeedback({
  content,
  path,
  parentId,
}: Params) {
  await connectToDB();

  try {
    const session = await getServerSession(authOptions);
    const author = session?.user.id;

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
    return;
  } catch (err: any) {
    throw new Error(`Failed to create comment: ${err.message}`);
  }
}

export async function PostReplyToComment({
  content,
  path,
  parentId,
  replyingTo,
}: ReplyParams) {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);
    const author = session?.user.id;
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
  } catch (err: any) {
    throw new Error(`Failed to post reply: ${err.message}`);
  }
}
