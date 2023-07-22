export default function Badge({ text, type }) {
  return (
    <div
      className={`px-3 py-1 w-fit text-center ${
        type === "new" ? "bg-purple-500" : "bg-pink-400"
      } text-white rounded-md text-xs font-semibold`}
    >
      <span>{text}</span>
    </div>
  );
}
