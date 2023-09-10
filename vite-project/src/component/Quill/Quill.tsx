import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ChangeContent {
  field: any;
  module: any;
}
const FreeBoardQuill: React.FC<ChangeContent> = ({ field, module }) => {
  

  return (
    <ReactQuill
      modules={module}
      value={field.value}
      onChange={field.onChange}
      style={{ height: "400px", marginBottom: "80px" }}
      placeholder="제목을 입력해주세요."
    />
  );
};

export default FreeBoardQuill;
