import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const encodedMangaUrl = encodeURIComponent(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`);
    const encodedChapterUrl = encodeURIComponent(`https://api.mangadex.org/chapter?manga=${id}&translatedLanguage[]=en&order[chapter]=desc&limit=20`);

    fetch(`/api/proxy?url=${encodedMangaUrl}`)
      .then(res => res.json())
      .then(data => setManga(data.data));

    fetch(`/api/proxy?url=${encodedChapterUrl}`)
      .then(res => res.json())
      .then(data => setChapters(data.data));
  }, [id]);

  if (!manga) return <div className="p-4">Loading...</div>;

  const cover = manga.relationships.find(rel => rel.type === "cover_art");
  const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`;

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <img src={coverUrl} alt="cover" className="w-32 h-auto rounded shadow" />
        <div>
          <h1 className="text-xl font-bold">{manga.attributes.title.en || 'No Title'}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {manga.attributes.description.en?.substring(0, 300) || 'No Description Available'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Chapters</h2>
        <ul className="space-y-1">
          {chapters.map((chap) => (
            <li key={chap.id}>
              <Link
                to={`/chapter/${chap.id}`}
                className="text-blue-600 hover:underline"
              >
                Chapter {chap.attributes.chapter || 'N/A'} - {chap.attributes.title || 'Untitled'}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
