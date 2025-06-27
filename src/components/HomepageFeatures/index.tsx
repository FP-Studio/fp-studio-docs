import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
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
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        We support Sage Attention and MagCache for the fastest possible
        inference while preserving output quality.
      </>
    )
  },
  {
    title: 'Rapidly Evolving',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        With a passionate community that is contributing code every day, expect
        to see us evolve into a fully featured AI video generation suite over
        time.
      </>
    )
  }
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
