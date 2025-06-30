"use server"

import NotionWorkspaceLayout from "@/components/layouts/notion-workspace-layout"
import BlockEditor from "@/components/blocks/BlockEditor"
import { goalsContent } from "@/lib/content/goals-content"

export default async function GoalsPage() {
  return (
    <NotionWorkspaceLayout title="Goals" lastEdited="Dec 18">
      <BlockEditor initialBlocks={goalsContent} />
    </NotionWorkspaceLayout>
  )
}
