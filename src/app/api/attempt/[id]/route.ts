import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const GET = async (req: NextRequest, {params} : any) => {
    try {
      const { id } = await params;
      const attempts = await prisma.attempt.findMany({
        where: {
          userId: id
        }
      });
  
      if (!attempts || attempts.length === 0) {
        console.log("Attempts not found");
        return NextResponse.json({ error : "Not Found"} , {status: 404});
      }
  
      console.log("Attempts found:", attempts);
      return NextResponse.json({ attempts: attempts}, {status: 200});
    } catch (error : any) {
      // console.error("Error retrieving attempts:", error);
      return NextResponse.json({ error: error.message || "An unexpected error occurred"}, {status: 500});
    }
  }