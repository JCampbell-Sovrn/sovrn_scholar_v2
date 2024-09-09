import type { MouseEvent } from 'react';
import type { ExtensionHostApiImpl } from '../extension_host_api';
import type { TileSDK, TileError, DrillMenuOptions, CrossFilterOptions, Filters, TileHostData } from './types';
export declare class TileSDKImpl implements TileSDK {
    hostApi: ExtensionHostApiImpl;
    tileHostData: TileHostData;
    constructor(hostApi: ExtensionHostApiImpl);
    tileHostDataChanged(partialHostData: Partial<TileHostData>): void;
    addErrors(...errors: TileError[]): void;
    clearErrors(group?: string): void;
    openDrillMenu(options: DrillMenuOptions, event?: MouseEvent): void;
    toggleCrossFilter(options: CrossFilterOptions, event?: MouseEvent): void;
    runDashboard(): void;
    stopDashboard(): void;
    updateFilters(filters: Filters, run?: boolean): void;
    openScheduleDialog(): Promise<any>;
    sanitizeEvent(event?: MouseEvent): {
        metaKey: boolean;
        pageX: number;
        pageY: number;
        type: string;
    } | undefined;
}
