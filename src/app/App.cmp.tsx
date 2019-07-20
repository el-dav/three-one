import React, { FC } from 'react';

import { ThemeProvider, styled } from 'theme';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const App: FC = () => (
  <ThemeProvider>
    <AppContainer>
      <h1>Hello World</h1>
    </AppContainer>
  </ThemeProvider>
);

export default App;
