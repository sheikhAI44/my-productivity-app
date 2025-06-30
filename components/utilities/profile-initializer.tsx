"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import {
  createProfileAction,
  getProfileByUserIdAction
} from "@/actions/db/profiles-actions"

export function ProfileInitializer() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    async function initializeProfile() {
      if (isLoaded && user?.id) {
        try {
          const profileRes = await getProfileByUserIdAction(user.id)
          if (!profileRes.isSuccess) {
            await createProfileAction({ userId: user.id })
          }
        } catch (error) {
          console.error("Error initializing profile:", error)
        }
      }
    }

    initializeProfile()
  }, [user?.id, isLoaded])

  return null
}
