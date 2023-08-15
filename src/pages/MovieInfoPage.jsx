import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getMovieByID } from "../storage/slides/movieSlice";
import OnLoadingScreen from "../components/OnLoadingScreen";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgressBar from "../components/CircularProgressBar";
import Youtube from "react-youtube";

const MovieInfoPage = ({}) => {
  const { movieInfo } = useSelector((state) => state.movies);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [imageUrl, setImageURL] = useState(
    "https://www.themoviedb.org/t/p/original"
  );
  const isMobileScreen = useMediaQuery("(max-width:560px)");
  const voteAvgInPercentage = Math.round(movieInfo.vote_average * 10);

  useEffect(() => {
    dispatch(getMovieByID(id)).then(() => {
      setIsLoading(false);
    });
  }, [id]);


  
  const renderMovieInfo = () => {
    return (
      <>
        <div className=" h-full w-full ">
          <div id="banner-section" className="h-full w-full   ">
            {renderTitleAndBannerSection()}
          </div>

          <div id="details" className=" ">
            {renderSecondSection()}
          </div>
        </div>
      </>
    );
  };
 
  const renderTitleAndBannerSection = () => {
    return (
      <>
        <div className="xl:container mx-auto h-full  w-full flex justify-center ">
          <div className="relative sm:h-128 h-176  w-full   bg-black ">
            <div id="image-background" className="h-128 w-full opacity-40 ">
              <img
                className="w-full sm:h-full h-176 object-cover"
                src={`${imageUrl}/${movieInfo.backdrop_path}`}
                alt="Banner Image"
              />
            </div>
            <div className="absolute top-0 h-full w-full  flex sm:flex-row flex-col   ">
              <div id="poster" className="  sm:pt-0 pt-2  sm:w-2/6 w-full">
                <div className="w-full h-full flex justify-center items-center   ">
                  <img
                    className="lg:h-112 md:h-96 sm:h-80 h-72 lg:w-76 md:w-64 sm:w-56 w-48 shadow-xl rounded-xl border-4 border-white bg-gray-200"
                    src={`${imageUrl}/${movieInfo.poster_path}`}
                  />
                </div>
              </div>
              <div
                id="content"
                className="px-2 lg:pt-10 md:pt-16  pt-2  h-full sm:w-4/6 w-full   "
              >
                <div className="   ">
                  <p className="text-white md:text-4xl sm:text-3xl text-2xl font-semibold  ">
                    {movieInfo.title}
                  </p>
                </div>
                <hr className="border my-2 mt-3" />
                <div className="text-white  flex flex-wrap  ">
                  {/* <span className="font-semibold">Genres :</span> */}
                  {movieInfo.genres.map((genre, index) => (
                    <span
                      className="md:text-base sm:text-sm text-xs bg-yellow-500 ml-1 rounded-lg p-1 cursor-pointer"
                      key={genre.id}
                    >
                      {genre.name}
                      {/* {index !== movieInfo.genres.length - 1 && ","} */}
                    </span>
                  ))}
                </div>
                <div className="w-full mt-2 flex items-center">
                  <CircularProgressBar percentage={voteAvgInPercentage} />
    
                </div>

                <div id="overview" className=" text-white    ">
                  <p className=" md:text-2xl sm:text-xl text-lg font-bold py-2   ">
                    Overview
                  </p>
                  <p
                    className={`${
                      movieInfo.overview.length >= 1380
                        ? "overflow-y-scroll "
                        : ""
                    } lg:h-64 md:h-48 sm:h-40 h-36   md:text-lg sm:text-base text-sm font-normal overflow-auto    `}
                  >
                    {movieInfo.overview}{movieInfo.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
 
  const renderSecondSection = () => {
    return (
      <>
        <div className="xl:container mx-auto bg-red-200 w-full h-full  ">
          <div className="flex  sm:flex-row flex-col-reverse ">
            <div className="w-full bg-green-200 ">
              <p className="text-lg font-semibold">details</p>
              <p>123</p>
              <p>123</p>
            </div>
            <div className="w-full "> {renderTrailerSection()}</div>
          </div>
        </div>
      </>
    );
  };

  const renderTrailerSection = () => {
    const trailer = movieInfo.videos.results.find(
      (vid) =>
        vid.name === "Official Trailer" ||
        vid.name === "Main Trailer" ||
        vid.name === "Teaser Trailer" ||
        vid.name === "Trailer"
    );

    return (
      <>
        <div className=" ">
          <div className="  w-full h-full flex justify-center items-center    ">
            {trailer && (
              <div className="h-full w-full   p-2 ">
                <Youtube
                  className=" sm:h-112 h-52  w-full "
                  videoId={trailer.key}
                  opts={{ height: "100%", width: "100%" }}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  
  return (
    <>
      {console.log(movieInfo)}
      <div className="  w-full h-full ">
        {isLoading ? <OnLoadingScreen /> : renderMovieInfo()}
      </div>
    </>
  );
};

export default MovieInfoPage;
