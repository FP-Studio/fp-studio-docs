import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { faExcavator, faRabbitRunning } from '@fortawesome/pro-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
