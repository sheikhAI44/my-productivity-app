import { type EditableBlock } from "@/components/blocks/BlockEditor"

export const todoPlannerContent: EditableBlock[] = [
  {
    id: "title",
    type: "title",
    content: "📝 To-Do List & Planner"
  },
  {
    id: "intro",
    type: "paragraph",
    content:
      "Organize your tasks and plan your day effectively. Keep track of your priorities and deadlines."
  },
  {
    id: "today-tasks",
    type: "heading",
    content: "Today's Tasks"
  },
  {
    id: "task-1",
    type: "bulleted-list",
    content: "Review and organize project codebase"
  },
  {
    id: "task-2",
    type: "bulleted-list",
    content: "Update documentation"
  },
  {
    id: "task-3",
    type: "bulleted-list",
    content: "Test new features"
  },
  {
    id: "upcoming-tasks",
    type: "heading",
    content: "This Week"
  },
  {
    id: "week-task-1",
    type: "bulleted-list",
    content: "Plan next sprint features"
  },
  {
    id: "week-task-2",
    type: "bulleted-list",
    content: "Schedule team meetings"
  }
]
