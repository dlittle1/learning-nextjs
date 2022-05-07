import fs from 'fs/promises';
import path from 'path';

function ProductDetail(props) {
  const { product } = props;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps({ params }) {
  const data = await getData();
  const productId = params.pid;
  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const paths = data.products.map((product) => ({
    params: {
      pid: product.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default ProductDetail;
