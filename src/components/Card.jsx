import React from 'react'
import { motion } from 'framer-motion'

export default function Card({ children, className='' }){
  return (
    <motion.div whileHover={{ y:-6 }} className={'bg-white rounded-xl shadow p-5 '+className}>
      {children}
    </motion.div>
  )
}
