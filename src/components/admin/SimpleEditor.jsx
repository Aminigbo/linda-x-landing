"use client";

export default function SimpleEditor({
  value,
  onChange,
  placeholder = "Write your blog post content here...",
}) {
  const applyFormat = (wrapper) => {
    const textarea = document.getElementById("simple-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const newText =
      value.substring(0, start) + wrapper(selected) + value.substring(end);
    onChange(newText);
  };

  return (
    <div className="simple-editor">
      <div className="simple-editor-toolbar">
        <button
          type="button"
          onClick={() => applyFormat((s) => `**${s}**`)}
          className="simple-editor-btn"
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => applyFormat((s) => `*${s}*`)}
          className="simple-editor-btn"
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => applyFormat((s) => `\n## ${s}`)}
          className="simple-editor-btn"
        >
          Heading
        </button>
        <button
          type="button"
          onClick={() => applyFormat((s) => `\n- ${s}`)}
          className="simple-editor-btn"
        >
          List
        </button>
      </div>
      <textarea
        id="simple-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={20}
        className="simple-editor-textarea"
      />
      <div className="simple-editor-footer">
        Tip: Use **bold**, *italic*, ## headings, and - for lists
      </div>
    </div>
  );
}
