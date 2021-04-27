import React from 'react';
import classnames from 'classnames';
import HubspotForm from 'react-hubspot-form';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function ContactSpecialist() {
  return (
    <Layout
      title={`Vertex Developer Portal`}
      description="Vertex platform APIs and SDKs unlock 3D product data to fuel fast and easy collaboration. Collaborate on complex designs with anyone, anytime, and from any device."
    >
      <header className={classnames(styles.LPhero, styles.supportHero)}>
        <div className={classnames('container')}>
          <div className={classnames('row')}>
            <div className={classnames('col')}>
              <h1>Contact a Specialist</h1>
              <p>
                Please complete the form below or email our team at any time at{' '}
                <Link to={'mailto:support@vertexvis.com'}>
                  support@vertexvis.com
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={classnames(styles.contactSpecialist)}>
          <div className={classnames('container')}>
            <div className={classnames('row')}>
              <div className={classnames('col col--10 col--offset-1')}>
                <div className={classnames('row form-wrapper')}>
                  <div className={classnames('col col--7 contact-form')}>
                    <HubspotForm
                      portalId="8780919"
                      formId="415c36a7-dbae-4dfb-bf40-9db22e7875f1"
                      onSubmit={() => console.log('Submit!')}
                      onReady={() => console.log('Form ready!')}
                      loading={<div>Loading...</div>}
                    />
                  </div>
                  <div className={classnames('col col--5 contact-content')}>
                    <p>
                      We’re committed to offering you help with your
                      integrations and questions about the Vertex platform.
                    </p>
                    <p>
                      Our Customer Support team is available Monday through
                      Friday from 7 a.m. - 7 p.m. CST/CDT (excluding major U.S.
                      holidays).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ContactSpecialist;
