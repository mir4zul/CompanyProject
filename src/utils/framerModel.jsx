import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export const FramerModal = ({
                              isOpen,
                              onClose,
                              children,
                              maxWidth = 'max-w-5xl' // Default max-width
                            }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.body.classList.add('pr-[var(--scrollbar-width)]'); // Prevent layout shift
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('pr-[var(--scrollbar-width)]');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('pr-[var(--scrollbar-width)]');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Calculate scrollbar width and set CSS variable
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, [isOpen]);

  return (
      <AnimatePresence>
        {isOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                role="dialog"
                aria-modal="true"
            >
              {/* Backdrop */}
              <motion.div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
              />

              {/* Modal content */}
              <motion.div
                  className={`relative z-10 w-full ${maxWidth} mx-auto rounded-2xl bg-white shadow-xl dark:bg-secondary`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
              >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="Close"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="max-h-[80vh] overflow-y-auto scrollbar-thin p-6">
                  {children}
                </div>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
  );
};