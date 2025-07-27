import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function SlideInModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <>
        {/* Vertical Trigger Buttons (fixed to right side) */}
        <div className="fixed rotate-90 -right-12 top-1/2 transform -translate-y-1/2 flex flex-row gap-2 z-50">
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-amber-600 text-sm text-white px-2 rounded-l shadow-lg hover:bg-amber-700 transition-all"
          >
            Menu 1
          </button>
          <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-amber-600 text-sm text-white px-2 py-1 rounded-l shadow-lg hover:bg-amber-700 transition-all"
          >
            Menu 2
          </button>
        </div>

        {/* Overlay & Modal */}
        <div
            className={clsx(
                "fixed inset-0 z-40 flex justify-end items-center bg-black/50 bg-opacity-30 transition-opacity",
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsOpen(false)}
        >
          {/* Slide-in Panel from Right */}
          <div
              className={clsx(
                  "relative max-h-screen bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300",
                  "overflow-y-auto", // Enable scrolling if content is long
                  "w-full max-w-md", // Responsive width
                  isOpen ? "translate-x-0" : "translate-x-full"
              )}
              onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 z-50"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Panel Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Side Panel
              </h2>

              <div className="space-y-4">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="p-3 border-b border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        Item {i + 1}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Content for item {i + 1}
                      </p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}