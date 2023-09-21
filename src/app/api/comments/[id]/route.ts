import Comment from "@/lib/models/comment.model";
import Reply from "@/lib/models/reply.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await connectToDB();

  try {
    const { id } = params;
    const comment = await Comment.findById(id)
      .populate({
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
      })
      .exec();

    return new NextResponse(JSON.stringify(comment), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching comment" },
      { status: 500 }
    );
  }
};
