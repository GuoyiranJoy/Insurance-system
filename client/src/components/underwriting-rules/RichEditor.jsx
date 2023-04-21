import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import React, { useEffect, useState } from "react";

const RichEditor = () => {
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState("<p>hello</p>");

  const toolbarConfig = {};

  toolbarConfig.excludeKeys = ["fullScreen"];

  const editorConfig = {
    placeholder: "请输入内容...",
  };

  useEffect(() => {
    console.log(html);
  }, [html]);

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
        value={html}
        onCreated={setEditor}
        onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: "300px", overflowY: "hidden" }}
      />
    </div>
  );
};

export default RichEditor;
