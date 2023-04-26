import { createSignal, onMount } from 'solid-js';

const fetchMovies = async () => {
  const url =
    'https://draft.blogger.com/feeds/612832003477116897/posts/default?alt=json&max-results=999';

  const response = await fetch({ method: 'GET', url });
  const jsonData = await response.json();
  console.log('jsonData: ', jsonData);
  return jsonData;
};

const MovieList = () => {
  const [data, setData] = createSignal([]);
  const [error, setError] = createSignal('');

  onMount(() => {
    console.log('onMount');
    fetchMovies()
      .then((res) => {
        setData(res);
        console.log({ res });
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  });

  return (
    <div>
      <pre>{JSON.stringify(data(), null, 2)}</pre>
      <pre>{error()}</pre>
    </div>
  );
};

export default MovieList;
