import { jwtDecode } from "jwt-decode";

export const decodeToken = (accessToken: string) => {
  try {
    const decoded = jwtDecode(accessToken);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export function getCodeColor(color: string) {
  switch (color.toLowerCase()) {
    case "белый":
      return "#f0f0f0";
    case "черный":
      return "#333333";
    case "коричневый":
      return "#a0522d";
    case "бежевый":
      return "#e0d4b0";
    case "серый":
      return "#a9a9a9";
    case "темно-синий":
      return "#191970";
    case "зеленый":
      return "#6b8e23";
    case "синий":
      return "#4682b4";
    case "голубой":
      return "#87cefa";
    case "бордовый":
      return "#800020";
    case "черно-серый":
      return "#555555";
    default:
      return "#cccccc";
  }
}
