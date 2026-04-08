import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product } from "@/models";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().populate('collection').sort({ createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, originalPrice, actualPrice, images, collection, tag } = body;

    const product = await Product.create({
      title,
      description,
      originalPrice,
      actualPrice,
      images,
      collection,
      tag,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
