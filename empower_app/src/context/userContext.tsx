import React from 'react';
export const UserContext = React.createContext({
  user: null,
  dispatchUserEvent: (actionType: string, payload: any) => {},
});
