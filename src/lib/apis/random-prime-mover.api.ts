import axios from "axios";
import { API } from "../constants/api.constant";

export function getRandomPrimeMover(language = "en") {
  return axios
    .get(`${API}/muscles/random`, {
      headers: {
        "Accept-Language": language,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching random prime mover:", error);
      throw error;
    });
}

export function getPrimeMoverMuscleByID(id: string, language = "en") {
  const url = `${API}/musclesGroup/by-muscle-group?muscleGroupId=${id}`;

  return axios
    .get(url, {
      headers: {
        "Accept-Language": language,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching muscles by group ID:", error);
      throw error;
    });
}

export function getExercisesByPrimeMoverMuscle(
  primeMoverMuscleId: string,
  difficultyLevelId: string,
  language: string = "en"
) {
  const url = `${API}/exercises/by-muscle-difficulty?primeMoverMuscleId=${primeMoverMuscleId}&difficultyLevelId=${difficultyLevelId}`;
  
  return axios
    .get(url, {
      headers: {
        "Accept-Language": language,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching muscles by group ID:", error);
      throw error;
    });
}
