import { configure } from '@testing-library/jest-dom';
import serialize from 'my-custom-dom-serializer.js';

configure({
  testIdAttribute: 'data-my-test-id',
  getElementError: (message, container) => {
    const customMessage = [message, serialize(container.firstChild)].join(
      '\n\n',
    )
    return new Error(customMessage)
  },
})