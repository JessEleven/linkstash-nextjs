import { db } from '@/db/drizzle'
import { linkbox } from '@/db/schema'
import { auth } from '@/libs/auth'
import { and, asc, desc, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
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
    const userLinks = await db.select().from(linkbox)
      .where(and(eq(linkbox.userId, userId.id), eq(linkbox.favorite, false)))
      .orderBy(orderByCondition)

    // console.log({ name: userId.name, data: userLinks })

    return NextResponse.json({
      success: true,
      name: userId.name,
      email: userId.email,
      data: userLinks
    })
  } catch (error) {
    // console.error('Error fetching user links')
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

export async function POST (req) {
  try {
    const { linkName, originalUrl, userId } = await req.json()

    const existingLink = await db.select().from(linkbox)
      .where(and(
        eq(linkbox.linkName, linkName),
        eq(linkbox.userId, userId)
      )).limit(1)

    if (existingLink.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'The link name is already in use by you'
      }, { status: 400 })
    }

    const shortCode = nanoid(12)

    const result = await db.insert(linkbox).values({
      linkName,
      shortUrl: shortCode,
      originalUrl,
      userId
    }).returning({ insertedId: linkbox.id })

    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
