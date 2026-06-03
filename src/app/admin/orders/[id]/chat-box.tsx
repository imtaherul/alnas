"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendMessage } from "@/lib/appwrite/actions";
import { Button } from "@/components/ui";
import {
  Paperclip,
  Send,
  X,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Reply,
} from "lucide-react";
import "quill/dist/quill.snow.css";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

interface Attachment {
  bucketId: string;
  fileId: string;
  name: string;
  mimeType: string;
  size: number;
}

interface Message {
  $id: string;
  $createdAt: string;
  senderRole: "admin" | "customer";
  senderName: string;
  content: string;
  attachments: string;
  [key: string]: unknown;
}

interface ChatBoxProps {
  orderId: string;
  initialMessages: Message[];
  viewerRole?: "admin" | "customer";
}

function getFileUrl(bucketId: string, fileId: string) {
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

function getDownloadUrl(bucketId: string, fileId: string) {
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/download?project=${projectId}`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileTypeIcon({
  mimeType,
  className,
}: {
  mimeType: string;
  className?: string;
}) {
  if (mimeType.startsWith("image/")) return <FileImage className={className} />;
  if (
    mimeType.includes("spreadsheet") ||
    mimeType.includes("excel") ||
    mimeType.includes("csv")
  )
    return <FileSpreadsheet className={className} />;
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("word")
  )
    return <FileText className={className} />;
  return <File className={className} />;
}

function isImage(mimeType: string) {
  return mimeType.startsWith("image/");
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const url = getFileUrl(attachment.bucketId, attachment.fileId);
  const downloadUrl = getDownloadUrl(attachment.bucketId, attachment.fileId);

  if (isImage(attachment.mimeType)) {
    return (
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-lg border border-gray-200"
      >
        <img
          src={url}
          alt={attachment.name}
          className="h-20 w-20 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </a>
    );
  }

  return (
    <a
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
    >
      <FileTypeIcon
        mimeType={attachment.mimeType}
        className="h-4 w-4 shrink-0 text-gray-500"
      />
      <div className="min-w-0">
        <p className="truncate text-gray-900">{attachment.name}</p>
        <p className="text-xs text-gray-500">
          {formatFileSize(attachment.size)}
        </p>
      </div>
    </a>
  );
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const url = URL.createObjectURL(file);

  useEffect(() => {
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return (
    <div className="group relative flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-8 text-sm">
      {isImage(file.type) ? (
        <img
          src={url}
          alt={file.name}
          className="h-8 w-8 rounded object-cover"
        />
      ) : (
        <FileTypeIcon
          mimeType={file.type}
          className="h-4 w-4 shrink-0 text-gray-500"
        />
      )}
      <div className="min-w-0">
        <p className="truncate text-gray-900 max-w-[120px]">{file.name}</p>
        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function RichEditor({
  value,
  onChange,
  placeholder = "Type your message...",
}: {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<{ root: HTMLElement } | null>(null);
  const onChangeRef = useRef(onChange);
  const placeholderRef = useRef(placeholder);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    placeholderRef.current = placeholder;
  }, [placeholder]);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    let cancelled = false;

    import("quill").then((QuillModule) => {
      if (cancelled || !containerRef.current) return;

      const Quill = QuillModule.default;

      const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],
        ["link", "clean"],
      ];

      const quill = new Quill(containerRef.current, {
        theme: "snow",
        placeholder: placeholderRef.current,
        modules: {
          toolbar: toolbarOptions,
        },
      });

      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on("text-change", () => {
        onChangeRef.current(quill.root.innerHTML);
      });

      quillRef.current = quill;
    });

    return () => {
      cancelled = true;
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={containerRef} className="min-h-[120px] sm:min-h-[200px]" />;
}

const RichEditorFallback = React.memo(function RichEditorFallback({
  value,
  onChange,
  editorError,
  editorImportStatus,
}: {
  value: string;
  onChange: (value: string) => void;
  editorError: string;
  editorImportStatus: string;
}) {
  return (
    <>
      {editorError ? (
        <p className="text-xs text-yellow-600 mb-2">{editorError}</p>
      ) : null}
      <p className="text-xs text-gray-500 mb-2">
        Editor status: {editorImportStatus}
      </p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        className="w-full h-full min-h-[140px] sm:min-h-[180px] p-3 border border-gray-200 rounded resize-none"
      />
    </>
  );
});

class EditorErrorBoundary extends React.Component<
  { children?: React.ReactNode; onError?: (error: Error) => void },
  { hasError: boolean; message: string }
> {
  constructor(props: {
    children?: React.ReactNode;
    onError?: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
    this.setState({ hasError: true, message: error?.message || String(error) });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-xs text-red-500">
          Rich editor failed to render: {this.state.message}
        </div>
      );
    }
    return this.props.children;
  }
}

export function ChatBox({
  orderId,
  initialMessages,
  viewerRole = "admin",
}: ChatBoxProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showReply, setShowReply] = useState(false);
  const [content, setContent] = useState("");
  const [editorError, setEditorError] = useState("");
  const [editorStatus, setEditorStatus] = useState<string>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [initialMessages]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("content", content);
    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    const result = await sendMessage({}, formData);

    if (result.error) {
      setError(result.error);
      setSending(false);
    } else {
      setContent("");
      setSelectedFiles([]);
      setSending(false);
      router.refresh();
    }
  }

  function handleReplyClick() {
    setShowReply(true);
    setEditorStatus("loaded");
  }

  function handleEditorError(error: Error) {
    setEditorError(`Render error: ${error.message}`);
  }

  return (
    <div className="flex flex-col">
      <div
        ref={listRef}
        className="max-h-[400px] overflow-y-auto bg-gray-50/50"
      >
        {initialMessages.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-gray-400 text-sm">No messages yet</p>
              <p className="text-gray-300 text-xs mt-1">
                Click Reply to start the conversation
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-3">
            {initialMessages.map((msg: Message) => {
              const attachments: Attachment[] = msg.attachments
                ? JSON.parse(msg.attachments)
                : [];
              const isAdmin = msg.senderRole === "admin";
              const isOwnMessage = msg.senderRole === viewerRole;
              const initial = (msg.senderName || "?").charAt(0).toUpperCase();

              return (
                <div
                  key={msg.$id}
                  className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isAdmin
                        ? "bg-primary-100 text-primary-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {initial}
                  </div>

                  <div
                    className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"} max-w-[75%]`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-900">
                        {msg.senderName}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          isAdmin
                            ? "bg-primary-50 text-primary-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isAdmin ? "Support" : "Customer"}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(msg.$createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div
                      className={`rounded-xl px-4 py-2.5 text-sm ${
                        isOwnMessage
                          ? "bg-gray-800 text-white rounded-tr-sm"
                          : "bg-white text-gray-900 border border-gray-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.content && (
                        <div className="ql-snow">
                          <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                          />
                        </div>
                      )}

                      {attachments.length > 0 && (
                        <div
                          className={`mt-3 flex flex-wrap gap-2 ${!msg.content ? "mt-0" : ""}`}
                        >
                          {attachments.map((att: Attachment) => (
                            <AttachmentPreview
                              key={att.fileId}
                              attachment={att}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!showReply ? (
        <div className="border-t border-gray-100 bg-white p-3">
          <button
            type="button"
            onClick={handleReplyClick}
            className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
          >
            <Reply className="h-4 w-4" />
            Reply to this ticket
          </button>
        </div>
      ) : (
        <>
          {selectedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-gray-100 bg-white px-4 pt-3">
              {selectedFiles.map((file, i) => (
                <FilePreview
                  key={`${file.name}-${i}`}
                  file={file}
                  onRemove={() => removeFile(i)}
                />
              ))}
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 border-t border-gray-100 bg-white p-3"
          >
            <input type="hidden" name="orderId" value={orderId} />

            <div className="flex-1 w-full min-h-[200px]">
              {editorStatus === "loaded" ? (
                <EditorErrorBoundary onError={handleEditorError}>
                  <RichEditor value={content} onChange={setContent} />
                </EditorErrorBoundary>
              ) : (
                <RichEditorFallback
                  value={content}
                  onChange={setContent}
                  editorError={editorError}
                  editorImportStatus={editorStatus}
                />
              )}
            </div>

            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
                title="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                name="files"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
                className="hidden"
                onChange={handleFileSelect}
              />

              <Button type="submit" disabled={sending} className="self-center">
                {sending ? (
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </span>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>

          {error && (
            <p className="text-xs text-red-500 px-4 pb-2 bg-white">{error}</p>
          )}
        </>
      )}
    </div>
  );
}
