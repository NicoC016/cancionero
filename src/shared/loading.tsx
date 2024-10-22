import { useEffect, useState } from "react";

const Loading = ({loading}:{loading:boolean}) => {
    const [instrumentIndex, setInstrumentIndex] = useState(0);
    const instruments = [
        {
          name: "Guitarra",
          img: "/images/guitar.gif", 
        },
        {
          name: "Piano",
          img: "/images/piano.gif", 
        },
        {
          name: "Batería",
          img: "/images/violin.gif",
        },
        {
          name: "Saxofón",
          img: "/images/flute.gif", 
        },
        {
          name: "Bass",
          img: "/images/bass.gif", 
        },
      ];
    
  
      useEffect(() => {
        const interval = setInterval(() => {
          setInstrumentIndex((prevIndex:any) => (prevIndex + 1) % instruments.length);
        }, 4500);
        return () => clearInterval(interval);
      }, [instruments.length]);
  return (
    <>
    {loading && (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-gray-400 bg-white animate-spin-slow">
                <img
                    src={instruments[instrumentIndex].img}
                    alt={instruments[instrumentIndex].name}
                    className="w-24 h-24 object-contain"
                />
            </div>
        </div>
    )}
    </>
  )
}

export default Loading