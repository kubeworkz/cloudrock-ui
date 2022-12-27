import { ENV } from '@cloudrock/configs/default';

import { HeroButton } from './HeroButton';

const DefaultHeroImage = require('./cloudrock-bg1.jpg');

import './HeroColumn.css';

export const HeroColumn = () => (
  <div
    className="HeroColumn"
    style={{
      backgroundImage: `url(${
        ENV.plugins.CLOUDROCK_CORE.HERO_IMAGE || DefaultHeroImage
      })`,
    }}
  >
    <div className="HeroBackground">
      <div className="HeroText">
        <h1>Your platform for managing Saas projects, teams and resources in a self-serve manner.</h1>
        <HeroButton />
      </div>
    </div>
  </div>
);
