import { NextResponse } from "next/server";

const SHAREVIRAL_API_URL =
  "https://shareviral-server-334229637235.us-central1.run.app/api/v1/developer/make-post";

export async function POST(request) {
  const token = process.env.SHAREVIRAL_API_TOKEN;
  const userId = process.env.SHAREVIRAL_USER_ID;

  if (!token || !userId) {
    return NextResponse.json(
      { error: "ShareViral is not configured" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { title, description, slug, imageUrl } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "title and slug are required" },
      { status: 400 }
    );
  }

  const postUrl = `https://stories.linda-x.com/post/${slug}`;
  const postText = `${title}\n\n${description || ""}\n\nRead more: ${postUrl}`.trim();

  const formData = new FormData();
  formData.append("postText", postText);
  formData.append("accounts", "facebook");
  formData.append(
    "metadata",
    JSON.stringify({
      userId,
      tiktok: {
        creatorInfo: null,
        title: "",
        privacy: "",
        commercialToggle: false,
        commercialYourBrand: false,
        commercialBrandedContent: false,
      },
      facebook: { first_comment: "" },
      instagram: { title: "" },
    })
  );

  if (imageUrl) {
    try {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        return NextResponse.json(
          { error: "Failed to fetch featured image" },
          { status: 400 }
        );
      }

      const blob = await imageResponse.blob();
      const filename = imageUrl.split("/").pop()?.split("?")[0] || "featured-image.png";
      formData.append("postType", "image");
      formData.append("files", blob, filename);
    } catch {
      return NextResponse.json(
        { error: "Failed to process featured image" },
        { status: 400 }
      );
    }
  } else {
    formData.append("postType", "text");
  }

  try {
    const response = await fetch(SHAREVIRAL_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = result;
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: "ShareViral request failed", details: parsed },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, result: parsed });
  } catch (error) {
    console.error("ShareViral API error:", error);
    return NextResponse.json(
      { error: "Failed to reach ShareViral API" },
      { status: 502 }
    );
  }
}
