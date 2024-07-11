"use client";
import { Card } from "@/components/ui/card";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { type SunEditorOptions } from "suneditor/src/options";

const options: SunEditorOptions = {
  mode: "classic",
  rtl: false,
  katex: "window.katex",
  font: ["Arial", "tahoma", "Courier New,Courier"],
  fontSize: [8, 10, 14, 18, 24, 36],
  formats: ["p", "blockquote", "h1", "h2", "h3"],
  imageGalleryUrl:
    "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
  videoFileInput: false,
  tabDisable: false,
  buttonList: [
    [
      "undo",
      "redo",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
      "removeFormat",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "lineHeight",
      "table",
      "link",
      "image",
      "video",
      "audio",
      "math",
      "imageGallery",
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "save",
    ],
  ],
};
const TextEditor = (props: {
  changeContent: (contents: string) => void;
  contentInitial: string;
}) => {
  const handleChange = (contents: string) => {
    props.changeContent(contents);
  };
  return (
    <Card className="overflow-hidden">
      <SunEditor
        setContents={props.contentInitial}
        setOptions={options}
        onChange={handleChange}
        height="80vh"
      />
    </Card>
  );
};

export default TextEditor;
