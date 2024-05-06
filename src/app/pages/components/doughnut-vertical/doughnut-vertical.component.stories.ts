import { Meta, StoryObj } from '@storybook/angular';

import { DoughnutVerticalComponent } from './doughnut-vertical.component';

type ComponentWithCustomControls = DoughnutVerticalComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Doughnut Vertical',
  component: DoughnutVerticalComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `DoughnutVertical` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const DoughnutVertical: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
