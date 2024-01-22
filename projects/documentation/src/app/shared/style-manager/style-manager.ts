type PrebuiltTheme = {
  displayName: string,
  name: string,
  default?: boolean,
}

export const prebuiltThemes: PrebuiltTheme[] = [
  {
    displayName: 'The Plug',
    name: 'theplug',
    default: true,
  },
  {
    displayName: 'Clorox',
    name: 'clorox',
  },
  {
    displayName: 'Indigo & Pink',
    name: 'indigo-pink',
  },
]
