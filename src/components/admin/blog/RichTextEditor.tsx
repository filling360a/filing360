"use client";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState, type ReactNode } from "react";
import { uploadBlogImage } from "@/lib/blog/upload-client";

type Props = {
  /** Enables image uploads into this post's media folder. Omit to hide the image button. */
  postId?: string;
  initialHtml: string;
  onChange: (html: string, text: string) => void;
  placeholder?: string;
  minHeight?: string;
  label?: string;
};

export function RichTextEditor({
  postId,
  initialHtml,
  onChange,
  placeholder = "Start writing… Use H2 for main sections and H3 for sub-sections.",
  minHeight = "min-h-[480px]",
  label = "Post content",
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: `article-body ${minHeight} px-5 py-5 outline-none sm:px-8 sm:py-6`,
        "aria-label": label,
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML(), e.getText()),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-[#d7e4de] bg-white">
      {editor && <Toolbar editor={editor} postId={postId} />}
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor, postId }: { editor: Editor; postId?: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      h4: e.isActive("heading", { level: 4 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      link: e.isActive("link"),
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      code: e.isActive("codeBlock"),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  function setLink() {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (use /services/... for internal pages)", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "" || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  async function onImage(file: File | undefined) {
    if (!file || !postId) return;
    const alt = window.prompt("Describe the image (alt text — important for SEO and accessibility):", "");
    if (alt === null) return;
    setUploading(true);
    try {
      const src = await uploadBlogImage(file, postId);
      editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const chain = () => editor.chain().focus();

  return (
    <div className="sticky top-14 z-10 flex flex-wrap items-center gap-0.5 border-b border-[#d7e4de] bg-[#f3f7fa] px-2 py-1.5 lg:top-0" role="toolbar" aria-label="Formatting">
      <Tool label="Heading 2" active={state.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}>H2</Tool>
      <Tool label="Heading 3" active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}>H3</Tool>
      <Tool label="Heading 4" active={state.h4} onClick={() => chain().toggleHeading({ level: 4 }).run()}>H4</Tool>
      <Divider />
      <Tool label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}><b>B</b></Tool>
      <Tool label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}><i>I</i></Tool>
      <Tool label="Underline" active={state.underline} onClick={() => chain().toggleUnderline().run()}><u>U</u></Tool>
      <Tool label="Strikethrough" active={state.strike} onClick={() => chain().toggleStrike().run()}><s>S</s></Tool>
      <Tool label="Link" active={state.link} onClick={setLink}>🔗</Tool>
      <Divider />
      <Tool label="Bulleted list" active={state.bullet} onClick={() => chain().toggleBulletList().run()}>• List</Tool>
      <Tool label="Numbered list" active={state.ordered} onClick={() => chain().toggleOrderedList().run()}>1. List</Tool>
      <Tool label="Quote" active={state.quote} onClick={() => chain().toggleBlockquote().run()}>❝</Tool>
      <Tool label="Code block" active={state.code} onClick={() => chain().toggleCodeBlock().run()}>{"</>"}</Tool>
      <Tool label="Divider line" onClick={() => chain().setHorizontalRule().run()}>―</Tool>
      {postId && (
        <>
          <Divider />
          <Tool label="Insert image" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "🖼 Image"}
          </Tool>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={(e) => onImage(e.target.files?.[0])} />
        </>
      )}
      <span className="ml-auto flex">
        <Tool label="Undo" onClick={() => chain().undo().run()} disabled={!state.canUndo}>↶</Tool>
        <Tool label="Redo" onClick={() => chain().redo().run()} disabled={!state.canRedo}>↷</Tool>
      </span>
    </div>
  );
}

function Tool({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`h-8 min-w-8 rounded-md px-2 text-[13px] font-semibold transition disabled:opacity-40 ${
        active ? "bg-[#0f2a45] text-white" : "text-[#2c3f4e] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-[#d7e4de]" aria-hidden />;
}
