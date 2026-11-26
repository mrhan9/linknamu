import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { linkIds } from "@/lib/links";

export const dynamic = "force-dynamic";

type ClickDoc = { _id: string; count: number };

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

// 모든 링크의 클릭 수를 한 번에 반환: { counts: { github: 3, ... } }
export async function GET() {
  try {
    const docs = await (await clicksCollection())
      .find({ _id: { $in: linkIds } })
      .toArray();
    const counts: Record<string, number> = Object.fromEntries(linkIds.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("[clicks GET]", err);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 링크 하나의 클릭 수를 1 증가: body { id: "github" } → { id, count }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await clicksCollection()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (err) {
    console.error("[clicks POST]", err);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
