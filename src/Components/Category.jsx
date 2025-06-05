import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Category = () => {
    const { category } = useParams();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!category) return;

        const fetchGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(
                    `http://localhost:8085/api/game/category/${category}`,
                    { withCredentials: true }
                );
                setGames(res.data.data || []);
            } catch (err) {
                setError(`Failed to load ${category} games.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [category]);

    const capitalizedCategory = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : 'Category';

    return (
        <div className="flex bg-gray-900 text-white">
            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">{capitalizedCategory} Games</h2>

                {loading ? (
                    <p className="text-center text-gray-400">
                        Loading {capitalizedCategory} games...
                    </p>
                ) : error ? (
                    <p className="text-center text-gray-500">{error}</p>
                ) : games.length === 0 ? (
                    <p className="text-center text-gray-400">No games found in this category.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                        {games.map((game) => (
                            <div
                                key={game._id}
                                className="rounded-xl overflow-hidden bg-gray-800 transition-transform hover:-translate-y-1 cursor-pointer"
                                onClick={() => navigate(`/${game.code}`)}
                            >
                                <div className="h-50 bg-gray-700 relative group">
                                    <img
                                        src={`https://www.lukogames.com/assets/games/${game.code}/square.png`}
                                        alt={game.name}
                                        className="h-70 w-full object-cover shadow-lg"
                                        loading="lazy"
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
                )}
            </main>
        </div>
    );
};

export default Category;
