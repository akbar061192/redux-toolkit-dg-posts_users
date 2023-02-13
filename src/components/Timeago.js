import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

const Timeago = ({ timeStamp }) => {
  let timeAgo = '';

  if (timeStamp) {
    const date = parseISO(timeStamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timeStamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default Timeago;
