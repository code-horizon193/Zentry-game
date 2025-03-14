import { useState, useRef } from "react";

const MoveImg = ({ src, className = "" }) => {
  const [newTransform, setnewTransform] = useState("");

  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;

    const { left, top, width, height } =
      sectionRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const rotatex = (relativeY - 0.5) * 25;
    const rotatey = (relativeX - 0.5) * -25;

    const mainTransform = `perspective(700px) rotateX(${rotatex}deg) rotateY(${rotatey}deg) scale3d(.95, .95, .95)`;
    setnewTransform(mainTransform);
  };

  const handleMouseLeave = () => {
    setnewTransform("");
  };

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => handleMouseMove}
      onMouseLeave={() => handleMouseLeave} 
      onMouseUp={()=> handleMouseLeave}
      className={className}
    >
      <div
        className="origin-center cursor-pointer overflow-hidden rounded-lg size-full"
        style={{ transform: newTransform }}
      >
        <img
          src={src}
          alt={src}
          className="size-full object-center object-cover" 
          loading="lazy" 
        />
      </div>
    </div>
  );
};

export default MoveImg;
