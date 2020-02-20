import React from 'react';
import { OverlayPane } from './overlay-pane';
import { MediaSelectionCanvas } from './media-selection-canvas';

export class MediaSelectionPane extends React.Component{
    render(){
        /*
            This is a bit 'heavy' in what it shows and can do
            Really just want a media selection component that
            supports filtering, but doesn't have to show
            things like the dates and width/height???

            -needs to show media
            --could show rows only, with thumbnail, filename?
            -needs to show media that are selected as part of the album
            -needs to support filtering
            -does not need to support sorting

            might be easier to build a new, dedicated MediaCanvas component for this
        */
        return(
            <OverlayPane>
                <MediaSelectionCanvas media={this.props.media}
                                        title="All media"
                                        showRowToolbar={false}
                                        tags={this.props.tags}
                                        initialSelections={this.props.initialSelections}
                                        allowRowSelection={false}
                                        onRowSelectionChanged={(selections)=>this.props.onRowSelectionChanged(selections)}
                                        allowMultiSelect={true}
                                        allowClickDeselect={true}
                                        showContentAsRows={this.props.showContentAsRows}/>
            </OverlayPane>
        );
    }
}