import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { IVideo, Video } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json({ message: "No videos found" }, { status: 404 });
        }

        return NextResponse.json(videos, { status: 200 });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { message: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const body: IVideo = await request.json();

        if (!body.title || !body.description || !body.videoUrl) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformations: {
                height: 1080,
                width: 1920,
                quality: body?.transformations?.quality ?? 80,
            },
        };

        const newVideo = await Video.create(videoData);

        return NextResponse.json(
            {newVideo, message: "Video created successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error in POST /api/video:", error);
        return NextResponse.json(
            { message: "Failed to create video" },
            { status: 500 }
        );
    }
}
