"use client";

import React, { useState } from "react";
import Image from "next/image";

interface TeamBadgeProps {
  teamCode: number;
  teamName: string;
}

export default function TeamBadge({ teamCode, teamName }: TeamBadgeProps) {
  const [imageError, setImageError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  const badgeUrls = [
    `https://resources.premierleague.com/premierleague25/badges-alt/${teamCode}.svg`,
    `https://resources.premierleague.com/premierleague/badges/rb/t${teamCode}.svg`,
    `https://resources.premierleague.com/premierleague/badges/t${teamCode}.svg`,
  ];

  const handleImageError = () => {
    if (currentUrlIndex < badgeUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
        {teamName.slice(0, 3).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={badgeUrls[currentUrlIndex]}
      width={40}
      height={40}
      alt={teamName}
      className="w-8 h-8 object-contain"
      onError={handleImageError}
    />
  );
}
