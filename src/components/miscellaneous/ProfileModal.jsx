import React, { useState } from "react";

const ProfileModal = ({ user, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {children ? (
        <span onClick={() => setIsOpen(true)}>{children}</span>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full text-blue-600 hover:text-yellow-500 focus:outline-none"
        >
          👁️
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
              {user.name}
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={user.pic}
                alt={user.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-200"
              />
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
