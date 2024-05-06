import { Meta, StoryObj } from '@storybook/angular';

import { CategoriesComponent } from './categories.component';

type ComponentWithCustomControls = CategoriesComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Categories',
  component: CategoriesComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Categories` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Categories: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
