"use client";

import StarRatingBasic from "@/components/commerce-ui/star-rating-basic";
import { useState, useEffect } from "react";

interface StarRatingProps {
  maxStars?: number;
  value: number;
  onChange?: (value: number) => void; // accept onChange from parent
}

export default function StarRating({
  maxStars = 5,
  value,
  onChange,
}: StarRatingProps) {
  const handleChange = (newRating: number) => {
    if (onChange) {
      onChange(newRating); // Send updated rating to parent component (to update backend)
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <StarRatingBasic
        value={value}
        onChange={handleChange}
        maxStars={maxStars}
      />
      <p>({value})</p>
    </div>
  );
}
