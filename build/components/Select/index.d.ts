import React from 'react';
export interface Item {
    label: React.ReactNode;
    value: string;
}
export interface Props {
    list: Item[];
    value: string;
    onChange: (value: string) => void;
}
export declare const Select: React.FC<Props>;
