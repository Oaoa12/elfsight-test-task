import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Loader, Text } from '../common';

const API_EPISODES_URL = 'https://rickandmortyapi.com/api/episode';

export function PopupEpisodes({ episodes }) {
  const [series, setSeries] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!episodes?.length) {
      setIsFetching(false);
      setSeries([]);

      return;
    }

    setIsFetching(true);

    const episodesIds = episodes.map((ep) => ep.match(/\d+$/)[0]);

    axios
      .get(`${API_EPISODES_URL}/${episodesIds.join(',')}`)
      .then(({ data }) => {
        setSeries(Array.isArray(data) ? data : [data]);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
        setSeries([]);
      });
  }, [episodes]);

  if (isFetching) {
    return <Loader />;
  }

  if (!series.length) {
    return (
      <PopupEpisodesContainer>
        <Text>No episodes available</Text>
      </PopupEpisodesContainer>
    );
  }

  return (
    <PopupEpisodesContainer>
      <Text>Participated in episodes:</Text>
      <StyledPopupEpisodes $length={series.length}>
        {series.map(({ id, name, episode }) => (
          <Episode key={id} $length={series.length}>
            <EpisodeMarking>
              {episode
                .replace(/S0?(\d+)/, 'Season $1 - ')
                .replace(/E0?(\d+)/, 'Ep. $1')}
            </EpisodeMarking>
            <Text>{name}</Text>
          </Episode>
        ))}
      </StyledPopupEpisodes>
    </PopupEpisodesContainer>
  );
}

const PopupEpisodesContainer = styled.div`
  margin-top: 20px;
`;

const StyledPopupEpisodes = styled.div`
  display: flex;
  flex-direction: column;

  ${({ $length }) =>
    $length > 20 &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    `}
`;

const Episode = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const EpisodeMarking = styled.span`
  color: #83bf46;
  margin-bottom: 8px;
`;
