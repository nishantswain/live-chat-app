
"use server"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// JSX.Element
// JSX.Element[]
//optional prop ->
//append ? while declaring your prop item type
// interface BoardTileProps{
//   boardId:String,
// boardImage?:'String | StaticImport',
// boardName:String,

// }
interface BoardTileProps {
  id: String;
  boardImage?: String;
  boardName: String;
}

const BoardTile = ({
  id,
  boardImage,
  boardName = 'default boardname',
}: BoardTileProps):JSX.Element => {
  return (
    <div className="board-tile">
      <Link href={`/board/${id}`}>
        <div className="board-tile-image">
          <Image
            src={boardImage}
            alt={boardImage + ' image'}
            width={100}
            height={100}
          />
        </div>
        <div className="board-tile-board-name" style={{ position: 'absolute' }}>
          {boardName}
        </div>
      </Link>
    </div>
  );
};

export default BoardTile;
