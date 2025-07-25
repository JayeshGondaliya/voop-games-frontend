import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailsPage() {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;
    const { code } = useParams();

    const [game, setGame] = useState(null);
    const [relatedGames, setRelatedGames] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const gameContainerRef = useRef(null);

    const fetchGameDetails = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/game/getGameIndividual/${code}`, { withCredentials: true });
            if (res.data.success) {
                setGame(res.data.data);
                setErrorMsg("");
            } else {
                setErrorMsg(res.data.message || "Failed to fetch game details");
                setGame(null);
            }
        } catch (error) {
            setErrorMsg("Something went wrong while fetching game details!");
            setGame(null);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryGames = async (categoryName) => {
        setRelatedLoading(true);
        try {
            const res = await axios.get(`${url}/api/game/category/${categoryName}`, { withCredentials: true });
            if (Array.isArray(res.data.data)) {
                setRelatedGames(res.data.data);
            } else {
                setRelatedGames([]);
            }
        } catch (error) {
            console.error("Error fetching related games", error);
            setRelatedGames([]);
        } finally {
            setRelatedLoading(false);
        }
    };

    useEffect(() => {
        if (code) {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // offset header height
            fetchGameDetails();
        }
    }, [code]);


    useEffect(() => {
        if (game?.category) {
            fetchCategoryGames(game.category);
        } else {
            setRelatedGames([]);
        }
    }, [game]);

    // Smooth scroll to game details section on mobile and desktop with offset
    useEffect(() => {
        if (game && gameContainerRef.current) {
            const yOffset = -64; // Adjust offset as needed for fixed header height
            const y = gameContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [game]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }


    if (errorMsg) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900 text-red-500 px-4 text-center">
                <p className="text-xl font-semibold">{errorMsg}</p>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-900 p-2  text-white relative flex-col">
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                />
            )}

            <div className="flex-1 p-0  m-0 w-full">
                {/* Game Detail */}
                {game && (
                    <div
                        ref={gameContainerRef}
                        className="relative bg-gray-900 rounded-lg shadow-lg p-0 sm:p-6 mb-6 flex flex-col lg:flex-row gap-6 lg:items-stretch"
                    >
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <img
                                src={`https://www.lukogames.com/assets/games/${game.code}/banner.png`}
                                alt={game.name}
                                className="w-full h-full max-h-[400px] lg:max-h-[500px] object-cover rounded-lg border-2 border-gray-700"
                            />
                        </div>

                        {/* Right Side - Game Details */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-between">
                            <div className="space-y-3 2xl:space-y-5">
                                <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-extrabold text-white">
                                    {game.name}
                                </h2>

                                <p className="text-gray-400 text-base lg:text-lg 2xl:text-2xl">
                                    Category:{" "}
                                    <span
                                        className="font-semibold text-red-400 cursor-pointer hover:text-blue-600 2xl:text-2xl"
                                        onClick={() => navigate(`/category/${game.category}`)}
                                    >
                                        {game.category}
                                    </span>
                                </p>

                                <div className="line-clamp-3">
                                    <p className="text-gray-300 text-sm lg:text-base 2xl:text-xl leading-relaxed 2xl:leading-loose">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="
            overflow-hidden 
            max-h-[4.2rem]       
            sm:max-h-[3.2rem]     
            lg:max-h-[6rem]       
            xl:max-h-none xl:overflow-visible 
            2xl:max-h-none 2xl:overflow-visible
        ">
                                    <div className="
                overflow-hidden
                max-h-[3.8rem]         
                sm:max-h-[5rem]        
                xl:max-h-[5rem]         
                2xl:max-h-none 2xl:overflow-visible
            ">
                                        <div className="flex flex-wrap gap-1 sm:gap-2 2xl:gap-4">
                                            {game.tag.split(",").map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-700 text-white text-[10px] sm:text-xs md:text-sm 2xl:text-lg font-medium px-2 py-[2px] 2xl:px-3 2xl:py-1 rounded-md leading-tight"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={
                                    game.category === "Quiz"
                                        ? `https://lukogames.com/quiz/index.php?code=${game.code}`
                                        : `https://lukogames.com/games/${game.code}`
                                }
                                target="_self"
                                rel="noopener noreferrer"
                                className="inline-block bg-red-600 hover:bg-red-700 transition px-6 py-2 2xl:px-8 2xl:py-4 rounded-lg font-bold text-white text-center mt-2 text-base 2xl:text-2xl"
                            >
                                Play Now
                            </a>
                        </div>


                    </div>
                )}

                {/* Related Games */}
                <h1 className="text-2xl  sm:text-3xl font-bold text-start text-white mb-2">
                    Related Games
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {relatedGames.map((relatedGame) => (
                        <div
                            key={relatedGame.code}
                            className="rounded-xl overflow-hidden bg-gray-800 transition-transform hover:-translate-y-1 cursor-pointer"
                            onClick={() => window.location.href = `/${relatedGame.code}`}
                        >
                            <div className="h-50 bg-gray-700 relative group">
                                <img
                                    src={`https://www.lukogames.com/assets/games/${relatedGame.code}/square.png`}
                                    alt={relatedGame.name}
                                    className="h-70 w-full object-cover shadow-lg"
                                    loading="lazy"
                                />
                                {/* <div
                                    className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-100 transition-opacity duration-300 z-20"
                                    style={{
                                        backgroundColor: "rgba(58, 58, 58, 0.6)",
                                        backdropFilter: "blur(-10px)",
                                        height: "200%",
                                    }}
                                > */}
                                {/* <p
                                        className="text-white text-lg font-semibold px-4 py-2 rounded"
                                        style={{
                                            boxShadow: "0 0 0px 0px rgba(55, 0, 0, 0.5)",
                                            height: "100px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {relatedGame.name}
                                    </p> */}
                                {/* </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
