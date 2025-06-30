import { type EditableBlock } from "@/components/blocks/BlockEditor"

export const travelContent: EditableBlock[] = [
  {
    id: "title",
    type: "title",
    content: "✈️ Travel Plans 2025"
  },
  {
    id: "intro",
    type: "paragraph",
    content:
      "Plan your adventures and trips for the upcoming year. Keep track of destinations, dates, and important details."
  },
  {
    id: "upcoming-trips",
    type: "heading",
    content: "Upcoming Trips"
  },
  {
    id: "trip-1",
    type: "bulleted-list",
    content: "Spring Break - Beach destination (March 2025)"
  },
  {
    id: "trip-2",
    type: "bulleted-list",
    content: "Summer Vacation - Europe tour (July 2025)"
  },
  {
    id: "trip-3",
    type: "bulleted-list",
    content: "Fall Conference - Tech conference in San Francisco (October 2025)"
  },
  {
    id: "planning-notes",
    type: "heading",
    content: "Planning Notes"
  },
  {
    id: "note-1",
    type: "bulleted-list",
    content: "Book flights early for better prices"
  },
  {
    id: "note-2",
    type: "bulleted-list",
    content: "Research local customs and weather"
  }
]
