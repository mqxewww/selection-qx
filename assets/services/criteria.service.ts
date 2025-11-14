export type Mark = {
  label: string;
  mark: string;
};

export type Criteria = {
  title: string;
  marks: Mark[];
};

const criteria = [
  {
    title: "Comportement",
    marks: [
      {
        label: "Perturbateur",
        mark: "-2",
      },
    ],
  },
  {
    title: "Expériences",
    marks: [
      {
        label: "N'a pas d'expériences",
        mark: "0",
      },
      {
        label: "Possède de l'expérience",
        mark: "2",
      },
    ],
  },
];

export async function getCriterias(): Promise<Criteria[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return criteria;
}
