import { PageTemplate } from "../components/PageTemplate";
import { Link } from "react-router";

export function News() {
  const articles = [
    {
      id: 1,
      date: "May 15, 2024",
      title: "Healing Technology Partners with Global Imaging Leader",
      excerpt: "Expanding our portfolio of advanced MRI and CT systems to better serve the growing healthcare needs in South Asia.",
      category: "Partnerships"
    },
    {
      id: 2,
      date: "April 28, 2024",
      title: "New ISO 9001 Certification Achieved",
      excerpt: "Demonstrating our ongoing commitment to quality management and operational excellence in medical device distribution.",
      category: "Corporate"
    },
    {
      id: 3,
      date: "March 10, 2024",
      title: "Launch of Next-Gen Patient Monitoring Solutions",
      excerpt: "Introducing the latest wireless and continuous monitoring technologies to intensive care units across the region.",
      category: "Products"
    }
  ];

  return (
    <PageTemplate title="News Hub" lastUpdated="May 15, 2024">
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
              <span className="font-medium text-[#12B5CB]">{article.category}</span>
              <span>•</span>
              <time>{article.date}</time>
            </div>
            <h2 className="text-xl font-bold text-[#00355D] mb-3 hover:text-[#12B5CB] transition-colors cursor-pointer">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <Link to="#" className="text-sm font-bold text-[#12B5CB] hover:text-[#00355D] transition-colors inline-flex items-center gap-1">
              Read Full Article 
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </article>
        ))}
      </div>
    </PageTemplate>
  );
}
