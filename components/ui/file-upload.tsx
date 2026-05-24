import { Upload } from "lucide-react";

type FileUploadProps = {
  label: string;
};

export function FileUpload({ label }: FileUploadProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[16px] font-medium text-dark">{label}</label>
      <div className="border border-dashed border-border rounded-input p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition">
        <Upload size={24} className="text-muted" />
        <p className="text-[14px] text-muted">
          Drag &amp; drop or <span className="text-primary underline">browse</span>
        </p>
      </div>
    </div>
  );
}
