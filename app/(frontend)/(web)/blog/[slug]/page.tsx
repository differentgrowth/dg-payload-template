import type { Metadata } from "next";

import { draftMode } from "next/headers";

import { PostHero } from "@/components/blog/post-hero";
import { PostsList } from "@/components/blog/posts-list";
import { LivePreviewListener } from "@/components/payload/live-preview-listener";
import { PayloadRedirects } from "@/components/payload/redirects";
import { RichText } from "@/components/shared/rich-text";
import { SchemaMarkup } from "@/components/shared/schema-markup";
import { generateMeta } from "@/lib/generate-meta";
import { getPostBySlug } from "@/queries/get-post-by-slug";
import { getPostSlugs } from "@/queries/get-post-slugs";

const WHITESPACE_REGEX = /\s+/;

export async function generateStaticParams() {
  const posts = await getPostSlugs();

  return posts.docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const { isEnabled: draft } = await draftMode();

  const page = await getPostBySlug({ slug, draft });

  return generateMeta({ doc: page, isDraft: draft, prefix: "/blog" });
}

function estimateReadingTime(content: unknown): number {
  if (!content || typeof content !== "object") {
    return 5;
  }

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== "object") {
      return "";
    }
    const n = node as { text?: string; children?: unknown[] };
    if (n.text) {
      return n.text;
    }
    if (n.children && Array.isArray(n.children)) {
      return n.children.map(extractText).join(" ");
    }
    return "";
  };

  const c = content as { root?: { children?: unknown[] } };
  const text = c.root?.children?.map(extractText).join(" ") || "";
  const wordsPerMinute = 200;
  const words = text.split(WHITESPACE_REGEX).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;

  const post = await getPostBySlug({ slug, draft });

  if (!post) {
    return <PayloadRedirects url="/" />;
  }

  const readingTime = estimateReadingTime(post.content);

  return (
    <main>
      <SchemaMarkup data={post.schemaMarkup} />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={`/${post.slug}`} />

      {draft ? <LivePreviewListener /> : null}

      <PostHero
        authors={post.authors}
        categories={post.categories}
        description={post.description}
        image={post.image}
        publishedAt={post.publishedAt}
        readingTime={readingTime}
        title={post.title}
      />

      <article className="container max-w-3xl px-6 pb-16 lg:pb-24">
        <RichText className="prose" data={post.content} />

        {post.relatedPosts && post.relatedPosts?.length > 0 ? (
          <section className="mt-16 border-border/50 border-t pt-12">
            <h2 className="mb-8 font-serif text-2xl">Artículos relacionados</h2>
            <PostsList className="p-0" posts={post.relatedPosts} />
          </section>
        ) : null}
      </article>
    </main>
  );
}
