import axios from 'axios';

const fetchActivitiesByFeedId = async (feedId) => {
  const {
    data: { activities },
  } = await axios.get(`http://localhost:5008/feeds/${feedId}`);

  return activities;
};

export default fetchActivitiesByFeedId;
