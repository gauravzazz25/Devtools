import { LazyExoticComponent } from 'react';

export interface Tool {
  id: string;
  name: string;
  component: LazyExoticComponent<() => JSX.Element>;
}

export interface TabInstance {
  id: string;
  toolId: string;
}