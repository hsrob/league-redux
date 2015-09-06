/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../reducers/champions';
import {connect} from 'react-redux';
import * as championActions from '../actions/championActions';
import {load as loadChampions} from '../actions/championActions';
let mui = require('material-ui');
let _ = require('lodash');
let {
    Avatar,
    Card,
    CardActions,
    CardExpandable,
    CardHeader,
    CardMedia,
    CardText,
    CardTitle,
    FlatButton,
    Styles
    } = mui;
let { Colors, Typography } = Styles;
let ThemeManager = new Styles.ThemeManager();
if (__CLIENT__) {
    //require('./Widgets.scss');
}

class Champions extends Component {
    static propTypes = {
        champions: PropTypes.array,
        error: PropTypes.string,
        loading: PropTypes.bool,
        load: PropTypes.func
    };

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    render() {
        const {champions, error, loading, load} = this.props;
        console.log('champions', champions);
        let champChunks = champions && champions.length ? _.chunk(champions,  3): null;
        let getAvatar = (imageName) => { return "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/" + imageName;};
        return (
            <div id="champion-list">
                {champChunks &&
                    _.map(champChunks, (chunk) => {
                        return (
                            <div className="row">
                                {
                                    _.map(chunk, (champ) => {
                                        return (
                                                <div className="col-xs-4">
                                                    <Card key={champ.id}>
                                                        <CardHeader title={champ.name} subtitle={champ.title} avatar={getAvatar(champ.image.full)} />
                                                        <CardText>
                                                            {champ.blurb}
                                                        </CardText>
                                                    </Card>
                                                </div>
                                        )
                                    })
                                }
                            </div>);
                    })
                }
            </div>
        );
    }
}

@connect(state => ({
    champions: state.champions.data,
    error: state.champions.error,
    loading: state.champions.loading
}))
export default class ChampionsContainer{
    static propTypes = {
        champions: PropTypes.array,
        error: PropTypes.string,
        loading: PropTypes.bool,
        dispatch: PropTypes.func.isRequired
    }

    static fetchData(store) {
        console.log('fetchData from', store);
        if (!isLoaded(store.getState())) {
            return store.dispatch(loadChampions());
        }
    }

    render() {
        const { champions, error, loading, dispatch } = this.props;
        console.log('champions (container)', champions);
        return <Champions champions={champions} error={error}
                          loading={loading} {...bindActionCreators(championActions, dispatch)}/>;
    }
}
