import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import fs from "node:fs"
import path from "node:path"
import { createClient } from "next-sanity"
import { heliportsSolutionsDefaults } from "./heliports-solutions-defaults"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const token = process.env.SANITY_API_TOKEN
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN before seeding.")
const client = createClient({ projectId, dataset, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01", token, useCdn: false })
const assets = new Map<string, any>()
async function imageFor(src: string, alt: string) { if (assets.has(src)) return assets.get(src); const filename = path.basename(src); const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`, { filename }); const assetId = existing || (await client.assets.upload("image", fs.createReadStream(path.join(process.cwd(), "public", src.slice(1))), { filename }))._id; const image = { _type: "image", asset: { _type: "reference", _ref: assetId }, alt }; assets.set(src, image); return image }
async function replaceImages(value: any, key = ""): Promise<any> { if (Array.isArray(value)) return Promise.all(value.map((item) => replaceImages(item, key))); if (value && typeof value === "object") { if (typeof value.src === "string" && key.toLowerCase().includes("image")) return imageFor(value.src, value.alt); return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([childKey, childValue]) => [childKey, await replaceImages(childValue, childKey)]))) } return value }
async function main() { const document = await replaceImages({ ...heliportsSolutionsDefaults, _id: "heliports-vertiports-solutions-page", _type: "heliportsSolutionsPage", seoTitle: "Heliports & Vertiports Solutions", seoDescription: "Heliports & Vertiports Solutions" }); await client.createOrReplace(document); await client.delete("page-heliports---vertiports-solutions"); console.log("Seeded only Heliports & Vertiports Solutions") }
main().catch((error) => { console.error(error); process.exit(1) })
