import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export interface IJason {
  id: string;
  name: string;
  twitter?: string;
  likes: number;
}

interface IProps {
  jason: IJason;
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--altbg);
  border-top: none;
  padding: 1rem;
`;

const NameSection = styled.div``;

const WaveSection = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 1rem;
    border: 1px solid #e9ebeb;
    border-bottom: 1px solid #e1e2e4;
    border-radius: 6px;
    display: inline-block;
    line-height: 24px;
    min-width: 180px;
    padding: 7px 15px;
    text-align: center;
    transition: 0.2s ease;
    transition-property: background-color, border, box-shadow;
    vertical-align: middle;
    width: auto;
    &:hover:enabled {
      background-color: var(--altprimary);
      color: var(--bg);
    }
  }
`;

const WAVE_MUTATION = gql`
  mutation WaveToJason($id: ID!) {
    upvoteJason(id: $id) {
      likes
    }
  }
`;

const Jason: React.FC<IProps> = ({ jason }) => {
  const [waves, setWaves] = React.useState(jason.likes || 0);
  const [didWave, setDidWave] = React.useState(false);
  const [waveToJason] = useMutation(WAVE_MUTATION);

  const onWaveClick = async id => {
    // optimistic setWave is optimistic
    setDidWave(true);
    const { data } = await waveToJason({
      variables: { id }
    });
    data && setWaves(data.upvoteJason.likes);
  };

  return (
    <ListItem>
      <NameSection>
        <h3
          css={css`
            color: var(--text);
            line-height: 1.6;
          `}
        >
          {jason.name}
        </h3>
        <span
          css={css`
            color: var(--alttext);
            line-height: 1.8;
          `}
        >
          <a
            href={`https://www.twitter.com/${jason.twitter}`}
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            {jason.twitter}
          </a>
        </span>
      </NameSection>
      <WaveSection>
        <span
          css={css`
            font-size: 1.5rem;
            font-weight: 600;
          `}
        >
          {waves}
        </span>
        <button
          disabled={didWave}
          onClick={() => onWaveClick(jason.id)}
          css={css`
            background-color: ${didWave ? "var(--altbg)" : "var(--primary)"};
            color: ${didWave ? "var(--primary)" : "var(--bg)"};
          `}
        >
          <span
            css={css`
              font-size: 1.5rem;
              padding-right: 0.1rem;
            `}
          >
            {didWave ? "👍" : "👋"}
          </span>
          {didWave ? "Jason thanks you!" : "Wave to Jason!"}
        </button>
      </WaveSection>
    </ListItem>
  );
};

export default Jason;
