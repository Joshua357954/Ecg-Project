
export const Swatch = ({ color, isDisabled }) => {
    const handleDragStart = (event) => {
      event.dataTransfer.setData("color", color);
    };
  
    return (
      <div
        className={`w-4 h-4 rounded-full m-2 ${isDisabled ? "opacity-50" : ""}`}
        draggable={!isDisabled}
        onDragStart={handleDragStart}
        style={{
          backgroundColor: color,
          pointerEvents: isDisabled ? "none" : "auto",
        }}
      ></div>
    );
  };
  