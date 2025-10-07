// Front-End/src/app/api/proxy-image/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // garante acesso total (stream/buffer)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
      // Sem cache de dev; ajuste se quiser cachear
      cache: "no-store",
      // Você pode adicionar headers se o host exigir
    });

    if (!upstream.ok) {
      return new Response("Upstream failed", { status: upstream.status });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    const arrayBuffer = await upstream.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "content-type": contentType,
        // cache no navegador/CDN (ajuste se necessário)
        "cache-control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Error fetching image", { status: 502 });
  }
}
