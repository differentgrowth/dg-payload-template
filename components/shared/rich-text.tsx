import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  CallToActionBlock as CallToActionBlockProps,
  MediaBlock as MediaBlockProps,
} from "@/payload-types";

import {
  type JSXConvertersFunction,
  RichText as RichTextWithBlocks,
} from "@payloadcms/richtext-lexical/react";

import { CallToAction } from "@/components/blocks/call-to-action";
import { Media } from "@/components/blocks/media";
import { cn } from "@/lib/utils";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | CallToActionBlockProps>;

// Regex patterns for markdown code blocks
const CODE_BLOCK_START_REGEX = /^```(\w*)$/;
const CODE_BLOCK_END_REGEX = /^```$/;

// Extract text content from a node recursively
function extractTextFromNode(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }
  const n = node as {
    text?: string;
    children?: unknown[];
    type?: string;
  };

  // Handle linebreak nodes
  if (n.type === "linebreak") {
    return "\n";
  }

  if (typeof n.text === "string") {
    return n.text;
  }
  if (Array.isArray(n.children)) {
    return n.children.map(extractTextFromNode).join("");
  }
  return "";
}

// Check if text looks like a code block (starts with ``` and ends with ```)
function isMarkdownCodeBlock(text: string): {
  isCode: boolean;
  language: string;
  code: string;
} {
  const lines = text.split("\n");
  if (lines.length < 2) {
    return { isCode: false, language: "", code: "" };
  }

  const firstLine = lines[0].trim();
  const lastLine = lines.at(-1).trim();

  const startMatch = firstLine.match(CODE_BLOCK_START_REGEX);
  const endsWithBackticks = CODE_BLOCK_END_REGEX.test(lastLine);

  if (startMatch && endsWithBackticks) {
    const language = startMatch[1] || "";
    const codeLines = lines.slice(1, -1);
    return {
      isCode: true,
      language,
      code: codeLines.join("\n"),
    };
  }

  return { isCode: false, language: "", code: "" };
}

interface NodeType {
  type: string;
  children?: Array<{ text?: string; type?: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

// Create a code block node from language and code
function createCodeBlockNode(language: string, code: string): NodeType {
  return {
    type: "code-block",
    language,
    code,
    version: 1,
  };
}

// Try to find a multi-paragraph code block starting at index i
// Returns the new index to continue from, or -1 if no code block was found
function tryParseMultiParagraphCodeBlock(
  children: NodeType[],
  startIndex: number,
  text: string,
  newChildren: NodeType[]
): number {
  const startMatch = text.match(CODE_BLOCK_START_REGEX);
  if (!startMatch) {
    return -1;
  }

  const language = startMatch[1] || "";
  const codeLines: string[] = [];
  let j = startIndex + 1;

  while (j < children.length) {
    const nextNode = children[j];
    const nextText = extractTextFromNode(nextNode);

    if (CODE_BLOCK_END_REGEX.test(nextText.trim())) {
      newChildren.push(createCodeBlockNode(language, codeLines.join("\n")));
      return j + 1;
    }

    codeLines.push(nextText);
    j++;
  }

  return -1;
}

// Pre-process Lexical data to convert markdown code blocks
function preprocessMarkdownCodeBlocks(
  data: SerializedEditorState
): SerializedEditorState {
  if (!data?.root?.children) {
    return data;
  }

  const children = data.root.children as NodeType[];
  const newChildren: NodeType[] = [];
  let i = 0;

  while (i < children.length) {
    const node = children[i];

    if (node.type !== "paragraph") {
      newChildren.push(node);
      i++;
      continue;
    }

    const text = extractTextFromNode(node);

    // Check if the entire paragraph is a code block
    const codeBlockCheck = isMarkdownCodeBlock(text);
    if (codeBlockCheck.isCode) {
      newChildren.push(
        createCodeBlockNode(codeBlockCheck.language, codeBlockCheck.code)
      );
      i++;
      continue;
    }

    // Check for multi-paragraph code block
    const newIndex = tryParseMultiParagraphCodeBlock(
      children,
      i,
      text,
      newChildren
    );
    if (newIndex !== -1) {
      i = newIndex;
      continue;
    }

    newChildren.push(node);
    i++;
  }

  return {
    ...data,
    root: {
      ...data.root,
      children: newChildren as typeof data.root.children,
    },
  };
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    media: ({ node }) => (
      <Media
        captionClassName="mx-auto w-full max-w-lg"
        enableGutter={false}
        imgClassName="rounded-md shadow-sm"
        {...node.fields}
      />
    ),
    callToAction: ({ node }) => (
      <CallToAction
        className="max-w-none rounded-2xl px-0 md:py-12 lg:py-12"
        {...node.fields}
      />
    ),
  },
  // Handle our synthetic code-block nodes
  "code-block": ({ node }) => {
    const codeNode = node as unknown as { language?: string; code?: string };
    return (
      <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted p-5">
        <code
          className="block whitespace-pre font-mono text-sm leading-relaxed"
          data-language={codeNode.language}
        >
          {codeNode.code}
        </code>
      </pre>
    );
  },
  // Handle Lexical's native code nodes (if any)
  code: ({ node, nodesToJSX }) => {
    const codeNode = node as { language?: string; children?: NodeTypes[] };
    return (
      <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted p-5">
        <code
          className="block whitespace-pre font-mono text-sm leading-relaxed"
          data-language={codeNode.language}
        >
          {nodesToJSX({ nodes: codeNode.children || [] })}
        </code>
      </pre>
    );
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText = ({
  className,
  enableGutter = false,
  data,
  ...rest
}: Props) => {
  // Pre-process the data to convert markdown code blocks
  const processedData = preprocessMarkdownCodeBlocks(data);

  return (
    <RichTextWithBlocks
      className={cn(
        {
          "container max-w-7xl": enableGutter,
        },
        className
      )}
      converters={
        jsxConverters as unknown as JSXConvertersFunction<DefaultNodeTypes>
      }
      data={processedData}
      {...rest}
    />
  );
};
