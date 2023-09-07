import axios from "axios";
import { Link } from "react-router-dom";
let url = "http://localhost:3000";

const CollectionCard = ({ collection, fetchCollections }) => {
    async function deleteCollection() {
        try {
            axios.delete(`${url}/${collection._id}`).then(() => {
                fetchCollections();
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-stone-700 border-4 border-stone-900 rounded-xl relative w-44 h-40 mt-10 my-5 mx-5 flex justify-center">
            <div className="flex flex-col justify-center items-center">
                <Link to={"/" + collection.name}>
                    <h1 className="text-3xl font-bold">
                        {collection.name.toUpperCase()}
                    </h1>
                </Link>
                <button
                    className="text-md absolute bottom-2 font-semibold"
                    onClick={deleteCollection}
                >
                    <i className="fa-solid fa-trash text-2xl text-emerald-500"></i>
                </button>
            </div>
        </div>
    );
};

export default CollectionCard;
