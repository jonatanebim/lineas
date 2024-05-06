import { Meta, StoryObj } from '@storybook/angular';

import { SeeMoreComponent } from './see-more.component';

type ComponentWithCustomControls = SeeMoreComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/See More',
  component: SeeMoreComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `SeeMore` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const SeeMore: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
