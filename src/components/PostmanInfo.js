import React from 'react';

export function PostmanInfo() {
  return (
    <ul>
      <li>
        They include all required and optional body parameters for completeness.
        Remove any optional parameters as desired.
      </li>
      <li>
        They use auto-generated IDs and other values that may share the same
        value for ease of documentation only. In actual requests and responses,
        the IDs should uniquely identify their corresponding resource.
      </li>
    </ul>
  );
}
