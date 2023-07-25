export default function Counter({ value }) {
  return (
    <div className={`${value === 0 ? 'hidden' : 'block'} absolute -top-2 -right-2 rounded-full p-2 bg-black h-5 w-5 text-center text-xs flex justify-center items-center text-white`}>
      <span>{value}</span>
    </div>
  );
}
