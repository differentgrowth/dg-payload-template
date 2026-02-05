import type { Category } from "@/payload-types";

import { ImageResponse } from "next/og";
import { getPayload } from "payload";

import configPromise from "@payload-config";

export const alt = "ACME Blog";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "posts",
    limit: 1,
    depth: 1,
    pagination: false,
    select: {
      title: true,
      categories: true,
      publishedAt: true,
    },
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
  });

  const post = result.docs?.[0];

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#fafafa",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ACME
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1a1",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.4,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Blog
        </div>
      </div>,
      { ...size }
    );
  }

  const MAX_TITLE_LENGTH = 100;
  const title =
    post.title.length > MAX_TITLE_LENGTH
      ? `${post.title.slice(0, MAX_TITLE_LENGTH)}...`
      : post.title;

  const categories = (post.categories as Category[])
    ?.map((cat) => cat.title)
    .filter(Boolean);

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {categories && categories.length > 0 ? (
          <div style={{ display: "flex", gap: "12px" }}>
            {categories.slice(0, 3).map((cat) => (
              <div
                key={cat}
                style={{
                  fontSize: 18,
                  color: "#fafafa",
                  background: "#262626",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        ) : null}
        <div
          style={{
            fontSize: title.length > 60 ? 48 : 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#fafafa",
            lineHeight: 1.2,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#fafafa",
          }}
        >
          ACME
        </div>
        {publishedDate ? (
          <div
            style={{
              fontSize: 22,
              color: "#a1a1a1",
            }}
          >
            {publishedDate}
          </div>
        ) : null}
      </div>
    </div>,
    { ...size }
  );
}
