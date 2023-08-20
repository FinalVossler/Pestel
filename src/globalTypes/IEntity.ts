export interface ITranslatedText {
  text: string;
  language: string;
}

export enum FieldType {
  Number = "Number",
  Text = "Text",
  Paragraph = "Paragraph",
  File = "File",
  Selector = "Selector",
  Button = "Button",
  Table = "Table",
  IFrame = "IFrame",
}

export type FieldOption = {
  value: string;
  label: ITranslatedText[];
};

export interface IMicroFrontendComponent {
  _id: string;
  name: string;

  createdAt: string;
  updatedAt: string;
}

export interface IMicroFrontend {
  _id: string;
  name: string;
  remoteEntry: string;
  components: IMicroFrontendComponent[];

  createdAt: string;
  updatedAt: string;
}

export interface IEvent {
  eventTrigger: EventTriggerEnum;
  eventType: EventTypeEnum;

  // Redirection options
  redirectionUrl: string;
  redirectionToSelf: boolean;

  // API call options
  requestMethod: string;
  requestUrl: string;
  requestDataIsCreatedEntity: boolean;
  requestData: string;
  requestHeaders: IEventRequestHeader[];

  microFrontend?: IMicroFrontend;
  microFrontendComponentId?: string;
}

export interface IEventRequestHeader {
  key: string;
  value: string;
}

export type EventCommand = {
  eventTrigger: EventTriggerEnum;
  eventType: EventTypeEnum;

  // Redirection options
  redirectionUrl: string;
  redirectionToSelf: boolean;

  // API call options
  requestMethod: string;
  requestUrl: string;
  requestDataIsCreatedEntity: boolean;
  requestData: string;
  requestHeaders: IEventRequestHeader[];

  microFrontendId?: string;
  microFrontendComponentId?: string;
};

export enum EventTriggerEnum {
  OnCreate = "OnCreate",
  OnUpdate = "OnUpdate",
  OnClick = "OnClick",
}
export enum EventTypeEnum {
  ApiCall = "ApiCall",
  Redirection = "Redirection",
  MicroFrontendRedirection = "MicroFrontendRedirection",
}

export interface IFieldTableElement {
  _id: string;
  name: ITranslatedText[];
}

export interface IField {
  _id: string;
  name: ITranslatedText[];
  type: FieldType;
  options?: FieldOption[];
  fieldEvents: IEvent[];
  tableOptions?: {
    name: ITranslatedText[];
    columns: IFieldTableElement[];
    rows: IFieldTableElement[];
    yearTable: boolean;
  };

  createdAt: string;
  updatedAt: string;
}

interface IFile {
  _id?: string;
  url: string;
  uuid: string;
  isImage: boolean;
  name: string | null;
  ownerId?: string;
}

export interface IEntityTableFieldCaseValue {
  column: IFieldTableElement;
  row: IFieldTableElement;
  value: ITranslatedText[];
}

export interface IEntityYearTableFieldRowValues {
  row: IFieldTableElement;
  values: {
    year: number;
    value: ITranslatedText[];
  }[];
}

export interface IEntityFieldValue {
  field: IField;
  value: ITranslatedText[];
  files: IFile[];

  tableValues?: IEntityTableFieldCaseValue[];
  yearTableValues?: IEntityYearTableFieldRowValues[];
}
