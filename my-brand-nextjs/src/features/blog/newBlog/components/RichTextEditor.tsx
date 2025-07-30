import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import type { Quill } from "react-quill";
const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  { ssr: false, loading: () => <div>Loading editor...</div> }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      theme="snow"
      style={{
        minHeight: 400,
        background: "rgba(31, 41, 55, 0.5)",
        color: "#d1d5db",
        borderRadius: "0.5rem",
        border: "1px solid #374151",
      }}
    />
  );
}
