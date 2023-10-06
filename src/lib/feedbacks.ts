import { NextRequest, NextResponse } from "next/server";
import Feedback from "./models/feedback.model";
import User from "./models/user.model";
import Reply from "./models/reply.model";
import { connectToDB } from "./mongoose";
import Comment from "./models/comment.model";
import mongoose from "mongoose";

export const fetchAllFeedbacks = async () => {
  // Calculate the number of posts to skip based on the page number and page size
  // const skipAmount = (pageNumber - 1) * pageSize;

  try {
    await connectToDB();

    const allFeedbacks = await Feedback.find({
      // parentId: { $in: [null, undefined] },
      // status: "Suggestion",
    });
    // .sort({ upvotes: "desc" })
    // .populate([
    //   {
    //     path: "author",
    //     model: User,
    //   },
    //   {
    //     path: "comments",
    //     model: Comment,

    //     populate: {
    //       path: "replies",
    //       model: Reply,
    //       select: "_id content replyingTo parentId",
    //       populate: [
    //         {
    //           path: "author",
    //           model: User,
    //           select: "_id  id name avatar username",
    //         },
    //       ],
    //     },
    //   },
    // ]);

    // const totalSuggestionCount = await Feedback.countDocuments({
    //   parentId: { $in: [null, undefined] },
    //   status: "Suggestion",
    // });

    // const totalLiveCount = await Feedback.countDocuments({
    //   parentId: { $in: [null, undefined] },
    //   status: "Live",
    // });

    // const totalPlannedCount = await Feedback.countDocuments({
    //   parentId: { $in: [null, undefined] },
    //   status: "Planned",
    // });

    // const totalInProgressCount = await Feedback.countDocuments({
    //   parentId: { $in: [null, undefined] },
    //   status: "In-Progress",
    // });

    // const allFeedbacks = await feedbacksQuery.exec();

    return allFeedbacks;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching feedbacks" },
      { status: 500 }
    );
  }
};

function getSortbyProps({ searchParams }: { searchParams: { sort: string } }) {
  // calculateTotalComment()
  const sortParam = searchParams.sort;
  let sortProp = {};
  // arrayFieldLength: {
  //   $size: "$arrayFieldName";
  // }

  if (sortParam === "Most Upvotes") {
    sortProp = { upvotes: "desc" };
  }
  if (sortParam === "Least Upvotes") {
    sortProp = { upvotes: "asc" };
  }
  if (sortParam === "Most Comments") {
    // arrayFieldLength: {
    //   size: "comments";
    // }
    sortProp = { thread: "desc" };
  }
  if (sortParam === "Least Comments") {
    // arrayFieldLength: {
    //   size: "";
    // }
    sortProp = { thread: "asc" };
  }

  return sortProp;
}
