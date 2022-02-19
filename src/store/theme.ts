import { getLocalStorage } from "@/utils"
import { darkTheme } from "naive-ui"

export interface IThemeState {
  isDark: boolean
}

export const useThemeStore = defineStore("theme", {
  state: (): IThemeState => ({
    isDark: !!getLocalStorage<boolean>("isDark"),
  }),
  getters: {
    theme: (state) => (state.isDark ? darkTheme : null),
  },
})
