import { AnimatePresence, motion } from 'framer-motion';

export const FramerDropdown = ({ isOpen, children }) => {
  return (
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-2 right-0 z-50 mt-2 min-w-[150px] rounded-md bg-gray-800 shadow-lg"
                  onClick={(e) => e.stopPropagation()} // Prevent click from closing parent
              >
                {children}
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};