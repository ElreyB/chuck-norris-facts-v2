import {useState, useEffect} from 'react'
import axios from "axios";

interface JokeResponse {
  icon_url : string;
  id : string;
  url? : string;
  value : string
}

interface GiphyResponse {
  data: {
    images: {
      original: {
        url: string;
      };
    };
  };
}



const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY
const GIPHY_API_URL = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=chuck+norris&rating=g`;

function App() {
  const [joke, setJokeResponse] = useState<string | null>(null);
  const [giphyUrl, setGiphyUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
          const [jokeResponse, giphyResponse] = await Promise.all([
          axios.get<JokeResponse>('https://api.chucknorris.io/jokes/random'),
          axios.get<GiphyResponse>(`${GIPHY_API_URL}`),
        ]);
        setJokeResponse(jokeResponse.data.value);
        setGiphyUrl(giphyResponse.data.data.images.original.url);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

console.log({joke, loading, error, giphyUrl})

  return (
    <div>
      {loading && giphyUrl ? <p>none</p> : (
        <div>
          <img src={giphyUrl} alt="chuck" width="250"/>
          <h1 className='font-extrabold text-2xl hover:text-sky-400'>{joke}</h1>
        </div>
      )}
    </div>
  )
}

export default App
