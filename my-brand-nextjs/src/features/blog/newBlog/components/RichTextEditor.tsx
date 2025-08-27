"use client";

import React, { useEffect, useRef } from "react";
import { RichTextEditorProps } from "../types";

declare global {
  interface Window {
    tinymce: any;
  }
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onContentChange,
  placeholder = "Start writing your content here...",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const editorId = useRef(`editor-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const loadTinyMCE = async () => {
      // Load TinyMCE script if not already loaded
      if (!window.tinymce) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.tiny.cloud/1/4iabi3d7p3d926q6v4vtnxz133n8z0jctasjh2ow5eoomrw0/tinymce/6/tinymce.min.js";
        script.setAttribute("referrerpolicy", "origin");
        document.head.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialize TinyMCE
      if (window.tinymce && editorRef.current) {
        await window.tinymce.init({
          target: editorRef.current,
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image link | code | help",
          content_style:
            "body { font-family:Roboto,Arial,sans-serif; font-size:16px; color:#d1d5db; }",
          skin: "oxide-dark",
          content_css: "dark",
          placeholder: placeholder,
          setup: (editor: any) => {
            editorInstanceRef.current = editor;

            editor.on("change", () => {
              const content = editor.getContent();
              onContentChange(content);
            });

            editor.on("keyup", () => {
              const content = editor.getContent();
              onContentChange(content);
            });
          },
          images_upload_handler: (blobInfo: any) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = function () {
                resolve(reader.result as string);
              };
              reader.onerror = function () {
                reject("Image upload failed");
              };
              reader.readAsDataURL(blobInfo.blob());
            });
          },
        });
      }
    };

    loadTinyMCE();

    // Cleanup
    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.remove();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  // Update content when prop changes
  useEffect(() => {
    if (
      editorInstanceRef.current &&
      editorInstanceRef.current.getContent() !== content
    ) {
      editorInstanceRef.current.setContent(content || "");
    }
  }, [content]);

  return (
    <div
      className={`min-h-[400px] bg-primary/50 border border-gray-700 rounded-lg ${className}`}
    >
      <div ref={editorRef} id={editorId.current}></div>
    </div>
  );
};
