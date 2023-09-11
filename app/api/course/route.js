import { NextResponse } from "next/server";
import Course from "@/models/course";
import connectDB from "@/libs/conn";

export async function POST(req) {
  await connectDB();
  try {
    const data = await req.json();
    const name = data.name;
    await Course.create({ name });
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err, "errror");
  }
}

export async function GET() {
  await connectDB();
  try {
    // Find all courses
    const courses = await Course.find();
    return NextResponse.json(
      { message: "Courses retrieved successfully", courses },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    console.log(req.nextUrl.searchParams.get("id"));
    const id = req.nextUrl.searchParams.get("id");
    await Course.findByIdAndDelete(id);
    return NextResponse.json({ message: "Course Deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
}
