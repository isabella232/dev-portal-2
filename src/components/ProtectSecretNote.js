import React from 'react';

export function ProtectSecretNote() {
  return (
    <>
      Your Vertex client secret is sensitive and must be kept secure at all
      times. You should <strong>never</strong> include it in client-side web
      applications.
    </>
  );
}
