import { db } from '@/db/drizzle'
import { linkbox } from '@/db/schema'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST (req) {
  try {
    const { linkName, originalUrl, userId } = await req.json()
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
    // PostgreSQL error code for "single constraint violation"
    if (error.code === '23505') {
      return NextResponse.json({
        success: false,
        error: 'The link name is already in use'
      }, { status: 400 })
    }
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
