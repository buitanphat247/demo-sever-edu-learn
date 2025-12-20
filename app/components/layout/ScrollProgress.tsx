"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Tính phần trăm scroll
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Tính toán ban đầu
    calculateScrollProgress();

    // Lắng nghe sự kiện scroll
    window.addEventListener("scroll", calculateScrollProgress, { passive: true });
    window.addEventListener("resize", calculateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] transition-all duration-150 ease-out origin-left"
      style={{
        transform: `scaleX(${scrollProgress / 100})`,
        transformOrigin: "left",
      }}
    />
  );
}

