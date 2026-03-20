import type { Meta, StoryObj } from '@storybook/react';
import { ServicesDropdown } from './ServicesDropdown';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof ServicesDropdown> = {
  title: 'Features/Services/ServicesDropdown',
  component: ServicesDropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="min-h-[600px] p-8 bg-slate-100 relative">
           <button className="px-6 py-2 bg-primary text-white rounded-lg">Hover Me (Simulated)</button>
           <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close dropdown'),
    onNavigate: (route, id) => console.log(`Navigate to ${route} (ID: ${id})`),
  },
};

export const Searching: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onNavigate: () => {},
  },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input');
    if (input) {
      // Simulate typing 'GST'
      input.value = 'GST';
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    }
  },
};

export const CategoryView: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onNavigate: () => {},
  },
};
