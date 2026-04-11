export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
  status: "Live" | "In Progress" | "Archived" | "On Hold";
  year: string;
  role: string;
  thumbnail: string; // [REPLACE with real image path]
  images: string[]; // [REPLACE with real screenshots]
}

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "mare-boutique",
    name: "Mare Boutique",
    tagline:
      "End-to-end e-commerce platform with admin dashboard & QR payments",
    description:
      "A responsive e-commerce web app built with Next.js, featuring a full storefront, admin dashboard, role-based access, and InstaPay QR checkout.",
    longDescription:
      "Mare Boutique is a full e-commerce platform built with Next.js and Tailwind CSS. It features role-based access for Admin and User roles, a complete admin dashboard, secure JWT authentication, and core shopping features including search, filters, cart, and InstaPay QR payments.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Node.js",
      "REST API",
    ],
    features: [
      "Full storefront with product listing, search, and filters",
      "Shopping cart and checkout flow",
      "InstaPay QR payment integration",
      "JWT-based authentication with role-based access (Admin / User)",
      "Protected routes for admin and user areas",
      "Admin dashboard for products, categories, inventory, and users",
      "Reusable Tailwind CSS component system",
      "Fully responsive on all screen sizes",
    ],
    liveUrl: "https://mare-boutique.com/",
    githubUrl: "https://github.com/mohamedshoman00",
    featured: true,
    status: "Live",
    year: "2025",
    role: "Frontend Developer",
    thumbnail: "/images/mare-pro/mare1.png",
    images: [
      "/images/mare-pro/mare2.png",
      "/images/mare-pro/mare3.png",
      "/images/mare-pro/mare4.png",
      "/images/mare-pro/mare5.png",
      "/images/mare-pro/mare6.png",
      "/images/mare-pro/mare7.png",
      "/images/mare-pro/mare8.png",
    ],
  },

  {
    id: 2,
    slug: "faster-education",
    name: "Faster Education Platform",
    tagline: "Structured online learning for students, teachers & admins",
    description:
      "A responsive education platform enabling structured teacher–student communication, course delivery, and role-based access in production.",
    longDescription:
      "Faster Education is a production-ready learning platform built with React.js, supporting structured course delivery and video-based learning experiences. It features secure authentication with role-based access for Students, Teachers, and Admins, including a controlled teacher signup and approval process.",

    stack: ["React.js", "JavaScript", "SASS", "REST API", "Axios"],
    features: [
      "Course browsing and content viewing",
      "Video-based learning experience",
      "Role-based access control (Student / Teacher / Admin)",
      "Controlled teacher signup and admin approval flow",
      "Secure authentication system",
      "Optimized frontend performance for live production users",
      "Fully responsive UI",
    ],
    liveUrl: "https://faster-education.com/",
    githubUrl: "https://github.com/mohamedshoman00",
    featured: true,
    status: "Live",
    year: "2023",
    role: "Frontend Developer",
    thumbnail: "/images/faster/faster1.png",
    images: [
      ,
      "/images/faster/faster2.png",
      "/images/faster/faster3.png",
      "/images/faster/faster4.png",
      "/images/faster/faster5.png",
      "/images/faster/faster6.png",
    ],
  },
  {
    id: 3,
    slug: "outly",
    name: "Outly",
    tagline: "Discover nearby cafés with smart recommendations",
    description:
      "A location-based web app for discovering nearby cafés with ratings and personalized recommendations.",
    longDescription:
      "Outly is a location-based web application built to help users discover nearby cafés with ratings and smart recommendations. Developed using React.js and Next.js with modern UI libraries for fully responsive design. Integrated maps and geolocation APIs to deliver personalized suggestions based on the user's location, with a clean UI/UX focusing on usability and smooth navigation.",
    stack: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "REST API"],
    features: [
      "Location-based café discovery",
      "Geolocation API integration",
      "Interactive maps",
      "Ratings & recommendations",
      "Responsive design",
      "Smooth navigation & clean UI/UX",
    ],
    liveUrl: "https://outly-project.vercel.app/sign-up",
    githubUrl: "https://github.com/mohamedshoman00",
    featured: false,
    status: "Archived",
    year: "2022",
    role: "Frontend Developer",
    thumbnail: "/images/Outly/out1.png",
    images: [
      "/images/Outly/out2.png",
      "/images/Outly/out3.png",
      "/images/Outly/out4.png",
      "/images/Outly/out5.png",
      "/images/Outly/out6.png",
      "/images/Outly/out7.png",
    ],
  },
  {
    id: 4,
    slug: "al-sharhan",
    name: "Al Sharhan",
    tagline:
      "Corporate website for a Saudi contracting and infrastructure company",
    description:
      "A professional corporate website built for Al Sharhan Contracting Company, showcasing the company profile, services, sectors, and business presence with a responsive and modern user experience.",
    longDescription:
      "Al Sharhan is a corporate business website developed for Al Sharhan Contracting Company, a Saudi engineering and contracting firm operating across civil and energy infrastructure. The project focuses on presenting the company’s identity, services, sectors, and operational strengths through a clean, responsive interface that supports business credibility and clear content delivery.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Responsive Design",
      "Vercel",
    ],
    features: [
      "Responsive corporate website optimized for desktop, tablet, and mobile",
      "Company profile and brand presentation sections",
      "Service and sector showcase for infrastructure and contracting activities",
      "Clean and structured information architecture for business content",
      "Modern UI with reusable sections and components",
      "Business-focused layout for credibility and clear communication",
      "Production deployment on Vercel",
      "Professional user experience tailored to a corporate audience",
    ],
    liveUrl: "https://al-sharhan.vercel.app/",
    githubUrl: "https://github.com/mohamedshoman00",
    featured: true,
    status: "On Hold",
    year: "2026",
    role: "Frontend Developer",
    thumbnail: "/images/al-sharhan/alsharhan1.png",
    images: [
      "/images/al-sharhan/alsharhan2.png",
      "/images/al-sharhan/alsharhan3.png",
      "/images/al-sharhan/alsharhan4.png",
      "/images/al-sharhan/alsharhan5.png",
      "/images/al-sharhan/alsharhan6.png",
      "/images/al-sharhan/alsharhan7.png",
      "/images/al-sharhan/alsharhan8.png",
      "/images/al-sharhan/alsharhan9.png",
      "/images/al-sharhan/alsharhan10.png",
      "/images/al-sharhan/alsharhan11.png",
      "/images/al-sharhan/alsharhan12.png",
    ],
  }
  // {
  //   id: 3,
  //   slug: "portfolio-v1",
  //   name: "Portfolio v1",
  //   tagline: "First personal developer portfolio",
  //   description: "Personal portfolio showcasing frontend projects and skills.",
  //   longDescription:
  //     "My first personal portfolio site built to showcase frontend projects, skills, and experience. Designed with a clean layout and deployed on Vercel.",
  //   stack: ["React.js", "CSS3", "JavaScript"],
  //   features: [
  //     "Single-page scroll layout",
  //     "Project cards with links",
  //     "Contact form",
  //     "Mobile responsive",
  //   ],
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   featured: false,
  //   status: "Archived",
  //   year: "2022",
  //   role: "Frontend Developer",
  //   thumbnail: "/projects/portfolio-v1.png",
  //   images: [],
  // },
  // [ADD more projects here]
];
