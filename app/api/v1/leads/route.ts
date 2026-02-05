import { after, type NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { contactEmailSchema } from "@/lib/zod";

export async function POST(
  req: NextRequest,
  _ctx: RouteContext<"/api/v1/leads">
) {
  const payload = await getPayload({ config: configPromise });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = contactEmailSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 }
    );
  }

  try {
    const lead = await payload.create({
      collection: "leads",
      data: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone,
        message: validation.data.message,
      },
      req: {
        context: {
          isWebSource: true,
        },
      },
    });

    // Non-blocking logging after response is sent
    after(() => {
      console.info(`[Lead] Created: ${validation.data.email} (ID: ${lead.id})`);
    });

    return NextResponse.json({ lead: lead.id }, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
