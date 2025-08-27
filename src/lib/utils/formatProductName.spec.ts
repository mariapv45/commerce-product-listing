import { formatProductName } from './formatProductName';

describe('formatProductName', () => {
  it('should format pack information correctly', () => {
    const result = formatProductName('Victoria Bitter 4x6x375ml');
    expect(result).toBe('Victoria Bitter 375ml (24-pack)');
  });

  it('should handle products without pack info', () => {
    const result = formatProductName('Pure Blonde Crate');
    expect(result).toBe('Pure Blonde Crate');
  });

  it('should handle decimal volume values', () => {
    const result = formatProductName('Test Product 4x6x375.5ml');
    expect(result).toBe('Test Product 375.5ml (24-pack)');
  });
});
