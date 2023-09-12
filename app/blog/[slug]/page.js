export default function Page({ params }) {
  return (
    <div>
      <h1>My Page</h1>
      My Post: {params.slug}
    </div>
  );
}
