import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "PHOTO";

const DraggableCard = ({ photo, index, moveItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center bg-white shadow-lg p-4 rounded-lg transition-transform transform ${
        isDragging ? "opacity-50" : "hover:scale-105"
      }`}
    >
      <img
        src={photo.images[0]}
        alt={photo.title}
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{photo.title}</h3>
        <p className="text-gray-500">${photo.price}</p>
      </div>
    </div>
  );
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const totalPages = useRef(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        setPhotos(response.data.products);
        setFiltered(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  useEffect(() => {
    totalPages.current = Math.ceil(filtered.length / 10);
    setCurrentPage(filtered.slice((page - 1) * 10, page * 10));
  }, [filtered, page]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFiltered(
      photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchValue)
      )
    );
    setPage(1);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    const sortedPhotos = [...filtered].sort((a, b) =>
      sortValue === "asc" ? a.price - b.price : b.price - a.price
    );
    setFiltered(sortedPhotos);
    setPage(1);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedFiltered = [...filtered];
    const [movedItem] = updatedFiltered.splice(fromIndex, 1);
    updatedFiltered.splice(toIndex, 0, movedItem);
    setFiltered(updatedFiltered);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between items-center bg-blue-600 text-white p-4 shadow-md">
          <input
            type="search"
            placeholder="Search products..."
            className="rounded-md px-4 py-2 w-1/2 text-black"
            onChange={handleSearch}
          />
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 px-4 py-2 rounded-md shadow hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between mb-4">
            <select
              id="sort"
              onChange={handleSort}
              className="rounded-md px-4 py-2 border border-gray-300 shadow-md"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          <div
            className="grid gap-6 
                       grid-cols-1 
                       sm:grid-cols-2 
                       lg:grid-cols-5"
          >
            {currentPage.map((photo, index) => (
              <DraggableCard
                key={photo.id}
                photo={photo}
                index={index}
                moveItem={moveItem}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages.current }, (_, i) => i + 1).map(
              (ele) => (
                <button
                  key={ele}
                  onClick={() => setPage(ele)}
                  className={`mx-1 px-4 py-2 rounded-md ${
                    ele === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {ele}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Photos;
