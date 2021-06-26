import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import FeedCard from 'components/common/FeedCard';
import { fetchActivities } from 'state/actions/activities';
import { selectAllActivities } from 'state/selectors/activities';

import classes from './Feed.module.scss';

const Home = () => {
  const { id: feedId } = useParams();

  const { activities, fetched, loading, error } = useSelector(
    selectAllActivities
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActivities(feedId));
  }, []);

  return (
    <main className={classes.feed}>
      <h1>Feed</h1>
      {loading && <h2>Loading...</h2>}
      {fetched && activities.lenght === 0 && <h2>No data for this feed!</h2>}
      {fetched && error}
      {fetched &&
        activities.map(
          ({
            activityId,
            userName,
            userLogo,
            date,
            imageUrl,
            comment,
            title,
          }) => (
            <div key={activityId} className={classes['feed-item']}>
              <FeedCard
                title={title}
                userName={userName}
                userLogo={userLogo}
                date={date}
                imageUrl={imageUrl}
                comment={comment}
              />
            </div>
          )
        )}
    </main>
  );
};

export default Home;
