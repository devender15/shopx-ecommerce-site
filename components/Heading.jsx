export default function Heading({ text }) {
  return (
    <div className="flex items-center justify-center w-1/2 mx-auto">
      <div className="flex-grow h-px bg-black"></div>
      <div className="mx-4 font-bold text-2xl uppercase">{text}</div>
      <div className="flex-grow h-px bg-black w-4"></div>
    </div>
  );
}
