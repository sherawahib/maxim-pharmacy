type FieldProps = {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const inputClass =
  "w-full min-h-11 border border-line bg-white px-4 text-sm text-navy transition-colors focus:outline-none focus:border-blue";

export function Field({
  label,
  id,
  type = "text",
  required,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-2">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export function TextArea({
  label,
  id,
  required,
  rows = 5,
}: {
  label: string;
  id: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy mb-2">
        {label}
        {required ? " *" : ""}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={rows}
        className="w-full border border-line bg-white px-4 py-3 text-sm text-navy transition-colors focus:outline-none focus:border-blue"
      />
    </div>
  );
}
