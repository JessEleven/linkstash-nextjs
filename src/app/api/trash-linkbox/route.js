import { db } from '@/db/drizzle'
import { linkbox } from '@/db/schema'
import { auth } from '@/libs/auth'
import { and, asc, eq, isNotNull } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET () {
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

    // The logged-in user's links are queried
    const userTrashLinks = await db.select().from(linkbox)
      .where(and(eq(linkbox.userId, userId.id), isNotNull(linkbox.deletedAt)))
      .orderBy(asc(linkbox.deletedAt))

    if (userTrashLinks.length <= 0) {
      return NextResponse.json({
        success: false,
        error: 'No links added to the trash'
      }, { status: 404 })
    }

    // console.log({ data: userTrashLinks })
    return NextResponse.json({
      success: true,
      name: userId.name,
      email: userId.email,
      total: userTrashLinks.length,
      data: userTrashLinks
    })
  } catch (error) {
    // console.error('Error fetching user trash links')
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

    // console.log({ userId: userId.id })

    if (!userId.id) {
      return NextResponse.json({
        success: false,
        error: 'User is not authenticated'
      }, { status: 401 })
    }
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Missing linkbox ID'
      }, { status: 400 })
    }
    const restored = await db.update(linkbox)
      .set({ deletedAt: null })
      .where(and(eq(linkbox.id, id), eq(linkbox.userId, userId.id)))
      .returning()

    return NextResponse.json({
      success: true,
      data: restored
    })
  } catch (error) {
    // console.error('Error fetching user restore links', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

export async function DELETE (req) {
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
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Missing linkbox ID'
      }, { status: 400 })
    }
    const deleted = await db.delete(linkbox)
      .where(and(eq(linkbox.id, id), eq(linkbox.userId, userId.id)))
      .returning()

    return NextResponse.json({
      success: true,
      data: deleted
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
