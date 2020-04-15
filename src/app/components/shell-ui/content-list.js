import React, { useState } from 'react';
import { ContentListToolbar } from './content-list-toolbar';
import { ContentListCanvas } from './content-list-canvas';

export const ContentList = ({
    content, contentRowComponent, contentTileComponent=null, toolbarContent=null, allowContentViewChange=false, defaultContentView='rows', 
    allowSelection=false, onSelectionChanged=null, columnHeaders=null, showStatusBar=false, allowClickDeselect=false, allowMultiSelect=false, 
    rowHeight=40, tilePadding=16
}) => {
    const [showAsRows, onContentViewChanged] = useState(defaultContentView === 'rows');
    const [rowHeightActual, onRowHeightChanged] = useState(rowHeight);

    const handleContentViewChanged = (view) => {
        let rows = view === 'rows';
        onContentViewChanged(rows);
        onRowHeightChanged(rows ? rowHeight : 200);    //tiles are 200px high
    };
    const handleSelectionChanged = (selections) => {        
        if(onSelectionChanged !== null){
            onSelectionChanged(selections);
        }
    };

    return (
        <>
            {toolbarContent !== null &&
                <ContentListToolbar showViewChange={allowContentViewChange}
                                    onContentViewChanged={handleContentViewChanged}>
                    {toolbarContent}
                </ContentListToolbar>
            }
            <ContentListCanvas  source={content}
                                columnHeaders={columnHeaders} 
                                rowComponent={contentRowComponent} 
                                tileComponent={contentTileComponent}
                                onSelectionChanged={handleSelectionChanged}
                                showStatusBar={showStatusBar}
                                showAsRows={showAsRows}
                                allowSelection={allowSelection}
                                allowClickDeselect={allowClickDeselect}
                                allowMultiSelect={allowMultiSelect}
                                rowHeight={rowHeightActual}
                                tilePadding={tilePadding}/>
        </>
    );
};