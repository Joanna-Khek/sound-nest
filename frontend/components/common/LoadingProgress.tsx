"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export default function LoadingProgress() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Progress
        value={progress}
        className="w-full h-2 rounded-full bg-gray-200 overflow-hidden [&>div]:bg-indigo-600 [&>div]:transition-all"
      />
      <p className="text-sm text-gray-600 text-center">Processing...</p>
    </div>
  );
}
