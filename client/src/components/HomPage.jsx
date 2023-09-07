import { useEffect, useState } from "react";
import CollectionCard from "./CollectionCard";
let url = "http://localhost:3000/";
import axios from "axios";

const HomePage = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await axios.get(url);
            setCollections(response.data);
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    };

    async function createCollection() {
        const input = prompt("Enter Collection name:");
        if (input) {
            try {
                await axios.post(
                    url,
                    { name: input },
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );
                fetchCollections();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="bg-stone-800 w-[32rem] min-h-[50rem] p-10 mx-10 my-20 rounded-xl flex flex-col">
            <div className="text-center justify-center items-center gap-14">
                <h1 className="text-emerald-500 text-4xl font-bold mb-8">
                    To Do List
                </h1>
                <button
                    className="rounded-lg p-2 font-bold w-40 text-stone-900 bg-emerald-500"
                    onClick={createCollection}
                >
                    + Add Collection
                </button>
            </div>
            <div className="flex flex-wrap justify-center">
                {collections.map((collection) => {
                    return (
                        <CollectionCard
                            key={collection._id}
                            collection={collection}
                            fetchCollections={fetchCollections}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
