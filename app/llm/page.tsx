"use server"

import NotionWorkspaceLayout from "@/components/layouts/notion-workspace-layout"
import BlockEditor from "@/components/blocks/BlockEditor"
import { llmContent } from "@/lib/content/llm-content"

export default async function LLMPage() {
  return (
    <NotionWorkspaceLayout title="LLM Guide" lastEdited="Dec 18">
      <div className="mb-6">
        <div className="flex items-center space-x-1">
          <div className="size-8 text-2xl">🧬</div>
          <div className="size-8 text-2xl">🧬</div>
        </div>
      </div>

      <BlockEditor initialBlocks={llmContent} />
    </NotionWorkspaceLayout>
  )
}
