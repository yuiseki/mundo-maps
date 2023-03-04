export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return res.headers.get("content-type")?.includes("json")
    ? res.json()
    : res.text();
};
