/* eslint-disable multiline-ternary */
'use client'

import { useState, useEffect } from 'react'
import { getLinkboxes } from '@/controllers/linkbox-controller'
import Link from 'next/link'
import {
  EditIcon,
  ExternalLinkIcon,
  InboxOffIcon,
  StarFilledIcon,
  StarIcon,
  TrashIcon
} from '../resources/assets/linkboxes-icons'
import { BarsIcon } from '../resources/assets/bars-icon'
import moment from 'moment'
import { getFavoriteLinkboxes, toggleFavorite } from '@/controllers/favorite-linkbox-controller'
import { usePathname } from 'next/navigation'

export default function GetLinkboxes ({ refresh, layout, sortBy, isRefreshing }) {
  const [links, setLinks] = useState([])
  const [favLinks, setFavLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const pathname = usePathname()
  const shortenerUrl = (code) => `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`
  // links.forEach(link => console.log(link.originalUrl))

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        isRefreshing(true)
        if (pathname === '/ovw/linkbox') {
          const userLinks = await getLinkboxes(sortBy)
          setLinks(userLinks)
        }
        if (pathname === '/ovw/favorite') {
          const userFavLinks = await getFavoriteLinkboxes(sortBy)
          setFavLinks(userFavLinks)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setTimeout(() => {
          setLoading(false)
          isRefreshing(false)
        }, 350)
      }
    })()
  }, [refresh, pathname, sortBy])

  return (
    <main className='mb-10 relative'>
      {loading
        ? (
          <div className='flex place-content-center'>
            <BarsIcon className='mt-52' />
          </div>
          ) : (
            <>
              {!error && (
                <div className='flex justify-center absolute w-full top-9'>
                  <h3 className='text-sm text-neutral-400'>{error}</h3>
                </div>
              )}

              <div
                className={`mt-5 gap-5 ${
              layout === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3' : 'flex flex-col w-full'
            }`}
              >
                {(pathname === '/ovw/linkbox' ? links : pathname === '/ovw/favorite' ? favLinks : [])
                  .length > 0 ? (
                      (pathname === '/ovw/linkbox' ? links : pathname === '/ovw/favorite' ? favLinks : [])
                        .map((item) => {
                          const faviconUrl = `${new URL(item.originalUrl).origin}/favicon.ico`

                          return (
                            <article
                              key={item.id}
                              className='bg-[#2b2c32] border border-[#2b2c32] hover:border-slate-500 transition-colors ease-in-out duration-300 rounded-lg p-5 truncate'
                            >
                              <div className='flex items-center justify-between gap-x-7'>
                                <div className='flex items-center gap-x-1.5 truncate'>
                                  <img
                                    src={faviconUrl}
                                    alt='Favicon'
                                    className='size-[22px] md:size-[26px]'
                                    onError={(e) => (e.target.src = '/default.svg')}
                                  />
                                  <h3 className='text-lg font-medium truncate'>{item.linkName}</h3>
                                </div>
                                <div className='flex items-center gap-x-1.5'>
                                  <button
                                    type='button'
                                    className='ovw-icon-hover'
                                    onClick={() => {
                                      toggleFavorite({
                                        id: item.id,
                                        favorite: item.favorite,
                                        onSuccess: () => {
                                          // Actualiza los links o favoritos dependiendo de la ruta
                                          if (pathname === '/ovw/linkbox') {
                                            setLinks((prev) => prev.filter((link) => link.id !== item.id))
                                          } else if (pathname === '/ovw/favorite') {
                                            setFavLinks((prev) => prev.filter((link) => link.id !== item.id))
                                          }
                                        }
                                      })
                                    }}
                                  >
                                    {pathname === '/ovw/linkbox' ? <StarIcon className='size-[18px]' /> : <StarFilledIcon />}
                                  </button>
                                  {pathname !== '/ovw/favorite' && (
                                    <>
                                      <EditIcon className='ovw-icon-hover' />
                                      <TrashIcon className='ovw-icon-hover' />
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className='text-sm font-normal mt-2.5'>
                                <div className='flex flex-col'>
                                  <a
                                    href={item.originalUrl}
                                    className='ovw-link-hover'
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    <span className='truncate text-neutral-50'>Original URL {item.originalUrl}</span>
                                    <ExternalLinkIcon className='min-w-fit' />
                                  </a>

                                  <Link href={shortenerUrl(item.shortUrl)} className='ovw-link-hover' target='_blank' rel='noreferrer'>
                                    <span className='truncate text-neutral-50'>Short URL {shortenerUrl(item.shortUrl)}</span>
                                    <ExternalLinkIcon className='min-w-fit' />
                                  </Link>
                                </div>
                                <div className={`${layout === 'list' && 'flex justify-between'}`}>
                                  <p className='mt-1.5'>Visits {item.visits}</p>
                                  <p className='mt-1.5'>{moment(item.createdAt).format('lll')}</p>
                                </div>
                              </div>
                            </article>
                          )
                        }
                        )
                    ) : (
                      <article className='flex justify-center w-full absolute top-28'>
                        <div className='flex flex-col items-center px-10 md:px-14 py-10 border border-neutral-700 rounded-lg'>
                          <div className='border border-neutral-700 rounded-lg p-3 text-neutral-400'>
                            <InboxOffIcon />
                          </div>
                          {pathname === '/ovw/linkbox' && (
                            <h2 className='text-xl md:text-2xl font-medium mb-4'>No linkboxes found</h2>
                          )}
                          {pathname === '/ovw/favorite' && (
                            <h2 className='text-xl md:text-2xl font-medium mb-4'>No favorite linkboxes found</h2>
                          )}
                          <Link href='/ovw/linkbox/new' className='ovw-btn-hover py-[9px]'>
                            <span>Create a new linkbox</span>
                          </Link>
                        </div>
                      </article>
                    )}
              </div>
            </>
          )}
    </main>
  )
}
