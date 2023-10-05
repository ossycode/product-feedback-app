import Comment from "@/lib/models/comment.model";
import Feedback from "@/lib/models/feedback.model";
import Reply from "@/lib/models/reply.model";
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
        path: "comments",
        model: Comment,
        select: "_id content",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id  id name avatar username",
          },
          {
            path: "replies",
            model: Reply,
            select: "_id content replyingTo parentId",
            populate: [
              {
                path: "author",
                model: User,
                select: "_id  id name avatar username",
              },
            ],
          },
        ],
      })
      // .populate({
      //   path: "comments.author",
      //   model: User,
      //   select: "_id name parentId avatar username",
      //   // populate: [
      //   //   //   {
      //   //   //     path: "author",
      //   //   //     model: User,
      //   //   //     select: "_id name parentId avatar username",
      //   //   //   },
      //   //   {
      //   //     path: "comments",
      //   //     model: Comment,
      //   //     select: "_id content",
      //   //     populate: {
      //   //       path: "author",
      //   //       model: User,
      //   //       select: "_id name avatar username",
      //   //     },
      //   //   },
      //   // ],
      // })
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

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await connectToDB();
  try {
    const { id } = params;
    const { path } = await request.json();
    // console.log(id);

    // find main feedback to delete
    const mainFeedback = await Feedback.findById(id);

    if (!mainFeedback) {
      throw new Error("Feedback not found");
    }

    // Fetch all child comment/replies from main feedback
    const { childComments, childRepliesArray } = await fetchAllChildFeedback(
      id
    );

    // Extract the ids from each comment/reply object
    const childCommentsIds = childComments.map((comment) => comment._id);
    const childRepliesArrayIds = childRepliesArray.map((reply) => reply._id);

    // Extract the authors id to update the user model
    const commentUniqueAuthorIds = new Set(
      [childComments.map((comment) => comment.author?._id?.toString())].filter(
        (id) => id !== undefined
      )
    );
    const replyUniqueAuthorIds = new Set(
      [childRepliesArray.map((reply) => reply.author?._id?.toString())].filter(
        (id) => id !== undefined
      )
    );

    const mainFeedbackAuthorId = mainFeedback?.author?._id.toString();

    // Delete main feedback
    await Feedback.findByIdAndDelete(id);
    // Recursively delete child comment/reply
    await Comment.deleteMany({ _id: { $in: childCommentsIds } });
    await Reply.deleteMany({ _id: { $in: childRepliesArrayIds } });

    //Update user model
    await User.updateMany(
      { _id: { $in: Array.from(commentUniqueAuthorIds) } },
      { $pull: { comments: { $in: childCommentsIds } } }
    );
    await User.updateMany(
      { _id: { $in: Array.from(replyUniqueAuthorIds) } },
      { $pull: { replies: { $in: childRepliesArrayIds } } }
    );

    await User.updateOne(
      { _id: mainFeedbackAuthorId },
      { $pull: { feedbacks: id } }
    );

    revalidatePath(path);

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

async function fetchAllChildFeedback(feedbackId: string) {
  const childFeedbacks = await Comment.find({ parentId: feedbackId });

  const childComments = [];
  const childRepliesArray = [];
  for (const childFeedback of childFeedbacks) {
    childComments.push(childFeedback);
    const childReplies = await Reply.find({ parentId: childFeedback._id });
    for (const childReply of childReplies) {
      childRepliesArray.push(childReply);
    }

    // const descendants = await fetchAllChildFeedback(childFeedback._id);
    // descendantFeedbacks.push(childFeedback, ...descendants);
  }

  // console.log("Comments:", childComments);
  // console.log("Replies:", childRepliesArray);

  return { childComments, childRepliesArray };
}
