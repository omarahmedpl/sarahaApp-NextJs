import { Cairo } from "next/font/google";

export const cairo = Cairo({
  subsets: ["arabic"], // Specify the subsets you need (e.g., 'arabic', 'latin', 'latin-ext')
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"], // Ensure weights are valid
});
