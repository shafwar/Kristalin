import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const editorConfig = {
  height: 400,
  menubar: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  branding: false,
  promotion: false,
  content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:16px; background: #18181b; color: #fff; }',
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, disabled }) => {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      value={value}
      onEditorChange={onChange}
      init={editorConfig}
      disabled={disabled}
    />
  );
};

export default RichTextEditor;
