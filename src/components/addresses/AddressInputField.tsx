// AddressInputField.tsx - Updated
import { AlertCircle, Sparkles } from "lucide-react";
import { AddressFormData } from "./type";

interface AddressInputFieldProps {
  id: keyof AddressFormData;
  label: string;
  value: string;
  Icon: any;
  step?: string;
  type?: string;
  error?: string;
  disabled: boolean;
  placeholder?: string;
  required?: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  description?: string;
}

export default function AddressInputField({
  id,
  label,
  value,
  Icon,
  type = "text",
  error,
  disabled,
  placeholder,
  required = false,
  handleChange,
  description,
}: AddressInputFieldProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-700 flex items-center gap-2"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {description && (
          <span className="text-xs font-medium text-emerald-600 bg-gradient-to-r from-emerald-50 to-emerald-50/50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
            <Sparkles size={10} />
            {description}
          </span>
        )}
      </div>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              disabled
                ? "bg-gray-100"
                : "bg-gradient-to-br from-emerald-50 to-white group-hover:from-emerald-100 group-focus-within:shadow-sm"
            }`}
          >
            <Icon
              className={`transition-colors duration-300 ${
                disabled
                  ? "text-gray-400"
                  : "text-emerald-600 group-hover:text-emerald-700 group-focus-within:text-emerald-700"
              }`}
              size={16}
            />
          </div>
        </div>
        {id === "addressLine1" || id === "addressLine2" ? (
          <textarea
            id={id}
            name={id}
            value={value || ""}
            onChange={handleChange}
            disabled={disabled}
            rows={2}
            className={`
              w-full pl-14 pr-4 py-4 text-gray-900 border rounded-xl
              transition-all duration-300 font-medium resize-none
              bg-white/50 backdrop-blur-sm
              ${
                disabled
                  ? "bg-gray-50/60 border-gray-200 cursor-not-allowed text-gray-600"
                  : `
                border-gray-200
                focus:outline-none focus:ring-2 focus:ring-emerald-500/30
                focus:border-emerald-400 focus:shadow-lg
                hover:border-emerald-300 hover:shadow-md
                group-hover:bg-white
              `
              }
              ${
                error
                  ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/30"
                  : ""
              }
              placeholder:text-gray-400
              shadow-sm
            `}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            value={value || ""}
            onChange={handleChange}
            disabled={disabled}
            className={`
              w-full pl-14 pr-4 py-4 text-gray-900 border rounded-xl
              transition-all duration-300 font-medium
              bg-white/50 backdrop-blur-sm
              ${
                disabled
                  ? "bg-gray-50/60 border-gray-200 cursor-not-allowed text-gray-600"
                  : `
                border-gray-200
                focus:outline-none focus:ring-2 focus:ring-emerald-500/30
                focus:border-emerald-400 focus:shadow-lg
                hover:border-emerald-300 hover:shadow-md
                group-hover:bg-white
              `
              }
              ${
                error
                  ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/30"
                  : ""
              }
              placeholder:text-gray-400
              shadow-sm
            `}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          />
        )}
      </div>
      {error && (
        <p className="text-sm font-medium text-rose-600 flex items-center gap-2 mt-2 px-3 py-2 bg-rose-50/50 rounded-lg border border-rose-100">
          <AlertCircle size={14} className="flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
