import { type EditableBlock } from "@/components/blocks/BlockEditor"

export const llmContent: EditableBlock[] = [
  {
    id: "title",
    type: "title",
    content: "What is a Large Language Model?"
  },
  {
    id: "intro",
    type: "paragraph",
    content:
      "A Large Language Model (LLM) is an AI system trained to understand and generate human-like text. It predicts the next word in a sentence based on what came before — this simple mechanism enables surprisingly powerful behavior."
  },
  {
    id: "how-work-heading",
    type: "heading",
    content: "How Do They Work?"
  },
  {
    id: "training-heading",
    type: "heading",
    content: "1. Training on Massive Text Data"
  },
  {
    id: "training-1",
    type: "bulleted-list",
    content:
      "LLMs are trained on billions or trillions of words (from books, websites, articles, etc.)."
  },
  {
    id: "training-2",
    type: "bulleted-list",
    content:
      "The model learns grammar, facts, reasoning, and even writing styles from this data."
  },
  {
    id: "token-heading",
    type: "heading",
    content: "2. Token Prediction"
  },
  {
    id: "token-1",
    type: "bulleted-list",
    content: "Text is broken into tokens (pieces of words)."
  },
  {
    id: "token-2",
    type: "bulleted-list",
    content: "The model learns to predict the next token in a sequence."
  },
  {
    id: "token-3",
    type: "bulleted-list",
    content: 'Example: Input: "The cat sat on the" → Prediction: "mat"'
  },
  {
    id: "transformer-heading",
    type: "heading",
    content: "3. Transformers (Core Architecture)"
  },
  {
    id: "transformer-1",
    type: "bulleted-list",
    content: "Uses attention mechanisms to understand context across long text."
  },
  {
    id: "transformer-2",
    type: "bulleted-list",
    content:
      "Can focus on relevant words from earlier in the text, not just the most recent ones."
  }
]
