import { useThemeSelector } from './themeSlice';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeSelector();

  return (
    <div className={mode} data-theme={mode}>
      {children}
    </div>
  );
};
