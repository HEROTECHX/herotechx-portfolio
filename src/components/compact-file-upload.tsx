import { Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export function CompactFileUpload({ onChange }: { onChange?: (files: File[]) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onChange && onChange([selectedFile]);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    onChange && onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative cursor-pointer rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800/30 p-4 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all"
      >
        {file && preview ? (
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-neutral-900">
              <img 
                src={preview} 
                alt="Preview" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {file.name}
              </p>
              <p className="text-xs text-white">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="shrink-0 p-1 hover:bg-neutral-700 rounded transition-colors"
            >
              <X className="h-4 w-4 text-neutral-400 hover:text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
              <Upload className="h-5 w-5 text-neutral-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-300">
                Upload profile image
              </p>
              <p className="text-xs text-neutral-500">
                Click to browse
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}