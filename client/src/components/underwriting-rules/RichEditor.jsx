import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import "@wangeditor/editor/dist/css/style.css";
import React, { useEffect, useState } from "react";

const RichEditor = ({ value, onChange }) => {
  const [editor, setEditor] = useState(null);

  const toolbarConfig = {};

  toolbarConfig.excludeKeys = ["fullScreen"];

  const editorConfig = {
    placeholder: "请输入内容...",
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: "1px solid #ccc" }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={(editor) => {
          onChange(editor.getHtml());
        }}
        mode="default"
        style={{ height: "300px", overflowY: "hidden" }}
      />
    </div>
  );
};

export default RichEditor;
