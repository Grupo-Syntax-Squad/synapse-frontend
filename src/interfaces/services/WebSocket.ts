export enum GetWebSocketNotificationResponseKeys {
    TYPE = "notification_type",
    TITLE = "notification_title",
    DESCRIPTION = "notification_description",
    URL = "notification_url",
    SOUND = "notification_sound",
}

export interface IWebSocketNotification {
    [GetWebSocketNotificationResponseKeys.TYPE]: number
    [GetWebSocketNotificationResponseKeys.TITLE]: string
    [GetWebSocketNotificationResponseKeys.DESCRIPTION]: string
    [GetWebSocketNotificationResponseKeys.URL]?: string
    [GetWebSocketNotificationResponseKeys.SOUND]: boolean
}
