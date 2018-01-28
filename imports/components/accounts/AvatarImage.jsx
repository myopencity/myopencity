import React, {Component} from 'react';

export default class AvatarImage extends Component {
    render(){
        const {src, size} = this.props
        return(
            <div style={{backgroundImage: "url(" + src + ")", height: size, width: size}} className={this.props.className + " avatar-image"}></div>
        );
    }
}