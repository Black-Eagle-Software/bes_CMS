import React from 'react';
import { AdditionalFilter } from './additional-filter';

export const AdditionalFilterDate = ({date, onCloseClick}) => {
    return (
        <AdditionalFilter onCloseClick={onCloseClick}>
            <span>{date.month}/{date.year}</span>
        </AdditionalFilter>
    );
}