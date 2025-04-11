import { db } from '@/db/drizzle'
import { linkbox } from '@/db/schema'
import { auth } from '@/libs/auth'
import { and, asc, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET (req) {
  try {
    // The authenticated user's session is retrieved
    const authUserId = await auth.api.getSession(
      { headers: await headers() }
    )
    const userId = authUserId?.user

    // console.log({ userId: userId.id })

    if (!userId.id) {
      return NextResponse.json({
        success: false,
        error: 'User is not authenticated'
      }, { status: 401 })
    }
    const url = new URL(req.url)
    const sortBy = url.searchParams.get('sortBy') || 'name'

    let orderByCondition

    if (sortBy === 'name') {
      orderByCondition = asc(linkbox.linkName)
    } else if (sortBy === 'visits') {
      orderByCondition = desc(linkbox.visits)
    }

    // The logged-in user's links are queried
    const userFavoriteLinks = await db.select().from(linkbox)
      .where(and(eq(linkbox.userId, userId.id), eq(linkbox.favorite, true)))
      .orderBy(orderByCondition)

    if (userFavoriteLinks.length <= 0) {
      return NextResponse.json({
        success: false,
        error: 'No links added to favorites'
      }, { status: 400 })
    }

    // console.log({ name: userId.name, data: userFvaoriteLinks })

    return NextResponse.json({
      success: true,
      name: userId.name,
      email: userId.email,
      total: userFavoriteLinks.length,
      data: userFavoriteLinks
    })
  } catch (error) {
    // console.error('Error fetching user favorite links')
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

export async function PATCH (req) {
  try {
    // The authenticated user's session is retrieved
    const authUserId = await auth.api.getSession(
      { headers: await headers() }
    )
    const userId = authUserId?.user
    const { id, favorite } = await req.json()

    if (!userId.id) {
      return NextResponse.json({
        success: false,
        error: 'User is not authenticated'
      }, { status: 401 })
    }

    await db.update(linkbox)
      .set({ favorite })
      .where(and(eq(linkbox.id, id), eq(linkbox.userId, userId.id)))

    return NextResponse.json({
      success: true,
      name: userId.name,
      email: userId.email,
      message: `Linkbox ${favorite ? 'marked as' : 'removed from'} favorite`
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
