'use client'

import { authClient } from '@/libs/auth-client'
import React, { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'

export default function ListSessions () {
  const [list, setList] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await authClient.listSessions()

      const sessionsWithLocation = await Promise.all(
        data.map(async (session) => {
          let locationInfo = 'Location Unknown'

          if (session?.ipAddress && session.ipAddress !== '::1') {
            try {
              const res = await fetch(`http://ip-api.com/json/${session.ipAddress}`)
              const data = await res.json()
              if (data.status === 'success') {
                locationInfo = `${data.city}, ${data.regionName}, ${data.country}`
              }
            } catch (error) {
              console.error('Error obtaining geolocation:', error)
            }
          }
          return { ...session, locationInfo }
        })
      )
      setList(sessionsWithLocation)
      // console.log({ sessions_location: sessionsWithLocation })
    })()
  }, [])

  // console.log({ list_sessions: list })

  return (
    <>
      {list?.map((item, index) => {
        const isLast = list && index === list.length - 1
        const marginBottom = list.length > 1 && !isLast ? 'mb-2.5' : ''

        const parser = new UAParser(item.userAgent)
        const browser = parser.getBrowser()
        const os = parser.getOS()
        const device = parser.getDevice()

        const osName = `${os.name ?? 'Unknown'} ${os.version ?? ''}`
        const browserName = `${browser.name ?? 'Unknown'} ${browser.version ?? ''}`
        const deviceType = device.type ?? 'Desktop'

        return (
          <article key={item.id} className={`${marginBottom}`}>
            <p className='text-sm'>{osName} — <span>{deviceType}</span></p>
            <p className='text-sm'>{browserName}</p>
            <p className='text-sm'>{item.ipAddress ?? 'IP not available'} — <span className='text-sm'>{item.locationInfo}</span></p>
          </article>
        )
      })}
    </>
  )
}
