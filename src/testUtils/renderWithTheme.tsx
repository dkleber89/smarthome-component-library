import React, { ReactElement } from 'react';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/core';

import { lightTheme, ITheme } from '../themes';

function renderWithTheme(component: ReactElement, options?: RenderOptions, theme: ITheme = lightTheme): RenderResult {
  const Providers = (): ReactElement => {
    return (
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
    );
  };

  const rendered = render(component, { wrapper: Providers, ...options });
  return {
    ...rendered,
    rerender: (ui: ReactElement) => renderWithTheme(ui, { container: rendered.container, ...options }, theme),
  };
}

export default renderWithTheme;
