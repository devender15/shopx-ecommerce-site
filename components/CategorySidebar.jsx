import { CATEGORY_SIDEBAR } from "@constants";

export default function CategorySidebar({
  selectedCheckboxes,
  setSelectedCheckboxes,
}) {

  const handleCheckboxChange = (event, category) => {
    const value = event.target.value;
    setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [category]: value,
    }));
  };

  return (
    <div className="w-full h-full max-h-full overflow-y-auto px-4 py-2">
      <div className="w-[80%] mx-auto mt-4">
        <div className="flex flex-col gap-y-4">
          {Object.keys(CATEGORY_SIDEBAR).map((item, index) => (
            <div key={index}>
              <h2 className="text-base font-semibold mb-2">{item}</h2>
              <ul>
                {CATEGORY_SIDEBAR[item].map((cat) => (
                  <li key={cat.id}>
                    <div className="flex items-center pl-3">
                      <input
                        id={cat.name}
                        type="checkbox"
                        value={cat.value}
                        checked={selectedCheckboxes[item] === cat.value}
                        onChange={(event) => handleCheckboxChange(event, item)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for={cat.name}
                        className="w-full py-3 ml-2 text-sm font-medium text-gray-900"
                      >
                        {cat.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
