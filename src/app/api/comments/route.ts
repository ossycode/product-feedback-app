import Comment from "@/lib/models/comment.model";
import Feedback from "@/lib/models/feedback.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// export const GET = async (request: Request) => {
//   const { parentId } = await request.json();
//   await connectToDB();

// //   try {
// //     const feedback = await Feedback.find({ id: parentId }).sort({
// //       createdAt: "desc",
// //     }).populate;

//     // const descendantFeedbacks = []
//     // for(const childFeedback of childFeedbacks) {
//     //     const descendants = await
//     // }
//   } catch (err) {
//     return NextResponse.json(
//       { message: "An error occurred while fetching comment" },
//       { status: 500 }
//     );
//   }
// };
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

    originalFeedback.comments.push(savedCommentFeedback._id);

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
