import { useEffect } from "react";
import { motion } from "framer-motion";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, direction, body }) => {

  useEffect(() => {
    // disable body scrollbar
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-md bg-gray-500 z-[11]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        ></motion.div>
      )}
      {isSidebarOpen && (
        <motion.div
          layout
          className={`fixed top-0 ${direction==="left" ? "left-0" : "right-0"} h-screen bg-white w-[70%] md:w-1/2 lg:w-1/4 shadow-lg
          } z-[11]`}
          initial={{ x: direction === "left" ? "-100%" : "100%" }}
          animate={{ x: "0" }}
          exit={{ x: direction === "left" ? "-100%" : "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          
          {body}
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
