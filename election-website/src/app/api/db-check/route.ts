import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  try {
    const count = await prisma.subscribers.count();

    return NextResponse.json({
      ok: true,
      connected: true,
      model: "subscribers",
      count,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, connected: false, error: message },
      { status: 500 }
    );
  }
}
