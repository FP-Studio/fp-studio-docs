import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FP-Studio',
  tagline: 'Pack your world',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.framepackstudio.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FP-Studio', // Usually your GitHub org/user name.
  projectName: 'fp-studio-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
        },
        theme: {
          customCss: './src/index.scss'
        }
      } satisfies Preset.Options
    ]
  ],

  plugins: ['docusaurus-plugin-sass'],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FP-Studio',
      logo: {
        alt: 'FP-Studio Logo',
        src: 'img/astronaut.png'
      },
      items: [
        {
          type: 'doc',
          docId: 'get_started',
          label: 'Get Started',
          position: 'left'
        },
        {
          type: 'doc',
          docId: 'user_guide',
          label: 'User Guide',
          position: 'left'
        },
        {
          href: 'https://github.com/colinurbs/FramePack-Studio',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: '/docs/get_started'
            },
            {
              label: 'User Guide',
              to: '/docs/user_guide'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/MtuM7gFJ3V'
            },
            {
              label: 'Patreon',
              href: 'https://www.patreon.com/ColinU'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/colinurbs/FramePack-Studio'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FP-Studio Project. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.gruvboxMaterialLight,
      darkTheme: prismThemes.gruvboxMaterialDark
    }
  } satisfies Preset.ThemeConfig
};

export default config;
