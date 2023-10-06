import { NextRequest, NextResponse } from "next/server";
import Feedback from "./models/feedback.model";
import User from "./models/user.model";
import Reply from "./models/reply.model";
import { connectToDB } from "./mongoose";
import Comment from "./models/comment.model";

export const getAllFeedbacks = async (pageNumber = 1, pageSize = 10) => {
  // const url = new URL(request.url);
  // const urlSortProp = url.searchParams.get("sort");
  // console.log(url.searchParams.get("sort"));

  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    // const sortProps = getSortbyProps(searchParams.sort);
    // const urlParams = useSearchParams();

    // find feedback that have not parent ( top-level feedback), a feedback that is not a comment/reply
    const feedbacksQuery = Feedback.find({
      parentId: { $in: [null, undefined] },
      // status: "Suggestion",
    })
      .sort({ upvotes: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate([
        {
          path: "author",
          model: User,
        },
        {
          path: "comments",
          model: Comment,

          populate: {
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
        },
      ]);
    // .populate({
    //   path: "comments",
    //   populate: [
    //     {
    //       path: "author",
    //       model: User,
    //       select: "_id  id name avatar username",
    //     },
    //     {
    //       path: "replies",
    //       model: Comment,
    //       populate: [
    //         {
    //           path: "author",
    //           model: User,
    //           select: "_id  id name avatar username",
    //         },
    //       ],
    //     },
    //   ],
    // });
    // .populate({
    //   path: "comments.author",
    //   model: User,
    //   select: "_id name parentId avatar username",
    //   //   // model: Feedback,
    //   //   // populate: {
    //   //   //   path: "author",
    //   //   //   model: User,
    //   //   //   select: "_id",
    //   //   //   // select: "_id name parentId avatar",
    //   //   // },
    // });

    // Count the total number of top-level feedbacks that are suggestions
    const totalSuggestionCount = await Feedback.countDocuments({
      parentId: { $in: [null, undefined] },
      status: "Suggestion",
    });

    const totalLiveCount = await Feedback.countDocuments({
      parentId: { $in: [null, undefined] },
      status: "Live",
    });

    const totalPlannedCount = await Feedback.countDocuments({
      parentId: { $in: [null, undefined] },
      status: "Planned",
    });

    const totalInProgressCount = await Feedback.countDocuments({
      parentId: { $in: [null, undefined] },
      status: "In-Progress",
    });

    const allFeedbacks = await feedbacksQuery.exec();

    const isNext = totalSuggestionCount > skipAmount + allFeedbacks.length;

    // return { feedbacksSuggestions, totalSuggestionCount, isNext };
    // return NextResponse.json({ feedbacksSuggestions }, { status: 201 });

    // console.log(feedbacksSuggestions);
    // return { feedbacksSuggestions, isNext, totalSuggestionCount };
    return new NextResponse(
      JSON.stringify({
        allFeedbacks,
        isNext,
        totalSuggestionCount,
        totalInProgressCount,
        totalPlannedCount,
        totalLiveCount,
      }),
      {
        status: 200,
      }
    );
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
