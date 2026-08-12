import { hasRequiredRole } from './role-hierarchy.util';

describe('Role Hierarchy Utility', () => {
  describe('USER role', () => {
    it('should allow USER to access USER resources', () => {
      expect(hasRequiredRole(['USER'], ['USER'])).toBe(true);
    });

    it('should deny USER access to ADMIN resources', () => {
      expect(hasRequiredRole(['USER'], ['ADMIN'])).toBe(false);
    });

    it('should deny USER access to SUPER_ADMIN resources', () => {
      expect(hasRequiredRole(['USER'], ['SUPER_ADMIN'])).toBe(false);
    });
  });

  describe('ADMIN role', () => {
    it('should allow ADMIN to access USER resources', () => {
      expect(hasRequiredRole(['ADMIN'], ['USER'])).toBe(true);
    });

    it('should allow ADMIN to access ADMIN resources', () => {
      expect(hasRequiredRole(['ADMIN'], ['ADMIN'])).toBe(true);
    });

    it('should deny ADMIN access to SUPER_ADMIN resources', () => {
      expect(hasRequiredRole(['ADMIN'], ['SUPER_ADMIN'])).toBe(false);
    });
  });

  describe('SUPER_ADMIN role', () => {
    it('should allow SUPER_ADMIN to access USER resources', () => {
      expect(hasRequiredRole(['SUPER_ADMIN'], ['USER'])).toBe(true);
    });

    it('should allow SUPER_ADMIN to access ADMIN resources', () => {
      expect(hasRequiredRole(['SUPER_ADMIN'], ['ADMIN'])).toBe(true);
    });

    it('should allow SUPER_ADMIN to access SUPER_ADMIN resources', () => {
      expect(hasRequiredRole(['SUPER_ADMIN'], ['SUPER_ADMIN'])).toBe(true);
    });
  });

  describe('Multiple required roles - OR semantics', () => {
    it('should allow ADMIN when ADMIN or SUPER_ADMIN is required', () => {
      expect(
        hasRequiredRole(['ADMIN'], ['ADMIN', 'SUPER_ADMIN']),
      ).toBe(true);
    });

    it('should allow SUPER_ADMIN when ADMIN or SUPER_ADMIN is required', () => {
      expect(
        hasRequiredRole(['SUPER_ADMIN'], ['ADMIN', 'SUPER_ADMIN']),
      ).toBe(true);
    });

    it('should deny USER when ADMIN or SUPER_ADMIN is required', () => {
      expect(
        hasRequiredRole(['USER'], ['ADMIN', 'SUPER_ADMIN']),
      ).toBe(false);
    });
  });

  describe('Fail-closed validation', () => {
    it('should deny when user has no roles', () => {
      expect(hasRequiredRole([], ['USER'])).toBe(false);
    });

    it('should deny an invalid role', () => {
      expect(
        hasRequiredRole(['INVALID_ROLE'], ['ADMIN']),
      ).toBe(false);
    });

    it('should deny when any assigned role is invalid', () => {
      expect(
        hasRequiredRole(['ADMIN', 'INVALID_ROLE'], ['ADMIN']),
      ).toBe(false);
    });
  });
});