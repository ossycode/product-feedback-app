import Comment from "@/lib/models/comment.model";
import Feedback from "@/lib/models/feedback.model";
import Reply from "@/lib/models/reply.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
// import sortProps from "./sortProps";
// import { useSortBy } from "@/context/sortByContext";

export const GET = async (
  request: NextRequest,
  pageNumber = 1,
  pageSize = 10
) => {
  const url = new URL(request.url);
  const urlSortProp = url.searchParams.get("sort");
  // console.log(url.searchParams.get("sort"));

  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size
  const skipAmount = (pageNumber - 1) * pageSize;

  try {
    const sortProps = getSortbyProps(urlSortProp);
    // const urlParams = useSearchParams();

    // find feedback that have not parent ( top-level feedback), a feedback that is not a comment/reply
    const feedbacksQuery = Feedback.find({
      parentId: { $in: [null, undefined] },
      // status: "Suggestion",
    })
      .sort(sortProps)
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

function getSortbyProps(sortParam: string | null) {
  let sortProp = {};
  if (sortParam === "Most Upvotes") {
    sortProp = { upvotes: "desc" };
  }
  if (sortParam === "Least Upvotes") {
    sortProp = { upvotes: "asc" };
  }
  if (sortParam === "Most Comments") {
    sortProp = { comments: "desc" };
  }
  if (sortParam === "Least Comments") {
    sortProp = { comments: "asc" };
  }

  return sortProp;
}

// const sort = getSortbyProps();
