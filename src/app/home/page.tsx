import React from 'react'
import { prisma } from '../../../lib/prisma'

const HomePage =async () => {
    const user = await prisma.user.findFirst({
        where:{
            email:"test@test.com"
        }
    })
  return (
    <div>Hello, {user?.name}</div>
  )
}

export default HomePage