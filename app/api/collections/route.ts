import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Collection } from "@/models";

export async function GET() {
  try {
    await dbConnect();
    const collections = await Collection.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, collections });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, description } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Collection name is required" },
        { status: 400 }
      );
    }

    const existingCollection = await Collection.findOne({
      name: name.trim(),
    });

    if (existingCollection) {
      return NextResponse.json(
        { success: false, message: "Collection already exists" },
        { status: 400 }
      );
    }

    const collection = await Collection.create({
      name: name.trim(),
      description: description || "",
    });

    return NextResponse.json({ success: true, collection }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create collection" },
      { status: 500 }
    );
  }
}
