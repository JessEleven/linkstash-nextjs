import { db } from '@/db/drizzle'
import { linkbox } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST (req) {
  try {
    const { linkName, originalUrl, userId } = await req.json()

    const existingLink = await db.select().from(linkbox).where(and(
      eq(linkbox.linkName, linkName),
      eq(linkbox.userId, userId)
    )).limit(1)

    if (existingLink.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'The link name is already in use by you'
      }, { status: 400 })
    }

    const shortCode = nanoid(15)

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
