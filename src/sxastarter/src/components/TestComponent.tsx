import * as FEAAS from '@sitecore-feaas/clientside/react';
import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface TestComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const TestComponent = (props: TestComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>TestComponent Component</p>
      </div>
    </div>
  );
};

FEAAS.External.registerComponent(TestComponent, {
  name: 'TestComponent',
  properties: {
    title: {
      type: 'string',
    },
    columnsCount: {
      type: 'number',
    },
  },
});
