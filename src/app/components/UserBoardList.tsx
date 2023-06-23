import React from 'react';
import BoardTile from './BoardTile';

type BoardTile = {
  id: any | String;
  boardName: String;
  boardImage: String;
};

interface UserBoardListProps {
  boardList: [BoardTile] | [];
}

const UserBoardList = ({ boardList }: UserBoardListProps): JSX.Element => {
  return (
    <div>
      <h3>User Board List</h3>
      {boardList.map((board: BoardTile) => (
        <BoardTile key={board.id} {...board} />
      ))}
    </div>
  );
};

export default UserBoardList;
