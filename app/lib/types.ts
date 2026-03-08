export type Domain = "Media" | "Trading" | "Brand" | "Life";

export type Entry = {
  id: string;
  title: string;
  domain: Domain;
  notes: string;
  createdAt: string;
};
