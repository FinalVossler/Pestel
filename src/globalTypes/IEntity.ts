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

export interface IFile {
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

export interface IEntity {
  _id: string;
  model: IModel;
  entityFieldValues: IEntityFieldValue[];
  assignedUsers?: IUser[];
  customData?: string;

  createdAt: string;
  updatedAt: string;
}

export interface IModel {
  _id: string;
  name: ITranslatedText[];
  modelFields: IModelField[];
  modelEvents?: IEvent[];
  states?: IModelState[];
  subStates?: IModelState[];

  createdAt: string;
  updatedAt: string;
}

//#endregion model fields
export interface IModelField {
  field: IField;
  required: boolean;
  conditions?: IModelFieldCondition[];
  states?: IModelState[];
  mainField?: boolean;

  // used for frontend sorting only
  uuid: string;
}

export enum ModelFieldConditionTypeEnum {
  SuperiorTo = "SuperiorTo",
  SuperiorOrEqualTo = "SuperiorOrEqualTo",
  InferiorTo = "InferiorTo",
  InferiorOrEqualTo = "InferiorOrEqualTo",
  Equal = "Equal",
  ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear = "ValueInferiorOrEqualToCurrentYearPlusValueOfFieldAndSuperiorOrEqualToCurrentYear",
  StateConditionsMet = "StateConditionsMet",
  IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField = "IfYearTableThenNumberOfYearsInTheFutureIsEqualToValueOfField",
}

export interface IModelFieldCondition {
  field?: IField;
  conditionType: ModelFieldConditionTypeEnum;
  value?: number | string;
  modelState?: IModelState;
}
//#endregion model fields

//#region model states
export enum ModelStateType {
  ParentState = "ParentState",
  SubState = "SubState",
}

export interface IModelState {
  _id: string;
  name: ITranslatedText[];
  stateType: ModelStateType;
  // Means that it will block entities from showing in other states
  exlusive?: boolean;
}

export enum SuperRole {
  SuperAdmin = "SuperAdmin",
  Normal = "Normal",
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: IFile;
  superRole: SuperRole;
  role?: IRole;
  hasMessagingEmailsActivated?: boolean;
}

export enum Permission {
  EditConfiguration = "EditConfiguration",

  CreatePage = "CreatePage",
  ReadPage = "ReadPage",
  UpdatePage = "UpdatePage",
  DeletePage = "DeletePage",

  CreatePost = "CreatePost",

  CreateField = "CreateField",
  ReadField = "ReadField",
  UpdateField = "UpdateField",
  DeleteField = "DeleteField",

  CreateModel = "CreateModel",
  ReadModel = "ReadModel",
  UpdateModel = "UpdateModel",
  DeleteModel = "DeleteModel",

  CreateUser = "CreateUser",
  ReadUser = "ReadUser",
  UpdateUser = "UpdateUser",
  DeleteUser = "DeleteUser",

  CreateRole = "CreateRole",
  ReadRole = "ReadRole",
  UpdateRole = "UpdateRole",
  DeleteRole = "DeleteRole",

  ReadMicroFrontend = "ReadMicroFrontend",
  CreateMicroFrontend = "CreateMicroFrontend",
  UpdateMicroFrontend = "UpdateMicroFrontend",
  DeleteMicroFrontend = "DeleteMicroFrontend",
}

export interface IRole {
  _id: string;
  name: ITranslatedText[];
  permissions: Permission[];
  entityPermissions: IEntityPermission[];

  createdAt: string;
  updatedAt: string;
}

export enum EntityEventNotificationTrigger {
  OnCreate = "OnCreate",
  OnAssigned = "OnAssigned",
}

export interface IEntityEventNotification {
  _id?: string;
  title: ITranslatedText[];
  text: ITranslatedText[];
  trigger: EntityEventNotificationTrigger;
}

export interface IFieldPermission {
  field: IField;
  permissions: StaticPermission[];
}

export enum StaticPermission {
  Create = "Create",
  Read = "Read",
  Update = "Update",
  Delete = "Delete",
}

export interface IEntityPermission {
  _id?: string;
  model: IModel;
  permissions: StaticPermission[];
  entityFieldPermissions: IFieldPermission[];
  entityEventNotifications: IEntityEventNotification[];
  entityUserAssignmentPermissionsByRole?: {
    canAssignToUserFromSameRole: boolean;
    otherRoles: IRole[];
  };
}
