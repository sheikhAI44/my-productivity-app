"use server"

import NotionWorkspaceLayout from "@/components/layouts/notion-workspace-layout"
import BlockEditor from "@/components/blocks/BlockEditor"
import { todoPlannerContent } from "@/lib/content/todo-planner-content"

export default async function TodoPlannerPage() {
  return (
    <NotionWorkspaceLayout title="To-Do Planner" lastEdited="Dec 18">
      <BlockEditor initialBlocks={todoPlannerContent} />
    </NotionWorkspaceLayout>
  )
}
