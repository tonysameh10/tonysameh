"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface ChipInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function ChipInput({ value, onChange, placeholder }: ChipInputProps) {
  const [text, setText] = useState("");

  function add() {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setText("");
  }

  function remove(item: string) {
    onChange(value.filter((v) => v !== item));
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder ?? "اكتب واضغط Enter"}
          className="flex-1 rounded-md border border-line bg-white px-3 py-2 text-ink placeholder:text-muted focus:border-brand focus:outline-none"
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center rounded-md border border-brand px-3 text-brand hover:bg-brand/5"
          aria-label="إضافة"
        >
          <Plus size={18} />
        </button>
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {value.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft/60 px-3 py-1 text-sm text-brand-deep"
            >
              {item}
              <button
                type="button"
                onClick={() => remove(item)}
                className="text-brand hover:text-danger"
                aria-label={`إزالة ${item}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
