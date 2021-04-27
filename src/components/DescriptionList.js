import React from 'react';

export function DescriptionList({ items }) {
  return (
    <dl>
      {items.map((i) => (
        <>
          <dt>{i.term}</dt>
          <dd style={{ marginBottom: '1rem' }}>{i.definition}</dd>
        </>
      ))}
    </dl>
  );
}
