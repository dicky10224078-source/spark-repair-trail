import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png"];

export function FileDropzone({ label, onChange }: { label: string; onChange?: (n: number) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  useEffect(() => { onChange?.(files.length); }, [files.length]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const ok: File[] = [];
    let err = "";
    Array.from(list).forEach((f) => {
      if (!TYPES.includes(f.type)) err = `${f.name}: format harus JPG/PNG`;
      else if (f.size > MAX) err = `${f.name}: ukuran melebihi 5MB`;
      else ok.push(f);
    });
    setError(err);
    setFiles((p) => [...p, ...ok]);
  };

  return (
    <div>
      <span className="label">{label}</span>
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-7 text-center transition ${drag ? "border-primary bg-primary-soft" : "border-input hover:border-primary/60 hover:bg-muted/50"}`}
      >
        <ImagePlus className="mb-2 h-7 w-7 text-primary" />
        <p className="text-sm font-medium text-foreground">Tarik & lepas foto di sini, atau <span className="text-primary">pilih file</span></p>
        <p className="mt-1 text-xs text-muted-foreground">JPG / PNG, maksimal 5MB per file</p>
        <input ref={ref} type="file" accept="image/png,image/jpeg" multiple hidden onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f, i) => (
            <div key={i} className="relative h-16 w-16 overflow-hidden rounded-lg border border-border">
              <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
              <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="absolute right-0.5 top-0.5 rounded-full bg-foreground/70 p-0.5 text-background">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
