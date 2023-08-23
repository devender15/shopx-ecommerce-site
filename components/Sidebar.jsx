import { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, body }) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-opacity-50 backdrop-blur-md bg-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        ></motion.div>
      )}
      {isSidebarOpen && (
        <motion.div
          layout
          className={`fixed top-0 right-0 h-screen bg-white w-[70%] md:w-1/2 lg:w-1/4 shadow-lg
          }`}
          initial={{ x: "100%" }}
          animate={{ x: "0" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          
          {body}
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
