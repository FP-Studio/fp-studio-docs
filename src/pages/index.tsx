import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{ paddingTop: 20 }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">Your AI Video Editor</p>
        <img
          src={useBaseUrl('/img/astronaut.png')}
          height={300}
          style={{ marginBottom: 10 }}
        />
        <div className={styles.buttons}>
          <Link
            style={{ marginRight: 8 }}
            className="button button--secondary button--lg"
            to="/docs/get_started"
          >
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/user_guide"
          >
            User Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Welcome to FP-Studio's Documentation!"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
