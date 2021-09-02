import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { validateUserPermissions } from '../utils/validateUserPermissions';

interface UseCanParams {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions = [], roles = [] }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext)

  if(!isAuthenticated) {
    return false
  }

  if(user) {
    const userHasValidPermissions = validateUserPermissions({
      user,
      permissions, 
      roles
    })
  
    return userHasValidPermissions
  }

  return false
}