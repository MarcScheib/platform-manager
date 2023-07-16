import { createRoot } from 'react-dom/client';
import { TipManager } from './tip-manager';

function render() {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<TipManager />);
}

render();
