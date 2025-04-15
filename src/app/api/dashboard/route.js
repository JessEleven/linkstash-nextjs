import { NextResponse } from 'next/server'
import { auth } from '@/libs/auth'
import { headers } from 'next/headers'
import { db } from '@/db/drizzle'
import { and, eq, isNotNull, isNull } from 'drizzle-orm'
import { linkbox } from '@/db/schema'

export async function GET () {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers()
    })

    if (!user?.id) {
      return NextResponse.json({
        error: 'User is not authenticated'
      }, { status: 401 })
    }

    const allLinks = await db.select().from(linkbox)
      .where(eq(linkbox.userId, user.id))

    const allActiveLinks = await db.select().from(linkbox)
      .where(and(eq(linkbox.userId, user.id), eq(linkbox.favorite, false), isNull(linkbox.deletedAt)))

    const allFavorites = await db.select().from(linkbox)
      .where(and(eq(linkbox.userId, user.id), eq(linkbox.favorite, true)))

    const allTrash = await db.select().from(linkbox)
      .where(and(eq(linkbox.userId, user.id), isNotNull(linkbox.deletedAt)))

    const totalVisits = allLinks.reduce((acc, link) => acc + (link.visits ?? 0), 0)

    const totalActiveVisits = allActiveLinks.reduce((acc, link) => acc + (link.visits ?? 0), 0)

    const totalFavoritesVisits = allFavorites.reduce((acc, link) => acc + (link.visits ?? 0), 0)

    const totalTrashVisited = allTrash.reduce((acc, link) => acc + (link.visits ?? 0), 0)

    return NextResponse.json({
      success: true,
      name: user.name,
      email: user.email,
      total_links: allLinks.length,
      total_active_links: allActiveLinks.length,
      total_favorites: allFavorites.length,
      total_trash: allTrash.length,
      total_visits: totalVisits,
      total_active_visits: totalActiveVisits,
      total_favorites_visits: totalFavoritesVisits,
      total_trash_visited: totalTrashVisited
    })
  } catch (error) {
    // console.error('[DASHBOARD_STATS_ERROR]', error)
    return NextResponse.json({
      error: 'Something went wrong'
    }, { status: 500 })
  }
}
