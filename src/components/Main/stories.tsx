import { Story, Meta } from '@storybook/react/types-6-0'
import Main from '.'
export default {
  title: 'Main',
  component: Main,
  args: {
    title: 'Emerson',
    description: 'Gomes Rebolsas'
  }
} as Meta

export const Basic: Story = (args) => <Main {...args} />

Basic.args = {
  title: 'Emerson',
  description: 'Gomes '
}
