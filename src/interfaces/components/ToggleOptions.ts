export interface IToggleOptionItem<ToggleKey extends string> {
    toggleId: ToggleKey
    title: string
    iconName: string
}

export interface IToggleOptions<ToggleKeys extends string> {
    data: IToggleOptionItem<ToggleKeys>[]
    selectedToggle: ToggleKeys
    onToggleChange: (toggleId: ToggleKeys) => Promise<void> | void
}
