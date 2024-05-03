import { Meta, StoryObj } from '@storybook/angular';

import { RankIndicatorComponent } from './rank-indicator.component';

type ComponentWithCustomControls = RankIndicatorComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Rank Indicator',
  component: RankIndicatorComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `RankIndicator` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const RankIndicator: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
