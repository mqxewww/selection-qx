export type HydraResponse<T> = {
  "@context": string;
  "@id": string;
  "@type": "string";
  totalItems: number;
  member: T[];
};
