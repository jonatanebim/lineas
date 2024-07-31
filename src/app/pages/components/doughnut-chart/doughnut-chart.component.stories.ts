import { Meta, StoryObj } from '@storybook/angular';

import { DoughnutChartComponent } from './doughnut-chart.component';

type ComponentWithCustomControls = DoughnutChartComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Doughnut Chart',
  component: DoughnutChartComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `DoughnutChart` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const DoughnutChart: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
