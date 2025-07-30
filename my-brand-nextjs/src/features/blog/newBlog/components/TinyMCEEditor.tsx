import React from "react";
import Editor from "@tinymce/tinymce-react";

interface TinyMCEEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TinyMCEEditor({ value, onChange }: TinyMCEEditorProps) {
  return (
    <Editor
      apiKey="no-api-key"
      value={value}
      onEditorChange={onChange}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table code help wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | image link | code | help",
        skin: "oxide-dark",
        content_css: "dark",
      }}
    />
  );
}
