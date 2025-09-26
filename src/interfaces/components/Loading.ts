export interface ILoadingProps {
    defaultDescription?: string
    isLoading?: boolean
}

export interface ILoadingForwardHandles {
    show: (description?: React.ReactNode) => void
    hide: () => void
}
