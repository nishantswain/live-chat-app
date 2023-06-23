"use client"
import React from 'react';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
interface BoardProps {
  params: {
    board_id: String;
  };
}
const page=({ params: { board_id } }: BoardProps)=> {
  return <div>Board id is, {board_id}</div>;
}

export default page;
