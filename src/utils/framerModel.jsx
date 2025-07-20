import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

export const FramerModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
      <AnimatePresence>
        {isOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
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
                  className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl dark:bg-secondary"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                {/*/!* <button*/}
                {/*            onClick={onClose}*/}
                {/*            className="absolute top-4 right-4 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"*/}
                {/*            aria-label="Close"*/}
                {/*        >*/}
                {/*            <svg*/}
                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                {/*                className="h-6 w-6 text-gray-500 dark:text-gray-400"*/}
                {/*                fill="none"*/}
                {/*                viewBox="0 0 24 24"*/}
                {/*                stroke="currentColor"*/}
                {/*            >*/}
                {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />*/}
                {/*            </svg>*/}
                {/*        </button> *!/*/}

                <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">{children}</div>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
  );
};
