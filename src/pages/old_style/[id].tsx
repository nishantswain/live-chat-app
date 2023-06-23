import React from 'react'
import { useRouter } from 'next/router'
function OldStyleDynamicRoting() {
 const {id}=useRouter().query
    return (
    <div>OldStyleDynamicRoting, id is ,{id}</div>
  )
}

export default OldStyleDynamicRoting