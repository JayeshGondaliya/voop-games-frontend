import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const GameCard = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [allGame, setAllGame] = useState([]);
    const [gameMSG, setGameMSG] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API_URL;


    const search = searchParams.get("search") || "";

    const getGameAll = async () => {
        try {
            const res = await axios.get(`${url}/api/game/gameGet`, {
                params: {
                    page,
                    limit: 10,
                    search,
                    category,
                },
                withCredentials: true,
            });

            if (res.data.data && res.data.data.length > 0) {
                setAllGame(res.data.data);
                setTotalPages(res.data.totalPages || 1);
                setGameMSG("");
            } else {
                setAllGame([]);
                setGameMSG("No games found");
            }
        } catch (error) {
            console.error("Error fetching games:", error);
            setGameMSG("Failed to fetch games");
        }
    };

    useEffect(() => {
        getGameAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search, category]);

    useEffect(() => {
        setPage(1);
    }, [search, category]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <main
            className={` transition-all duration-300 ${isSidebarOpen
                ? "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm overflow-y-auto"
                : "relative"
                } p-4 md:p-0`}
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
            <div onClick={(e) => e.stopPropagation()}>
                <div className="pb-4  text-center">
                    <h2 className="text-2xl font-bold text-white">
                        {category ? `Games in ${category}` : ""}
                    </h2>
                </div>


                {gameMSG && (
                    <p className="text-red-500 text-center mb-4">{gameMSG}</p>
                )}

                {/* Grid with 2 columns on mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                    {allGame.map((game, index) => (
                        <div
                            key={index}
                            className="rounded-xl overflow-hidden bg-gray-800 transition-transform hover:-translate-y-1 cursor-pointer"
                            onClick={() => navigate(`/${game.code}`)}
                        >
                            <div className="h-50 bg-gray-700 relative group">
                                <img
                                    src={`https://www.lukogames.com/assets/games/${game.code}/square.png`}
                                    alt={game.name}
                                    className="h-70 w-full object-cover shadow-lg"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-100 transition-opacity duration-300 z-20"
                                    style={{
                                        backgroundColor: "rgba(58, 58, 58, 0.6)",
                                        backdropFilter: "blur(0px)",
                                        height: "200%",
                                    }}
                                >
                                    <p
                                        className="text-white text-lg font-semibold px-4 py-2 rounded"
                                        style={{
                                            boxShadow: "0 0 0px 0px rgba(55, 0, 0, 0.5)",
                                            height: "100px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {game.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center pt-4 gap-4 items-center sm:">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span className="text-white">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    );
};

export default GameCard;
