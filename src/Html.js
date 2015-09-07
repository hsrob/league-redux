import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component:    PropTypes.object,
        store:        PropTypes.object
    }

    render() {
        const {assets, component, store} = this.props;
        const bodyStyle = { margin: 0 };
        return (
            <html lang="en-us">
            <head>
                <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet'
                      type='text/css'/>
                <meta charSet="utf-8"/>
                <title>League Redux</title>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link href="//cdn.jsdelivr.net/flexboxgrid/6.2.0/flexboxgrid.min.css" rel="stylesheet" type="text/css"/>
                <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
                      media="screen, projection" rel="stylesheet" type="text/css"/>
                {Object.keys(assets.styles).map((style, i) =>
                    <link href={assets.styles[style]} key={i} media="screen, projection"
                          rel="stylesheet" type="text/css"/>
                )}
            </head>
            <body style={bodyStyle}>
            <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>
            <script
                dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}}/>
            <script src={assets.javascript.main}/>
            </body>
            </html>
        );
    }
}
