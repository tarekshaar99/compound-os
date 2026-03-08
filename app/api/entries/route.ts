import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function GET() {
  const entries = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, domain, notes } = body;

  const entry = await prisma.entry.create({
    data: { title, domain, notes: notes ?? "" },
  });

  return NextResponse.json(entry, { status: 201 });
}
