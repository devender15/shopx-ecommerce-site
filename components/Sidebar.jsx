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
          className="fixed inset-0 bg-opacity-50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        ></motion.div>
      )}
      {isSidebarOpen && (
        <motion.div
          layout
          className={`fixed top-0 right-0 h-screen bg-white w-1/5 shadow-lg
          }`}
          initial={{ x: "100%" }}
          animate={{ x: "0" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
        >
          {body}
        </motion.div>
      )}

      {/* {isSidebarOpen && (
        <div
          className={`flex-1 bg-gray-100 p-8 ${isSidebarOpen ? "ml-1/5" : ""}`}
        >
        </div>
      )} */}
    </>
  );
};

export default Sidebar;
