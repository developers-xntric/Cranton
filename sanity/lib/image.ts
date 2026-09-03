import imageUrlBuilder from "@sanity/image-url"
import { dataset, projectId } from "../env"
const builder = imageUrlBuilder({ projectId: projectId || "missing-project-id", dataset })
export const urlForImage = (source: any) => builder.image(source)

