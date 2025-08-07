import axios from "axios";

export async function getMealsByCategory(c = "Miscellaneous") {
  return await axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching random prime mover:", error);
      throw error;
    });
}

export async function getMealDetails(i = "52959") {
  return await axios
    .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching random prime mover:", error);
      throw error;
    });
}
