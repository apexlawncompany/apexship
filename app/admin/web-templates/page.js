"use client";

import Image from "next/image";
import styles from "./webtemplates.module.css";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "food-template",
    name: "Restaurant Delight",
    description: "Perfect for food, bakery & café businesses",
    preview: "/assets/templates/writer.png",
  },
  {
    id: "business-template",
    name: "Professional Business",
    description: "Corporate look for services and startups",
    preview: "/assets/templates/writer.png",
  },
  {
    id: "portfolio-template",
    name: "Creative Portfolio",
    description: "Showcase brand, people & passion",
    preview: "/assets/templates/writer.png",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h1 className={`heading-font ${styles.heading}`}>Choose Your Template</h1>

      <div className={styles.grid}>
        {templates.map((template) => (
          <div key={template.id} className={styles.card}>
            <Image
              src={template.preview}
              alt={template.name}
              width={40}
              height={40}
              className={styles.templatePreview}
            />
            <h3 className={`heading-font`}>{template.name}</h3>
            <p>{template.description}</p>
            <button
              className={styles.button}
              onClick={() => router.push(`/admin/templates/${template.id}`)}
            >
              Use This Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
