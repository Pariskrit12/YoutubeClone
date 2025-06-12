import React from 'react'
import Video from '../components/Video'

export default function WatchHistoryPage() {
  return (
    <div className='w-full '>
        <div className='p-[2rem] '>
          <p className='text-3xl font-extrabold'>Watch History</p>
        </div>
        <div className='mt-[1.5rem] px-[2rem]'>
          <Video/>
          <Video/>
          <Video/>
          <Video/>
          <Video/>
          <Video/>
        </div>
    </div>
  )
}
