import { NextResponse } from "next/server";
import Course from "@/models/course";
import connectDB from "@/libs/conn";

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const { id } = params;
    const { name } = await req.json();
    await Course.findByIdAndUpdate(id, { name });
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
}
