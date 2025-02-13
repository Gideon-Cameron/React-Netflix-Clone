import React, { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import { AiOutlineClose} from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { db } from '../services/firebase'
import { createImageUrl } from '../services/MovieServices'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'

const Profile = () => {
  const sliderRef = useRef(null)
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {

    if (user) {
      onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        if(doc.data()) setMovies(doc.data().favShows); // if there are any problems tcheck the spelling of favShows to make sure that it matches
      })
    }

  }, [user?.email]);

  const slide = (offset) => {
    if (sliderRef.current) {
        sliderRef.current.scrollLeft += offset;
    }
};


   const handleUnlikedShow = async (movie) => {
    const userDoc = doc(db, 'users', user.email)

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    })
   }

  if(!user) {
    return (
      <>
      <p>fetching shows...</p>
      </>
    )
  }

  return (
    <>
    <div>
    <div className='relative'>
    <img 
      className='block w-full h-[500px] object-cover'
      src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/ET-en-20240930-TRIFECTA-perspective_ea8ae4a0-8c35-42ea-876f-8b7ad74d7217_large.jpg" 
      alt="//" 
    />
    {/* Overlay */}
    <div className='absolute top-0 left-0 w-full h-[500px] bg-black/60 z-10' />
    
    {/* Text Content */}
    <div className='absolute top-1/2 left-0 transform -translate-y-1/2 p-4 md:p-8 z-20'>
      <h1 className='text-3xl md:text-5xl font-sans-bold text-white my-2'>My Shows</h1>
      <p className='font-sans-light text-gray-300 text-lg'>{user.email}</p>
    </div>
  </div>
      {/* Movie row */}
      <h2 className='font-sans-bold md:text-xl p-4 capitalize'>Fav shows</h2>
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
                        


                        <div 
                        key={movie.id}
                        className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer mr-4">
                          <img
                           className="w-full h-40 block object-cover object-top"
                           src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                           alt={movie.title}
                           />
                         <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                         <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full">
                           {movie.title}
                         </p>

                         <p>
                          <AiOutlineClose 
                          onClick={() => handleUnlikedShow(movie)}
                          size={30} 
                          className='absolute top-2 right-2' 
                          />
                         </p>

                         </div>
                       </div>



                    ))}
                </div>

                {/* Right Arrow */}
                <MdChevronRight
                    onClick={() => slide(500)}
                    size={40}
                    className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
                />
            </div>

    </div>
    </>
  )
}

export default Profile
