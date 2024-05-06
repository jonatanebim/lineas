import { Meta, StoryObj } from '@storybook/angular';

import { EvolutionChartComponent } from './evolution-chart.component';

type ComponentWithCustomControls = EvolutionChartComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Evolution Chart',
  component: EvolutionChartComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `EvolutionChart` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const EvolutionChart: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
