import Feedback from "@/lib/models/feedback.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (pageNumber = 1, pageSize = 10) => {
  connectToDB();

  // Calculate the number of posts to skip based on the page number and page size
  const skipAmount = (pageNumber - 1) * pageSize;
  try {
    // find feedback that have not parent ( top-level feedback), a feedback that is not a comment/reply
    const feedbacksQuery = Feedback.find({
      parentId: { $in: [null, undefined] },
      status: "Suggestion",
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "comments.author",
        model: User,
        select: "_id name parentId avatar username",
        // model: Feedback,
        // populate: {
        //   path: "author",
        //   model: User,
        //   select: "_id",
        //   // select: "_id name parentId avatar",
        // },
      });

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

    const feedbacksSuggestions = await feedbacksQuery.exec();

    const isNext =
      totalSuggestionCount > skipAmount + feedbacksSuggestions.length;

    // return { feedbacksSuggestions, totalSuggestionCount, isNext };
    // return NextResponse.json({ feedbacksSuggestions }, { status: 201 });

    // console.log(feedbacksSuggestions);
    // return { feedbacksSuggestions, isNext, totalSuggestionCount };
    return new NextResponse(
      JSON.stringify({
        feedbacksSuggestions,
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
