import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbox() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    // redirect to search page
    router.push(`/shop?q=${searchQuery}`);

    // clearing the search input
    setSearchQuery("");
  };

  return (
    <div className="w-full h-full">
      <form
        className="flex items-center gap-x-2 border border-gray-400"
        onSubmit={handleSubmitForm}
      >
        <input
          type="text"
          placeholder="Search product..."
          className="border-none outline-none p-2 font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="w-14 h-12 flex justify-center items-center bg-[#a749ff]"
        >
          <AiOutlineSearch fontSize={25} title="Search" color="#fff" />
        </button>
      </form>
    </div>
  );
}
