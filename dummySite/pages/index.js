import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <Link href={`/products/${product.id}`}>
          <a>{product.title}</a>
        </Link>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log('Regenerating static files...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
