import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { dataset, projectId } from "./sanity/env"
import { schema } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"
export default defineConfig({ name: "cranton", title: "Cranton CMS", projectId: projectId || "missing-project-id", dataset, plugins: [structureTool({ structure }), visionTool()], schema })
