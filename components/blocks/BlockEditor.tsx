"use client"

import { useState, useRef, useEffect } from "react"
import {
  Type,
  Hash,
  List,
  CheckSquare,
  Quote,
  Code,
  Minus,
  Trash2,
  Copy
} from "lucide-react"

// Custom hook to check if component is hydrated
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}

export interface EditableBlock {
  id: string
  type:
    | "title"
    | "paragraph"
    | "heading"
    | "list-item"
    | "heading2"
    | "heading3"
    | "bulleted-list"
    | "numbered-list"
    | "to-do"
    | "quote"
    | "code"
    | "divider"
  content: string
}

interface SlashCommand {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  type: EditableBlock["type"]
}

interface BlockEditorProps {
  initialBlocks?: EditableBlock[]
  onBlocksChange?: (blocks: EditableBlock[]) => void
  className?: string
}

export default function BlockEditor({
  initialBlocks = [],
  onBlocksChange,
  className = ""
}: BlockEditorProps) {
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [showSlashMenu, setShowSlashMenu] = useState(false)
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 })
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)
  const [slashCommandProcessing, setSlashCommandProcessing] = useState<
    string | null
  >(null)
  const isHydrated = useIsHydrated()

  // Default blocks if none provided
  const defaultBlocks: EditableBlock[] = [
    {
      id: "default-title",
      type: "title",
      content: "Untitled"
    },
    {
      id: "default-paragraph",
      type: "paragraph",
      content: ""
    }
  ]

  const [blocks, setBlocks] = useState<EditableBlock[]>(() => {
    // Use function form of useState to ensure proper initialization
    return initialBlocks.length > 0 ? initialBlocks : defaultBlocks
  })

  // Sync blocks with initialBlocks prop changes (for hydration safety)
  useEffect(() => {
    if (initialBlocks.length > 0) {
      setBlocks(initialBlocks)
    }
  }, [initialBlocks])

  // Notify parent component of blocks changes
  useEffect(() => {
    if (onBlocksChange) {
      onBlocksChange(blocks)
    }
  }, [blocks, onBlocksChange])

  // Close slash menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSlashMenu) {
        const target = event.target as Element
        const slashMenu = document.querySelector("[data-slash-menu]")
        if (slashMenu && !slashMenu.contains(target)) {
          setShowSlashMenu(false)
          setCurrentBlockId(null)
        }
      }
    }

    if (showSlashMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSlashMenu])

  const slashCommands: SlashCommand[] = [
    {
      id: "paragraph",
      title: "Text",
      description: "Just start writing with plain text.",
      icon: <Type className="size-4" />,
      type: "paragraph"
    },
    {
      id: "heading",
      title: "Heading 1",
      description: "Big section heading.",
      icon: <Hash className="size-4" />,
      type: "heading"
    },
    {
      id: "heading2",
      title: "Heading 2",
      description: "Medium section heading.",
      icon: <Hash className="size-4" />,
      type: "heading2"
    },
    {
      id: "heading3",
      title: "Heading 3",
      description: "Small section heading.",
      icon: <Hash className="size-4" />,
      type: "heading3"
    },
    {
      id: "bulleted-list",
      title: "Bulleted list",
      description: "Create a simple bulleted list.",
      icon: <List className="size-4" />,
      type: "bulleted-list"
    },
    {
      id: "numbered-list",
      title: "Numbered list",
      description: "Create a list with numbering.",
      icon: <List className="size-4" />,
      type: "numbered-list"
    },
    {
      id: "to-do",
      title: "To-do list",
      description: "Track tasks with a to-do list.",
      icon: <CheckSquare className="size-4" />,
      type: "to-do"
    },
    {
      id: "quote",
      title: "Quote",
      description: "Capture a quote.",
      icon: <Quote className="size-4" />,
      type: "quote"
    },
    {
      id: "code",
      title: "Code",
      description: "Capture a code snippet.",
      icon: <Code className="size-4" />,
      type: "code"
    },
    {
      id: "divider",
      title: "Divider",
      description: "Visually divide blocks.",
      icon: <Minus className="size-4" />,
      type: "divider"
    }
  ]

  const updateBlock = (id: string, content: string) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block => (block.id === id ? { ...block, content } : block))
    )
  }

  const insertBlock = (afterId: string, newBlock: EditableBlock) => {
    setBlocks(prevBlocks => {
      const index = prevBlocks.findIndex(block => block.id === afterId)
      const newBlocks = [...prevBlocks]
      newBlocks.splice(index + 1, 0, newBlock)
      return newBlocks
    })
  }

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) return
    setBlocks(blocks.filter(block => block.id !== id))
    setEditingBlock(null)
  }

  const copyBlock = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
    }
  }

  const handleSlashCommand = (command: SlashCommand, blockId: string) => {
    const currentBlock = blocks.find(b => b.id === blockId)
    if (!currentBlock) return

    const currentContent = currentBlock.content
    const contentBeforeSlash = currentContent.substring(
      0,
      currentContent.lastIndexOf("/")
    )

    // Set processing flag to prevent Enter key handling for this specific block
    setSlashCommandProcessing(blockId)

    // Special handling for divider - insert new block instead of transforming current one
    if (command.type === "divider") {
      const newBlock: EditableBlock = {
        id: `block-${Date.now()}`,
        type: "divider",
        content: "---"
      }
      insertBlock(blockId, newBlock)
      setShowSlashMenu(false)
      setCurrentBlockId(null)
      // Clear the flag after operation
      setTimeout(() => setSlashCommandProcessing(null), 100)
      return
    }

    // For all other block types, transform the current block and keep content before slash
    const newContent = contentBeforeSlash

    // Update the block type and content
    setBlocks(
      blocks.map(block =>
        block.id === blockId
          ? { ...block, type: command.type, content: newContent }
          : block
      )
    )

    // Clear slash menu state
    setShowSlashMenu(false)
    setCurrentBlockId(null)

    // Keep the block in edit mode and focus it
    setEditingBlock(blockId)

    // Ensure proper focus and cursor positioning for the transformed block
    setTimeout(() => {
      const textarea = document.querySelector(
        `[data-block-id="${blockId}"] textarea`
      ) as HTMLTextAreaElement
      if (textarea) {
        textarea.focus()
        // Place cursor at the end of the content
        textarea.setSelectionRange(textarea.value.length, textarea.value.length)
        // Adjust height for content
        textarea.style.height = "auto"
        textarea.style.height = textarea.scrollHeight + "px"
      }
      // Clear the flag after focus is set
      setSlashCommandProcessing(null)
    }, 100)
  }

  const EditableText = ({ block }: { block: EditableBlock }) => {
    const [localContent, setLocalContent] = useState(block.content)
    const [isHovered, setIsHovered] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const blockRef = useRef<HTMLDivElement>(null)
    const isCreatingNewBlock = useRef(false)
    const previousBlockContent = useRef(block.content)
    const justSelectedFromSlash = useRef(false)
    const isTransformingFromSlash = useRef(false)
    const isEditing = editingBlock === block.id

    useEffect(() => {
      // Only update localContent if we're not currently editing this block
      // AND we're not in the middle of creating a new block
      // This prevents content from being overwritten while typing or during block creation
      if (!isEditing && !isCreatingNewBlock.current) {
        setLocalContent(block.content)
      }

      // Special case: if block content changed while we were editing (e.g., from slash command transformation)
      // we need to update our local content to reflect the transformation
      // BUT NOT if we're in the middle of a slash transformation where user might be continuing to type
      if (
        isEditing &&
        block.content !== previousBlockContent.current &&
        !isCreatingNewBlock.current &&
        !isTransformingFromSlash.current
      ) {
        setLocalContent(block.content)
      }

      // Always track the previous content
      previousBlockContent.current = block.content
    }, [block.content, isEditing])

    useEffect(() => {
      if (isEditing && textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        )
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px"
      }
    }, [isEditing, localContent])

    const handleClick = () => {
      if (!isEditing && isHydrated) {
        // Ensure we have the latest content when entering edit mode
        setLocalContent(block.content)
        setEditingBlock(block.id)
      }
    }

    const handleBlur = () => {
      // Only process blur if we're actually editing this block
      if (isEditing) {
        // Save content before exiting edit mode
        updateBlock(block.id, localContent)

        // Exit edit mode and clear states
        setEditingBlock(null)
        setShowSlashMenu(false)
        setCurrentBlockId(null)

        // Clear the creating flag if it was set
        isCreatingNewBlock.current = false
        justSelectedFromSlash.current = false
        isTransformingFromSlash.current = false
        setSlashCommandProcessing(null)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (showSlashMenu && currentBlockId === block.id) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedCommandIndex(prev =>
            prev < slashCommands.length - 1 ? prev + 1 : 0
          )
          return
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedCommandIndex(prev =>
            prev > 0 ? prev - 1 : slashCommands.length - 1
          )
          return
        } else if (e.key === "Enter") {
          e.preventDefault()
          // Set flag to prevent immediate Enter key handling after slash command
          justSelectedFromSlash.current = true
          // Set flag to prevent content sync overwriting during slash transformation
          isTransformingFromSlash.current = true
          handleSlashCommand(slashCommands[selectedCommandIndex], block.id)
          // Clear the flags after a short delay
          setTimeout(() => {
            justSelectedFromSlash.current = false
            isTransformingFromSlash.current = false
          }, 100)
          return
        } else if (e.key === "Escape") {
          e.preventDefault()
          setShowSlashMenu(false)
          setCurrentBlockId(null)
          return
        } else if (e.key === "Backspace") {
          const textarea = e.target as HTMLTextAreaElement
          const cursorPos = textarea.selectionStart
          const textBeforeCursor = localContent.substring(0, cursorPos)
          if (textBeforeCursor.endsWith("/")) {
            setShowSlashMenu(false)
            setCurrentBlockId(null)
          }
        }
      }

      // Handle Shift+Enter for line breaks within the same block
      if (e.key === "Enter" && e.shiftKey && !showSlashMenu) {
        // Let the default behavior happen (insert line break)
        // Just update the textarea height after the line break is inserted
        setTimeout(() => {
          const textarea = e.target as HTMLTextAreaElement
          textarea.style.height = "auto"
          textarea.style.height = textarea.scrollHeight + "px"
        }, 0)
        return
      }

      if (e.key === "Enter" && !e.shiftKey && !showSlashMenu) {
        e.preventDefault()

        // Prevent Enter handling if we just selected from slash menu for this specific block
        if (
          justSelectedFromSlash.current ||
          slashCommandProcessing === block.id
        ) {
          return
        }

        // Special handling for empty list items - break out of list
        if (
          (block.type === "bulleted-list" ||
            block.type === "numbered-list" ||
            block.type === "to-do") &&
          localContent.trim() === ""
        ) {
          // Convert current empty list item to paragraph
          updateBlock(block.id, "")
          setBlocks(prevBlocks =>
            prevBlocks.map(b =>
              b.id === block.id ? { ...b, type: "paragraph" } : b
            )
          )
          // Clear state
          setShowSlashMenu(false)
          setCurrentBlockId(null)
          setEditingBlock(null)
          return
        }

        // Set flag to prevent content sync during block creation
        isCreatingNewBlock.current = true

        // Save the current content immediately
        updateBlock(block.id, localContent)

        // Clear slash menu state if open
        setShowSlashMenu(false)
        setCurrentBlockId(null)

        // Create new block and set it as editing
        const newBlockType: EditableBlock["type"] =
          block.type === "bulleted-list" ||
          block.type === "numbered-list" ||
          block.type === "to-do"
            ? block.type
            : "paragraph"

        const newBlock: EditableBlock = {
          id: `block-${Date.now()}`,
          type: newBlockType,
          content: ""
        }

        insertBlock(block.id, newBlock)

        // Use setTimeout to ensure state updates complete before setting edit mode
        setTimeout(() => {
          // Exit edit mode for current block AFTER saving and creating new block
          setEditingBlock(newBlock.id)
          // Clear the flag after block creation is complete
          isCreatingNewBlock.current = false
        }, 10)

        return
      }

      if (e.key === "Escape") {
        setEditingBlock(null)
        setLocalContent(block.content)
        setShowSlashMenu(false)
        setCurrentBlockId(null)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      const cursorPosition = e.target.selectionStart
      setLocalContent(newValue)

      e.target.style.height = "auto"
      e.target.style.height = e.target.scrollHeight + "px"

      const textBeforeCursor = newValue.substring(0, cursorPosition)
      const lastChar = textBeforeCursor.slice(-1)

      if (lastChar === "/") {
        const charBeforeSlash = textBeforeCursor.slice(-2, -1)
        if (
          textBeforeCursor.length === 1 ||
          charBeforeSlash === " " ||
          charBeforeSlash === "\n" ||
          charBeforeSlash === ""
        ) {
          setCurrentBlockId(block.id)
          setSelectedCommandIndex(0)
          setShowSlashMenu(true)

          const rect = e.target.getBoundingClientRect()
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop
          const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft

          const menuPosition = {
            x: rect.left + scrollLeft + 10,
            y: rect.bottom + scrollTop + 5
          }
          setSlashMenuPosition(menuPosition)
        }
      } else {
        const hasSlashInCurrentPosition =
          textBeforeCursor.includes("/") &&
          textBeforeCursor.split(" ").pop()?.startsWith("/")
        if (!hasSlashInCurrentPosition) {
          setShowSlashMenu(false)
          setCurrentBlockId(null)
        }
      }
    }

    const getClassName = () => {
      const baseClasses =
        "w-full bg-transparent border-none outline-none resize-none overflow-hidden transition-all duration-200"
      const hoverClasses = isEditing
        ? ""
        : "hover:bg-gray-50 hover:rounded-sm cursor-text"

      switch (block.type) {
        case "title":
          return `text-3xl font-bold text-gray-900 leading-tight ${baseClasses} ${hoverClasses}`
        case "paragraph":
          return `text-base text-gray-700 leading-6 ${baseClasses} ${hoverClasses}`
        case "heading":
          return `text-xl font-semibold text-gray-900 leading-7 ${baseClasses} ${hoverClasses}`
        case "heading2":
          return `text-lg font-semibold text-gray-900 leading-6 ${baseClasses} ${hoverClasses}`
        case "heading3":
          return `text-base font-semibold text-gray-900 leading-6 ${baseClasses} ${hoverClasses}`
        case "list-item":
        case "bulleted-list":
        case "numbered-list":
          return `text-base text-gray-700 leading-6 ${baseClasses} ${hoverClasses}`
        case "to-do":
          return `text-base text-gray-700 leading-6 ${baseClasses} ${hoverClasses}`
        case "quote":
          return `text-base text-gray-700 italic border-l-4 border-gray-300 pl-4 leading-6 ${baseClasses} ${hoverClasses}`
        case "code":
          return `text-sm text-gray-700 font-mono bg-gray-100 rounded px-2 py-1 leading-5 ${baseClasses} ${hoverClasses}`
        case "divider":
          return `text-center text-gray-400 leading-6 ${baseClasses} ${hoverClasses}`
        default:
          return `text-base leading-6 ${baseClasses} ${hoverClasses}`
      }
    }

    const getContainerClassName = () => {
      const baseClasses = "group relative transition-all duration-200 pr-16"
      const hoverClasses = isHovered || isEditing ? "bg-gray-50/50" : ""

      switch (block.type) {
        case "title":
          return `${baseClasses} ${hoverClasses} mb-6 rounded-sm`
        case "paragraph":
          return `${baseClasses} ${hoverClasses} mb-4 rounded-sm`
        case "heading":
          return `${baseClasses} ${hoverClasses} mb-3 rounded-sm`
        case "heading2":
          return `${baseClasses} ${hoverClasses} mb-3 rounded-sm`
        case "heading3":
          return `${baseClasses} ${hoverClasses} mb-2 rounded-sm`
        case "list-item":
        case "bulleted-list":
          return `${baseClasses} ${hoverClasses} mb-1 flex items-baseline space-x-2 rounded-sm`
        case "numbered-list":
          return `${baseClasses} ${hoverClasses} mb-1 flex items-baseline space-x-2 rounded-sm`
        case "to-do":
          return `${baseClasses} ${hoverClasses} mb-1 flex items-baseline space-x-2 rounded-sm`
        case "quote":
          return `${baseClasses} ${hoverClasses} mb-4 rounded-sm`
        case "code":
          return `${baseClasses} ${hoverClasses} mb-4 rounded-sm`
        case "divider":
          return `${baseClasses} ${hoverClasses} mb-4 flex items-center rounded-sm`
        default:
          return `${baseClasses} ${hoverClasses} mb-4 rounded-sm`
      }
    }

    const renderBlockIcon = () => {
      switch (block.type) {
        case "list-item":
        case "bulleted-list":
          return (
            <span
              className="min-w-[1rem] select-none text-base leading-6 text-gray-400"
              style={{ lineHeight: "1.5rem" }}
            >
              •
            </span>
          )
        case "numbered-list":
          const blockIndex = blocks.findIndex(b => b.id === block.id)
          let number = 1

          for (let i = 0; i < blockIndex; i++) {
            if (blocks[i].type === "numbered-list") {
              number++
            }
          }

          return (
            <span
              className="min-w-[1.5rem] select-none text-base leading-6 text-gray-400"
              style={{ lineHeight: "1.5rem" }}
            >
              {number}.
            </span>
          )
        case "to-do":
          return (
            <button
              className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border border-gray-300 transition-colors hover:border-gray-400"
              onClick={e => {
                e.stopPropagation()
              }}
            ></button>
          )
        case "divider":
          return <div className="flex-1 border-t border-gray-300"></div>
        default:
          return null
      }
    }

    const renderHoverMenu = () => {
      if (!isHovered && !isEditing) return null

      return (
        <div className="absolute -left-8 top-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            className="flex size-6 flex-col items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            title="Drag to move"
          >
            <div className="mb-0.5 flex space-x-0.5">
              <div className="size-1 rounded-full bg-current"></div>
              <div className="size-1 rounded-full bg-current"></div>
            </div>
            <div className="mb-0.5 flex space-x-0.5">
              <div className="size-1 rounded-full bg-current"></div>
              <div className="size-1 rounded-full bg-current"></div>
            </div>
            <div className="flex space-x-0.5">
              <div className="size-1 rounded-full bg-current"></div>
              <div className="size-1 rounded-full bg-current"></div>
            </div>
          </button>
        </div>
      )
    }

    const renderActionButtons = () => {
      if (!isHovered && !isEditing) return null

      return (
        <div className="absolute right-2 top-1 flex items-center space-x-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={e => {
              e.stopPropagation()
              copyBlock(block.content)
            }}
            className="flex size-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            title="Copy block content"
          >
            <Copy className="size-3" />
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              deleteBlock(block.id)
            }}
            className="flex size-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Delete block"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      )
    }

    if (isEditing) {
      return (
        <div
          ref={blockRef}
          className={getContainerClassName()}
          data-block-id={block.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderHoverMenu()}
          {renderBlockIcon()}
          <textarea
            ref={textareaRef}
            value={localContent}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={getClassName()}
            rows={1}
            placeholder={localContent === "" ? "Type '/' for commands" : ""}
          />
          {renderActionButtons()}
        </div>
      )
    }

    if (block.type === "divider") {
      return (
        <div
          ref={blockRef}
          className={getContainerClassName()}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderHoverMenu()}
          {renderBlockIcon()}
          {renderActionButtons()}
        </div>
      )
    }

    return (
      <div
        ref={blockRef}
        className={getContainerClassName()}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderHoverMenu()}
        {renderBlockIcon()}
        <div
          className={`${getClassName()} ${isEditing ? "" : "-m-1 min-h-[1.5rem] p-1"}`}
        >
          {block.content || (
            <span className="select-none text-gray-400">
              Type '/' for commands
            </span>
          )}
        </div>
        {renderActionButtons()}
      </div>
    )
  }

  const SlashCommandMenu = () => {
    if (!showSlashMenu || !currentBlockId) {
      return null
    }

    return (
      <div
        data-slash-menu
        className="fixed z-[99999] max-h-80 w-72 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-2xl"
        style={{
          left: `${slashMenuPosition.x}px`,
          top: `${slashMenuPosition.y}px`,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-1 px-2 py-1 text-xs font-medium uppercase tracking-wide text-gray-500">
          BASIC BLOCKS
        </div>
        {slashCommands.map((command, index) => (
          <button
            key={command.id}
            onMouseDown={e => {
              e.preventDefault() // Prevent textarea blur
              e.stopPropagation()
              handleSlashCommand(command, currentBlockId)
            }}
            className={`flex w-full items-start space-x-3 rounded p-2 text-left transition-colors hover:bg-gray-100 ${
              index === selectedCommandIndex
                ? "border border-blue-200 bg-blue-50"
                : ""
            }`}
          >
            <div className="mt-0.5 text-gray-600">{command.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900">
                {command.title}
              </div>
              <div className="text-xs text-gray-500">{command.description}</div>
            </div>
          </button>
        ))}
      </div>
    )
  }

  const addNewBlock = () => {
    if (!isHydrated) return

    const newBlock: EditableBlock = {
      id: `block-${Date.now()}`,
      type: "paragraph",
      content: ""
    }
    setBlocks([...blocks, newBlock])
    setEditingBlock(newBlock.id)
  }

  // Static non-interactive block for pre-hydration rendering
  const StaticBlock = ({ block }: { block: EditableBlock }) => {
    const getStaticClassName = () => {
      switch (block.type) {
        case "title":
          return "text-3xl font-bold text-gray-900 leading-tight mb-6"
        case "paragraph":
          return "text-base text-gray-700 leading-6 mb-4"
        case "heading":
          return "text-xl font-semibold text-gray-900 leading-7 mb-3"
        case "heading2":
          return "text-lg font-semibold text-gray-900 leading-6 mb-3"
        case "heading3":
          return "text-base font-semibold text-gray-900 leading-6 mb-2"
        case "bulleted-list":
        case "numbered-list":
        case "to-do":
          return "text-base text-gray-700 leading-6 mb-1"
        case "quote":
          return "text-base text-gray-700 italic border-l-4 border-gray-300 pl-4 leading-6 mb-4"
        case "code":
          return "text-sm text-gray-700 font-mono bg-gray-100 rounded px-2 py-1 leading-5 mb-4"
        case "divider":
          return "text-center text-gray-400 leading-6 mb-4"
        default:
          return "text-base leading-6 mb-4"
      }
    }

    const renderStaticIcon = () => {
      switch (block.type) {
        case "bulleted-list":
          return (
            <span className="mr-2 min-w-[1rem] select-none text-base leading-6 text-gray-400">
              •
            </span>
          )
        case "numbered-list":
          return (
            <span className="mr-2 min-w-[1.5rem] select-none text-base leading-6 text-gray-400">
              1.
            </span>
          )
        case "to-do":
          return (
            <div className="mr-2 mt-0.5 size-4 shrink-0 rounded border border-gray-300"></div>
          )
        case "divider":
          return <div className="flex-1 border-t border-gray-300"></div>
        default:
          return null
      }
    }

    if (block.type === "divider") {
      return <div className="mb-4 flex items-center">{renderStaticIcon()}</div>
    }

    if (
      block.type === "bulleted-list" ||
      block.type === "numbered-list" ||
      block.type === "to-do"
    ) {
      return (
        <div className="mb-1 flex items-baseline space-x-2">
          {renderStaticIcon()}
          <div className={getStaticClassName()}>
            {block.content || (
              <span className="text-gray-400">Empty block</span>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className={getStaticClassName()}>
        {block.content || (
          <span className="text-gray-400">
            {block.type === "paragraph" ? "Empty block" : "Click to edit"}
          </span>
        )}
      </div>
    )
  }

  // Show non-interactive content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div className={`space-y-0 ${className} opacity-75`}>
        {blocks.map(block => (
          <StaticBlock key={block.id} block={block} />
        ))}
      </div>
    )
  }

  return (
    <div className={`space-y-0 ${className}`}>
      {blocks.map(block => (
        <EditableText key={block.id} block={block} />
      ))}

      <div className="mt-8">
        <button
          onClick={addNewBlock}
          className="group flex items-center space-x-2 rounded-md px-3 py-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
        >
          <Type className="size-4 group-hover:text-gray-700" />
          <span className="text-sm">Add a block</span>
        </button>
      </div>

      <SlashCommandMenu />
    </div>
  )
}
