import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SprestFabricReactWebPartStrings';
import SprestFabricReact from './components/SprestFabricReact';
import { ISprestFabricReactProps } from './components/ISprestFabricReactProps';

export interface ISprestFabricReactWebPartProps {
  description: string;
}

// Import the gd-sprest library and dashboard
import { ContextInfo } from "gd-sprest";
import { Dashboard } from "./old_code";

export default class SprestFabricReactWebPart extends BaseClientSideWebPart<ISprestFabricReactWebPartProps> {

  public render(): void {
    // Set the context
    ContextInfo.setPageContext(this.context.pageContext);

    // Create the dashboard element
    const element: React.ReactElement<null> = React.createElement(Dashboard);

    // Render the dashboard
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
