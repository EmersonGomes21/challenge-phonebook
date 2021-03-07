// import {addDecorator} from '@storybook/react';
// import withGlobalStyles from './withGlobalStyles'
// addDecorator(withGlobalStyles);
import GlobalStyles from '../src/styles/global'

export const decorators = [
  (Story) =>(
    <>
  <GlobalStyles/>
  <Story />
    </>
  )
]
