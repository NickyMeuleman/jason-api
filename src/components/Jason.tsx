import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

export interface IJason {
  id: string;
  name: string;
  twitter?: string;
  waves: number;
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
    min-width: 168px;
    padding: 7px 15px;
    position: relative;
    text-align: center;
    transition: 0.2s ease;
    transition-property: background-color, border, box-shadow;
    vertical-align: middle;
    width: auto;
    background-color: var(--primary);
    color: var(--bg);
    &:hover {
      background-color: var(--altprimary);
      color: var(--bg);
    }
  }
`;

const Jason: React.FC<IProps> = ({ jason }) => {
  const [waves, setWaves] = React.useState(jason.waves || 0);
  const onWaveClick = () => {
    // send graphQL mutation here
    setWaves(prevWaves => prevWaves + 1);
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
            href={"https:www.google.be"}
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
        <button onClick={onWaveClick}>
          <span
            css={css`
              font-size: 1.5rem;
              padding-right: 0.1rem;
            `}
          >
            👋
          </span>
          Wave to Jason!
        </button>
      </WaveSection>
    </ListItem>
  );
};

export default Jason;
