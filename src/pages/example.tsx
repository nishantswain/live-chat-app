import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { prisma } from '../../lib/prisma'

type Props=InferGetServerSidePropsType<typeof getServerSideProps>
const ExamplePage = ({user}:Props) => {
  return (
    <div>Hello, {user.name}</div>
  )
}
export const getServerSideProps:GetServerSideProps= async (context)=>{
const user=await prisma.user.findFirst({
    where:{email:"test@test.com"}
})
return {
    props:{
        user
    }
}
}
export default ExamplePage