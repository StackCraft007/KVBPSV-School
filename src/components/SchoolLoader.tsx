import React from "react";

const SchoolLoader: React.FC = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <div className="flex flex-col items-center">
      <div className="animate-throb mb-6">
        <img
          src="/images/logo/Phadke logo photo.avif"
          alt="Krantiveer Vasudev Balwant Phadke"
          className="h-32 w-32 rounded-full border-4 border-orange-400 shadow-lg"
        />
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary mb-1 animate-throb">
          क्रांतिवीर वासुदेव बळवंत
        </div>
        <div className="text-2xl md:text-3xl font-bold animate-throb">
          फडके स्मृति विद्यालय
        </div>
      </div>
    </div>
  </div>
);

export default SchoolLoader;