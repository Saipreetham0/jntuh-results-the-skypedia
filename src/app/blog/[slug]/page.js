// export default function Page({ params }) {
//   return (
//     <div>
//       <h1>My Page</h1>
//       My Post: {params.slug}
//     </div>
//   );
// }

import BlogLayout from "../layout";
import BlogTemplate from "../template";

export default async function BlogPostPage(props) {
  const params = await props.params;
  const { slug } = params;

  // Fetch blog post content based on slug

  return (
    <BlogLayout>
      <BlogTemplate>
        <h1>{slug}</h1>
        My Post: {params.slug}
        {/* Render blog post content here */}
      </BlogTemplate>
    </BlogLayout>
  );
}
