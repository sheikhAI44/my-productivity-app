import { type EditableBlock } from "@/components/blocks/BlockEditor"

export const writiGuideContent: EditableBlock[] = [
  {
    id: "title",
    type: "title",
    content: "✍️ Writing Guide"
  },
  {
    id: "intro",
    type: "paragraph",
    content:
      "Master the art of effective writing. Learn techniques, tips, and best practices for clear communication."
  },
  {
    id: "writing-principles",
    type: "heading",
    content: "Core Writing Principles"
  },
  {
    id: "principle-1",
    type: "bulleted-list",
    content: "Clarity: Write clearly and concisely"
  },
  {
    id: "principle-2",
    type: "bulleted-list",
    content: "Structure: Organize your thoughts logically"
  },
  {
    id: "principle-3",
    type: "bulleted-list",
    content: "Purpose: Know your audience and objective"
  },
  {
    id: "writing-process",
    type: "heading",
    content: "The Writing Process"
  },
  {
    id: "process-1",
    type: "bulleted-list",
    content: "Plan: Outline your main points"
  },
  {
    id: "process-2",
    type: "bulleted-list",
    content: "Draft: Write your first version"
  },
  {
    id: "process-3",
    type: "bulleted-list",
    content: "Revise: Edit and improve your work"
  }
]
