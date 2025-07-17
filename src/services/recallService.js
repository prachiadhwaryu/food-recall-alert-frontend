export async function getAllRecalls() {
  try {
    const response = await fetch("http://localhost:8081/api/external-recalls");
    if (!response.ok) {
      throw new Error("Failed to fetch recalls");
    }
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}
