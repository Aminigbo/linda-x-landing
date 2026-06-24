export async function joinReadersClub({ name, email }) {
  const response = await fetch("/api/readers-club", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to join Readers' Club");
  }

  return data;
}
