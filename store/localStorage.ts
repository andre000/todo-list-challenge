export enum Themes {
  Light = 'light',
  Dark = 'dark'
}

export interface ThemeState {
  theme: Themes
}

export const state = () => ({
  theme: 'light'
})

export const mutations = {
  CHANGE_THEME (state: ThemeState, theme: Themes) {
    state.theme = theme
  }
}
