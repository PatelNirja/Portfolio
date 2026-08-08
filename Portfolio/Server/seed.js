require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User.model");
const Profile = require("./src/models/Profile.model");
const Settings = require("./src/models/Settings.model");
const Skill = require("./src/models/Skill.model");
const Project = require("./src/models/Project.model");
const connectDB = require("./src/config/db");

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("🌱 Starting Database Seeding...");

    // Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "AdminPass123!";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      // Update password to match current .env value
      existingAdmin.password = adminPassword;
      await existingAdmin.save();
      console.log(`🔄 Admin user updated: ${adminEmail}`);
    }

    // Seed Initial Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: "Full Stack Engineer",
        tagline: "Building production-grade web applications with modern tech stacks.",
        bio: "Senior Full Stack Engineer specializing in React, Node.js, Express, and MongoDB. Passionate about clean architecture, performance, and user experience.",
        location: "San Francisco, CA",
        email: adminEmail,
        isAvailable: true,
        socialLinks: {
          github: "https://github.com",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
        },
      });
      console.log("✅ Initial Profile created");
    }

    // Seed Initial Settings
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        siteTitle: "Portfolio CMS — Full Stack Engineer",
        siteDescription: "Personal portfolio website built with MERN stack.",
        keywords: ["Full Stack", "React", "Node.js", "MongoDB", "Express", "Portfolio"],
      });
      console.log("✅ Initial Settings created");
    }

    // Seed Sample Skills if empty
    const skillsCount = await Skill.countDocuments();
    if (skillsCount === 0) {
      await Skill.insertMany([
        { name: "React.js", category: "frontend", proficiency: 95, order: 1 },
        { name: "Node.js", category: "backend", proficiency: 90, order: 2 },
        { name: "Express.js", category: "backend", proficiency: 90, order: 3 },
        { name: "MongoDB", category: "database", proficiency: 85, order: 4 },
        { name: "Tailwind CSS", category: "frontend", proficiency: 95, order: 5 },
        { name: "JavaScript (ES6+)", category: "frontend", proficiency: 95, order: 6 },
        { name: "TypeScript", category: "frontend", proficiency: 85, order: 7 },
        { name: "REST APIs", category: "backend", proficiency: 95, order: 8 },
        { name: "Docker", category: "devops", proficiency: 75, order: 9 },
        { name: "Git & GitHub", category: "tools", proficiency: 90, order: 10 },
      ]);
      console.log("✅ Sample Skills seeded");
    }

    // Seed Sample Projects if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          title: "Portfolio Content Management System",
          shortDesc: "A complete production-ready Portfolio CMS built using the MERN stack with clean architecture.",
          description: "Fullstack system with public portfolio showcase, admin dashboard, JWT cookie auth, Multer+Cloudinary upload, and MongoDB persistence.",
          category: "web",
          tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
          techStack: ["React 18", "Express.js", "MongoDB", "Mongoose", "Cloudinary", "Framer Motion"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com",
          isFeatured: true,
          status: "published",
          order: 1,
        },
        {
          title: "AI Task Manager & Analytics",
          shortDesc: "Smart task prioritization dashboard powered by machine learning recommendations.",
          description: "Interactive dashboard providing actionable productivity insights, automated workflow triggers, and real-time collaboration.",
          category: "web",
          tags: ["React", "AI", "Node.js", "Tailwind"],
          techStack: ["React", "Express", "MongoDB", "Tailwind CSS"],
          liveUrl: "https://example.com",
          githubUrl: "https://github.com",
          isFeatured: true,
          status: "published",
          order: 2,
        },
      ]);
      console.log("✅ Sample Projects seeded");
    }

    console.log("🎉 Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedDatabase();
