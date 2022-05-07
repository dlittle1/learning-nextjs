import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSales(props) {
  const [lastSales, setLastSales] = useState(props.lastSales);
  // const [loading, setLoading] = useState(true);

  const { data, error } = useSWR(
    'https://nextjs-course-bbb4a-default-rtdb.firebaseio.com/sales.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const salesArr = Object.keys(data).map((key) => ({
        username: data[key].username,
        volume: data[key].volume,
        id: key,
      }));
      setLastSales(salesArr);
    }
  }, [data]);

  // useEffect(() => {
  //   fetch('https://nextjs-course-bbb4a-default-rtdb.firebaseio.com/sales.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const salesArr = Object.keys(data).map((key) => ({
  //         username: data[key].username,
  //         volume: data[key].volume,
  //         id: key,
  //       }));

  //       setLastSales(salesArr);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) {
    return <div>Failed to load</div>;
  }

  if (!data && !lastSales) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {lastSales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-bbb4a-default-rtdb.firebaseio.com/sales.json'
  );
  const data = await response.json();
  const salesArr = Object.keys(data).map((key) => ({
    username: data[key].username,
    volume: data[key].volume,
    id: key,
  }));
  return {
    props: {
      lastSales: salesArr,
    },
  };
}

export default LastSales;
