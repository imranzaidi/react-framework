import React from 'react';
import { DemoButton } from './DemoButton';

/**
 * Notice above default import is NOT being used because withStyles HOC
 * causes "TypeError: Cannot read property 'apply' of null
    at new WithStyles(DemoButton)"
    Using named import works and is able load the styles thanks to the:
    `import styles from './DemoButton.scss';` on the component itself.
    We might want to review the approach to load styles but this seems
    to work correctly without having to add additional styles imports
    on storybook config
 */

export default { title: 'DemoButton' };

export const withText = () => <DemoButton>Hello Button</DemoButton>;

export const withEmoji = () => (
  <DemoButton>
    <span role='img' aria-label='so cool'>
      😀 😎 👍 💯
    </span>
  </DemoButton>
);
