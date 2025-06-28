import { Edit, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };
  
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full">
          <PlayCircle className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Lecture {index + 1}: {lecture.lectureTitle}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lecture.videoUrl ? "Video uploaded" : "No video uploaded"}
          </p>
        </div>
      </div>
      
      <Button
        onClick={goToUpdateLecture}
        size="sm"
        variant="ghost"
        className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors duration-200"
      >
        <Edit className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </div>
  );
};

export default Lecture;
