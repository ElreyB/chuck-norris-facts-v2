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
  const [delayedLoading, setDelayedLoading] = useState<boolean>(true);


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

    useEffect(() => {
      if (!loading) {
        const timer = setTimeout(() => {
          setDelayedLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [loading]);

    console.log(error)

  return (
    <div className="text-center">
      <section className="container flex justify-center max-w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 h-96">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 min-h-450">
          {delayedLoading ? (
            <div role="status" className="text-center">
              <svg aria-hidden="true" className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            ) : (
            <div  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-80 md:rounded-none md:rounded-s-lg" src={giphyUrl} alt="chuch norries related"/>
              <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chuck Norris Facts</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{joke}</p>
              </div>n
            </div>
            )}
        </div>
      </section>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8" type="button" onClick={() => window.location.reload()}>new fact</button>
    </div>
  )
}

export default App
