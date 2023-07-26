export default function Heading({ text }) {
  return (
    <div className="flex items-center justify-center w-[80%] md:w-[60%] lg:w-1/2 mx-auto">
      <div className="h-[2px] flex-grow w-4 bg-black"></div>
      <div className="mx-4 font-bold text-base  md:text-2xl uppercase">{text}</div>
      <div className="h-[2px] flex-grow bg-black w-4"></div>
    </div>
  );
}
