import React from "react";

const students = [
  { name: "Rajesh Patel", level: "1", rating: 4 },
  { name: "Sneha Shah", level: "1A", rating: 5 },
  { name: "Amit Mehta", level: "2", rating: 3 },
  { name: "Pooja Desai", level: "2A", rating: 4.5 },
  { name: "Kunal Joshi", level: "3", rating: 2 },
  { name: "Neha Sharma", level: "3A", rating: 4 },
];

export default function StudentRating() {
  return (
    <div className="container mx-auto w-full mb-10 p-5 bg-white border border-custom-blue rounded-lg shadow-md">
      <h5 className="mb-4 text-2xl font-bold text-gray-900 text-center">
        Student Star Rating
      </h5>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">Level</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.level}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < student.rating ? "#FFD700" : "#E5E7EB"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.25l-5.4 3.18 1.03-5.99L2.5 9.82l6.04-.88L12 3.75l2.46 5.19 6.04.88-4.37 4.62 1.03 5.99z"
                      />
                    </svg>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
