import { type EditableBlock } from "@/components/blocks/BlockEditor"

export const goalsContent: EditableBlock[] = [
  {
    id: "title",
    type: "title",
    content: "🎯 Goals & Objectives"
  },
  {
    id: "intro",
    type: "paragraph",
    content:
      "Track your personal and professional goals. Set clear objectives and monitor your progress towards achieving them."
  },
  {
    id: "current-goals",
    type: "heading",
    content: "Current Goals"
  },
  {
    id: "goal-1",
    type: "bulleted-list",
    content: "Complete the web app project by end of month"
  },
  {
    id: "goal-2",
    type: "bulleted-list",
    content: "Learn advanced TypeScript patterns"
  },
  {
    id: "goal-3",
    type: "bulleted-list",
    content: "Improve code organization and architecture skills"
  }
]
