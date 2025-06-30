"use server"

import NotionWorkspaceLayout from "@/components/layouts/notion-workspace-layout"
import BlockEditor from "@/components/blocks/BlockEditor"
import { travelContent } from "@/lib/content/travel-content"

export default async function TravelPlansPage() {
  return (
    <NotionWorkspaceLayout title="Travel Plans 2025" lastEdited="Dec 18">
      <BlockEditor initialBlocks={travelContent} />
    </NotionWorkspaceLayout>
  )
}
