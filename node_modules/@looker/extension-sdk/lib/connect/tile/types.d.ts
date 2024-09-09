import type { MouseEvent } from 'react';
import type { IQuery } from '@looker/sdk';
export declare type TileHostDataChangedCallback = (tileHostData: Partial<TileHostData>) => void;
export declare enum DashboardRunState {
    UNKNOWN = "UNKNOWN",
    RUNNING = "RUNNING",
    NOT_RUNNING = "NOT_RUNNING"
}
export interface TileHostData {
    isExploring?: boolean;
    dashboardId?: string;
    elementId?: string;
    queryId?: string;
    querySlug?: string;
    dashboardFilters?: Filters;
    dashboardRunState?: DashboardRunState;
    isDashboardEditing?: boolean;
    isDashboardCrossFilteringEnabled?: boolean;
    filteredQuery?: IQuery;
    lastRunSourceElementId?: string;
    lastRunStartTime?: number;
    lastRunEndTime?: number;
    lastRunSuccess?: boolean;
}
export interface Pivot {
    key: string;
    is_total: boolean;
    data: {
        [key: string]: string;
    };
    metadata: {
        [key: string]: {
            [key: string]: string | Link[];
        };
    };
    labels: {
        [key: string]: string;
    };
    sort_values?: {
        [key: string]: string;
    };
}
export interface Cell {
    [key: string]: any;
    value: any;
    rendered?: string;
    html?: string;
    links?: Link[];
}
export interface Link {
    label: string;
    type: string;
    type_label: string;
    url: string;
}
export interface PivotCell {
    [pivotKey: string]: Cell;
}
export interface Row {
    [fieldName: string]: PivotCell | Cell;
}
export interface TileError {
    title: string;
    message: string;
    group: string;
}
export interface CrossFilterOptions {
    pivot: Pivot;
    row: Row;
}
export declare type DrillMenuOptions = any;
export interface Filters {
    [key: string]: string;
}
export interface TileSDK {
    tileHostData: TileHostData;
    tileHostDataChanged: (hostData: Partial<TileHostData>) => void;
    addErrors: (...errors: TileError[]) => void;
    clearErrors: (group?: string) => void;
    openDrillMenu: (options: DrillMenuOptions, event?: MouseEvent) => void;
    toggleCrossFilter: (options: CrossFilterOptions, event?: MouseEvent) => void;
    runDashboard: () => void;
    stopDashboard: () => void;
    updateFilters: (filters: Filters, runDashboard?: boolean) => void;
    openScheduleDialog: () => Promise<void>;
}
