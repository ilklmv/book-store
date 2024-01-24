import React from "react";
import dynamic from "next/dynamic";

const DynamicSlider = dynamic(() => import("../components/slider"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <div>
      <DynamicSlider />
      {/* Your book list and filters */}
    </div>
  );
};

export default HomePage;
