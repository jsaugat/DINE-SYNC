import React, { useState } from "react";
import { setSize } from "@/slices/reservation/selectionSlice";
import { useSelector, useDispatch } from "react-redux";

function PartySizePicker() {
  const selectedSize = useSelector((state) => state.selection.size);
  const dispatch = useDispatch();
  return (
    <>
      <label className="text-[0.9rem] text-googleBlue mt-4">
        Select a Party Size
      </label>
      <section className="flex justify-center gap-5 border border-neutral-800 p-2 rounded-full mt-2 w-fit">
        {[2, 4, 6, 8].map((option) => (
          <button
            key={option}
            onClick={() => dispatch(setSize(option))}
            className={`${
              selectedSize === option
                ? "bg-antiFlash hover:bg-white text-black"
                : null
            } rounded-full size-5 border border-onyx cursor-pointer hover:bg-neutral-800 flex items-center justify-center p-5 flex-1`}
          >
            {option}
          </button>
        ))}
      </section>
      {/* <div className='rounded-full size-5 border border-onyx cursor-pointer hover:bg-neutral-800 flex items-center justify-center p-5 flex-1'>2</div>
      <div className='rounded-full size-5 border border-onyx cursor-pointer hover:bg-neutral-800 flex items-center justify-center p-5 flex-1'>4</div>
      <div className='rounded-full size-5 border border-onyx cursor-pointer hover:bg-neutral-800 flex items-center justify-center p-5 flex-1'>6</div>
      <div className='rounded-full size-5 border border-onyx cursor-pointer hover:bg-neutral-800 flex items-center justify-center p-5 flex-1'>8</div> */}
    </>
  );
}

export default PartySizePicker;

// import React, { useEffect, useRef, useState } from "react";
// import { Slider } from "@/shadcn/ui/slider";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// export default function PartySizePicker() {
//   const [partySize, setPartySize] = useState(2);
//   const [isDragging, setIsDragging] = useState(false);
//   const dragRef = useRef(null);

//   const minNumber = 1;
//   const maxNumber = 10;
//   const sensitivity = 0.09; // Adjust sensitivity as needed

//   const handleMouseDown = () => {
//     setIsDragging(true);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (event) => {
//     if (isDragging) {
//       const delta = event.movementX * sensitivity;
//       const newNumber = Math.min(
//         Math.max(partySize + delta, minNumber),
//         maxNumber
//       );
//       // Ensure the new number is an even value
//     const roundedNumber = Math.round(newNumber / 2) * 2;

//     setPartySize(roundedNumber);
//     }
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//     } else {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, partySize]);

//   return (
//     <main className="Slider mt-4">
//       <label className="text-[0.9rem] text-googleBlue">Set a Party Size</label>
//       <section className="flex gap-3 border border-neutral-800 p-2 pl-5 rounded-full mt-2">
//         <Slider
//           min={2}
//           max={10}
//           step={2}
//           defaultValue={[2]}
//           value={[partySize]}
//           onValueChange={([newValue]) => setPartySize(newValue)}
//         />
//         {/* Counter */}
//         <div className="flex justify-center items-center gap-1 rounded-full border border-onyx p-1 max-w-fit">
//           <KeyboardArrowLeftIcon
//             fontSize="small"
//             onClick={() => setPartySize((prev) => (prev <= 1 ? 1 : prev - 2))}
//             className={`${partySize <= 1 ? "text-neutral-500 pointer-events-none" : null} flex place-content-center rounded-full hover:border hover:border-onyx hover:bg-onyx/50`}
//           />
//           <span
//             ref={dragRef}
//             style={{
//               cursor: isDragging ? "grabbing" : "w-resize",
//               userSelect: "none",
//             }}
//             onMouseDown={handleMouseDown}
//             className="flex justify-center w-4 text-[1rem]"
//           >
//             {partySize.toFixed(0)}
//           </span>
//           <KeyboardArrowRightIcon
//             fontSize="small"
//             onClick={() =>
//               setPartySize((prev) => (prev >= 10 ? 10 : prev + 2))
//             }
//             className={`${partySize >= 10 ? "text-neutral-500 pointer-events-none" : null} h-full rounded-full hover:border hover:border-onyx hover:bg-onyx/50`}
//           />
//         </div>
//       </section>
//     </main>
//   );
// }
