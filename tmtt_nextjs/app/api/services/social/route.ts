import { NextRequest, NextResponse } from "next/server";
import { Social } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  if (postId) {
    const post = Social.getPostById(postId);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    const comments = Social.getComments(postId);
    return NextResponse.json({ post, comments });
  }

  if (userId) {
    return NextResponse.json({ posts: Social.getPostsByUser(userId) });
  }

  return NextResponse.json({ posts: Social.getPosts(), total: Social.countPosts() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, userId, username, postId, content, image, tags } = body;

  if (action === "like") {
    if (!postId || !userId) {
      return NextResponse.json({ error: "Missing postId or userId" }, { status: 400 });
    }
    const post = Social.likePost(postId, userId);
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ post });
  }

  if (action === "comment") {
    if (!postId || !userId || !username || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const comment = Social.addComment({ postId, userId, username, content });
    if (!comment) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ comment }, { status: 201 });
  }

  // Default: create post
  if (!userId || !username || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const post = Social.createPost({ userId, username, content, image, tags });
  return NextResponse.json({ post }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });
  }

  const deleted = Social.deletePost(postId);
  if (!deleted) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
