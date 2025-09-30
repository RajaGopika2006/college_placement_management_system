import React, { useState } from 'react'
import { jobs } from '../mock/jobs'
import { motion, AnimatePresence } from 'framer-motion'

let modalState = { open: false, job: null, onApply: null }
export function openApply(job, onApply){ modalState = { open:true, job, onApply }; window.dispatchEvent(new Event('apply-open')) }
export default function ApplyModal(){
  const [, setTick] = useState(0)
  const [visible, setVisible] = useState(false)
  const [job, setJob] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  React.useEffect(()=>{
    const handler = ()=>{ setVisible(modalState.open); setJob(modalState.job); setTick(t=>t+1); }
    window.addEventListener('apply-open', handler)
    return ()=> window.removeEventListener('apply-open', handler)
  },[])
  function close(){ modalState.open=false; setVisible(false) }
  function submit(){
    alert('Applied to '+(job?.title||'')+' as '+name+' ('+email+')')
    if(modalState.onApply) modalState.onApply({ name, email, jobId: job.id })
    close()
  }
  return (
    <AnimatePresence>
      {visible && job && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }} className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-2">Apply for {job.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{job.company} • {job.package}</p>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border rounded px-3 py-2 mb-3" />
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex justify-end space-x-2">
              <button onClick={close} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={submit} className="px-4 py-1 bg-indigo-600 text-white rounded">Apply</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
