import type { Project } from "../../features/projects/models/project.model";

export const projects: Project[] = [
  {
    id: "1",
    name: "Marketing Platform",
    description: "Gestion des campagnes et analytics marketing.",
    status: "active",
    ownerId: "user_001",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-02-20"),
  },
  {
    id: "2",
    name: "Mobile App Redesign",
    description: "Refonte UI/UX et amélioration des performances.",
    status: "active",
    ownerId: "user_001",
    createdAt: new Date("2025-01-25"),
    updatedAt: new Date("2025-02-18"),
  },
  {
    id: "3",
    name: "Internal Tools",
    description: "Outils internes pour automatisation des workflows.",
    status: "archived",
    ownerId: "user_002",
    createdAt: new Date("2024-11-03"),
    updatedAt: new Date("2025-01-05"),
  },
  {
    id: "4",
    name: "Client Dashboard",
    description: "Tableau de bord pour suivi des KPIs clients.",
    status: "active",
    ownerId: "user_003",
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-22"),
  },
];