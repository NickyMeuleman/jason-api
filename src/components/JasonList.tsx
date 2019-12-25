import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Jason from "./Jason";
import { IJason } from "../types";

interface IProps {
  jasons: IJason[];
  loading?: boolean;
}

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--altbg);
  color: var(--alttext);
  padding: 1rem 1.2rem;
`;

const JasonList: React.FC<IProps> = ({ jasons, loading }) => (
  <div
    css={css`
      margin: 2rem 0;
    `}
  >
    <ListHeader>
      <span>Jason</span>
      <span>Waves</span>
    </ListHeader>
    {jasons.length === 0 ? (
      <Jason jason={{ id: `empty`, name: `Placeholder Jason`, likes: 0 }} />
    ) : (
      <ul
        css={css`
          margin: 0;
          padding: 0;
        `}
      >
        {jasons.map(jason => (
          <Jason key={jason.id} jason={jason} loading={loading} />
        ))}
      </ul>
    )}
  </div>
);

export default JasonList;
