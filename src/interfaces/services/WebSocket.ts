export enum NotificationTypeCode {
  GENERIC = 0,
  FAILED_EMAIL = 1,
  NEW_USER = 2,
}

export const NotificationTypeMap: Record<string, NotificationTypeCode> = {
  generic: NotificationTypeCode.GENERIC,
  failed_email: NotificationTypeCode.FAILED_EMAIL,
  new_user: NotificationTypeCode.NEW_USER,
}

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
