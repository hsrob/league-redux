/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import InfoBar from '../components/InfoBar';
import {createTransitionHook} from '../universalRouter';
let { AppBar, AppCanvas, IconButton, Menu, Styles } = require('material-ui');
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();
if (__CLIENT__) {
    require('./App.scss');
}

export default class App extends Component {
    constructor(props, context){
        super(props, context);
    }
    static contextTypes = {
        router: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    };

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    componentWillMount() {
        const {router, store} = this.context;
        router.addTransitionHook(createTransitionHook(store));
    }

    render() {
        //const {user} = this.props;
        let cwStyle = { paddingTop: 64 };
        return (
            <AppCanvas>
                <AppBar title="League Redux" zDepth={0} />
                <div id="app-content" style={cwStyle}>
                    {this.props.children}
                </div>
            </AppCanvas>
        );
    }
}

/*@connect(state => ({}))
export default class AppContainer {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const { dispatch } = this.props;
        return <App>
            {this.props.children}
        </App>;
    }
}*/
