"use server";

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import Feedback from "../models/feedback.model";
import Reply from "../models/reply.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  title?: string;
  description: string;
  upvotes: number;
  category: string;
  status: string;
  author: string;
  path: string;
}

interface SingleParams {
  feedbackId: string;
  path: string;
}

interface getAllParams {
  pageNumber?: number;
  pageSize?: number;
  urlSortProp?: string;
  selectedCategory?: string;
}

interface editParams {
  title?: string;
  description?: string;
  status?: string;
  category?: string;
  upvotes?: number;
  path: string;
  feedbackId: string;
}

// export async function sort
export async function fetchFeedbacks({
  pageNumber = 1,
  pageSize = 3,
  selectedCategory,
  urlSortProp,
}: getAllParams) {
  //   const urlSortProp = url.searchParams.get("sort");
  //   // console.log(url.searchParams.get("sort"));

  await connectToDB();
  let newSuggestedFeedbacks: any[] = [];
  let totalSuggestionCount = 0;

  // Calculate the number of posts to skip based on the page number and page size
  const skipAmount = (pageNumber - 1) * pageSize;

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

  // const allSugestionFeedbacks = await Feedback.find({
  //   status: "Suggestion",
  // })
  //   .sort(sortProps)
  //   .exec();

  const countPipeline: any[] = [
    {
      $match: {
        status: "Suggestion",
      },
    },
    selectedCategory
      ? {
          $match: {
            category: selectedCategory,
          },
        }
      : null,
    {
      $count: "count",
    },
  ];

  const filteredCountPipeline = countPipeline.filter((stage) => stage !== null);

  Feedback.aggregate(filteredCountPipeline)
    .exec()
    .then((countResult) => {
      totalSuggestionCount = countResult.length > 0 ? countResult[0].count : 0;

      const aggregationPipeline: any[] = [
        {
          $match: {
            status: "Suggestion",
          },
        },
        selectedCategory
          ? {
              $match: {
                category: selectedCategory,
              },
            }
          : null,
        {
          $addFields: {
            leastUpvotes: { $min: "$upvotes" },
            mostUpvotes: { $max: "$upvotes" },
            leastComments: { $min: { $size: "$thread" } },
            mostComments: { $max: { $size: "$thread" } },
          },
        },
        {
          $sort: sortProps,
        },
        {
          $skip: skipAmount,
        },
        {
          $limit: pageSize,
        },
      ];

      const filteredAggregationPipeline: any[] = aggregationPipeline.filter(
        (stage) => stage !== null
      );

      Feedback.aggregate(filteredAggregationPipeline)
        .exec()
        .then((data) => {
          newSuggestedFeedbacks = data;
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    })
    .catch((error) => {
      console.error(error);
    });

  const allLiveFeedbacks = await Feedback.find({
    status: "Live",
  });

  const allPlannedFeedbacks = await Feedback.find({
    status: "Planned",
  });

  const allInProgressFeedbacks = await Feedback.find({
    status: "In-Progress",
  });

  // const totalSuggestionCount = await Feedback.countDocuments({
  //   status: "Suggestion",
  // });

  const totalLiveCount = await Feedback.countDocuments({
    status: "Live",
  });

  const totalPlannedCount = await Feedback.countDocuments({
    status: "Planned",
  });

  const totalInProgressCount = await Feedback.countDocuments({
    status: "In-Progress",
  });

  const allFeedbacks = await feedbacksQuery.exec();

  const isNext =
    totalSuggestionCount > skipAmount + newSuggestedFeedbacks.length;

  return {
    allFeedbacks,
    isNext,
    // totalSuggestionCount,
    totalSuggestionCount,
    totalInProgressCount,
    totalPlannedCount,
    totalLiveCount,
    // allSugestionFeedbacks,
    allLiveFeedbacks,
    allInProgressFeedbacks,
    allPlannedFeedbacks,
    newSuggestedFeedbacks,
  };
}

export async function createFeedback({
  title,
  description,
  upvotes,
  category,
  status,
  author,
  path,
}: Params) {
  try {
    await connectToDB();

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

    // newFeedback.thread.push(newFeedback._id);

    await newFeedback.save();

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Failed to create feedback: ${err.message}`);
  }
}

export async function deleteFeedback({ feedbackId, path }: SingleParams) {
  await connectToDB();
  try {
    [];

    // find main feedback to delete
    const mainFeedback = await Feedback.findById(feedbackId);

    if (!mainFeedback) {
      throw new Error("Feedback not found");
    }

    // Fetch all child comment/replies from main feedback
    const { childComments, childRepliesArray } = await fetchAllChildFeedback(
      feedbackId
    );

    // Extract the ids from each comment/reply object
    const childCommentsIds = childComments.map((comment) => comment._id);
    const childRepliesArrayIds = childRepliesArray.map((reply) => reply._id);

    // Extract the authors id to update the user model
    const commentUniqueAuthorIds = new Set(
      [childComments.map((comment) => comment.author?._id)].filter(
        (id) => id !== undefined
      )
    );
    const replyUniqueAuthorIds = new Set(
      [childRepliesArray.map((reply) => reply.author?._id)].filter(
        (id) => id !== undefined
      )
    );

    const mainFeedbackAuthorId = mainFeedback?.author?._id;

    // Delete main feedback
    await Feedback.findByIdAndDelete(feedbackId);
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
      { $pull: { feedbacks: feedbackId } }
    );

    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Failed to delete feedback: ${err.message}`);
  }
}

export async function EditFeedback({
  title,
  description,
  status,
  category,
  upvotes,
  path,
  feedbackId,
}: editParams) {
  await connectToDB();
  try {
    const updatedFeedback = await Feedback.findById(feedbackId);

    if (!updatedFeedback) {
      throw new Error("Feedbac not found");
    }

    if (upvotes === undefined) {
      (updatedFeedback.title = title),
        (updatedFeedback.description = description),
        (updatedFeedback.status = status),
        (updatedFeedback.category = category);
      await updatedFeedback.save();
    } else {
      updatedFeedback.upvotes = upvotes;
      await updatedFeedback.save();
    }
    revalidatePath(path);

    return;
  } catch (err: any) {
    throw new Error(`Failed to delete thread: ${err.message}`);
  }
}

export async function fetchSingleFeedbackbyId(feedbackId: string) {
  await connectToDB();

  try {
    const feedback = await Feedback.findById(feedbackId)
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
      .exec();

    return feedback;
  } catch (err: any) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch feedback");
  }
}

// { params }: { params: { id: string } }

function getSortbyProps(searchParams: string | undefined) {
  // const sort = searchParams.sort || "Most Upvotes";
  let sortParams = searchParams || "most upvotes";

  let sortProp = {};

  if (sortParams === "most upvotes") {
    sortProp = { mostUpvotes: -1 };
  }

  if (sortParams === "least upvotes") {
    sortProp = { leastUpvotes: 1 };
  }

  if (sortParams === "most comments") {
    sortProp = { mostComments: -1 };
  }

  if (sortParams === "least comments") {
    sortProp = { leastComments: 1 };
  }

  // if (sortParams === "Most Upvotes") {
  //   sortProp = { upvotes: "desc" };
  // }
  // if (sortParams === "Least Upvotes") {
  //   sortProp = { upvotes: "asc" };
  // }
  // if (sortParams === "Most Comments") {
  //   sortProp = { "thread.length": "desc" };
  // }
  // if (sortParams === "Least Comments") {
  //   sortProp = { "thread.length": "asc" };
  // }

  return sortProp;
}

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
  }

  return { childComments, childRepliesArray };
}
