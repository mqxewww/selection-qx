export type Course = {
  id: number;
  image_url: string;
  title: string;
  description: string;
  period: string;
  applications_count: number;
  capacity: number;
  created_at: string;
};

const courses: Course[] = [
  {
    id: 1,
    image_url: "https://picsum.photos/800/400",
    title: "BTS Services Informatiques aux Organisations (SIO)",
    description: "Diplôme niveau BAC+2 dans le domaine de l'informatique.",
    period: "01 octobre 2025 - 30 juin 2027",
    applications_count: 3,
    capacity: 12,
    created_at: "01 octobre 2025",
  },
  {
    id: 2,
    image_url: "https://picsum.photos/800/400",
    title: "Bachelor Concepteur Développeur d'Applications",
    description: "Diplôme niveau BAC+3 dans le domaine de l'informatique.",
    period: "01 octobre 2025 - 30 juin 2027",
    applications_count: 8,
    capacity: 27,
    created_at: "18 septembre 2025",
  },
];

export async function getCoursesList(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return courses;
}

export async function getCourse(id: number): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return courses.find((course) => course.id == id) || null;
}
