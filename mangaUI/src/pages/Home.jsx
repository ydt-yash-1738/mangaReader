import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState('');
  const [mangaList, setMangaList] = useState([]);

  const fetchManga = (title = '') => {
    const fallback = 'naruto';
    const encodedTitle = encodeURIComponent(title || fallback);
    fetch(`https://api.mangadex.org/manga?limit=12&includes[]=cover_art&title=${encodedTitle}`)
      .then(res => res.json())
      .then(data => setMangaList(data.data));
  };

  useEffect(() => {
    fetchManga('naruto');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchManga(query);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search manga..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {mangaList.map((manga) => {
          const cover = manga.relationships.find(rel => rel.type === "cover_art");
          const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`;

          return (
            <Link to={`/manga/${manga.id}`} key={manga.id} className="rounded overflow-hidden shadow hover:scale-105 transition">
              <img src={coverUrl} alt="cover" className="w-full" />
              <h2 className="text-sm mt-2 font-semibold text-center px-1 line-clamp-2">
                {manga.attributes.title.en || 'No Title'}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}



// https://api.mangadex.org/manga?title=naruto&limit=10&includes[]=cover_art