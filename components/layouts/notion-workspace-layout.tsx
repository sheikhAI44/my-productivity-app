"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Home,
  BookOpen,
  FileText,
  Calendar,
  Folder,
  Target,
  Settings,
  Inbox,
  Users,
  Layout,
  Share,
  Star,
  Mic,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  Edit3,
  MessageCircle,
  Flag,
  Grid3X3,
  MoreHorizontal,
  Sparkles,
  Globe,
  BarChart3,
  Check,
  LogOut,
  UserPlus,
  Copy,
  History,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Link,
  Volume2
} from "lucide-react"

interface WorkspaceLayoutProps {
  children: React.ReactNode
  title?: string
  lastEdited?: string
}

export default function NotionWorkspaceLayout({
  children,
  title = "Designs",
  lastEdited = "May 1"
}: WorkspaceLayoutProps) {
  const [essentialsOpen, setEssentialsOpen] = useState(true)
  const [documentsOpen, setDocumentsOpen] = useState(true)

  // Header functionality states
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [pageOptionsDropdownOpen, setPageOptionsDropdownOpen] = useState(false)
  const [assistantCollapsed, setAssistantCollapsed] = useState(false)
  const [assistantSettingsOpen, setAssistantSettingsOpen] = useState(false)

  // Page states
  const [pageTitle, setPageTitle] = useState(title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [pageLastEdited, setPageLastEdited] = useState(lastEdited)

  // Refs for click outside detection
  const workspaceDropdownRef = useRef<HTMLDivElement>(null)
  const pageOptionsDropdownRef = useRef<HTMLDivElement>(null)
  const assistantSettingsRef = useRef<HTMLDivElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        workspaceDropdownRef.current &&
        !workspaceDropdownRef.current.contains(event.target as Node)
      ) {
        setWorkspaceDropdownOpen(false)
      }
      if (
        pageOptionsDropdownRef.current &&
        !pageOptionsDropdownRef.current.contains(event.target as Node)
      ) {
        setPageOptionsDropdownOpen(false)
      }
      if (
        assistantSettingsRef.current &&
        !assistantSettingsRef.current.contains(event.target as Node)
      ) {
        setAssistantSettingsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus title input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  // Handle title editing
  const handleTitleSubmit = () => {
    setIsEditingTitle(false)
    setPageLastEdited(
      new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
    )
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSubmit()
    }
    if (e.key === "Escape") {
      setPageTitle(title) // Reset to original
      setIsEditingTitle(false)
    }
  }

  // Copy link functionality
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Could add toast notification here
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  return (
    <div className="flex min-h-screen bg-white font-['Inter',_system-ui,_-apple-system,_sans-serif]">
      {/* Left Sidebar */}
      <div className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-gray-200 bg-gray-50">
        {/* Left Sidebar Header */}
        <div className="sticky top-0 z-40 flex h-12 items-center border-b border-gray-200 bg-gray-50 px-4">
          <div className="relative" ref={workspaceDropdownRef}>
            <button
              onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
              className="flex items-center space-x-2 rounded px-2 py-1 transition-colors hover:bg-gray-100"
            >
              <span className="text-sm font-medium text-gray-900">
                Writi guide
              </span>
              <ChevronDown className="size-4 text-gray-500" />
            </button>

            {/* Workspace Dropdown */}
            {workspaceDropdownOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="size-4" />
                  <span>Workspace settings</span>
                </button>
                <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Layout className="size-4" />
                  <span>Switch workspace</span>
                </button>
                <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <UserPlus className="size-4" />
                  <span>Invite members</span>
                </button>
                <div className="my-2 border-t border-gray-200"></div>
                <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Main navigation */}
          <div className="mb-6 space-y-1">
            <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
              <Sparkles className="size-4 text-gray-600" />
              <span className="text-sm text-gray-700">Writi AI</span>
            </div>

            <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
              <Home className="size-4 text-gray-600" />
              <span className="text-sm text-gray-700">Home</span>
            </div>

            <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
              <Grid3X3 className="size-4 text-gray-600" />
              <span className="text-sm text-gray-700">Prompt Guide</span>
            </div>

            <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
              <MessageCircle className="size-4 text-gray-600" />
              <span className="text-sm text-gray-700">Memory bank</span>
            </div>

            <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
              <Search className="size-4 text-gray-600" />
              <span className="text-sm text-gray-700">Search</span>
            </div>
          </div>

          {/* Essentials section */}
          <div className="mb-6">
            <button
              onClick={() => setEssentialsOpen(!essentialsOpen)}
              className="flex w-full items-center justify-between rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-gray-500 hover:bg-gray-100"
            >
              <span>Essentials</span>
              {essentialsOpen ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
            </button>

            {essentialsOpen && (
              <div className="mt-2 space-y-1">
                <a
                  href="/todo-planner"
                  className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100"
                >
                  <FileText className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    to-do list/ planner
                  </span>
                </a>

                <div className="flex cursor-pointer items-center space-x-3 rounded bg-gray-200 px-2 py-1.5">
                  <Edit3 className="size-4 text-gray-800" />
                  <span className="text-sm font-medium text-gray-900">
                    Designs
                  </span>
                  <MoreHorizontal className="ml-auto size-4 text-gray-600" />
                </div>

                <a
                  href="/getting-started"
                  className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100"
                >
                  <BookOpen className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Getting started</span>
                </a>
              </div>
            )}
          </div>

          {/* Documents section */}
          <div className="mb-6">
            <button
              onClick={() => setDocumentsOpen(!documentsOpen)}
              className="flex w-full items-center justify-between rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-gray-500 hover:bg-gray-100"
            >
              <span>Documents</span>
              {documentsOpen ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
            </button>

            {documentsOpen && (
              <div className="mt-2 space-y-1">
                <a
                  href="/reading-list"
                  className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100"
                >
                  <BookOpen className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Reading List</span>
                </a>

                <a
                  href="/tasks"
                  className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100"
                >
                  <div className="flex size-4 items-center justify-center rounded bg-green-500">
                    <Check className="size-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">Tasks</span>
                </a>

                <a
                  href="/travel-plans"
                  className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100"
                >
                  <Flag className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    Travel plans 2025
                  </span>
                </a>

                <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
                  <Folder className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Misc</span>
                </div>

                <a
                  href="/goals"
                  className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100"
                >
                  <Target className="size-4 text-orange-500" />
                  <span className="text-sm text-gray-700">Goals</span>
                </a>

                <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
                  <Settings className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Settings</span>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
                  <Inbox className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Inbox</span>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
                  <Users className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Invite members</span>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 rounded px-2 py-1.5 hover:bg-gray-100">
                  <Grid3X3 className="size-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Templates</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 p-4">
          <div className="relative mb-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              <X className="size-3" />
            </button>
            <div className="flex items-start space-x-2">
              <MessageCircle className="mt-0.5 size-4 text-blue-600" />
              <p className="text-xs text-blue-800">
                Ask questions and brainstorm ideas with Writi AI. Try it out
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-orange-400">
              <span className="text-xs font-medium text-white">H</span>
            </div>
            <span className="text-xs text-gray-600">Hamza Ahmad</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`ml-64 flex-1 ${assistantCollapsed ? "mr-0" : "mr-80"} transition-all duration-300`}
      >
        {/* Center Page Header */}
        <div className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center space-x-4">
            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <button className="rounded p-1 hover:bg-gray-200">
                <ChevronLeft className="size-4 text-gray-500" />
              </button>
              <button className="rounded p-1 hover:bg-gray-200">
                <ChevronRight className="size-4 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <Edit3 className="size-4 text-gray-500" />
              {isEditingTitle ? (
                <input
                  ref={titleInputRef}
                  value={pageTitle}
                  onChange={e => setPageTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleTitleKeyDown}
                  className="rounded border-none bg-transparent px-1 text-sm font-medium text-gray-900 outline-none focus:bg-gray-50"
                />
              ) : (
                <span
                  onClick={() => setIsEditingTitle(true)}
                  className="cursor-pointer rounded px-1 py-0.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  {pageTitle}
                </span>
              )}
            </div>

            <span className="text-sm text-gray-500">
              Edited {pageLastEdited}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center space-x-1 rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-200"
            >
              <Share className="size-4" />
              <span>Share</span>
            </button>

            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="rounded p-1 hover:bg-gray-200"
            >
              <Star
                className={`size-4 ${isFavorited ? "fill-yellow-500 text-yellow-500" : "text-gray-500"}`}
              />
            </button>

            <div className="relative" ref={pageOptionsDropdownRef}>
              <button
                onClick={() =>
                  setPageOptionsDropdownOpen(!pageOptionsDropdownOpen)
                }
                className="rounded p-1 hover:bg-gray-200"
              >
                <MoreHorizontal className="size-4 text-gray-500" />
              </button>

              {/* Page Options Dropdown */}
              {pageOptionsDropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <History className="size-4" />
                    <span>Page history</span>
                  </button>
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Copy className="size-4" />
                    <span>Duplicate</span>
                  </button>
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Download className="size-4" />
                    <span>Export</span>
                  </button>
                  <div className="my-2 border-t border-gray-200"></div>
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <Trash2 className="size-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="mx-auto max-w-3xl p-8">{children}</div>
      </div>

      {/* Right Sidebar - AI Panel */}
      {!assistantCollapsed && (
        <div className="fixed inset-y-0 right-0 flex w-80 flex-col border-l border-gray-200 bg-gray-50">
          {/* Right Sidebar Header */}
          <div className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-gray-200 bg-gray-50 px-4">
            <div className="relative" ref={assistantSettingsRef}>
              <button
                onClick={() => setAssistantSettingsOpen(!assistantSettingsOpen)}
                className="flex items-center space-x-2 rounded px-2 py-1 transition-colors hover:bg-gray-100"
              >
                <Sparkles className="size-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Writi AI
                </span>
              </button>

              {/* Assistant Settings Dropdown */}
              {assistantSettingsOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="size-4" />
                    <span>AI Settings</span>
                  </button>
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Volume2 className="size-4" />
                    <span>Voice settings</span>
                  </button>
                  <button className="flex w-full items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Globe className="size-4" />
                    <span>Theme</span>
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setAssistantCollapsed(true)}
              className="rounded p-1 hover:bg-gray-200"
            >
              <X className="size-4 text-gray-500" />
            </button>
          </div>

          {/* AI Panel Content */}
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Ask me Anything
              </h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <button
                    className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-100"
                    onClick={() => console.log("Create clicked")}
                  >
                    <Plus className="size-4" />
                    <span>Create</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-100"
                    onClick={() => console.log("Market clicked")}
                  >
                    <BarChart3 className="size-4" />
                    <span>Market</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-100"
                    onClick={() => console.log("Plan clicked")}
                  >
                    <Globe className="size-4" />
                    <span>Plan</span>
                  </button>
                </div>
                <button
                  className="flex w-full items-center space-x-2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white"
                  onClick={() => console.log("Learn clicked")}
                >
                  <BookOpen className="size-4" />
                  <span>Learn</span>
                </button>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
                onClick={() => console.log("make a video script in 60 seconds")}
              >
                <p className="text-sm text-gray-700">
                  make a video script in 60 seconds
                </p>
              </div>
              <div
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
                onClick={() => console.log("Edit my Writing")}
              >
                <p className="text-sm text-gray-700">Edit my Writing</p>
              </div>
              <div
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
                onClick={() => console.log("Generate 50 + ideas")}
              >
                <p className="text-sm text-gray-700">Generate 50 + ideas</p>
              </div>
              <div
                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
                onClick={() => console.log("Give me a summary of my notes")}
              >
                <p className="text-sm text-gray-700">
                  Give me a summary of my notes
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6">
            <div
              className="mb-4 cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
              onClick={() => console.log("add context")}
            >
              <p className="text-xs text-gray-500">+ add context</p>
            </div>

            <div className="mb-3 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask AI anything, @mention"
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Mic className="size-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Settings className="size-4" />
              </button>
              <button className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Globe className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button to reopen assistant */}
      {assistantCollapsed && (
        <button
          onClick={() => setAssistantCollapsed(false)}
          className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700"
        >
          <Sparkles className="size-5" />
        </button>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 w-96 max-w-full rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Share "{pageTitle}"
              </h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="rounded p-1 hover:bg-gray-200"
              >
                <X className="size-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Public/Private Toggle */}
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center space-x-3">
                  {isPublic ? (
                    <Eye className="size-4 text-green-600" />
                  ) : (
                    <EyeOff className="size-4 text-gray-500" />
                  )}
                  <div>
                    <div className="text-sm font-medium">
                      {isPublic ? "Public" : "Private"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isPublic
                        ? "Anyone with the link can view"
                        : "Only invited people can access"}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublic ? "bg-blue-600" : "bg-gray-300"}`}
                >
                  <span
                    className={`inline-block size-4 rounded-full bg-white transition-transform${isPublic ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>

              {/* Copy Link */}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                >
                  <Copy className="size-4" />
                  <span>Copy</span>
                </button>
              </div>

              {/* Invite Collaborators */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Invite collaborators
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="rounded-lg bg-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-300">
                    Invite
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
