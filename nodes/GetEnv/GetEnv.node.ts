import { IExecuteFunctions } from "n8n-core";
import {
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

export class GetEnv implements INodeType {
  description: INodeTypeDescription = {
    displayName: "GetEnv",
    name: "GetEnv",
    icon: "file:icon.svg",
    group: ["input"],
    version: 1,
    description: "Log any data",
    defaults: {
      name: "GetEnv",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [],
    properties: [
      {
        displayName: "Environment Names",
        name: "envNames",
        type: "string",
        typeOptions: {
          rows: 15,
        },
        required: true,
        noDataExpression: false,
        default: "",
        placeholder: "NODE_ENV, LOG_LEVEL",
        description: "Variable names must be entered and separated by a comma.",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const envNames = this.getNodeParameter("envNames", 0) as string;
    const envNamesList = envNames.split(",");
    let envJson: any = {};

    envNamesList.forEach((env) => {
      envJson[env] = process.env[env];
    });

    let returnItems = this.helpers.returnJsonArray(
      envJson as unknown as IDataObject[]
    );

    return this.prepareOutputData(returnItems);
  }
}
