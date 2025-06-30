"use server"

import NotionWorkspaceLayout from "@/components/layouts/notion-workspace-layout"
import BlockEditor from "@/components/blocks/BlockEditor"
import { writiGuideContent } from "@/lib/content/writi-guide-content"

export default async function WritiGuidePage() {
  return (
    <NotionWorkspaceLayout title="Writing Guide" lastEdited="Dec 18">
      <BlockEditor initialBlocks={writiGuideContent} />
    </NotionWorkspaceLayout>
  )
}
