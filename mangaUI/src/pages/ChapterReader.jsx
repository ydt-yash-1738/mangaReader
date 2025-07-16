import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ChapterReader() {
  const { id } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch(`https://api.mangadex.org/at-home/server/${id}`)
      .then(res => res.json())
      .then(data => {
        const baseUrl = data.baseUrl;
        const hash = data.chapter.hash;
        const pageFiles = data.chapter.data;

        const urls = pageFiles.map(file => `${baseUrl}/data/${hash}/${file}`);
        setPages(urls);
      });
  }, [id]);

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      {pages.length === 0 && <p>Loading pages...</p>}
      {pages.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Page ${index + 1}`}
          className="w-full max-w-2xl rounded shadow"
        />
      ))}
    </div>
  );
}
