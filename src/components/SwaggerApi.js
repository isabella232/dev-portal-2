import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SwaggerUI from './SwaggerUI';
import 'swagger-ui-react/swagger-ui.css';

export default function Api({ version, url }) {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`API reference ${version} | ${siteConfig.title}`}
      description={`Vertex's platform API specification ${version}`}
    >
      <div className="remove-all-styles">
        <SwaggerUI url={url} deepLinking />
      </div>
    </Layout>
  );
}
