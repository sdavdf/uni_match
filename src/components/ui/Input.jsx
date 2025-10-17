export default function Input({ label, type, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}
