const key = import.meta.env.VITE_TMDB_KEY;
// const Key = '41c30db03810bdf0c02bbe9645a48430'
const baseUrl = "https://api.themoviedb.org/3";

const endpoints = {
    popular: `${baseUrl}/movie/popular?api_key=${key}`,
    topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
    trending: `${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
    comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=16include_adult=false`,
    upcoming: `${baseUrl}/movie/upcoming?api_key={key}`,
    // check if it does not work, not shore if its a 5 or a S or a &
};


export function createImageUrl(filename, size) {
    return `https://image.tmdb.org/t/p/${size}/${filename}`
}
export default endpoints