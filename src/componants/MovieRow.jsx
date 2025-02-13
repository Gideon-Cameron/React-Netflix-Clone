// import axios from 'axios';
// import React, {useEffect, useState } from 'react'
// import MovieItem from './MovieItem';
// import { MdChevronLeft, MdChevronRight} from 'react-icons/md'

// const MovieRow = ({title, url}) => {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//       axios.get(url).then((response) => setMovies(response.data.results));
//     }, [url])


//     const slide = (offset) => {
//       const slider = document.getElementById("slider")
//       slider.scrollLeft = slider.scrollLeft + offset
//     }

    
//   return (
//     <>
//     <h2 className='font-sans-bold md:text-xl p-4 capitalize'>{title}</h2>
//     <div className="relative flex items-center group">
//       <MdChevronLeft
//       onClick={() => slide(-500)}
//        size={40} 
//        className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"/>
//       <div id={'slider'}
//       className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
//       {movies.map((movie) => (
//         <MovieItem key={movie.id} movie={movie} />
//       ))}
//       </div>
//       <MdChevronRight
//       onClick={() => slide(+500)}
//        size={40} 
//        className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"/>
//     </div>
//     </>

    
//   )
// }

// export default MovieRow




























// Code that works with the slider/ might solve the problem if I continue





import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import MovieItem from './MovieItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const MovieRow = ({ title, url }) => {
    const [movies, setMovies] = useState([]);
    const sliderRef = useRef(null); // Create a reference for the slider

    useEffect(() => {
        axios.get(url).then((response) => setMovies(response.data.results));
    }, [url]);

    // Function to handle sliding
    const slide = (offset) => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += offset;
        }
    };

    return (
        <>
            <h2 className='font-sans-bold md:text-xl p-4 capitalize'>{title}</h2>
            <div className="relative flex items-center group">
                {/* Left Arrow */}
                <MdChevronLeft
                    onClick={() => slide(-500)}
                    size={40}
                    className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                />

                {/* Slider Container */}
                <div
                    ref={sliderRef} // Attach ref to the slider div
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                >
                    {movies.map((movie) => (
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* Right Arrow */}
                <MdChevronRight
                    onClick={() => slide(500)}
                    size={40}
                    className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                />
            </div>
        </>
    );
};

export default MovieRow;
