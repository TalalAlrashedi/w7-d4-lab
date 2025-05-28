import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [char, setChar] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [inputText, setInputText] = useState("");

  const url = "https://6836b885664e72d28e41d28e.mockapi.io/api/char";

  useEffect(() => {
    axios.get(url).then((res) => setChar(res.data));
  }, []);

  const addChar = async () => {
    if (!name || !gender || !image) return;
    const res = await axios.post(url, { name, gender, image });
    setChar([...char, res.data]);
    setName("");
    setGender("");
    setImage("");
  };

  const filteredChar = char.filter((c) =>
    c.name.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white max-w-6xl mx-auto p-6 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Explore Our Characters
        </h2>


        <div className="max-w-md mx-auto mb-6">
          <input
            placeholder="Search by character name..."
            className="w-full p-2 border rounded-2xl"
            type="text"
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>


        <div className="max-w-md mx-auto shadow-md mb-10 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Add Character
          </h3>

          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of character"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Image URL</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Gender</label>
            <select
              className="w-full p-2 border rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>

          <button
            onClick={addChar}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Character
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChar.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-3">
                <img
                  src={c.image}
                  alt={c.name}
                  className="object-cover object-center"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 text-center">
                {c.name}
              </h4>
              <p className="text-sm text-gray-500 text-center">{c.gender}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;