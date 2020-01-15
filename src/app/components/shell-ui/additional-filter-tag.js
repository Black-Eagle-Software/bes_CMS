import React from 'react';
import { AdditionalFilter } from './additional-filter';

export const AdditionalFilterTag = ({tag, onCloseClick}) => {
    return (
        <AdditionalFilter onCloseClick={onCloseClick}>
            {tag.description}
        </AdditionalFilter>
    );
}