import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  faBookAtlas,
  faCubes,
  faExcavator,
  faPlayCircle,
  faRabbitRunning,
  faToggleOn
} from '@fortawesome/pro-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import { usePrefersReducedMotion } from '@anatoliygatt/use-prefers-reduced-motion';

type FeatureItem = {
  title: string;
  icon: IconProp;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive',
    icon: faCubes,
    description: (
      <>
        FP-Studio works with both FramePack HY and F1 models, allowing for
        forwards and backwards video generation. It also provides a bevy of
        video post-processing tools, including an upscaler.
      </>
    )
  },
  {
    title: 'Accelerated',
    icon: faRabbitRunning,
    description: (
      <>
        We support Sage Attention and MagCache for the fastest possible
        inference while preserving output quality.
      </>
    )
  },
  {
    title: 'Rapidly Evolving',
    icon: faExcavator,
    description: (
      <>
        With a passionate community that is contributing code every day, expect
        to see us evolve into a fully featured AI video generation suite over
        time.
      </>
    )
  }
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* <Svg className={styles.featureSvg} role="img" /> */}
        <FontAwesomeIcon icon={icon} size="4x" style={{ margin: 12 }} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const imagePath = useBaseUrl('/img/astronaut.png');
  const gifPath = useBaseUrl('/img/astronaut-wave.gif');
  const { siteConfig } = useDocusaurusContext();
  const noAnimation = usePrefersReducedMotion();

  return (
    <Layout
      description="Welcome to FP-Studio's Documentation!"
      title={`${siteConfig.title} Documentation`}
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">Your AI Video Editor</p>
          <img
            className="margin-bottom--md"
            height={300}
            src={noAnimation ? imagePath : gifPath}
          />
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button',
                'button--secondary',
                'button--lg',
                styles.button
              )}
              to="/docs/get_started"
            >
              <FontAwesomeIcon icon={faToggleOn} size="lg" /> Get Started
            </Link>
            <Link
              className={clsx(
                'button',
                'button--secondary',
                'button--lg',
                styles.button
              )}
              to="/docs/user_guide"
            >
              <FontAwesomeIcon icon={faBookAtlas} size="lg" /> User Guide
            </Link>
            <Link
              className={clsx(
                'button',
                'button--success',
                'button--lg',
                styles.button
              )}
              rel="noopener noreferrer"
              target="_blank"
              to="https://pinokio.co/item.html?uri=https%3A%2F%2Fgithub.com%2Fcolinurbs%2FFP-Studio"
            >
              <FontAwesomeIcon icon={faPlayCircle} size="lg" /> Pinokio Install
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
